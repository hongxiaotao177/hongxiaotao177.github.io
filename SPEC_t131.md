# SPEC_t131 浮窗对齐改造（速记面板输入框常驻+AI编辑命令排+点亮三路回流）
# 洪老师2026-10-26晚班讨论拍板（三处明示：①命令预设头一批4个以后随便加 ②词解释用①②③带圈标号 ③提示词新旧对照带「AI说改了啥」）
# 上游：t130留账1笔（chat预设选中持久化）并入本SPEC刀6；冻结令内AI总管治病线唯一开工线
# 铁规矩：只改本SPEC列出的刀口，其他一行不动；不重构不优化不改格式不改变量名；追加修改记录注释

## 〇、认准对象
浮窗=🏥圆点速记面板（hx-common HX.sj模块），不是点亮浮窗不是AI对话框。
t130错路：把输入框折进foldBox。本刀拨正：**输入框常驻**，折的只是钮排。

## 一、版面（洪老师原话对齐）
开门后面板=三行：
```
[🏥速记面板标题]                    [关上]
[输入框 hxSjText（常驻，不autofocus）]
[挂图行 hxSjImgLine（有挂图才显示）]
──────── 💡想法 ▾ ｜ 🪄AI编辑 ▾ ────────  （两条下划线钮排，点哪条开哪盒，再点合上；两盒可同时开）
```
- 💡想法盒 hxSjIdeaBox（默认关）：原foldBox里除输入框外的全部内容照搬——原钮排（记下/↩补充上一条/📜翻看等老钮+🆘传黑匣子+🤖AI+📋收发记录+🪄AI编提示词+💾存成预设全留在这盒，id一个不改）+最近3条选条列表hxSjPrevList+提示词模式行hxSjPptMode+小输入条hxSjPptReq。
- 🪄AI编辑盒 hxSjAiBox（默认关）：
  ```
  [点亮显示条 hxSjGlowLine：当前点亮：词「XX…」/鱼骨「XX…」/提示词「XX」/还没点亮东西]
  [命令钮排 hxSjCmdRow：🔤解释 🌿扩充 ✏️改提示词 📝总结 ➕]
  [🚀发送 hxSjAiSend]
  ```

## 二、刀口（hx-common.js HX.sj模块，v0.77.0→v0.78.0）
### 刀1 版面重构
- wrap.innerHTML里oOuter/oFoldBox两段作废重写为上图结构；hxSjText挪出foldBox常驻；
  hxSjPanel内顺序=hxSjText→hxSjImgLine→下划线钮排行（hxSjTabs：hxSjTabIdea/hxSjTabAi两个div.underline样式照hxSjFoldBar老样）→hxSjIdeaBox→hxSjAiBox→hxSjHint。
- 开门两盒皆关；输入框常驻但不抢焦点（不autofocus，键盘不请自来毛病不回潮）。
- hxSjFoldBar/hxSjFoldBox两个id作废删除（hx_t131_off=1时恢复，见刀7）。
- openPanel里t130刀1/刀2的foldBox收起逻辑改写为两盒皆关+sjGlowLineRefresh()。
### 刀2 命令预设账 hx_sj_cmds
- localStorage hx_sj_cmds=JSON数组[{name,cmd}]；无则出厂4条：
  🔤解释="解释这个词：用大白话讲清意思和用处"
  🌿扩充="把这根鱼骨头扩充一层，给出3-5个子点，每点一句话"
  ✏️改提示词=""（特殊钮：走刀5丙提示词对照链，cmd空=面板小条写要求）
  📝总结="把点亮的内容总结成三句话"
- 点命令钮=把cmd填进hxSjText（追加在已有内容后，空格隔开），不直发；钮置灰300ms防连点。
- 长按命令钮500ms=编辑条：该钮原地变三小件（改名input/改令input/🗑删），点别处或✕收起存回hx_sj_cmds；
  ➕钮=新增一条（弹同款编辑条，空名空令起步），存进账尾。账只增改删于本地，发版无关。
### 刀3 点亮显示条 sjGlowLineRefresh()
- 合成顺序（先到先显）：①localStorage chat_preset_cur有值→「提示词「名字」」；
  ②localStorage xt_glow_pend（HX.glow.getSel()可拿text，from标来源）→按from含「鱼骨」显「鱼骨」否则「词/选段」，文超12字截…；
  ③HX.pick账hx_pick_v1（pkey）→「元素 pkey」；全无→灰字「还没点亮东西——去正文长按点亮一个词/一根鱼骨/一条提示词」。
