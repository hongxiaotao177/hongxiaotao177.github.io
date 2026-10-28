# SPEC_t137 速记面板两分家＋问AI页提示词清单＋鱼骨归提示词管

## 拍板原话（2026-10-28 接班班后讨论，洪老师「同意你的意见，开工」）
1. 点亮菜单藏起来，最少在二级，不是每次都看；
2. 第一页=输入框+下划线功能钮，💡想法/🪄AI功能放第一行（现状已是，不动）；
3. 第二页分两分支：想法分支／问AI分支，现在混在一起是病根；
4. 问AI页=提示词：出厂预设几个＋顺手加提示词（点＋→输入框写要求→发送→AI回话接过来→看一眼可改→直接存档）；AI顺手起短名可改；
5. 鱼骨头增减在提示词里体现：选了「鱼骨式回答」提示词才出鱼骨，代码不再自动拼鱼骨段；
6. PPT/出题/变笔记等收进「更多」不丢不占版面。

## 刀A（hx-common v0.83.0）：sj面板两分家
现状（v0.78~v0.82结构）：oNewBody=hxSjText常驻 + 外排🆘/🤖AI + #hxSjTabs(💡想法/🪄AI编辑) + hxSjIdeaBox + hxSjAiBox。混居实锤：oFoldBtns 里 hxSjPptGen(🪄AI编提示词)/hxSjPptSave(💾存成预设)/hxSjFcLog(📋收发记录) 塞在想法钮排；hxSjPptMode/hxSjPptReq 在 IdeaBox。

- 刀A1：oFoldBtns 拆两半——想法钮排只留想法件（记下/📜翻看/✅验收/📮叫Kimi会诊/📷图/补充上一条/关上）；hxSjPptGen/hxSjPptSave/hxSjFcLog 三钮挪进 hxSjAiBox。
- 刀A2：hxSjPptMode（正在改预设行）+ hxSjPptReq（要求小输入条）从 IdeaBox 挪进 AiBox 顶部。id 不变，绑定函数一行不动。
- 刀A3：AiBox 内新排布（自上而下）：
  ① hxSjPptMode + hxSjPptReq（刀A2挪来）
  ② 提示词清单容器 #hxSjPptList（刀B1渲染）
  ③ 「更多…」折叠条 #hxSjMoreBar：点开才见老命令排 hxSjCmdRow（原样挪入，sjCmdRowRender不动）+ 🪄AI编提示词/💾存成预设/📋收发记录三钮（刀A1挪来）
  ④ hxSjGlowLine 点亮条：只在有点亮时显示（sjGlowLineRefresh 里判空则 display:none），无点亮不占版面=「点亮菜单收二级」
  ⑤ 🚀发送 hxSjAiSend（原位不动）
- 刀A4：IdeaBox 最终=hxSjPptMode/hxSjPptReq摘除后 + 想法钮排 + hxSjPrevList，其余一行不动。

## 刀B（hx-common v0.83.0）：问AI页提示词清单＋加提示词链
- 刀B1：新函数 sjPptListRender()——读 chat_presets（同 sjPptSave 读取口径：HX.store.get 优先 localStorage 兜底），每条一行下划线文字钮（名字≤14字），点=写 chat_preset_cur=该id + 行首亮●标记 + sjPptModeRefresh()；清单头部一行小字「点一条当选中，发送就用它」；空清单显示「还没有提示词，点下面＋加一条」。AiBox 展开时（sjTabAi click/t132刀6分支）调用刷新。
- 刀B2：加提示词链改「过目存档」——现状 sjPptGen 生成模式把AI回话直接盖进 hxSjText 主输入框（盖想法！10-27 06:14 洪老师报过这个乱）。改：
  ① 生成模式 AI 回话不再碰 hxSjText，改填进新过目框 #hxSjPptNewBox（含名字 input#hxSjPptNewName + 提示词 textarea#hxSjPptNewRule + 💾存档 + ✕丢弃）；
  ② AI 起名：sjPptGen 生成模式 sys 追加「并在最后一行单独写：【名字】不超过8个字的短名」，回来解析剥名填 hxSjPptNewName（解析不到就取要求前8字兜底）；
  ③ 💾存档钮=新函数 sjPptNewSave()：读两框→push chat_presets（结构同 sjPptSave 生成模式：id/name/gist=rule前40字/rule/withCtx:false/ctxN:0/created/kind:'ask'）→双写（HX.store.set+localStorage）→清过目框→sjPptListRender()→toast「💾已存进提示词清单」；
  ④ 改预设模式（chat_preset_cur 命中）维持老路：回话仍进 hxSjText + sjPptSave 更新老条目——不动。
