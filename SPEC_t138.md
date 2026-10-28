# SPEC_t138 浮窗四病根治（洪老师2026-10-28拍板：全是影响全局的毛病，做完闭环再交班）

真机实锤：2026-10-28 09:30 壳探针自报 chat=0.30.0（已吃t137），11:34/11:36/11:38三条想法+洪老师当面对质。

## 病根四桩（Kimi已挖到行号级）
- **病1 输入框顶天六犯**：hx-common `sjKbFit()` 键盘弹起分支靠 visualViewport 算几何钉顶，X5上推模式屡次治不断根。
- **病2 鱼骨第3层题目点不亮**：chat `renderNode()` 叶节点（level>=3）提前 `return line`，**从没绑 _bindLongPress**；且非叶行调用 `_bindLongPress(line,node,_path,title,body)` 漏传第5参 idxPath，fb_glow_node 定位账恒空。
- **病3 浮窗输入框自带「修改提示词」脏内容**：hx-common `sjPptModeRefresh()` 改预设模式 `taEl.value=String(found.rule||'')` 把提示词全文灌进主输入框 hxSjText，openPanel 每次开门都刷一次，用户写的话被顶掉。
- **病4 🤖AI钮还开老面板**：sj 建 UI 时 HX.ai 还没 init（`HX.ai.ready()` false）→ 🤖AI钮不进HTML → sj侧 t132刀6 绑定落空；随后 `HX.ai.init` 的 `sjAiBtnAdd()` 补建钮，挂的是老路（关面板+ai.open()）。洪老师按到的永远是这个补建钮。

## 四刀（只许动下列点位，一行不多动）
### 刀1 sjKbFit 弃算几何改确定布局（hx-common）
键盘弹起分支（kbOut为真且 hx_sj_kbfit_off!=='1' 且 hx_t132_off!=='1' 的新路分支）改为：
- `p.style.top='0'; p.style.bottom='0'; p.style.left='0'; p.style.right='0'; p.style.maxHeight='none'; p.style.height='100%'; p.style.overflowY='auto';`
- 输入框 `hxSjText` 钉第一屏：存在则 `ta.scrollIntoView()` 包 try（X5不认就静默），并 `ta.style.maxHeight='30vh'`。
- 键盘收起分支还原新增的几个样式（top/bottom/left/right/maxHeight/height/overflowY 全置 ''，ta.style.maxHeight=''）。
- focus/blur 监听已有（4546/4547行）不动；visualViewport resize 监听不动；老的 hx_sj_kbfit_off/hx_t132_off 两个退避分支一字不动。
- 新增总开关：`hx_t138_off==='1'` 时刀1整刀退回 t132 钉顶老码（即本刀新码外层包 if(hx_t138_off!=='1')）。

### 刀2 renderNode 叶节点也绑长按点亮 + 补传 idxPath（chat）
- 叶节点分支 `return line;` 之前插一行：`_bindLongPress(line, node, _path, title, body, idxPath);`（click 开 fbFull 已有 _lpSuppress 闸，长按不会误展开，互不打架）。
- 非叶行 `_bindLongPress(line, node, _path, title, body);` 改 `_bindLongPress(line, node, _path, title, body, idxPath);`。
- 其余一行不动。`hx_t138_off` 闸不必加（点亮是补缺，_t128off 总闸已罩住 _bindLongPress 首行）。

### 刀3 主输入框永不装提示词（hx-common）
- `sjPptModeRefresh()` 删 `if(taEl){ taEl.value=String(found.rule||''); }`；改预设模式改灌过目框：调 `sjPptNewBoxEnsure()` 拿到盒后，把 `found.name` 填 `hxSjPptNewName`、`found.rule` 填 `hxSjPptNewRule`（盒在 aiBox 内，用户切到🪄AI编辑页才看见）。生成模式分支一字不动。
- `sjPptGen()` presetedit 分支 `var big=taEl?String(taEl.value||''):'';` 改取过目框：`var _ru=document.getElementById('hxSjPptNewRule'); var big=_ru?String(_ru.value||''):'';`（取不到退空串，usr照拼不炸）。
- `hx_t138_off==='1'` 时刀3退回老行为（taEl.value灌rule + sjPptGen取taEl）。

### 刀4 🤖AI钮补建也走新门（hx-common，HX.ai模块 sjAiBtnAdd）
- `sjAiBtnAdd()` 里 `b.addEventListener('click', ...)` 老路前加同 t132刀6 三判：宿主（location.pathname含'software-chat' 或 title含'AI总管'）且 `hx_ai_old!=='1'` 且 `hx_t132_off!=='1'` 且 `hx_t138_off!=='1'` → 原地展开 `$('hxSjAiBox').style.display='block'`、`$('hxSjIdeaBox').style.display='none'`、try调 `sjPptListRender()`（注意：sjPptListRender 是 HX.sj 闭包私有，ai 模块摸不到——改判：若 `window.HX&&HX.sj&&typeof HX.sj.pptListRender==='function'` 则调之；**配套在 HX.sj 公开口挂一行 `pptListRender: sjPptListRender`**），然后 return 不走老路。
- sj 模块 4613 行原有绑定保留不动（防某些宿主时序不同），双保险。

## 版本号
- hx-common v0.83.0→**v0.84.0**，chat v0.30.0→**v0.31.0**，SW_VERSION 注释按套路口径记四刀+开关。
- 红线：发送链/命令闸/话仓闸/收发室/预设表单存储/文献三核/PDF问答/看门狗/🌐联网/户口/fbParse/fbSerialize/fbFull/applyFishbone/delBubble/记账/脑图/t122~t137各开关 全 IDENTICAL。

## 验收（仿真必须过）
1. sjKbFit：构造 vv={height:400,offsetTop:0} innerHeight=800 → 面板 style 全屏四0+height100%+maxHeight none；keyboard收 → 全还原；hx_t138_off=1 → 走老钉顶。
2. renderNode：三层树，叶行 touchstart 500ms → HX.glow.setSel 收到 title 且 fb_glow_node 账 idxPath 非空；叶行 click 仍 fbFull；非叶行 idxPath 正确穿透。
3. sjPptModeRefresh：chat_preset_cur 有值 → hxSjText.value 保持用户原文一字不动，hxSjPptNewRule 灌进 rule；sjPptGen presetedit usr 含过目框新词。
4. sjAiBtnAdd：chat 宿主补建钮 click → hxSjAiBox display block，ai.open 没被调；非chat宿主 → 老路。
