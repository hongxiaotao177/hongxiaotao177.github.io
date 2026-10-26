# SPEC_t130 v2 速记面板折叠+输入框兼提示词编辑+收发记录（2026-10-26洪老师两轮讨论拍板）

## 拍板原文对齐
- 「输入框顶了天看不到收录内容，以前落过案」→折叠根治：输入区默认收起，键盘不请不来；
- 「输入框+存起来/补充上一条/查看这些想法功能折起来变成一个下划线，版面简洁」；
- 「输入框兼做提示词编辑框：框里输提示词要求→选AI编提示词→送AI编→回来内容在这框里显示→可放到AI总管变预设；也可在AI总管点亮某条预设→回浮窗输入框输要求→AI改这条提示词」；
- 「浮窗AI功能是不是黑箱、能不能看过程」→加📋收发记录页；
- 按钮布局拍板：🆘传黑匣子、🤖AI 两颗留外面常驻，其他全部折进去。

## 改件：hx-common.js 独改（v0.76.0→v0.77.0）。chat/xiaotao/index/guanjia/壳 一行不动。
（预设反向点亮复用现有chat_preset_cur——chat里选中预设本就写进内存，t130配套在hx-common侧读localStorage chat_preset_cur；chat零改动。注：chat的curPreset目前不持久化，本SPEC另立规矩：chat_preset_cur由hx-common写入和读取；chat后续班再补持久化恢复，本件不动chat。）

## 现状锚点（Kimi 2026-10-26亲读实锤）
- HX.sj模块：ensureUI()里wrap.innerHTML拼面板：#hxSjText(textarea)+#hxSjImgLine+.hxSjBtns(记下hxSjSave/↩补充上一条hxSjPrev/📜翻看hxSjBrowse/✅验收hxSjChk/🆘传黑匣子hxSjSos/📮叫Kimi会诊hxSjWz/📷图hxSjImg/extraBtn/关上hxSjClose/🤖AI hxSjAiBtn条件出)+#hxSjPrevList+#hxSjHint；另有#hxSjToast、#hxSjBrowsePg整屏翻看页。
- openPanel() toggle面板display，开面板不自动focus（挂号#128修法）。
- sjKbFit()键盘弹起时面板贴可视区底上8px（v0.72.0 t123刀3根治版，hx_sj_kbfit_off=1退钉顶）。
- HX.fc.go({kind,from,sys,usr,opt},cb(ok,txt,by))统一收发口+账本hx_fc_log环形200，HX.fc.tail(n)新在前；fc缺位时hx_fc_off或HX.fc未挂。
- chat_presets账格式：[{id,name,gist,rule,withCtx,ctxN,created,kind}]，HX.store.set('chat_presets',json)+localStorage双写。

## 刀口
### 刀1 折叠版面
- wrap.innerHTML重构：面板内新增折叠条 <div id="hxSjFoldBar">✏️ 写想法/改提示词 ▾</div>（样式=文字带下划线小条，字号18，cursor:pointer）；新建折叠盒 <div id="hxSjFoldBox" style="display:none">，把 #hxSjText、#hxSjImgLine、原.hxSjBtns里除 hxSjSos 和 hxSjAiBtn 外的钮、#hxSjPrevList 全挪进折叠盒；hxSjSos、hxSjAiBtn、hxSjFoldBar 三件套在折叠盒外常驻（顺序：折叠条在上，🆘和🤖AI一排）。
- 点折叠条=foldBox display none/block切换+箭头▾/▴；开面板时foldBox一律收起态（每次开门都是简洁版面）。
- hx_t130_off=1：折叠条display:none、foldBox默认展开、按钮位置全老样，整刀退。
- 绑定段bind()加foldBar点击；其余钮绑定一行不动（挪了父容器不影响id绑定）。
- 关上钮照留折叠盒内；折叠态关面板=再点🏥圆点（openPanel本就toggle，不改）。
### 刀2 输入框兼提示词编辑
- 折叠盒内按钮排加两钮：<button id="hxSjPptGen">🪄AI编提示词</button>、<button id="hxSjPptSave">💾存成预设</button>；折叠盒顶部加一行 <div id="hxSjPptMode" style="display:none">（小字：正在改预设：xxx ✕退出）+一个小输入条 <input id="hxSjPptReq" placeholder="...">（默认也藏，进提示词模式才亮）。
- 模式判定（开面板/点亮变化时刷一次）：读localStorage chat_preset_cur→在chat_presets（先HX.store.get，缺位localStorage.getItem）找到该id→**改预设模式**：hxSjPptMode亮出「正在改预设：<name>」+✕退出（点✕清chat_preset_cur回生成模式）；#hxSjText自动填入该条rule全文；hxSjPptReq亮出placeholder='输修改要求，如：再短一点'。找不到id/键空→**生成模式**：hxSjPptMode藏；hxSjPptReq亮出placeholder='大白话说要求，AI帮您写提示词'（框不动用户内容）。
  - ⚠️生成模式下hxSjText是想法框，用户可能正写想法——🪄生成回来**回填前若框里已有非空内容且不是上次生成结果，先confirm式确认太烦，改方案：回填前把原内容暂存hx_sj_idea_bak，toast提示「原想法已暂存，点↩补充上一条可找回」**——简单点：生成回填直接覆盖，但把被盖内容push进localStorage hx_sj_idea_bak数组(最多3条)，📜翻看不动它，toast明示。