- 面板开/AI编辑盒开/发送后各刷一次。
### 刀4 发送链 sjAiSend()
- 组装user消息：点亮对象行（类型+内容全文，词/鱼骨取glowSel全文或xt_glow_pend.text，提示词取chat_presets里cur预设全文）+空行+hxSjText命令文；
  若chat_preset_cur有值且非改提示词命令，该预设全文作system提示词一起发（洪老师：发送时把提示词一起发送）。
- 走HX.fc.go（统一收发记账，kind:'sj_ai'）；发送钮置灰改字「⏳AI想着呢…」，回来恢复（禁用hxToastHold当等待提示——常驻黑框挡屏教训）。
- 失败：sjToast明白话+输入框内容不清。
### 刀5 回流三路
- 甲·词/选段：结果存解释账hx_sj_exp（数组只增，{eid,word,exp,ts}）+写回传pend localStorage xt_glow_back={type:'exp',word,eid,ts}；sjToast「解释已放到词后面（回书生效）」。
- 乙·鱼骨：写xt_glow_back={type:'fish',text:AI结果,ts}；sjToast「扩充已送回鱼骨（回书落账）」。
- 丙·改提示词：hx-common直接弹新旧对照浮层（新容器hxSjPptDiff整屏仿hxSjFcPg样式）：顶行「AI说改了啥：」+AI结果首行（约定DS提示词模板：首行写一句改动说明，第2行起是新预设全文）；中间旧全文/新全文两栏并排（窄屏上下）；底三钮「✅放回去」「✕算了」。✅才写chat_presets该条+toast；✕只关层。chat_preset_cur不动。
### 刀6 提示词点亮+选中持久化（software-chat.html v0.24.0→v0.25.0）
- 预设行（.preset-row）加长按500ms点亮：写localStorage chat_preset_cur=该预设id+亮黄底（.preset-row-lit样式仿glow黄底）；再点别的行换点亮；点已亮行=灭（清chat_preset_cur）。
- 开门读chat_preset_cur恢复亮底（t130留账选中持久化，一并补）。
- 点亮同时写xt_glow_pend={text:'提示词「名」全文…',from:'chat预设',ts}供面板显示条认。
### 刀7 退回闸
- hx_t131_off=1：恢复v0.77.0版面（foldBar+foldBox老结构，输入框回盒内折叠），命令账/解释账保留不读；
  chat侧hx_t131_off=1：预设行长按点亮+选中持久化全退老样。
- 小涛侧hx_t131_off=1：不收xt_glow_back。

## 三、刀口（software-xiaotao.html v0.27.0→v0.28.0，收回流）
### 刀8 收xt_glow_back（开门+闲时各查一次，1小时过期）
- type=exp：在已写章正文找word第一次出现的文本节点，节点后插<span class="xtExp" data-eid>①</span>（标号=该章第几个解释顺排①②③）；
  点①弹层显hx_sj_exp[eid].exp（层仿glow浮条样式，✕关）。找不到词=留在账里，浮条加「📖N」钮点开看列表。
- type=fish：照t128「➕补充这一层」老路——当前glowLevel鱼骨层下插回子级落账（AI结果按行切子点）；无点亮鱼骨层=存pend等下回，浮条「🌿N」钮提示。
- 收成功才removeItem xt_glow_back。

## 四、严格约束
- hx-common只动HX.sj模块+版本号+HX.glow段加getBack口；chat只动预设系统段；xiaotao只动glow/开门段。
- 全部新id以hxSj/hx_t131系命名；老id老函数名一个不改不删（刀1作废的两个id除外，off闸要用）。
- 每刀头注释「v0.78.0/v0.25.0/v0.28.0 2026-10-27 SPEC_t131 刀N」。

## 五、双闸+仿真清单
node --check两js；仿真（stub DOM+localStorage+HX.fc/HX.glow stub）：
版面三行结构/两盒开合互不影响/输入框常驻无autofocus/命令账出厂4条+增删改存/点亮显示条三来源+空态/发送组装含预设system/发送置灰恢复/fc缺位不炸/词回流写pend+解释账/鱼骨pend/提示词对照层三钮/✅写回✕不写/chat长按点亮+灭+开门恢复/小涛收exp插标号+找不到留账/收fish走t128通道/off三处各退。

## 六、销号标准（真机见效才算）
①开门点🏥：输入框一直在，键盘不自己来；②💡/🪄两条下划线各开各盒；③点亮词发「解释这个词」→回书词后有①点①看解释；④点亮鱼骨发扩充→子级落账；⑤chat长按预设行点亮→面板显示条认得→发话带预设；⑥改提示词弹对照→✅放回chat里变；⑦hb自报v0.78.0。云侧可核=hb版本自报+hx/ver retained。
