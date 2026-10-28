# SPEC_t139：AI归浮窗+增提示词直入+保活遥测补字段（第1任务列表第1/3条+第6条尾巴）

> 洪老师第1任务列表逐条拍板，开工不问。本SPEC只改列出的三刀，其他一行不动。
> 动码件：hx-common v0.84.0→v0.85.0 一件。chat/index/壳一行不动。
> 外援：DS出稿。约束：只改列出的问题；必须改别处时停止并注释说明；不重构/不优化/不改格式/不改变量名；追加修改记录注释。

## 刀A 保活遥测补字段（第6条尾巴：hx-common版本+浮窗账云侧可读）
病根：ECS保活哨兵每30分钟发 see arg=hx_suite_ver，套装答版本账，但账里没有 hx-common 版本，也没有浮窗收发/点亮/提示词计数——云侧核浮窗在岗是盲区（10-28第6条检验实锤）。
治法：see分支 arg 为 'hx_suite_ver' 且读到的是JSON时，注入五键再返：
- hxc = HX_COMMON_VERSION
- fcN = localStorage hx_fc_log 解析后条数（环形账，读不出给0）
- glowN = xt_glow_pend 有文本给1否则0（点亮挂单在不在）
- pptN = chat_presets 解析后条数
- lit = chat_preset_lit（点亮的提示词id，没有给空串）
全段try包死，解析失败/不是JSON一律返回原字符串，不许炸。其余op一行不动。
锚点（唯一）：
```
      } else if (op === 'see') {
        data = localStorage.getItem(String(arg || ''));
      } else if (op === 'jbSave') {
```
只许把 see 两行换成带注入的版本，jbSave 及以下一行不动。

## 刀B1 点亮提示词=用这条干活（第1条AI归浮窗）
现状：sjAiSend里「点亮着提示词」一律当改提示词（isPptCmd=true）。洪老师10-28重拍：点亮=调用信号，点亮哪条就按哪条干活；改提示词只是其中一种意图。
治法（hx-common HX.sj 的 sjAiSend 内，两处小改）：
①锚点：
```
      if(litPreset) isPptCmd=true; /* 终审翻案（仿真逮）：点亮着提示词=就是要对它动手，大白话不会正好含「改提示词」四字；点亮别的自动灭lit不冲突 */
```
改为：
```
      if(litPreset && /改提示词|改这条|改它|改一下这/.test(cmdTxt)) isPptCmd=true; /* t139刀B1：点亮=用这条干活（第1条拍板），只有明说改才走改提示词；原判断注释留档：点亮着提示词=就是要对它动手（t135刀2老规矩，10-28已被第1条顶替） */
```
②锚点：
```
      if(selPreset && !isPptCmd){
        sys=selPreset.rule||''; /* 选中的预设随命令一起发（洪老师：发送时把提示词一起发送） */
      }
```
改为在其后补一条 else if（selPreset没有而litPreset有且不发改令时，sys=litPreset.rule；点亮优先于点选）：
```
      if(selPreset && !isPptCmd){
        sys=selPreset.rule||''; /* 选中的预设随命令一起发（洪老师：发送时把提示词一起发送） */
      } else if(litPreset && !isPptCmd){
        sys=litPreset.rule||''; /* t139刀B1：点亮提示词=按这条干活（第1条） */
      }
```
注意：isPptCmd=true 的改提示词老路（_pptSysTail格式尾巴+sjAiBack丙路sjPptApplyDirect直落+5层老底）一行不动——第2条「直改直落不问」t133刀4已落地，本SPEC不重复做。
点亮对象行（【点亮对象】提示词…）两行路都照带，不动。

## 刀B2 增提示词直生直入（第3条：不用问、不弹确认、立即入库可用）
现状：sjPptGen 生成模式（无选中预设）AI写好后只灌过目框 hxSjPptNewName/hxSjPptNewRule，等用户再点存档。
治法：回调里 _t137new 分支，解析出 _nm/_rule 后、灌过目框之前，直接入库：
- 构造 { id:'p'+Date.now(), name:_nm, rule:_rule, gist:'', withCtx:false }（字段名照 chat_presets 现有条目真实结构，先读一条现存条目比字段，结构拿不准就停下申报不许编）
- unshift 进 list，localStorage.setItem('chat_presets',...) + HX.store.set('chat_presets',...) 双写（照 sjPptApplyDirect 同款双写），再试 HX.store.sync 有就调
- sjToast('已存成提示词：'+_nm+'，可直接点亮用')
- 过目框照灌（用户可看可再改），💾存档钮留着不动（重复存会去重由名单独管，不管）
- 解析失败（没【名字】也没法起名）才退老路只灌过目框
锚点：
```
              if(!_nm){ _nm=req.substring(0,8); }
              var _nb=sjPptNewBoxEnsure();
```

## 总开关与版本
- hx_t139_off=1：刀A退原样返回、刀B1退老判断、刀B2退只灌过目框。
- 版本行 var HX_COMMON_VERSION = '0.84.0' 改 '0.85.0'，版本史注释追加本刀记录（照既有格式）。
- chat 不动（提示词内容行点亮经核：t131刀6a+t138+t133已覆盖鱼骨任意行与提示词题目行，第5条剩余尾巴下批再核真机）。

## 红线
HX.keys/air/pick/mg/store其余/dav/gh/bill/step/selfUp/fm/ai/HX.sj其余（sjKbFit/sjToast/sjPptDiffOpen/sjPptApplyDirect等）/bb/hxToastHold/chk/chat/jc/audit/wzPoll/jbl/aip/hc/zg/HX.fc/HX.mqtt其余op 全件IDENTICAL；chat/index/壳/其他单体一行不动。

## 仿真考点（node stub）
1. see('hx_suite_ver')答卷含hxc/fcN/pptN/lit五键；see('别的键')原样返回
2. 点亮提示词+发「帮我总结这段」→sys=该提示词rule，不走改提示词
3. 点亮提示词+发「改提示词：加一条要表格」→走改提示词路（isPptCmd=true）
4. 点亮提示词+chat_preset_cur也选着别的→sys用点亮的
5. sjPptGen生成模式AI返回带【名字】→chat_presets直接多一条+吐司+过目框也灌了
6. hx_t139_off=1 → 三刀全退老行为