- 🪄点击：
  - 生成模式：req=hxSjPptReq.value，空则toast'先在下面小条里写要求'；sys='你是提示词写手。用户是ICU医生，零基础提示词知识。根据他的大白话要求写出一条可直接发给AI的中文提示词。只输出提示词本体，不要解释、不要编号、不要引号、不要markdown。' usr=req；走HX.fc.go({kind:'presetgen',from:'速记面板'},cb)；fc缺位=toast'AI通道没上岗'。生成中黑框hxToastHold('AI写提示词中…')+回来自动关（成功toast'写好了，在上面框里过目'）；结果trim后回填#hxSjText（覆盖前按上面暂存规矩）。
  - 改预设模式：req=小条值，空则toast同上；sys='你是提示词改稿手。用户给出一条现成提示词和修改要求，输出改后的完整提示词。只输出提示词本体，不要解释、不要编号、不要引号。' usr='【现成提示词】
'+大框值+'

【修改要求】
'+req；kind:'presetedit'；回来回填大框，toast'改好了，过目后点💾存回预设'。
- 💾存成预设：
  - 生成模式：大框值非空才办；新条目{id:'p_'+Date.now()+'_'+100~999随机,name:req前12字(空则'面板生成'),gist:大框值前40字,rule:大框值,withCtx:false,ctxN:0,created:Date.now(),kind:'ask'}；读出chat_presets数组push后HX.store.set+localStorage双写（HX.store缺位只写localStorage）；写chat_preset_cur=新id；toast'💾已存进预设，AI总管里能看到'。
  - 改预设模式：更新该id条目的rule=大框值、gist=前40字，双写；chat_preset_cur保持；toast'💾预设已更新'。
### 刀3 📋收发记录
- 折叠盒内按钮排加 <button id="hxSjFcLog">📋收发记录</button>；新整屏容器<div id="hxSjFcPg">（样式照抄hxSjBrowsePg，z-index同层）。
- 点=整屏列HX.fc.tail(50)：标题行「📋 AI收发记录（最近50笔，新在前）」+✕关上钮；每笔一块：时间(MM-DD HH:MM)+kind+from+✅/❌+败因why(有才显)+入X字/出Y字；fc缺位显'收发台没上岗，暂无记录'；空账显'还没有记录'。只读页，无任何写操作。
### 刀4 开关
hx_t130_off=1：刀1折叠退老样+刀2两钮和模式行不出+刀3钮不出，全退。

## 严格约束
只改HX.sj模块ensureUI的HTML拼接/样式串/bind()/openPanel刷模式一处+新增函数若干；其他模块一行不动；ES5老WebView写法；每刀头部追加修改记录注释；必须改别处停下申报。

## 销号标准
真机：①开面板默认只见折叠条+🆘+🤖AI三件套，点下划线才出输入框和那排钮；②键盘不再顶天（折叠态无框可弹）；③生成模式：小条写要求→🪄→大框出提示词→💾存后进AI总管预设列表可见；④AI总管选中一条预设→回面板自动进改预设模式大框装好原文→小条写要求→🪄改稿回填→💾存回；⑤📋收发记录列出最近收发每笔成败；⑥hb自报hx-common v0.77.0；⑦hx_t130_off=1回老样。云侧可核=hb版本自报。