- 刀B3：hxSjPptReq 占位符生成模式文案改「大白话说要什么样的提示词，点🪄AI编」。

## 刀C（software-chat v0.30.0）：鱼骨归提示词管＋出厂五条预设
- 刀C1：出厂五条预设 seeding——开门时读 chat_presets，缺哪条补哪条（按 name 判重，已存在不盖用户改过的）：
  1. 大白话讲明白：rule=「请用大白话讲清：它说了什么、为什么重要、临床上怎么用。回答控制在200字以内。」
  2. 鱼骨式回答：rule=「回答控制在200字以内。【版面要求】用鱼骨格式回答：第一行写一句≤20字的人话总标题（不加任何记号）；其后每行一句人话，行首加层级记号（一级「- 」、二级「-- 」、三级「--- 」，三级封顶）；每个标题≤20字、必须读得懂；最末级下面给正文，每段正文≤200字。」+ 条目带 yu:1 标记
  3. 补充这一层：rule=「围绕给定的内容往下补一层：补它的细节、机制、要点，分条列，每条一句人话。回答控制在200字以内。」
  4. 变学习笔记：rule=「把内容整理成学习笔记：先一句话说清核心，再分条列要点，专业术语保留但用大白话解释。回答控制在200字以内。」
  5. 挑毛病：rule=「批判性审视这段内容：证据等级够吗？有没有过时或与最新指南冲突的地方？适用边界在哪？回答控制在200字以内。」
  seed 条目带 src:'t137' 留痕。
- 刀C2：presetBuildPrompt 鱼骨约定段收口——
  ① 无预设分支（1817行）：不再拼鱼骨版面段，只留「回答控制在200字以内。」（hx_chat200_off 老开关不动）；
  ② 有预设分支（1819行）：只在 preset.yu===1 时拼鱼骨版面段；
  ③ hx_yugu_off=1 老开关语义不变（拼段总闸）；hx_t137_off=1 时①②全退回 v0.29.0 老行为（无预设也拼/有预设必拼）。
- 刀C3：一律重排闸（t128刀2b，onOk 处 hx_yugu_off!=='1' 即立 _reflow）改：hx_t137_off!=='1' 时，只有当前预设 yu===1 才立 _reflow；无预设/非鱼骨预设→不重排，回信原样落泡。hx_t137_off=1 退回一律重排老行为。
- 刀C4：版本行+修改记录注释（追加，不插字符串拼接中间）。

## 红线（全 IDENTICAL）
hx-common：HX.keys/air/pick/mg/store/dav/gh/bill/step/selfUp/fm/ai本体/sj其余（save/appendLast/showPrevList/sjShowBrowse/sjWzSos/saveImg/sjUpload/sjKbFit/sjToast/sjCmdsLoad/sjCmdEditOpen/sjCmdRowRender/sjGlowLineRefresh判空外逻辑/sjAiSend/sjPptModeRefresh主逻辑/sjPptGen改预设分支/sjPptSave/sjFcLogShow）/bb/hxToastHold/chk/chat/jc/audit/wzPoll/jbl/aip/hc/zg/mqtt/fc；壳/index/其他单体一行未动。
chat：发送链主体/命令闸/话仓闸/收发室/文献三核/PDF问答/看门狗/🌐联网/户口/点亮手势本体/fbParse/fbSerialize/applyFishbone/renderNode/fbFull/fbGlowBackTake/delBubble/记账/脑图mg全件/t126~t136其余各开关 全IDENTICAL。只动 presetBuildPrompt 两段+onOk重排闸一处+开门seeding一处+版本行。

## 开关
hx_t137_off=1：刀A/B/C 全退回 v0.82.0/v0.29.0 老行为（结构与鱼骨老路）。

## 销号标准（真机见效才算）
① 面板第一页：输入框+🆘🤖AI+💡想法/🪄AI编辑第一行照旧；② 点💡想法=只见想法件，不见编提示词/存预设/收发记录；③ 点🪄AI编辑=提示词清单（出厂五条在）+更多…+点亮条（没点亮不显）+🚀；④ ＋加提示词：写要求→AI编→过目框（名+词）→改两字→💾存档→清单多一条；⑤ 选中「鱼骨式回答」问一句=鱼骨；选中「大白话讲明白」问一句=不出鱼骨、不重排；⑥ hx_t137_off=1 全回原样；⑦ hb自报 chat v0.30.0+hx-common v0.83.0。

## 费用预估（低估，实际可能更高）
外援DS一调≈2~4万tokens≈0.1元；GitHub约40次零费；真机提示词AI编每次≈几厘~2分。
