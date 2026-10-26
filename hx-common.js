/* ═══════════════════════════════════════════════════════════════════════════
   hx-common.js —— 全家9件软件共用公共件母版
   v0.58.0 2026-10-22（t95值夜班套件刀3，洪老师拍板「值夜班套件开工」，SPEC_值夜班_t95_V1，设计Kimi/终审Kimi亲手落地）：纯加法文件尾新增HX.yeban值夜质检员——壳vc66夜班窗口（22~07点∧充电∧关屏）每3分钟戳tick()轮转干一件（keys键值体检/bb黑匣子24h err条数/hb心跳），账写hx_yb_log(≤200)+成绩单hx_yb_score（跨天清零），tick顺手推仓根「夜班台账.json」（HX.gh.putFile四参，>1小时节流），总开关hx_yb_off=1，全模块try/catch包死不弹窗；既有码全件IDENTICAL
   v0.57.2 2026-10-21（t94壳MQTT常驻岗接管传话筒，洪老师新规「台前台后都应该通」：网页腿见壳旗退休、答卷走壳中继、shellIn入口接壳桥来信；上一版v0.57.1 t92 Paho入库已验引擎上岗，SPEC_hx-common_v0.57.0_Paho入库；再上一版v0.56.0 t91补账逮住病根；洪老师批「读不到值自己治别烦我」后不再等zc16直接全治；SPEC_hx-common_v0.56.0_mqtt静默路径补账，DS实现零编造+Kimi终审diff全绿）：刀A Paho缺失记hx_mqtt_err+上黑匣子+退避再试／刀B取钥匙失败补黑匣子／刀C 60秒到点在后台记hx_mqtt_err（不调退避，onVisChange兜底）；只动HX.mqtt IIFE四行，其余全件IDENTICAL，壳/index不动
   v0.55.0 2026-10-21（t89手机主账房闭环刀1，mqtt根治，洪老师冻结令唯一开工件；SPEC_hx-common_v0.55.0_mqtt根治，DS实现零编造+Kimi终审全采用）：HOST补/mqtt路径治paho构造同步抛异常（2参构造正则强制URI带路径，无斜杠即抛→静默吞→connecting永卡true→从未连上的真病根）+connecting=true挪构造成功后、构造失败记hx_mqtt_err退避重试；其余全件IDENTICAL，壳/index不动
   v0.54.0 2026-10-21（洪老师真机报自检报告「两个哨兵假报错」拍板开工；SPEC_t88_t86，DS实现5hunk零编造+缺版本锚点如实申报，Kimi终审全采用亲手落版本行）：刀A账房链哨假报错根治（t88/总账号6）——哨7翻localStorage hx_zf_checked永远空（index账房链写的是sessionStorage开门闸同名不同柜），哨/workline/detail三处改翻黑匣子k='zf'；刀B走查兵轮转（t86/总账号1）——HX.jc runRound slice(0,maxN)永远巡头3件，改hx_jc_cursor游标绕环取件；哨8传达室连线经核为真红（mqtt从未连上=A7在修）非假报错；红线HX.keys/air/pick/mg/store/dav/gh/bill/step/selfUp/fm/ai/sj/bb/hxToastHold/chk/chat/jc除申报点/audit/wzPoll/jbl/mqtt/arc全件IDENTICAL，壳/index不动
   v0.53.0 2026-10-21（洪老师拍板「这一版尽量把手机全量备份和对账规矩落地，保证下一个接班可以在手机本地取到文件」，合并总账t87档案柜真名归档+上行全量留底；SPEC_hx-common_v0.53.0_套装档案柜，DS实现+Kimi终审翻案2处亲手落地）：
     刀A 新增HX.arc套装档案柜模块（自包含IIFE挂window.HX，文件尾追加）——开门120秒起跑（错开jc/mqtt 60秒），过HX._autoNetOk闸；GitHub API列仓根三层分流：L1一层十四件（13常件+门条指名交接说明，每次必对：size一致断点续备单计l1ok，不一致才重下），三层其余.md/.json/.txt不含_备份_且≤2MB每轮hx_arc_max件（缺省5）断点续备；逐件HX.gh.getFile→utf8字节数→LearnShell.writeFileRel写→listFilesRel回读len对账，不等重试一次仍不等记fail；SAF老家模式先试写探针写不进直接收；档案柜台账.json本地+仓根双写（hx_arc_up镜像防重推，照HX.jc先例）；总开关hx_arc_off=1全停；公开口HX.arc.status()/run()。
     刀B HX.mqtt的handleMessage白名单加arcList（列档案柜清单）/arcRead（点名取一件，白名单=L1十三件+档案柜台账.json+门条指名交接说明，含..或/一律拒，件缺答lack）两op，全程try护栏；mqtt既有连接/重连/可见性/钥匙逻辑及jbSave/jbRead等旧op一行未动。
     刀C 版本行0.52.0→0.53.0+版本史本条。
     不做什么：本地永不反压写仓（正本仍是GitHub主账房，本地副本+救急）；jb.py四层选路留下一班（mqtt假勤A7治疗中，治好即通）；走查单加zc18巡档案柜台账=仓数据件Kimi亲手办不动码。
     红线：HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/HX.sj/HX.bb/hxToastHold/HX.chk/HX.chat/HX.jc/HX.audit/HX.wzPoll/HX.jbl全件IDENTICAL；HX.mqtt除刀B两分支外IDENTICAL；壳APK/index/其他单体一行未动。
   v0.52.0 2026-10-20晚班（t82踹门刀，洪老师19:55真机拍板「你现在就办吧」）：侦察兵原只比CUR.index，hx-common单件发版时index没变不破门→X5缓存旧页照跑，新零件躺尸（洪老师19:48自检报告无第8哨实锤）；新增HX.probeHx与idxProbe并行——直fetch公开仓version-hx-common.json在线小牌比HX_COMMON_VERSION，牌新→同款破缓存跳一次（与index破门共用hx_idx_probe防连跳标记）；index比对逻辑一字未动，index.html不动。SPEC_hx-common_v0.52.0_踹门刀，DS实现零编造6处拿不准如实标注，Kimi终审翻案1处=小牌fetch改在线真源（本地相对路径小牌可能旧/缺）。
   v0.51.0 2026-10-20晚班（t81 MQTT连线哨，改进闭环单A7漏检案第二号——传达室登记簿实锤hx_suit自10-19建室从未连接，传话筒/真机自报/交班本地存取三批假勤；洪老师拍板「干」；SPEC_hx-common_v0.51.0_MQTT连线哨，DS实现零编造2处拿不准如实标注+Kimi终审亲手落地）：
     刀A HX.mqtt段三处纯加法记账——A1两处连上分支写hx_mqtt_ok_t并清hx_mqtt_err；A2 onFailure写hx_mqtt_err错误码+黑匣子；A3取钥匙失败写hx_mqtt_err。连接/重连/可见性/取钥匙逻辑一字未动。
     刀B HX.audit的getSentinels()数组末尾追加第8哨「传达室连线」（key=mqtt，period=26h，last取hx_mqtt_ok_t）。
     刀C HX.audit的detail()加mqtt分支——最近连上/最近连不上/现在状态三行。
     刀D 版本行0.50.0→0.51.0+版本史本条。
     红线除刀A三处+刀B一元素+刀C一分支+刀D外全件IDENTICAL；销号=自检报告MQTT哨见「连上」或逮住错误码治好病根转绿。
   v0.50.0 2026-10-20（监察效果套件A1走查单扩容，洪老师拍板「套件全做」；SPEC_hx-common_v0.50.0_走查单扩容，DS实现零编造+Kimi终审亲手落地）：
     刀1 HX.jc新增只探测算子has——限HX.开头点路径方括号逐段取（禁eval/Function），在/缺/格式错/异常四态；runStep探测链+dispatch各加一行；走查单ver升2026-10-20b追加zc6~zc15巡15件新功能。其余算子/模块/单体一行未动。
   v0.49.0 2026-10-20（t79任务2交班本地存取，洪老师拍板「交班三小件写手机本地固定文件夹；接班先读本地、读不到再上网取」；SPEC_hx-common_v0.49.0_交班本地存取，DS实现+Kimi终审翻案2处亲手落地）：
     刀A1 HX.mqtt的handleMessage白名单加2个op——jbSave=三小件（jb_交接说明.md/jb_任务总账.md/jb_version-all.json白名单外拒写）b64落壳授权文件夹+jb_manifest.json（记jiaobanName比对锚）；jbRead=读回manifest+三件应答；桥不在/缺件如实答false，hx_jbl_off=1全关；
     刀A2 新增HX.jbl公开口status()（bridge/manifest/filesOk，全try护栏）；
     问诊室四op/连接/重连逻辑一行未动；壳Java不动。配套jb.py v3.4（接班①手机本地层+push_local交班推送）。
   v0.42.0 2026-10-18深夜（t65救火，洪老师真机四图「好像安装不成功」）：index真身侦察兵——同vc内装件reload同URL被X5缓存旧页+刀2误回滚死循环，治法=主界面开门实时fetch真身比CUR.index，文件新→location.replace带新query破缓存跳一次（跳过去相等自然停+sessionStorage副防）；只探主界面，全程try静默；其余一行未动，壳Java不动。
   v0.41.0 2026-10-18（晚班救火t63，洪老师真机连报「📋行不亮/点了没反应」云侧实锤：v0.38.0监察员班DS补丁截断雷——HX.jc模块插进HX.chk的IIFE体内时吃掉chk启动段if头，残留裸ntListener行→每次加载必炸ReferenceError→HX.chk=undefined验收牌模块死+其后模块全不执行；SPEC_hx-common_v0.41.0，DS出补丁零编造+Kimi终审亲手落地）：
     刀1照v0.37.0原文恢复chk启动段if(document.readyState==='loading'){document.addEventListener(...)}；刀2本版本号；刀3本条目。jc嵌套位置不动（它在运行，不重构），其余一行未动。
   v0.17.0 2026-09-24（班②一期，洪老师拍板「开工」，改码工兵严格照清单动刀，两刀）：
     刀H1 AI面板第一层平铺化（回退hx_ai_flat_off=1）；刀H2 自建模板升舱字段baseId/wantShibu。
   v0.16.4 2026-09-23（班·批改病历③，洪老师班③拍板「点亮长效」，改码工兵严格照清单动刀，一刀）：
     刀1 HX.pick点亮长效化——撤掉v0.13.0的30秒自动灭（TTL判定+30秒定时器整段撤）：30秒太短，点亮翻菜单翻半分钟就灭。
       点亮后一直有效，直到①点亮别的件（set/长按换行覆盖，老行为不动）②手动取消；再长按同一行熄灭老行为不动（不再看30秒）。
       手动取消=面板顶部亮牌行点亮文字旁加小「✕」，点了清账本+亮牌消失+toast「已取消点亮」；
       点亮随行发AI的老行为不变（点亮的文件会一直随行，不想要了点✕取消）。账本hx_pick_v1格式{app,pkey,fname,ts}一字不动，老宿主零影响；
       其余一行未动。
   v0.16.3 2026-09-23（班·批改病历，洪老师拍板，纯加法两刀，其他软件不传新钩子零影响）：
     刀A 新增公开口 HX.ai.openEdit(id, idx)——open(id)进条目第2层后，模拟第idx套提示词按钮的现有点击链
       （querySelector('[data-hxaip="idx"]').click()）自动进该套编辑页，编辑页代码不复制不另起炉灶；
       条目/套不存在或UI没就位静默返回false不炸；
     刀B 提示词编辑页按钮行旁新增容器 div#hxAiHostBtns（渲染HTML时恒在、宿主没传editHooks或返回空=留空，
       版面与老版一致）；渲染编辑页末尾调宿主钩子 opt.editHooks(itemId, idx, api)，
       api={getText读编辑框, setText写编辑框, saveNow与hxAiSaveP同一条存储链（直调it.pset/覆盖账本）, itemId, idx}；
       全程try护栏，钩子炸了只warn不影响编辑页；其余一行未动
   v0.16.2 2026-09-19（洪老师拍板「我把key放哪了你都知道，你去把它取回来填上」）：刀D云端取回（只下不上，一次性救援腿）——
     HX.keys新增warm()：开门时本地get()/getQwen()都空才动手（本地有key直接return不碰云端）；
     腿①坚果云：davAsync('down',user,pass,'/学习套装数据/hxdata_hx_keys.json','hxdata_hx_keys.json',cbId)同款Promise包装（HX._davCbs+120秒死心），
       成功后get()/getQwen()走_loadFile现成链路自动灌回localStorage+toast「🔑 钥匙已从云端取回」；
     腿②GitHub私有仓（腿①失败或没dav钥匙时）：gh.fetch GET raw.githubusercontent.com/hongxiaotao177/xuexi-backup/main/hxdata_hx_keys.json
       （Authorization: Bearer t）→b64文本LearnShell.writeFile落真源→灌回；两腿全败静默（AI面板aiAskKey浮层仍是人工兜底）；
     开门自动跑一次（文件末尾装完即挂，只此一处）；上行链一行未动——key文件永不主动上传
   v0.16.1 2026-09-19（洪老师拍板）：AI钥匙反复丢两刀——
     毛病：壳页面端口8931~8951换着开，localStorage按端口换房，hx_apikey/hx_qwenkey反复丢，每次用AI都要重填Key；
     病根：Key只存localStorage，端口一变就等于搬家，旧房的钥匙拿不到；
     治法：刀A=HX.keys加_saveFile/_loadFile，set/setQwen(新增)写完localStorage顺手把{kimi,qwen} b64落壳授权文件夹
       hxdata_hx_keys.json当真源（桥不在静默跳过，全程try护栏），get/getQwen三条localStorage链都空时读真源回填；
       key文件本地写真源；云端只下不上——仅warm()救援腿从坚果云/私有仓读回，永不主动上传（dav/mg/同步链一概不上行hxdata_hx_keys.json）；
       刀C=AI面板4处没Key守卫改弹当场填钥匙浮层aiAskKey（Kimi必填+千问可选+💾存钥匙+✕，z-index 99995压过面板99993），
       原提示话作浮层标题，return不变；其余一行未动
   v0.15.1 2026-09-18 班③（挂号E，洪老师拍板）：AI面板第2级提示词套行做成明显大钮——原来渲染成.hxAiRow文字行
     （看着像说明字，洪老师不知道能点）；改带▶图标+边框+圆角+绿系底色（.hxAiPromptBtn，照.hxAiGo绿色系），
     一眼是可点的钮；只改renderL2渲染HTML+CSS字符串，点一套进编辑页等逻辑一行不动。
   v0.15.0 2026-09-18（洪老师2026-09-18 08:10速记拍板，效果图屏③）：HX.sj速记面板加「↩ 补充上一条」钮——
     毛病：想在上一条基础上接着写只能凭记忆重打；
     方案：点钮弹出最近3条速记列表（相对序「上一条/上上条/再上一条」+时间+内容预览前两行，从现行存储读：
     壳文件「速记流水.txt」为主、localStorage现行镜像键hx_sj_uplocal兜底，不新建平行账本）；
     点哪条=那条原文整行回填进输入框，洪老师接着加字，点「记下」走原save=新增一条（铁律17：速记只增不删，原条一个字不动）；
     点列表✕或面板空白处关列表无副作用；一条都没有时toast人话「还没有速记可补」；
     📷附图链路/自动上行链路/v0.1.1 extraBtn原「补充上一条」（追加到末行那个）一行未动；存储键名一个未改；其余一行未动
   v0.13.2 2026-09-16 班④：闲时速记上行认hx_sj_skip_once标记跳过（摘「检查新版本」按钮带出的多余同步），其余一行未动
   v0.13.0 2026-09-16 班① 第5条：新增长按点亮零件 HX.pick（列表行长按1.5秒点亮该行、账本hx_pick_v1、30秒自动灭、再长按同一行熄灭、点亮别行自动换；触摸+鼠标两路，移动超10px或提前松手取消；堵安卓长按系统菜单）+ HX.ai面板顶部亮牌行（面板打开/每次发送前刷新，显示已点亮文件名或引导语；发送内容仍由宿主决定，不新造数据通道）；其余一行未动
   v0.12.2 2026-09-15（挂号#95，洪老师真机报"速记取图后点输入框又跳图库、不显示取图成功"）：病根=X5壳侧fileChooser回调悬挂在常驻隐藏input上无法自愈，下个手势重放弹图库+saveImg重活链断无回执——①📷取图改每次临时造input用完即弃 ②选图在途闸防重弹（focus+30秒超时兜底复位） ③saveImg改createObjectURL优先+15秒看门狗超时报明白话；其余一行未动
   v0.14.0 2026-09-17（洪老师拍板）：HX.fm.pick多选模式底栏加「☑全选/☒全不选」钮——
     点一下把当前列出的文件全勾上；「含子文件夹」勾开着且没搜词时用fmWalk递归把子文件夹里的也一起全选（跟着勾走）；
     再点（已有勾选时）=全不选。hideKit过滤照走，文件夹不选。纯加法，其余一行未动
   v0.12.0 2026-09-15：新增HX.fm手机文件夹逛一逛（Android壳全盘文件桥MANAGE_EXTERNAL_STORAGE六桥契约：fmGranted→"1"/"0"、fmAsk跳权限设置页、fmRoots列内部存储+U盘/SD挂载点、fmList目录在前、fmWalk递归只文件壳限2000、fmRead→base64）——ensure没权限弹引导浮层「去允许」+每秒轮询30秒超时；pick全屏仿电脑资源管理器（面包屑每段可点回跳+搜索框+「含子文件夹」勾默认勾走fmWalk按名过滤平铺、📁目录点进、文件按扩展名出图标txt📄/pdf📕/图🖼/其他📎带大小日期、多选「✅收N份」/单选点中即定/挑文件夹可选当前或点进子目录再选；✕/取消=cb(null)）；read封装fmRead→Promise(base64)；无壳/老壳桥不存在一律静默降级不报错；其余一行未动
   v0.11.1 2026-09-14：速记📷附图两步走（#94：选图不再立刻记行关面板，挂图行可续写说明，点「记下」图随话进流水；回执写明图存壳里+联网传坚果云/速记图/，传成行尾标☁；✕可撤销）；其余一行未动
   v0.10.0 2026-09-14：安心条HX.step（顶部细进度条+两行小字，愣住定格可拍照定位，洪老师拍板全家统一）+速记📷附图（📷图钮→压图宽≤1280存壳文件夹sjimg_*+行尾挂图+坚果云/学习套装数据/速记图/排队上传）；其余一行未动
   v0.7.0 2026-09-12：HX.dav全异步化（根治#75/#77 dav同步联网卡死主线程）——davCall走壳v1.6.0 davAsync后台桥+回调，
     rescue/mirror逻辑不变只换异步腿；旧壳没davAsync静默跳过（不回退同步老路再卡界面），壳升v1.6.0后自动恢复。
   HX_COMMON_VERSION = '0.6.0'（2026-09-10 plan2 军规：钥匙统一+收公共块+不崩溃压倒一切）
   v0.6.0 2026-09-12 地基二期：坚果云腿HX.dav的rescue从「只补缺失」升级为「ts对账」——davList云端清单带mtime后逐键比对：本地缺云端有照旧davDown补回；两边都有且云端新过本地超5秒，先把本地旧件留档hxdata_<key>_冲突_时分秒.json再davDown盖回；本地较新或相等顺手davUp让云端追平；云端没有顺手davUp补齐云端。单件失败跳过，list失败照旧直接返回，mirror的debounce 10秒不动；其余一行未动
   v0.5.0 2026-09-12：新增中转邮路HX.relay（单体备份永远重试+回读核对才销号+大白话状态条🟢🟡🔴）+坚果云腿HX.dav（壳内铁仓库：mirror镜像/rescue救命腿只补缺失不盖已有）；其余一行未动
   v0.4.0 2026-09-12：新增仓管员HX.store，地基工程一期规矩A/B落地（规矩A：一套门存取；规矩B：时间定新旧、冲突留档不覆盖）；修正：真源文件名前缀hxdata_沿用大管家旧档、兼容老hxStore裸档按mtime认读并升级信封、留档文件名放行中文「_冲突_」字样、留档名时分补秒防同分互盖；其余一行未动
   v0.3.0 2026-09-11：部件自升级HX.selfUp（洪老师拍板彻底治"壳内部件不更新"病根：开门闲时比对云端version-hx-common.json，旧了静默下载新版写回授权文件夹，下次开门生效；全程不弹窗，没壳/没网跳过）；其余一行未动
   v0.2.0 2026-09-11：新增HX.ai统一AI面板（两层结构+定位置顶+AI功能生成器，洪老师2026-09-11拍板方法论落地试点）；HX.sj面板加「🤖AI」入口钮；其余一行未动

   收编四样+账本（AI底座不收）：
     HX.keys    钥匙统一读取（hx_apikey→bg_apikey→xt_apikey；hx_gh_*→br_gh_*；hx_qwenkey→bg_qwen_key；hx_dav_*）
     HX.gh      GitHub 传输（以 software-bridge.html 的19个gh函数为底，统一命名空间 HX.gh.*）
     HX.sj      浮标速记+自动上行（从 software-notes.html 原文提取，8份MD5一致版）+📷附图（压图存壳sjimg_*+行尾挂图+坚果云速记图/排队传）
     HX.selfCheck(app, swVersion)  版本自检（学习笔记 ghSelfCheck 通用化，API优先失败走raw直链带?t=防缓存）
     HX.bill    全家AI账本 hx_aibill（照抄学习笔记 hxBill 实现格式）
     HX.store   仓管员：一套门存取（has/get/set/remove/sync/conflicts），壳内文件夹hxdata_<key>.json真源+localStorage缓存，时间定新旧、双动冲突留档（地基工程一期）
     HX.relay   中转邮路：单体备份走GitHub私有仓transit/（永远重试+退避+回读核对才销号+大白话状态条），壳内pull拉回销号
     HX.dav     坚果云腿：壳内铁仓库（ok/mirror闲时镜像/rescue救命腿只补缺失不盖已有；dv.upFile(fileName,remoteDir)：公开单件上传（速记附图用））
     HX.fm      手机文件夹逛一逛（v0.12.0：ok/has/ensure权限引导/pick全屏仿资源管理器挑文件挑文件夹/read读文件base64；无壳静默降级）
     HX.pick    长按点亮零件（v0.13.0 班① 第5条：bind绑长按点亮、账本hx_pick_v1、get()公开口；AI面板亮牌只读它；v0.16.4起点亮长效——30秒自动灭撤掉，点亮一直有效直到换件或点✕取消，洪老师2026-09-23班③拍板）

   接入说明（各软件照抄下面这段，三级查找照 guanjia-pdf-engine.js 已验证先例）：
     ① LearnShell.readFile('hx-common.js') 读壳授权文件夹（file://下fetch常被拦，readFile可靠）
     ② 同目录 fetch('hx-common.js?t='+Date.now()) 8秒超时（浏览器/线上版直接拿到）
     ③ 公开仓 raw 下载 https://hongxiaotao177.github.io/hx-common.js?t=... 拿到后顺手
        LearnShell.writeFile 写壳安装（下回走①）
     加载器现成代码见 HX.loadLoaderSnippet 字符串（接入方照抄即可），或抄文件末尾注释段。
   军规1 不崩溃压倒一切：本文件加载失败时各软件主功能必须照常，只有速记/云备份/版本自检静默降级。
   本文件单文件、无依赖、ES5语法（老WebView兼容）、IIFE包裹挂 window.HX；
   全程 try/catch，任何内部错误不外抛（console.warn 降级），加载本身永不阻塞页面。
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var HX_COMMON_VERSION = '0.75.0'; /* v0.75.0（2026-10-26接班班 SPEC_t126，冻结令唯一开工件；外援DS出稿+Kimi终审翻案1处亲手落地=DS编造HX.aip.call/HX.bill.add签名报废改真签名HX.aip.go，记账=「编假签名」前科同型）：刀1病人标签错联根治——sj save贴「病人:」前判HX_SJ_APP含「管家」才贴（hx_sj_ctx_off=1落回老行为）+📜翻看sjShowBrowse显示层剥「　病人:…　页面:…」尾巴（档案存储一字不动）；刀4a clean词表扩全角星号＊/全角井号＃/粗体**残留（幂等，hx_hc_clean2_off=1不补）；配套chat v0.21.0。红线HX.keys/air/pick/mg/store/dav/gh/bill/step/selfUp/fm/ai/sj其余/bb/hxToastHold/chk/chat/jc/audit/wzPoll/jbl/aip/hc其余/zg/mqtt全件IDENTICAL，壳/index/xiaotao一行未动 */ /* v0.74.0（2026-10-26 SPEC_t125 AI总管仓库与浮窗篇配套，DS出稿Kimi终审亲手落地）：刀3a clean补强去【三核：X】判词行/连续横线---/markdown表格竖线（幂等，hx_hc_clean2_off=1不补）；刀3b暴露_writeDetail供洗净全仓钮；刀5b浮窗户口镜像进HX.glow公开口（getSel/setSel/clear，hx_fuchuang_off=1不挂）；配套chat v0.20.0+xiaotao v0.27.0。红线find/ask/count/del/索引结构/壳备份全IDENTICAL */ /* v0.73.0（2026-10-26 SPEC_t124 AI总管想法五连二批刀1a，洪老师拍板「AI总管的任务继续」）：judge判令提示词加固——问话求答（讨论/讲讲/分析/怎么看等）一律算闲聊，治11:33「讨论治疗心脏被判成找书」误判；其余一行未动 */ /* v0.72.0（2026-10-26 SPEC_t123刀3，洪老师拍板「今天的想法归类成任务列表去执行」；想法输入框顶天四犯根治：sjKbFit键盘弹起分支钉顶改贴键盘上方——top=vv.offsetTop+vv.height-8-面板实际高，量不到高/比可视区高才退钉顶，hx_sj_kbfit_off=1退老钉顶法；键盘收还原/监听挂法/不自动focus/面板其余零件一行未动；Kimi亲手，配套chat v0.18.0） */ /* v0.71.0（2026-10-25 SPEC_鱼骨版面配套，DS实现+Kimi终审零翻案亲手落地）：done落msg.by记哪家AI+onOk第2参model透传，两刀+版本行外全件IDENTICAL，配套chat v0.12.0鱼骨版面 */ /* v0.70.0（2026-10-25 SPEC_t113 AI总泵归拢一期，洪老师拍板「AI功能归拢插队+联网要+AI对话当试验田」，外援双缺DS破线/千问401自动降级Kimi亲手全包）：刀A 新增HX.aip总泵（链千问→Kimi→DS/which点名/web联网只走千问enable_search/千问流式+截断续写一回+400砍料重发一回/Kimi空包重发/死心非流式60秒流式30秒无新字/换棒人话吐司/air.report终败/HX.bill记账/hx_aip_off全退）+HX.chat.pump内部改转调总泵（签名cb口径不变调用方零改动，老链全保留）+刀B HX.chat.send加第4参opt={web}心脏改走总泵（三层记忆/压缩/账本IDENTICAL）；配套chat v0.10.0 presetCallAI走总泵+🌐联网钮。红线：除本IIFE+pump函数体+send签名与踢脚+版本行外全件IDENTICAL，callQwen/callKimi/callDS/fetchJson/buildMessages/tryCompress全保留，管家/壳/index/其他单体一行未动 */ /* v0.69.0（2026-10-25晚班 SPEC_t110_话仓，洪老师拍板「先干话仓，开工」插队总待办第1位，DS破线+千问401自动降级Kimi亲手全包）：刀B HX.chat的persist()加一行ingest钩（每次对话保存自动增量入话仓，a以【话仓答】开头不入防循环）；刀C 新增HX.hc话仓模块（挂HX.zg后）——clean去废符号/find bigram覆盖率0.5阈/ask先仓后AI（pump答存仓）/count话题数数/list/detail/del，存储hx_hc_v1索引+hx_hc_d_详情localStorage为主+壳writeFile备份，500条FIFO单答截10000字，开关hx_hc_off=1全退；配套chat v0.9.0📦浮层+发送前查仓闸。红线：除刀A版本行/刀B一行/刀C新增外全件IDENTICAL，壳/其他单体一行未动。 */ /* v0.68.0（2026-10-25 SPEC_t111阿里云当唯一真账房一期，洪老师拍板「干完为止」，DS破线+千问401自动降级Kimi亲手）：刀A mqtt连上多订hx/ver（hx_mqtt_ver_off闸）+刀B onMessageArrived截存retained牌+刀C公开口HX.mqtt.ver()；配套index v1.45.0 fetchJsonEx第①腿；ECS侧pub目录+systemd path看守hx_pub_ver.sh+ACL开hx/ver户口；红线：handleMessage白名单/其余全件IDENTICAL，壳/其余单体一行未动 */ /* v0.67.0（2026-10-25 SPEC_t107成书空章根治，洪老师真机报第1位「书传到地方内容是空的」+SOS 06:22）：putChap写LS_CHAPS成功后追加①双写IndexedDB正本xt-lib-db/chunks（键=ckey）②翻books账state未写→已写；外援DS实现，Kimi终审翻案1处（onupgradeneeded补建kv仓与xiaotao一致）亲手落地；主链返回值/histPush/rollback/写戳原有一字未动 */ /* v0.66.0（2026-10-24 SPEC_AI总管三期，洪老师拍板三条新规：废暗号/版本制/不黑箱）刀A.1 judge判令/刀A.2 findChap扩独立成书/刀A.3 addBook+addChapter/刀A.4 merge提示词改版本制；外援DS实现，Kimi终审翻案2处（judge剥围栏/src数组）亲手落地 */ /* v0.65.0 t103（2026-10-24，洪老师勾想法两条一起干，SPEC_hx-common_v0.65.0，外援双缺Kimi全包）：刀A sj面板按钮缺省下划线文字风（hx_sj_btnbox='1'回老彩底方框，想法10-21）；刀B 会诊件先存本地永不丢+闲时补传sjWzPendFlush（想法10-20，pend在=云上没有，成功清账报喜，失败静默留账）；申报点=ensureUI开关1行+CSS3行/sjWzSos先存1行/新函数/闲时1行/版本行，其余IDENTICAL */ /* v0.64.0 t102（2026-10-24，洪老师12:58真机截图报「想法输入框又顶了天」三翻同尺，SPEC_hx-common_v0.64.0，外援双缺Kimi全包）：sjKbFit换顶钉法——判定只看innerHeight-vv.height>80（不看offsetTop，X5上推模式老算法必误判），弹着钉可视区上沿top=offsetTop+8/bottom auto/maxHeight vv.height-16，收了三行还原；监听挂法/不自动focus/面板其余零件一行未动 */ /* v0.63.0 t101（2026-10-24，E1后续刀，SPEC_hx-common_v0.63.0，外援双缺Kimi全包）：刀A jbSave/jbRead三处白名单加jb_闭环实验单.json（实验单随交接班走手机层）；刀B 新增HX.syRemind开门实验提醒（开门100秒前台起跑，readJson闭环实验单.json，在途件常驻黑框🧪提醒点✕才关，一天一次hx_sy_remind_d节流，总开关hx_sy_remind_off=1，公开口status/run） */  /* v0.62.0 t100交接班闭环配套（2026-10-24，洪老师拍板闭环任务+真机报红点消不了/印记不对连发）：刀1 jbSave假账根治（桥writeFile返false不再计saved，收failed名单回执ok=false，病根=10-23_2246班push报saved=3实缺jb_交接说明.md）；刀2 三处白名单加jb_交接班记录.md；壳印记闸修复见vc69 SPEC */  /* v0.61.0 t99 AI总管二期刀F（2026-10-23，SPEC_AI总管二期，洪老师拍板「二期开工」）：HX.zg加findChap模糊找章（本地粗配+AI精配走chat.pump，AI只回行号真身本地取防编id）+dupRate重复粗筛+merge加rewrite可选参，既有七口IDENTICAL；DS实现+Kimi终审翻案1处（DS编造listBooks字段已扶正） */  /* v0.60.0 t98 AI总管一期刀B：HX.zg总管模块（书库直连读写/历史版5层/外改戳/命令识别/三步命令链走chat.pump，SPEC_AI总管一期，外援双缺Kimi亲手写） */  /* v0.59.0 t96🧪总钮一期刀1：HX.zhiban白天质检员 */  /* v0.58.0 t95值夜班套件刀3：HX.yeban值夜质检员 */  /* ── v0.53.0 2026-10-21（洪老师原话「这一版尽量把手机全量备份和对账规矩落地，保证下一个接班可以在手机本地取到文件」；合并总账t87；SPEC_hx-common_v0.53.0_套装档案柜，DS实现+Kimi终审翻案2处亲手落地：①一层l1ok双重计数翻断点续备单计②SAF四桥全返false补试写探针）：刀A新增HX.arc套装档案柜模块（开门120秒起跑过_autoNetOk闸，API列仓根三层分流，L1十四件每次必对+三层≤2MB小件每轮hx_arc_max缺省5件断点续备，逐件writeFileRel写+listFilesRel回读字节对账不等重试一次记fail，档案柜台账.json本地+仓根双写hx_arc_up防重推，总开关hx_arc_off=1，公开口status/run）；刀B mqtt白名单加arcList/arcRead两op（点名取件白名单制含..或/一律拒）；刀C版本行+版本史；红线HX.keys/air/pick/mg/store/dav/gh/bill/step/selfUp/fm/ai/sj/bb/hxToastHold/chk/chat/jc/audit/wzPoll/jbl及mqtt既有逻辑全IDENTICAL，壳/index不动） */  /* ── v0.49.0 2026-10-20（t79交班本地存取：handleMessage加jbSave/jbRead两op+HX.jbl公开口，详见文件头v0.49.0段；其余一行未动） */  /* ── v0.47.1 2026-10-20（t76刀3，洪老师真机报案「更新四遍三遍错特别是首页」配套：idxProbe侦察兵正则行首锚定，治「被注释里CUR.index=1.19.6骗住fileVer恒1.19.6、上岗以来从没跳过」病根2；配套index v1.35.0 CUR行错位扶正；其余一行未动） */
   /* ── v0.48.0 2026-10-20（t77真机自报，洪老师拍板「现在就真机自报吧」）：HX.zb上岗——开门60秒后包住黑匣子log，err条经60秒节流（同m 60秒不重+全局60秒1条）双通道喊疼：mqtt hx/to_kimi实时+仓根「真机自报_时间戳.json」留底，失败存hx_zb_pend≤10条补传；总开关hx_zb_off=1；公开口status/test；纯加法一IIFE+版本行，其余一行未动 【Kimi终审翻案DS 1处：report成功分支漏调flushPend（SPEC行为5成功补传）亲手补上——漏料非编造记账】 */
   /* ── v0.47.0 2026-10-19晚班（t75，洪老师看自检报告截图拍板「做成点一下就出详细结果，开工」；SPEC_t75→DS实现三切片零编造→Kimi终审翻案1处=index尾行DS自编口径丢「好/可疑」统计，亲手改取报告原文末行与云仓同口径）：刀A HX.audit新增rows2()（reportText改调它输出逐字节不变）+detail(key)七哨明细（bbTail/localStorage台账全本地零联网，最多5条最新在前，空账回「还没有明细账」）+exports挂rows2/detail；刀B index配套v1.34.0自检弹窗点主行展开明细；刀C _aiSnap尺子修口径——err含「黑匣子」三字的哨兵账（上行失败/没钥匙/疑似哑火=账房自家网络账）不计入err24改记errNet，sys提示词追加一句「errNet不算软件毛病」，治AI质检被117条假报错吓得连说12次拿不准；红线除HX.audit IIFE内申报3处+_aiSnap申报2处+版本行外全件IDENTICAL */  /* v0.43.0（2026-10-19 t69刀1，问诊室呼叫钮：SPEC_问诊室_v0.1.0_设计稿洪老师拍板）：HX.jc新增三公开只读口wzBbTail/wzLayout/wzCur+sj面板📮叫Kimi会诊钮（抓bbTail20+layout+cur+主诉→HX.gh.putFile推仓根急诊_YYYYMMDD_HHMM.json→成功hxToastHold黑框常驻报喜，失败存hx_wz_sos_pend下回补）；红线HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/HX.bb/hxToastHold/HX.chk/HX.chat IDENTICAL，HX.jc除return一处+三新函数外IDENTICAL，HX.sj除按钮HTML一行+bind一处+sjWzSos新函数外IDENTICAL */  /* ── v0.46.0 2026-10-19（t73手机账房刀B，母图纸SPEC_手机主账房_v0.1.0洪老师拍板「图纸行，开工」）：HX.mqtt传话筒上岗——闲时WS连传达室39.97.246.65:9001，问诊室问答走hx/to_suit→hx/to_kimi秒回+云仓问诊室_答_留底双通道；密码管家路私仓取传达室钥匙.json存localStorage不落公开仓；闲时才连(开门60秒+前台)、切后台断、退避重连1s→30s；总开关hx_mqtt_off=1；纯加法两段（paho-mqtt-min v1.1.0自包含32236B+HX.mqtt IIFE），其余一行未动。【Kimi终审翻案DS 4处：①HX.gh.ready()编成Promise链必炸（现役同步boolean）②Paho五参构造旧API必炸改两参+凭证进connect③putFile三参签名错（现役四参null打头）留底必败④取钥匙失败永不再试补退避——「编假签名」前科重演记账】 */
  /* ── v0.45.0（2026-10-19早班②，t72，洪老师拍板「自检报告单一了要加：查他们最近干了什么活、谁做的、哪个做完哪个卡住，重点说人话」）：HX.audit加workline最近账单helper（七哨各一句人话账：jc走查一轮卡没卡/verify对账原文/sos按过几次/mg管家最近act/auto·ai台账笔数+末笔/zf最近查账）+reportText每哨行后追加「　　账单：」行；DS_HELPER段采用零编造，REPORT段DS自作主张重写整个reportText+私改哨名（监察员走查编成'jc走查'等7名全编）违反「保持现有格式」铁约束，全段弃用Kimi终审亲手改（记账1笔=界外重写前科同型）；audit()/list()/其余一行未动，红线全件除audit IIFE内2处+版本行外IDENTICAL */  /* ── v0.44.0（2026-10-19早班，t71，洪老师拍板「自检的东西要有审计报告随时出+一个按钮现做+我是最后控制人」，与问诊室刀2下行同班做，SPEC_t71→DS实现三段交齐→Kimi终审翻案1处=管家心跳源DS查bb的m（m只是'黑匣子在线 vX'永远查不到会误判死）翻查app含'管家'亲手落地）：刀1新增HX.audit自检审计模块（七哨户口：jc监察员/auto机核/ai质检/📮会诊链/装件防谎岗/管家心跳/账房链，心跳源=黑匣子倒查或localStorage台账末条，超期2倍判🔴可疑，按需型不判死，reportText人话报告，总开关hx_audit_off=1）/刀2新增HX.wzPoll问诊室回话下行（开门90秒后fetch公开站问诊室_out.json破缓存8秒帽，t>hx_wz_out_seen且answer非空→全屏📬Kimi回话层textarea只读可全选+✕常驻，点✕记seen；没件网断静默；HX.wzPoll.check()可手动）；纯加法两IIFE挂window.HX，红线HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/HX.sj/HX.bb/hxToastHold/HX.chk/HX.chat/HX.jc全件IDENTICAL */  /* ── v0.40.0（2026-10-18晚，AI质检岗：洪老师拍板「看得顺不顺眼也叫AI帮忙，现在就做；二期真截图排任务监察员监察」→SPEC_AI质检岗_v0.1.0→DS实现16秒交齐8hunk→Kimi终审翻案2处（①自家SPEC废函数_aiAsked删 ②Hunk3/4/5同位锚点落地顺序调5→3→4）亲手落地）：AI档步lane:'ai'——快照（标题+近24h黑匣子err条数+spot现场+正文摘要）发HX.chat.pump真签名cb(ok,txt,by)，AI答「正常」才markGreen，拿不准/泵灭/超时一律留人手动✓（泵灭或拿不准都回删问账下回补，拿不准不封口——终审补）；节流hx_chk_ai_max缺省3+泵在飞闸+60秒死心；AI质检台账.json只增裁100镜像hx_chk_ailog_up；renderPg显「🤖AI拿不准等您看一眼」；reconcile清hx_chk_ai_asked；总开关hx_chk_ai_off=1落回老路；红线除HX.chk申报8处+版本行外全件IDENTICAL，HX.jc/HX.chat/壳/单体一行未动 *//* ── v0.39.0（2026-10-18晚，机核档·自动真机检验一期：洪老师问「自动真机检验」→Kimi报方案（机器能核的自动销、核不了的攒短清单、开门一次清账）→洪老师拍板「同意你的选择，开工」→SPEC_机核档_自动真机检验一期→DS实现13秒交齐8申报点→Kimi终审翻案1处（DS版本行hunk锚点截断不可用，亲手改定点插段）亲手落地）：六刀=①detect机核分流（watch优先照旧，机核档排第二，hx_chk_auto_off=1落回弹确认条老路）②_autoGreen侦中直接markGreen不弹窗（bb.job+机核台账双留痕）③_autoNoteOnce机核档缺侦测器note会话防重永不销 ④_autoOff总开关 ⑤机核台账_autoLogAdd+_pushAutoLog（hx_chk_autolog只增裁100条，闲时PUT仓根机核台账.json，镜像hx_chk_autolog_up没变不重推）⑥key_eq侦测器（非空且全等才中）+renderPg机核标（机核档步不显✓钮防手滑）；红线HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/HX.sj/HX.bb/hxToastHold/HX.chat/HX.jc IDENTICAL，HX.chk除本版申报8处外IDENTICAL */ /* ── v0.38.0（2026-10-18，监察员上岗：设计稿SPEC_监察员_v0.1.0_设计稿洪老师2026-10-18两次拍板合成→正式SPEC_监察员_v0.1.0 Kimi起草已落仓→DS实现（千问钥匙401没进去本班没上工）→Kimi终审翻案4处亲手落地：①afterStep引用回调局部变量rec必炸ReferenceError改传参 ②calcBacklog编不存在的t.sim/t.cloud/t.watch翻真字段t.lane（照HX.chk）③卡件没跳下一件还走剩余步翻cb(out)收尾 ④saveRes漏ver变清旧结果补上）：纯加法新增HX.jc监察员——走查单.json双腿三兜底（dav/api/raw+缓存）、开门闲时60秒起跑每次最多hx_jc_max件（缺省3）件间歇5秒、五算子全读型（see/seeText/ls/lsKey/file）绝不自动点击输入、卡件记黑匣子+AI病根分析（HX.chat.pump公共泵，判词仅记录）、vision快照参谋（文字快照代真截图，「不正常」只立visionFlag等Kimi终审）、结果账hx_jc_res+壳真源hxdata_hx_jc.json双写、闲时PUT走查记录.json/监察台账.json（镜像防重推）、督查岗台账hist只增+health()/report()供交班；总开关hx_jc_off=1全退休；红线HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/HX.sj/HX.bb/hxToastHold/HX.chk/HX.chat IDENTICAL *//* v0.37.0（2026-10-18，洪老师真机报「传黑匣子12秒没动静/上行失败」云侧查明=虚惊（网慢超12秒看门狗误报，PUT其实传上），拍板治，SPEC_hx-common_v0.37.0，DS+千问同稿、Kimi终审翻案1处=DS版本留痕插位错插v0.23.0前，亲手改插版本行）：刀1黑匣子看门狗12→30秒；刀2补传成功补人话（hx_bb_lastfail标记，败立成消）；红线HX.bb除本版申报三处外IDENTICAL，其他所有模块IDENTICAL *//* v0.36.0（2026-10-18，分家④步「泵归公共件」10-10_2316拍板，SPEC_fenjia4，DS+千问同稿、Kimi终审亲手落地）：HX.chat新增公共泵api.pump(sys,usr,opt,cb)——链默认千问→Kimi→DeepSeek复用闭包私有callQwen/callKimi/callDS（cb(st,txt)签，st==='ok'才成），opt.which='qwen'/'kimi'/'ds'可点名只走一家，cb(ok,text,by)；流式onProg/联网web暂不支持，要用这两样的单体照旧走自带老泵；红线除本加法与版本行外IDENTICAL *//* v0.35.0（2026-10-18，F4a尾刀：窄条「不变化像死机」v0.24.4查明是手动步等人点✓但没说清）：窄条补「在等谁」——手动步说等您点✓点这条展开，watch/auto步说在帮您盯，cloud步说云侧核不用动，watch档说观察哨自己销；红线除本刀文案与版本行外IDENTICAL *//* v0.34.0（2026-10-18，想法流水10-18 09:01真机报「想法输入框顶天看不到打的内容」，F3b没断根）：新增sjKbFit键盘自适应——visualViewport算出键盘吃掉的高度，面板底边抬到键盘上方、最高随可视高收缩；键盘收/没visualViewport接口自动回老样；红线除本两刀与版本行外IDENTICAL *//* v0.33.0（2026-10-17深夜班，洪老师拍板「把千问修好修完为止」，SPEC_千问四治法，DS实现+Kimi终审翻案1处亲手落地：DS续写漏拼半截只回第二回正文，补acc累加）：治千问三刀落callQwen——刀①回信上限2048→8192治腰斩（删Math.min死代码）刀②读finish_reason截断自动续写一回拼接全文（slice拷贝不动原数组，硬上限1次，仍截断报fail换棒）刀④正式调用钥匙trim（探活已修本处补上）；配套chat v0.4.1+大管家v0.57.4同治病根；红线HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/HX.sj/HX.bb/hxToastHold/HX.chk/callDS/callKimi/fetchJson/buildMessages/tryCompress IDENTICAL，callQwen除本三刀申报点外IDENTICAL *//* v0.32.0（2026-10-16，洪老师拍板「把AI对话框从空白一直完成到最后」，SPEC_AI对话框一期，DS实现+Kimi终审翻案2处亲手落地：①toast改调闭包内真接口hxToastHold（DS又编不存在的window.hxToastHold/hxToast/HX.toast，记账）②callKimi兜底模型名改真机现行kimi-k2.7-code-highspeed删修正贴纸）：纯加法新增HX.chat对话心脏——索引hx_chat_v1+对话壳真源hxdata_hx_chat_<id>.json三层写（真源/localStorage兜底/坚果云mirror），通道链DS→千问→Kimi各60秒死心换棒，三层记忆（原文永存+超10轮DS压缩摘要+事实卡），pullCloud云端捞回，总开关hx_chat_off=1全退休；红线HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/HX.sj/HX.bb/hxToastHold/HX.chk IDENTICAL */ /* v0.31.0/* v0.31.0（2026-10-16，洪老师真机报F3b输入框顶头拍板「干」，DS实现+Kimi终审零翻案）：#hxSjPanel加max-height:calc(100vh-170px)+overflow-y:auto，键盘起面板内部滑，输入框不再被顶出屏；红线除本刀CSS与版本行外IDENTICAL *//* v0.30.0（2026-10-15 夜班⑦，洪老师拍板「做」，SPEC_index_v1.22.0+hx-common_v0.30.0_预下载+双击回环，DS实现+Kimi终审翻案3处亲手落地：①腿D的upFile/downFile回调式签名翻Promise式（DS编了不存在的第三参回调）②腿G写断/读断拆两条链各自catch精确判 ③腿D删wrote判返回照_writeFile同款try调用）：刀A1 HX.bb新增公开口loopback()双击🆘回环体检（腿G GitHub仓根「黑匣子回环.txt」+腿D坚果云/学习套装备份/黑匣子回环.txt，写上去读回来码对=通，写不成/读不回/码不对=哪腿哪环断一句话说清，双腿独立全settle后bbToast常驻汇总+job报账）刀A2 sj🆘钮双击判定（hx_lb_off=1单击照旧flush(true)整刀退休，否则单击600ms后flush、600ms内第二击loopback()）；红线HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/HX.chk/hxToastHold IDENTICAL，HX.sj除刀A2一处bind外IDENTICAL，HX.bb除刀A1新增函数+return一处外IDENTICAL */ /* v0.29.0（2026-10-15 夜班④，洪老师拍板「三个任务一起做」，SPEC_hx-common_v0.29.0_被动观察法+黑匣子心跳，DS实现+Kimi终审）：①bb开门心跳hb（云侧对时知在线）②collectSide哑火对照（壳有开门主账没动→哨兵err）③被动观察法：清单步骤带watch关键词，bb记账通报HX.chk.bbHit命中→24小时（hx_chk_watch_hours可配）没err自动markGreen销号全程不弹窗，err命中删账不销 ④撤开门8秒自动问（hx_chk_wiz_ask=1才问，🧪手动链不动）；红线HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/HX.sj/hxToastHold IDENTICAL，HX.bb除块2~3申报点外IDENTICAL，HX.chk除块4~6申报点外IDENTICAL */ /* v0.28.0（2026-10-15 夜班，洪老师拍板「开工」，SPEC_hx-common_v0.28.0_黑匣子五案，DS实现+Kimi终审）：黑匣子五案——①HX.bb.job办完报账（成记job/败记err立刻上行）②重点钮12秒看门狗「点了没反应」③哨兵_silentLog（flush失败/没钥匙直写账防递归）④hxToastHold黑框留账note（hxBbToast自家除外）⑤err截断120→300字；红线HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/HX.sj/HX.chk IDENTICAL，HX.bb除块2~5申报点外IDENTICAL，hxToastHold除块4一处加法外IDENTICAL */ /* ═══════════════════════════════════════════════════════════════════════════
   v0.27.0（2026-10-15 晚班③，洪老师真机报「黑框文字显示不全犯糊涂/跨页没说去哪页」+拍板「现在就搞」，SPEC_hx-common_v0.27.0_黑框字看不全+跨页报名字，DS实现15.9秒完整回件+Kimi终审翻案1处亲手落地：_wizBox开头补摘旧hxChkWizFull防换步残留）：刀1黑框文字区看得全（去两行截断→字号14px+最多约3行可上下滑+点文字区弹大框看全文再点收起，_wizBoxClose同步收大框）刀2跨页步骤报页面名（step.page，默认「主界面（首页）」，配验收清单t21.s1加page字段）；红线HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/HX.sj/HX.bb/hxToastHold IDENTICAL，HX.chk除_wizBox/_wizStep/_wizBoxClose三函数外IDENTICAL
   v0.26.0（2026-10-15 晚班②，洪老师真机三连报「黑框不是人话/跳过没反应/挡住版面看不见黄圈」+拍板六条浮窗化，SPEC_hx-common_v0.26.0_向导浮条+跳过根治，DS实现+Kimi终审翻案3处亲手落地：①document拖动监听泄漏→留引用_wizBoxClose全摘 ②touchmove改挂document防拖快断拖+preventDefault防页面跟滚 ③wizSkipped三入口清零核讫）：刀A跳过根治（_wizSkipped会话记账，跳过不再原地踏步）刀B大黑框→顶部可拖动窄浮条（⠿把手三路拖动+hx_chk_wiz_top记位置）刀C文案全人话刀D黄圈自动scrollIntoView屏中间+浮条遮挡自动让位；红线HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/HX.sj/HX.bb/hxToastHold IDENTICAL，HX.chk除向导段（刀A~D）外IDENTICAL
v0.25.0（2026-10-15 晚班①）洪老师拍板「开工」：真机检验减负——壳领着洪老师一步一步验，
   点亮弹窗问「行吗」，他只管点行/不行；能自己判的绝不问人；结果写成验收单自动传上网，
   Kimi接班云侧销号。
   启动规矩（洪老师2026-10-15拍板对齐）：
     ①装完新版开门自动来问一次「现在验？」
     ②主界面+管家各放「🧪真机验收」手动入口=整屏清单页加「🧪向导验」钮
     ③中途退出下次开门再问，连问3次没验完就不再烦，留清单
     ④全绿后永不再弹。
   ── 本版只动 HX.chk 模块 + 版本行，其余模块红线 IDENTICAL 一行未碰 ──
   刀A 向导模式 wiz（HX.chk内新增，复用现有骨架）：
     · 整屏清单页顶部加「🧪 向导验（我来领着你验）」大钮，点它进向导。
     · 向导=按清单顺序逐条走未绿步：
         - 步骤带 auto → 照跑现有 autoHit 侦测，中=复用现有 askConfirm 确认条（点✓才markGreen）。
         - 步骤带新字段 spot:"CSS选择器" → 点亮目标：亮黄#FFD600 4px描边+圆角+1秒两闪（动画停后描边常亮），
           同时弹大黑框问「看得见【步骤大白话】吗？」三钮「✓行」「✗不行」「🔄再亮一次」
           （✓/✗大至少20px字、padding 14px+，照洪老师看得清规矩）。黑框常驻点钮才关（hxToastHold样式，绝不自动消失）。
           ✓行=markGreen进下一步；✗不行=HX.bb记一条{k:'wiz',m:'挂号:'+taskId+'/'+stepId+':'+步骤标题}
           ＋该步标灰「已挂号」不算绿不算卡，进下一步；🔄再亮一次=重播点亮。
         - 无spot无auto的手动步 → 维持现状「✓这步好了」钮，向导里直接弹同一步骤文字+「✓这步好了/跳过」两钮。
         - 点亮overlay=fixed全屏透明层（pointer-events:none）+目标getBoundingClientRect描边盒；
           目标不在本页/找不到→不亮，直接弹问句（洪老师在哪个软件验都行）。
     · 向导走完弹总结黑框「验收完了：过X项，挂号Y项，已传上网」点✕关。
     · 中途退出：黑框随时有「✕先验到这」；进度照走现有 hx_chk_prog，下次开门/点🧪接着走。
     · 开门自动问：HX.chk闲时侦测发现「有未绿步 且 本地无wiz问过3次记录（hx_chk_wiz_n）」
       →弹一次大黑框「这版有X步要您过眼，现在验？」两钮「开始验／待会儿」；
       每弹一次hx_chk_wiz_n+1，满3次或全绿后永不再弹；ver变（清单换版）hx_chk_wiz_n清零重新计。
     · 总开关 hx_chk_wiz_off=1 向导全退休，老验收牌行为一字不动。
   刀B 自报验收单（HX.chk内新增函数 pushReport）：
     · 进度有变化（markGreen/挂号）后闲时（过HX._autoNetOk闸门）把验收单PUT出去，
       走现有pushProg同款双腿（云仓api/contents→坚果云兜底），失败静默下回补，绝不打扰。
     · 仓根+坚果云「验收单.json」内容={ver:清单ver, t:时间戳, dev:'真机',
       rows:[{id:'t21', st:{s1:1|2|0}}...]}（1=绿过 2=挂号 0=未验），
       顺带带壳版本localStorage hx_shell_vc（没有就不带）。
     · Kimi接班时读验收单+黑匣子+牌子，A档云侧销号——这条是Kimi交班规矩，不写码。
   刀C 清单格式扩（验收清单.json，Kimi发版时同步改仓根，不动码）：
     · step新增可选字段：spot（选择器，点亮用）、lane:'eye'（必须人眼）/'auto'（机判）。
       老格式全兼容，无新字段照老行为。
     · 分档定案（本SPEC附件，发版时照此改清单）：
         t21三条/t17s1/t16s1s3/t15s1/t14s1s3s5=eye+spot；
         t20s2/t19s1/t17s2/t15s2/t14s2s4/t10/t5s2/t4/t6/t3/t7/t2=auto配侦测器；
         t13/t19s2/t20s1/t8s2/t16s2=A档云侧（清单里标lane:'cloud'，向导跳过不问，Kimi核）；
         t11/t12改标lane:'watch'长期观察哨不占未验数。
   红线清单（IDENTICAL，一行未碰）：
     HX.keys / HX.air / HX.pick / HX.mg / HX.store / HX.dav / HX.gh / HX.bill /
     HX.step / HX.selfUp / HX.fm / HX.ai / HX.sj / HX.bb / hxToastHold。
   本版自己的验收单（t22置顶）：
     ①开门弹「现在验？」②点🧪进向导，点亮黄描边看得见③✓行变绿✗不行挂号
     ④验收单.json仓根+坚果云回读一致⑤连问3次后不再弹。
   ═══════════════════════════════════════════════════════════════════════════ */
/* v0.24.5（2026-10-15 洪老师真机报「点保存弹没钥匙想法没上传」，拍板方案A+B一次做掉，SPEC_钥匙不断_v0.24.5_vc58；DS API繁忙/超时照班⑩先例Kimi工兵代跑如实报备）：钥匙不断四刀——刀1 _saveFile合并式写真源（写前先读旧真源，kimi/qwen/gh/dav缺字段从旧继承防盖没，deepseek纯继承）刀2 _loadFile认dav/deepseek 刀3 dav() localStorage空时读真源回填hx_dav_user/hx_dav_pass（照gh()样式）刀4 warm()触发条件加dav缺失、refill()加gh()/dav()触发回填；配套壳vc58埋钥胚hx_keys_seed.txt；红线HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/HX.sj/HX.bb/hxToastHold/HX.chk IDENTICAL，HX.keys除本四刀申报点外IDENTICAL */ /* v0.24.4（2026-10-15 班⑩，洪老师真机报「窄条盖住页脚+一直在那里不变化」，DS钥匙不在手边照10-12班⑤先例Kimi工兵代跑如实报备）：刀A窄条显示期间body底部垫54px页脚让路（藏起即复原）；刀B窄条右端加「—」收小钮→收成右下角小圆牌（验收+未绿任务数，点圆牌叫回，hx_chk_mini=1跨开门记住），收小照跑侦测数字照变；「不变化」查明=下一小步是手动验收步在等人点✓非死机；红线HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/HX.sj/HX.bb/hxToastHold IDENTICAL，HX.chk除本版申报四处外IDENTICAL */ /* v0.24.3/* v0.24.3（2026-10-14 班⑥下半场，洪老师两连拍板「圆点改数字」「黑框关不掉治」，SPEC_v0.24.3，DS实现+Kimi终审翻案1处亲手落地：DS刀B的cssText误写驼峰fontSize翻font-size）：刀A窄条圆点串改未绿任务数（省版面留给句子）；刀B黑框关不掉根治——X5/老WebView不认pointerdown，hxToastHold监听一路变三路（pointerdown/touchstart/mousedown，capture，off里三路全摘），✕钮加挂touchstart+点击面加大padding4px10px字号16px；红线其余全模块IDENTICAL，hxToastHold除刀B申报点外IDENTICAL */ /* v0.24.2（2026-10-14 班⑥，洪老师拍板「先干这个」，SPEC_v0.24.2_F1F3F4，DS实现+Kimi终审翻案1处亲手落地：DS刀6误用不存在的stepDone翻stepGreen；另修刀3旧注释留痕）：F1面板钮排两行（flex-wrap+flex:1 1 28%）；F3c刀2撤销（洪老师拍板：黑框要常驻点✕才关看得清，他报的毛病是「✕完全关不掉」要治关不掉——列入下班F3g）；F3d记下成功自动关面板（照appendLast先例，失败不关）；F3a回收站入口sticky固定下缘；F3e确认条加第三钮「✕先别问」=冷却30分钟不累计封口；F4窄条说人话「还有N步没验·下一小步：××」+圆点串前加「验收」小字；红线HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/HX.bb/hxToastHold IDENTICAL，HX.sj除刀1~4申报点外IDENTICAL，HX.chk除刀5刀6外IDENTICAL */ /* v0.24.1（2026-10-14 班④，洪老师拍板批2壳侧黑匣子，SPEC_壳侧黑匣子_vc56，DS实现+Kimi终审）：HX.bb开门收编壳侧车hxdata_hx_blackbox_shell.json——非空数组并入主账按t升序裁300、双写、侧车清成[]；hx_bb_off=1不收编；红线=除HX.bb本版申报一处加法外全模块IDENTICAL *//* v0.24.0（2026-10-14 班③，洪老师拍板，SPEC_v0.24.0_黑匣子+弹窗销号+取消静默令，DS实现+Kimi终审）：①新增HX.bb黑匣子（环形300条{时间,app,k,m}，localStorage hx_bb_log+壳真源hxdata_hx_blackbox.json双写，自动钩window.onerror/unhandledrejection/click按钮，k=err立刻整份PUT仓根「黑匣子.txt」，⚪条60秒对账有变才推，总开关hx_bb_off=1全退休）②弹窗销号：HX.chk侦中不再直接变绿，弹底部确认条「这步看着是做好了：××」两钮「✓是好了」「还没」，点✓才markGreen；防打扰=点「还没」冷却30分钟、同一步问满3次本期清单不再问、一次只问一条、ver变问账清 ③sj面板加🆘传黑匣子钮=HX.bb.flush(true)强推 ④取消开门静默令：HX._autoNetOk默认放行，hx_auto_net='0'回老样子（3秒内真点击才放行），manual===true照放行，HX.setAutoNet不动；红线HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/hxToastHold IDENTICAL，HX.sj除本版申报两处加法外IDENTICAL，HX.chk除本版申报三处外IDENTICAL */ /* v0.23.0（2026-10-14 班①，洪老师拍板开工，SPEC_v0.23.0_验收牌两档制+窄条显字，DS实现+Kimi终审）：①清单任务认lane:"sim"仿真档——圆点串/curStep/allDone/detect四处跳过，整屏页灰行「🤖仿真已验」不展开无点绿钮；缺省=日常档照旧 ②窄条字=任务标题·步骤文字，15px→13px；红线HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/HX.sj/hxToastHold IDENTICAL，HX.chk除本版申报7块外IDENTICAL */
 /* v0.22.0（2026-10-13 班③，洪老师拍板「三个并行开工」，SPEC_hx-common块=挂B+A1，千问实现+Kimi终审补漏亲手落地）：挂B=save()记下成功后清空输入框ta.value=''（治真机「旧话躺框里消不了」）；A1=📜翻看整屏页加🗑回收站（有盖章条才出，展开列盖章时间+去章原文，「↩救回」=新函数sjRescueLine去行首🗑章回原位，清uplocal逼重推+顺手上行，照sjStampLine先例）；终审逮千问漏交sjRescueLine+漏显示盖章时间两处亲手补。红线HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/hxToastHold/HX.chk IDENTICAL，HX.sj除save一行+sjShowBrowse回收站段+新增sjRescueLine外IDENTICAL */ /* v0.21.0（2026-10-13 班②，洪老师真机报「清单还没取到」，Kimi定稿SPEC_v0.21.0_验收清单双腿，DS实现+Kimi终审亲手落地翻案2处）：病根=清单只走raw裸域名国内时断时续；改=HX.dav纯加dv.downFile（davCall('down')+readFile+b64dec）腿①坚果云 + HX.chk fetchList双腿三兜底（①坚果云②云仓api/contents③老raw垫底，全败有缓存用缓存，manual toast带腿名）；红线HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/hxToastHold/HX.sj IDENTICAL，HX.dav除新增downFile纯加法外IDENTICAL，HX.chk除fetchList与版本行外IDENTICAL */ /* v0.20.0（2026-10-12 班⑤ Kimi定稿SPEC，洪老师拍板「做窄条面板，其他的按你的意思，开工」，SPEC_v0.20.0_验收牌，DS实现）：新增HX.chk验收牌——sj面板加✅验收钮→点出屏幕底窄条面板（圆点串+当前步骤一行字+▲，不挡底下操作）→点窄条/验收钮展开整屏清单（任务→步骤两级，一行一步大白话，做成一行绿一行，无auto步骤右端「✓这步好了」钮标绿）；清单真源=仓根「验收清单.json」（HX.gh.fetch raw拉取+hx_chk_list缓存，ver变了旧taskId进度整个作废），进度本机记账（hx_chk_prog+壳真源hxdata_hx_chk.json双写）+闲时PUT仓根「验收进度.json」（hx_chk_uplocal镜像对账不重复推）；内置三种auto侦测器（sj_uploaded/file_exists/key_set，窄条显示期间每5秒跑未绿步）；总回退hx_chk_off=1模块全退休；文本一律textContent防注入；红线HX.keys/HX.air/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm/HX.ai/hxToastHold IDENTICAL，HX.sj除申报两处（按钮HTML串+bind一行）IDENTICAL */ /* v0.19.0（2026-10-12 班②，千问试工第1单·多线程串行试工，洪老师拍板「快发过去吧以后自动化」）：HX.sj加📜翻看第一刀——面板加📜翻看钮→整屏页列全部想法（最新在上全文不截断）+每条✕盖章不真删（行首加🗑[YYYY-MM-DD HH:MM]前缀原文一字不动，平时不显示）；回收站救回/30天真删留后续刀；千问出活2处致命（闭包外inline onclick）1处漏交（容器CSS），Kimi终审亲手落地返工：全部改textContent+addEventListener防注入；其余红线一行未动 */ /* v0.18.1（2026-10-12 班⑦，洪老师拍板「其他的方法同意你的选择开工」+toast新任务，SPEC_v0.18.1，DS实现+Kimi终审亲手落地翻案3处）：刀1速记GitHub钥匙不断（_saveFile/_loadFile真源加gh三件套、gh()空时读真源回填hx_gh_tok/user/repo、sjGhKeys改调HX.keys.gh()删重复轮子、warm触发加gh缺失） 刀2流水文件名「速记流水.txt」→「想法流水.txt」（SJ_FILE常量+sjReadFlow新名优先旧名兜底、写只写新名、旧名不删不迁移、HX.fm过滤名单双名） 刀3记下上行失败弹明白话（sjUpload(fromUser)，闲时补推静默照旧） 刀4toast不自动消失（新顶层hxToastHold：✕钮+点页面别处才消失、350ms后挂监听防同击吞掉、hide自摘监听【终审修】、总开关hx_toast_sticky_off=1回老样；bill.toast/warm toast/sjToast/pkToast四处同改，sjToast改innerHTML重建保复用元素）；终审另修save里sjUpload重复调用一处、版本号留痕DS漏了亲手补 */ /* v0.18.0（2026-10-12 班⑤，洪老师拍板「同意开工」，SPEC_AI总台，DS实现+Kimi终审亲手落地）：新增HX.air总台（三家点名册Kimi花名册免费探活/DS/千问小包探活、账本hxdata_hx_air.json壳真源+localStorage缓存、开门闲时巡检过_autoNetOk闸门、gate/pick/ok/report问路口、军规例外可直发可读钥匙不碰宿主账本、回退hx_air_off=1）+AI面板状态条renderAirBar（亮牌行下三家✅/❌+时间+📡重测）；红线HX.keys/HX.sj/HX.pick/HX.mg/HX.store/HX.dav/HX.gh/HX.bill/HX.step/HX.selfUp/HX.fm IDENTICAL，HX.ai除本刀申报点外IDENTICAL */ /* v0.17.0 2026-09-24 班②一期（洪老师拍板「开工」，配套大管家v0.56.8，两刀）：刀H1面板第一层平铺化（缺省开：想干什么点一个就发，每套提示词一个大钮+钮右小字带料标签matLabel，自建末尾「我自建的」分组暖色底+升舱徽章；回退开关localStorage hx_ai_flat_off=1走老两层，renderL1老本体/renderL2全保留；openEdit平铺下直调renderPEdit，editHooks容器#hxAiHostBtns契约不动） 刀H2自建模板升舱字段（hx_aiext_v1条目扩baseId关联出厂套/wantShibu申请收编，renderExtEdit加出厂套下拉+📮申请收编钮，老条目undefined兜底，账本键与JSON格式不动，老localStorage账本不迁移不清洗）；其余一行未动 */ /* v0.16.4 2026-09-23 班·批改病历③：刀1 HX.pick点亮长效（洪老师2026-09-23班③拍板：30秒太短，点亮翻菜单翻半分钟就灭）——撤30秒有效期判定+30秒自动灭定时器，点亮后一直有效直到点亮别的件或手动取消；亮牌行点亮文字旁加小「✕」=清账本+亮牌消失+toast「已取消点亮」；点亮随行发AI老行为不变；账本格式不动，其余一行未动 */ /* v0.16.3 2026-09-23 班·批改病历：刀A新增HX.ai.openEdit(id,idx)（open进第2层后模拟该套按钮现有点击链进编辑页）刀B编辑页加div#hxAiHostBtns容器+宿主钩子opt.editHooks(itemId,idx,api={getText,setText,saveNow同hxAiSaveP存储链,itemId,idx})，不传钩子容器留空版面同老版；纯加法其余一行未动 */ /* v0.16.2 2026-09-19：刀D云端取回（只下不上，一次性救援腿）——HX.keys新增warm()：本地没key时开门自动从坚果云/私有仓读回hxdata_hx_keys.json落真源再灌回localStorage，永不主动上传；其余一行未动 */ /* v0.16.1 2026-09-19：AI钥匙反复丢两刀（刀A Key落壳文件真源hxdata_hx_keys.json换端口不丢+get/getQwen空时回填；刀C AI面板4处守卫改当场填钥匙浮层aiAskKey），其余一行未动 */ /* v0.16.0 2026-09-19 班⑦（洪老师拍板"开工"，AI面板四刀）：刀A自建条目带点亮病历（init新钩子litText由宿主供脱敏后文本，HX.pick有效则usr附【点亮文件：fname】，没点亮toast提醒照发不带材料；宿主没接钩子自动回落老useSel选中文字/（无资料）） 刀B「＋加AI功能」改AI代写流（①名字②人话要求→宿主send请AI写提示词→过目页可改/🔄重写/✅才存/❌弃；AI通道或Key不在回落手填提示词老路）+自建条目第2层补✏️改/🗑删两钮（删前人话confirm） 刀C固定套编辑页加「🤖让AI帮我改这套」（现话+人话要求→AI新稿只进编辑框过目，💾存为默认才算数，AI不直接落账） 刀D换心两钮「📥自建的灌进来」「🤖照自建的让AI改」（小浮层挑自建不盖编辑框，结果同样只进框，恢复出厂兜底，出厂原文一字不动）；账本键hx_aiext_v1/hx_aiprompt_v1与合并规矩、其他零件一行未动 */ /* v0.15.2 2026-09-19 班⑥（挂号#128，洪老师17:01/17:02真机截图报"浮窗选图后输入框被隐藏在顶端"，拍板"开工"）：病根=面板fixed钉在屏下150px，而开面板自动focus+选图回来焦点还在框上→键盘自弹→X5把页面上推→钉住的面板被顶出可视区只剩顶边。治=①开面板不再自动focus（点输入框才弹键盘）②挂图成功主动blur放下焦点；面板结构/挂图/上行/其余零件一行未动 */ /* v0.15.1 2026-09-18 班③（挂号E，洪老师拍板）：AI面板第2级提示词套行改明显大钮（.hxAiPromptBtn：▶图标+边框+圆角+绿系底色，照.hxAiGo绿色系），只改renderL2渲染HTML+CSS字符串，逻辑不动 */ /* v0.15.0 2026-09-18（洪老师08:10速记拍板）：HX.sj面板加「↩ 补充上一条」钮——点钮弹最近3条速记列表（相对序+时间+前两行预览，壳文件「速记流水.txt」为主、localStorage现行镜像键hx_sj_uplocal兜底，不新建平行账本），点条=原文整行回填进输入框接着加字，「记下」走原save=新增一条（铁律17原条不动）；✕/点面板空白关列表无副作用；空=toast「还没有速记可补」；附图/上行/extraBtn等其他零件一行未动 */ /* v0.13.2 2026-09-16 班④：洪老师拍板"把这个多余的命令取消掉"——开门闲时8秒速记上行认 hx_sj_skip_once 标记（主界面v1.19.1「检查新版本」按钮所立）跳过本次，查版本刷新不再带出速记流水.txt上行；「记下后上行」等其他入口一行未动 */ /* v0.13.1 2026-09-16 班③：查版本归管家一家——有管家的壳里HX.selfUp开门自查退休（管家每日闲时统一查装+验暗号），没管家的老壳/浏览器照旧；其余一行未动 */ /* v0.13.0 2026-09-16 班① 第5条：新增长按点亮零件 HX.pick（hx_pick_v1账本+30秒自动灭+触摸鼠标两路长按）+ HX.ai面板顶部亮牌行；其余一行未动 */ /* v0.12.2 2026-09-15（挂号#95，洪老师真机报"速记取图后点输入框又跳图库、不显示取图成功"）：病根=X5壳侧fileChooser回调悬挂在常驻隐藏input上无法自愈，下个手势重放弹图库+saveImg重活链断无回执——①📷取图改每次临时造input用完即弃 ②选图在途闸防重弹（focus+30秒超时兜底复位） ③saveImg改createObjectURL优先+15秒看门狗超时报明白话；其余一行未动 */ /* v0.12.1 2026-09-15（挂号#104，洪老师真机报"U盘病历一个没显示+进到深层回不到上一层"）：HX.fm专修——①文件排序改按修改时间新→旧（实锤：壳侧按名排，中文名病历全沉到套装hxdata_*等英文名件后面，翻不到就当没有；新拷的病历时间最新，直接浮顶），文件夹仍在前；②空名/乱码名件不再哑巴，标「（名字读不出）」照列；③列表顶部加小字「本层共N项」（搜索时「搜到N项」）让他知道看没看全；④面包屑行🏠旁加显眼「⬅返回上一层」钮，有上级即亮，点=回父目录；面包屑回跳改走浏览足迹栈（旧法按"/"拼路径，SAF的safdoc://URI里全是斜杠，点中段必坏——实锤修掉）；⑤pick加opt.hideKit=true时过滤套装自有件（hxdata_*.json、hx-common*.js、guanjia-pdf-engine.js、version-*.json、速记流水.txt、mg_开头、mgver_开头、sjimg_开头、原文库_开头、dsm_开头，文件夹照列），默认false不动其他场景；⑥folder模式底部加「＋在此新建文件夹」钮（壳v1.8.4新fmMkdir桥，X5里prompt不稳，用行内小浮层输名字）；其余一行未动 */ /* v0.12.0 2026-09-15：新增HX.fm手机文件夹逛一逛（壳全盘文件桥六桥+ensure权限引导浮层+pick全屏仿资源管理器+read封装Promise）；其余一行未动 */ /* v0.11.1 2026-09-14：速记📷附图改两步走（挂号#94，洪老师真机验收报「选完图浮窗被关掉没法输说明、图跑哪去不知道」，拍板A+B都做）——①选图不再立刻记行/关面板：压图存壳后面板挂一行「🖼已挂图 sjimg_xxx.jpg（✕可撤销）」，可继续打字补说明，点「记下」图和话一起进流水（save原逻辑未动，只认sjPendImg）；②回执明白话：记下提示图存手机壳文件名+联网传坚果云/学习套装数据/速记图/，上传成功流水行图名后补☁（sjImgUpload出队时回写）；✕撤销=清挂图+出队+删壳文件；其余一行未动 */ /* v0.11.0 2026-09-14：AI面板第2级提示词可改可存（挂号#79，洪老师拍板"不搞三级菜单，就两级，点进去就是几套预设提示词，可改可储存"）——条目带prompts时，第2级点某套进编辑页（全文可改+▶用这套发送+💾存为默认+↩恢复出厂）；改过的存覆盖账本hx_aiprompt_v1.<app>（出厂原文一个字不动，恢复出厂=删覆盖）；宿主函数发送前一句HX.ai.pget(id,idx)查覆盖（乙路，不改送不进去）；条目可带pget/pset/preset钩子接管存储（如大管家问AI接管它自己的hx_gj_askai_v1老账本）；新增HX.ai.pget公开口；其余一行未动 /* v0.10.0 2026-09-14：安心条HX.step（顶部细进度条+两行小字，愣住定格定位，洪老师拍板全家统一）+速记📷附图（压图存壳文件夹sjimg_*+行尾挂图+坚果云/学习套装数据/速记图/上传排队）；其余一行未动 /* v0.9.1 2026-09-14：HX.store.sync批量抱回（壳v1.7.3 readFiles桥）——多件对账一次JNI全读回，免逐件SAF往返卡主线程（洪老师真机报"点大管家变蓝后定住"，病根=5本账本连环读各约2秒）；旧壳无readFiles自动回落逐件读，逻辑一字未改 /* v0.9.0 2026-09-13：常驻通信管家双通道（洪老师拍板一次做完）——新增HX.mg投信层（壳v1.7.0管家在则GitHub联网写信mg_out_给后台服务代发+回信mg_in_轮询取，网页线程不碰网络；管家不在自动走老fetch，全家零改动）+HX.big大件异步编解码（TextEncoder/Decoder分块让气，无则回落老同步）；改道点=gh.fetch一个收口；_autoNetOk闸门规矩不变 /* v0.8.0 2026-09-13：开门静默令（洪老师拍板：开门不许自动同步/不许自动查版本，点了才做）——全家自动联网（dav rescue/mirror、relay闲时送与pull、selfUp、selfCheck、速记开门补推）统一过HX._autoNetOk闸门：默认全关，3秒内真有点击（=点了按钮）或localStorage hx_auto_net=1才放行；新增HX.syncNow()一件全手动补做；本地存取（HX.store/localStorage/壳文件）不联网不受影响；其余一行未动 /* v0.7.0 2026-09-12：HX.dav全异步化（根治#75/#77同步联网卡死主线程）——走壳v1.6.0新davAsync后台桥+HX._davCb回调，ts对账逻辑一行未改；旧壳没davAsync一律静默跳过绝不回退同步老路，壳升级后自动恢复 */ /* v0.6.0 2026-09-12 地基二期：HX.dav的rescue升级为ts对账（云端新超5秒留档_冲突_后盖回/本地新或相等顺手davUp追平/云端缺顺手davUp补齐） */ /* v0.5.0 2026-09-12：新增中转邮路HX.relay+坚果云腿HX.dav */ /* v0.4.0 2026-09-12：新增仓管员HX.store，地基工程一期规矩A/B落地 */ /* v0.3.0 2026-09-11：部件自升级HX.selfUp（病根：壳里旧版公共件永远不升级→AI面板等新功能装了也白装；开门闲时20秒比对云端version-hx-common.json，旧了静默下载写回授权文件夹，下次开门用新的，全程不弹窗） */ /* v0.2.0 2026-09-11：新增HX.ai统一AI面板（两层结构+定位置顶+AI功能生成器，洪老师2026-09-11拍板方法论落地试点）；HX.sj面板加「🤖AI」入口钮；其余一行未动 */ /* v0.1.1 2026-09-10：HX.sj.init 加可选 extraBtn（大管家#43「补充上一条」补回，洪老师点名功能）；不传仍是2钮版，默认行为不变 */
  if(window.HX && window.HX.HX_COMMON_VERSION){ return; } /* 已装过不重复装 */
  var HX = { HX_COMMON_VERSION: HX_COMMON_VERSION, ok: true };
  function warn(m){ try{ if(window.console && console.warn) console.warn('[hx-common] '+m); }catch(e){} }
  function lsGet(k){ try{ return localStorage.getItem(k)||''; }catch(e){ return ''; } }
  function lsSet(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  function trim(s){ return String(s||'').replace(/^\s+|\s+$/g,''); }

  /* ════ 0.9 开门静默闸门（v0.8.0，洪老师2026-09-13拍板：开门不要同步不要查版本，点了才做；v0.24.0 洪老师拍板取消开门静默令：默认放行，hx_auto_net='0'回老样子） ════
     规矩：凡"自动/闲时/开门"触发的联网（坚果云腿、中转邮路、自升级、版本自检、速记开门补推）一律先过HX._autoNetOk()；
     放行：默认放行（联网全异步化后同步卡死病根已除）；回退闸 localStorage hx_auto_net='0' → 回老样子（3秒内真有手指点击才放行）。
     只卡联网；本地存取（HX.store/localStorage/壳文件桥）一行不动照常。 */
  HX._lastTap = 0;
  try{
    var _tapFn = function(){ HX._lastTap = Date.now(); };
    document.addEventListener('pointerdown', _tapFn, true);
    document.addEventListener('touchstart', _tapFn, true);
    document.addEventListener('click', _tapFn, true);
  }catch(e){}
  HX._autoNetOk = function(manual){
    try{
      if(manual === true) return true;
      if(lsGet('hx_auto_net') === '0') return (Date.now() - (HX._lastTap || 0)) < 3000; /* v0.24.0 回退闸：开门静默令取消，hx_auto_net='0'回老样子 */
      return true; /* v0.24.0 洪老师拍板取消开门静默令：默认放行（联网全异步化后同步卡死病根已除） */
    }catch(e){ return true; }
  };
  HX.setAutoNet = function(on){ lsSet('hx_auto_net', on ? '1' : '0'); }; /* 总开关（默认关=开门静默） */
  /* 一件全手动补做：坚果云对账(需调用方传keys)+中转邮路收发+部件自升级+速记补推；返回Promise，全程异步不卡界面 */
  HX.syncNow = function(davKeys){
    try{ HX._lastTap = Date.now(); }catch(e){}
    var jobs = [];
    try{ if(HX.dav && HX.dav.rescue && davKeys && davKeys.length) jobs.push(Promise.resolve(HX.dav.rescue(davKeys))); }catch(e){}
    try{ if(HX.relay && HX.relay.flush) jobs.push(Promise.resolve(HX.relay.flush(true))); }catch(e){}
    try{ if(HX.relay && HX.relay.pull) jobs.push(Promise.resolve(HX.relay.pull(true))); }catch(e){}
    try{ if(HX.selfUp) jobs.push(Promise.resolve(HX.selfUp(true))); }catch(e){}
    try{ if(HX.sj && HX.sj.upload) HX.sj.upload(); }catch(e){}
    return Promise.all(jobs).then(function(){ return true; }, function(){ return false; });
  };

  /* ════ 1. 钥匙 HX.keys（plan2军规4：fallback兼容旧数据不丢；写Key一律只写hx_apikey） ════ */
  HX.keys = {
    /* v0.16.1 刀A：key落真源——壳页面端口8931~8951换着开，localStorage按端口换房、key反复丢；
       真源改落壳授权文件夹 hxdata_hx_keys.json（b64包{"kimi","qwen"}），localStorage只是缓存；
       本地写真源；云端只下不上——仅warm()救援腿从坚果云/私有仓读回，永不主动上传（v0.16.2口径） */
    /* 写真源：{kimi,qwen,gh} JSON→b64→LearnShell.writeFile；桥不在静默跳过，全程try护栏 */
    _saveFile: function(){
      try{
        if(!window.LearnShell || !LearnShell.writeFile) return; /* 桥不在静默跳过 */
        var enc = (HX.gh && HX.gh.b64enc) ? HX.gh.b64enc : function(s){ return btoa(unescape(encodeURIComponent(String(s)))); };
        var ghObj = null;
        try{
          var gt=lsGet('hx_gh_tok')||lsGet('br_gh_tok'),
              gu=lsGet('hx_gh_user')||lsGet('br_gh_user'),
              gr=lsGet('hx_gh_repo')||lsGet('br_gh_repo');
          gt=trim(gt); gu=trim(gu); gr=trim(gr);
          if(gt&&gu&&gr) ghObj={ t:gt, u:gu, r:gr };
        }catch(e){ ghObj=null; }
        var old = null; try{ old = HX.keys._loadFile(); }catch(e0){ old = null; } /* v0.24.5 刀1：合并式写真源，缺字段从旧真源继承防盖没 */
        var davObj = null;
        try{
          var du=lsGet('hx_dav_user'), dp=lsGet('hx_dav_pass');
          if(du&&dp) davObj={ user:du, pass:dp };
        }catch(e5){ davObj=null; }
        if(!davObj && old && old.dav) davObj = old.dav;
        if(!ghObj && old && old.gh) ghObj = old.gh;
        var o = { kimi: lsGet('hx_apikey') || (old && old.kimi) || '', qwen: lsGet('hx_qwenkey') || (old && old.qwen) || '', gh: ghObj, dav: davObj };
        if(old && old.deepseek) o.deepseek = old.deepseek;
        LearnShell.writeFile('hxdata_hx_keys.json', enc(JSON.stringify(o)));
      }catch(e){}
    },
    /* 读真源：readFile读回解码parse，失败返null；全程try护栏 */
    _loadFile: function(){
      try{
        if(!window.LearnShell || !LearnShell.readFile) return null;
        var b = LearnShell.readFile('hxdata_hx_keys.json'); if(!b) return null;
        var dec = (HX.gh && HX.gh.b64dec) ? HX.gh.b64dec : function(s){ try{ return decodeURIComponent(escape(atob(String(s).replace(/\s+/g,'')))); }catch(e2){ return ''; } };
        var o = JSON.parse(dec(b) || 'null');
        if(o && typeof o === 'object'){
          var ghOut = null;
          try{
            if(o.gh && typeof o.gh === 'object'){
              var gt=trim(o.gh.t), gu=trim(o.gh.u), gr=trim(o.gh.r);
              if(gt&&gu&&gr) ghOut={ t:gt, u:gu, r:gr };
            }
          }catch(e3){ ghOut=null; }
          var davOut = null; /* v0.24.5 刀2：真源认dav/deepseek */
          try{
            if(o.dav && typeof o.dav === 'object' && o.dav.user && o.dav.pass) davOut={ user:String(o.dav.user), pass:String(o.dav.pass) };
          }catch(e6){ davOut=null; }
          return { kimi: String(o.kimi||''), qwen: String(o.qwen||''), gh: ghOut, dav: davOut, deepseek: String(o.deepseek||'') };
        }
        return null;
      }catch(e){ return null; }
    },
    /* 大模型Key：hx_apikey→bg_apikey→xt_apikey 顺序返回第一个非空；都空→读壳文件真源回填hx_apikey（v0.16.1） */
    get: function(){
      try{
        var v = lsGet('hx_apikey')||lsGet('bg_apikey')||lsGet('xt_apikey');
        if(v) return v;
        var f = HX.keys._loadFile();
        if(f && f.kimi){ try{ lsSet('hx_apikey', f.kimi); }catch(e){} return f.kimi; } /* 回填动作自护栏 */
        return '';
      }catch(e){ return ''; }
    },
    /* 千问Key：hx_qwenkey→bg_qwen_key；都空→读壳文件真源回填hx_qwenkey（v0.16.1） */
    getQwen: function(){
      try{
        var v = lsGet('hx_qwenkey')||lsGet('bg_qwen_key');
        if(v) return v;
        var f = HX.keys._loadFile();
        if(f && f.qwen){ try{ lsSet('hx_qwenkey', f.qwen); }catch(e){} return f.qwen; }
        return '';
      }catch(e){ return ''; }
    },
    /* 写Key只写 hx_apikey（旧键保留不删，自然淘汰）；写完顺手落壳文件真源（v0.16.1） */
    set: function(v){ try{ lsSet('hx_apikey', String(v==null?'':v)); }catch(e){} try{ HX.keys._saveFile(); }catch(e){} },
    /* 千问Key写 hx_qwenkey+落壳文件真源（v0.16.1） */
    setQwen: function(v){ try{ lsSet('hx_qwenkey', String(v==null?'':v)); }catch(e){} try{ HX.keys._saveFile(); }catch(e){} },
    /* v0.16.2 刀D 云端取回（只下不上，一次性的救援腿）：开门时本地没key→自动从云端取回→写壳文件真源→get/getQwen灌回localStorage。
       腿①坚果云 /学习套装数据/hxdata_hx_keys.json（davAsync同款Promise包装：HX._davCbs+120秒死心，davCall在HX.dav闭包里不外露，此处自写同款）；
       腿②GitHub私有仓 hongxiaotao177/xuexi-backup 根目录同名件（raw直链，Authorization: Bearer t）→b64文本写壳文件真源→灌回；
       两腿全败静默不报错不弹窗（AI面板守卫的aiAskKey浮层仍是人工兜底）；全程try护栏；永不主动上传 */
    warm: function(){
      try{
        if(HX.keys.get() && HX.keys.getQwen() && HX.keys.gh() && HX.keys.dav()) return; /* 本地有，不碰云端；v0.24.5 刀4：dav缺失也取暖 */
        var refill = function(){ try{ return !!(HX.keys.get() || HX.keys.getQwen() || HX.keys.gh() || HX.keys.dav()); }catch(e){ return false; } }; /* v0.24.5 刀4：取回后顺便触发gh/dav回填 */ /* 调get/getQwen走_loadFile现成链路灌回 */
        var toast = function(m){ try{ if(!document.body) return; var d=document.createElement('div'); d.textContent=m; d.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#4a6b4f;color:#fff;padding:10px 18px;border-radius:20px;font-size:14px;z-index:99999;box-shadow:0 2px 8px rgba(0,0,0,.25)'; document.body.appendChild(d); var off=false; try{ off=(localStorage.getItem('hx_toast_sticky_off')==='1'); }catch(e){ off=false; } if(off){ setTimeout(function(){ try{ d.remove(); }catch(e){} },4000); } else { hxToastHold(d, function(){ try{ d.remove(); }catch(e){} }); } }catch(e){} }; /* 照HX.bill.toast现成样式；v0.18.1 刀4 默认不自动消失 */
        /* 腿②GitHub私有仓（腿①失败或没dav钥匙时走这条） */
        var leg2 = function(){
          try{
            var g = HX.keys.gh(); if(!g || !HX.gh || !HX.gh.fetch) return; /* 没GitHub钥匙：静默 */
            HX.gh.fetch('https://raw.githubusercontent.com/hongxiaotao177/xuexi-backup/main/hxdata_hx_keys.json', { headers:{ 'Authorization':'Bearer '+g.t } }).then(function(resp){
              if(!resp || !resp.ok) return null;
              return resp.text();
            }).then(function(txt){
              try{
                if(txt && window.LearnShell && LearnShell.writeFile){
                  LearnShell.writeFile('hxdata_hx_keys.json', txt); /* 文本=b64，落真源 */
                  if(refill()) toast('🔑 钥匙已从云端取回');
                }
              }catch(e){}
            }, function(){});
          }catch(e){}
        };
        /* 腿①坚果云：davAsync down 成功后文件已落到壳授权文件夹，refill即灌回 */
        var hasDav = false;
        try{ hasDav = !!(HX.dav && HX.dav.asyncOk() && HX.keys.dav() && window.LearnShell && typeof LearnShell.davAsync === 'function'); }catch(e){}
        if(!hasDav){ leg2(); return; }
        new Promise(function(res){
          try{
            var k = HX.keys.dav();
            HX._davCbs = HX._davCbs || {};
            var cbId = 'dav' + Date.now() + '_' + Math.floor(Math.random()*1000000);
            HX._davCbs[cbId] = function(r){ res(typeof r === 'string' ? r : null); };
            setTimeout(function(){ if(HX._davCbs[cbId]){ delete HX._davCbs[cbId]; res(null); } }, 120000); /* 120秒没回调当失败，绝不死等（照抄davCall写法） */
            LearnShell.davAsync('down', k.user, k.pass, '/学习套装数据/hxdata_hx_keys.json', 'hxdata_hx_keys.json', cbId);
          }catch(e){ res(null); }
        }).then(function(r){
          try{
            if(r && String(r).indexOf('err:') !== 0 && refill()){ toast('🔑 钥匙已从云端取回'); return; }
          }catch(e){}
          leg2(); /* 腿①没取回→腿② */
        }, function(){ leg2(); });
      }catch(e){}
    },
    /* GitHub 钱罐：hx_gh_tok/user/repo（fallback br_gh_*），三样齐才算有；返回 {t,u,r} 或 null
       v0.18.1 刀1：localStorage三样不齐时→读真源gh回填三个localStorage键并返回；真源也没有=null */
    gh: function(){
      try{
        var t=lsGet('hx_gh_tok')||lsGet('br_gh_tok'),
            u=lsGet('hx_gh_user')||lsGet('br_gh_user'),
            r=lsGet('hx_gh_repo')||lsGet('br_gh_repo');
        t=trim(t); u=trim(u); r=trim(r);
        if(t&&u&&r) return { t:t, u:u, r:r, tok:t, user:u, repo:r };
        try{
          var f = HX.keys._loadFile();
          if(f && f.gh && f.gh.t && f.gh.u && f.gh.r){
            try{ lsSet('hx_gh_tok', f.gh.t); }catch(e1){}
            try{ lsSet('hx_gh_user', f.gh.u); }catch(e2){}
            try{ lsSet('hx_gh_repo', f.gh.r); }catch(e3){}
            return { t:f.gh.t, u:f.gh.u, r:f.gh.r, tok:f.gh.t, user:f.gh.u, repo:f.gh.r };
          }
        }catch(e4){}
        return null;
      }catch(e){ return null; }
    },
    /* 坚果云：hx_dav_user/hx_dav_pass；返回 {user,pass} 或 null */
    dav: function(){
      try{
        var u=lsGet('hx_dav_user'), p=lsGet('hx_dav_pass');
        if(u&&p) return { user:u, pass:p };
        try{
          var f = HX.keys._loadFile(); /* v0.24.5 刀3：localStorage空时读真源回填（照gh()样式） */
          if(f && f.dav && f.dav.user && f.dav.pass){
            try{ lsSet('hx_dav_user', f.dav.user); }catch(e1){}
            try{ lsSet('hx_dav_pass', f.dav.pass); }catch(e2){}
            return { user:f.dav.user, pass:f.dav.pass };
          }
        }catch(e3){}
        return null;
      }catch(e){ return null; }
    }
  };

  /* ════ 1.9 通信管家 HX.mg + 大件助手 HX.big（v0.9.0 2026-09-13，洪老师拍板"双通道一次做完"） ════
     双通道：有管家（壳v1.7.0+，LearnShell.mgOn()=='1'）时，全家GitHub联网不自己跑——
     写成一封信 mg_out_<id>.json 投进授权文件夹，常驻服务HxPostService后台代发（5秒一轮+退避重试不丢信），
     回信 mg_in_<id>.json 网页轮询来取；网页这条界面线程从此不碰网络。
     没管家（老壳/浏览器）自动走老fetch，一行不用改。Token只进信件文件（本机授权文件夹），不落公开仓。 */
  HX.big = (function(){
    var big = {};
    /* 大件UTF-8→b64：TextEncoder原生+分块拼，每口≤20ms让界面喘气；没TextEncoder回落老同步 */
    big.enc = function(s){
      return new Promise(function(res){
        try{
          if(typeof TextEncoder === 'undefined'){ res(btoa(unescape(encodeURIComponent(String(s))))); return; }
          var bytes = (new TextEncoder()).encode(String(s));
          var parts = [], i = 0;
          (function step(){
            try{
              var t0 = Date.now();
              while(i < bytes.length){
                var end = Math.min(i + 32768, bytes.length);
                parts.push(String.fromCharCode.apply(null, bytes.subarray(i, end)));
                i = end;
                if(Date.now() - t0 > 20 && i < bytes.length){ setTimeout(step, 0); return; }
              }
              res(btoa(parts.join('')));
            }catch(e){ res(btoa(unescape(encodeURIComponent(String(s))))); }
          })();
        }catch(e){ res(btoa(unescape(encodeURIComponent(String(s))))); }
      });
    };
    /* 大件b64→UTF-8：atob原生+分块装填+TextDecoder；回落老同步 */
    big.dec = function(s){
      return new Promise(function(res){
        try{
          if(typeof TextDecoder === 'undefined'){ res(decodeURIComponent(escape(atob(String(s).replace(/\s+/g,''))))); return; }
          var bin = atob(String(s).replace(/\s+/g,''));
          var bytes = new Uint8Array(bin.length);
          var i = 0;
          (function step(){
            try{
              var t0 = Date.now();
              while(i < bin.length){
                var end = Math.min(i + 65536, bin.length);
                for(var j = i; j < end; j++) bytes[j] = bin.charCodeAt(j);
                i = end;
                if(Date.now() - t0 > 20 && i < bin.length){ setTimeout(step, 0); return; }
              }
              res((new TextDecoder()).decode(bytes));
            }catch(e){ res(decodeURIComponent(escape(atob(String(s).replace(/\s+/g,''))))); }
          })();
        }catch(e){ res(decodeURIComponent(escape(atob(String(s).replace(/\s+/g,''))))); }
      });
    };
    return big;
  })();
  HX.mg = (function(){
    var mg = {};
    var _seq = 0;
    mg.ok = function(){
      try{ return !!(window.LearnShell && LearnShell.mgOn && LearnShell.mgOn() === '1'
                     && LearnShell.folderSet && LearnShell.folderSet()); }catch(e){ return false; }
    };
    function fakeResp(status, text){
      return {
        status: status, ok: status >= 200 && status < 300,
        text: function(){ return Promise.resolve(text); },
        json: function(){ return Promise.resolve(JSON.parse(text)); }
      };
    }
    /* 投一封信+等回信。method/url/bodyStr（JSON字符串或null）。回信超时90秒：网页不等了，信还在管家会继续送（发送类语义不丢） */
    mg.call = function(method, url, bodyStr){
      return new Promise(function(resolve, reject){
        if(!mg.ok()){ reject(new Error('没管家')); return; }
        var id = 'mg' + Date.now() + '_' + (++_seq) + '_' + Math.floor(Math.random() * 1000);
        var doWrite = function(bodyB64){
          try{
            var letter = { id: id, method: method, url: url, tok: ((HX.gh && HX.gh.cfg) ? (HX.gh.cfg().tok || '') : '') };
            if(bodyB64 != null) letter.bodyB64 = bodyB64;
            HX.big.enc(JSON.stringify(letter)).then(function(lb64){
              try{
                if(!LearnShell.writeFile('mg_out_' + id + '.json', lb64)){ reject(new Error('投信写不进授权文件夹')); return; }
              }catch(e){ reject(e); return; }
              var t0 = Date.now();
              var timer = setInterval(function(){
                try{
                  var rb64 = LearnShell.readFile('mg_in_' + id + '.json');
                  if(rb64){
                    clearInterval(timer);
                    try{ LearnShell.deleteFile('mg_in_' + id + '.json'); }catch(e){}
                    HX.big.dec(rb64).then(function(txt){
                      try{
                        var r = JSON.parse(txt);
                        if(r.err){ reject(new Error(r.err)); return; }
                        HX.big.dec(r.bodyB64 || '').then(function(bodyTxt){
                          resolve(fakeResp(r.status || 0, bodyTxt));
                        });
                      }catch(e){ reject(e); }
                    });
                    return;
                  }
                }catch(e){}
                if(Date.now() - t0 > 90000){
                  clearInterval(timer);
                  reject(new Error('管家90秒没回信（信不丢，管家后台会继续送）'));
                }
              }, 2000);
            });
          }catch(e){ reject(e); }
        };
        try{
          if(bodyStr != null) HX.big.enc(bodyStr).then(doWrite, function(){ reject(new Error('信体编码失败')); });
          else doWrite(null);
        }catch(e){ reject(e); }
      });
    };
    return mg;
  })();

  /* ════ 2. gh传输 HX.gh（以 software-bridge.html 的 gh 函数族为底，GitHub API语义不变） ════ */
  HX.gh = (function(){
    var gh = {};
    function cfg(){ var g=HX.keys.gh(); return g ? { user:g.u, tok:g.t, repo:g.r } : { user:'', tok:'', repo:'' }; }
    gh.cfg = cfg;
    gh.ready = function(){ var c=cfg(); return !!(c.user && c.tok && c.repo); };
    gh.headers = function(){ return { 'Authorization':'token '+cfg().tok, 'Accept':'application/vnd.github+json' }; };
    /* 按段编码再拼'/'（transit/中文名 带子目录的路径，整串encodeURIComponent会把斜杠编成%2F，GitHub兼容性差；分段编码最稳） */
    gh.fileUrl = function(name){
      var c = cfg();
      var path = String(name).split('/').map(encodeURIComponent).join('/');
      return 'https://api.github.com/repos/' + encodeURIComponent(c.user) + '/' +
             encodeURIComponent(c.repo) + '/contents/' + path;
    };
    gh.fetch = function(url, opts){
      /* v0.9.0 双通道改道：管家在→投信给常驻服务代发（网页线程不碰网络）；管家不在→老fetch，一行不变 */
      try{
        if(HX.mg && HX.mg.ok()){
          var _m = (opts && opts.method) ? opts.method : 'GET';
          var _b = (opts && opts.body != null) ? opts.body : null;
          return HX.mg.call(_m, url, _b);
        }
      }catch(e){}
      return new Promise(function(resolve, reject){
        var ctrl = new AbortController();
        var timer = setTimeout(function(){ ctrl.abort(); }, 30000);
        fetch(url, Object.assign({}, opts || {}, { signal: ctrl.signal })).then(function(r){
          clearTimeout(timer); resolve(r);
        }, function(e){
          clearTimeout(timer);
          reject(new Error(e && e.name === 'AbortError' ? '连接超时（30秒），网络可能不通' : '网络不通，请求没到达 GitHub'));
        });
      });
    };
    /* 文本 base64（中文安全）；二进制 base64（PDF 等） */
    gh.b64enc = function(s){ return btoa(unescape(encodeURIComponent(s))); };
    gh.b64dec = function(s){ return decodeURIComponent(escape(atob(String(s).replace(/\s+/g,'')))); };
    gh.b64decBin = function(s){
      var bin = atob(String(s).replace(/\s+/g,''));
      var arr = new Uint8Array(bin.length);
      for(var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      return arr;
    };
    gh.errText = function(status, body){
      if(status === 401) return 'Token 失效或没权限，检查 Token';
      if(status === 404) return '仓库不存在或 Token 没勾选这个仓库';
      return 'HTTP ' + status + '：' + String(body || '').replace(/\s+/g,' ').slice(0,150);
    };
    /* 读-改-写 JSON 文件（404=还没有）→ Promise<{sha,data}> */
    gh.readJson = function(name){
      return gh.fetch(gh.fileUrl(name), { headers: gh.headers() }).then(function(resp){
        if(resp.status === 404) return { sha: null, data: null };
        if(!resp.ok) return resp.text().then(function(t){ throw new Error(gh.errText(resp.status, t)); });
        return resp.json().then(function(file){
          var data = null;
          try{ data = JSON.parse(gh.b64dec(file.content || '')); }catch(e){}
          return { sha: file.sha, data: data };
        });
      });
    };
    gh.writeJson = function(name, data, sha, message){
      var body = { message: message, content: gh.b64enc(JSON.stringify(data)) };
      if(sha) body.sha = sha;
      return gh.fetch(gh.fileUrl(name), { method:'PUT', headers: gh.headers(), body: JSON.stringify(body) })
        .then(function(resp){
          if(!resp.ok) return resp.text().then(function(t){ throw new Error(gh.errText(resp.status, t)); });
        });
    };
    /* 低层：写base64内容（bridge ghPutFile 原样） */
    gh.putB64 = function(name, b64, message){
      return gh.fetch(gh.fileUrl(name), { headers: gh.headers() }).then(function(resp){
        if(resp.status === 404) return null;
        if(!resp.ok) return resp.text().then(function(t){ throw new Error(gh.errText(resp.status, t)); });
        return resp.json();
      }).then(function(file){
        var body = { message: message, content: b64 };
        if(file && file.sha) body.sha = file.sha;
        return gh.fetch(gh.fileUrl(name), { method:'PUT', headers: gh.headers(), body: JSON.stringify(body) })
          .then(function(resp2){
            if(!resp2.ok) return resp2.text().then(function(t){ throw new Error(gh.errText(resp2.status, t)); });
          });
      });
    };
    gh.deleteFile = function(name, message){
      return gh.fetch(gh.fileUrl(name), { headers: gh.headers() }).then(function(resp){
        if(resp.status === 404) return null;
        if(!resp.ok) return resp.text().then(function(t){ throw new Error(gh.errText(resp.status, t)); });
        return resp.json();
      }).then(function(file){
        if(!file || !file.sha) return;
        return gh.fetch(gh.fileUrl(name), { method:'DELETE', headers: gh.headers(),
          body: JSON.stringify({ message: message, sha: file.sha }) })
          .then(function(resp2){
            if(!resp2.ok) return resp2.text().then(function(t){ throw new Error(gh.errText(resp2.status, t)); });
          });
      });
    };
    /* 高层封装：putFile(repo,path,contentStr,msg)
       repo 可传 '用户名/仓库名' 字符串，也可省略/传null（走 HX.keys.gh() 钱罐）。 */
    function splitRepo(repo){
      if(repo && typeof repo==='string' && repo.indexOf('/')>0){
        var p=repo.split('/'); return { u:trim(p[0]), r:trim(p.slice(1).join('/')) };
      }
      var g=HX.keys.gh(); return g ? { u:g.u, r:g.r, t:g.t } : null;
    }
    gh.putFile = function(repo, path, contentStr, msg){
      return new Promise(function(resolve, reject){
        try{
          var rr = splitRepo(repo);
          if(!rr || !rr.u || !rr.r){ reject(new Error('没有GitHub钥匙（先填Token/用户名/仓库名）')); return; }
          var tok = rr.t || ((HX.keys.gh()||{}).t) || '';
          if(!tok){ reject(new Error('没有GitHub Token（写操作必须）')); return; }
          var H = { 'Authorization':'token '+tok, 'Accept':'application/vnd.github+json' };
          var api = 'https://api.github.com/repos/'+encodeURIComponent(rr.u)+'/'+encodeURIComponent(rr.r)+
                    '/contents/'+String(path).split('/').map(encodeURIComponent).join('/');
          gh.fetch(api, { headers:H }).then(function(resp){
            if(resp.status === 404) return { sha:null };
            if(!resp.ok) return resp.text().then(function(t){ throw new Error(gh.errText(resp.status, t)); });
            return resp.json();
          }).then(function(file){
            var body = { message:(msg||('hx-common 写入 '+path)), content: gh.b64enc(String(contentStr)) };
            if(file && file.sha) body.sha = file.sha;
            return gh.fetch(api, { method:'PUT', headers:H, body: JSON.stringify(body) });
          }).then(function(resp2){
            if(!resp2.ok) return resp2.text().then(function(t){ throw new Error(gh.errText(resp2.status, t)); });
            resolve(true);
          }).catch(reject);
        }catch(e){ reject(e); }
      });
    };
    /* 高层封装：getFile(repo,path) → Promise<文本字符串>（404/失败都 reject 报原因；repo可省略走钱罐） */
    gh.getFile = function(repo, path){
      return new Promise(function(resolve, reject){
        try{
          var rr = splitRepo(repo);
          if(!rr || !rr.u || !rr.r){ reject(new Error('没有GitHub钥匙')); return; }
          var tok = rr.t || ((HX.keys.gh()||{}).t) || '';
          var api = 'https://api.github.com/repos/'+encodeURIComponent(rr.u)+'/'+encodeURIComponent(rr.r)+
                    '/contents/'+String(path).split('/').map(encodeURIComponent).join('/');
          /* 公开仓没Token也能读：没Token就不发Authorization头（发空头GitHub会当401拒） */
          var H = { 'Accept':'application/vnd.github+json' };
          if(tok) H['Authorization'] = 'token '+tok;
          gh.fetch(api, { headers:H }).then(function(resp){
            if(resp.status === 404){ reject(new Error('404 云端还没有这个文件')); return null; }
            if(!resp.ok) return resp.text().then(function(t){ throw new Error(gh.errText(resp.status, t)); });
            return resp.json();
          }).then(function(file){
            if(file===null || file===undefined) return;
            resolve(gh.b64dec(file.content || ''));
          }).catch(reject);
        }catch(e){ reject(e); }
      });
    };
    return gh;
  })();

  /* 点分版本号比较：a>b 返回 1，a<b 返回 -1，相等 0（按段转数字逐段比） */
  HX.cmpVer = function(a, b){
    var pa = String(a).split('.'), pb = String(b).split('.');
    for(var i = 0; i < Math.max(pa.length, pb.length); i++){
      var x = parseInt(pa[i] || '0', 10), y = parseInt(pb[i] || '0', 10);
      if(x > y) return 1; if(x < y) return -1;
    }
    return 0;
  };

  /* ════ 3. 版本自检 HX.selfCheck(app, swVersion) ════
     取学习笔记 ghSelfCheck 逻辑通用化：读公开仓 version-<app>.json（API优先，失败/没Token走 raw 直链带?t=防缓存），
     比对后 resolve {state:'new'|'old'|'same'|'unknown', remote:对象或null}；不绑UI，UI各软件自留。 */
  HX.selfCheck = function(app, swVersion, opts){
    return new Promise(function(resolve){
      var done = function(state, remote){ try{ resolve({ state:state, remote:remote||null }); }catch(e){} };
      try{
        opts = opts || {};
        if(!HX._autoNetOk(opts.manual)){ done('off', null); return; } /* v0.8.0 开门静默令：开门不自查版本 */
        var name = 'version-' + app + '.json';
        var g = HX.keys.gh();
        var hasApi = !!(g && g.t && g.u && g.r);
        var H = hasApi ? { 'Authorization':'token '+g.t, 'Accept':'application/vnd.github+json' } : {};
        var base = hasApi ? 'https://api.github.com/repos/'+encodeURIComponent(g.u)+'/'+encodeURIComponent(g.r)+'/contents/' : null;
        /* v2.14.6 免Token备用路（公开站直链，和软件更新同款）——Token作废就静默失败的病，走raw直链治 */
        var rawBase = opts.rawBase || 'https://hongxiaotao177.github.io/';
        var raw = function(){
          return fetch(rawBase + encodeURIComponent(name) + '?t=' + Date.now(), { cache:'no-store' })
            .then(function(r){ if(!r.ok) throw 0; return r.text(); });
        };
        var getText;
        if(hasApi){
          getText = HX.gh.fetch(base + encodeURIComponent(name), { headers: H })
            .then(function(r){ if(!r.ok) throw 0; return r.json(); })
            .then(function(j){ return HX.gh.b64dec(j.content || ''); })
            .catch(raw);
        }else{
          getText = raw();
        }
        getText.then(function(txt){
          var info; try{ info = JSON.parse(txt); }catch(e){ info = null; }
          if(!info || !info.version){ done('unknown', info); return; }
          var c = HX.cmpVer(info.version, swVersion);
          done(c > 0 ? 'new' : (c < 0 ? 'old' : 'same'), info);
        }).catch(function(){ done('unknown', null); });
      }catch(e){ warn('selfCheck: '+((e&&e.message)||e)); done('unknown', null); }
    });
  };

  /* ════ 4. 全家AI账本 hx_aibill（照抄学习笔记 hxBill 实现格式，一条不动） ════
     2026-09-01 洪医生家规：每次AI记一笔+弹一条花了多少钱；主界面💰卡片汇总。
     tokens≈汉字数/2，是估算，真扣费以官方账单为准。 */
  var HX_PRICE = {"kimi-k2.5":[4,16],"kimi-k2.6":[4,16],"kimi-k2.7":[7,27],"kimi-k3":[21,105],"qwen-vl-max":[3,9],"qwen-plus":[0.8,2],"moonshot-v1-8k":[12,12],"moonshot-v1-32k":[24,24],"moonshot-v1-128k":[60,60]};
  function hxBillYuan(model,inC,outC,imgs){var p=HX_PRICE["kimi-k2.5"];for(var k in HX_PRICE){if(model&&String(model).indexOf(k)===0){p=HX_PRICE[k];break;}}return Math.ceil((inC||0)/2)/1e6*p[0]+Math.ceil((outC||0)/2)/1e6*p[1]+(imgs||0)*0.005;}
  /* HX.bill(app,what,inC,outC,model,imgs)：往 hx_aibill unshift 一笔 {app,what,cost,t}，500条封顶，返回这笔的钱数 */
  HX.bill = function(app,what,inC,outC,model,imgs){try{var c=hxBillYuan(model,inC,outC,imgs);var arr=JSON.parse(localStorage.getItem("hx_aibill")||"[]");arr.unshift({app:app,what:what||"",cost:+c.toFixed(4),t:Date.now()});if(arr.length>500)arr.length=500;localStorage.setItem("hx_aibill",JSON.stringify(arr));return c;}catch(e){return 0;}};
  /* 简式：HX.bill.add(app,tokens,cost) —— 已经算好钱数，直接记一笔 */
  HX.bill.add = function(app,tokens,cost){try{var arr=JSON.parse(localStorage.getItem("hx_aibill")||"[]");arr.unshift({app:app,what:"tokens:"+(tokens||0),cost:+(+cost||0).toFixed(4),t:Date.now()});if(arr.length>500)arr.length=500;localStorage.setItem("hx_aibill",JSON.stringify(arr));return +(+cost||0).toFixed(4);}catch(e){return 0;}};
  HX.bill.yuan = hxBillYuan;
  HX.bill.month = function(){try{var arr=JSON.parse(localStorage.getItem("hx_aibill")||"[]");var n=new Date(),s=0;arr.forEach(function(e){var t=new Date(e.t);if(t.getFullYear()===n.getFullYear()&&t.getMonth()===n.getMonth())s+=e.cost||0;});return s;}catch(e){return 0;}};
  HX.bill.msg = function(c){return "💰 本次约¥"+(c<0.01?(+c).toFixed(3):(+c).toFixed(2))+" ｜ 本月全家约¥"+HX.bill.month().toFixed(2);};
  /* v0.18.1 刀4：toast不自动消失——点✕或点页面别处才消失；总开关 hx_toast_sticky_off==='1' 时走老行为 */
  function hxToastHold(el, hide){
    try{
      if(!el || !hide) return;
      try{ if(window.HX && HX.bb && typeof HX.bb.log==='function' && String(el.id||'')!=='hxBbToast'){ HX.bb.log('note','黑框:'+String(el.textContent||'').slice(0,100)); } }catch(e){} /* v0.28.0 案4：黑框内容留账，bb自家toast除外防噪音 */
      try{ if(el._hxToastOff){ document.removeEventListener('pointerdown', el._hxToastOff, true); document.removeEventListener('touchstart', el._hxToastOff, true); document.removeEventListener('mousedown', el._hxToastOff, true); el._hxToastOff=null; } }catch(e0){} /* v0.24.3 刀B：三路全摘 */
      try{ if(el._hxToastX && el._hxToastX.parentNode) el._hxToastX.parentNode.removeChild(el._hxToastX); }catch(e1){}
      var x=document.createElement('span');
      x.textContent='✕';
      x.style.cssText='margin-left:10px;cursor:pointer;font-weight:bold;padding:4px 10px;font-size:16px'; /* v0.24.3 刀B：✕点击面加大（DS误写驼峰fontSize，Kimi终审翻font-size） */
      x.addEventListener('click', function(ev){ try{ ev.stopPropagation(); }catch(e2){} try{ hide(); }catch(e3){} });
      x.addEventListener('touchstart', function(ev){ try{ ev.stopPropagation(); }catch(e2b){} try{ hide(); }catch(e3b){} }); /* v0.24.3 刀B：✕加挂touchstart，老WebView没pointer事件也点得动 */
      el.appendChild(x);
      el._hxToastX=x;
      setTimeout(function(){
        try{
          var off=function(ev){
            try{
              var t=ev.target;
              if(el===t || (el.contains && el.contains(t))) return;
              try{ document.removeEventListener('pointerdown', off, true); }catch(e6){}
              try{ document.removeEventListener('touchstart', off, true); }catch(e6b){}
              try{ document.removeEventListener('mousedown', off, true); }catch(e6c){} /* v0.24.3 刀B：三路全摘 */
              try{ if(el._hxToastOff===off) el._hxToastOff=null; }catch(e7){}
              hide();
            }catch(e4){}
          }; /* v0.18.1 终审修正：点别处消失后自摘监听，一次性toast不留监听残留 */
          el._hxToastOff=off;
          document.addEventListener('pointerdown', off, true);
          document.addEventListener('touchstart', off, true);
          document.addEventListener('mousedown', off, true); /* v0.24.3 刀B（洪老师真机报「黑框完全关不掉」，病根=X5/老WebView不认pointerdown）：监听一路变三路 */
        }catch(e5){}
      }, 350);
    }catch(e){}
  }
  HX.bill.toast = function(c){try{var d=document.createElement("div");d.textContent=HX.bill.msg(c);d.style.cssText="position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#4a6b4f;color:#fff;padding:10px 18px;border-radius:20px;font-size:14px;z-index:99999;box-shadow:0 2px 8px rgba(0,0,0,.25)";document.body.appendChild(d);var off=false;try{off=(localStorage.getItem('hx_toast_sticky_off')==='1');}catch(e){off=false;}if(off){setTimeout(function(){d.remove();},4000);}else{hxToastHold(d,function(){try{d.remove();}catch(e){}});}}catch(e){}};

  /* ════ 4.9 AI总台 HX.air（v0.18.0 新增｜洪老师2026-10-12拍板「同意开工」）
     军规例外声明：老军规「面板不新造取数通道、不碰钥匙」对 HX.air 开口子——
       HX.air 巡检测活与选路可【直发 AI 请求】、【读钥匙真源文件】；但【不碰各宿主账本】，各软件账本仍各管各的。
     总回退开关：localStorage hx_air_off=1 → 总台全退休（问路全放行、状态条不出现、开门不巡检）。
     账本 hx_air_v1：{ts, p:{kimi:{ok,model,err,ts}, ds:{...}, qwen:{...}}}
       → localStorage 'hx_air_v1' 缓存 + 壳真源 'hxdata_hx_air.json'（LearnShell.writeFile/readFile，b64，照HX.keys同款）
     全模块所有公开口与内部步全 try 护栏，任何异常不许外抛炸宿主。 */
  HX.air = (function(){
    var LS_KEY = 'hx_air_v1';
    var FILE_NAME = 'hxdata_hx_air.json';
    var MAX_AGE = 6*60*60*1000; /* 6小时 */

    function _off(){ try{ return localStorage.getItem('hx_air_off')==='1'; }catch(e){ return false; } }
    function _now(){ return Date.now(); }
    function _blankP(){ return { kimi:{ok:0,model:'',err:'',ts:0}, ds:{ok:0,model:'',err:'',ts:0}, qwen:{ok:0,model:'',err:'',ts:0} }; }

    /* b64 编解码——照 HX.keys 同款 */
    var _enc = (HX.gh && HX.gh.b64enc) ? HX.gh.b64enc : function(s){ return btoa(unescape(encodeURIComponent(String(s)))); };
    var _dec = (HX.gh && HX.gh.b64dec) ? HX.gh.b64dec : function(s){ try{ return decodeURIComponent(escape(atob(String(s).replace(/\s+/g,'')))); }catch(e2){ return ''; } };

    /* ---- 读壳文件 ---- */
    function _readFile(){
      try{
        if(typeof LearnShell==='undefined' || !LearnShell || !LearnShell.readFile) return null;
        var b = LearnShell.readFile(FILE_NAME);
        if(!b) return null;
        var txt = _dec(b);
        if(!txt) return null;
        var obj = JSON.parse(txt);
        return (obj && obj.p) ? obj : null;
      }catch(e){ return null; }
    }
    /* ---- 写壳文件（静默） ---- */
    function _writeFile(obj){
      try{
        if(typeof LearnShell==='undefined' || !LearnShell || !LearnShell.writeFile) return;
        LearnShell.writeFile(FILE_NAME, _enc(JSON.stringify(obj)));
      }catch(e){}
    }

    /* ---- 读账：localStorage 空 → 读壳真源回填 ---- */
    function _load(){
      try{
        var s = '';
        try{ s = localStorage.getItem(LS_KEY)||''; }catch(e){}
        if(s){
          try{
            var o = JSON.parse(s);
            if(o && o.p) return o;
          }catch(e2){}
        }
        var fo = _readFile();
        if(fo){
          try{ localStorage.setItem(LS_KEY, JSON.stringify(fo)); }catch(e3){}
          return fo;
        }
        return null;
      }catch(e){ return null; }
    }
    /* ---- 写账：双写 ---- */
    function _save(obj){
      try{ try{ localStorage.setItem(LS_KEY, JSON.stringify(obj)); }catch(e){} _writeFile(obj); }catch(e){}
    }

    /* ---- 读 DS 钥匙：localStorage 'xt_dskey'，空则自读壳真源 hxdata_hx_keys.json 的 deepseek 字段 ---- */
    function _dsKey(){
      try{
        var k = '';
        try{ k = localStorage.getItem('xt_dskey')||''; }catch(e){}
        k = (k||'').trim();
        if(k) return k;
        if(typeof LearnShell==='undefined' || !LearnShell || !LearnShell.readFile) return '';
        var b = LearnShell.readFile('hxdata_hx_keys.json');
        if(!b) return '';
        var txt = _dec(b);
        if(!txt) return '';
        var obj = JSON.parse(txt);
        if(obj && obj.deepseek) return String(obj.deepseek).trim();
        return '';
      }catch(e){ return ''; }
    }

    /* ---- 挑活模型：偏好顺序第一个在册的 ---- */
    var KIMI_PREF = ['kimi-k2.7-code-highspeed','kimi-k2.6','kimi-k2.5','moonshot-v1-32k','moonshot-v1-8k','moonshot-v1-128k'];
    function _pickKimiModel(idList){
      try{
        if(!idList || !idList.length) return '';
        var ids = {};
        for(var i=0;i<idList.length;i++){ ids[String(idList[i])] = 1; }
        for(var j=0;j<KIMI_PREF.length;j++){ if(ids[KIMI_PREF[j]]) return KIMI_PREF[j]; }
        return '';
      }catch(e){ return ''; }
    }

    /* ---- 探活：Kimi 花名册 GET（免费） ---- */
    function _probeKimi(){
      return new Promise(function(resolve){
        var out = { ok:0, model:'', err:'', ts:_now() };
        var key = '';
        try{ key = (HX.keys && HX.keys.get) ? (HX.keys.get()||'') : ''; }catch(e){ key=''; }
        key = (key||'').trim();
        if(!key){ out.err='没钥匙'; resolve(out); return; }
        var done = false;
        var ctrl = null, tid = null;
        function fin(o){ if(done) return; done=true; try{ if(tid) clearTimeout(tid); }catch(e){} resolve(o); }
        try{
          ctrl = new AbortController();
          tid = setTimeout(function(){ try{ ctrl.abort(); }catch(e){} fin({ ok:0, model:'', err:'花名册超时', ts:_now() }); }, 15000);
          fetch('https://api.moonshot.cn/v1/models', {
            method:'GET',
            headers:{ 'Authorization':'Bearer '+key },
            signal: ctrl.signal
          }).then(function(r){
            if(!r || !r.ok){ fin({ ok:0, model:'', err:'花名册 HTTP '+(r&&r.status), ts:_now() }); return null; }
            return r.json();
          }).then(function(j){
            if(done) return;
            var list = (j && j.data) ? j.data : null;
            var ids = [];
            if(list && list.length){ for(var i=0;i<list.length;i++){ if(list[i] && list[i].id) ids.push(list[i].id); } }
            var m = _pickKimiModel(ids);
            if(m) fin({ ok:1, model:m, err:'', ts:_now() });
            else fin({ ok:0, model:'', err:'花名册无偏好模型', ts:_now() });
          }).catch(function(e){
            fin({ ok:0, model:'', err:String((e&&e.message)||e).slice(0,60), ts:_now() });
          });
        }catch(e){
          fin({ ok:0, model:'', err:String((e&&e.message)||e).slice(0,60), ts:_now() });
        }
      });
    }

    /* ---- 探活：POST 兼容口（ds / qwen 通用） ---- */
    function _probePost(url, key, model, ms){
      return new Promise(function(resolve){
        var out = { ok:0, model:'', err:'', ts:_now() };
        key = (key||'').trim();
        if(!key){ out.err='没钥匙'; resolve(out); return; }
        var done = false, ctrl=null, tid=null;
        function fin(o){ if(done) return; done=true; try{ if(tid) clearTimeout(tid); }catch(e){} resolve(o); }
        try{
          ctrl = new AbortController();
          tid = setTimeout(function(){ try{ ctrl.abort(); }catch(e){} fin({ ok:0, model:'', err:'探活超时', ts:_now() }); }, ms);
          fetch(url, {
            method:'POST',
            headers:{ 'Content-Type':'application/json', 'Authorization':'Bearer '+key },
            body: JSON.stringify({ model:model, max_tokens:1, messages:[{ role:'user', content:'只回一个字：通' }] }),
            signal: ctrl.signal
          }).then(function(r){
            if(r && r.ok){ fin({ ok:1, model:model, err:'', ts:_now() }); }
            else{ fin({ ok:0, model:'', err:'HTTP '+(r&&r.status), ts:_now() }); }
          }).catch(function(e){
            fin({ ok:0, model:'', err:String((e&&e.message)||e).slice(0,60), ts:_now() });
          });
        }catch(e){
          fin({ ok:0, model:'', err:String((e&&e.message)||e).slice(0,60), ts:_now() });
        }
      });
    }
    function _probeDs(){ return _probePost('https://api.deepseek.com/v1/chat/completions', _dsKey(), 'deepseek-chat', 8000); }
    function _probeQwen(){
      var k=''; try{ k = (HX.keys && HX.keys.getQwen) ? (HX.keys.getQwen()||'') : ''; }catch(e){ k=''; }
      return _probePost('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', k, 'qwen-plus', 8000);
    }

    /* ---- 单家探活 ---- */
    function probeOne(id){
      return new Promise(function(resolve){
        try{
          if(_off()){ resolve(null); return; }
          var fn = (id==='kimi') ? _probeKimi : (id==='ds') ? _probeDs : (id==='qwen') ? _probeQwen : null;
          if(!fn){ resolve(null); return; }
          fn().then(function(out){
            try{
              var acc = _load();
              if(!acc){ acc = { ts:_now(), p:_blankP() }; }
              if(!acc.p) acc.p = _blankP();
              acc.ts = _now();
              acc.p[id] = out;
              _save(acc);
              try{ if(HX.air && HX.air._refreshBar) HX.air._refreshBar(); }catch(e){}
            }catch(e){}
            resolve(out);
          }).catch(function(e){
            var out = { ok:0, model:'', err:String((e&&e.message)||e).slice(0,60), ts:_now() };
            try{
              var acc2 = _load() || { ts:_now(), p:_blankP() };
              if(!acc2.p) acc2.p = _blankP();
              acc2.ts = _now(); acc2.p[id] = out; _save(acc2);
              try{ if(HX.air && HX.air._refreshBar) HX.air._refreshBar(); }catch(e2){}
            }catch(e2){}
            resolve(out);
          });
        }catch(e){ resolve(null); }
      });
    }

    /* ---- 三家并行探活 ---- */
    function probe(force){
      return new Promise(function(resolve){
        try{
          if(_off()){ resolve(_load()); return; }
          var acc = _load();
          if(!force && acc && acc.ts && (_now()-acc.ts) < MAX_AGE){ resolve(acc); return; }
          Promise.all([ _probeKimi(), _probeDs(), _probeQwen() ]).then(function(arr){
            var obj = { ts:_now(), p:_blankP() };
            obj.p.kimi = arr[0]||obj.p.kimi;
            obj.p.ds   = arr[1]||obj.p.ds;
            obj.p.qwen = arr[2]||obj.p.qwen;
            _save(obj);
            try{ if(HX.air && HX.air._refreshBar) HX.air._refreshBar(); }catch(e){}
            resolve(obj);
          }).catch(function(e){
            try{ if(HX.air && HX.air._refreshBar) HX.air._refreshBar(); }catch(e2){}
            resolve(_load());
          });
        }catch(e){ resolve(null); }
      });
    }

    /* ---- 读账对象 ---- */
    function st(){ try{ return _load(); }catch(e){ return null; } }
    /* ---- 账上这家活=true；没账/没这家=true（没测过当活，由 probe 补） ---- */
    function ok(id){
      try{
        var acc = _load();
        if(!acc || !acc.p || !acc.p[id]) return true;
        return acc.p[id].ok==1;
      }catch(e){ return true; }
    }
    /* ---- 活模型名；死/没账=null ---- */
    function pick(id){
      try{
        var acc = _load();
        if(!acc || !acc.p || !acc.p[id]) return null;
        var e = acc.p[id];
        if(e && e.ok==1 && e.model) return e.model;
        return null;
      }catch(e){ return null; }
    }
    /* ---- 账上标死→false；其余=true ---- */
    function gate(id){
      try{
        var acc = _load();
        if(!acc || !acc.p || !acc.p[id]) return true;
        return !(acc.p[id].ok==0);
      }catch(e){ return true; }
    }
    /* ---- 宿主上报：ok=false标死+后台静默补测；ok=true标活 ---- */
    function report(id, okFlag, err){
      try{
        if(_off()) return;
        var acc = _load();
        if(!acc){ acc = { ts:_now(), p:_blankP() }; }
        if(!acc.p) acc.p = _blankP();
        if(!acc.p[id]) acc.p[id] = { ok:0, model:'', err:'', ts:0 };
        acc.ts = _now();
        acc.p[id].ts = _now();
        if(okFlag){ acc.p[id].ok = 1; acc.p[id].err = ''; }
        else{
          acc.p[id].ok = 0;
          acc.p[id].err = String((err||'')).slice(0,80);
          try{ setTimeout(function(){ try{ probeOne(id); }catch(e){} }, 0); }catch(e){}
        }
        _save(acc);
        try{ if(HX.air && HX.air._refreshBar) HX.air._refreshBar(); }catch(e){}
      }catch(e){}
    }
    /* ---- 开门闲时巡检：过静默令闸门+账从没测过或超6小时才真测 ---- */
    function boot(){
      try{
        if(_off()) return;
        if(typeof HX._autoNetOk==='function'){ if(!HX._autoNetOk()) return; }
        var acc = _load();
        if(!acc || !acc.ts || (_now()-acc.ts) >= MAX_AGE){ probe(false); }
      }catch(e){}
    }

    return {
      probe: probe,
      probeOne: probeOne,
      st: st,
      ok: ok,
      pick: pick,
      gate: gate,
      report: report,
      boot: boot,
      _refreshBar: null /* 由 HX.ai 挂载 renderAirBar */
    };
  })();

  /* ════ 4.9 黑匣子 HX.bb（v0.24.0 新增｜2026-10-14 班③，洪老师拍板「黑匣子🔴第1位优先」，SPEC_v0.24.0_黑匣子+弹窗销号+取消静默令，DS实现+Kimi终审）
     环形300条记账：{t:时间, app:document.title, k:'err'|'act', m:文≤120字}；账本=localStorage hx_bb_log + 壳真源 hxdata_hx_blackbox.json（b64，照HX.air _readFile/_writeFile双写模式）。
     自动钩：window.onerror→err、unhandledrejection→err、document捕获阶段click点在BUTTON上→act（按钮文字≤20字，同钮500ms内去重）。
     分级上行：k=err的🔴条进账后立刻整份PUT仓根「黑匣子.txt」（格式一行一条`[时间] [k] m`）；⚪条攒着，每60秒对账一次有变才推。
     上行照pushProg先例（GET取sha→PUT，hx_bb_uplocal镜像对账不重复推）；断网补传=上行失败静默，下次记账/开门闲时再推（整份推，🔴自然在里头）。
     总开关：localStorage hx_bb_off==='1' → 模块全退休（不钩不记账不上行）。
     全模块所有公开口与内部步全 try 护栏，任何异常不许外抛炸宿主；文本一律textContent填入防注入。 */
  HX.bb = (function(){
    var LS_LOG = 'hx_bb_log';      /* 账本键：JSON数组，环形最多300条 */
    var LS_UP  = 'hx_bb_uplocal';  /* 上行镜像：内容没变不重复推 */
    var FILE_NAME = 'hxdata_hx_blackbox.json'; /* 账本壳真源 */
    var UP_FILE = '黑匣子.txt';    /* 仓根上行文件 */
    var MAX = 300;                 /* 环形上限 */
    var _booted = false;
    var _lastBtn = '';             /* 同钮去重：上次按钮文字 */
    var _lastBtnT = 0;             /* 同钮去重：上次时间 */
    var _timer = null;             /* ⚪条60秒对账定时器 */
    var _wd = null;                /* v0.28.0 案2看门狗：{txt,timer}同一时刻最多一条 */

    function _off(){ try{ return localStorage.getItem('hx_bb_off')==='1'; }catch(e){ return false; } }

    /* b64 编解码——照 HX.air 同款 */
    var _enc = (HX.gh && HX.gh.b64enc) ? HX.gh.b64enc : function(s){ return btoa(unescape(encodeURIComponent(String(s)))); };
    var _dec = (HX.gh && HX.gh.b64dec) ? HX.gh.b64dec : function(s){ try{ return decodeURIComponent(escape(atob(String(s).replace(/\s+/g,'')))); }catch(e2){ return ''; } };

    /* ---- 读壳文件（账本真源，照HX.air _readFile同款） ---- */
    function _readFile(){
      try{
        if(typeof LearnShell==='undefined' || !LearnShell || !LearnShell.readFile) return null;
        var b = LearnShell.readFile(FILE_NAME);
        if(!b) return null;
        var txt = _dec(b);
        if(!txt) return null;
        var obj = JSON.parse(txt);
        return (obj && typeof obj==='object') ? obj : null;
      }catch(e){ return null; }
    }
    /* ---- 写壳文件（静默，照HX.air _writeFile同款） ---- */
    function _writeFile(obj){
      try{
        if(typeof LearnShell==='undefined' || !LearnShell || !LearnShell.writeFile) return;
        LearnShell.writeFile(FILE_NAME, _enc(JSON.stringify(obj)));
      }catch(e){}
    }
    /* v0.24.1 壳侧车读：照_readFile逐行同款，仅文件名换成侧车名 */
    function _readSide(){
      try{
        if(typeof LearnShell==='undefined' || !LearnShell || !LearnShell.readFile) return null;
        var b = LearnShell.readFile('hxdata_hx_blackbox_shell.json');
        if(!b) return null;
        var txt = _dec(b);
        if(!txt) return null;
        var obj = JSON.parse(txt);
        return (obj && typeof obj==='object') ? obj : null;
      }catch(e){ return null; }
    }
    /* v0.24.1 壳侧车写：照_writeFile逐行同款，仅文件名换成侧车名 */
    function _writeSide(obj){
      try{
        if(typeof LearnShell==='undefined' || !LearnShell || !LearnShell.writeFile) return;
        LearnShell.writeFile('hxdata_hx_blackbox_shell.json', _enc(JSON.stringify(obj)));
      }catch(e){}
    }
    /* v0.24.1 收编壳侧车：非空数组并入主账按t升序裁300、双写、侧车清成[] */
    function collectSide(){
      try{
        if(_off()) return;
        var side=_readSide();
        if(!side || !side.length) return;
        /* v0.29.0 ②哑火对照：壳侧车有开门而主账最新记录老于10分钟前=黑匣子疑似没跑 */
        try{
          var tSide=0;
          for(var si=0;si<side.length;si++){ var sm=String((side[si]||{}).m||''); if(sm.indexOf('开门')===0){ var st_=Number((side[si]||{}).t)||0; if(st_>tSide) tSide=st_; } }
          var main0=loadLog(); var tMain=0;
          for(var mi=0;mi<main0.length;mi++){ var mt=Number((main0[mi]||{}).t)||0; if(mt>tMain) tMain=mt; }
          if(tSide>0 && (tSide-tMain)>10*60000){ _silentLog('err','黑匣子疑似哑火：壳有开门主账没动'); }
        }catch(e){}
        var arr=loadLog().concat(side);
        arr.sort(function(a,b){return (a.t||0)-(b.t||0);});
        while(arr.length>300) arr.shift();
        saveLog(arr);
        _writeSide([]);
      }catch(e){}
    }

    /* ---- 读账本：localStorage 空 → 读壳真源回填（照HX.air _load同款） ---- */
    function loadLog(){
      try{
        var s = '';
        try{ s = localStorage.getItem(LS_LOG)||''; }catch(e){}
        if(s){
          try{ var o = JSON.parse(s); if(o && o.length!==undefined) return o; }catch(e2){}
        }
        var fo = _readFile();
        if(fo && fo.length!==undefined){ try{ localStorage.setItem(LS_LOG, JSON.stringify(fo)); }catch(e3){} return fo; }
        return [];
      }catch(e){ return []; }
    }
    /* ---- 写账本：双写 ---- */
    function saveLog(arr){
      try{ try{ localStorage.setItem(LS_LOG, JSON.stringify(arr)); }catch(e){} _writeFile(arr); }catch(e){}
    }

    /* ---- toast：照chkToast同款（textContent填入+hxToastHold不自动消失）【Kimi终审修：sjToast是HX.sj私有，bb够不着，自带】 ---- */
    function bbToast(m, ms){
      try{
        if(!document.body) return;
        var t = (function(){ try{ return document.getElementById('hxBbToast'); }catch(e){ return null; } })();
        if(!t){ t = document.createElement('div'); t.id='hxBbToast'; document.body.appendChild(t); }
        t.style.cssText = 'position:fixed;left:50%;bottom:200px;transform:translateX(-50%);background:rgba(74,64,48,.92);color:#fff;padding:10px 20px;border-radius:20px;font-size:16px;z-index:99998;display:none';
        t.innerHTML=''; t.appendChild(document.createTextNode(String(m==null?'':m))); t.style.display='block'; clearTimeout(t._t);
        var off=false; try{ off=(localStorage.getItem('hx_toast_sticky_off')==='1'); }catch(e){ off=false; }
        if(off){ t._t=setTimeout(function(){ t.style.display='none'; },(ms||2200)); return; }
        if(typeof hxToastHold==='function'){ hxToastHold(t, function(){ t.style.display='none'; }); } else { t._t=setTimeout(function(){ t.style.display='none'; },(ms||3000)); }
      }catch(e){}
    }

    /* ---- 时间戳格式化：YYYY-MM-DD HH:MM:SS ---- */
    function _ts(t){
      try{
        var d = new Date(t||Date.now());
        function p(n){ return (n<10?'0':'')+n; }
        return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+' '+p(d.getHours())+':'+p(d.getMinutes())+':'+p(d.getSeconds());
      }catch(e){ return ''; }
    }

    /* ---- 记账：k='err'|'act'，m文≤120字；环形300条；err立刻推，act攒着 ---- */
    function log(k, m){
      try{
        if(_off()) return;
        var arr = loadLog();
        var app = ''; try{ app = String(document.title||''); }catch(e){ app=''; }
        var mm = String(m==null?'':m); if(mm.length>300) mm = mm.slice(0,300); /* v0.28.0 案5：截断放宽300 */
        arr.push({ t: Date.now(), app: app, k: String(k||''), m: mm });
        while(arr.length > MAX){ arr.shift(); } /* 环形：超300条切头 */
        saveLog(arr);
        /* v0.28.0 案2：任何非本钮act的新记录=有动静，看门狗解除 */
        try{ if(_wd && !(String(k)==='act' && String(mm).indexOf(_wd.txt)===0)){ clearTimeout(_wd.timer); _wd=null; } }catch(e){}
        try{ if(HX.chk && typeof HX.chk.bbHit==='function'){ HX.chk.bbHit(String(k), mm); } }catch(e){} /* v0.29.0 ③被动观察法：每记一条账通报chk命中watch */
        if(String(k)==='err'){ try{ flush(false); }catch(e){} } /* 🔴条立刻整份推 */
      }catch(e){}
    }

    /* v0.28.0 案1办完报账：ok===true记job，败记err（err自动立刻上行照老例） */
    function job(name, ok, why){
      try{
        if(ok===true){ log('job', '成:'+String(name||'')); }
        else{ log('err', '败:'+String(name||'')+(why?(':'+String(why)):'')); }
      }catch(e){}
    }
    /* v0.30.0 刀A1 双击🆘回环体检：写上去读回来码对=通；写不成/读不回/码不对=哪腿哪环断一句话说清。双腿各自独立跑，全settle后汇总。全程try护栏绝不外抛 */
    function loopback(){
      try{
        if(_off()){ bbToast('黑匣子已关（hx_bb_off），回环不跑'); return; }
        var payload = '回环#'+_ts(Date.now())+'#'+Math.floor(Math.random()*900000+100000);
        var G='', D='';
        var pG = new Promise(function(res){
          try{
            if(!(HX.gh && HX.gh.ready && HX.gh.ready())){ G='没钥匙'; res(); return; }
            HX.gh.putFile(null,'黑匣子回环.txt',payload,'回环体检').then(function(){
              HX.gh.getFile(null,'黑匣子回环.txt').then(function(txt){
                try{ G = (String(txt)===payload) ? '通' : '码不对'; }catch(e){ G='码不对'; }
                res();
              }, function(e){ G='读断:'+((e&&e.message)||e); res(); });
            }, function(e){ G='写断:'+((e&&e.message)||e); res(); });
          }catch(e){ G='断:'+((e&&e.message)||e); res(); }
        });
        var pD = new Promise(function(res){
          var _clean=function(){ try{ if(typeof LearnShell!=='undefined' && LearnShell && LearnShell.deleteFile){ try{ LearnShell.deleteFile('黑匣子回环.txt'); }catch(e){} try{ LearnShell.deleteFile('hx_lb_read.tmp'); }catch(e){} } }catch(e){} };
          try{
            if(!(HX.dav && HX.dav.ok && HX.dav.ok() && HX.dav.asyncOk && HX.dav.asyncOk())){ D='没钥匙或老壳'; res(); return; }
            try{ LearnShell.writeFile('黑匣子回环.txt', _enc(payload)); }catch(e){}
            HX.dav.upFile('黑匣子回环.txt','/学习套装备份/').then(function(r){
              if(r===null || (typeof r==='string' && r.indexOf('err:')===0)){ D='写断'+(r?(':'+r):''); _clean(); res(); return; }
              HX.dav.downFile('/学习套装备份/黑匣子回环.txt','hx_lb_read.tmp').then(function(txt){
                try{
                  if(txt===null || txt===undefined){ D='读断'; }
                  else if(String(txt)===payload){ D='通'; }
                  else{ D='码不对'; }
                }catch(e){ D='读断'; }
                _clean(); res();
              });
            });
          }catch(e){ D='断:'+((e&&e.message)||e); _clean(); res(); }
        });
        Promise.all([pG, pD]).then(function(){
          try{ bbToast('回环体检：GitHub '+G+' ｜ 坚果云 '+D); }catch(e){}
          try{ job('回环体检', (G==='通'&&D==='通'), 'G:'+G+' D:'+D); }catch(e){}
        });
      }catch(e){}
    }

    /* v0.28.0 案3哨兵：只进账本不触发上行（防flush递归），随下次上行自然出账 */
    function _silentLog(k, m){
      try{
        if(_off()) return;
        var arr = loadLog();
        var app = ''; try{ app = String(document.title||''); }catch(e){ app=''; }
        var mm = String(m==null?'':m); if(mm.length>300) mm = mm.slice(0,300);
        arr.push({ t: Date.now(), app: app, k: String(k||''), m: mm });
        while(arr.length > MAX){ arr.shift(); }
        saveLog(arr);
      }catch(e){}
    }
    /* ---- 整份上行（照pushProg先例：GET取sha→PUT；hx_bb_uplocal镜像对账不重复推） ---- */
    function flush(manual){
      try{
        if(_off()) return;
        if(!window.fetch) return;
        if(manual !== true){ if(typeof HX._autoNetOk==='function'){ if(!HX._autoNetOk()) return; } } /* 闲时闸门；manual强推放行 */
        var g=null; try{ g=HX.keys.gh(); }catch(e){ g=null; }
        if(!g){ try{ _silentLog('err','黑匣子没传上去：没钥匙'); }catch(e){} /* v0.28.0 案3 */ if(manual===true){ try{ if(typeof sjToast==='function') bbToast('没传上去：没钥匙/没网，下回开门自动补'); }catch(e){} } return; }
        var arr = loadLog();
        var lines = [];
        for(var i=0;i<arr.length;i++){
          var it = arr[i]||{};
          lines.push('['+_ts(it.t)+'] ['+String(it.k||'')+'] '+String(it.m||''));
        }
        var body = lines.join('\n');
        var prev=''; try{ prev=localStorage.getItem(LS_UP)||''; }catch(e){ prev=''; }
        if(body===prev){ if(manual===true){ try{ if(typeof sjToast==='function') bbToast('黑匣子已传上去，接班AI会看到'); }catch(e){} } return; } /* 内容没变不重复推 */
        var api='https://api.github.com/repos/'+encodeURIComponent(g.u)+'/'+encodeURIComponent(g.r)+'/contents/'+encodeURIComponent(UP_FILE);
        var H={'Authorization':'token '+g.t,'Accept':'application/vnd.github+json'};
        fetch(api,{headers:H}).then(function(resp){ if(resp.status===404) return {sha:null}; if(!resp.ok) throw 0; return resp.json(); }).then(function(j){
          var put={message:'黑匣子上行', content:_enc(body)};
          if(j&&j.sha) put.sha=j.sha;
          return fetch(api,{method:'PUT',headers:H,body:JSON.stringify(put)});
        }).then(function(resp){ if(!resp.ok) throw 0; return resp.json(); }).then(function(){
          try{ localStorage.setItem(LS_UP, body); }catch(e){}
          try{ if(localStorage.getItem('hx_bb_lastfail')==='1'){ localStorage.removeItem('hx_bb_lastfail'); log('note','上回说没传上去的黑匣子，其实传上了，账没丢'); } }catch(e){} /* v0.37.0 刀2：补传成功补人话 */
          if(manual===true){ try{ if(typeof sjToast==='function') bbToast('黑匣子已传上去，接班AI会看到'); }catch(e){} }
        }).catch(function(){
          try{ _silentLog('err','黑匣子上行失败：下回开门补'); }catch(e){} /* v0.28.0 案3 */
          try{ localStorage.setItem('hx_bb_lastfail','1'); }catch(e){} /* v0.37.0 刀2：立失败标记，下回传上补话 */
          if(manual===true){ try{ if(typeof sjToast==='function') bbToast('没传上去：没钥匙/没网，下回开门自动补'); }catch(e){} }
        }); /* 断网补传：失败静默，下次记账/开门闲时再推 */
      }catch(e){
        if(manual===true){ try{ if(typeof sjToast==='function') bbToast('没传上去：没钥匙/没网，下回开门自动补'); }catch(e2){} }
      }
    }

    /* ---- 自动钩：window.onerror / unhandledrejection / click按钮 ---- */
    function hook(){
      try{
        if(_off()) return;
        window.addEventListener('error', function(ev){
          try{
            var m = '';
            if(ev && ev.message){ m = String(ev.message); }
            else if(ev && ev.error && ev.error.message){ m = String(ev.error.message); }
            if(ev && ev.filename){ m += ' @'+String(ev.filename)+':'+String(ev.lineno||''); }
            log('err', m);
          }catch(e){}
        });
        window.addEventListener('unhandledrejection', function(ev){
          try{
            var m = '';
            if(ev && ev.reason){ m = (ev.reason && ev.reason.message) ? String(ev.reason.message) : String(ev.reason); }
            log('err', m);
          }catch(e){}
        });
        document.addEventListener('click', function(ev){
          try{
            var el = ev && ev.target;
            if(!el) return;
            var btn = null;
            if(el.tagName === 'BUTTON'){ btn = el; }
            else if(el.closest){ btn = el.closest('BUTTON'); }
            if(!btn) return;
            var txt = String(btn.textContent||''); if(txt.length>20) txt = txt.slice(0,20);
            var now = Date.now();
            if(txt === _lastBtn && (now - _lastBtnT) < 500) return; /* 同钮500ms内去重 */
            _lastBtn = txt; _lastBtnT = now;
            log('act', txt);
            /* v0.28.0 案2看门狗：白名单三钮点后12秒没动静记err */
            try{
              if(/检查新版本|记下|传黑匣子/.test(txt)){
                if(_wd){ clearTimeout(_wd.timer); _wd=null; }
                _wd = { txt: txt, timer: setTimeout(function(){ try{ var t=_wd; _wd=null; if(t) log('err','点了「'+t.txt+'」30秒没动静'); }catch(e){} }, 30000) }; /* v0.37.0 刀1：12秒太急性子，网慢误报（10-18真机虚惊），放宽30秒 */
              }
            }catch(e){}
          }catch(e){}
        }, true); /* 捕获阶段 */
      }catch(e){}
    }

    /* ---- ⚪条60秒对账：有变才推 ---- */
    function startTimer(){
      try{
        if(_timer) return;
        _timer = setInterval(function(){ try{ if(_off()){ stopTimer(); return; } flush(false); }catch(e){} }, 60000);
      }catch(e){}
    }
    function stopTimer(){ try{ if(_timer){ clearInterval(_timer); _timer=null; } }catch(e){} }

    /* ---- 公开口 ---- */
    function init(){
      try{
        if(_booted) return; _booted=true;
        if(_off()) return; /* 总退休：不钩不记账不上行 */
        var boot=function(){
          try{
            hook();
            startTimer();
            try{ log('hb','黑匣子在线 v'+String(HX_COMMON_VERSION||'')); }catch(e){} /* v0.29.0 ①开门心跳：云侧看最后hb时间知黑匣子在线 */
            try{ collectSide(); }catch(e){} /* v0.24.1 收编壳侧车 */
            /* 开门补推：hx_bb_uplocal≠当前内容且闸门放行则补推一次 */
            var arr = loadLog();
            var lines = [];
            for(var i=0;i<arr.length;i++){ var it=arr[i]||{}; lines.push('['+_ts(it.t)+'] ['+String(it.k||'')+'] '+String(it.m||'')); }
            var body = lines.join('\n');
            var prev=''; try{ prev=localStorage.getItem(LS_UP)||''; }catch(e){ prev=''; }
            if(body && body!==prev){ if(typeof HX._autoNetOk==='function' && HX._autoNetOk()) flush(false); }
          }catch(e){}
        };
        if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', boot); } else { boot(); } /* 照chk init先例，挂HX即活 */
      }catch(e){}
    }

    /* 自带boot：挂HX即活 */
    try{ init(); }catch(e){}

    return { init:init, log:log, flush:flush, job:job, /* v0.28.0 */ loopback:loopback, /* v0.30.0 刀A1 */ collectSide:collectSide, tail:function(n){ try{ var a=loadLog(); return a.slice(Math.max(0,a.length-(n||10))); }catch(e){ return []; } } };
  })();

  /* ════ 4.95 验收牌 HX.chk（v0.20.0 新增｜2026-10-12 班⑤ Kimi定稿SPEC，洪老师拍板「做窄条面板，其他的按你的意思，开工」，SPEC_v0.20.0_验收牌）
     sj面板✅验收钮→屏幕底窄条（圆点串+当前步骤一行字+▲，只占一条缝不挡底下操作）→点窄条展开整屏清单（任务→步骤两级，一行一步大白话，做成一行绿一行）。
     清单真源=仓根「验收清单.json」（hx_chk_list缓存兜底）；进度本机记账 hx_chk_prog + 壳真源 hxdata_hx_chk.json（b64，照HX.air _readFile/_writeFile双写模式）；
     标绿后闲时（过_autoNetOk）整份进度PUT仓根「验收进度.json」（hx_chk_uplocal镜像对账，内容没变不重复推，照sjUpload先例）；
     总回退：localStorage hx_chk_off==='1' → 模块全退休（钮照常点但toast「验收牌已关（hx_chk_off）」，窄条/整屏页绝不出现，不联网）。
     全模块所有公开口与内部步全 try 护栏，任何异常不许外抛炸宿主；文本一律textContent填入防注入（照sjShowBrowse先例）。 */
  HX.chk = (function(){
    var LS_LIST = 'hx_chk_list';   /* 清单缓存键 */
    var LS_PROG = 'hx_chk_prog';   /* 进度账键：{"t1":{"s1":1}}，只有绿的才记值为1 */
    var LS_UP   = 'hx_chk_uplocal';/* 上行镜像：内容没变不重复推 */
    var FILE_NAME = 'hxdata_hx_chk.json'; /* 进度壳真源 */
    var LIST_URL = 'https://raw.githubusercontent.com/hongxiaotao177/xuexi-backup/main/验收清单.json'; /* 照HX.keys warm腿②先例 */
    var PROG_FILE = '验收进度.json'; /* 仓根进度文件 */
    var REPORT_FILE = '验收单.json'; /* v0.25.0 刀B：自报验收单仓根文件 */
    var LS_REPORT_UP = 'hx_chk_report_up'; /* v0.25.0 刀B：验收单上行镜像 */
    var _list = null;   /* 当前清单对象 {ver,tasks:[...]} */
    var _openT = {};    /* 整屏页里展开的任务id */
    var _timer = null;  /* 窄条显示期间5秒侦测定时器 */
    var _booted = false;

    function _off(){ try{ return localStorage.getItem('hx_chk_off')==='1'; }catch(e){ return false; } }
    function _wizOff(){ try{ return localStorage.getItem('hx_chk_wiz_off')==='1'; }catch(e){ return false; } } /* v0.25.0 刀A：向导总开关 */
    function $(id){ return document.getElementById(id); }

    /* b64 编解码——照 HX.air 同款 */
    var _enc = (HX.gh && HX.gh.b64enc) ? HX.gh.b64enc : function(s){ return btoa(unescape(encodeURIComponent(String(s)))); };
    var _dec = (HX.gh && HX.gh.b64dec) ? HX.gh.b64dec : function(s){ try{ return decodeURIComponent(escape(atob(String(s).replace(/\s+/g,'')))); }catch(e2){ return ''; } };

    /* ---- 读壳文件（进度真源，照HX.air _readFile同款） ---- */
    function _readFile(){
      try{
        if(typeof LearnShell==='undefined' || !LearnShell || !LearnShell.readFile) return null;
        var b = LearnShell.readFile(FILE_NAME);
        if(!b) return null;
        var txt = _dec(b);
        if(!txt) return null;
        var obj = JSON.parse(txt);
        return (obj && typeof obj==='object') ? obj : null;
      }catch(e){ return null; }
    }
    /* ---- 写壳文件（静默，照HX.air _writeFile同款） ---- */
    function _writeFile(obj){
      try{
        if(typeof LearnShell==='undefined' || !LearnShell || !LearnShell.writeFile) return;
        LearnShell.writeFile(FILE_NAME, _enc(JSON.stringify(obj)));
      }catch(e){}
    }

    /* ---- 读进度账：localStorage 空 → 读壳真源回填（照HX.air _load同款） ---- */
    function loadProg(){
      try{
        var s = '';
        try{ s = localStorage.getItem(LS_PROG)||''; }catch(e){}
        if(s){
          try{ var o = JSON.parse(s); if(o && typeof o==='object') return o; }catch(e2){}
        }
        var fo = _readFile();
        if(fo){ try{ localStorage.setItem(LS_PROG, JSON.stringify(fo)); }catch(e3){} return fo; }
        return {};
      }catch(e){ return {}; }
    }
    /* ---- 写进度账：双写 ---- */
    function saveProg(p){
      try{ try{ localStorage.setItem(LS_PROG, JSON.stringify(p)); }catch(e){} _writeFile(p); }catch(e){}
    }

    /* ---- toast：照sjToast同款实现（textContent填入+hxToastHold不自动消失） ---- */
    function chkToast(m, ms){
      try{
        if(!document.body) return;
        var t = $('hxChkToast');
        if(!t){ t = document.createElement('div'); t.id='hxChkToast'; document.body.appendChild(t); }
        t.style.cssText = 'position:fixed;left:50%;bottom:160px;transform:translateX(-50%);background:rgba(74,64,48,.92);color:#fff;padding:10px 20px;border-radius:20px;font-size:16px;z-index:99996;display:none';
        t.innerHTML=''; t.appendChild(document.createTextNode(String(m==null?'':m))); t.style.display='block'; clearTimeout(t._t);
        var off=false; try{ off=(localStorage.getItem('hx_toast_sticky_off')==='1'); }catch(e){ off=false; }
        if(off){ t._t=setTimeout(function(){ t.style.display='none'; },(ms||2200)); return; }
        hxToastHold(t, function(){ t.style.display='none'; });
      }catch(e){}
    }

    /* ---- 清单读写 ---- */
    function cacheList(obj){ try{ localStorage.setItem(LS_LIST, JSON.stringify(obj)); }catch(e){} }
    function readCacheList(){
      try{
        var s=''; try{ s=localStorage.getItem(LS_LIST)||''; }catch(e){}
        if(!s) return null;
        var o=JSON.parse(s);
        return (o && o.tasks && o.tasks.length!==undefined) ? o : null;
      }catch(e){ return null; }
    }
    /* ver对账清旧进度：进度账里不在新清单的taskId整个删掉（旧版验收点自动作废，不缠人） */
    function reconcile(){
      try{
        if(!_list || !_list.tasks) return;
        var keep={}, i;
        for(i=0;i<_list.tasks.length;i++){ keep[String(_list.tasks[i].id)]=1; }
        var p=loadProg(), np={}, hit=false;
        for(var tid in p){ if(keep[tid]) np[tid]=p[tid]; else hit=true; }
        if(hit) saveProg(np);
        try{ localStorage.removeItem('hx_chk_ask'); }catch(e){} /* v0.24.0 ver变问账清：旧问账作废 */
        try{ localStorage.removeItem('hx_chk_ai_asked'); }catch(e){} /* v0.40.0：ver变AI问账清 */
        /* v0.25.0 刀A：ver变（清单换版）hx_chk_wiz_n清零重新计 */
        try{
          var vNow = String((_list && _list.ver)||'');
          var vOld = '';
          try{ vOld = localStorage.getItem('hx_chk_wiz_ver')||''; }catch(e){}
          if(vNow !== vOld){
            try{ localStorage.removeItem('hx_chk_wiz_n'); }catch(e){}
            try{ localStorage.setItem('hx_chk_wiz_ver', vNow); }catch(e){}
          }
        }catch(e){}
      }catch(e){}
    }

    /* ---- 进度判断 ---- */
    function isSim(t){ try{ return !!(t && String(t.lane||'')==='sim'); }catch(e){ return false; } } /* v0.23.0：仿真档判定 */
    function isCloud(t){ try{ return !!(t && String(t.lane||'')==='cloud'); }catch(e){ return false; } } /* v0.25.0 刀C：A档云侧，向导跳过不问 */
    function isWatch(t){ try{ return !!(t && String(t.lane||'')==='watch'); }catch(e){ return false; } } /* v0.25.0 刀C：长期观察哨，不占未验数 */
    function stepGreen(prog, tid, sid){ try{ return !!(prog && prog[tid] && prog[tid][sid]===1); }catch(e){ return false; } }
    function stepHeld(prog, tid, sid){ try{ return !!(prog && prog[tid] && prog[tid][sid]===2); }catch(e){ return false; } } /* v0.25.0 刀A：挂号=2，不算绿不算卡 */
    function taskDone(prog, task){
      try{
        if(!task.steps || !task.steps.length) return false;
        for(var i=0;i<task.steps.length;i++){ if(!stepGreen(prog, task.id, task.steps[i].id)) return false; }
        return true;
      }catch(e){ return false; }
    }
    function allDone(prog){
      try{
        if(!_list || !_list.tasks || !_list.tasks.length) return false;
        for(var i=0;i<_list.tasks.length;i++){ if(isSim(_list.tasks[i])) continue; if(isCloud(_list.tasks[i])) continue; if(isWatch(_list.tasks[i])) continue; if(!taskDone(prog, _list.tasks[i])) return false; } /* v0.23.0：仿真档不参与；v0.25.0 刀C：云侧/观察哨不参与 */
        return true;
      }catch(e){ return false; }
    }
    /* 当前步骤=第一个未绿任务的第一个未绿步 */
    function curStep(prog){
      try{
        if(!_list || !_list.tasks) return null;
        for(var i=0;i<_list.tasks.length;i++){
          var t=_list.tasks[i];
          if(isSim(t)||isCloud(t)||isWatch(t)||taskDone(prog,t)) continue; /* v0.23.0：仿真档跳过；v0.25.0 刀C：云侧/观察哨跳过 */
          for(var j=0;j<(t.steps||[]).length;j++){
            if(!stepGreen(prog, t.id, t.steps[j].id)) return { task:t, step:t.steps[j] };
          }
        }
        return null;
      }catch(e){ return null; }
    }

    /* ---- 模块内自写readFlow（照sjReadFlow逻辑：先读「想法流水.txt」再兜底「速记流水.txt」，b64解码；不许调HX.sj内部函数，照抄） ---- */
    function chkReadFlow(){
      try{
        if(typeof LearnShell==='undefined' || !LearnShell || !LearnShell.readFile) return '';
        var b=LearnShell.readFile('想法流水.txt');
        if(b){ var t1=_dec(b); if(t1) return t1; }
        var b2=LearnShell.readFile('速记流水.txt');
        if(b2){ var t2=_dec(b2); if(t2) return t2; }
        return '';
      }catch(e){ return ''; }
    }
    /* ---- 自动侦测器（v1内置三种，清单auto字段引用；冒号后为参数） ---- */
    var CHK_AUTO = {
      'sj_uploaded': function(){ /* 想法流水非空且 hx_sj_uplocal 镜像与流水一致=上行完成 */
        try{
          var txt=chkReadFlow(); if(!txt) return false;
          var up=''; try{ up=localStorage.getItem('hx_sj_uplocal')||''; }catch(e){ up=''; }
          return !!up && up===txt;
        }catch(e){ return false; }
      },
      'file_exists': function(arg){ /* LearnShell.readFile(arg) 读得到内容 */
        try{
          if(!arg) return false;
          if(typeof LearnShell==='undefined' || !LearnShell || !LearnShell.readFile) return false;
          return !!LearnShell.readFile(String(arg));
        }catch(e){ return false; }
      },
      'key_set': function(arg){ /* localStorage[arg] 非空 */
        try{
          if(!arg) return false;
          return !!(localStorage.getItem(String(arg))||'');
        }catch(e){ return false; }
      },
      'key_eq': function(arg){ /* v0.39.0：localStorage[k]===v 严格相等（版本对账用），参数形「键=值」 */
        try{
          if(!arg) return false;
          var s=String(arg), ci=s.indexOf('=');
          if(ci<0) return false;
          var k=s.slice(0,ci), v=s.slice(ci+1);
          return (localStorage.getItem(k)||'')===v ? !!(localStorage.getItem(k)||'') : false;
        }catch(e){ return false; }
      }
    };
    function autoHit(autoStr){
      try{
        if(!autoStr) return false;
        var s=String(autoStr), ci=s.indexOf(':');
        var name=(ci>=0)?s.slice(0,ci):s, arg=(ci>=0)?s.slice(ci+1):'';
        var fn=CHK_AUTO[name];
        return fn ? !!fn(arg) : false;
      }catch(e){ return false; }
    }
    /* 跑一遍当前未绿步的侦测器；侦中=标绿 */
    function detect(){
      try{
        if(_off()) return;
        if(!_list || !_list.tasks) return;
        var prog=loadProg(), changed=false;
        for(var i=0;i<_list.tasks.length;i++){
          var t=_list.tasks[i];
          if(isSim(t)) continue; /* v0.23.0：仿真档不侦测 */
          if(isCloud(t)||isWatch(t)) continue; /* v0.25.0 刀C：云侧/观察哨不侦测 */
          for(var j=0;j<(t.steps||[]).length;j++){
            var st=t.steps[j];
            if(stepGreen(prog,t.id,st.id)) continue;
            if(st.watch){ _watchTick(t, st); continue; } /* v0.29.0 ③：watch步走被动观察，不进askConfirm不弹窗；watch优先于auto */
            if(st.lane==='auto' && !_autoOff()){ /* v0.39.0 机核档：侦测命中直接销不弹窗 */
              if(st.auto && autoHit(st.auto)){ _autoGreen(t, st); }
              else if(!st.auto){ _autoNoteOnce(t, st); } /* 防呆：机核档没配侦测器=永不销，记note */
              continue;
            }
            if(st.lane==='ai' && !_aiOff()){ /* v0.40.0 AI质检档：AI+快照双过才销 */
              _aiCheck(t, st);
              continue;
            }
            if(st.auto && autoHit(st.auto)){ askConfirm(t, st); } /* v0.24.0 弹窗销号：侦中不再直接变绿，弹确认条，点✓才markGreen */
          }
        }
        if(changed){ refreshUI(); }
      }catch(e){}
    }

    /* ---- v0.24.0 弹窗销号：侦中弹底部确认条，点✓才markGreen；防打扰=冷却30分钟/问满3次封口/一次只问一条 ---- */
    var _asking = false; /* 一次只问一条闸 */
    var _askQueue = [];  /* 在问时新命中排队 */
    function _askLoad(){
      try{
        var s=''; try{ s=localStorage.getItem('hx_chk_ask')||''; }catch(e){}
        if(!s) return {};
        var o=JSON.parse(s);
        return (o && typeof o==='object') ? o : {};
      }catch(e){ return {}; }
    }
    function _askSave(o){ try{ localStorage.setItem('hx_chk_ask', JSON.stringify(o)); }catch(e){} }
    function askConfirm(task, step){
      try{
        if(_off()) return;
        if(!task || !step) return;
        var key = String(task.id)+'_'+String(step.id);
        var ask = _askLoad();
        var rec = ask[key] || {n:0, c:0};
        if(rec.n >= 3) return; /* 同一步问满3次本期清单不再问 */
        if(rec.c > Date.now()) return; /* 冷却中 */
        if(_asking){ _askQueue.push({task:task, step:step}); return; } /* 一次只问一条，新命中排队 */
        _asking = true;
        _showAsk(task, step, key);
      }catch(e){ _asking = false; }
    }
    function _showAsk(task, step, key){
      try{
        if(!document.body){ _asking=false; return; }
        var old = $('hxChkAsk'); if(old && old.parentNode) old.parentNode.removeChild(old);
        var bar = document.createElement('div'); bar.id='hxChkAsk';
        bar.style.cssText='position:fixed;left:50%;bottom:40px;transform:translateX(-50%);z-index:99997;background:#fffdf8;border:1px solid #e5ddd0;border-radius:12px;padding:12px 16px;box-shadow:0 4px 16px rgba(74,64,48,.18);max-width:92%;box-sizing:border-box';
        var txt = document.createElement('div');
        txt.style.cssText='font-size:15px;color:#4a4238;line-height:1.5;margin-bottom:10px;white-space:pre-wrap;word-break:break-all';
        var stxt = String(step.text||''); if(stxt.length>24) stxt = stxt.slice(0,24)+'…';
        txt.textContent = '这步看着是做好了：'+String(task.title||'')+' · '+stxt;
        var btns = document.createElement('div'); btns.style.cssText='display:flex;gap:10px;justify-content:flex-end';
        var by = document.createElement('button'); by.type='button'; by.textContent='✓是好了';
        by.style.cssText='background:#7a9e7e;color:#fff;font-size:14px;padding:6px 14px;border:none;border-radius:8px;cursor:pointer';
        by.addEventListener('click', function(){ try{
          markGreen(task.id, step.id);
          var a=_askLoad(); delete a[key]; _askSave(a); /* 清该条问账 */
          _closeAsk(); refreshUI();
          _nextAsk();
        }catch(e){ _closeAsk(); _nextAsk(); } });
        var bn = document.createElement('button'); bn.type='button'; bn.textContent='还没';
        bn.style.cssText='background:#efe9df;color:#6b6257;font-size:14px;padding:6px 14px;border:none;border-radius:8px;cursor:pointer';
        bn.addEventListener('click', function(){ try{
          var a=_askLoad(); var r=a[key]||{n:0,c:0};
          r.n = (r.n||0)+1; r.c = Date.now()+30*60000; /* 冷却30分钟 */
          a[key]=r; _askSave(a);
          _closeAsk();
          _nextAsk();
        }catch(e){ _closeAsk(); _nextAsk(); } });
        var bx2 = document.createElement('button'); bx2.type='button'; bx2.textContent='✕先别问'; /* v0.24.2 刀5（洪老师10-14真机报「弹窗跳出来关不上」）：第三钮=关掉本条+冷却30分钟但不累计3次封口 */
        bx2.style.cssText='background:#efe9df;color:#6b6257;font-size:14px;padding:6px 14px;border:none;border-radius:8px;cursor:pointer';
        bx2.addEventListener('click', function(){ try{
          var a=_askLoad(); var r=a[key]||{n:0,c:0};
          a[key]={n:r.n, c:Date.now()+30*60000}; /* n不+1只冷却 */
          _askSave(a);
          _closeAsk();
          _nextAsk();
        }catch(e){ _closeAsk(); _nextAsk(); } });
        btns.appendChild(by); btns.appendChild(bn); btns.appendChild(bx2);
        bar.appendChild(txt); bar.appendChild(btns);
        document.body.appendChild(bar);
      }catch(e){ _asking=false; }
    }
    function _closeAsk(){
      try{ var b=$('hxChkAsk'); if(b && b.parentNode) b.parentNode.removeChild(b); }catch(e){}
      _asking = false;
    }
    function _nextAsk(){
      try{
        while(_askQueue.length){
          var nx = _askQueue.shift();
          var nk = String(nx.task.id)+'_'+String(nx.step.id);
          var na=_askLoad(); var nrec=na[nk];
          if(nrec && nrec.c>Date.now()){ continue; } /* v0.24.2 刀5补丁（终审逮排队重复弹=「关不上」病根之一）：已冷却的排队旧条丢弃 */
          try{ if(stepGreen(loadProg(), nx.task.id, nx.step.id)){ continue; } }catch(e){} /* 已点绿的排队旧条丢弃 */
          _asking = true;
          _showAsk(nx.task, nx.step, nk);
          return;
        }
      }catch(e){ _asking=false; }
    }

    /* ---- 标绿：写进度账（localStorage+壳真源）→刷UI→顺手推云仓 ---- */
    function markGreen(tid, sid){
      try{
        var p=loadProg();
        if(!p[tid]) p[tid]={};
        p[tid][sid]=1;
        saveProg(p);
        try{ pushProg(); }catch(e){}
        try{ pushReport(); }catch(e){} /* v0.25.0 刀B：进度有变化→闲时推验收单 */
      }catch(e){}
    }
    /* ---- v0.25.0 刀A：挂号（✗不行）——写进度账值=2，不算绿不算卡，进下一步 ---- */
    function markHeld(tid, sid){
      try{
        var p=loadProg();
        if(!p[tid]) p[tid]={};
        p[tid][sid]=2;
        saveProg(p);
        try{ pushReport(); }catch(e){} /* v0.25.0 刀B：挂号也推验收单；Kimi终审翻案：DS误写catch(e{})语法错已修 */
      }catch(e){}
    }

    /* ---- v0.29.0 ③被动观察法：命中账+bbHit+_watchTick（洪老师拍板：用了没意见=自动销，不弹窗不问人） ---- */
    function _watchLoad(){
      try{
        var s=''; try{ s=localStorage.getItem('hx_chk_watch')||''; }catch(e){}
        if(!s) return {};
        var o=JSON.parse(s);
        return (o && typeof o==='object') ? o : {};
      }catch(e){ return {}; }
    }
    function _watchSave(o){ try{ localStorage.setItem('hx_chk_watch', JSON.stringify(o)); }catch(e){} }
    function _watchHours(){ try{ var h=parseInt(localStorage.getItem('hx_chk_watch_hours')||'',10); return (h>0)?h:24; }catch(e){ return 24; } }
    /* bb每记一条账通报过来：命中watch关键词→记账；err命中→删账（用了出毛病不销） */
    function bbHit(k, m){
      try{
        if(_off()) return;
        if(!_list || !_list.tasks) return;
        var mm=String(m||''); if(!mm) return;
        var prog=loadProg();
        var wl=_watchLoad(); var changed=false;
        for(var i=0;i<_list.tasks.length;i++){
          var t=_list.tasks[i];
          if(!t || !t.steps) continue;
          for(var j=0;j<t.steps.length;j++){
            var st=t.steps[j];
            if(!st || !st.watch) continue;
            if(stepGreen(prog,t.id,st.id)) continue;
            if(mm.indexOf(String(st.watch))<0) continue;
            var key=String(t.id)+'_'+String(st.id);
            if(String(k)==='err'){ if(wl[key]){ delete wl[key]; changed=true; } } /* 用了出毛病：撤命中不销 */
            else if(String(k)==='act'||String(k)==='note'||String(k)==='job'||String(k)==='hb'||String(k)==='wiz'){ if(!wl[key]){ wl[key]=Date.now(); changed=true; } } /* 首次命中记账不刷新 */
          }
        }
        if(changed) _watchSave(wl);
      }catch(e){}
    }
    /* detect里对watch步调用：满观察窗没err→自动销号（不弹窗）；未满/未中→不催 */
    function _watchTick(t, st){
      try{
        var key=String(t.id)+'_'+String(st.id);
        var wl=_watchLoad();
        var ts=Number(wl[key])||0;
        if(!ts) return; /* 还没用到：不催 */
        if((Date.now()-ts) < _watchHours()*3600000) return; /* 观察窗未满：不催 */
        delete wl[key]; _watchSave(wl);
        markGreen(t.id, st.id); /* 用了+观察窗内没err没挂号=没意见=销 */
        try{ if(HX.bb && typeof HX.bb.job==='function'){ HX.bb.job('验收自动销:'+String(t.id)+'/'+String(st.id), true); } }catch(e){}
        try{ refreshUI(); }catch(e){}
      }catch(e){}
    }

    /* v0.39.0 机核档：侦测命中直接销号（不弹窗），黑匣子+机核台账双留痕 */
    function _autoGreen(t, st){
      try{
        markGreen(t.id, st.id);
        try{ if(HX.bb && typeof HX.bb.job==='function'){ HX.bb.job('机核销号:'+String(t.id)+'/'+String(st.id), true); } }catch(e){}
        try{ _autoLogAdd(t.id, st.id, st.auto); }catch(e){}
        try{ refreshUI(); }catch(e){}
      }catch(e){}
    }
    var _autoNoted = {}; /* v0.39.0：机核档缺侦测器note会话防重 */
    function _autoNoteOnce(t, st){
      try{
        var key=String(t.id)+'_'+String(st.id);
        if(_autoNoted[key]) return;
        _autoNoted[key]=1;
        if(HX.bb && typeof HX.bb.log==='function'){ HX.bb.log('note','机核档缺侦测器:'+String(t.id)+'/'+String(st.id)); }
      }catch(e){}
    }
    function _autoOff(){ try{ return localStorage.getItem('hx_chk_auto_off')==='1'; }catch(e){ return false; } } /* v0.39.0：机核档总开关，1=退休机核落回弹确认条老路 */
    function _aiOff(){ try{ return localStorage.getItem('hx_chk_ai_off')==='1'; }catch(e){ return false; } } /* v0.40.0：AI质检总开关 */
    var _aiBusy = false; /* 泵在飞闸：一次只问一件 */
    var _aiCount = 0;    /* 本次开门会话已质检件数 */
    function _aiMax(){ try{ var n=parseInt(localStorage.getItem('hx_chk_ai_max')||'3',10); return (n>0&&n<20)?n:3; }catch(e){ return 3; } }
    /* ---- v0.39.0 机核台账：谁被机器销的号，一笔一笔留账，只增 ---- */
    function _autoLogAdd(tid, sid, autoStr){
      try{
        var arr=[]; try{ arr=JSON.parse(localStorage.getItem('hx_chk_autolog')||'[]')||[]; }catch(e){ arr=[]; }
        if(!Array.isArray(arr)) arr=[];
        arr.push({t:Date.now(), tid:String(tid), sid:String(sid), auto:String(autoStr||'')});
        if(arr.length>100) arr=arr.slice(arr.length-100);
        try{ localStorage.setItem('hx_chk_autolog', JSON.stringify(arr)); }catch(e){}
        _pushAutoLog();
      }catch(e){}
    }
    function _pushAutoLog(){
      try{
        if(_off()) return;
        if(!window.fetch) return;
        if(typeof HX._autoNetOk==='function'){ if(!HX._autoNetOk()) return; }
        var g=null; try{ g=HX.keys.gh(); }catch(e){ g=null; }
        if(!g) return;
        var body=''; try{ body=localStorage.getItem('hx_chk_autolog')||'[]'; }catch(e){ body='[]'; }
        var prev=''; try{ prev=localStorage.getItem('hx_chk_autolog_up')||''; }catch(e){ prev=''; }
        if(body===prev) return; /* 镜像：没变不重推 */
        var api='https://api.github.com/repos/'+encodeURIComponent(g.u)+'/'+encodeURIComponent(g.r)+'/contents/'+encodeURIComponent('机核台账.json');
        var H={'Authorization':'token '+g.t,'Accept':'application/vnd.github+json'};
        fetch(api,{headers:H}).then(function(resp){ if(resp.status===404) return {sha:null}; if(!resp.ok) throw 0; return resp.json(); }).then(function(j){
          var put={message:'机核台账上行', content:_enc(body)};
          if(j && j.sha) put.sha=j.sha;
          fetch(api,{method:'PUT',headers:H,body:JSON.stringify(put)}).then(function(r2){
            if(r2 && r2.ok){ try{ localStorage.setItem('hx_chk_autolog_up', body); }catch(e){} }
          }, function(){});
        }, function(){});
      }catch(e){}
    }

    /* ---- v0.40.0 AI质检台账：AI看过谁，一笔一笔留账，只增裁100；照机核台账同款 ---- */
    function _aiLog(tid, sid, verdict, say){
      try{
        var arr=[]; try{ arr=JSON.parse(localStorage.getItem('hx_chk_ailog')||'[]')||[]; }catch(e){ arr=[]; }
        if(!Array.isArray(arr)) arr=[];
        arr.push({t:Date.now(), tid:String(tid), sid:String(sid), verdict:String(verdict||''), say:String(say||'')});
        if(arr.length>100) arr=arr.slice(arr.length-100);
        try{ localStorage.setItem('hx_chk_ailog', JSON.stringify(arr)); }catch(e){}
        _pushAiLog();
      }catch(e){}
    }
    function _pushAiLog(){
      try{
        if(_off()) return;
        if(!window.fetch) return;
        if(typeof HX._autoNetOk==='function'){ if(!HX._autoNetOk()) return; }
        var g=null; try{ g=HX.keys.gh(); }catch(e){ g=null; }
        if(!g) return;
        var body=''; try{ body=localStorage.getItem('hx_chk_ailog')||'[]'; }catch(e){ body='[]'; }
        var prev=''; try{ prev=localStorage.getItem('hx_chk_ailog_up')||''; }catch(e){ prev=''; }
        if(body===prev) return; /* 镜像：没变不重推 */
        var api='https://api.github.com/repos/'+encodeURIComponent(g.u)+'/'+encodeURIComponent(g.r)+'/contents/'+encodeURIComponent('AI质检台账.json');
        var H={'Authorization':'token '+g.t,'Accept':'application/vnd.github+json'};
        fetch(api,{headers:H}).then(function(resp){ if(resp.status===404) return {sha:null}; if(!resp.ok) throw 0; return resp.json(); }).then(function(j){
          var put={message:'AI质检台账上行', content:_enc(body)};
          if(j && j.sha) put.sha=j.sha;
          fetch(api,{method:'PUT',headers:H,body:JSON.stringify(put)}).then(function(r2){
            if(r2 && r2.ok){ try{ localStorage.setItem('hx_chk_ailog_up', body); }catch(e){} }
          }, function(){});
        }, function(){});
      }catch(e){}
    }

    /* v0.40.0：验收快照=页面标题+近24小时err条数+spot元素现场+正文摘要，全读型 */
    function _aiSnap(st){
      var snap={page:'', err24:0, spot:'', body:''};
      try{ snap.page=String(document.title||''); }catch(e){}
      try{
        if(HX.bb && typeof HX.bb.tail==='function'){
          var arr=HX.bb.tail(300), now=Date.now(), c=0, cn=0;
          for(var i=0;i<arr.length;i++){
            var it=arr[i]||{};
            if(String(it.k||'')==='err' && (now-(Number(it.t)||0))<86400000){
              if(String(it.m||'').indexOf('黑匣子')>=0){ cn++; } else { c++; }
            }
          }
          snap.err24=c; snap.errNet=cn; /* t75刀C */
        }
      }catch(e){}
      try{
        if(st && st.spot){
          var el=document.querySelector(String(st.spot));
          if(el){
            var r=el.getBoundingClientRect();
            snap.spot='选择器'+String(st.spot)+'：在屏位置'+Math.round(r.left)+','+Math.round(r.top)+' 宽'+Math.round(r.width)+' 高'+Math.round(r.height)+'；内容前200字：'+String(el.outerHTML||'').slice(0,200);
          }else{ snap.spot='选择器'+String(st.spot)+'：元素没找到'; }
        }
      }catch(e){}
      try{ snap.body=String((document.body&&document.body.innerText)||'').slice(0,300); }catch(e){}
      return snap;
    }

    /* v0.40.0：问AI一件——节流+问过不再问；正常才销，其余一律留人 */
    function _aiCheck(t, st){
      try{
        if(_aiBusy) return;
        if(_aiCount >= _aiMax()) return;
        var key=String(t.id)+'_'+String(st.id);
        var asked={}; try{ asked=JSON.parse(localStorage.getItem('hx_chk_ai_asked')||'{}')||{}; }catch(e){ asked={}; }
        if(asked[key]) return; /* 问过（无论结果）本清单期不再问，拿不准留人 */
        if(!(HX.chat && HX.chat.pump && typeof HX.chat.pump==='function')) return; /* 没泵=跳过下回补 */
        _aiBusy=true; _aiCount++;
        asked[key]=Date.now(); try{ localStorage.setItem('hx_chk_ai_asked', JSON.stringify(asked)); }catch(e){}
        var sys='你是手机学习软件的验收质检员。给你一条验收标准和一页界面的现场快照（含近24小时报错数err24）。只许回答「正常」或「拿不准」开头，再加一句20字以内理由。凡快照对不上标准、err24大于0、或你判断不了，一律答拿不准。快照里errNet是黑匣子自己传账的网络账，不算软件毛病，不要拿它当判罚依据。'; /* t75刀C */
        var usr='验收标准：'+String(st.text||'')+'\n现场快照：'+JSON.stringify(_aiSnap(st));
        var done=false;
        setTimeout(function(){ if(!done){ done=true; _aiBusy=false; try{ HX.bb.log('note','AI质检超时:'+key); }catch(e){} try{ var a3=JSON.parse(localStorage.getItem('hx_chk_ai_asked')||'{}')||{}; delete a3[key]; localStorage.setItem('hx_chk_ai_asked', JSON.stringify(a3)); }catch(e){} } }, 60000); /* 60秒死心；超时也回删问账下回补 */
        HX.chat.pump(sys, usr, {}, function(ok, txt, by){ /* 真签名：cb(ok布尔, txt, by哪家)——照HX.jc里三处调用先例 */
          try{
            if(done) return; done=true; _aiBusy=false;
            var say=String(txt||'').slice(0,80);
            if(ok && /^正常/.test(say)){
              markGreen(t.id, st.id);
              try{ HX.bb.job('AI质检销:'+String(t.id)+'/'+String(st.id), true); }catch(e){}
              _aiLog(t.id, st.id, '正常', say);
              try{ refreshUI(); }catch(e){}
            }else{
              _aiLog(t.id, st.id, '拿不准', say||'泵没回话'); /* 不销，留人 */
            }
            if(!(ok && /^正常/.test(say))){ try{ var a2=JSON.parse(localStorage.getItem('hx_chk_ai_asked')||'{}')||{}; delete a2[key]; localStorage.setItem('hx_chk_ai_asked', JSON.stringify(a2)); }catch(e){} } /* 泵没答成或拿不准=回删问账，下回开门在对应页补问（拿不准不封口） */
          }catch(e){ _aiBusy=false; }
        });
      }catch(e){ _aiBusy=false; }
    }

    /* ---- 进度推云仓（照sjUpload PUT模式：GET取sha→PUT；没钥匙/没网静默跳过下回补） ---- */
    function pushProg(){
      try{
        if(_off()) return;
        if(!window.fetch) return;
        if(typeof HX._autoNetOk==='function'){ if(!HX._autoNetOk()) return; } /* 闲时闸门 */
        var g=null; try{ g=HX.keys.gh(); }catch(e){ g=null; }
        if(!g) return;
        var body=JSON.stringify(loadProg());
        var prev=''; try{ prev=localStorage.getItem(LS_UP)||''; }catch(e){ prev=''; }
        if(body===prev) return; /* 内容没变不重复推 */
        var api='https://api.github.com/repos/'+encodeURIComponent(g.u)+'/'+encodeURIComponent(g.r)+'/contents/'+encodeURIComponent(PROG_FILE);
        var H={'Authorization':'token '+g.t,'Accept':'application/vnd.github+json'};
        fetch(api,{headers:H}).then(function(resp){ if(resp.status===404) return {sha:null}; if(!resp.ok) throw 0; return resp.json(); }).then(function(j){
          var put={message:'验收进度上行', content:_enc(body)};
          if(j&&j.sha) put.sha=j.sha;
          return fetch(api,{method:'PUT',headers:H,body:JSON.stringify(put)});
        }).then(function(resp){ if(!resp.ok) throw 0; return resp.json(); }).then(function(){
          try{ localStorage.setItem(LS_UP, body); }catch(e){}
        }).catch(function(){}); /* 验收不是急活，失败静默下回补 */
      }catch(e){}
    }

    /* ---- v0.25.0 刀B：自报验收单——进度有变化后闲时PUT出去，走pushProg同款双腿（云仓api/contents→坚果云兜底），失败静默下回补 ---- */
    function _reportBody(){
      try{
        var prog=loadProg();
        var rows=[];
        if(_list && _list.tasks){
          for(var i=0;i<_list.tasks.length;i++){
            var t=_list.tasks[i];
            var st={};
            for(var j=0;j<(t.steps||[]).length;j++){
              var sid=String(t.steps[j].id);
              if(stepGreen(prog, t.id, t.steps[j].id)) st[sid]=1;
              else if(stepHeld(prog, t.id, t.steps[j].id)) st[sid]=2;
              else st[sid]=0;
            }
            rows.push({id:String(t.id), st:st});
          }
        }
        var obj={ver:String((_list && _list.ver)||''), t:Date.now(), dev:'真机', rows:rows};
        try{ var vc=localStorage.getItem('hx_shell_vc'); if(vc) obj.vc=vc; }catch(e){}
        return JSON.stringify(obj);
      }catch(e){ return ''; }
    }
    function pushReport(){
      try{
        if(_off()) return;
        if(!window.fetch) return;
        if(typeof HX._autoNetOk==='function'){ if(!HX._autoNetOk()) return; } /* 闲时闸门 */
        var body=_reportBody();
        if(!body) return;
        var prev=''; try{ prev=localStorage.getItem(LS_REPORT_UP)||''; }catch(e){ prev=''; }
        if(body===prev) return; /* 内容没变不重复推 */
        var g=null; try{ g=HX.keys.gh(); }catch(e){ g=null; }
        var dk=null; try{ dk=HX.keys.dav(); }catch(e){ dk=null; }
        if(!g && !dk) return;
        function legDav(){
          try{
            if(!dk || !HX.dav || typeof HX.dav.upFile!=='function'){ return; }
            HX.dav.upFile('/学习套装备份/'+REPORT_FILE, body).then(function(){
              try{ localStorage.setItem(LS_REPORT_UP, body); }catch(e){}
            }, function(){});
          }catch(e){}
        }
        if(!g){ legDav(); return; }
        var api='https://api.github.com/repos/'+encodeURIComponent(g.u)+'/'+encodeURIComponent(g.r)+'/contents/'+encodeURIComponent(REPORT_FILE);
        var H={'Authorization':'token '+g.t,'Accept':'application/vnd.github+json'};
        fetch(api,{headers:H}).then(function(resp){ if(resp.status===404) return {sha:null}; if(!resp.ok) throw 0; return resp.json(); }).then(function(j){
          var put={message:'验收单上行', content:_enc(body)};
          if(j&&j.sha) put.sha=j.sha;
          return fetch(api,{method:'PUT',headers:H,body:JSON.stringify(put)});
        }).then(function(resp){ if(!resp.ok) throw 0; return resp.json(); }).then(function(){
          try{ localStorage.setItem(LS_REPORT_UP, body); }catch(e){}
        }).catch(function(){ legDav(); }); /* 云仓失败→坚果云兜底；都失败静默下回补 */
      }catch(e){}
    }

    /* ---- 清单拉取 v0.21.0双腿三兜底：腿①坚果云HX.dav.downFile→腿②云仓api/contents→腿③老raw垫底；全败有缓存用缓存；闸门_autoNetOk(manual)照旧最前；全程try护栏不外抛 ---- */
    function fetchList(manual){
      try{
        if(_off()) return;
        if(typeof HX._autoNetOk==='function'){ if(!HX._autoNetOk(manual)) return; }
        var g=null; try{ g=HX.keys.gh(); }catch(e){ g=null; }
        var dk=null; try{ dk=HX.keys.dav(); }catch(e){ dk=null; }
        if(!g && !dk){ if(manual){ try{ chkToast('⚠️ 没钥匙，清单拉不下来'); }catch(e){} } return; }
        function applyTxt(txt, tag){
          try{
            if(!txt){ return false; }
            var o=JSON.parse(txt);
            if(!o || !o.tasks){ if(manual){ try{ chkToast('⚠️ 清单格式不对'); }catch(e){} } return false; }
            _list=o; cacheList(o); reconcile(); refreshUI();
            if(manual){ try{ chkToast(tag ? ('清单已刷新（'+tag+'）') : '清单已刷新'); }catch(e){} }
            return true;
          }catch(e){ return false; }
        }
        function fail(){
          if(manual){ try{ chkToast('⚠️ 清单没拉下来，下回再试'); }catch(e){} }
        }
        function leg3(){
          try{
            if(!g || !HX.gh || !HX.gh.fetch){ fail(); return; }
            HX.gh.fetch(LIST_URL, {headers:{'Authorization':'Bearer '+g.t}}).then(function(resp){
              if(!resp || !resp.ok) return null;
              return resp.text();
            }).then(function(txt){
              if(!applyTxt(txt, '')){ fail(); }
            }, function(){ fail(); });
          }catch(e){ fail(); }
        }
        function leg2(){
          try{
            if(!g || !HX.gh || !HX.gh.fetch){ leg3(); return; }
            var u=(g.u||'hongxiaotao177'), r=(g.r||'xuexi-backup');
            var url='https://api.github.com/repos/'+encodeURIComponent(u)+'/'+encodeURIComponent(r)+'/contents/'+encodeURIComponent('验收清单.json');
            HX.gh.fetch(url, {headers:{'Authorization':'token '+g.t,'Accept':'application/vnd.github+json'}}).then(function(resp){
              if(!resp || !resp.ok) return null;
              return resp.json();
            }).then(function(j){
              try{
                if(!j || !j.content){ leg3(); return; }
                var txt=_dec(String(j.content).replace(/\n/g,''));
                if(!applyTxt(txt, '云仓')){ leg3(); }
              }catch(e){ leg3(); }
            }, function(){ leg3(); });
          }catch(e){ leg3(); }
        }
        function leg1(){
          try{
            if(!HX.dav || typeof HX.dav.downFile!=='function'){ leg2(); return; }
            HX.dav.downFile('/学习套装备份/验收清单.json', 'hx_chk_dl.json').then(function(txt){
              if(!applyTxt(txt, '坚果云')){ leg2(); }
            }, function(){ leg2(); });
          }catch(e){ leg2(); }
        }
        leg1();
      }catch(e){}
    }

    /* ---- UI：注入样式+DOM（窄条+整屏页容器，默认都藏） ---- */
    function ensureUI(){
      try{
        if($('hxChkBar')) return true;
        if(!document.body) return false;
        var bar=document.createElement('div'); bar.id='hxChkBar';
        bar.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:99994;height:46px;background:#fffdf8;border-top:1px solid #e5ddd0;display:none;align-items:center;padding:0 10px;box-sizing:border-box;cursor:pointer';
        var pg=document.createElement('div'); pg.id='hxChkPg';
        pg.style.cssText='position:fixed;left:0;top:0;right:0;bottom:0;z-index:99995;background:#fffdf8;overflow-y:auto;display:none;padding:14px;box-sizing:border-box'; /* 照sjShowBrowse整屏覆盖先例 */
        var mini=document.createElement('div'); mini.id='hxChkMini'; /* v0.24.4 刀B：收小圆牌 */
        mini.style.cssText='position:fixed;right:10px;bottom:10px;z-index:99994;width:52px;height:52px;border-radius:26px;background:#fffdf8;border:1px solid #e5ddd0;box-shadow:0 4px 16px rgba(74,64,48,.18);display:none;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;box-sizing:border-box;line-height:1.2';
        document.body.appendChild(bar); document.body.appendChild(pg); document.body.appendChild(mini);
        bar.addEventListener('click', function(){ try{ openPage(); }catch(e){} }); /* 点窄条本体=展开整屏页 */
        mini.addEventListener('click', function(){ try{ setMini(false); renderBar(); }catch(e){} }); /* 点圆牌=叫回窄条 */
        return true;
      }catch(e){ return false; }
    }

    /* ---- 画窄条：圆点串（每任务一点）+当前步骤一行字+右端▲ ---- */
    function renderBar(){
      try{
        var bar=$('hxChkBar'); if(!bar) return;
        var prog=loadProg();
        var mini=$('hxChkMini'); /* v0.24.4 */
        if(_off() || !_list || !_list.tasks || !_list.tasks.length || allDone(prog)){ bar.style.display='none'; if(mini) mini.style.display='none'; _padBody(false); stopTimer(); return; } /* 全部任务绿或清单空→窄条自动隐藏 */
        if(_mini()){ /* v0.24.4 刀B：收小态→只出右下角圆牌，页脚全露 */
          bar.style.display='none'; _padBody(false);
          if(mini){
            mini.innerHTML='';
            var mt1=document.createElement('span'); mt1.textContent='验收'; mt1.style.cssText='font-size:11px;color:#6b6257';
            var mn=0; for(var mi2=0;mi2<_list.tasks.length;mi2++){ if(isSim(_list.tasks[mi2])) continue; if(isCloud(_list.tasks[mi2])) continue; if(isWatch(_list.tasks[mi2])) continue; if(taskDone(prog,_list.tasks[mi2])===false) mn++; }
            var mt2=document.createElement('span'); mt2.textContent=String(mn); mt2.style.cssText='font-size:17px;font-weight:bold;color:#a05848';
            mini.appendChild(mt1); mini.appendChild(mt2);
            mini.style.display='flex';
          }
          startTimer(); /* 收小照跑侦测，数字会跟着变 */
          return;
        }
        if(mini) mini.style.display='none';
        bar.innerHTML='';
        var dots=document.createElement('span'); dots.style.cssText='flex:none;letter-spacing:3px;font-size:12px';
        dots.appendChild(document.createTextNode('验收')); /* v0.24.2 刀6：小字「验收」 */
        var nDot=0; for(var di=0;di<_list.tasks.length;di++){ if(isSim(_list.tasks[di])) continue; if(isCloud(_list.tasks[di])) continue; if(isWatch(_list.tasks[di])) continue; if(taskDone(prog,_list.tasks[di])===false) nDot++; } /* v0.24.3 刀A：未绿日常档任务数；v0.25.0 刀C：云侧/观察哨不占 */
        var num=document.createElement('span'); num.textContent=String(nDot);
        num.style.cssText='font-size:15px;font-weight:bold;color:#a05848;margin-left:4px';
        dots.appendChild(num); /* v0.24.3 刀A（洪老师10-14拍板「圆点改数字，不占版面」）：圆点串退休改数字 */
        var cur=curStep(prog);
        var txt=document.createElement('span');
        txt.style.cssText='flex:1;margin:0 10px;font-size:13px;color:#4a4238;white-space:nowrap;overflow:hidden;text-overflow:ellipsis'; /* 超一行省略；v0.23.0字号13 */
        var nLeft=0; for(var ti=0;ti<_list.tasks.length;ti++){ var tk=_list.tasks[ti]; if(isSim(tk)) continue; if(isCloud(tk)) continue; if(isWatch(tk)) continue; var sts=tk.steps||[]; for(var si=0;si<sts.length;si++){ if(!stepGreen(prog,tk.id,sts[si].id)) nLeft++; } } /* v0.24.2 刀6：日常档未绿步总数（DS误写stepDone，Kimi终审翻stepGreen）；v0.25.0 刀C：云侧/观察哨不占 */
        txt.textContent = cur ? ('还有'+nLeft+'步没验 · 下一小步：'+String(cur.task.title||'')+' · '+String(cur.step.text||'')+(function(s){ try{ if(s.lane==='cloud') return '（这步云侧核，不用您动）'; if(s.lane==='watch') return '（观察哨，云侧盯24小时自己销）'; if(s.watch||s.lane==='auto') return '（在帮您盯，好了自己变绿）'; return '（这步等您亲手点✓：点这条展开）'; }catch(e){ return ''; } })(cur.step||{})) : ''; /* v0.24.2 刀6 窄条说人话；v0.35.0 F4a尾刀：补「在等谁」——手动步明说等您点✓，auto/cloud/watch步明说云侧在盯，不再像死机 */
        var dn=document.createElement('span'); dn.textContent='—'; dn.style.cssText='flex:none;font-size:15px;font-weight:bold;color:#6b6257;padding:4px 8px;margin-right:2px'; /* v0.24.4 刀B：收小钮 */
        dn.addEventListener('click', function(ev){ try{ ev.stopPropagation(); setMini(true); renderBar(); chkToast('验收牌收成右下角小圆牌了，点圆牌随时叫回'); }catch(e){} });
        var up=document.createElement('span'); up.textContent='▲'; up.style.cssText='flex:none;font-size:14px;color:#6b6257;padding:0 4px';
        bar.appendChild(dots); bar.appendChild(txt); bar.appendChild(dn); bar.appendChild(up);
        bar.style.display='flex';
        _padBody(true); /* v0.24.4 刀A：页脚让路，往下多拉一点就露出页脚 */
        startTimer();
      }catch(e){}
    }
    /* ---- v0.24.4：收小状态账（跨开门记住） ---- */
    function _mini(){ try{ return localStorage.getItem('hx_chk_mini')==='1'; }catch(e){ return false; } }
    function setMini(v){ try{ if(v){ localStorage.setItem('hx_chk_mini','1'); } else { localStorage.removeItem('hx_chk_mini'); } }catch(e){} }
    /* ---- v0.24.4 刀A：窄条显示期间页脚让路（body底部垫54px，藏起即复原，垫过才动） ---- */
    function _padBody(on){
      try{
        var b=document.body; if(!b) return;
        if(on){
          if(b.getAttribute('data-hxchk-pad')!=='1'){ b.setAttribute('data-hxchk-pad','1'); b.setAttribute('data-hxchk-padold', b.style.paddingBottom||''); b.style.paddingBottom='54px'; }
        }else{
          if(b.getAttribute('data-hxchk-pad')==='1'){ b.removeAttribute('data-hxchk-pad'); b.style.paddingBottom=b.getAttribute('data-hxchk-padold')||''; b.removeAttribute('data-hxchk-padold'); }
        }
      }catch(e){}
    }
    function barVisible(){ try{ var bar=$('hxChkBar'); return !!(bar && bar.style.display!=='none'); }catch(e){ return false; } }
    function startTimer(){
      try{
        if(_timer) return;
        _timer=setInterval(function(){ try{ if(!barVisible()){ stopTimer(); return; } detect(); }catch(e){} }, 5000); /* 窄条显示期间每5秒跑一遍当前未绿步的侦测器 */
      }catch(e){}
    }
    function stopTimer(){ try{ if(_timer){ clearInterval(_timer); _timer=null; } }catch(e){} }

    /* ---- 画整屏页：标题+🔄刷新清单+大✕；任务行=圆点+标题+n/m；步骤行=圆点+大白话全文+「✓这步好了」钮 ---- */
    function renderPg(){
      try{
        var pg=$('hxChkPg'); if(!pg) return;
        pg.innerHTML='';
        var bar=document.createElement('div'); /* 顶行：标题+刷新钮+大✕ */
        bar.style.cssText='display:flex;justify-content:space-between;align-items:center;padding:4px 2px 10px;border-bottom:1px solid #e5ddd0;margin-bottom:6px';
        var ttl=document.createElement('span'); ttl.style.cssText='font-size:18px;color:#4a4238;font-weight:bold'; ttl.textContent='✅验收清单';
        var rgt=document.createElement('span'); rgt.style.cssText='flex:none;display:flex;gap:8px;align-items:center';
        var rf=document.createElement('button'); rf.type='button'; rf.textContent='🔄刷新清单'; rf.style.cssText='background:#7a8ea0;color:#fff;font-size:14px;padding:6px 12px;border:none;border-radius:10px;cursor:pointer';
        rf.addEventListener('click', function(){ try{ reload(); }catch(e){} });
        var bx=document.createElement('button'); bx.type='button'; bx.textContent='✕'; bx.style.cssText='background:#efe9df;color:#6b6257;font-size:20px;padding:6px 16px;border:none;border-radius:10px;cursor:pointer';
        bx.addEventListener('click', function(){ pg.style.display='none'; }); /* ✕=关页（窄条还在） */
        rgt.appendChild(rf); rgt.appendChild(bx);
        bar.appendChild(ttl); bar.appendChild(rgt); pg.appendChild(bar);

        /* v0.25.0 刀A：整屏清单页顶部加「🧪 向导验（我来领着你验）」大钮 */
        if(!_wizOff()){
          var wrow=document.createElement('div');
          wrow.style.cssText='padding:6px 2px 12px';
          var wb=document.createElement('button'); wb.type='button'; wb.textContent='🧪 向导验（我来领着你验）';
          wb.style.cssText='width:100%;background:#a05848;color:#fff;font-size:20px;font-weight:bold;padding:14px 16px;border:none;border-radius:12px;cursor:pointer';
          wb.addEventListener('click', function(){ try{ startWiz(); }catch(e){} });
          wrow.appendChild(wb); pg.appendChild(wrow);
        }

        var prog=loadProg();
        if(!_list || !_list.tasks || !_list.tasks.length){
          var emp=document.createElement('div'); emp.style.cssText='color:#a05848;text-align:center;padding-top:60px'; emp.textContent='清单还没取到，点🔄刷新试试';
          pg.appendChild(emp);
          return;
        }
        for(var i=0;i<_list.tasks.length;i++){ (function(task){
          if(isSim(task)){ /* v0.23.0：仿真档灰行，不展开无点绿 */
            var srow0=document.createElement('div');
            srow0.style.cssText='display:flex;align-items:center;gap:8px;padding:12px 2px;border-bottom:1px solid #e5ddd0';
            var sd0=document.createElement('span'); sd0.textContent='●'; sd0.style.cssText='flex:none;font-size:12px;color:#cfc6b8';
            var st0=document.createElement('span'); st0.style.cssText='flex:1;font-size:15px;color:#b5aca0'; st0.textContent=String(task.title||'');
            var sb0=document.createElement('span'); sb0.style.cssText='flex:none;font-size:13px;color:#b5aca0'; sb0.textContent='🤖仿真已验';
            srow0.appendChild(sd0); srow0.appendChild(st0); srow0.appendChild(sb0);
            pg.appendChild(srow0);
            return;
          }
          if(isCloud(task)){ /* v0.25.0 刀C：A档云侧灰行，向导跳过不问，Kimi核 */
            var crow=document.createElement('div');
            crow.style.cssText='display:flex;align-items:center;gap:8px;padding:12px 2px;border-bottom:1px solid #e5ddd0';
            var cd=document.createElement('span'); cd.textContent='●'; cd.style.cssText='flex:none;font-size:12px;color:#cfc6b8';
            var ct=document.createElement('span'); ct.style.cssText='flex:1;font-size:15px;color:#b5aca0'; ct.textContent=String(task.title||'');
            var cb=document.createElement('span'); cb.style.cssText='flex:none;font-size:13px;color:#b5aca0'; cb.textContent='☁️云侧核';
            crow.appendChild(cd); crow.appendChild(ct); crow.appendChild(cb);
            pg.appendChild(crow);
            return;
          }
          if(isWatch(task)){ /* v0.25.0 刀C：长期观察哨灰行，不占未验数 */
            var wrow2=document.createElement('div');
            wrow2.style.cssText='display:flex;align-items:center;gap:8px;padding:12px 2px;border-bottom:1px solid #e5ddd0';
            var wd=document.createElement('span'); wd.textContent='●'; wd.style.cssText='flex:none;font-size:12px;color:#cfc6b8';
            var wt=document.createElement('span'); wt.style.cssText='flex:1;font-size:15px;color:#b5aca0'; wt.textContent=String(task.title||'');
            var wb2=document.createElement('span'); wb2.style.cssText='flex:none;font-size:13px;color:#b5aca0'; wb2.textContent='👀长期观察';
            wrow2.appendChild(wd); wrow2.appendChild(wt); wrow2.appendChild(wb2);
            pg.appendChild(wrow2);
            return;
          }
          var done=taskDone(prog, task);
          var g=0; for(var gi=0;gi<(task.steps||[]).length;gi++){ if(stepGreen(prog, task.id, task.steps[gi].id)) g++; }
          var trow=document.createElement('div');
          trow.style.cssText='display:flex;align-items:center;gap:8px;padding:12px 2px;border-bottom:1px solid #e5ddd0;cursor:pointer';
          var td=document.createElement('span'); td.textContent='●'; td.style.cssText='flex:none;font-size:12px;color:'+(done?'#7a9e7e':'#cfc6b8');
          var tt=document.createElement('span'); tt.style.cssText='flex:1;font-size:17px;color:#4a4238'; tt.textContent=String(task.title||'');
          var nm=document.createElement('span'); nm.style.cssText='flex:none;font-size:14px;color:#a05848'; nm.textContent=g+'/'+(task.steps||[]).length;
          trow.appendChild(td); trow.appendChild(tt); trow.appendChild(nm);
          trow.addEventListener('click', function(){ try{ if(_openT[task.id]) delete _openT[task.id]; else _openT[task.id]=1; renderPg(); }catch(e){} }); /* 点任务行展开/收起它的步骤行 */
          pg.appendChild(trow);
          if(_openT[task.id]){
            for(var j=0;j<(task.steps||[]).length;j++){ (function(st){
              var ok=stepGreen(prog, task.id, st.id);
              var held=stepHeld(prog, task.id, st.id); /* v0.25.0 刀A：挂号=2，标灰「已挂号」 */
              var srow=document.createElement('div');
              srow.style.cssText='display:flex;align-items:flex-start;gap:8px;padding:10px 2px 10px 22px;border-bottom:1px solid #efe9df';
              var sd=document.createElement('span'); sd.textContent='●'; sd.style.cssText='flex:none;font-size:12px;margin-top:4px;color:'+(ok?'#7a9e7e':(held?'#b5aca0':'#cfc6b8'));
              var sb=document.createElement('div'); sb.style.cssText='flex:1';
              var stx=document.createElement('div'); stx.style.cssText='font-size:16px;line-height:1.6;color:'+(held?'#b5aca0':'#4a4238')+';white-space:pre-wrap;word-break:break-all'; stx.textContent=String(st.text||''); /* 大白话全文不截断，textContent防注入 */
              sb.appendChild(stx);
              if(held){ var hh=document.createElement('div'); hh.style.cssText='font-size:13px;color:#b5aca0;margin-top:2px'; hh.textContent='已挂号'; sb.appendChild(hh); }
              else if(st.lane==='auto'){ var au=document.createElement('div'); au.style.cssText='font-size:13px;color:#8a7f70;margin-top:2px'; au.textContent='🤖机核：它自己核过就变绿，不用您点'; sb.appendChild(au); } /* v0.39.0 */
              else if(st.lane==='ai'){ /* v0.40.0 AI质检档小字：查台账该步最新verdict */
                var aiV=''; try{ var al=JSON.parse(localStorage.getItem('hx_chk_ailog')||'[]')||[]; for(var ai=al.length-1;ai>=0;ai--){ var ae=al[ai]||{}; if(String(ae.tid)===String(task.id) && String(ae.sid)===String(st.id)){ aiV=String(ae.verdict||''); break; } } }catch(e){ aiV=''; }
                var ad=document.createElement('div'); ad.style.cssText='font-size:13px;color:#8a7f70;margin-top:2px'; ad.textContent=(aiV==='拿不准')?'🤖AI拿不准，等您看一眼':'🤖AI质检：它看过说行才变绿'; sb.appendChild(ad);
              }
              else if(st.auto){ var ah=document.createElement('div'); ah.style.cssText='font-size:13px;color:#8a7f70;margin-top:2px'; ah.textContent='做好了它自己变绿'; sb.appendChild(ah); }
              srow.appendChild(sd); srow.appendChild(sb);
              if(!st.auto && !ok && !held && st.lane!=='auto'){
                var gb=document.createElement('button'); gb.type='button'; gb.textContent='✓这步好了'; gb.style.cssText='flex:none;background:#7a9e7e;color:#fff;font-size:14px;padding:6px 12px;border:none;border-radius:8px;cursor:pointer';
                gb.addEventListener('click', function(){ try{ markGreen(task.id, st.id); renderPg(); renderBar(); }catch(e){} }); /* 点=标绿 */
                srow.appendChild(gb);
              }
              pg.appendChild(srow);
            })(task.steps[j]); }
          }
        })(_list.tasks[i]); } /* v0.20.0 终审修：循环变量是_tasks_下标，传_list[i]必undefined */
      }catch(e){}
    }

    /* ---- 整屏页打开时也跑一遍侦测 ---- */
    function openPage(){
      try{
        if(_off()) return;
        if(!ensureUI()) return;
        detect();
        renderPg();
        var pg=$('hxChkPg'); if(pg) pg.style.display='block';
      }catch(e){}
    }
    function refreshUI(){
      try{
        renderBar();
        var pg=$('hxChkPg'); if(pg && pg.style.display==='block') renderPg();
      }catch(e){}
    }

    /* ═══ v0.25.0 刀A：向导模式 wiz（复用现有骨架；DS二稿=点亮+三钮大黑框，Kimi终审拼接） ═══ */
    var _wiz = null; /* 当前向导状态 {task, step} */
    var _wizSkipped = {}; /* v0.26.0 刀A：本次向导会话内跳过集合，key=tid+':'+sid */

    /* 找下一个未绿步（跳过 sim/cloud/watch，跳过已挂号=2） */
    function _wizNext(){
      try{
        if(!_list || !_list.tasks) return null;
        var prog=loadProg();
        for(var i=0;i<_list.tasks.length;i++){
          var t=_list.tasks[i];
          if(isSim(t)||isCloud(t)||isWatch(t)) continue;
          for(var j=0;j<(t.steps||[]).length;j++){
            var st=t.steps[j];
            if(stepGreen(prog, t.id, st.id)) continue;
            if(stepHeld(prog, t.id, st.id)) continue; /* 已挂号跳过 */
            if(_wizSkipped[String(t.id)+':'+String(st.id)]) continue; /* v0.26.0 刀A：本次会话已跳过，不再回头 */
            return { task:t, step:st };
          }
        }
        return null;
      }catch(e){ return null; }
    }

    function _wizStep(){
      try{
        if(!_wiz || !_wiz.task || !_wiz.step){ _wizFinish(); return; }
        var task=_wiz.task, step=_wiz.step;
        var title=String(task.title||'')+' · '+String(step.text||'');
        if(step.auto){
          if(autoHit(step.auto)){
            askConfirm(task, step); /* 中=复用确认条，点✓才绿；向导照往前走不等人 */
            _wizAdvance();
            return;
          }
          _wizBox('这步机器看不出来，您亲眼看看：'+String(task.title||'')+' · '+String(step.text||''), [ /* v0.26.0 刀C：auto未侦中文案人话 */
            { t:'✓好了', big:true, bg:'#7a9e7e', fn:function(){ try{ markGreen(task.id, step.id); _wizBoxClose(); _wizAdvance(); }catch(e){} } },
            { t:'✗不行', big:true, bg:'#a05848', fn:function(){ try{ _wizHold(task, step); _wizBoxClose(); _wizAdvance(); }catch(e){} } },
            { t:'跳过', big:true, bg:'#7a8ea0', fn:function(){ try{ _wizSkipped[String(task.id)+':'+String(step.id)]=1; _wizBoxClose(); _wizAdvance(); }catch(e){} } }, /* v0.26.0 刀A：跳过先记账再前进 */
            { t:'✕先验到这', bg:'#6b6257', fn:function(){ try{ _wizBoxClose(); _wizExit(); }catch(e){} } }
          ]);
          return;
        }
        if(step.spot){
          var lit=_wizSpot(step.spot);
          var q='请点屏幕上发黄光的那个（'+String(step.text||'')+'），好使吗？'; /* v0.26.0 刀C：spot文案人话 */
          if(!lit){ q='（这步要去「'+String(step.page||'主界面（首页）')+'」办：请过去之后，点上面的🔄再亮一次）\n'+q; } /* v0.27.0 刀2：跨页报页面名，默认主界面 */
          _wizBox(q, [
            { t:'✓好使', big:true, bg:'#7a9e7e', fn:function(){ try{ _wizSpotClear(); markGreen(task.id, step.id); _wizBoxClose(); _wizAdvance(); }catch(e){} } }, /* v0.26.0 刀C：钮文字人话 */
            { t:'✗不行', big:true, bg:'#a05848', fn:function(){ try{ _wizSpotClear(); _wizHold(task, step); _wizBoxClose(); _wizAdvance(); }catch(e){} } },
            { t:'🔄再亮一次', big:true, bg:'#7a8ea0', fn:function(){ try{ _wizSpot(step.spot); }catch(e){} } },
            { t:'✕先验到这', bg:'#6b6257', fn:function(){ try{ _wizSpotClear(); _wizBoxClose(); _wizExit(); }catch(e){} } }
          ]);
          return;
        }
        _wizBox('请确认：'+String(task.title||'')+' · '+String(step.text||''), [ /* v0.26.0 刀C：纯手动步文案人话 */
          { t:'✓好了', big:true, bg:'#7a9e7e', fn:function(){ try{ markGreen(task.id, step.id); _wizBoxClose(); _wizAdvance(); }catch(e){} } }, /* v0.26.0 刀C：钮文字人话 */
          { t:'跳过', big:true, bg:'#7a8ea0', fn:function(){ try{ _wizSkipped[String(task.id)+':'+String(step.id)]=1; _wizBoxClose(); _wizAdvance(); }catch(e){} } }, /* v0.26.0 刀A：跳过先记账再前进 */
          { t:'✕先验到这', bg:'#6b6257', fn:function(){ try{ _wizBoxClose(); _wizExit(); }catch(e){} } }
        ]);
      }catch(e){}
    }

    function _wizBox(title, btns){
      try{
        if(!document.body) return null;
        var old=$('hxChkWizBox'); if(old && old.parentNode) old.parentNode.removeChild(old);
        try{ var _of=document.getElementById('hxChkWizFull'); if(_of && _of.parentNode) _of.parentNode.removeChild(_of); }catch(e00){} /* v0.27.0 Kimi终审补：新建盒前摘旧大框，防换步时残留盖新步 */
        var box=document.createElement('div'); box.id='hxChkWizBox';
        box.style.cssText='position:fixed;left:0;right:0;top:0;z-index:99999;background:rgba(20,18,14,.97);color:#fff;padding:10px 14px;box-sizing:border-box;box-shadow:0 4px 16px rgba(0,0,0,.4);border-bottom:2px solid #3a342a'; /* v0.26.0 刀B：大黑框改顶部窄浮条 */
        try{ var _sv=localStorage.getItem('hx_chk_wiz_top'); if(_sv!==null){ var _tv=parseFloat(_sv); if(!isNaN(_tv)){ var _mh=(window.innerHeight||600)-120; if(_tv<0)_tv=0; if(_tv>_mh)_tv=_mh; box.style.top=_tv+'px'; } } }catch(e0){} /* v0.26.0 刀B：新建时读hx_chk_wiz_top恢复位置 */
        var hd=document.createElement('div'); /* v0.26.0 刀B：拖动把手区 */
        hd.style.cssText='height:16px;line-height:16px;font-size:11px;color:#8a8175;cursor:move;user-select:none;-webkit-user-select:none;margin-bottom:4px';
        hd.textContent='⠿ 按住拖我';
        box.appendChild(hd);
        var tt=document.createElement('div');
        tt.style.cssText='font-size:14px;line-height:1.5;margin-bottom:8px;max-height:4.5em;overflow-y:auto;-webkit-overflow-scrolling:touch;word-break:break-all;white-space:pre-wrap;cursor:pointer'; /* v0.27.0 刀1：字号调小+最多约3行可上下滑+可点看全文（去两行截断） */
        tt.textContent=String(title||'');
        tt.title='点我看全文'; /* v0.27.0 刀1：提示可点 */
        box.appendChild(tt);
        var row=document.createElement('div'); row.style.cssText='display:flex;gap:12px;justify-content:flex-start;flex-wrap:wrap'; /* v0.26.0 刀B：按钮行靠左 */
        for(var i=0;i<btns.length;i++){ (function(b){
          var btn=document.createElement('button'); btn.type='button'; btn.textContent=String(b.t||'');
          var fs=b.big?'18px':'16px'; /* v0.26.0 刀B：big钮字号18 */
          var pd=b.big?'10px 16px':'10px 18px'; /* v0.26.0 刀B：big钮padding */
          btn.style.cssText='background:'+(b.bg||'#7a9e7e')+';color:#fff;font-size:'+fs+';font-weight:bold;padding:'+pd+';border:none;border-radius:10px;cursor:pointer;line-height:1.2';
          btn.addEventListener('click', function(){ try{ if(b.fn) b.fn(); }catch(e){} });
          row.appendChild(btn);
        })(btns[i]); }
        box.appendChild(row);
        /* v0.27.0 刀1：点文字区展开大框看全文，再点/点大框自身收起 */
        tt.addEventListener('click', function(){ try{
          var full=document.getElementById('hxChkWizFull');
          if(full){ if(full.parentNode) full.parentNode.removeChild(full); return; }
          var f=document.createElement('div'); f.id='hxChkWizFull';
          f.style.cssText='position:fixed;left:5%;right:5%;top:12%;max-height:66%;z-index:100000;background:rgba(20,18,14,.98);color:#fff;font-size:17px;line-height:1.7;padding:16px;border-radius:12px;overflow-y:auto;-webkit-overflow-scrolling:touch;word-break:break-all;white-space:pre-wrap;box-shadow:0 8px 30px rgba(0,0,0,.5)';
          f.textContent=String(title||'');
          f.addEventListener('click', function(){ try{ if(f.parentNode) f.parentNode.removeChild(f); }catch(e2){} });
          document.body.appendChild(f);
        }catch(e1){} });
        document.body.appendChild(box);
        /* v0.26.0 刀B：拖动三路监听（touchstart/touchmove/touchend + mousedown/mousemove/mouseup） */
        try{
          var _drag=false, _sy=0, _st=0, _moved=false;
          var _getTop=function(){ var v=parseFloat(box.style.top); if(isNaN(v)) v=0; return v; };
          var _clamp=function(v){ var mh=(window.innerHeight||600)-120; if(v<0)v=0; if(v>mh)v=mh; return v; };
          var _start=function(y){ _drag=true; _moved=false; _sy=y; _st=_getTop(); };
          var _move=function(y){ if(!_drag) return; var dy=y-_sy; if(Math.abs(dy)>=8) _moved=true; if(_moved){ box.style.top=_clamp(_st+dy)+'px'; } };
          var _end=function(){ if(!_drag) return; _drag=false; if(_moved){ try{ localStorage.setItem('hx_chk_wiz_top', String(_getTop())); }catch(e1){} } };
          var _tm=function(ev){ try{ var t=ev.touches&&ev.touches[0]; if(t) _move(t.clientY); if(_moved && ev.cancelable) ev.preventDefault(); }catch(e3){} }; /* v0.26.0 终审修：拖动中preventDefault防页面跟滚 */
          var _te=function(ev){ try{ _end(); }catch(e4){} };
          var _mm=function(ev){ try{ _move(ev.clientY); }catch(e6){} };
          var _mu=function(ev){ try{ _end(); }catch(e7){} };
          box._hxDragOff=function(){ try{ document.removeEventListener('touchmove', _tm, false); document.removeEventListener('touchend', _te, false); document.removeEventListener('mousemove', _mm, false); document.removeEventListener('mouseup', _mu, false); }catch(e9){} }; /* v0.26.0 终审修：四路监听留引用，_wizBoxClose全摘防泄漏 */
          hd.addEventListener('touchstart', function(ev){ try{ var t=ev.touches&&ev.touches[0]; if(t) _start(t.clientY); }catch(e2){} }, false);
          document.addEventListener('touchmove', _tm, false); /* v0.26.0 终审修：move/end改挂document，拖快滑出把手不断拖 */
          document.addEventListener('touchend', _te, false);
          hd.addEventListener('mousedown', function(ev){ try{ _start(ev.clientY); }catch(e5){} }, false);
          document.addEventListener('mousemove', _mm, false);
          document.addEventListener('mouseup', _mu, false);
        }catch(e8){}
        return box;
      }catch(e){ return null; }
    }

    function _wizBoxClose(){
      try{ var b=$('hxChkWizBox'); if(b){ try{ if(b._hxDragOff) b._hxDragOff(); }catch(e1){} if(b.parentNode) b.parentNode.removeChild(b); } }catch(e){} /* v0.26.0 终审修：关盒先摘拖动监听 */
      try{ var f=document.getElementById('hxChkWizFull'); if(f && f.parentNode) f.parentNode.removeChild(f); }catch(e2){} /* v0.27.0 刀1：关盒同时收掉展开大框，防换步/退出残留 */
    }

    function _wizSpot(sel){
      try{
        _wizSpotClear();
        if(!sel || !document.body) return false;
        var el=null;
        try{ el=document.querySelector(String(sel)); }catch(e){ el=null; }
        if(!el) return false;
        try{ el.scrollIntoView({block:'center',behavior:'auto'}); }catch(e0){} /* v0.26.0 刀D：命中先滚到屏中间 */
        var r=el.getBoundingClientRect();
        if(!r || (r.width===0 && r.height===0)) return false;
        /* v0.26.0 刀D：查遮挡，浮条与黄圈相交则让位 */
        try{
          var wb=$('hxChkWizBox');
          if(wb){
            var wr=wb.getBoundingClientRect();
            var interTop=Math.max(r.top, wr.top);
            var interBot=Math.min(r.bottom, wr.bottom);
            var interLeft=Math.max(r.left, wr.left);
            var interRight=Math.min(r.right, wr.right);
            if(interBot>interTop && interRight>interLeft){
              var dy=0;
              if(wr.top < (window.innerHeight||600)/2){ dy=(interBot-interTop)+20; } else { dy=-((interBot-interTop)+20); }
              try{ window.scrollBy(0, dy); }catch(e1){}
              r=el.getBoundingClientRect();
              if(!r || (r.width===0 && r.height===0)) return false;
            }
          }
        }catch(e2){}
        var ov=document.createElement('div'); ov.id='hxChkWizSpot';
        ov.style.cssText='position:fixed;left:0;top:0;right:0;bottom:0;z-index:99998;pointer-events:none';
        var box=document.createElement('div');
        box.style.cssText='position:fixed;left:'+(r.left-4)+'px;top:'+(r.top-4)+'px;width:'+(r.width+8)+'px;height:'+(r.height+8)+'px;border:4px solid #FFD600;border-radius:8px;box-sizing:border-box;pointer-events:none;animation:hxChkWizBlink 0.5s ease-in-out 2';
        ov.appendChild(box);
        document.body.appendChild(ov);
        return true;
      }catch(e){ return false; }
    }

    function _wizSpotClear(){
      try{ var o=$('hxChkWizSpot'); if(o && o.parentNode) o.parentNode.removeChild(o); }catch(e){}
    }

    function _wizHold(task, step){
      try{
        var msg='挂号:'+String(task.id)+'/'+String(step.id)+':'+String(step.text||'');
        try{ if(HX.bb && typeof HX.bb.log==='function'){ HX.bb.log('wiz', msg); } }catch(e){} /* Kimi终审翻案：DS误传单对象，bb.log签名是(k,m)两参 */
        markHeld(task.id, step.id);
      }catch(e){}
    }

    function _wizAdvance(){
      try{
        var nx=_wizNext();
        if(!nx){ _wizFinish(); return; }
        _wiz={ task:nx.task, step:nx.step };
        _wizStep();
      }catch(e){ _wizFinish(); }
    }

    function _wizClose(){
      try{ _wizSpotClear(); _wizBoxClose(); }catch(e){}
    }

    function _wizExit(){
      try{
        _wizSpotClear();
        _wizBoxClose();
        _wiz=null;
        _wizSkipped={}; /* v0.26.0 刀A：退出清零，新一轮重新给机会 */
        refreshUI();
      }catch(e){}
    }

    function _wizFinish(){
      try{
        _wizSpotClear();
        var prog=loadProg();
        var pass=0, held=0;
        if(_list && _list.tasks){
          for(var i=0;i<_list.tasks.length;i++){
            var t=_list.tasks[i];
            if(isSim(t)||isCloud(t)||isWatch(t)) continue;
            for(var j=0;j<(t.steps||[]).length;j++){
              var st=t.steps[j];
              if(stepGreen(prog, t.id, st.id)) pass++;
              else if(stepHeld(prog, t.id, st.id)) held++;
            }
          }
        }
        _wiz=null;
        _wizSkipped={}; /* v0.26.0 刀A：完成清零 */
        _wizBox('这期验收走完啦：过了'+pass+'项，挂号'+held+'项（已传上网，Kimi接班会看到）', [ /* v0.26.0 刀C：总结文案人话 */
          { t:'✕', big:true, bg:'#6b6257', fn:function(){ try{ _wizBoxClose(); refreshUI(); }catch(e){} } }
        ]);
        try{ pushReport(); }catch(e){}
      }catch(e){}
    }

    function _wizAsk(){
      try{
        if(_off() || _wizOff()) return;
        if(!_list || !_list.tasks || !_list.tasks.length) return;
        var prog=loadProg();
        if(allDone(prog)) return;
        var n=0; try{ n=parseInt(localStorage.getItem('hx_chk_wiz_n')||'0',10)||0; }catch(e){ n=0; }
        if(n>=3) return;
        var nx=_wizNext();
        if(!nx) return;
        var un=0;
        for(var i=0;i<_list.tasks.length;i++){
          var t=_list.tasks[i];
          if(!t || !t.steps) continue;
          for(var j=0;j<t.steps.length;j++){
            var s=t.steps[j];
            if(!s) continue;
            var k=String(t.id)+':'+String(s.id);
            if(!prog[k]) un++;
          }
        }
        if(un<=0) return;
        try{ localStorage.setItem('hx_chk_wiz_n', String(n+1)); }catch(e){}
        _wizSkipped={}; /* v0.26.0 刀A：进入向导清零 */
        _wiz={ task:nx.task, step:nx.step };
        _wizStep();
      }catch(e){}
    }

    /* 进向导（🧪钮调用） */
    function startWiz(){
      try{
        if(_off()){ chkToast('验收牌已关（hx_chk_off）'); return; }
        if(_wizOff()){ chkToast('向导已关（hx_chk_wiz_off）'); return; }
        if(!_list || !_list.tasks || !_list.tasks.length){ chkToast('清单还没取到，点🔄刷新试试'); return; }
        var nx=_wizNext();
        if(!nx){ chkToast('这期验收全绿了🎉'); return; }
        _wizSkipped={}; /* v0.26.0 刀A：进入向导清零 */
        _wiz={ task:nx.task, step:nx.step };
        _wizStep();
      }catch(e){}
    }


        /* 初始化 */
    function init(){
      try{
        if(_booted) return; _booted=true;
        if(_off()) return; /* 总退休：不注入不联网（open时toast告知） */
        var boot=function(){
          try{
            if(!ensureUI()) return;
            _list=readCacheList(); /* init先用缓存画 */
            reconcile();
            try{ if(HX.bb && typeof HX.bb.tail==='function'){ var _t50=HX.bb.tail(50); /* Kimi终审翻案2：全卷是大闭包window.HX卷尾才挂，卷内boot期window.HX还没影，必须直认本地HX */ for(var _bi=0;_bi<_t50.length;_bi++){ bbHit(String((_t50[_bi]||{}).k||''), String((_t50[_bi]||{}).m||'')); } } }catch(e){} /* v0.29.0 ③终审翻案：开门心跳先于chk清单就绪会漏命中，_list就绪后补扫bb最近50条账 */
            renderBar(); /* 缺省窄条不显示（没清单/全绿时藏） */
            if(lsGet('hx_chk_wiz_ask')==='1'){ setTimeout(function(){ try{ _wizAsk(); }catch(e){} }, 8000); } /* v0.29.0 ④洪老师拍板撤自动问：默认不弹，hx_chk_wiz_ask='1'才恢复（🧪手动钮不动） */
            if(typeof HX._autoNetOk==='function' && HX._autoNetOk()) fetchList(false); /* 闲时自动拉一次 */
          }catch(e){}
        };
        if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', boot); } else { boot(); } /* 照sj ensureUI自注先例，挂HX即活，不要求宿主调用 */
      }catch(e){}
    }

    if(document.readyState==='loading'){
      document.addEv

  /* ════ 监察员 HX.jc v0.38.0 ════════════════════════════════════════════
   * 权力铁规（写死，不许越）：
   *   1. HX.jc 只读、只记、只报告；无任何写产品数据的口子。
   *   2. 监察员/督查岗不许自查、自改、自勾。
   *   3. 套娃封顶 = 黑匣子 + 三仓对账 + 洪老师看报告；不设第三层督查。
   *   4. 一期只「看」不「动手」：绝不自动点击、绝不自动输入、绝不改数据。
   *   5. AI 只当参谋不当法官：AI 判词仅记录，销号权在 Kimi 云侧，点绿权在洪老师。
   *   6. 总开关 hx_jc_off=1 → 整个 HX.jc 静默全退休，老行为一字不变。
   *   7. 全程静默：不弹窗、不 toast、不打扰；只写黑匣子 + 云端账。
   * ════════════════════════════════════════════════════════════════════ */
  HX.jc = (function () {
    'use strict';
  
    var LS = {
      list: 'hx_jc_list',
      res: 'hx_jc_res',
      up: 'hx_jc_up',
      ledgerUp: 'hx_jc_ledger_up',
      max: 'hx_jc_max',
      off: 'hx_jc_off',
      report: 'hx_jc_report',
      cur: 'hx_jc_cursor' /* v0.54.0刀B：走查游标，轮转取件（t86巡头3件根治） */
    };
    var FILE_LIST = '走查单.json';
    var FILE_REC = '走查记录.json';
    var FILE_LEDGER = '监察台账.json';
    var REPO = 'hongxiaotao177/xuexi-backup';
    var RAW_BASE = 'https://raw.githubusercontent.com/hongxiaotao177/xuexi-backup/main/';
    var API_BASE = 'https://api.github.com/repos/hongxiaotao177/xuexi-backup/contents/';
    var MAX_RUNS = 50;
    var MAX_HIST = 200;
    var LEDGER_BASE = 22;
  
    /* ---------- 小工具（全 try 护栏） ---------- */
    function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
    function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
    function lsGetJSON(k) { try { var s = localStorage.getItem(k); return s ? JSON.parse(s) : null; } catch (e) { return null; } }
    function lsSetJSON(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }
    function bb(k, m) { try { if (HX.bb && typeof HX.bb.log === 'function') HX.bb.log(k, m); } catch (e) {} }
    function bbJob(n, ok, m) { try { if (HX.bb && typeof HX.bb.job === 'function') HX.bb.job(n, ok, m); } catch (e) {} }
    function netOk() { try { return !!(HX._autoNetOk && HX._autoNetOk()); } catch (e) { return false; } }
    function isOff() { return lsGet(LS.off) === '1'; }
    function nowStr() {
      try {
        var d = new Date();
        function p(n) { return (n < 10 ? '0' : '') + n; }
        return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' +
          p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
      } catch (e) { return '' + Date.now(); }
    }
    function clip(s, n) { s = (s == null ? '' : String(s)); return s.length > n ? s.slice(0, n) : s; }
    function hasShell() {
      try { return typeof LearnShell !== 'undefined' && LearnShell && typeof LearnShell.readFile === 'function'; } catch (e) { return false; }
    }
    function shellRead(name) {
      try {
        if (!hasShell()) return null;
        var r = LearnShell.readFile(name);
        if (r && typeof r.then === 'function') return r;
        return r;
      } catch (e) { return null; }
    }
    function shellWrite(name, b64) {
      try {
        if (!hasShell() || typeof LearnShell.writeFile !== 'function') return;
        LearnShell.writeFile(name, b64);
      } catch (e) {}
    }
  
    /* ---------- 走查单拉取：双腿三兜底 ---------- */
    function fetchList(cb) {
      var done = false;
      function fin(src, text) {
        if (done) return; done = true;
        if (!text) { cb(null, null); return; }
        var obj = null;
        try { obj = JSON.parse(text); } catch (e) { obj = null; }
        if (!obj || !obj.items || !obj.items.length) { cb(null, null); return; }
        lsSetJSON(LS.list, obj);
        cb(obj, src);
      }
      // 腿① 坚果云
      try {
        if (HX.dav && typeof HX.dav.downFile === 'function') {
          var p1 = HX.dav.downFile('/学习套装备份/' + FILE_LIST, 'hx_jc_dl.json');
          if (p1 && typeof p1.then === 'function') {
            p1.then(function (t) { if (t) fin('dav', t); else leg2(); }, function () { leg2(); });
          } else { leg2(); }
        } else { leg2(); }
      } catch (e) { leg2(); }
  
      function leg2() {
        if (done) return;
        try {
          var tok = '';
          try { if (HX.keys && HX.keys.gh) tok = (HX.keys.gh() || {}).tok || ''; } catch (e) {}
          var url = API_BASE + encodeURIComponent(FILE_LIST);
          var opt = { headers: {} };
          if (tok) opt.headers.Authorization = 'token ' + tok;
          fetch(url, opt).then(function (r) { return r.json(); }).then(function (j) {
            if (done) return;
            if (j && j.content) {
              var txt = '';
              try { txt = HX.gh && HX.gh.b64dec ? HX.gh.b64dec(j.content.replace(/\s/g, '')) : atob(j.content.replace(/\s/g, '')); } catch (e) { txt = ''; }
              if (txt) { fin('api', txt); return; }
            }
            leg3();
          }).catch(function () { leg3(); });
        } catch (e) { leg3(); }
      }
      function leg3() {
        if (done) return;
        try {
          fetch(RAW_BASE + encodeURIComponent(FILE_LIST)).then(function (r) { return r.text(); }).then(function (t) {
            if (done) return;
            if (t) fin('raw', t); else cache();
          }).catch(function () { cache(); });
        } catch (e) { cache(); }
      }
      function cache() {
        if (done) return;
        var c = lsGetJSON(LS.list);
        if (c && c.items && c.items.length) { done = true; cb(c, 'cache'); }
        else { done = true; cb(null, null); }
      }
    }
  
    /* ---------- 步骤算子（全读型） ---------- */
    function stepSee(sel) {
      try {
        var el = document.querySelector(sel);
        if (!el) return { ok: false, act: '元素缺失' };
        var vis = false;
        try {
          if (el.offsetParent !== null) vis = true;
          else {
            var r = el.getBoundingClientRect();
            if (r && (r.width > 0 || r.height > 0)) vis = true;
          }
        } catch (e) {}
        if (!vis) return { ok: false, act: '元素存在但不可见' };
        return { ok: true, act: '可见' };
      } catch (e) { return { ok: false, act: '选择器异常' }; }
    }
    function stepSeeText(spec) {
      try {
        var i = spec.indexOf('=');
        if (i < 0) return { ok: false, act: 'seeText格式错' };
        var sel = spec.slice(0, i), want = spec.slice(i + 1);
        var el = document.querySelector(sel);
        if (!el) return { ok: false, act: '元素缺失' };
        var txt = el.textContent || '';
        if (txt.indexOf(want) >= 0) return { ok: true, act: clip(txt, 80) };
        return { ok: false, act: '读到「' + clip(txt, 80) + '」' };
      } catch (e) { return { ok: false, act: '选择器异常' }; }
    }
    function stepLs(spec) {
      try {
        var i = spec.indexOf('=');
        var key = i < 0 ? spec : spec.slice(0, i);
        var want = i < 0 ? null : spec.slice(i + 1);
        var v = lsGet(key);
        if (v == null || v === '') return { ok: false, act: '键「' + key + '」空' };
        if (want != null && v !== want) return { ok: false, act: '键「' + key + '」=「' + clip(v, 40) + '」' };
        return { ok: true, act: clip(v, 40) };
      } catch (e) { return { ok: false, act: 'ls异常' }; }
    }
    function stepFile(name, cb) {
      if (!hasShell()) { cb({ ok: true, skip: true, act: '无壳桥跳过' }); return; }
      try {
        var r = shellRead(name);
        if (r && typeof r.then === 'function') {
          r.then(function (t) {
            if (t && String(t).length) cb({ ok: true, act: '读到' + String(t).length + '字' });
            else cb({ ok: false, act: '读不到内容' });
          }, function () { cb({ ok: false, act: '读文件异常' }); });
        } else {
          if (r && String(r).length) cb({ ok: true, act: '读到' + String(r).length + '字' });
          else cb({ ok: false, act: '读不到内容' });
        }
      } catch (e) { cb({ ok: false, act: '读文件异常' }); }
    }

    /* ---------- has 探测算子（v0.50.0 A1走查扩容：只读方括号逐段取，禁eval/Function） ---------- */
    function stepHas(spec) {
      try {
        if (typeof spec !== 'string' || spec.indexOf('HX.') !== 0) {
          return { ok: false, act: 'has格式错' };
        }
        var segs = spec.split('.');
        var i;
        for (i = 0; i < segs.length; i++) {
          if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(segs[i])) {
            return { ok: false, act: 'has格式错' };
          }
        }
        var cur = window;
        var walked = '';
        for (i = 0; i < segs.length; i++) {
          walked = walked ? walked + '.' + segs[i] : segs[i];
          cur = cur[segs[i]];
          if (typeof cur === 'undefined') {
            return { ok: false, act: '缺「' + walked + '」' };
          }
        }
        return { ok: true, act: '在' };
      } catch (e) {
        return { ok: false, act: 'has异常' };
      }
    }

    /* ---------- vision 快照 ---------- */
    function visionSnap(sel, cb) {
      var snap = { title: '', html: '', rect: null, vis: false };
      try { snap.title = document.title || ''; } catch (e) {}
      try {
        var el = sel ? document.querySelector(sel) : null;
        if (el) {
          snap.html = clip(el.outerHTML || '', 200);
          try {
            var r = el.getBoundingClientRect();
            snap.rect = { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) };
          } catch (e) {}
          try { snap.vis = (el.offsetParent !== null) || (snap.rect && (snap.rect.w > 0 || snap.rect.h > 0)); } catch (e) {}
        }
      } catch (e) {}
      var usr = '页面标题：' + snap.title + '\n元素HTML前200字：' + snap.html +
        '\n位置尺寸：' + JSON.stringify(snap.rect) + '\n是否可见：' + (snap.vis ? '是' : '否');
      try {
        if (!(HX.chat && typeof HX.chat.pump === 'function')) { cb(null); return; }
        HX.chat.pump('你是界面验收参谋，只答：正常/不正常+一句30字内理由', usr, {}, function (ok, text) {
          if (ok && text) cb(String(text)); else cb(null);
        });
      } catch (e) { cb(null); }
    }
  
    /* ---------- 病根分析 ---------- */
    function aiDiagnose(item, step, act, cb) {
      var usr = '走查件「' + (item.title || item.id) + '」卡在步骤「' + (step.say || step.id) + '」。' +
        '本该看见：' + (step.say || '') + '；实际见闻：' + act;
      try {
        if (!(HX.chat && typeof HX.chat.pump === 'function')) { cb(null); return; }
        HX.chat.pump('你是代码侦探，一句50字内说最可能的病根', usr, {}, function (ok, text) {
          if (ok && text) cb(String(text)); else cb(null);
        });
      } catch (e) { cb(null); }
    }
  
    /* ---------- 单步执行 ---------- */
    function runStep(step, cb) {
      var t = step.see != null ? 'see' : step.seeText != null ? 'seeText' :
        step.ls != null ? 'ls' : step.file != null ? 'file' : step.lsKey != null ? 'lsKey' :
        step.has != null ? 'has' : null;
      if (!t) { cb({ ok: false, act: '未知步骤算子' }); return; }
      if (t === 'see') { cb(stepSee(step.see)); return; }
      if (t === 'seeText') { cb(stepSeeText(step.seeText)); return; }
      if (t === 'ls') { cb(stepLs(step.ls)); return; }
      if (t === 'lsKey') { cb(stepLs(step.lsKey)); return; }
      if (t === 'file') { stepFile(step.file, cb); return; }
      if (t === 'has') { cb(stepHas(step.has)); return; }
    }
  
    /* ---------- 单件执行 ---------- */
    function runItem(item, cb) {
      var steps = item.steps || [];
      var out = { id: item.id, ok: true, steps: [], visionFlag: 0, aiSay: '' };
      var i = 0;
      function next() {
        if (i >= steps.length) { cb(out); return; }
        var st = steps[i++];
        runStep(st, function (r) {
          var rec = { id: st.id, ok: !!r.ok, act: r.act || '' };
          if (r.skip) rec.skip = 1;
          out.steps.push(rec);
          if (!r.ok && !r.skip) {
            out.ok = false;
            bb('jc', '卡:' + item.id + '/' + st.id + ':本该「' + (st.say || '') + '」实际「' + (r.act || '') + '」');
            /* 【Kimi终审翻案1+3】卡件跳下一件不纠缠：aiDiagnose后直接cb(out)收尾，不走本件剩余步；rec越界引用一并修（afterStep改传参） */
            aiDiagnose(item, st, r.act || '', function (say) {
              if (say) out.aiSay = clip(say, 300);
              cb(out);
            });
            return;
          }
          afterStep(st, r, rec);
        });
      }
      function afterStep(st, r, rec) { /* 【Kimi终审翻案1】rec由调用点传入，原稿引用回调局部变量必炸ReferenceError */
        if (st.vision === 1) {
          var sel = st.see || (st.seeText ? String(st.seeText).split('=')[0] : '');
          visionSnap(sel, function (say) {
            if (say) {
              try { rec.visionSay = clip(say, 300); } catch (e) {}
              if (say.indexOf('不正常') >= 0) out.visionFlag = 1;
            } else {
              bb('jc', 'vision泵没通');
            }
            next();
          });
        } else {
          next();
        }
      }
      next();
    }
  
    /* ---------- 结果账 ---------- */
    function saveRes(ver, runs) {
      var old = lsGetJSON(LS.res) || { ver: '', t: '', runs: [] };
      if (String(old.ver || '') !== String(ver)) old = { ver: ver, t: '', runs: [] }; /* 【Kimi终审翻案4】SPEC定ver变旧结果作废，原稿漏 */
      var all = (old.runs || []).concat(runs);
      if (all.length > MAX_RUNS) all = all.slice(all.length - MAX_RUNS);
      var res = { ver: ver, t: nowStr(), runs: all };
      lsSetJSON(LS.res, res);
      try { shellWrite('hxdata_hx_jc.json', HX.gh && HX.gh.b64enc ? HX.gh.b64enc(JSON.stringify(res)) : ''); } catch (e) {}
      return res;
    }
  
    /* ---------- 上行 ---------- */
    function pushFile(path, content, mirrorKey, msg) {
      try {
        if (!netOk()) return;
        if (!(HX.gh && typeof HX.gh.putFile === 'function')) return;
        var prev = lsGet(mirrorKey);
        if (prev === content) return;
        var p = HX.gh.putFile(null, path, content, msg);
        if (p && typeof p.then === 'function') {
          p.then(function () { lsSet(mirrorKey, content); }, function () { bb('err', 'jc上行失败:' + path); });
        }
      } catch (e) { bb('err', 'jc上行异常:' + path); }
    }
  
    function pushRecord(res) {
      try {
        var txt = JSON.stringify(res);
        pushFile(FILE_REC, txt, LS.up, '监察员走查记录');
      } catch (e) {}
    }
  
    /* ---------- 积压数 ---------- */
    function calcBacklog() {
      try {
        var prog = lsGetJSON('hx_chk_prog');
        var list = lsGetJSON('hx_chk_list');
        if (!list || !list.tasks) return -1;
        var tasks = list.tasks;
        var n = 0;
        for (var i = 0; i < tasks.length; i++) {
          var t = tasks[i];
          if (!t || !t.id) continue;
          var _ln = String(t.lane || ''); if (_ln === 'sim' || _ln === 'cloud' || _ln === 'watch') continue; /* 【Kimi终审翻案2】清单真字段是lane（照HX.chk isSim/isCloud/isWatch），原稿编了t.sim/t.cloud/t.watch不存在的字段 */
          var steps = t.steps || [];
          var allGreen = steps.length > 0;
          for (var j = 0; j < steps.length; j++) {
            var sid = steps[j].id;
            if (!(prog && prog[t.id] && prog[t.id][sid] === 1)) { allGreen = false; break; }
          }
          if (!allGreen) n++;
        }
        return n;
      } catch (e) { return -1; }
    }
  
    /* ---------- 监察台账 ---------- */
    function appendLedger(zou, guo, ka) {
      try {
        var led = lsGetJSON('hx_jc_ledger') || { base: LEDGER_BASE, hist: [] };
        if (!led.base) led.base = LEDGER_BASE;
        if (!led.hist) led.hist = [];
        var jiya = calcBacklog();
        led.hist.push({ t: nowStr(), zou: zou, guo: guo, ka: ka, jiya: jiya });
        if (led.hist.length > MAX_HIST) led.hist = led.hist.slice(led.hist.length - MAX_HIST);
        lsSetJSON('hx_jc_ledger', led);
        var txt = JSON.stringify(led);
        pushFile(FILE_LEDGER, txt, LS.ledgerUp, '监察台账');
        return led;
      } catch (e) { return null; }
    }
  
    /* ---------- 一轮走查 ---------- */
    var running = false;
    function runRound(cb) {
      if (running) { if (cb) cb({ ok: false, msg: '正在走查' }); return; }
      if (isOff()) { if (cb) cb({ ok: false, msg: '总开关退休' }); return; }
      if (!netOk()) { if (cb) cb({ ok: false, msg: '联网闸门未开' }); return; }
      running = true;
      fetchList(function (list, src) {
        if (!list) {
          bb('jc', '走查单没取到');
          running = false;
          if (cb) cb({ ok: false, msg: '走查单没取到' });
          return;
        }
        var maxN = 3;
        try { var m = parseInt(lsGet(LS.max), 10); if (m > 0) maxN = m; } catch (e) {}
        var all = (list.items || []); /* v0.54.0刀B：轮转取件替换slice头3件（t86） */
        var total = all.length;
        var cur = parseInt(lsGet(LS.cur), 10);
        if (!(cur >= 0) || cur >= total) cur = 0;
        var items = [];
        for (var k = 0; k < maxN && k < total; k++) { items.push(all[(cur + k) % total]); }
        lsSet(LS.cur, String((cur + maxN) % Math.max(total, 1)));
        var ver = list.ver || '';
        var runs = [];
        var idx = 0;
        var zou = 0, guo = 0, ka = 0;
        function nextItem() {
          if (idx >= items.length) {
            var res = saveRes(ver, runs);
            pushRecord(res);
            appendLedger(zou, guo, ka);
            running = false;
            bbJob('jc走查', true, '走' + zou + '过' + guo + '卡' + ka);
            if (cb) cb({ ok: true, zou: zou, guo: guo, ka: ka, res: res });
            return;
          }
          var it = items[idx++];
          runItem(it, function (out) {
            runs.push(out);
            zou++;
            if (out.ok) guo++; else ka++;
            setTimeout(nextItem, 5000);
          });
        }
        nextItem();
      });
    }
  
    /* ---------- health ---------- */
    function health() {
      var res = lsGetJSON(LS.res) || { runs: [] };
      var runs = res.runs || [];
      var zou = runs.length, guo = 0, ka = 0;
      for (var i = 0; i < runs.length; i++) { if (runs[i].ok) guo++; else ka++; }
      var tongguo = zou > 0 ? Math.round(guo * 100 / zou) : 0;
      return {
        zou: zou, guo: guo, ka: ka, tongguo: tongguo,
        loujian: 0, jiya: calcBacklog()
      };
    }
  
    /* ---------- report ---------- */
    function report(cb) {
      var res = lsGetJSON(LS.res) || { runs: [] };
      var led = lsGetJSON('hx_jc_ledger') || { base: LEDGER_BASE, hist: [] };
      var h = health();
      var material = { health: h, res: res, ledger: led, t: nowStr() };
      var usr = '监察员走查材料：' + JSON.stringify(material).slice(0, 2000) +
        '\n请起草一段人话健康度报告草稿，200字内。';
      try {
        if (!(HX.chat && typeof HX.chat.pump === 'function')) {
          lsSetJSON(LS.report, { t: nowStr(), material: material, draft: '' });
          if (cb) cb({ ok: false, msg: '泵不可用，只留材料' });
          return;
        }
        HX.chat.pump('你是监察报告起草员，写人话健康度报告草稿', usr, {}, function (ok, text) {
          if (ok && text) {
            lsSetJSON(LS.report, { t: nowStr(), material: material, draft: String(text) });
            if (cb) cb({ ok: true, draft: String(text) });
          } else {
            lsSetJSON(LS.report, { t: nowStr(), material: material, draft: '' });
            if (cb) cb({ ok: false, msg: '泵没通，只留材料' });
          }
        });
      } catch (e) {
        lsSetJSON(LS.report, { t: nowStr(), material: material, draft: '' });
        if (cb) cb({ ok: false, msg: '异常，只留材料' });
      }
    }
  
    /* ---------- res 读取 ---------- */
    function res() { return lsGetJSON(LS.res) || { ver: '', t: '', runs: [] }; }
  
    /* ---------- boot：开门闲时 60 秒起跑 ---------- */
    function boot() {
      try {
        if (isOff()) return;
        setTimeout(function () {
          try {
            if (isOff()) return;
            if (!netOk()) return;
            runRound(null);
          } catch (e) { bb('err', 'jc boot异常'); }
        }, 60000);
      } catch (e) {}
    }
    try {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
      } else {
        boot();
      }
    } catch (e) {}
  
    function wzBbTail(n){ /* v0.43.0 t69刀1 */ try{ return HX.bb && HX.bb.tail ? HX.bb.tail(n||20) : []; }catch(e){ return []; } }
    function wzLayout(){ /* v0.43.0 t69刀1 */ var out={vw:0,vh:0,docH:0,url:'',title:'',els:[]}; try{ out.vw=window.innerWidth; }catch(e){} try{ out.vh=window.innerHeight; }catch(e){} try{ out.docH=document.body?document.body.scrollHeight:0; }catch(e){} try{ out.url=String(location.href||''); }catch(e){} try{ out.title=String(document.title||''); }catch(e){} try{ var ids=['hxSjPanel','hxSjText','hxSjDot','relList','updLine']; for(var i=0;i<ids.length;i++){ try{ var el=document.getElementById(ids[i]); if(el){ var r=el.getBoundingClientRect(); out.els.push({id:ids[i],top:r.top,bottom:r.bottom,h:r.height}); } }catch(e1){} } }catch(e){} return out; }
    function wzCur(){ /* v0.43.0 t69刀1 */ var out={hxv:'',verall:'',ua:''}; try{ out.hxv=(typeof HX_COMMON_VERSION!=='undefined')?HX_COMMON_VERSION:''; }catch(e){} try{ out.verall=lsGet('hx_verall_cache')||''; }catch(e){} try{ out.ua=String(navigator.userAgent||''); }catch(e){} return out; }
    return { run: runRound, health: health, report: report, res: res, wzBbTail: wzBbTail, wzLayout: wzLayout, wzCur: wzCur }; /* v0.43.0 t69刀1 问诊室三只读算子 */
  })();
  

      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }

    function open(){ /* Kimi终审翻案：DS漏交open()，照v0.24.5原文补回 */
      try{
        if(_off()){ chkToast('验收牌已关（hx_chk_off）'); return; }
        if(!ensureUI()){ chkToast('页面还没备好，稍候再点'); return; }
        if(!_list || !_list.tasks || !_list.tasks.length){ openPage(); return; }
        if(allDone(loadProg())){ chkToast('这期验收全绿了🎉'); return; }
        renderBar();
        openPage();
      }catch(e){}
    }
    function reload(){ /* Kimi终审翻案：DS漏交reload()，照v0.24.5原文补回 */
      try{
        if(_off()){ chkToast('验收牌已关（hx_chk_off）'); return; }
        fetchList(true);
      }catch(e){}
    }

    return { init:init, open:open, reload:reload, bbHit:bbHit }; /* v0.29.0 */
  })();

  HX.sj = (function(){
    var sj = {};
    var HX_SJ_APP = '';       /* 速记：本软件名，init 时各软件传自己的名 */
    var sjGetCtx = null;      /* 可选：各软件附加上下文（如当前卡片/病人） */
    var sjExtraBtn = null;    /* v0.1.1 可选：extraBtn:{label:'补充上一条'}——面板多一钮，把话接到最后一行末尾（大管家#43原文逻辑） */
    var sjPendImg = '';      /* v0.11.1 待挂图文件名：选了图还没点「记下」，空=没挂 */
    var sjImgPicking = false; /* v0.12.2 选图在途闸（挂号#95）：true=图库窗口已开，防X5重放手势再弹 */
    var inited = false;
    function $(id){ return document.getElementById(id); }
    function bridged(){ try{ return !!(window.LearnShell&&LearnShell.folderSet&&LearnShell.folderSet()); }catch(e){ return false; } }
    function b64e(s){ return btoa(unescape(encodeURIComponent(s))); }
    function b64d(s){ try{ return decodeURIComponent(escape(atob(s))); }catch(e){ try{ return atob(s); }catch(e2){ return ''; } } }
    function pad(n){ return (n<10?'0':'')+n; }

    /* 速记自动上行（2026-09-10 洪老师拍板：记下的东西自动到网上，AI接班自己看，不许手动传）：
       记下成功+开门闲时各对账一次——整份「速记流水.txt」PUT到仓根目录同名文件（整份覆盖，没网漏掉的行下回自动补）；
       钥匙抄公共钱罐hx_gh_*（全家共享那套），没钥匙/没网静默跳过不打搅；上行成功才记hx_sj_uplocal对账，内容没变不重复推 */
    var SJ_FILE='想法流水.txt', SJ_FILE_OLD='速记流水.txt';
    function sjGhKeys(){ try{ return HX.keys.gh(); }catch(e){ return null; } }
    function sjReadFlow(){
      try{
        if(!bridged()) return '';
        var b=LearnShell.readFile(SJ_FILE);
        if(b){ var t1=b64d(b); if(t1) return t1; }
        var b2=LearnShell.readFile(SJ_FILE_OLD);
        if(b2){ var t2=b64d(b2); if(t2) return t2; }
        return '';
      }catch(e){ return ''; }
    }
    function sjUpload(fromUser){
      try{
        if(!bridged()) return;
        var g=sjGhKeys();
        if(!g||!window.fetch){
          if(fromUser){ try{ sjToast('⚠️ 想法没传上去（没钥匙或没网），已存在手机里，下回自动补'); }catch(e0){} }
          return;
        }
        var txt=sjReadFlow(); if(!txt) return;
        if(txt===localStorage.getItem('hx_sj_uplocal')) return;
        var api='https://api.github.com/repos/'+encodeURIComponent(g.u)+'/'+encodeURIComponent(g.r)+'/contents/'+encodeURIComponent(SJ_FILE);
        var H={'Authorization':'token '+g.t,'Accept':'application/vnd.github+json'};
        fetch(api,{headers:H}).then(function(resp){ if(resp.status===404) return {sha:null}; if(!resp.ok) throw 0; return resp.json(); }).then(function(j){
          var body={message:'速记自动上行 '+HX_SJ_APP, content:b64e(txt)};
          if(j&&j.sha) body.sha=j.sha;
          return fetch(api,{method:'PUT',headers:H,body:JSON.stringify(body)});
        }).then(function(resp){ if(!resp.ok) throw 0; return resp.json(); }).then(function(){
          try{ localStorage.setItem('hx_sj_uplocal',txt); }catch(e){}
        }).catch(function(){
          if(fromUser){ try{ sjToast('⚠️ 想法没传上去（没钥匙或没网），已存在手机里，下回自动补'); }catch(e1){} }
        });
        try{ sjImgUpload(); }catch(e){} /* v0.10.0 顺带清hx_sjimg_pend队列：逐件upFile，成功出队失败留 */
      }catch(e){
        if(fromUser){ try{ sjToast('⚠️ 想法没传上去（没钥匙或没网），已存在手机里，下回自动补'); }catch(e2){} }
      }
    }
    /* v0.10.0 📷附图：localStorage队列hx_sjimg_pend（JSON数组存文件名），上传成功出队、失败留队下回补 */
    function sjImgQueue(fn, rm){
      var q=[]; try{ q=JSON.parse(localStorage.getItem('hx_sjimg_pend')||'[]'); }catch(e){ q=[]; }
      if(rm){ var n=[]; for(var i=0;i<q.length;i++){ if(q[i]!==rm) n.push(q[i]); } q=n; }
      else if(fn){ q.push(fn); }
      try{ localStorage.setItem('hx_sjimg_pend', JSON.stringify(q)); }catch(e){}
      return q;
    }
    /* 逐件upFile到坚果云/学习套装数据/速记图/：成功出队，失败留队 */
    function sjImgUpload(){
      try{
        if(!(HX.dav && typeof HX.dav.upFile==='function')) return;
        var q=sjImgQueue();
        (function next(i){
          if(i>=q.length) return;
          var fn=q[i];
          try{
            HX.dav.upFile(fn, '/学习套装数据/速记图/').then(function(r){
              try{ if(r && String(r).indexOf('err:')!==0){ sjImgQueue(null, fn); sjImgMarkCloud(fn); } }catch(e){}
              next(i+1);
            }, function(){ next(i+1); });
          }catch(e){ next(i+1); }
        })(0);
      }catch(e){}
    }
    /* v0.11.1 图传上坚果云后回写流水：找到含「附图 文件名」且还没标☁的行，图名后补☁（一句替换，原话一字不动），写回后顺手上行 */
    function sjImgMarkCloud(fn){
      try{
        if(!bridged()) return;
        var txt=sjReadFlow(); if(!txt) return;
        var tag='附图 '+fn;
        if(txt.indexOf(tag+'☁')>=0) return;
        if(txt.indexOf(tag)<0) return;
        var neu=txt.replace(tag, tag+'☁');
        LearnShell.writeFile(SJ_FILE, b64e(neu));
        try{ localStorage.setItem('hx_sj_uplocal',''); }catch(e){} /* 内容变了，逼sjUpload重推 */
        try{ sjUpload(); }catch(e){}
      }catch(e){}
    }
    /* v0.11.1 挂图行显隐：fn空=藏，有字=显示「🖼已挂图 文件名（✕撤销）」 */
    function sjImgLineShow(fn){
      try{
        var el=$('hxSjImgLine'); if(!el) return;
        if(!fn){ el.style.display='none'; el.innerHTML=''; return; }
        el.innerHTML='🖼已挂图 '+fn+' <button id="hxSjImgUndo" type="button" style="flex:none;font-size:13px;padding:2px 8px;background:#efe9df;color:#6b6257;border:none;border-radius:8px;cursor:pointer">✕撤销</button>　<span style="color:#8a7f70">写完说明点「记下」一起存</span>';
        el.style.display='block';
        var ub=$('hxSjImgUndo');
        if(ub) ub.addEventListener('click', function(){
          try{ var f=sjPendImg; sjPendImg=''; sjImgLineShow('');
            if(f){ try{ sjImgQueue(null, f); }catch(e){} try{ LearnShell.deleteFile(f); }catch(e){} }
            sjToast('图已撤销，没存');
          }catch(e){}
        });
      }catch(e){}
    }
    /* v0.10.0 📷附图：读文件→Image→canvas压到宽≤1280（等比）→jpeg0.72→存壳sjimg_YYYYMMDD_HHMMSS.jpg+流水行尾挂图+入队试传 */
    function saveImg(file){
      try{
        if(!bridged()){ try{ $('hxSjHint').style.display='block'; }catch(e){} sjToast('请在手机壳里用'); return; }
        var sjWd=setTimeout(function(){ sjWd=null; try{ sjToast('图太大或没存成，换一张试试',4000); }catch(e){} sjImgPicking=false; },15000); /* v0.12.2 挂号#95：15秒看门狗——读图+解码+存壳超时没完报明白话并复位闸 */
        var sjWdDone=function(){ if(sjWd){ clearTimeout(sjWd); sjWd=null; } sjImgPicking=false; };
        var objUrl='';
        try{ if(window.URL&&URL.createObjectURL) objUrl=URL.createObjectURL(file); }catch(e0){ objUrl=''; } /* v0.12.2 createObjectURL优先：X5对大dataURL解码易哑；不可用走FileReader老路 */
        var startImg=function(src){
          try{
            var img=new Image();
            img.onload=function(){
              try{
                if(objUrl){ try{ URL.revokeObjectURL(objUrl); }catch(e){} objUrl=''; }
                var w=img.width, h=img.height;
                if(w>1280){ h=Math.round(h*1280/w); w=1280; }
                var cv=document.createElement('canvas'); cv.width=w; cv.height=h;
                cv.getContext('2d').drawImage(img,0,0,w,h);
                var b64=String(cv.toDataURL('image/jpeg',0.72)).replace(/^data:[^;]*;base64,/,'');
                var d=new Date();
                var fn='sjimg_'+d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+'_'+pad(d.getHours())+pad(d.getMinutes())+pad(d.getSeconds())+'.jpg';
                LearnShell.writeFile(fn, b64);
                /* v0.11.1 改两步走（#94洪老师拍板A）：选图不再立刻记行/清框/关面板——只挂图，说明照写，点「记下」图随话进流水 */
                sjPendImg=fn; sjImgLineShow(fn);
                try{ var _ta=$('hxSjText'); if(_ta) _ta.blur(); }catch(e){} /* v0.15.2（挂号#128）：挂图后主动放下输入框焦点——选图回来键盘不再自弹，面板稳在原地 */
                sjToast('图已挂上，写完说明点「记下」');
                sjImgQueue(fn); /* 图存成先入队 */
                try{ sjImgUpload(); }catch(e){} /* 立刻尝试上传坚果云速记图/，失败留队 */
                sjWdDone(); /* v0.12.2 正常完成清看门狗 */
              }catch(e){ sjWdDone(); sjToast('图没存成'); }
            };
            img.onerror=function(){ sjWdDone(); if(objUrl){ try{ URL.revokeObjectURL(objUrl); }catch(e){} objUrl=''; } sjToast('图读不出来'); };
            img.src=src;
          }catch(e){ sjWdDone(); sjToast('图没存成'); }
        };
        if(objUrl){ startImg(objUrl); }
        else{
          var fr=new FileReader(); /* v0.12.2 fallback：createObjectURL不可用时走老dataURL路 */
          fr.onload=function(){ startImg(String(fr.result||'')); };
          fr.onerror=function(){ sjWdDone(); sjToast('图读不出来'); };
          fr.readAsDataURL(file);
        }
      }catch(e){ sjToast('图没存成'); }
    }
    function sjToast(m,ms){ var t=$('hxSjToast'); if(!t) return; t.innerHTML=''; t.appendChild(document.createTextNode(String(m==null?'':m))); t.style.display='block'; clearTimeout(t._t);
      var off=false; try{ off=(localStorage.getItem('hx_toast_sticky_off')==='1'); }catch(e){ off=false; }
      if(off){ t._t=setTimeout(function(){ t.style.display='none'; },(ms||2200)); return; }
      hxToastHold(t, function(){ t.style.display='none'; });
    } /* v0.11.1 加可选时长：回执长话给足时间看；v0.18.1 刀4 默认不自动消失，点别处或✕才消失 */
    /* v0.34.0（2026-10-18，真机报输入框顶天）：键盘弹起时面板自动抬到键盘上方 */
    function sjKbFit(){
      try{
        var p=$('hxSjPanel'); if(!p) return;
        var vv=window.visualViewport;
        if(!vv) return; /* 老浏览器没这接口就保持老样，不折腾 */
        var kbOut=(window.innerHeight - vv.height)>80; /* v0.64.0：键盘弹没弹只看可视高被吃掉多少，不看offsetTop——X5整页上推模式offsetTop≈键盘高，老算法occl=innerHeight-vv.height-offsetTop≈0误判没弹→还原bottom:150→面板被上推的版面顶出屏幕顶（t102洪老师10-24 12:58真机截图三翻同尺） */
        if(kbOut){ /* 键盘弹着：v0.72.0 t123 刀3钉顶改贴键盘上方（想法10-26 08:05/10:09「还是顶了天」四犯根治）——面板底贴可视区底上8px，量不到高或比可视区还高才退钉顶；hx_sj_kbfit_off=1退v0.64.0老钉顶法 */
          var _kbOff=false; try{ _kbOff=(localStorage.getItem('hx_sj_kbfit_off')==='1'); }catch(eK){}
          if(_kbOff){
            p.style.top=(vv.offsetTop+8)+'px';
            p.style.bottom='auto';
            p.style.maxHeight=(vv.height-16)+'px';
          }else{
            var _ph=p.offsetHeight||0;
            var _wantTop=vv.offsetTop+vv.height-8-_ph;
            if(_ph<=0 || _wantTop<vv.offsetTop+8){ /* 比可视区还高：退钉顶+限高内部滚 */
              p.style.top=(vv.offsetTop+8)+'px';
              p.style.maxHeight=(vv.height-16)+'px';
            }else{
              p.style.top=_wantTop+'px';
              p.style.maxHeight='';
            }
            p.style.bottom='auto';
          }
        }else{ /* 键盘收了：三行全还原CSS默认 */
          p.style.top='';
          p.style.bottom='';
          p.style.maxHeight='';
        }
      }catch(e){}
    }
    function openPanel(){ var p=$('hxSjPanel'); if(!p) return; p.style.display=(p.style.display==='block')?'none':'block'; if(p.style.display==='block'){ $('hxSjHint').style.display=bridged()?'none':'block'; /* v0.15.2（挂号#128，洪老师2026-09-19真机报+拍板）：开面板不再自动focus输入框——键盘不自己弹，面板就不会被顶出屏幕；想打字点一下框键盘才来 */ } }
    function save(){
      var ta=$('hxSjText'); var v=(ta.value||'').replace(/^\s+|\s+$/g,'');
      if(!v){ sjToast('先写一句再记'); return; }
      if(!bridged()){ $('hxSjHint').style.display='block'; sjToast('请在手机壳里用'); return; }
      var d=new Date();
      var ts=d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+pad(d.getHours())+':'+pad(d.getMinutes());
      var ctx='';
      try{ var pt=localStorage.getItem('hx_gj_curpt'); if(pt){ pt=String(pt).replace(/^["']+|["']+$/g,''); if(pt && (lsGet('hx_sj_ctx_off')==='1' || String(HX_SJ_APP||'').indexOf('管家')>=0)) ctx+='　病人:'+pt; } }catch(e){} /* t126刀1：仅病人大管家页面贴「病人:」，其余页面不贴治张冠李戴；hx_sj_ctx_off=1落回老行为 */
      try{ var t=(document.title||'').replace(/^\s+|\s+$/g,''); if(t) ctx+='　页面:'+t; }catch(e){}
      try{ if(sjGetCtx){ var c=sjGetCtx(); if(c) ctx+=String(c); } }catch(e){} /* 各软件自加上下文，出错不碍速记 */
      var imgBit=''; /* v0.11.1：有挂图则行尾补「📷附图 文件名」，传过网的带☁ */
      if(sjPendImg){
        var q0=[]; try{ q0=JSON.parse(localStorage.getItem('hx_sjimg_pend')||'[]'); }catch(e){ q0=[]; }
        var inQ=false; for(var qi=0;qi<q0.length;qi++){ if(q0[qi]===sjPendImg){ inQ=true; break; } }
        imgBit=(v?'　':'')+'📷附图 '+sjPendImg+(inQ?'':'☁');
      }
      var line='['+ts+'] 【'+HX_SJ_APP+'】'+v+imgBit+ctx;
      var old='';
      try{ old=sjReadFlow(); }catch(e){ old=''; }
      var neu=old+((old&&old.charAt(old.length-1)!=='\n')?'\n':'')+line+'\n';
      try{
        var hadImg=sjPendImg; /* v0.11.1 记下前留一份，回执要用 */
        LearnShell.writeFile(SJ_FILE, b64e(neu));
        if(hadImg){ sjToast('已记下+图：图存手机壳里 '+hadImg+'，联网后传坚果云/学习套装数据/速记图/，传成行尾标☁', 6000); sjPendImg=''; sjImgLineShow(''); }
        else sjToast('已记下');
        try{ sjUpload(true); }catch(e){} /* v0.18.1 刀3：记下触发的上行带fromUser=true，失败弹明白话；原下一行无参重复调用删除（跑两遍没意义） */
        ta.value=''; /* v0.22.0 挂B：记下成功顺手清空输入框 */
        $('hxSjPanel').style.display='none'; /* v0.24.2 刀3（洪老师10-14真机报「记完还要再点关闭」）：记下成功自动关面板，照appendLast同款先例 */
      }catch(e){ sjToast('没存成：'+e.message); } /* v0.24.2 刀3：失败不关面板留着改 */
    }
    /* v0.1.1 extraBtn「补充上一条」（大管家 v0.19.0 #43 洪老师速记14:04"可以给上一条补充内容"，原文逻辑一字未改）：
       不开新行，把话以「　补充：」追加到速记流水.txt最后一行末尾；没有上一条提示先记 */
    function appendLast(){
      var ta=$('hxSjText'); var v=(ta.value||'').replace(/^\s+|\s+$/g,'');
      if(!v){ sjToast('先写一句再补充'); return; }
      if(!bridged()){ $('hxSjHint').style.display='block'; sjToast('请在手机壳里用'); return; }
      var old='';
      try{ old=sjReadFlow(); }catch(e){ old=''; }
      old=old.replace(/\s+$/,'');
      if(!old){ sjToast('还没有上一条，先点「记下」'); return; }
      var neu=old+'　补充：'+v+'\n';
      try{
        LearnShell.writeFile(SJ_FILE, b64e(neu));
        sjToast('已补到上一条'); ta.value=''; $('hxSjPanel').style.display='none';
        try{ sjUpload(); }catch(e){} /* 顺手上行，失败静默下回补 */
      }catch(e){ sjToast('没存成：'+e.message); }
    }
    /* v0.15.0「↩ 补充上一条」选条回填（洪老师2026-09-18 08:10速记拍板，效果图屏③）：
       点钮弹最近3条速记列表，点哪条=那条原文整行回填进输入框接着加字；「记下」走原save=新增一条（铁律17：原条一个字不动）。
       读取来源=现行存储：壳文件「想法流水.txt」为主（与save/appendLast同一条ReadFile路），读不到时用localStorage现行镜像键hx_sj_uplocal兜底；不新建任何平行账本、不改任何键名 */
    function sjRecentLines(){
      var txt='';
      try{ txt=sjReadFlow(); }catch(e){ txt=''; } /* v0.15.0 主源：壳文件（照用save同款读法）；v0.18.1 刀2 走sjReadFlow（新名+旧名兜底） */
      if(!txt){ try{ txt=localStorage.getItem('hx_sj_uplocal')||''; }catch(e){ txt=''; } } /* v0.15.0 兜底：localStorage现行镜像键hx_sj_uplocal（上行缓存的整份流水，键名照用不新建） */
      var lines=(txt||'').split('\n'), out=[];
      for(var i=lines.length-1;i>=0 && out.length<3;i--){ var s=String(lines[i]).replace(/\s+$/,''); if(s) out.unshift(s); } /* v0.15.0 从尾往前取最近3条非空行，保持原顺序 */
      return out;
    }
    /* v0.15.0 预览文本：剥掉行首[时间]后取前两行，超长截60字（只用于显示，回填用原文整行） */
    function sjPrevPreview(line){
      var m=String(line).match(/^\[(.*?)\]\s*/); var body=m?String(line).slice(m[0].length):String(line);
      var p=body.split('\n').slice(0,2).join(' / '); if(p.length>60) p=p.slice(0,60)+'…';
      return { ts:(m?m[1]:''), txt:p };
    }
    function showPrevList(){
      var box=$('hxSjPrevList'); if(!box) return;
      var arr=sjRecentLines();
      if(!arr.length){ sjToast('还没有速记可补'); return; } /* v0.15.0 一条都没有=toast人话 */
      var names=['上一条','上上条','再上一条']; /* v0.15.0 相对序：最新一条=上一条 */
      var h='<div style="display:flex;justify-content:space-between;align-items:center;font-size:14px;color:#6b6257;margin-bottom:4px">'+
            '<span>点一条回填进输入框，接着写</span>'+
            '<button id="hxSjPrevX" type="button" style="flex:none;background:#efe9df;color:#6b6257;font-size:14px;padding:2px 10px">✕</button></div>';
      for(var i=arr.length-1,k=0;i>=0;i--,k++){
        h+='<div class="hxSjPrevItem" data-i="'+i+'" data-k="'+k+'" style="border:1px solid #e5ddd0;border-radius:8px;padding:6px 8px;margin-bottom:6px;background:#fff;cursor:pointer">'+
           '<div class="hxSjPrevTs" style="font-size:13px;color:#a05848"></div>'+ /* v0.15.0 终审返工：相对序+时间也改textContent填入（流水原文里的时间戳未转义进innerHTML有注入险，与预览同款防注入） */
           '<div class="hxSjPrevBody" style="font-size:15px;color:#4a4238;white-space:pre-wrap;word-break:break-all"></div></div>'; /* v0.15.0 预览文字走textContent填入，防原文里<>&进HTML串 */
      }
      box.innerHTML=h;
      var items=box.querySelectorAll('.hxSjPrevItem');
      for(var j=0;j<items.length;j++){ (function(it){
        var idx=+it.getAttribute('data-i');
        var pv=sjPrevPreview(arr[idx]); /* v0.15.0 终审返工：预览+时间戳统一在循环里取一次 */
        var tsEl=it.querySelector('.hxSjPrevTs'); if(tsEl) tsEl.textContent=names[+it.getAttribute('data-k')]+(pv.ts?'　'+pv.ts:''); /* v0.15.0 终审返工：时间戳textContent赋值，不进innerHTML */
        var bodyEl=it.querySelector('.hxSjPrevBody'); if(bodyEl) bodyEl.textContent=pv.txt;
        it.addEventListener('click', function(){
          try{
            var ta=$('hxSjText'); ta.value=arr[idx]; /* v0.15.0 原文整行回填（一个字不动），洪老师接着在后面加字；记下走原save=新增一条 */
            box.style.display='none';
            try{ ta.focus(); }catch(e){}
          }catch(e){}
        });
      })(items[j]); }
      var px=$('hxSjPrevX'); if(px) px.addEventListener('click', function(ev){ try{ ev.stopPropagation(); }catch(e){} box.style.display='none'; }); /* v0.15.0 ✕关列表无副作用 */
      box.style.display='block';
    }
    /* v0.19.0 📜翻看第一刀（洪老师2026-10-12拍板，交接说明_2026-10-12_1931 #4）：整屏覆盖页列全部想法（最新在上、全文不截断、一直翻到底）；
       每条✕=盖章不真删：行首加🗑[YYYY-MM-DD HH:MM]前缀，流水原文一字不动，平时不显示（本页滤；补充上一条sjRecentLines红线未动下刀再议）；
       回收站救回/30天自动真删留后续刀；流水文字一律textContent填入，严禁进innerHTML（照v0.15.0终审先例） */
    function sjStampLine(line){
      try{
        if(!bridged()){ sjToast('请在手机壳里用'); return; }
        var txt=sjReadFlow(); if(!txt) return;
        var lines=txt.split('\n'), hit=false;
        var d=new Date();
        var stamp='🗑['+d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+pad(d.getHours())+':'+pad(d.getMinutes())+']';
        for(var i=0;i<lines.length;i++){ if(!hit && String(lines[i]).replace(/\s+$/,'')===line){ lines[i]=stamp+lines[i]; hit=true; } } /* 只盖第一处；原文一个字不动，章加在行首 */
        if(!hit){ sjShowBrowse(); return; } /* 连点两次/行已变：静默重渲不报错 */
        LearnShell.writeFile(SJ_FILE, b64e(lines.join('\n')));
        try{ localStorage.setItem('hx_sj_uplocal',''); }catch(e){} /* 内容变了，逼sjUpload重推（照sjImgMarkCloud先例） */
        try{ sjUpload(); }catch(e){} /* 顺手上行，失败静默下回补（照appendLast先例） */
        sjToast('已盖章删去，原文还在手机里');
        sjShowBrowse(); /* 盖完重渲，该条消失 */
      }catch(e){ sjToast('没删成：'+e.message); }
    }
    /* v0.22.0 A1（洪老师2026-10-13拍板三并行开工，SPEC_hx-common块，千问实现+Kimi终审补漏：千问漏交本函数亲手落地）：回收站救回——去行首🗑[YYYY-MM-DD HH:MM]章回原位，原文一个标点不动；照sjStampLine先例：无壳toast、找不到静默重渲、清uplocal逼重推+顺手上行 */
    function sjRescueLine(stampedLine){
      try{
        if(!bridged()){ sjToast('请在手机壳里用'); return; }
        var txt=sjReadFlow(); if(!txt) return;
        var lines=txt.split('\n'), hit=false;
        for(var i=0;i<lines.length;i++){ if(!hit && String(lines[i]).replace(/\s+$/,'')===stampedLine){ lines[i]=lines[i].replace(/^🗑\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}\]/,''); hit=true; } } /* 只救第一处；只去章，原文一字不动，行原位 */
        if(!hit){ sjShowBrowse(); return; }
        LearnShell.writeFile(SJ_FILE, b64e(lines.join('\n')));
        try{ localStorage.setItem('hx_sj_uplocal',''); }catch(e){} /* 照sjStampLine先例逼sjUpload重推 */
        try{ sjUpload(); }catch(e){}
        sjToast('已救回');
        sjShowBrowse();
      }catch(e){ sjToast('没救成：'+e.message); }
    }
    function sjShowBrowse(){
      var pg=$('hxSjBrowsePg'); if(!pg) return;
      if(!bridged()){ sjToast('请在手机壳里用'); return; } /* 无壳浏览器：toast人话，不弹整屏页 */
      var txt=''; try{ txt=sjReadFlow(); }catch(e){ txt=''; }
      var lines=(txt||'').split('\n'), arr=[];
      for(var i=lines.length-1;i>=0;i--){ var s=String(lines[i]).replace(/\s+$/,''); if(s && s.indexOf('🗑[')!==0) arr.push(s); } /* 最新在上；盖章条平时不显示 */
      pg.innerHTML='';
      var bar=document.createElement('div'); /* 顶行：标题+大✕（不自动消失，点✕才关） */
      bar.style.cssText='display:flex;justify-content:space-between;align-items:center;padding:4px 2px 10px;border-bottom:1px solid #e5ddd0;margin-bottom:6px';
      var ttl=document.createElement('span'); ttl.style.cssText='font-size:18px;color:#4a4238;font-weight:bold'; ttl.textContent='📜翻看想法';
      var bx=document.createElement('button'); bx.type='button'; bx.textContent='✕'; bx.style.cssText='flex:none;background:#efe9df;color:#6b6257;font-size:20px;padding:6px 16px;border:none;border-radius:10px;cursor:pointer';
      bx.addEventListener('click', function(){ pg.style.display='none'; });
      bar.appendChild(ttl); bar.appendChild(bx); pg.appendChild(bar);
      if(!arr.length){
        var emp=document.createElement('div'); emp.style.cssText='color:#a05848;text-align:center;padding-top:60px'; emp.textContent='还没有想法，点🏥记一句';
        pg.appendChild(emp);
      }else{
        for(var k=0;k<arr.length;k++){ (function(line){
          var row=document.createElement('div'); row.style.cssText='display:flex;align-items:flex-start;gap:8px;padding:10px 2px;border-bottom:1px solid #e5ddd0';
          var body=document.createElement('div'); body.style.cssText='flex:1;font-size:18px;line-height:1.6;color:#4a4238;white-space:pre-wrap;word-break:break-all'; var _t126dline=line; try{ if(lsGet('hx_sj_ctx_off')!=='1'){ _t126dline=String(line).replace(/　病人:[^　]*/g,'').replace(/　页面:.*$/,''); } }catch(eD1){} body.textContent=_t126dline; /* t126刀1：显示层剥行尾「病人:/页面:」元数据，档案存储不动；hx_sj_ctx_off=1不剥；全文不截断，textContent防注入 */
          var xb=document.createElement('button'); xb.type='button'; xb.textContent='✕'; xb.style.cssText='flex:none;background:#efe9df;color:#a05848;font-size:16px;padding:4px 12px;border:none;border-radius:8px;cursor:pointer';
          xb.addEventListener('click', function(){ sjStampLine(line); });
          row.appendChild(body); row.appendChild(xb); pg.appendChild(row);
        })(arr[k]); }
      }
      var ft=document.createElement('div'); ft.style.cssText='padding:14px 2px;font-size:14px;color:#a05848'; ft.textContent='共'+arr.length+'条';
      pg.appendChild(ft);
      /* v0.22.0 A1 回收站入口：有盖章条才出，点=展开/收起（默认收起）；每条显示盖章时间+去章原文（textContent防注入），右端「↩救回」=sjRescueLine去章回原位 */
      var stampedLines=[];
      for(var si2=lines.length-1;si2>=0;si2--){ var ss=String(lines[si2]).replace(/\s+$/,''); if(ss && ss.indexOf('🗑[')===0) stampedLines.push(ss); }
      if(stampedLines.length>0){
        var rsBtn=document.createElement('button'); rsBtn.type='button'; rsBtn.textContent='🗑回收站（'+stampedLines.length+'条）▸'; rsBtn.style.cssText='position:sticky;bottom:0;background:#fffdf8;padding:12px 2px;font-size:14px;color:#a05848;border:none;cursor:pointer;text-align:left;width:100%'; /* v0.24.2 刀4（洪老师10-14真机报「救回钮要固定下缘」）：回收站入口sticky钉下缘不跟翻页走 */
        var rsList=document.createElement('div'); rsList.style.cssText='display:none;padding-top:8px';
        rsBtn.addEventListener('click',function(){ rsList.style.display=rsList.style.display==='block'?'none':'block'; });
        pg.appendChild(rsBtn); pg.appendChild(rsList);
        for(var rsi=0;rsi<stampedLines.length;rsi++){ (function(stampedLine){
          var row=document.createElement('div'); row.style.cssText='display:flex;align-items:flex-start;gap:8px;padding:10px 2px;border-bottom:1px solid #e5ddd0';
          var body=document.createElement('div'); body.style.cssText='flex:1;font-size:18px;line-height:1.6;color:#4a4238;white-space:pre-wrap;word-break:break-all';
          var stm=String(stampedLine).match(/^🗑\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2})\]/);
          body.textContent=(stm?stm[1]+'　':'')+String(stampedLine).replace(/^🗑\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}\]/,'');
          var rb=document.createElement('button'); rb.type='button'; rb.textContent='↩救回'; rb.style.cssText='flex:none;background:#efe9df;color:#a05848;font-size:14px;padding:4px 12px;border:none;border-radius:8px;cursor:pointer';
          rb.addEventListener('click', function(){ sjRescueLine(stampedLine); });
          row.appendChild(body); row.appendChild(rb); rsList.appendChild(row);
        })(stampedLines[rsi]); }
      }
      pg.style.display='block';
    }
    /* 页面里还没有速记UI就自动注入（样式+圆点+面板+toast，和9件内嵌版一模一样的结构） */
    function ensureUI(){
      if($('hxSjDot')) return true;
      try{
        if(!document.body) return false;
        var _sjBtnBox=false; try{ _sjBtnBox=(localStorage.getItem('hx_sj_btnbox')==='1'); }catch(eSw){} /* v0.65.0 刀A：'1'=老彩底方框 */
        var st=document.createElement('style'); st.id='hxSjStyle';
        st.textContent=
          "#hxSjDot{position:fixed;right:18px;bottom:88px;width:52px;height:52px;border-radius:50%;background:rgba(122,158,126,.55);border:2px solid rgba(255,255,255,.75);color:#fff;font-size:22px;z-index:99990;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.18);user-select:none;-webkit-user-select:none}\n"+
          "#hxSjPanel{position:fixed;right:14px;bottom:150px;width:320px;max-width:86vw;background:#fffdf8;border:1px solid #e5ddd0;border-radius:14px;box-shadow:0 6px 24px rgba(0,0,0,.18);z-index:99991;padding:12px;max-height:calc(100vh - 170px);overflow-y:auto;-webkit-overflow-scrolling:touch;display:none}\n"+
          "#hxSjText{width:100%;box-sizing:border-box;min-height:72px;font-size:18px;line-height:1.5;border:1px solid #ddd2c2;border-radius:10px;padding:10px;background:#fff;color:#4a4238;resize:vertical}\n"+
          "#hxSjPanel .hxSjBtns{display:flex;gap:10px;margin-top:10px;flex-wrap:wrap}\n"+ /* v0.24.2 刀1：按钮排两行 */
          "#hxSjPanel button{flex:1 1 28%;font-size:18px;padding:10px 0;cursor:pointer;"+(_sjBtnBox?"border:none;border-radius:10px":"border:none;background:transparent;color:#3f5b45;border-bottom:2px solid #7a9e7e;border-radius:0;padding-bottom:6px")+"}\n"+ /* v0.24.2 刀1：一排3~4个自动换行；v0.65.0 刀A：缺省下划线文字风，hx_sj_btnbox='1'回老彩底方框 */
          (_sjBtnBox?"#hxSjSave{background:#7a9e7e;color:#fff}\n":"#hxSjSave{color:#2f4a35;border-bottom-color:#4a7a52 !important;font-weight:bold}\n")+
          (_sjBtnBox?"#hxSjClose{background:#efe9df;color:#6b6257}\n":"#hxSjClose{color:#6b6257;border-bottom-color:#c9c0b2 !important}\n")+
          "#hxSjHint{font-size:13px;color:#a05848;margin-top:8px;display:none}\n"+
          "#hxSjToast{position:fixed;left:50%;bottom:160px;transform:translateX(-50%);background:rgba(74,64,48,.92);color:#fff;padding:10px 20px;border-radius:20px;font-size:16px;z-index:99992;display:none}\n"+
          "#hxSjBrowsePg{position:fixed;left:0;top:0;right:0;bottom:0;z-index:99993;background:#fffdf8;overflow-y:auto;display:none;padding:14px;box-sizing:border-box}"; /* v0.19.0 整屏翻看页：铺满全屏不自动消失 */
        document.head.appendChild(st);
        var wrap=document.createElement('div');
        wrap.innerHTML=
          '<div id="hxSjDot" title="速记">🏥</div>'+
          '<div id="hxSjPanel">'+
          '  <textarea id="hxSjText" placeholder="发现啥毛病，写一句…"></textarea>'+
          '  <div id="hxSjImgLine" style="display:none;font-size:13px;color:#4a4238;margin-top:6px;background:#f5efe4;border-radius:8px;padding:4px 8px"></div>'+ /* v0.11.1 挂图行：选了图没记下时显示 */
          '  <div class="hxSjBtns"><button id="hxSjSave" type="button">记下</button>'+
          '<button id="hxSjPrev" type="button" style="background:#7a8ea0;color:#fff;">↩ 补充上一条</button>'+ /* v0.15.0 选条回填钮：点=弹最近3条列表选一条回填，洪老师2026-09-18拍板 */
          '<button id="hxSjBrowse" type="button" style="background:#7a8ea0;color:#fff;">📜翻看</button>'+ /* v0.19.0 翻看钮：点=整屏列全部想法，洪老师2026-10-12拍板 */
          '<button id="hxSjChk" type="button" style="background:#b8925a;color:#fff;">✅验收</button>'+ /* v0.20.0 验收钮：点=HX.chk.open()窄条/整屏验收清单，SPEC批准申报加法① */
          '<button id="hxSjSos" type="button" style="background:#a05848;color:#fff;">🆘传黑匣子</button>'+ /* v0.24.0 🆘钮：点=HX.bb.flush(true)强推黑匣子，SPEC批准申报加法 */
          '<button id="hxSjWz" type="button" style="background:#4a7a5a;color:#fff;">📮叫Kimi会诊</button>'+ /* v0.43.0 t69刀1 呼叫钮：点=抓现场急诊报告推GitHub，SPEC_问诊室_v0.1.0批准 */
          '<button id="hxSjImg" type="button" style="background:#efe9df;color:#6b6257;">📷图</button>'+ /* v0.10.0 附图钮：始终在「记下」旁，样式同关闭钮 */
          (sjExtraBtn ? '<button id="hxSjAppend" type="button" style="background:#b8925a;color:#fff;">'+String(sjExtraBtn.label||'补充上一条')+'</button>' : '')+ /* v0.1.1 extraBtn：不传不出这钮，默认2钮版 */
          '<button id="hxSjClose" type="button">关上</button>'+
          ((HX.ai && HX.ai.ready && HX.ai.ready()) ? '<button id="hxSjAiBtn" type="button" style="background:#efe9df;color:#6b6257;">🤖AI</button>' : '')+ /* v0.2.0 AI面板入口：HX.ai已init且UI就绪才出这钮，不出现不影响速记 */
          '</div>'+
          '  <div id="hxSjPrevList" style="display:none;margin-top:8px;max-height:240px;overflow-y:auto"></div>'+ /* v0.15.0 最近3条选条列表容器：默认藏，点「↩ 补充上一条」才填内容亮出 */
          '  <div id="hxSjHint">浏览器里存不了，请在手机壳里用</div>'+
          '</div>'+
          '<div id="hxSjToast"></div>'+
          '<div id="hxSjBrowsePg"></div>'; /* v0.19.0 整屏翻看页容器：默认藏，点📜翻看才填内容亮出 */
        while(wrap.firstChild){ document.body.appendChild(wrap.firstChild); }
        return true;
      }catch(e){ warn('sj UI注入失败: '+((e&&e.message)||e)); return false; }
    }
    function sjWzSos(){ /* v0.43.0 t69刀1：📮叫Kimi会诊——抓现场(bbTail20+layout+cur+主诉)打急诊报告立刻推GitHub仓根 急诊_YYYYMMDD_HHMM.json；成功hxToastHold黑框常驻「现场已发给Kimi，接班即看」；失败sjToast明白话存hx_wz_sos_pend下回补 【Kimi终审翻案1】DS稿调nowStr/netOk乃HX.jc闭包私有跨IIFE必炸ReferenceError——时间改本地pad拼，网断靠putFile失败分支兜底 */ try{
      var d=new Date();
      var rep={t:d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds()), app:(typeof HX_SJ_APP!=='undefined'?HX_SJ_APP:''), say:'', bb:(HX.jc&&HX.jc.wzBbTail?HX.jc.wzBbTail(20):[]), layout:(HX.jc&&HX.jc.wzLayout?HX.jc.wzLayout():null), cur:(HX.jc&&HX.jc.wzCur?HX.jc.wzCur():null)};
      try{ var ta=$('hxSjText'); if(ta&&ta.value) rep.say=String(ta.value).slice(0,200); }catch(e0){} /* 只读主诉不清框 */
      try{ localStorage.setItem('hx_wz_sos_pend', JSON.stringify(rep)); }catch(eP){} /* v0.65.0 刀B1：先存本地永不丢，传成功才清账（成功分支原removeItem照走） */
      var keys=null; try{ keys=sjGhKeys(); }catch(e1){ keys=null; }
      if(!keys){ try{ sjToast('⚠️ 现场没发出去（没钥匙），已存在手机里'); }catch(e3){} try{ localStorage.setItem('hx_wz_sos_pend', JSON.stringify(rep)); }catch(e4){} return; }
      var fn='急诊_'+d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+'_'+pad(d.getHours())+pad(d.getMinutes())+pad(d.getSeconds())+'.json';
      try{
        HX.gh.putFile(null, fn, JSON.stringify(rep,null,1), '急诊 '+rep.app).then(function(){
          try{ hxToastHold('现场已发给Kimi，接班即看'); }catch(e5){}
          try{ localStorage.removeItem('hx_wz_sos_pend'); }catch(e6){}
        }, function(){
          try{ sjToast('⚠️ 现场没发上去，已存手机里'); }catch(e7){}
          try{ localStorage.setItem('hx_wz_sos_pend', JSON.stringify(rep)); }catch(e8){}
        });
      }catch(e9){ try{ sjToast('⚠️ 现场没发上去，已存手机里'); }catch(e10){} try{ localStorage.setItem('hx_wz_sos_pend', JSON.stringify(rep)); }catch(e11){} }
    }catch(eAll){} }
    function sjWzPendFlush(){ /* v0.65.0 刀B2（想法10-20「SOS先存本地网通补传」）：会诊件闲时补传——pend在=云上没有，补推成功才清账；文件名由rep.t唯一决定，重推幂等不重复 */
      try{
        var raw=null; try{ raw=localStorage.getItem('hx_wz_sos_pend'); }catch(e){}
        if(!raw) return;
        var rep=null; try{ rep=JSON.parse(raw); }catch(e2){}
        if(!rep||!rep.t){ try{ localStorage.removeItem('hx_wz_sos_pend'); }catch(e3){} return; } /* 坏账清掉不反复试 */
        var keys=null; try{ keys=sjGhKeys(); }catch(e4){ keys=null; }
        if(!keys) return; /* 没钥匙留账下回 */
        var fn='急诊_'+String(rep.t).replace(/[-: ]/g,'')+'.json';
        HX.gh.putFile(null, fn, JSON.stringify(rep,null,1), '急诊补传 '+(rep.app||'')).then(function(){
          try{ localStorage.removeItem('hx_wz_sos_pend'); }catch(e5){}
          try{ sjToast('📮上次没发出去的现场已补发给Kimi'); }catch(e6){}
        }, function(){ /* 失败静默留账，下回闲时再补 */ });
      }catch(eAll){}
    }
    function bind(){
      var _sosT=null, _sosTimer=null; /* v0.30.0 刀A2 双击🆘回环：单击600ms后flush(true)，600ms内第二击loopback() */
      var dot=$('hxSjDot'); if(!dot) return;
      /* v0.34.0：焦点进出输入框+视口尺寸变化时重新摆面板 */
      try{
        var sjTa=$('hxSjText');
        if(sjTa){
          sjTa.addEventListener('focus', function(){ setTimeout(sjKbFit, 300); });
          sjTa.addEventListener('blur', function(){ setTimeout(sjKbFit, 300); });
        }
        if(window.visualViewport){
          window.visualViewport.addEventListener('resize', function(){ sjKbFit(); });
        }
      }catch(e){}
      dot.addEventListener('click', openPanel);
      $('hxSjSave').addEventListener('click', save);
      if(sjExtraBtn && $('hxSjAppend')) $('hxSjAppend').addEventListener('click', appendLast); /* v0.1.1 extraBtn */
      var sjPrevBtn=$('hxSjPrev'); if(sjPrevBtn) sjPrevBtn.addEventListener('click', function(){ try{ var box=$('hxSjPrevList'); if(box && box.style.display==='block'){ box.style.display='none'; return; } showPrevList(); }catch(e){} }); /* v0.15.0 ↩补充上一条：列表开着再点=收起（无副作用），否则弹最近3条 */
      var sjBrowseBtn=$('hxSjBrowse'); if(sjBrowseBtn) sjBrowseBtn.addEventListener('click', function(){ try{ sjShowBrowse(); }catch(e){} }); /* v0.19.0 📜翻看 */
      var sjChkBtn=$('hxSjChk'); if(sjChkBtn) sjChkBtn.addEventListener('click', function(){ try{ HX.chk.open(); }catch(e){} }); /* v0.20.0 ✅验收，SPEC批准申报加法② */
      var sjSosBtn=$('hxSjSos');
      var sjWzBtn=$('hxSjWz'); if(sjWzBtn) sjWzBtn.addEventListener('click', function(){ try{ sjWzSos(); }catch(e){ try{ sjToast('会诊没叫成'); }catch(e2){} } }); /* v0.43.0 t69刀1 */ if(sjSosBtn) sjSosBtn.addEventListener('click', function(){ try{ if(localStorage.getItem('hx_lb_off')==='1'){ HX.bb.flush(true); return; } var now=Date.now(); if(_sosT && (now-_sosT)<600){ clearTimeout(_sosTimer); _sosTimer=null; _sosT=null; if(typeof HX.bb.loopback==='function') HX.bb.loopback(); return; } _sosT=now; _sosTimer=setTimeout(function(){ _sosTimer=null; _sosT=null; try{ HX.bb.flush(true); }catch(e){ try{ sjToast('黑匣子没传上去'); }catch(e2){} } }, 600); }catch(e){ try{ sjToast('黑匣子没传上去'); }catch(e2){} } }); /* v0.30.0 刀A2 双击🆘回环：hx_lb_off=1单击照旧flush(true)整刀退休；否则单击600ms后flush(true)、600ms内第二击loopback() */ /* v0.24.0 🆘传黑匣子：点=强推一次 */
      var sjPanelBk=$('hxSjPanel'); if(sjPanelBk) sjPanelBk.addEventListener('click', function(ev){ try{ var box=$('hxSjPrevList'); if(box && box.style.display==='block' && ev.target===sjPanelBk) box.style.display='none'; }catch(e){} }); /* v0.15.0 点面板空白处关列表（点在条目/按钮上不动），无副作用 */
      $('hxSjClose').addEventListener('click', function(){ $('hxSjPanel').style.display='none'; });
      var sjImgBtn=$('hxSjImg'); if(sjImgBtn) sjImgBtn.addEventListener('click', function(){ try{
        if(sjImgPicking){ try{ sjToast('选图窗口已打开，请稍候'); }catch(e){} return; } /* v0.12.2 挂号#95：选图在途闸，防X5重放手势再弹图库 */
        sjImgPicking=true;
        var sjImgRst=function(){ sjImgPicking=false; };
        try{ window.addEventListener('focus', sjImgRst, {once:true}); }catch(e){} /* v0.12.2 X5取消选图不发change：焦点回来即复位（change里已复位则无副作用） */
        setTimeout(function(){ try{ window.removeEventListener('focus', sjImgRst); }catch(e){} sjImgRst(); }, 30000); /* v0.12.2 30秒超时兜底，任一先到即复位 */
        var inp=document.createElement('input'); inp.type='file'; inp.accept='image/*'; inp.style.display='none'; document.body.appendChild(inp); /* v0.12.2 挂号#95：每次点📷临时造input（先挂DOM再click，X5对不在DOM的input.click()可能不响应），用完即弃——根治常驻input上fileChooser回调悬挂重放弹图库 */
        inp.addEventListener('change', function(){ try{ var f=inp.files&&inp.files[0]; if(f) saveImg(f); }catch(e){} try{ if(inp.parentNode) inp.parentNode.removeChild(inp); }catch(e2){} sjImgPicking=false; });
        inp.click();
      }catch(e){ sjImgPicking=false; } });
      if(HX.ai && HX.ai.ready && HX.ai.ready()){ var sjAiBtn=$('hxSjAiBtn'); if(sjAiBtn) sjAiBtn.addEventListener('click', function(){ try{ $('hxSjPanel').style.display='none'; }catch(e){} try{ HX.ai.open(); }catch(e){} }); } /* v0.2.0 AI面板入口：点击=关速记面板+HX.ai.open() */
      setTimeout(function(){ try{
        /* v0.13.2（2026-09-16，洪老师拍板"把这个多余的命令取消掉"）：「检查新版本」按钮刷新页面带出的这次开门闲时上行摘除——
           主界面v1.19.1按钮立 hx_sj_skip_once 标记，认到就清掉并跳过本次；「记下后上行」等其他入口一行未动 */
        var _skip=false; try{ if(sessionStorage.getItem('hx_sj_skip_once')==='1'){ sessionStorage.removeItem('hx_sj_skip_once'); _skip=true; } }catch(e){}
        if(!_skip && HX._autoNetOk()) sjUpload(false);
        try{ sjWzPendFlush(); }catch(ePF){} /* v0.65.0 刀B3：会诊件闲时补传（同批闲时，失败留账下回） */
      }catch(e){} }, 8000); /* 速记自动上行：开门闲时对账补推（上次没网漏的在这补）；v0.8.0开门静默令：没点按钮不补 */
    }
    /* 一行接入：HX.sj.init({app:'软件名', getCtx:fn可选})；重复调用只补上下文不重复绑 */
    sj.init = function(opt){
      try{
        opt = opt || {};
        if(opt.app) HX_SJ_APP = String(opt.app);
        if(!HX_SJ_APP) HX_SJ_APP = '未命名软件';
        if(typeof opt.getCtx === 'function') sjGetCtx = opt.getCtx;
        if(opt.extraBtn && opt.extraBtn.label) sjExtraBtn = { label:String(opt.extraBtn.label) }; /* v0.1.1 */
        if(inited) return;
        inited = true;
        var boot = function(){ try{ if(ensureUI()) bind(); }catch(e){ warn('sj init: '+((e&&e.message)||e)); } };
        if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', boot); } else { boot(); }
      }catch(e){ warn('sj init: '+((e&&e.message)||e)); }
    };
    /* 暴露给接入方手动触发（一般不直接用） */
    sj.upload = function(){ try{ sjUpload(); }catch(e){} };
    sj._save = save; sj._toast = sjToast;
    return sj;
  })();

  /* ════ 5.5 统一AI面板 HX.ai（v0.2.0 新增，洪老师2026-09-11拍板方法论落地试点） ════
     两层结构：第1层功能清单（getSection()对上的条目置顶标「本页」）→第2层条目详情（有prompts列提示词套，点一套进编辑页可改可存（v0.11.0）/无则「▶ 开始」大钮）；
     壳统一芯自带：各软件传自己的AI_MANIFEST，面板只调条目run，不新造取数通道；账本/钥匙HX.ai自身不碰（唯一例外：生成器条目走宿主send）。
     防重入：面板触发run执行期间ready()短暂返false——宿主原按钮拦截行（HX.ai.ready()判断）就会放行原行为，不会又弹面板套娃。 */
  HX.ai = (function(){
    var ai = {};
    var _app = '';            /* init传：软件名（生成器存档键hx_aiext_v1.<app>用它） */
    var _manifest = [];       /* init传：宿主AI功能清单 */
    var _getSection = null;   /* init传：返回当前界面名（定位置顶用） */
    var _send = null;         /* init传（可选）：宿主AI通道 send(sys,user,onOk,onErr)，只给生成器条目用 */
    var _litText = null;      /* v0.16.0 刀A init传（可选）：宿主点亮取文钩子 litText(pkObj)→脱敏后文本或''；只给自建条目用，HX.ai自身不新造取数通道 */
    var _editHooks = null;    /* v0.16.3 刀B init传（可选）：宿主编辑页钩子 editHooks(itemId, idx, api)；不传=编辑页容器留空，版面与老版一致 */
    var _inited = false, _uiOk = false, _inRun = false;
    function $(id){ return document.getElementById(id); }
    function aiToast(m){ var t=$('hxAiToast'); if(!t) return; t.textContent=m; t.style.display='block'; clearTimeout(t._t); t._t=setTimeout(function(){ t.style.display='none'; },2600); }
    /* v0.16.1 刀C：AI面板当场填钥匙浮层（病根=壳端口8931~8951换着开，localStorage换房Key反复丢；
       存钥匙=HX.keys.set/setQwen→落壳文件hxdata_hx_keys.json真源，换端口也能读回）；z-index 99995压过AI面板99993 */
    function aiAskKey(){
      try{
        if(!document.body) return;
        var old=$('hxAiKeyMask'); if(old && old.parentNode) old.parentNode.removeChild(old);
        var mask=document.createElement('div'); mask.id='hxAiKeyMask';
        mask.style.cssText='position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.35);z-index:99995';
        var box=document.createElement('div');
        box.style.cssText='position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:320px;max-width:88vw;background:#fffdf8;border:1px solid #e5ddd0;border-radius:14px;box-shadow:0 6px 24px rgba(0,0,0,.18);padding:12px;box-sizing:border-box';
        box.innerHTML=
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px"><span style="font-size:16px;font-weight:bold;color:#4a4238">🔑 还没有API Key，当场填一把</span><button id="hxAiKeyX" type="button" style="border:none;border-radius:8px;background:#efe9df;color:#6b6257;font-size:14px;padding:4px 10px;cursor:pointer">✕</button></div>'+
          '<div style="font-size:13px;color:#8a8178;padding:4px 0 8px">存一次进公共钱罐，换端口开门也在</div>'+
          '<input id="hxAiKeyKimi" type="text" placeholder="Kimi Key（必填）" style="width:100%;box-sizing:border-box;font-size:14px;line-height:1.6;color:#4a4238;background:#fff;border:1px solid #d8cfc0;border-radius:10px;padding:8px;margin-bottom:8px">'+
          '<input id="hxAiKeyQwen" type="text" placeholder="千问 Key（可选）" style="width:100%;box-sizing:border-box;font-size:14px;line-height:1.6;color:#4a4238;background:#fff;border:1px solid #d8cfc0;border-radius:10px;padding:8px">'+
          '<button id="hxAiKeySave" type="button" style="display:block;width:100%;font-size:16px;padding:10px 0;border:none;border-radius:10px;background:#7a9e7e;color:#fff;cursor:pointer;margin-top:8px">💾存钥匙</button>';
        mask.appendChild(box); document.body.appendChild(mask);
        $('hxAiKeyX').addEventListener('click', function(){ mask.style.display='none'; });
        $('hxAiKeySave').addEventListener('click', function(){
          try{
            var k=trim($('hxAiKeyKimi').value), q=trim($('hxAiKeyQwen').value);
            if(k){ try{ HX.keys.set(k); }catch(e){} }
            if(q){ try{ HX.keys.setQwen(q); }catch(e){} }
            mask.style.display='none';
            aiToast('✅ 钥匙已存进公共钱罐，下次开门也在');
          }catch(e){}
        });
      }catch(e){ warn('ai 填钥匙浮层: '+((e&&e.message)||e)); }
    }
    function lsKey(){ return 'hx_aiext_v1.'+_app; }
    function extLoad(){ try{ var a=JSON.parse(localStorage.getItem(lsKey())||'[]'); return (a && a.length) ? a : []; }catch(e){ return []; } }
    function extSave(a){ try{ localStorage.setItem(lsKey(), JSON.stringify(a||[])); }catch(e){} }
    /* v0.11.0 提示词覆盖账本：hx_aiprompt_v1.<app>={条目id:{套号:改后全文}}；出厂默认在manifest里，恢复出厂=删覆盖 */
    function ovKey(){ return 'hx_aiprompt_v1.'+_app; }
    function ovLoad(){ try{ return JSON.parse(localStorage.getItem(ovKey())||'{}')||{}; }catch(e){ return {}; } }
    function ovSave(o){ try{ localStorage.setItem(ovKey(), JSON.stringify(o||{})); }catch(e){} }
    var _pend=null; /* 一次性待发：▶用这套发送时编辑框没存的话也照新话发（doSend前摆上，跑完即清） */
    /* 有效提示词：钩子pget > 一次性待发 > 覆盖账本 > 出厂默认（仅面板内用；宿主函数用ai.pget只到覆盖账本为止） */
    function effPrompt(it, i){
      try{
        if(typeof it.pget==='function'){ var v=it.pget(i); if(v!=null) return String(v); }
      }catch(e){}
      if(_pend && _pend.id===it.id && _pend.idx===i) return _pend.text;
      var ov=ovLoad(); var hit=ov[it.id]; if(hit && hit[i]!=null) return String(hit[i]);
      return String((it.prompts&&it.prompts[i]&&it.prompts[i].text)||'');
    }
    /* 生成器条目的run：走宿主send（sys=提示词，user=选中文字或'（无资料）'）；没通道/没Key都只toast不崩 */
    function extRun(x){
      try{
        if(!_send){ aiToast('本软件还没接AI通道'); return; }
        try{ if(!HX.keys.get() && !HX.keys.getQwen()){ aiAskKey(); return; } }catch(e){} /* v0.16.1 刀C：没key当场弹填钥匙浮层（原提示话作浮层标题），return不变 */
        /* v0.16.0 刀A：点亮病历优先——HX.pick有效且宿主接了litText钩子则附脱敏后全文（标注【点亮文件：fname】，同大管家问AI随行口径）；
           没点亮toast提醒照发（不带材料）；宿主没接钩子/钩子取空自动回落老useSel选中文字，再没=（无资料） */
        var usr='';
        var _pk=null; try{ _pk=(HX.pick&&HX.pick.get)?HX.pick.get():null; }catch(e){}
        if(_pk && _pk.fname && typeof _litText==='function'){
          try{ var _lt=_litText(_pk); if(_lt){ usr='【点亮文件：'+_pk.fname+'】\n'+String(_lt); } }catch(e){}
        }
        if(!usr && x.useSel){ try{ var s=String(window.getSelection ? window.getSelection() : ''); if(s) usr=s; }catch(e){} }
        if(!usr){ usr='（无资料）'; aiToast((_pk&&_pk.fname)?'点亮文件没取到内容，这次只发提示词不带病历':'没点亮文件，这次只发提示词不带病历'); } /* 终审P4修：点亮了但取空换个说法 */
        else if(_pk && usr.indexOf('【点亮文件：')===0){ aiToast('📌 点亮文件「'+_pk.fname+'」随行发给AI'); } /* 终审P3修：_pk判空防极端击穿 */
        _send(x.text||'', usr, function(r){ showResult(x.name, r); }, function(err){ aiToast('AI这条路不通：'+String(err||'').slice(0,60)); });
      }catch(e){ warn('ai 自建条目: '+((e&&e.message)||e)); }
    }
    function mkExtItem(x){
      return { id:x.id, name:x.name, icon:x.icon||'🛠', section:x.section||'', desc:x.desc||'自建功能', custom:true, prompts:null, _raw:x, run:function(){ extRun(x); } }; /* v0.16.0 刀B：挂_raw供编辑页直读直写原条 */
    }
    /* 合并：manifest在前，自建接末尾；同id以manifest为准 */
    function allItems(){
      var list=[], ids={}, i;
      for(i=0;i<_manifest.length;i++){ var m=_manifest[i]; if(m && m.id && !ids[m.id]){ ids[m.id]=1; list.push(m); } }
      var ext=extLoad();
      for(i=0;i<ext.length;i++){ var x=ext[i]; if(x && x.id && !ids[x.id]){ ids[x.id]=1; list.push(mkExtItem(x)); } }
      return list;
    }
    function escH(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
    /* v0.17.0 刀H1（2026-09-24班②一期，洪老师拍板「开工」，效果图mock1）：面板第一层平铺化——
       缺省平铺（想干什么点一个就发），localStorage hx_ai_flat_off==='1'走老两层（老renderL1本体+renderL2全保留）；新DOM全动态生成+全try护栏 */
    function _flatOff(){ try{ return localStorage.getItem('hx_ai_flat_off')==='1'; }catch(e){ return false; } }
    /* v0.17.0 刀H2：自建条目升舱徽章口径——wantShibu===true「已申请收编」；有字段但false「候选·待收编」；没这字段=老条目「自建」 */
    function _extBadgeTxt(x){
      try{
        if(x && x.wantShibu===true) return '已申请收编';
        if(x && x.wantShibu===false) return '候选·待收编';
      }catch(e){}
      return '自建';
    }
    /* v0.17.0 刀H1：平铺渲染——a.顶部亮牌行/自建区/＋加AI功能等现有零件位置不动（本函数只管清单体）；b.引导小字行；
       c.allItems逐项展开：有prompts每套一个大钮（多套名后加「·套名」，钮右小字=宿主传的matLabel没有不显），点击=renderPEdit(it,套idx)（照原renderL2里[data-hxaip]的点击行为）；无prompts维持老功能钮（点击=run）；
       d.自建条目平铺到末尾「我自建的」分组，钮右小字显升舱徽章；e.「＋加AI功能」钮照旧在最末（hxAiFoot没动） */
    function renderL1Flat(){
      try{
        var body=$('hxAiBody'); if(!body) return;
        var sec=''; try{ if(_getSection) sec=String(_getSection()||''); }catch(e){}
        var list=allItems();
        list.sort(function(a,b){ var am=(sec && a.section===sec)?0:1, bm=(sec && b.section===sec)?0:1; return am-bm; }); /* 排序口径照老renderL1一字不动 */
        body.innerHTML='';
        if(!list.length){ var emp=document.createElement('div'); emp.className='hxAiEmpty'; emp.textContent='本软件还没配AI功能清单'; body.appendChild(emp); return; }
        var gd=document.createElement('div'); gd.className='hxAiDesc'; gd.textContent='想干什么？点一个就发（点亮的文章跟着一起去）'; /* b.引导小字行 */
        body.appendChild(gd);
        var customs=[], i, it;
        function mkBtn(it2, idx, isExt){
          var b=document.createElement('div'); b.className='hxAiRow hxAiPromptBtn'; /* 照.hxAiPromptBtn绿色大钮风格 */
          if(isExt){ b.style.background='#fdf3e3'; b.style.borderColor='#d9b36c'; b.style.color='#7a5a26'; } /* v0.17.0 刀H1：自建用暖色底区分（样式串内联） */
          var ico=document.createElement('span'); ico.className='hxAiPromptIco'; ico.textContent='▶';
          var nm=document.createElement('span'); nm.className='hxAiName';
          var pnm='';
          if(it2.prompts && it2.prompts.length>1){ pnm='·'+String((it2.prompts[idx]&&it2.prompts[idx].name)||('第'+(idx+1)+'套')); } /* 多套时名后加「·套名」 */
          nm.textContent=String(it2.icon||'🤖')+' '+String(it2.name||it2.id)+pnm;
          b.appendChild(ico); b.appendChild(nm);
          var tag='';
          if(isExt){ tag=_extBadgeTxt(it2._raw); } /* d.自建钮右小字=升舱徽章 */
          else if(it2.matLabel){ tag=String(it2.matLabel); } /* 钮右侧小字=item.matLabel（宿主传的料标签，没有就不显示） */
          if(tag){ var tg=document.createElement('span'); tg.style.cssText='flex:none;font-size:12px;color:#8a8178;'; tg.textContent=tag; b.appendChild(tg); }
          b.addEventListener('click', function(){
            try{
              if(isExt){ renderL2(it2); return; } /* 自建条目点钮进老L2（▶开始/✏️改/🗑删老链不动） */
              if(it2.prompts && it2.prompts.length){ renderPEdit(it2, idx); } /* 照原renderL2里[data-hxaip]的点击行为 */
              else { doRun(it2); } /* 无prompts维持老功能钮（点击=run） */
            }catch(e){ warn('ai 平铺点钮: '+((e&&e.message)||e)); }
          });
          return b;
        }
        for(i=0;i<list.length;i++){
          it=list[i];
          if(it.custom){ customs.push(it); continue; } /* d.自建平铺到末尾分组 */
          if(it.prompts && it.prompts.length){ for(var j=0;j<it.prompts.length;j++) body.appendChild(mkBtn(it,j,false)); }
          else body.appendChild(mkBtn(it,0,false));
        }
        if(customs.length){
          var hd=document.createElement('div'); hd.className='hxAiDesc'; hd.style.marginTop='6px'; hd.textContent='我自建的'; body.appendChild(hd); /* d.分题小字 */
          for(i=0;i<customs.length;i++) body.appendChild(mkBtn(customs[i],0,true));
        }
      }catch(e){ warn('ai 平铺: '+((e&&e.message)||e)); }
    }
    /* 第1层：全清单，getSection()对上的排最前标「本页」，自建的标「自建」 */
    function renderL1(){
      var body=$('hxAiBody'); if(!body) return;
      if(!_flatOff()){ renderL1Flat(); return; } /* v0.17.0 刀H1：缺省走平铺；hx_ai_flat_off=1走下面老两层逻辑（老本体一字未动） */
      var sec=''; try{ if(_getSection) sec=String(_getSection()||''); }catch(e){}
      var list=allItems();
      list.sort(function(a,b){ var am=(sec && a.section===sec)?0:1, bm=(sec && b.section===sec)?0:1; return am-bm; });
      var html='';
      if(!list.length) html+='<div class="hxAiEmpty">本软件还没配AI功能清单</div>';
      for(var i=0;i<list.length;i++){
        var it=list[i];
        html+='<div class="hxAiRow" data-hxai="'+escH(it.id)+'"><span class="hxAiIco">'+escH(it.icon||'🤖')+'</span><span class="hxAiName">'+escH(it.name||it.id)+'</span>'+
              ((sec && it.section===sec)?'<span class="hxAiHere">本页</span>':'')+
              (it.custom?'<span class="hxAiCustom">自建</span>':'')+'</div>';
      }
      body.innerHTML=html;
      Array.prototype.forEach.call(body.querySelectorAll('[data-hxai]'), function(el){
        el.addEventListener('click', function(){
          var id=el.getAttribute('data-hxai'), list2=allItems(), hit=null;
          for(var i=0;i<list2.length;i++){ if(list2[i].id===id){ hit=list2[i]; break; } }
          if(hit) renderL2(hit);
        });
      });
    }
    /* 第2层：←返回+条目名+desc；有prompts列提示词套（点一套=执行run），无则「▶ 开始」大钮 */
    function renderL2(it){
      var body=$('hxAiBody'); if(!body) return;
      var html='<div class="hxAiBack" id="hxAiBack">← 返回</div>'+
               '<div class="hxAiL2Title">'+escH(it.icon||'🤖')+' '+escH(it.name||it.id)+'</div>'+
               (it.desc?'<div class="hxAiDesc">'+escH(it.desc)+'</div>':'');
      if(it.prompts && it.prompts.length){
        /* v0.15.1（挂号E，洪老师拍板）：提示词套不再渲染成文字行（看着像说明字不知道能点），改明显大钮——
           带▶图标、边框、圆角、底色（照.hxAiGo绿色系），一眼是可点的钮；只改渲染HTML+CSS字符串，逻辑不动 */
        for(var i=0;i<it.prompts.length;i++) html+='<div class="hxAiRow hxAiPromptBtn" data-hxaip="'+i+'"><span class="hxAiPromptIco">▶</span><span class="hxAiName">'+escH(it.prompts[i].name||('第'+(i+1)+'套'))+'</span></div>';
      }else{
        html+='<button id="hxAiGo" type="button" class="hxAiGo">▶ 开始</button>';
        if(it.custom){ /* v0.16.0 刀B：自建条目补「✏️改/🗑删」两钮 */
          html+='<div class="hxAiBtnRow">'+
                '<button id="hxAiExtE" type="button" class="hxAiBtn2">✏️ 改这套</button>'+
                '<button id="hxAiExtD" type="button" class="hxAiBtn2">🗑 删除</button>'+
                '</div>';
        }
      }
      body.innerHTML=html;
      $('hxAiBack').addEventListener('click', renderL1);
      var go=$('hxAiGo'); if(go) go.addEventListener('click', function(){ doRun(it); });
      /* v0.16.0 刀B：自建改/删接线（删前人话confirm；改=进自建编辑页） */
      var exE=$('hxAiExtE'); if(exE) exE.addEventListener('click', function(){ renderExtEdit(it); });
      var exD=$('hxAiExtD'); if(exD) exD.addEventListener('click', function(){
        try{
          if(!window.confirm('删掉自建功能「'+(it.name||'')+'」？（提示词一起删，找不回）')) return;
          var arr=extLoad(), out=[];
          for(var i=0;i<arr.length;i++){ if(arr[i] && arr[i].id!==it.id) out.push(arr[i]); }
          extSave(out); renderL1(); aiToast('已删除');
        }catch(e){ warn('ai 自建删: '+((e&&e.message)||e)); }
      });
      Array.prototype.forEach.call(body.querySelectorAll('[data-hxaip]'), function(el){
        el.addEventListener('click', function(){ renderPEdit(it, parseInt(el.getAttribute('data-hxaip'),10)); }); /* v0.11.0 点一套=进编辑页（可改可存再发送） */
      });
    }
    /* v0.11.0 提示词编辑页：全文可改；▶用这套发送（没存也照新话发）/💾存为默认/↩恢复出厂 */
    function renderPEdit(it, i){
      var body=$('hxAiBody'); if(!body) return;
      var pname=(it.prompts&&it.prompts[i]&&it.prompts[i].name)||('第'+(i+1)+'套');
      body.innerHTML='<div class="hxAiBack" id="hxAiBack">← 返回</div>'+
        '<div class="hxAiL2Title">'+escH(it.icon||'🤖')+' '+escH(it.name||it.id)+' · '+escH(pname)+'</div>'+
        '<div class="hxAiDesc">提示词可改；改完点「💾存为默认」下回还用这套，「▶用这套发送」=就用屏幕上这份发</div>'+
        '<textarea id="hxAiTa" class="hxAiTa" rows="10"></textarea>'+
        '<div class="hxAiBtnRow">'+
        '<button id="hxAiSend" type="button" class="hxAiGo" style="flex:1.4;margin-top:0">▶ 用这套发送</button>'+
        '<button id="hxAiSaveP" type="button" class="hxAiBtn2">💾 存为默认</button>'+
        '<button id="hxAiResetP" type="button" class="hxAiBtn2">↩ 恢复出厂</button>'+
        '</div>'+
        /* v0.16.0 刀C/刀D：AI帮改+自建换心（结果都只进编辑框过目，💾存为默认才落账，恢复出厂兜底） */
        '<div class="hxAiBtnRow">'+
        '<button id="hxAiAIEdit" type="button" class="hxAiBtn2">🤖 让AI帮我改</button>'+
        '<button id="hxAiSwap" type="button" class="hxAiBtn2">📥 自建的灌进来</button>'+
        '<button id="hxAiSwapAI" type="button" class="hxAiBtn2">🤖 照自建的改</button>'+
        '</div>'+
        '<div id="hxAiHostBtns"></div>'; /* v0.16.3 刀B：宿主钩子容器——宿主传了editHooks才有内容，没传恒空不占版面（空div无样式零影响） */
      var ta=$('hxAiTa'); ta.value=effPrompt(it, i);
      $('hxAiBack').addEventListener('click', function(){ renderL2(it); });
      $('hxAiSend').addEventListener('click', function(){ doSend(it, i, ta.value); });
      $('hxAiSaveP').addEventListener('click', function(){
        try{
          if(typeof it.pset==='function'){ it.pset(i, ta.value); }
          else { var ov=ovLoad(); if(!ov[it.id]) ov[it.id]={}; ov[it.id][i]=ta.value; ovSave(ov); }
          aiToast('💾 已存为默认');
        }catch(e){ warn('ai pset: '+((e&&e.message)||e)); }
      });
      $('hxAiResetP').addEventListener('click', function(){
        try{
          if(typeof it.preset==='function'){ it.preset(i); }
          else { var ov=ovLoad(); if(ov[it.id]){ delete ov[it.id][i]; } ovSave(ov); }
          ta.value=effPrompt(it, i); aiToast('↩ 已恢复出厂');
        }catch(e){ warn('ai preset: '+((e&&e.message)||e)); }
      });
      /* v0.16.0 刀C：让AI帮我改——人话要求+编辑框现话→AI新稿只回进编辑框，💾存为默认才落账 */
      var aiE=$('hxAiAIEdit'); if(aiE) aiE.addEventListener('click', function(){
        try{
          if(!_send){ aiToast('本软件还没接AI通道'); return; }
          try{ if(!HX.keys.get() && !HX.keys.getQwen()){ aiAskKey(); return; } }catch(e){} /* v0.16.1 刀C：没key当场弹填钥匙浮层（原提示话作浮层标题），return不变 */
          aiAskHuman('想改成什么样？说人话（比如：加一条顺便看用药冲突）', function(req){
            if(req===null) return;
            if(!req){ aiToast('要求要填一句'); return; }
            aiDraftPrompt(req, ta.value, function(d){ if(d!=null){ ta.value=d; aiToast('新稿已进框，过目后点「💾存为默认」才算数'); } });
          });
        }catch(e){ warn('ai AI改: '+((e&&e.message)||e)); }
      });
      /* v0.16.0 刀D①：自建整套灌进编辑框（小浮层挑，不盖编辑框） */
      var sw=$('hxAiSwap'); if(sw) sw.addEventListener('click', function(){
        renderExtPick('点一套自建的，提示词整套灌进当前编辑框', function(x){
          if(x){ ta.value=String(x.text||''); aiToast('已灌进框，过目后点「💾存为默认」才算数'); }
        });
      });
      /* v0.16.0 刀D②：照自建的让AI糅一版（现话+自建全文+人话要求） */
      var swA=$('hxAiSwapAI'); if(swA) swA.addEventListener('click', function(){
        try{
          if(!_send){ aiToast('本软件还没接AI通道'); return; }
          try{ if(!HX.keys.get() && !HX.keys.getQwen()){ aiAskKey(); return; } }catch(e){} /* v0.16.1 刀C：没key当场弹填钥匙浮层（原提示话作浮层标题），return不变 */
          renderExtPick('点一套自建的当参照，AI照着它改当前这套', function(x){
            if(!x) return;
            aiAskHuman('还有啥要求？说人话（没有就写：没有）', function(req){
              if(req===null) return; /* 终审P1修：取消必须中止，不许吞了照发 */
              if(!req) req='没有别的要求，参照自建那套把当前这套改好';
              aiDraftPrompt(req, ta.value, function(d){ if(d!=null){ ta.value=d; aiToast('新稿已进框，过目后点「💾存为默认」才算数'); } }, String(x.text||''));
            });
          });
        }catch(e){ warn('ai 照自建改: '+((e&&e.message)||e)); }
      });
      /* v0.16.3 刀B：宿主编辑页钩子——渲染编辑页末尾调 _editHooks(itemId, idx, api)，宿主往 #hxAiHostBtns 容器里加自家钮；
         api.saveNow与「💾存为默认」同一条存储链（it.pset优先，否则覆盖账本hx_aiprompt_v1）；宿主没传钩子/钩子返回空=容器留空，版面同老版；全try护栏 */
      try{
        if(typeof _editHooks==='function'){
          var _hb=$('hxAiHostBtns');
          if(_hb){
            _editHooks(String(it.id||''), i, {
              itemId:String(it.id||''), idx:i,
              getText:function(){ try{ return String(ta.value||''); }catch(e){ return ''; } },
              setText:function(v){ try{ ta.value=String(v==null?'':v); }catch(e){} },
              saveNow:function(){
                try{
                  if(typeof it.pset==='function'){ it.pset(i, ta.value); }
                  else { var ov2=ovLoad(); if(!ov2[it.id]) ov2[it.id]={}; ov2[it.id][i]=ta.value; ovSave(ov2); }
                  aiToast('💾 已存为默认');
                  return true;
                }catch(e){ warn('ai saveNow: '+((e&&e.message)||e)); return false; }
              }
            });
          }
        }
      }catch(e){ warn('ai editHooks: '+((e&&e.message)||e)); }
    }
    /* v0.16.0 刀B/C/D共用：问一句人话（宿主hxAsk优先，没有则window.prompt）；取消回null，空串trim后回'' */
    function aiAskHuman(q, cb){
      try{
        if(typeof window.hxAsk==='function'){ window.hxAsk(q,'','',function(v){ if(v===null||v===undefined){ cb(null); return; } cb(String(v||'').replace(/^\s+|\s+$/g,'')); },'好'); }
        else{ var v=window.prompt(q,''); if(v===null||v===undefined){ cb(null); return; } cb(String(v||'').replace(/^\s+|\s+$/g,'')); }
      }catch(e){ warn('ai 问人话: '+((e&&e.message)||e)); try{ cb(null); }catch(e2){} }
    }
    /* v0.16.0 刀B/C/D共用：AI代写提示词——sys=工程师嘱咐，usr=要求（+现话+参照稿）；结果只回回调进编辑框/过目页，绝不直接落账；
       等待期面板体顶部插一行小字状态（不盖编辑框），回来即摘；失败toast回null */
    function aiDraftPrompt(req, curText, cb, refText){
      try{
        if(!_send){ aiToast('本软件还没接AI通道'); try{ cb(null); }catch(e0){} return; }
        var body=$('hxAiBody');
        try{ if(body && !$('hxAiBusy')){ var busy=document.createElement('div'); busy.id='hxAiBusy'; busy.className='hxAiDesc'; busy.textContent='🤖 AI正在写提示词，稍等…（约几秒到几十秒）'; body.insertBefore(busy, body.firstChild); } }catch(e){}
        var done=function(v){ try{ var b=$('hxAiBusy'); if(b) b.remove(); }catch(e){} try{ cb(v); }catch(e2){} };
        var sys='你是一位提示词工程师。用户是医生，要给病历分析AI写一套提示词。请根据用户的要求，写出一段直接可用的提示词（吩咐AI怎么干活的那段话）。要求：中文、具体、可执行、结构清楚；只输出提示词本身，不要解释、不要前后缀。';
        var usr='【用户要求】\n'+req;
        if(curText) usr+='\n\n【现有提示词全文，在此基础上改】\n'+curText;
        if(refText) usr+='\n\n【用户自建的一套提示词，作参照】\n'+refText;
        _send(sys, usr, function(r){
          var t=String(r||'').replace(/^\s+|\s+$/g,'');
          if(!t){ aiToast('AI没写出东西来，点🔄再试'); done(null); return; }
          done(t);
        }, function(err){ aiToast('AI这条路不通：'+String(err||'').slice(0,60)); done(null); });
      }catch(e){ warn('ai 代写: '+((e&&e.message)||e)); try{ cb(null); }catch(e2){} }
    }
    /* v0.16.0 刀D：自建套挑选小浮层（挂在面板尾部不盖编辑框）；空=toast提示；✕/选好都收起 */
    function renderExtPick(title, cb){
      try{
        var arr=extLoad();
        if(!arr.length){ aiToast('还没有自建套，先去底下「＋加AI功能」加一套'); return; }
        var p=$('hxAiPanel'); if(!p) return;
        var old=$('hxAiExtPick'); if(old) old.remove();
        var box=document.createElement('div'); box.id='hxAiExtPick';
        box.style.cssText='border:1px solid #d8cfc0;border-radius:10px;background:#fff;margin-top:8px;padding:8px';
        var html='<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:14px;color:#4a4238">'+escH(title)+'</b><span id="hxAiExtPickX" style="cursor:pointer;padding:2px 8px">✕</span></div>';
        for(var i=0;i<arr.length;i++){ html+='<div class="hxAiRow" data-extp="'+i+'"><span class="hxAiIco">🛠</span><span class="hxAiName">'+escH(arr[i].name||'')+'</span></div>'; }
        box.innerHTML=html;
        p.appendChild(box);
        $('hxAiExtPickX').addEventListener('click', function(){ box.remove(); });
        Array.prototype.forEach.call(box.querySelectorAll('[data-extp]'), function(el){
          el.addEventListener('click', function(){
            var x=arr[parseInt(el.getAttribute('data-extp'),10)];
            box.remove();
            if(x) cb(x);
          });
        });
      }catch(e){ warn('ai 挑自建: '+((e&&e.message)||e)); }
    }
    /* v0.11.0 带提示词发送：runWith钩子优先（宿主自己把话送进它老流程）；没有则摆一次性待发后跑run（宿主函数里pget查账取用） */
    function doSend(it, i, text){
      _inRun=true;
      pickBadge(); /* 2026-09-16 班① 第5条：每次发送前刷新亮牌行（只展示，不改发送内容） */
      try{
        if(typeof it.runWith==='function'){ it.runWith(i, text); }
        else { _pend={id:it.id, idx:i, text:text}; try{ it.run(); }finally{ _pend=null; } }
      }catch(e){ warn('ai send: '+((e&&e.message)||e)); }
      _inRun=false;
    }
    /* 面板触发run：执行期间ready()返false防宿主拦截行套娃；错误只warn不外抛 */
    function doRun(it){
      _inRun=true;
      pickBadge(); /* 2026-09-16 班① 第5条：每次发送前刷新亮牌行（只展示，不改发送内容） */
      try{ it.run(); }catch(e){ warn('ai run: '+((e&&e.message)||e)); }
      _inRun=false;
    }
    /* 生成器条目结果显示：面板内简单回显（宿主send只负责把话要回来） */
    function showResult(name, r){
      try{
        var body=$('hxAiBody'); if(!body) return;
        var p=$('hxAiPanel'); if(p) p.style.display='block';
        body.innerHTML='<div class="hxAiBack" id="hxAiBack">← 返回</div><div class="hxAiL2Title">🛠 '+escH(name)+'</div><pre class="hxAiResult">'+escH(r)+'</pre>';
        $('hxAiBack').addEventListener('click', renderL1);
      }catch(e){}
    }
    /* 2026-09-16 班① 第5条：面板顶部亮牌行——面板打开时和每次发送前刷新；只读HX.pick账本，发送内容仍由宿主决定，不新造数据通道 */
    function pickBadge(){
      try{
        var b=$('hxAiPick'); if(!b) return;
        var o=(HX.pick && HX.pick.get) ? HX.pick.get() : null;
        if(o){
          b.textContent='📄已点亮：'+(o.fname||o.pkey)+'（会一直随行发AI / 再长按换一份）'; /* v0.16.4 刀1：点亮长效后改口（原"点✓确认发送"30秒语境作废） */
          b.style.background='#eef4fb'; b.style.color='#3a5a78'; b.style.borderColor='#c9d9ea';
          /* v0.16.4 刀1（洪老师2026-09-23班③拍板点亮长效）：亮牌点亮文字旁加小「✕」手动取消——点了清账本+亮牌消失+toast「已取消点亮」；
             点亮的文件会一直随行发AI，不想要了点这里取消 */
          try{
            var _bx=document.createElement('span'); _bx.textContent=' ✕';
            _bx.style.cssText='cursor:pointer;color:#b0443c;font-weight:700;padding:0 4px;';
            _bx.addEventListener('click', function(ev){
              try{ if(ev&&ev.stopPropagation) ev.stopPropagation(); }catch(e){}
              try{ if(HX.pick&&HX.pick.clear) HX.pick.clear(); }catch(e){}
              try{ aiToast('已取消点亮'); }catch(e){}
              try{ pickBadge(); }catch(e){} /* 亮牌当场消失（刷回引导语） */
            });
            b.appendChild(_bx);
          }catch(e){}
        }else{
          b.textContent='请先到列表长按点亮一份文件';
          b.style.background='#f6f2ea'; b.style.color='#8a8178'; b.style.borderColor='#e5ddd0';
        }
      }catch(e){}
    }
    /* v0.18.0 总台状态条（洪老师2026-10-12拍板）：亮牌行（#hxAiPick）下插入/更新 #hxAirBar——
       三家✅/❌+检测时间+📡重测钮；hx_air_off=1或HX.air不在则不出现；只读账不重测 */
    function renderAirBar(){
      try{
        if(localStorage.getItem('hx_air_off')==='1' || !window.HX || !HX.air){
          var _old=$('hxAirBar'); if(_old && _old.parentNode) _old.parentNode.removeChild(_old); return;
        }
        var _pb=$('hxAiPick'); if(!_pb || !_pb.parentNode) return;
        var _host=_pb.parentNode;
        var acc=null; try{ acc=HX.air.st(); }catch(e){}
        var _bar=$('hxAirBar');
        if(!_bar){
          _bar=document.createElement('div');
          _bar.id='hxAirBar';
          _bar.style.cssText='font-size:13px;color:#6b6257;padding:4px 2px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;';
          if(_pb.nextSibling) _host.insertBefore(_bar, _pb.nextSibling);
          else _host.appendChild(_bar);
        }
        function _txt(emoji, name, id){
          var e=(acc && acc.p && acc.p[id]) ? acc.p[id] : null;
          var alive=(!e) ? true : (e.ok==1);
          var t=emoji+name;
          if(id==='kimi' && e && e.ok==1 && e.model) t+=' '+e.model;
          t+=(alive?' ✅':' ❌');
          return { txt:t, alive:alive, err:(e && e.err) || '' };
        }
        var cells=[_txt('🤖','Kimi','kimi'), _txt('🐳','DS','ds'), _txt('🧠','千问','qwen')];
        _bar.innerHTML='';
        cells.forEach(function(c){
          var s=document.createElement('span'); s.textContent=c.txt;
          if(!c.alive){ s.style.color='#999'; if(c.err) s.title=c.err; }
          _bar.appendChild(s);
        });
        var tm='';
        try{ if(acc && acc.ts){ var _d=new Date(acc.ts); tm='（'+('0'+_d.getHours()).slice(-2)+':'+('0'+_d.getMinutes()).slice(-2)+'测）'; } }catch(e){}
        if(tm){ var _ts=document.createElement('span'); _ts.textContent=tm; _ts.style.color='#aaa'; _bar.appendChild(_ts); }
        var _btn=document.createElement('span'); _btn.textContent='📡'; _btn.style.cursor='pointer'; _btn.title='重新点名';
        _btn.addEventListener('click', function(){
          try{
            _btn.textContent='📡点名中…';
            HX.air.probe(true).then(function(){ try{ renderAirBar(); }catch(e){} });
          }catch(e){ try{ renderAirBar(); }catch(e2){} }
        });
        _bar.appendChild(_btn);
      }catch(e){}
    }
    try{ if(window.HX && HX.air){ HX.air._refreshBar = renderAirBar; } }catch(e){} /* v0.18.0：挂上刷新钩子，probe完自动重画 */
    /* v0.16.0 刀B：「＋加AI功能」改AI代写流——①问名字②问人话要求→AI代写提示词→过目页（可改/🔄重写/✅才存/❌弃）；
       AI通道或Key不在时回落手填提示词（老路简化保留）；✅才落账hx_aiext_v1，AI不直接入库；v0.16.0起自建默认吃点亮病历，选中文字问句取消 */
    function genFlow(){
      try{
        aiAskHuman('① 新AI功能叫啥名？', function(name){
          if(name===null) return;
          if(!name){ aiToast('功能名要填'); return; }
          var aiOk=false;
          try{ aiOk=(!!_send) && !!(HX.keys.get() || HX.keys.getQwen()); }catch(e){}
          if(aiOk){
            aiAskHuman('② 您想让AI干什么？说人话就行（AI帮您写成提示词）', function(req){
              if(req===null) return;
              if(!req){ aiToast('要求要填一句'); return; }
              aiDraftPrompt(req, '', function(draft){
                if(draft!=null){ renderGenDraft(name, req, draft); }
                else{ renderL1(); }
              });
            });
          }else{
            aiAskHuman('② 提示词：AI要怎么干？（没接AI通道/没Key只能手填）', function(ptext){
              if(ptext===null) return;
              finishExt({ id:'ext-'+Date.now(), name:name, text:ptext, useSel:false, icon:'🛠' });
            });
          }
        });
      }catch(e){ warn('ai 生成器: '+((e&&e.message)||e)); }
    }
    /* v0.16.0 刀B：自建入库（✅才调这里）；名字/提示词空不存 */
    function finishExt(x){
      try{
        x.text=String(x.text||'').replace(/^\s+|\s+$/g,'');
        if(!x.name || !x.text){ aiToast('功能名和提示词都要填'); return; }
        var arr=extLoad(); arr.push(x); extSave(arr);
        renderL1(); aiToast('已加到清单末尾（标「自建」）');
      }catch(e){ warn('ai 自建存: '+((e&&e.message)||e)); }
    }
    /* v0.16.0 刀B：生成器过目页——AI草稿进框可手改；✅存了才进清单；🔄重写（重跑代写，失败回旧稿）；❌弃=回清单啥都不留 */
    function renderGenDraft(name, req, draft){
      try{
        var body=$('hxAiBody'); if(!body) return;
        body.innerHTML='<div class="hxAiBack" id="hxAiBack">← 返回</div>'+
          '<div class="hxAiL2Title">🛠 '+escH(name)+' · AI写的提示词草稿</div>'+
          '<div class="hxAiDesc">过目一遍，字能直接改；✅存了才进清单，❌不要了啥都不留</div>'+
          '<textarea id="hxAiTa" class="hxAiTa" rows="10"></textarea>'+
          '<div class="hxAiBtnRow">'+
          '<button id="hxAiGenOk" type="button" class="hxAiGo" style="flex:1.4;margin-top:0">✅ 就用这套存起来</button>'+
          '<button id="hxAiGenRe" type="button" class="hxAiBtn2">🔄 重写一版</button>'+
          '<button id="hxAiGenNo" type="button" class="hxAiBtn2">❌ 不要了</button>'+
          '</div>';
        var ta=$('hxAiTa'); ta.value=draft;
        $('hxAiBack').addEventListener('click', renderL1);
        $('hxAiGenOk').addEventListener('click', function(){
          finishExt({ id:'ext-'+Date.now(), name:name, text:ta.value, useSel:false, icon:'🛠' });
        });
        $('hxAiGenRe').addEventListener('click', function(){
          var old2=ta.value;
          aiDraftPrompt(req, '', function(d){ if(d!=null){ renderGenDraft(name, req, d); } else { renderGenDraft(name, req, old2); } });
        });
        $('hxAiGenNo').addEventListener('click', function(){ renderL1(); aiToast('没存，啥都没动'); });
      }catch(e){ warn('ai 过目页: '+((e&&e.message)||e)); }
    }
    /* v0.16.0 刀B：自建条目编辑页——提示词全文可改，💾存回hx_aiext_v1原条；🤖让AI帮我改=人话要求+现话→新稿只回框 */
    function renderExtEdit(it){
      try{
        var body=$('hxAiBody'); if(!body) return;
        var x=it._raw||{};
        body.innerHTML='<div class="hxAiBack" id="hxAiBack">← 返回</div>'+
          '<div class="hxAiL2Title">✏️ 改自建「'+escH(it.name||'')+'」</div>'+
          '<div class="hxAiDesc">提示词全文可改，💾存回才作数</div>'+
          /* v0.17.0 刀H2（2026-09-24班②一期，效果图mock3）：升舱字段——「这套是从哪个出厂套改来的？」下拉（存baseId）+升舱徽章+「📮申请收编」钮（存wantShibu=true） */
          '<div class="hxAiDesc" style="padding-bottom:2px">这套是从哪个出厂套改来的？</div>'+
          '<select id="hxAiExtBase" style="width:100%;box-sizing:border-box;font-size:14px;padding:6px;border:1px solid #d8cfc0;border-radius:10px;background:#fff;color:#4a4238"></select>'+
          '<div style="margin:6px 0"><span id="hxAiExtBadge" style="display:inline-block;font-size:12px;color:#7a5a26;background:#fdf3e3;border:1px solid #d9b36c;border-radius:8px;padding:2px 8px"></span></div>'+
          '<textarea id="hxAiTa" class="hxAiTa" rows="10"></textarea>'+
          '<div class="hxAiBtnRow">'+
          '<button id="hxAiExtS" type="button" class="hxAiGo" style="flex:1.4;margin-top:0">💾 存回</button>'+
          '<button id="hxAiExtAI" type="button" class="hxAiBtn2">🤖 让AI帮我改</button>'+
          '<button id="hxAiExtShibu" type="button" class="hxAiBtn2">📮 申请收编</button>'+ /* v0.17.0 刀H2 */
          '</div>';
        var ta=$('hxAiTa'); ta.value=String(x.text||'');
        /* v0.17.0 刀H2：下拉选项=宿主manifest各item名+「全新功能」，选中即存baseId；徽章/申请收编存wantShibu（老条目没这两字段undefined兜底照常工作；账本键/JSON格式不动） */
        try{
          var sel=$('hxAiExtBase');
          if(sel){
            var h0='<option value="">全新功能</option>';
            for(var bi=0;bi<_manifest.length;bi++){ var bm=_manifest[bi]; if(bm&&bm.id) h0+='<option value="'+escH(bm.id)+'">'+escH(bm.name||bm.id)+'（'+escH(bm.id)+'）</option>'; }
            sel.innerHTML=h0;
            sel.value=String(x.baseId||'');
            sel.addEventListener('change', function(){
              try{
                var arr2=extLoad();
                for(var i2=0;i2<arr2.length;i2++){ if(arr2[i2]&&arr2[i2].id===it.id){ arr2[i2].baseId=sel.value; break; } }
                extSave(arr2); aiToast('已记下这套的出处');
              }catch(e){ warn('ai baseId: '+((e&&e.message)||e)); }
            });
          }
          var badge=$('hxAiExtBadge');
          function _refBadge(){ try{ if(badge) badge.textContent=_extBadgeTxt(x); }catch(e){} }
          _refBadge();
          var shb=$('hxAiExtShibu');
          if(shb) shb.addEventListener('click', function(){
            try{
              var arr3=extLoad();
              for(var i3=0;i3<arr3.length;i3++){ if(arr3[i3]&&arr3[i3].id===it.id){ arr3[i3].wantShibu=true; x.wantShibu=true; break; } }
              extSave(arr3); _refBadge();
              aiToast('已记下，下次接班跟助理说一声收编，下版写进软件出厂');
            }catch(e){ warn('ai 申请收编: '+((e&&e.message)||e)); }
          });
        }catch(e){ warn('ai 升舱字段: '+((e&&e.message)||e)); }
        $('hxAiBack').addEventListener('click', function(){ renderL2(it); });
        $('hxAiExtS').addEventListener('click', function(){
          try{
            var arr=extLoad();
            for(var i=0;i<arr.length;i++){ if(arr[i] && arr[i].id===it.id){ arr[i].text=ta.value; break; } }
            extSave(arr); aiToast('💾 已存回'); renderL2(it);
          }catch(e){ warn('ai 自建改: '+((e&&e.message)||e)); }
        });
        var exAI=$('hxAiExtAI'); if(exAI) exAI.addEventListener('click', function(){
          try{
            if(!_send){ aiToast('本软件还没接AI通道'); return; }
            try{ if(!HX.keys.get() && !HX.keys.getQwen()){ aiAskKey(); return; } }catch(e){} /* v0.16.1 刀C：没key当场弹填钥匙浮层（原提示话作浮层标题），return不变 */
            aiAskHuman('想改成什么样？说人话', function(req){
              if(req===null) return;
              if(!req){ aiToast('要求要填一句'); return; }
              aiDraftPrompt(req, ta.value, function(d){ if(d!=null){ ta.value=d; aiToast('新稿已进框，过目后点「💾存回」才算数'); } });
            });
          }catch(e){ warn('ai 自建AI改: '+((e&&e.message)||e)); }
        });
      }catch(e){ warn('ai 自建编辑: '+((e&&e.message)||e)); }
    }
    function ensureUI(){
      if($('hxAiPanel')) return true;
      try{
        if(!document.body) return false;
        var st=document.createElement('style'); st.id='hxAiStyle';
        st.textContent=
          "#hxAiPanel{position:fixed;right:14px;bottom:150px;width:340px;max-width:88vw;max-height:70vh;overflow:auto;background:#fffdf8;border:1px solid #e5ddd0;border-radius:14px;box-shadow:0 6px 24px rgba(0,0,0,.18);z-index:99993;padding:12px;display:none}\n"+
          "#hxAiHead{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}\n"+
          "#hxAiTitle{font-size:16px;font-weight:bold;color:#4a4238}\n"+
          "#hxAiClose{border:none;border-radius:8px;background:#efe9df;color:#6b6257;font-size:14px;padding:4px 10px;cursor:pointer}\n"+
          "#hxAiBody .hxAiRow{display:flex;align-items:center;gap:8px;padding:10px 6px;border-bottom:1px dashed #e6e0d4;cursor:pointer;font-size:16px;color:#4a4238}\n"+
          "#hxAiBody .hxAiIco{flex:none}\n"+
          "#hxAiBody .hxAiName{flex:1;min-width:0}\n"+
          "#hxAiBody .hxAiHere{font-size:12px;color:#5a8f5f;flex:none}\n"+
          "#hxAiBody .hxAiCustom{font-size:12px;color:#a89c8d;flex:none}\n"+
          "#hxAiBody .hxAiEmpty{font-size:14px;color:#a89c8d;padding:14px 6px}\n"+
          "#hxAiBody .hxAiBack{font-size:14px;color:#1a73e8;cursor:pointer;padding:6px 0}\n"+
          "#hxAiBody .hxAiL2Title{font-size:16px;font-weight:bold;color:#4a4238;padding:4px 0}\n"+
          "#hxAiBody .hxAiDesc{font-size:13px;color:#8a8178;padding:4px 0 8px}\n"+
          "#hxAiBody .hxAiGo{display:block;width:100%;font-size:18px;padding:12px 0;border:none;border-radius:10px;background:#7a9e7e;color:#fff;cursor:pointer;margin-top:8px}\n"+
          "#hxAiBody .hxAiPromptBtn{border:1px solid #7a9e7e;border-bottom:1px solid #7a9e7e;background:#eef6ee;border-radius:10px;margin:6px 0;padding:12px 10px;font-weight:bold;color:#3f6b43}\n"+ /* v0.15.1（挂号E）：提示词套大钮样式——▶图标+边框+圆角+绿系底色（照.hxAiGo绿色系），一眼是可点的钮 */
          "#hxAiBody .hxAiPromptIco{flex:none;color:#7a9e7e;font-weight:bold}\n"+ /* v0.15.1 */
          "#hxAiBody .hxAiResult{white-space:pre-wrap;word-break:break-word;font-size:14px;line-height:1.7;color:#4a4238;background:#fff;border:1px solid #e5ddd0;border-radius:10px;padding:10px;max-height:46vh;overflow:auto}\n"+
          "#hxAiBody .hxAiTa{width:100%;box-sizing:border-box;font-size:14px;line-height:1.6;color:#4a4238;background:#fff;border:1px solid #d8cfc0;border-radius:10px;padding:8px}\n"+
          "#hxAiBody .hxAiBtnRow{display:flex;gap:8px;margin-top:8px;align-items:stretch}\n"+
          "#hxAiBody .hxAiBtn2{flex:1;font-size:14px;padding:10px 0;border:none;border-radius:10px;background:#efe9df;color:#6b6257;cursor:pointer}\n"+
          "#hxAiFoot{margin-top:8px;text-align:center}\n"+
          "#hxAiAdd{border:none;background:none;color:#1a73e8;font-size:14px;text-decoration:underline;cursor:pointer;padding:6px}\n"+
          "#hxSjPanel #hxSjAiBtn{background:#efe9df;color:#6b6257}\n"+
          "#hxAiToast{position:fixed;left:50%;bottom:160px;transform:translateX(-50%);background:rgba(74,64,48,.92);color:#fff;padding:10px 20px;border-radius:20px;font-size:16px;z-index:99994;display:none}";
        document.head.appendChild(st);
        var wrap=document.createElement('div');
        wrap.innerHTML=
          '<div id="hxAiPanel">'+
          '  <div id="hxAiHead"><span id="hxAiTitle">🤖 AI功能</span><button id="hxAiClose" type="button">✕</button></div>'+
          '  <div id="hxAiBody"></div>'+
          '  <div id="hxAiFoot"><button id="hxAiAdd" type="button">＋加AI功能</button></div>'+
          '</div>'+
          '<div id="hxAiToast"></div>';
        while(wrap.firstChild){ document.body.appendChild(wrap.firstChild); }
        $('hxAiClose').addEventListener('click', function(){ $('hxAiPanel').style.display='none'; });
        $('hxAiAdd').addEventListener('click', genFlow);
        /* 2026-09-16 班① 第5条：面板顶部亮牌行（只增：插在标题行下、清单体上） */
        try{
          var _pb=document.createElement('div'); _pb.id='hxAiPick';
          _pb.style.cssText='font-size:13px;line-height:1.5;border:1px solid;border-radius:8px;padding:6px 8px;margin-bottom:6px;word-break:break-all';
          var _pn=$('hxAiPanel'), _hd=$('hxAiHead');
          if(_pn){ _pn.insertBefore(_pb, _hd ? _hd.nextSibling : _pn.firstChild); pickBadge(); }
        }catch(e){}
        return true;
      }catch(e){ warn('ai UI注入失败: '+((e&&e.message)||e)); return false; }
    }
    /* 速记面板「🤖AI」钮：sj先建UI时sj那边条件未过，这里补上（HX.ai已init才出，符合军规）；点击=关速记面板+HX.ai.open() */
    function sjAiBtnAdd(){
      try{
        var btns=document.querySelector('#hxSjPanel .hxSjBtns'); if(!btns) return;
        if($('hxSjAiBtn')) return;
        var b=document.createElement('button'); b.id='hxSjAiBtn'; b.type='button'; b.textContent='🤖AI';
        btns.appendChild(b);
        b.addEventListener('click', function(){ try{ $('hxSjPanel').style.display='none'; }catch(e){} try{ ai.open(); }catch(e){} });
      }catch(e){}
    }
    /* HX.ai.init(opt)：opt={app, manifest, getSection, send可选, litText可选(v0.16.0)}；重复init只更新manifest不重复绑；document ready后注入UI */
    ai.init = function(opt){
      try{
        opt = opt || {};
        if(opt.app) _app = String(opt.app);
        if(!_app) _app = '未命名软件';
        if(opt.manifest && opt.manifest.length!==undefined) _manifest = opt.manifest;
        if(typeof opt.getSection === 'function') _getSection = opt.getSection;
        if(typeof opt.send === 'function') _send = opt.send;
        if(typeof opt.litText === 'function') _litText = opt.litText; /* v0.16.0 刀A：宿主点亮取文钩子 */
        if(typeof opt.editHooks === 'function') _editHooks = opt.editHooks; /* v0.16.3 刀B：宿主编辑页钩子（不传=容器留空，老版行为不变） */
        if(_inited){ return; } /* 重复init只更新manifest等参数，不重复绑 */
        _inited = true;
        var boot = function(){
          try{
            if(ensureUI()){ _uiOk = true; sjAiBtnAdd(); }
          }catch(e){ warn('ai init: '+((e&&e.message)||e)); }
        };
        if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', boot); } else { boot(); }
      }catch(e){ warn('ai init: '+((e&&e.message)||e)); }
    };
    /* HX.ai.open(id)：传id直接进该条目第2层，不传显示第1层全清单 */
    ai.open = function(id){
      try{
        if(!_uiOk){ if(ensureUI()){ _uiOk = true; sjAiBtnAdd(); } else return; }
        var p=$('hxAiPanel'); if(!p) return;
        if(id){
          var list=allItems(), hit=null;
          for(var i=0;i<list.length;i++){ if(list[i].id===id){ hit=list[i]; break; } }
          if(hit){ renderL2(hit); } else { renderL1(); }
        }else{
          renderL1();
        }
        p.style.display='block';
        pickBadge(); /* 2026-09-16 班① 第5条：面板打开时刷新亮牌行 */
        try{ renderAirBar(); }catch(e){} /* v0.18.0：面板打开时刷新总台状态条（读账不重测） */
      }catch(e){ warn('ai open: '+((e&&e.message)||e)); }
    };
    /* HX.ai.ready()：面板是否可用（UI注入成功）；面板触发run执行期间短暂返false防套娃 */
    ai.ready = function(){ return !!(_uiOk && !_inRun); };
    /* v0.16.3 刀A HX.ai.openEdit(id, idx)：open(id)进该条目第2层后，模拟第idx套提示词按钮的现有点击链
       （第2层渲染出的 [data-hxaip="idx"] 行 .click()）自动进该套编辑页——编辑页代码不复制不另起炉灶；
       条目不存在/没这套/UI没就位一律静默返回false，成功返回true */
    ai.openEdit = function(id, idx){
      try{
        ai.open(id); /* 复用open：UI没就位它会自己ensureUI，都不行直接return */
        var p=$('hxAiPanel'); if(!p || p.style.display!=='block') return false;
        if(!_flatOff()){ /* v0.17.0 刀H1：平铺模式不再依赖L2的[data-hxaip]按钮DOM，直接定位item+调renderPEdit（大管家gjPickGrindGo质检链照常进编辑页）；老模式走下面老路一字未动 */
          var _oeList=allItems(), _oeHit=null;
          for(var _oi=0;_oi<_oeList.length;_oi++){ if(_oeList[_oi].id===id){ _oeHit=_oeList[_oi]; break; } }
          if(!_oeHit||!_oeHit.prompts||!_oeHit.prompts[parseInt(idx,10)]) return false;
          renderPEdit(_oeHit, parseInt(idx,10));
          return true;
        }
        var body=$('hxAiBody'); if(!body) return false;
        var btn=body.querySelector('[data-hxaip="'+parseInt(idx,10)+'"]');
        if(!btn) return false;
        btn.click(); /* 现有点击链：renderL2绑的click→renderPEdit(it, idx) */
        return true;
      }catch(e){ warn('ai openEdit: '+((e&&e.message)||e)); return false; }
    };
    /* v0.11.0 HX.ai.pget(itemId, idx)：宿主函数发送前查一句——一次性待发>覆盖账本>都没有返null（宿主用自己内嵌出厂值）。
       用法：sys = (window.HX&&HX.ai&&HX.ai.pget ? HX.ai.pget('条目id',0) : null) || sys; */
    ai.pget = function(itemId, idx){
      try{
        if(_pend && _pend.id===itemId && _pend.idx===idx) return _pend.text;
        var ov=ovLoad(); var hit=ov[itemId];
        if(hit && hit[idx]!=null) return String(hit[idx]);
      }catch(e){}
      return null;
    };
    return ai;
  })();

  /* ════ 5.5b 长按点亮零件 HX.pick（v0.13.0 新增，2026-09-16 班① 第5条；只增不改原则挂在HX下） ════
     用法：宿主给列表行加 data-pkey="唯一键"（可选 data-fname="文件名"），调 HX.pick.bind(root) 即绑好；
     长按1.5秒未移动超10px=点亮该行（加class hx-picked+写账本hx_pick_v1+toast）；再长按同一行=熄灭，长按别行=自动换；
     v0.16.4（洪老师2026-09-23班③拍板「点亮长效」：30秒太短，点亮翻菜单翻半分钟就灭）——30秒自动灭整段撤掉，
     点亮后一直有效，直到①点亮别的件（覆盖老行为不动）②手动取消（面板亮牌行的✕或HX.pick.clear()）；
     点亮随行发AI的老行为不变（点亮的文件会一直随行，不想要了点✕取消）；
     发送方调 HX.pick.get() 取 {app,pkey,fname,ts}，有就返没有返null（不再过期）；
     无localStorage/无触摸环境一律静默不炸。 */
  HX.pick = (function(){
    var pk = {};
    pk.app = ''; /* 2026-09-16 班① 第5条：宿主可设 HX.pick.app='软件名'，写账本用 */
    var LSK = 'hx_pick_v1';   /* 点亮账本键：值 JSON {app,pkey,fname,ts}（ts=Date.now()毫秒） */
    var HOLD_MS = 1500;       /* 长按判定：按住≥1.5秒 */
    var MOVE_PX = 10;         /* 移动超10px=取消本次长按 */
    /* v0.16.4 刀1（洪老师2026-09-23班③拍板「点亮长效」）：TTL_MS与_killTimer（30秒有效期+30秒自动灭定时器）整段撤掉——
       30秒太短，点亮翻菜单翻半分钟就灭；点亮后一直有效，直到点亮别的件（覆盖）或手动取消（亮牌✕/pk.clear()） */
    var _ctxBound = false;    /* contextmenu 全局只绑一次 */
    function lsGet(){ try{ var s=localStorage.getItem(LSK); if(!s) return null; var o=JSON.parse(s); return (o && o.pkey) ? o : null; }catch(e){ return null; } } /* 无localStorage静默返null */
    function lsSet(o){ try{ localStorage.setItem(LSK, JSON.stringify(o)); }catch(e){} }
    function lsDel(){ try{ localStorage.removeItem(LSK); }catch(e){} }
    /* ES5老WebView兼容的class操作（不用classList） */
    function hasCls(el, c){ return !!el && (' '+el.className+' ').indexOf(' '+c+' ') >= 0; }
    function addCls(el, c){ try{ if(el && !hasCls(el,c)) el.className = (el.className ? el.className+' ' : '') + c; }catch(e){} }
    function rmCls(el, c){ try{ if(el) el.className = (' '+el.className+' ').replace(' '+c+' ',' ').replace(/^\s+|\s+$/g,''); }catch(e){} }
    /* toast人话，默认3秒自消（2026-09-16 班① 第5条）；v0.18.1 刀4 默认不自动消失，点别处或✕才消失 */
    function pkToast(m, ms){
      try{
        var d=document.createElement('div'); d.textContent=m;
        d.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#4a6b8f;color:#fff;padding:10px 18px;border-radius:20px;font-size:14px;z-index:99999;box-shadow:0 2px 8px rgba(0,0,0,.25)';
        document.body.appendChild(d);
        var off=false; try{ off=(localStorage.getItem('hx_toast_sticky_off')==='1'); }catch(e){ off=false; }
        if(off){
          setTimeout(function(){ try{ if(d.remove) d.remove(); else if(d.parentNode) d.parentNode.removeChild(d); }catch(e){} }, ms||3000);
        } else {
          hxToastHold(d, function(){ try{ if(d.remove) d.remove(); else if(d.parentNode) d.parentNode.removeChild(d); }catch(e){} });
        }
      }catch(e){}
    }
    /* 清页面上所有点亮样式 */
    function clearPicked(){ try{ var els=document.querySelectorAll('.hx-picked'); for(var i=0;i<els.length;i++) rmCls(els[i],'hx-picked'); }catch(e){} }
    /* v0.16.4 刀1：armKill（30秒自动灭定时器）整段撤掉——点亮长效，不再到点自动灭（洪老师2026-09-23班③拍板） */
    /* 注入CSS（防重）：点亮样式低饱和蓝；候选行 user-select:none 防长按选中文字 */
    function ensureCss(){
      try{
        if(document.getElementById('hxPickStyle')) return;
        var st=document.createElement('style'); st.id='hxPickStyle';
        st.textContent='.hx-picked{background:#dce8f7 !important;outline:2px solid #4a78a8;border-radius:4px}\n'+
          '[data-pkey]{user-select:none;-webkit-user-select:none;-moz-user-select:none}'; /* 2026-09-16 班① 第5条 */
        (document.head||document.documentElement).appendChild(st);
      }catch(e){}
    }
    /* 堵安卓系统长按菜单：候选行上 contextmenu 一律 preventDefault（捕获阶段全局一次） */
    function ensureCtx(){
      if(_ctxBound) return; _ctxBound=true;
      try{
        document.addEventListener('contextmenu', function(ev){
          try{
            var t=ev.target||ev.srcElement;
            while(t && t!==document){ if(t.getAttribute && t.getAttribute('data-pkey')!=null){ ev.preventDefault(); return; } t=t.parentNode; }
          }catch(e){}
        }, true);
      }catch(e){}
    }
    /* 长按计时：按住HOLD_MS未移动=点亮 */
    function arm(el, x, y){
      disarm(el);
      el._hxPickX=x; el._hxPickY=y;
      el._hxPickT=setTimeout(function(){ el._hxPickT=null; try{ light(el); }catch(e){} }, HOLD_MS);
    }
    function disarm(el){ try{ if(el && el._hxPickT){ clearTimeout(el._hxPickT); el._hxPickT=null; } }catch(e){} }
    function moved(el, x, y){
      try{ if(el._hxPickT && (Math.abs(x-el._hxPickX)>MOVE_PX || Math.abs(y-el._hxPickY)>MOVE_PX)) disarm(el); }catch(e){}
    }
    /* 点亮/熄灭/换行 三合一：旧行样式一律先清 */
    function light(el){
      var pkey=String(el.getAttribute('data-pkey')||''); if(!pkey) return;
      var cur=lsGet();
      clearPicked(); /* 移除旧点亮行的样式 */
      if(cur && cur.pkey===pkey){ /* v0.16.4 刀1：长效点亮不再看30秒——再长按同一行=熄灭的老行为不动（原判定带TTL≤30秒才认，撤掉） */
        /* 再长按同一行=熄灭：清class（上面已清）+清账本 */
        lsDel();
        pkToast('已熄灭点亮', 3000);
        return;
      }
      /* 点亮该行（长按另一行=自动换） */
      addCls(el, 'hx-picked');
      var o={ app:pk.app||'', pkey:pkey, fname:String(el.getAttribute('data-fname')||''), ts:Date.now() };
      lsSet(o);
      /* v0.16.4 刀1：原 armKill(o.ts) 30秒自动灭撤掉——点亮后一直有效，直到点亮别的件或手动取消 */
      pkToast('已点亮：'+(o.fname||pkey)+'，点🤖就送这份（不要了点亮牌上的✕取消）', 3000); /* v0.16.4 刀1：toast补一句取消指路（点亮会一直随行发AI） */
    }
    /* HX.pick.bind(root)：扫描root（默认document）下所有 [data-pkey] 元素绑长按；元素上记标记防重复绑定 */
    pk.bind = function(root){
      try{
        root = root || document;
        ensureCss(); ensureCtx();
        var els = root.querySelectorAll('[data-pkey]');
        for(var i=0;i<els.length;i++){
          var el=els[i];
          if(el._hxPickBound) continue; /* 防重 */
          el._hxPickBound=1;
          (function(el2){
            /* 触摸路 */
            el2.addEventListener('touchstart', function(ev){ try{ var t=ev.touches&&ev.touches[0]; if(t) arm(el2, t.clientX, t.clientY); }catch(e){} }, {passive:true});
            el2.addEventListener('touchmove', function(ev){ try{ var t=ev.touches&&ev.touches[0]; if(t) moved(el2, t.clientX, t.clientY); }catch(e){} }, {passive:true});
            el2.addEventListener('touchend', function(){ disarm(el2); }); /* 提前松手=取消 */
            el2.addEventListener('touchcancel', function(){ disarm(el2); });
            /* 桌面鼠标路 */
            el2.addEventListener('mousedown', function(ev){ try{ arm(el2, ev.clientX, ev.clientY); }catch(e){} });
            el2.addEventListener('mousemove', function(ev){ try{ moved(el2, ev.clientX, ev.clientY); }catch(e){} });
            el2.addEventListener('mouseup', function(){ disarm(el2); });
            el2.addEventListener('mouseleave', function(){ disarm(el2); });
          })(el);
        }
      }catch(e){}
    };
    /* HX.pick.get()：读账本；v0.16.4 刀1撤掉30秒惰性校验（长效点亮=洪老师2026-09-23班③拍板），有就返没有返null，不再过期自动灭 */
    pk.get = function(){
      try{
        var o=lsGet(); if(!o) return null;
        return { app:String(o.app||''), pkey:String(o.pkey||''), fname:String(o.fname||''), ts:(+o.ts)||0 };
      }catch(e){ return null; }
    };
    /* HX.pick.clear()：公开熄灭口（宿主发送成功后可主动灭；v0.16.4起也是手动取消点亮的唯一口之一，另一口=亮牌✕） */
    pk.clear = function(){
      try{ lsDel(); clearPicked(); }catch(e){}
    };
    return pk;
  })();

  /* ════ 5.6 仓管员 HX.store（v0.4.0 新增，地基工程一期规矩A/B落地） ════
     规矩A 一套门存取：托管键一律走 HX.store 存取，不直接摸 localStorage。
     规矩B 时间定新旧、冲突留档：每个键带影子ts；sync时谁新谁当值；两边都动过不覆盖，
     旧的那份以 key_冲突_HHMMSS 另存（缓存+真源各一份），并记进冲突清单。
     数据模型：缓存 localStorage[key]=值字符串，影子 key+"ts"=本缓存最后改动ms、key+"sync"=上次对账一致ms；
     壳内真源 hxdata_<key>.json（沿用大管家 hxdata_ 命名，旧备份直接能用；key里CJK中文放行、其余非[a-zA-Z0-9_-]换_），内容信封 {"v":值字符串,"ts":ms}；
     兼容老hxStore裸档：真源文件不是信封格式时按裸值认读——v=文件原文、ts=listFiles该文件mtime，sync读到裸档顺手升级成信封，绝不丢旧数据；
     无壳（!LearnShell||!folderSet()）：localStorage=真源照常能用，文件夹操作全跳过。 */
  HX.store = (function(){
    var st = {};
    var conflictList = []; /* 本轮sync累计冲突清单（内存数组） */
    function shOk(){ try{ return !!(window.LearnShell && LearnShell.folderSet && LearnShell.folderSet()); }catch(e){ return false; } }
    function fname(key){ return 'hxdata_' + String(key).replace(/[^一-龥a-zA-Z0-9_-]/g,'_') + '.json'; } /* 白名单放行CJK中文：冲突留档「_冲突_」字样要在文件名里看得见 */
    function kTs(key){ return String(key) + 'ts'; }
    function kSync(key){ return String(key) + 'sync'; }
    function lsRaw(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
    function lsDel(k){ try{ localStorage.removeItem(k); }catch(e){} }
    function lsNum(k){ var n = parseInt(lsGet(k), 10); return isNaN(n) ? 0 : n; }
    /* listFiles 里查该文件 mtime（裸档认读用）；查不到返0 */
    function fMtime(name){
      try{
        var arr = JSON.parse(LearnShell.listFiles() || '[]');
        for(var i = 0; i < arr.length; i++){ if(arr[i] && arr[i].name === name) return (+arr[i].t) || 0; }
      }catch(e){}
      return 0;
    }
    /* v0.9.1 批量抱回缓存（壳v1.7.3新readFiles桥）：sync多件对账前一次JNI把名单文件全读回存这里，rRead先查缓存——
       病根=SAF单件读真机要1~2秒，逐件读连环卡主线程（洪老师真机报"点大管家变蓝后定住"）；null=没批量/旧壳回落逐件读，读完即清 */
    var batchCache = null;
    /* 读真源文件 → {v,ts} 或 null（没壳/没文件/坏JSON都算没有，单键坏不炸别键）；
       兼容老hxStore裸档：解析不出信封就按裸值认读 v=文件原文、ts=文件mtime，标_bare待sync升级，绝不丢旧数据 */
    function rRead(key){
      try{
        if(!shOk()) return null;
        var fn = fname(key);
        var b = (batchCache && Object.prototype.hasOwnProperty.call(batchCache, fn)) ? batchCache[fn] : LearnShell.readFile(fn); /* v0.9.1：批量缓存命中不碰桥 */
        if(!b) return null;
        var txt = HX.gh.b64dec(b);
        var j = null;
        try{ j = JSON.parse(txt); }catch(e){ j = null; }
        if(j && j.v !== undefined && j.v !== null && j.ts !== undefined && j.ts !== null){
          return { v: String(j.v), ts: (+j.ts) || 0 };
        }
        return { v: txt, ts: fMtime(fn), _bare: true }; /* 裸JSON/裸值老档：按原文认 */
      }catch(e){ return null; }
    }
    /* 写真源文件 → true/false */
    function rWrite(key, val, ts){
      try{
        if(!shOk()) return false;
        return !!LearnShell.writeFile(fname(key), HX.gh.b64enc(JSON.stringify({ v: String(val), ts: ts })));
      }catch(e){ return false; }
    }
    function rDel(key){
      try{
        if(!shOk()) return false;
        return !!LearnShell.deleteFile(fname(key));
      }catch(e){ return false; }
    }
    /* 冲突另存：旧的那份以 key_冲突_HHMMSS 存（缓存+真源各一份）；时分后补秒防同分钟两次冲突同名互盖 */
    function hhmmss(){ var d = new Date(); return (d.getHours()<10?'0':'')+d.getHours()+(d.getMinutes()<10?'0':'')+d.getMinutes()+(d.getSeconds()<10?'0':'')+d.getSeconds(); }
    function saveConflictCopy(key, val, ts){
      var ck = String(key) + '_冲突_' + hhmmss();
      try{ lsSet(ck, String(val)); lsSet(ck+'ts', String(ts)); }catch(e){}
      try{ rWrite(ck, val, ts); }catch(e){}
    }
    /* 记冲突：内存数组 + localStorage hx_store_conflicts（JSON数组，50条封顶） */
    function pushConflict(rec){
      try{ conflictList.push(rec); }catch(e){}
      try{
        var arr = JSON.parse(localStorage.getItem('hx_store_conflicts') || '[]');
        arr.push(rec);
        if(arr.length > 50) arr = arr.slice(arr.length - 50);
        localStorage.setItem('hx_store_conflicts', JSON.stringify(arr));
      }catch(e){}
    }
    /* 是否壳+文件夹可用 */
    st.has = function(){ return shOk(); };
    /* 读localStorage缓存，无则def（def默认null） */
    st.get = function(key, def){
      try{
        var v = lsRaw(String(key));
        return (v === null || v === undefined) ? (def === undefined ? null : def) : v;
      }catch(e){ return (def === undefined ? null : def); }
    };
    /* 写缓存+影子ts=Date.now()；壳可用则同写真源文件；返回true/false */
    st.set = function(key, val){
      try{
        var ts = Date.now();
        lsSet(String(key), String(val));
        lsSet(kTs(key), String(ts));
        if(shOk()) rWrite(key, val, ts);
        return true;
      }catch(e){ return false; }
    };
    /* 删缓存+影子+真源文件 */
    st.remove = function(key){
      try{
        lsDel(String(key));
        lsDel(kTs(key));
        lsDel(kSync(key));
        if(shOk()) rDel(key);
      }catch(e){}
    };
    /* 对账一批键（数组），逐键串行；cb(冲突清单数组)可无；单键炸不影响其他键 */
    var _rfCbN = 0; /* v0.9.1 异步批量回调编号器 */
    st.sync = function(keys, cb){
      var news = [];
      try{ keys = keys || []; }catch(e){ keys = []; }
      /* v0.9.1 对账本体抽成run()（洪老师2026-09-14拍板直接除根）：批量抱回（异步桥优先/同步批量次之）完成后才进run；
         啥桥都没有直接run=逐件读老路，循环体一字未改 */
      function run(){
      try{
        for(var i = 0; i < keys.length; i++){
          try{
            var key = String(keys[i]);
            var R = rRead(key);                       /* 真源 {v,ts} 或 null */
            if(R && R._bare) rWrite(key, R.v, R.ts);  /* 裸档顺手升级成信封，内容时间不变 */
            var lv = lsRaw(key);                      /* 本地缓存值（null=没有） */
            var hasL = (lv !== null && lv !== undefined);
            var tsL = lsNum(kTs(key));                /* 本地影子ts */
            var S = lsNum(kSync(key));                /* 上次对账一致ts */
            if(R && !hasL){
              /* 只有R有：R灌入本地（值+ts） */
              lsSet(key, R.v); lsSet(kTs(key), String(R.ts));
              lsSet(kSync(key), String(R.ts));
            }else if(!R && hasL){
              /* 只有L有：L推上真源 */
              if(!tsL){ tsL = Date.now(); lsSet(kTs(key), String(tsL)); }
              rWrite(key, lv, tsL);
              lsSet(kSync(key), String(tsL));
            }else if(R && hasL){
              var tsR = R.ts;
              if(tsL !== S && tsR !== S && tsR !== tsL){
                /* 双动冲突：新的当值，旧的另存留档 */
                if(tsL > tsR){
                  saveConflictCopy(key, R.v, tsR);    /* 旧件=真源那份 */
                  rWrite(key, lv, tsL);               /* 本地新的推上真源 */
                  news.push({ key:key, kept:'local', tsKept:tsL, tsOld:tsR });
                  lsSet(kSync(key), String(tsL));
                }else{
                  saveConflictCopy(key, lv, tsL);     /* 旧件=本地那份 */
                  lsSet(key, R.v); lsSet(kTs(key), String(tsR));
                  news.push({ key:key, kept:'remote', tsKept:tsR, tsOld:tsL });
                  lsSet(kSync(key), String(tsR));
                }
              }else if(tsR > tsL){
                /* 新盖旧：真源ts新→本地被盖 */
                lsSet(key, R.v); lsSet(kTs(key), String(tsR));
                lsSet(kSync(key), String(tsR));
              }else if(tsL > tsR){
                /* 新盖旧：本地ts新→真源被更新 */
                rWrite(key, lv, tsL);
                lsSet(kSync(key), String(tsL));
              }else{
                /* 相等不动 */
                lsSet(kSync(key), String(tsL));
              }
            }
            /* 两边都没有：跳过 */
          }catch(e1){ warn('store.sync 键 '+keys[i]+': '+((e1&&e1.message)||e1)); }
        }
        for(var j = 0; j < news.length; j++) pushConflict(news[j]);
      }catch(e){ warn('store.sync: '+((e&&e.message)||e)); }
      batchCache = null; /* v0.9.1：批量缓存用完即清，下轮重新抱回，绝不拿旧缓存对账 */
      try{ if(cb) cb(news); }catch(e){}
      } /* run完 */
      /* v0.9.1 派活：异步桥最优（壳v1.7.3 readFilesAsync，Java后台读，JS主线程零等待零卡顿）；
         同步批量次之（readFiles一次往返）；都没有=旧壳，直接run走逐件读老路 */
      try{
        if(keys.length > 1 && window.LearnShell && LearnShell.readFilesAsync){
          var _names = [];
          for(var _bi = 0; _bi < keys.length; _bi++){ try{ _names.push(fname(String(keys[_bi]))); }catch(e){} }
          var _cbNm = '__hxRfCb' + (++_rfCbN);
          window[_cbNm] = function(mapJson){
            try{ delete window[_cbNm]; }catch(e){ window[_cbNm] = undefined; }
            try{
              var _map = JSON.parse(mapJson || '{}');
              if(_map && typeof _map === 'object'){
                batchCache = {};
                for(var _bk in _map){ if(Object.prototype.hasOwnProperty.call(_map, _bk)){ try{ batchCache[_bk] = (_map[_bk] === null || _map[_bk] === undefined) ? null : String(_map[_bk]); }catch(e){ batchCache[_bk] = null; } } }
              }
            }catch(e){ batchCache = null; }
            run();
          };
          try{ LearnShell.readFilesAsync(JSON.stringify(_names), _cbNm); return; }catch(e){ try{ delete window[_cbNm]; }catch(e2){} }
        }
        if(keys.length > 1 && window.LearnShell && LearnShell.readFiles){
          var _names2 = [];
          for(var _bi2 = 0; _bi2 < keys.length; _bi2++){ try{ _names2.push(fname(String(keys[_bi2]))); }catch(e){} }
          var _map2 = null;
          try{ _map2 = JSON.parse(LearnShell.readFiles(JSON.stringify(_names2)) || '{}'); }catch(e){ _map2 = null; }
          if(_map2 && typeof _map2 === 'object'){
            batchCache = {};
            for(var _bk2 in _map2){ if(Object.prototype.hasOwnProperty.call(_map2, _bk2)){ try{ batchCache[_bk2] = (_map2[_bk2] === null || _map2[_bk2] === undefined) ? null : String(_map2[_bk2]); }catch(e){ batchCache[_bk2] = null; } } }
          }
        }
      }catch(e){ batchCache = null; }
      run();
    };
    /* 本轮sync累计冲突清单（内存数组） */
    st.conflicts = function(){ try{ return conflictList.slice(); }catch(e){ return []; } };
    return st;
  })();

  /* ════ 5.7 中转邮路 HX.relay（v0.5.0 新增，SPEC2：单体备份是命根子，GitHub被拒就永远重试，回读核对才销号） ════
     队列 localStorage hx_relay_out = [{key,v,ts,tries,nextT}]（v=值字符串，ts=数据时间，同key只留最新）。
     送件：putB64 到 transit/relay_<key清洗同fname规则>.json，信封 {v,ts,from:app,t:Date.now()}；
     回读核对（重新GET比对v/ts一致）才算送到→销号；失败 tries++、nextT=now+退避[1,5,15,30,30…]分钟（封顶第4档）。
     全程不弹窗；状态条 #hxRelayBar 三态大白话（🟢都送上去了/🟡有N件在等网/🔴请开科学上网），点击=立即flush+明细浮层。
     pull()（壳内用）：list transit/ 逐个relay_*.json读信封→HX.store.set→deleteFile销号，单件失败跳过；无钥匙/无壳静默返回0。 */
  HX.relay = (function(){
    var ry = {};
    var QK = 'hx_relay_out';
    var APP = '';
    var BACKOFF = [1, 5, 15, 30]; /* 退避分钟表，tries封顶第4档 */
    var timer = null, flushing = false;
    var barEl = null, panelEl = null;
    function rkey(key){ return String(key).replace(/[^一-龥a-zA-Z0-9_-]/g,'_'); } /* key清洗同仓管员fname规则 */
    function tname(key){ return 'transit/relay_' + rkey(key) + '.json'; }
    function qRead(){ try{ var a = JSON.parse(lsGet(QK) || '[]'); return (a && typeof a.length === 'number') ? a : []; }catch(e){ return []; } }
    function qWrite(q){ try{ lsSet(QK, JSON.stringify(q || [])); }catch(e){} }
    /* 失败记账：tries++、nextT按退避表、lastT留作明细浮层显示 */
    function bump(it){
      try{
        var q = qRead();
        for(var i = 0; i < q.length; i++){
          if(q[i] && q[i].key === it.key && (+q[i].ts || 0) === (+it.ts || 0)){
            q[i].tries = (+q[i].tries || 0) + 1;
            var idx = q[i].tries - 1; if(idx < 0) idx = 0; if(idx > BACKOFF.length - 1) idx = BACKOFF.length - 1;
            q[i].nextT = Date.now() + BACKOFF[idx] * 60000;
            q[i].lastT = Date.now();
          }
        }
        qWrite(q);
      }catch(e){}
    }
    /* 送一件 → Promise<true=销号/false=记账留下>；回读核对一致才算送到 */
    function sendOne(it){
      return new Promise(function(resolve){
        try{
          var env = { v: String(it.v), ts: (+it.ts) || 0, from: APP || 'unknown', t: Date.now() };
          var nm = tname(it.key);
          HX.gh.putB64(nm, HX.gh.b64enc(JSON.stringify(env)), 'relay ' + it.key).then(function(){
            return HX.gh.readJson(nm); /* 回读核对 */
          }).then(function(back){
            if(back && back.data && String(back.data.v) === env.v && (+back.data.ts || 0) === env.ts){
              var q = qRead();
              for(var i = q.length - 1; i >= 0; i--){
                if(q[i] && q[i].key === it.key && (+q[i].ts || 0) === (+it.ts || 0)) q.splice(i, 1); /* 只销这一件，同key更新件不动 */
              }
              qWrite(q);
              resolve(true);
            }else{ bump(it); resolve(false); } /* 回读内容不符：不销号，留下次 */
          }).catch(function(){ bump(it); resolve(false); });
        }catch(e){ try{ bump(it); }catch(e2){} resolve(false); }
      });
    }
    /* add：同key upsert只留最新，tries=0 nextT=现在，顺手触发一次送 */
    ry.add = function(key, v){
      try{
        var q = qRead(), now = Date.now();
        var it = { key: String(key), v: String(v), ts: now, tries: 0, nextT: now };
        var found = false;
        for(var i = 0; i < q.length; i++){ if(q[i] && q[i].key === it.key){ q[i] = it; found = true; break; } }
        if(!found) q.push(it);
        qWrite(q);
        updBar();
        try{ ry.flush(); }catch(e){}
      }catch(e){}
    };
    /* flush：只送到期件（nextT<=now），串行逐件；返回 Promise<销号几件> */
    ry.flush = function(manual){
      try{
        if(!HX._autoNetOk(manual)) return Promise.resolve(0); /* v0.8.0 开门静默令 */
        if(flushing){ setTimeout(function(){ try{ ry.flush(); }catch(e){} }, 300); return Promise.resolve(0); } /* 正送着：稍候补一轮，新件不丢 */
        if(!HX.gh.ready()){ updBar(); return Promise.resolve(0); } /* 没GitHub钥匙：队列躺着等，不丢 */
        flushing = true;
        var q = qRead(), now = Date.now(), sent = 0;
        var seq = Promise.resolve();
        for(var i = 0; i < q.length; i++){
          (function(it){
            if(!it || (+it.nextT || 0) > now) return;
            seq = seq.then(function(){ return sendOne(it); }).then(function(ok){ if(ok) sent++; });
          })(q[i]);
        }
        return seq.then(function(){ flushing = false; updBar(); return sent; }, function(){ flushing = false; updBar(); return sent; });
      }catch(e){ flushing = false; return Promise.resolve(0); }
    };
    /* 状态条：fixed顶部细条，暖底圆角，点击=全部立即重送+明细浮层 */
    function mkBar(){
      try{
        if(!document || !document.body) return;
        if(barEl && barEl.parentNode){ updBar(); return; }
        barEl = document.getElementById('hxRelayBar');
        if(!barEl){
          barEl = document.createElement('div');
          barEl.id = 'hxRelayBar';
          barEl.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:99998;text-align:center;font-size:12px;padding:3px 10px;cursor:pointer;display:none;border-radius:0 0 8px 8px;';
          document.body.appendChild(barEl);
          barEl.onclick = function(){
            try{
              var q = qRead();
              for(var i = 0; i < q.length; i++){ if(q[i]) q[i].nextT = 0; } /* 点我一下=全部立即重送 */
              qWrite(q);
              ry.flush();
              togglePanel();
            }catch(e){}
          };
        }
        updBar();
      }catch(e){}
    }
    function updBar(){
      try{
        if(!barEl) return; /* 没init不挂条 */
        var q = qRead();
        var maxTries = 0;
        for(var i = 0; i < q.length; i++){ if(q[i] && (+q[i].tries || 0) > maxTries) maxTries = (+q[i].tries || 0); }
        barEl.style.display = 'block';
        if(!q.length){
          barEl.style.background = '#e7f5e9'; barEl.style.color = '#2f6b3a';
          barEl.textContent = '🟢 备份都已送上去了';
        }else if(maxTries >= 5){
          barEl.style.background = '#fdecea'; barEl.style.color = '#a13025';
          barEl.textContent = '🔴 送不出去，多半是GitHub被拦了。请开科学上网，开好了点我一下，我马上重送';
        }else{
          barEl.style.background = '#fff7e0'; barEl.style.color = '#8a6d1a';
          barEl.textContent = '🟡 有' + q.length + '件在等网，网通了自己送，不用管';
        }
      }catch(e){}
    }
    /* 明细浮层：各件key/上次试送/下次时间，可关，非alert */
    function togglePanel(){
      try{
        if(!document || !document.body) return;
        if(panelEl && panelEl.parentNode){ panelEl.parentNode.removeChild(panelEl); panelEl = null; return; }
        panelEl = document.createElement('div');
        panelEl.id = 'hxRelayPanel';
        panelEl.style.cssText = 'position:fixed;top:28px;left:50%;transform:translateX(-50%);z-index:99999;background:#fffdf5;border:1px solid #e5d9b0;border-radius:10px;padding:10px 14px;font-size:12px;max-width:92%;box-shadow:0 2px 10px rgba(0,0,0,.18);color:#333;';
        function fmt(t){ if(!t) return '—'; var d = new Date(+t); return (d.getHours()<10?'0':'')+d.getHours()+':'+(d.getMinutes()<10?'0':'')+d.getMinutes()+':'+(d.getSeconds()<10?'0':'')+d.getSeconds(); }
        var html = '<b>中转邮路明细</b>';
        var q = qRead();
        if(!q.length) html += '<div style="margin-top:6px">队列空，没有待送的件</div>';
        for(var i = 0; i < q.length; i++){
          if(!q[i]) continue;
          html += '<div style="margin-top:6px;border-top:1px dashed #e5d9b0;padding-top:4px">' +
                  '键：' + String(q[i].key).replace(/[<>&]/g, '') +
                  '　已试：' + (+q[i].tries || 0) + '次' +
                  '　上次试送：' + fmt(q[i].lastT) +
                  '　下次试送：' + fmt(q[i].nextT) + '</div>';
        }
        html += '<div style="text-align:right;margin-top:8px"><span id="hxRelayPanelX" style="cursor:pointer;color:#a13025;border:1px solid #a13025;border-radius:6px;padding:2px 10px">关闭</span></div>';
        panelEl.innerHTML = html;
        document.body.appendChild(panelEl);
        var x = document.getElementById('hxRelayPanelX');
        if(x) x.onclick = function(){ try{ if(panelEl && panelEl.parentNode) panelEl.parentNode.removeChild(panelEl); panelEl = null; }catch(e){} };
      }catch(e){}
    }
    /* init(app)：开门必flush一次+每60秒查到期件+挂状态条 */
    ry.init = function(app){
      try{
        APP = String(app || '');
        mkBar();
        try{ ry.flush(); }catch(e){}
        if(timer) try{ clearInterval(timer); }catch(e){}
        timer = setInterval(function(){
          try{
            var q = qRead(), now = Date.now(), due = false;
            for(var i = 0; i < q.length; i++){ if(q[i] && (+q[i].nextT || 0) <= now){ due = true; break; } }
            updBar();
            if(due) ry.flush();
          }catch(e){}
        }, 60000);
      }catch(e){}
    };
    /* pull（壳内用）：list transit/ →逐个relay_*.json读信封→HX.store.set→deleteFile销号；返回 Promise<拉了几件>；单件失败跳过不碍其他件 */
    ry.pull = function(manual){
      return new Promise(function(resolve){
        try{
          if(!HX._autoNetOk(manual)){ resolve(0); return; } /* v0.8.0 开门静默令 */
          if(!window.LearnShell || !HX.gh.ready()){ resolve(0); return; } /* 无壳/无GitHub钥匙静默 */
          HX.gh.fetch(HX.gh.fileUrl('transit'), { headers: HX.gh.headers() }).then(function(resp){
            if(resp.status === 404) return [];
            if(!resp.ok) return resp.text().then(function(t){ throw new Error(ghErr(resp.status, t)); });
            return resp.json();
          }).then(function(list){
            if(!list || typeof list.length !== 'number' || !list.length){ resolve(0); return; }
            var names = [];
            for(var i = 0; i < list.length; i++){
              if(list[i] && list[i].name && /^relay_.*\.json$/.test(list[i].name)) names.push(list[i].name);
            }
            var got = 0, seq = Promise.resolve();
            names.forEach(function(nm){
              seq = seq.then(function(){
                return new Promise(function(res2){
                  try{
                    var key = nm.replace(/^relay_/, '').replace(/\.json$/, '');
                    HX.gh.readJson('transit/' + nm).then(function(r){
                      if(r && r.data && r.data.v !== undefined && r.data.v !== null){
                        try{ if(HX.store && HX.store.set) HX.store.set(key, String(r.data.v)); }catch(e){}
                        HX.gh.deleteFile('transit/' + nm, 'relay销号 ' + key).then(function(){ got++; res2(); }, function(){ res2(); });
                      }else res2();
                    }).catch(function(){ res2(); }); /* 单件失败跳过 */
                  }catch(e){ res2(); }
                });
              });
            });
            seq.then(function(){ resolve(got); }, function(){ resolve(got); });
          }).catch(function(){ resolve(0); });
        }catch(e){ resolve(0); }
      });
    };
    function ghErr(st2, t){ try{ return HX.gh.errText(st2, t); }catch(e){ return 'HTTP ' + st2; } }
    return ry;
  })();

  /* ════ 5.8 坚果云腿 HX.dav（v0.5.0 新增，SPEC2：壳内铁仓库，地基补强） ════
     现成桥（MainActivity）：LearnShell.davUp(user,pass,fileName,davDir)/davDown(user,pass,path,saveName)/davList(user,pass,path)，
     都同步返回String、"err:"开头=失败；钥匙 HX.keys.dav()（hx_dav_user/hx_dav_pass）。
     mirror(fileName)：闲时把 hxdata_<key>.json 镜像到 /学习套装数据/（debounce 10秒）；失败静默，下次闲时再试。
     rescue(keys)：开门sync前按ts对账——本地缺云端有才davDown补回；两边都有云端mtime新过本地(listFiles的t)超5秒，先留档hxdata_<key>_冲突_时分秒.json再davDown盖回；本地较新或相等顺手davUp让云端追平；云端没有顺手davUp补齐；单件失败跳过，list失败直接返回。 */
  HX.dav = (function(){
    var dv = {};
    var DAV_DIR = '/学习套装数据/';
    var mTimers = {}; /* 每个文件名一颗debounce定时器 */
    function sh(){ try{ return (window.LearnShell && LearnShell.davUp && LearnShell.davDown && LearnShell.davList) ? LearnShell : null; }catch(e){ return null; } }
    function dfname(key){ return 'hxdata_' + String(key).replace(/[^一-龥a-zA-Z0-9_-]/g,'_') + '.json'; } /* 同仓管员fname规则 */
    function hhmmss(){ var d = new Date(); return (d.getHours()<10?'0':'')+d.getHours()+(d.getMinutes()<10?'0':'')+d.getMinutes()+(d.getSeconds()<10?'0':'')+d.getSeconds(); } /* 同仓管员留档命名：时分秒 */
    /* LearnShell.davUp在 && 钥匙齐 */
    dv.ok = function(){ try{ return !!(sh() && HX.keys.dav()); }catch(e){ return false; } };

    /* ═══ v0.7.0 异步化（根治#75/#77：dav同步联网卡死主线程，洪老师2026-09-12拍板改壳） ═══
       新壳v1.6.0提供davAsync(action,user,pass,p3,p4,cbId)：后台线程干活，干完回调 HX._davCb(cbId,结果)。
       davCall=Promise包装；旧壳没davAsync→一律静默跳过（绝不回退走同步老路再卡界面），等壳升级自动恢复。 */
    HX._davCbs = HX._davCbs || {};
    HX._davCb = function(cbId, result){
      var f = HX._davCbs[cbId];
      if(f){ delete HX._davCbs[cbId]; try{ f(result); }catch(e){} }
    };
    dv.asyncOk = function(){ try{ var L = sh(); return !!(L && typeof L.davAsync === 'function'); }catch(e){ return false; } };
    function davCall(action, p3, p4){
      return new Promise(function(res){
        try{
          var L = sh(), k = HX.keys.dav();
          if(!L || !k){ res(null); return; }
          if(typeof L.davAsync !== 'function'){ res(null); return; } /* 旧壳：静默跳过 */
          var cbId = 'dav' + Date.now() + '_' + Math.floor(Math.random()*1000000);
          HX._davCbs[cbId] = function(r){ res(typeof r === 'string' ? r : null); };
          setTimeout(function(){ if(HX._davCbs[cbId]){ delete HX._davCbs[cbId]; res(null); } }, 120000); /* 120秒没回调当失败，绝不死等 */
          L.davAsync(action, k.user, k.pass, String(p3 || ''), String(p4 || ''), cbId);
        }catch(e){ res(null); }
      });
    }

    /* v0.21.0 纯加法：验收清单双腿腿①。davCall('down')拉回壳私有目录→readFile读b64→b64dec解码→res(文本)；任何一步失败res(null)，绝不外抛。
       前置：dv.ok()（三桥+dav钥匙齐）且dv.asyncOk()（壳有davAsync），不齐直接res(null)静默。
       不联网闸门：由调用方chk.fetchList把守（_autoNetOk(manual)），dav内部不重复把守。 */
    dv.downFile = function(remotePath, saveName){
      return new Promise(function(res){
        try{
          if(!dv.ok() || !dv.asyncOk()){ res(null); return; }
          davCall('down', remotePath, saveName).then(function(r){
            try{
              if(!r || (typeof r === 'string' && r.indexOf('err:') === 0)){ res(null); return; }
              var L = sh();
              if(!L || typeof L.readFile !== 'function'){ res(null); return; }
              var b64 = L.readFile(saveName);
              if(!b64){ res(null); return; }
              var dec = (HX.gh && HX.gh.b64dec) ? HX.gh.b64dec : function(s){ try{ return decodeURIComponent(escape(atob(String(s).replace(/\s+/g,'')))); }catch(e2){ return ''; } };
              var txt = dec(b64);
              res(txt ? txt : null);
            }catch(e){ res(null); }
          }, function(){ res(null); });
        }catch(e){ res(null); }
      });
    };

    /* 闲时镜像：davUp该文件名到 /学习套装数据/；debounce 10秒；失败静默下次闲时再试。v0.7.0：走davCall异步，不占主线程 */
    dv.mirror = function(fileName){
      try{
        var fn = String(fileName || '');
        if(!fn) return;
        if(mTimers[fn]) try{ clearTimeout(mTimers[fn]); }catch(e){}
        mTimers[fn] = setTimeout(function(){
          try{
            if(!HX._autoNetOk()) return; /* v0.8.0 开门静默令 */
            if(!dv.ok() || !dv.asyncOk()) return; /* 旧壳静默跳过 */
            davCall('up', fn, DAV_DIR); /* fire-and-forget，回调不用等 */
          }catch(e){}
        }, 10000);
      }catch(e){}
    };
    /* 救命腿（ts对账逻辑与v0.6.0一致，只把联网三件套换成davCall异步串行，主线程零占用）：
       davList查云端清单后逐键比对——本地缺云端有才davDown补回；两边都有云端新过本地超5秒→先留档_冲突_件再davDown盖回；
       本地较新或相等→顺手davUp追平；云端没有→顺手davUp补齐；单件失败跳过不碍其他件 */
    dv.rescue = function(keys){
      try{
        if(!HX._autoNetOk()) return; /* v0.8.0 开门静默令：没点按钮不联网 */
        if(!dv.ok() || !dv.asyncOk()) return; /* 旧壳静默跳过 */
        keys = keys || [];
        var L = sh();
        davCall('list', DAV_DIR, '').then(function(lst){
          try{
            if(!lst || String(lst).indexOf('err:') === 0) return;
            var cloud = {}, i; /* 云端文件名→mtime(ms)，没给mtime按0 */
            try{
              var j = JSON.parse(lst);
              if(j && typeof j.length === 'number'){
                for(i = 0; i < j.length; i++){
                  if(typeof j[i] === 'string') cloud[j[i]] = 0;
                  else if(j[i] && j[i].name) cloud[String(j[i].name)] = (+j[i].mtime) || (+j[i].t) || (Date.parse(j[i].mtime || j[i].t || '') || 0) || 0;
                }
              }
            }catch(e){ var parts = String(lst).split(/[\r\n,]+/); for(i = 0; i < parts.length; i++){ if(parts[i]) cloud[parts[i]] = 0; } } /* 非JSON就按行/逗号切 */
            var lmt = {}; /* 本地文件名→mtime(ms)，listFiles的t字段 */
            try{
              var lf = JSON.parse(L.listFiles() || '[]');
              for(i = 0; i < lf.length; i++){ if(lf[i] && lf[i].name) lmt[String(lf[i].name)] = (+lf[i].t) || 0; }
            }catch(e){}
            i = 0;
            (function next(){
              if(i >= keys.length) return;
              var key = keys[i++];
              try{
                var fn = dfname(key);
                var cur = null;
                try{ cur = L.readFile(fn); }catch(e){}
                var has = Object.prototype.hasOwnProperty.call(cloud, fn);
                if(!cur){ /* 本地缺：云端有才davDown补回（照旧只补缺失） */
                  if(has){ davCall('down', DAV_DIR + fn, fn).then(next, next); return; }
                  next(); return;
                }
                if(!has){ davCall('up', fn, DAV_DIR).then(next, next); return; } /* 云端没有：顺手davUp补齐云端 */
                var ct = cloud[fn] || 0, lt = lmt[fn] || 0;
                if(ct > lt + 5000){ /* 云端新过本地超5秒：先留档本地旧件再盖回 */
                  try{ L.writeFile(dfname(String(key) + '_冲突_' + hhmmss()), cur); }catch(e){} /* cur是readFile原文，原样另存 */
                  davCall('down', DAV_DIR + fn, fn).then(next, next); return;
                }
                davCall('up', fn, DAV_DIR).then(next, next); /* 本地较新或相等：顺手davUp追平 */
              }catch(e){ next(); }
            })();
          }catch(e){}
        }, function(){});
      }catch(e){}
    };
    dv.upFile = function(fileName, remoteDir){ return davCall('up', fileName, remoteDir); }; /* v0.10.0：公开单件上传（速记附图用），dav其余一行不动 */
    return dv;
  })();

  /* ════ 5.9 安心条 HX.step（v0.10.0 新增，洪老师2026-09-14拍板全家统一：软件愣住时顶部细进度条+两行小字定格，拍照发AI即可定位） ════
     零初始化、随调随出、UI首次调用时自动注入；全局只此一条（新begin替换旧内容），begin/upd幂等（重复调同一mech只更新内容）；
     行1=人话（human原文），行2=机械码（等宽字体，若有i/total追加空格+i/total）；pointer-events:none绝不挡点击；
     主线程卡死时最后一条upd自然定格——不加看门狗/超时自动隐藏；全程try/catch静默降级，出错console.warn不外抛。 */
  HX.step = (function(){
    var st = {};
    /* 2026-09-14修Bug①：done()淡出/复位定时器句柄留存，fail/begin/upd/hide先清掉，免竞态把红字藏掉 */
    var _doneT1 = null, _doneT2 = null;
    function clearDoneTimers(){
      try{ if(_doneT1!=null){ clearTimeout(_doneT1); _doneT1=null; } }catch(e){}
      try{ if(_doneT2!=null){ clearTimeout(_doneT2); _doneT2=null; } }catch(e){}
    }
    function $(id){ return document.getElementById(id); }
    function ensure(){
      if($('hxStepBar')) return true;
      try{
        if(!document.body) return false;
        var s=document.createElement('style'); s.id='hxStepStyle';
        s.textContent=
          "#hxStepBar{position:fixed;left:0;right:0;top:0;z-index:99999;pointer-events:none;background:rgba(255,253,248,.92);display:none}\n"+
          "#hxStepProg{height:4px;background:#7a9e7e;width:0%;transition:width .25s ease}\n"+
          "#hxStepL1{font-size:12px;line-height:1.4;color:#6b6257;padding:3px 10px 0}\n"+
          "#hxStepL2{font-size:12px;line-height:1.4;color:#6b6257;padding:0 10px 3px;font-family:monospace}";
        document.head.appendChild(s);
        var bar=document.createElement('div'); bar.id='hxStepBar';
        bar.innerHTML='<div id="hxStepProg"></div><div id="hxStepL1"></div><div id="hxStepL2"></div>';
        document.body.appendChild(bar);
        return true;
      }catch(e){ warn('step UI注入失败: '+((e&&e.message)||e)); return false; }
    }
    function paint(mech, human, i, total){
      try{
        if(!ensure()) return;
        var b=$('hxStepBar'); if(b) b.style.display='block';
        var l1=$('hxStepL1'), l2=$('hxStepL2'), pg=$('hxStepProg');
        if(l1){ l1.textContent=String(human||''); l1.style.color='#6b6257'; }
        var m2=String(mech||'');
        if(l2) l2.textContent=(i!=null && total) ? (m2+' '+i+'/'+total) : m2;
        if(pg){
          if(i!=null && total){ var r=(+total>0)?(+i)/(+total):0; if(r<0) r=0; if(r>1) r=1; pg.style.opacity='1'; pg.style.width=(r*100)+'%'; }
          else { pg.style.opacity='0.4'; pg.style.width='60%'; } /* 无total不确定进度：固定60%宽半透明 */
        }
      }catch(e){ warn('step paint: '+((e&&e.message)||e)); }
    }
    /* begin(mech, human, total) 开一档活 */
    st.begin = function(mech, human, total){
      try{ clearDoneTimers(); paint(mech, human, (total?0:null), total); }catch(e){ warn('step begin: '+((e&&e.message)||e)); }
    };
    /* upd(mech, human, i, total) 更新进度 */
    st.upd = function(mech, human, i, total){
      try{ clearDoneTimers(); paint(mech, human, (i!=null?i:null), total); }catch(e){ warn('step upd: '+((e&&e.message)||e)); }
    };
    /* done(human) 干完：进度条拉满、行1变绿字(human或'好了')，2秒后整条淡出隐藏 */
    st.done = function(human){
      try{
        if(!ensure()) return;
        var b=$('hxStepBar'); if(b) b.style.display='block';
        var l1=$('hxStepL1'), pg=$('hxStepProg');
        if(l1){ l1.textContent=String(human||'好了'); l1.style.color='#7a9e7e'; }
        if(pg){ pg.style.opacity='1'; pg.style.width='100%'; }
        _doneT1 = setTimeout(function(){
          try{
            var bb=$('hxStepBar'); if(!bb) return;
            bb.style.transition='opacity .4s'; bb.style.opacity='0';
            _doneT2 = setTimeout(function(){ try{ bb.style.display='none'; bb.style.opacity='1'; }catch(e){} }, 400);
          }catch(e){}
        }, 2000);
      }catch(e){ warn('step done: '+((e&&e.message)||e)); }
    };
    /* fail(human) 出错：行1变红字#a05848，定格不消失（等拍照） */
    st.fail = function(human){
      try{
        clearDoneTimers();
        if(!ensure()) return;
        var b=$('hxStepBar'); if(b) b.style.display='block';
        var l1=$('hxStepL1');
        if(l1){ l1.textContent=String(human||''); l1.style.color='#a05848'; }
      }catch(e){ warn('step fail: '+((e&&e.message)||e)); }
    };
    /* hide() 立刻隐藏 */
    st.hide = function(){ try{ clearDoneTimers(); var b=$('hxStepBar'); if(b) b.style.display='none'; }catch(e){} };
    return st;
  })();

  /* ════ 5.96 手机文件夹逛一逛 HX.fm（v0.12.0 新增；Android壳全盘文件桥，MANAGE_EXTERNAL_STORAGE权限） ════
     壳桥契约（定死）：fmGranted()→"1"/"0"；fmAsk()跳权限设置页；fmRoots()→JSON[{name,path}]（内部存储+U盘/SD挂载点）；
     fmList(path)→JSON[{name,path,dir,size,t}]（目录在前）；fmWalk(path)→JSON[{name,path,size,t}]（递归只文件，壳侧限2000条）；fmRead(path)→base64。
     v0.12.1（2026-09-15，挂号#104）补：第七桥fmMkdir(parentPath,name)→"1"/"0"（壳v1.8.4起；老壳没有则pick的新建钮提示升级，不影响其他）。
     无壳/老壳：桥方法不存在，has()=false、ok()=false，ensure/pick静默cb(false/null)，绝不报错（军规1）。 */
  HX.fm = (function(){
    var fm = {};
    function $f(id){ return document.getElementById(id); }
    function escH(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
    /* v0.12.0（2026-09-15）：桥方法在不在（不管权限给没给） */
    fm.has = function(){
      try{ var L=window.LearnShell; return !!(L && L.fmGranted && L.fmAsk && L.fmRoots && L.fmList && L.fmWalk && L.fmRead); }catch(e){ return false; }
    };
    /* v0.12.0（2026-09-15）：全盘权限给没给（壳返回字符串"1"才算给） */
    fm.ok = function(){
      try{ var L=window.LearnShell; return !!(L && L.fmGranted && L.fmGranted()==='1'); }catch(e){ return false; }
    };
    function fmJson(str, def){ try{ var a=JSON.parse(String(str==null?'':str)); return a||def; }catch(e){ return def; } }
    function fmtSize(n){
      n=(+n)||0;
      if(n<1024) return n+'B';
      if(n<1048576) return (n/1024).toFixed(1)+'K';
      if(n<1073741824) return (n/1048576).toFixed(1)+'M';
      return (n/1073741824).toFixed(1)+'G';
    }
    function fmtDate(t){
      try{
        t=(+t)||0; if(t<=0) return '';
        if(t<1e12) t=t*1000; /* 秒级时间戳补成毫秒 */
        var d=new Date(t); function p2(x){ return (x<10?'0':'')+x; }
        return d.getFullYear()+'-'+p2(d.getMonth()+1)+'-'+p2(d.getDate());
      }catch(e){ return ''; }
    }
    /* v0.12.0（2026-09-15）：按扩展名出图标：txt/md📄、pdf📕、图🖼、其他📎 */
    function fmIcon(name){
      var ext='';
      try{ var i=String(name||'').lastIndexOf('.'); if(i>=0) ext=String(name).slice(i+1).toLowerCase(); }catch(e){}
      if(ext==='txt'||ext==='md'||ext==='log') return '📄';
      if(ext==='pdf') return '📕';
      if(ext==='jpg'||ext==='jpeg'||ext==='png'||ext==='gif'||ext==='webp'||ext==='bmp') return '🖼';
      return '📎';
    }
    /* v0.12.1（2026-09-15，挂号#104）：收病历场景hideKit=true时过滤套装自有文件（只文件，文件夹照列），默认false不动其他场景 */
    function isKitFile(name){
      var n=String(name||'').toLowerCase();
      if(n==='guanjia-pdf-engine.js'||n==='速记流水.txt'||n==='想法流水.txt') return true;
      if(/^hxdata_.*\.json$/.test(n)) return true;
      if(/^hx-common.*\.js$/.test(n)) return true;
      if(/^version-.*\.json$/.test(n)) return true;
      if(n.indexOf('mg_')===0||n.indexOf('mgver_')===0||n.indexOf('sjimg_')===0) return true;
      if(n.indexOf('原文库_')===0||n.indexOf('dsm_')===0) return true;
      return false;
    }
    /* v0.12.0（2026-09-15）：共用全屏罩+白底圆角卡（照现有面板风格，不引新色） */
    function fmOverlay(inner){
      var ov=document.createElement('div');
      ov.style.cssText='position:fixed;left:0;top:0;right:0;bottom:0;z-index:100000;background:rgba(60,50,40,.35);display:flex;align-items:center;justify-content:center;';
      var box=document.createElement('div');
      box.style.cssText='position:relative;background:#fffdf8;border-radius:12px;box-shadow:0 6px 24px rgba(0,0,0,.18);width:100%;max-width:640px;height:100%;max-height:94%;margin:8px;display:flex;flex-direction:column;overflow:hidden;color:#6b6257;font-size:15px;';
      box.innerHTML=inner;
      ov.appendChild(box);
      document.body.appendChild(ov);
      return { ov:ov, box:box };
    }
    function rmNode(n){ try{ if(n && n.parentNode) n.parentNode.removeChild(n); }catch(e){} }
    /* v0.12.0（2026-09-15）：ensure(cb)：已给权限→cb(true)；有桥没给→弹引导浮层「去允许」调fmAsk()+每秒轮询fmGranted()变"1"即cb(true)，30秒超时cb(false)；无桥cb(false) */
    fm.ensure = function(cb){
      cb = (typeof cb==='function') ? cb : function(){};
      try{ if(fm.ok()){ cb(true); return; } }catch(e){}
      if(!fm.has()){ try{ cb(false); }catch(e){} return; }
      try{
        var done=false, waited=0, timer=null;
        var ui=fmOverlay(
          '<div id="hxFmAskX" style="position:absolute;right:8px;top:6px;font-size:20px;color:#8b8272;cursor:pointer;padding:4px 10px;">✕</div>'+
          '<div style="padding:34px 22px 24px;text-align:center;">'+
          '<div style="font-size:26px;margin-bottom:10px;">📂</div>'+
          '<div style="font-size:17px;margin-bottom:8px;">要逛手机文件夹，请点一下允许</div>'+
          '<div style="font-size:13px;color:#8b8272;margin-bottom:18px;">点下面的钮跳到手机设置页，点上「允许」再回来就行</div>'+
          '<button id="hxFmAskGo" type="button" style="background:#7a9e7e;color:#fff;border:none;border-radius:8px;padding:11px 30px;font-size:15px;cursor:pointer;">去允许</button>'+
          '<div id="hxFmAskWait" style="font-size:12px;color:#8b8272;margin-top:14px;display:none;">正看着呢，允许了就自动接着走…</div>'+
          '</div>');
        function fin(v){
          if(done) return; done=true;
          try{ if(timer!=null) clearInterval(timer); }catch(e){}
          rmNode(ui.ov);
          try{ cb(v); }catch(e){}
        }
        $f('hxFmAskX').addEventListener('click', function(){ fin(false); });
        $f('hxFmAskGo').addEventListener('click', function(){
          try{ window.LearnShell.fmAsk(); }catch(e){}
          try{ $f('hxFmAskWait').style.display='block'; }catch(e){}
        });
        timer=setInterval(function(){
          try{
            waited++;
            if(fm.ok()){ fin(true); return; }
            if(waited>=30) fin(false); /* 30秒没动静算放弃 */
          }catch(e){}
        }, 1000);
      }catch(e){ warn('fm ensure: '+((e&&e.message)||e)); try{ cb(false); }catch(e2){} }
    };
    /* v0.12.0（2026-09-15）：pick(opt,cb) 全屏浮层仿电脑资源管理器挑文件/挑文件夹
       opt={multi:true/false, mode:'files'/'folder', walk:true/false, title, hideKit:true/false（v0.12.1：true=收病历场景藏套装自有文件，默认false）}
       cb：files模式=[{name,path,size,t}]或null；folder模式=path字符串或null；✕/取消=null */
    fm.pick = function(opt, cb){
      opt=opt||{}; cb=(typeof cb==='function')?cb:function(){};
      if(!fm.ok()){ try{ cb(null); }catch(e){} return; } /* 没权限请宿主先走ensure */
      try{ pickRun(opt, cb); }catch(e){ warn('fm pick: '+((e&&e.message)||e)); try{ cb(null); }catch(e2){} }
    };
    function pickRun(opt, cb){
      var multi=!!opt.multi;
      var mode=(opt.mode==='folder')?'folder':'files';
      var hideKit=!!opt.hideKit; /* v0.12.1（2026-09-15）：收病历场景藏套装自有文件 */
      var st={ cur:null, hist:[], sel:{}, selN:0, done:false, deb:null }; /* cur=null=根列表屏 */ /* v0.12.1（2026-09-15，挂号#104）：hist浏览足迹栈[{path,name}]，面包屑与⬅返回都走它（旧法按"/"拆路径，SAF的safdoc://URI里全是斜杠，点中段回跳必坏——实锤修掉） */
      var title=String(opt.title||(mode==='folder'?'挑个文件夹':'挑文件'));
      var walkDef=(opt.walk!==false); /* walk默认勾 */
      var ui=fmOverlay(
        '<div style="display:flex;align-items:center;padding:10px 12px 6px;border-bottom:1px solid #e8e0d2;">'+
        '<div style="flex:1;font-size:16px;">'+escH(title)+'</div>'+
        '<div id="hxFmX" style="font-size:20px;color:#8b8272;cursor:pointer;padding:2px 8px;">✕</div></div>'+
        '<div id="hxFmCrumb" style="padding:6px 12px;font-size:13px;color:#7a9e7e;border-bottom:1px solid #e8e0d2;word-break:break-all;"></div>'+
        '<div style="display:flex;align-items:center;padding:8px 12px;border-bottom:1px solid #e8e0d2;">'+
        '<input id="hxFmKw" type="text" placeholder="🔍 搜名字…" style="flex:1;border:1px solid #ddd2ba;border-radius:8px;padding:7px 10px;font-size:14px;color:#6b6257;background:#fff;outline:none;"/>'+
        '<label style="margin-left:10px;font-size:13px;color:#8b8272;white-space:nowrap;"><input id="hxFmWalk" type="checkbox" style="vertical-align:-2px;"/> 含子文件夹</label></div>'+
        '<div id="hxFmList" style="flex:1;overflow:auto;padding:4px 0;"></div>'+
        '<div style="display:flex;align-items:center;padding:10px 12px;border-top:1px solid #e8e0d2;">'+
        '<div id="hxFmInfo" style="flex:1;font-size:13px;color:#8b8272;"></div>'+
        (mode==='folder'
          ? /* v0.12.1（2026-09-15，挂号#104）：folder模式加「＋在此新建文件夹」钮，壳v1.8.4 fmMkdir桥 */
            '<button id="hxFmMkdir" type="button" style="background:#fff;color:#7a9e7e;border:1px solid #7a9e7e;border-radius:8px;padding:9px 12px;font-size:14px;margin-right:8px;cursor:pointer;">＋在此新建文件夹</button>'+
            '<button id="hxFmOk" type="button" style="background:#7a9e7e;color:#fff;border:none;border-radius:8px;padding:9px 16px;font-size:14px;margin-right:8px;cursor:pointer;">✅就选这个文件夹</button>'
          : (multi
            ? '<button id="hxFmAll" type="button" style="background:#fff;color:#7a9e7e;border:1px solid #7a9e7e;border-radius:8px;padding:9px 12px;font-size:14px;margin-right:8px;cursor:pointer;">☑全选</button>'+ /* v0.14.0：全选/全不选 */
              '<button id="hxFmOk" type="button" style="background:#7a9e7e;color:#fff;border:none;border-radius:8px;padding:9px 16px;font-size:14px;margin-right:8px;cursor:pointer;">✅收0份</button>'
            : ''))+
        '<button id="hxFmCancel" type="button" style="background:#fff;color:#6b6257;border:1px solid #ddd2ba;border-radius:8px;padding:9px 16px;font-size:14px;cursor:pointer;">取消</button></div>');
      var wk=$f('hxFmWalk'); if(wk) wk.checked=walkDef;
      function fin(v){
        if(st.done) return; st.done=true;
        try{ if(st.deb) clearTimeout(st.deb); }catch(e){}
        rmNode(ui.ov);
        try{ cb(v); }catch(e){}
      }
      function kw(){ try{ var i=$f('hxFmKw'); return trim(i?i.value:''); }catch(e){ return ''; } }
      function walkOn(){ try{ var w=$f('hxFmWalk'); return !!(w&&w.checked); }catch(e){ return false; } }
      function refreshInfo(){
        try{
          var info=$f('hxFmInfo'); if(info) info.textContent = (mode==='files'&&multi) ? ('已勾 '+st.selN+' 份') : '';
          if(mode==='files'&&multi){ var ok=$f('hxFmOk'); if(ok) ok.textContent='✅收'+st.selN+'份';
            var ab=$f('hxFmAll'); if(ab) ab.textContent = st.selN>0 ? '☒全不选' : '☑全选'; } /* v0.14.0 */
          if(mode==='folder'){ var ok2=$f('hxFmOk'); if(ok2) ok2.style.opacity = st.cur ? '1' : '.5';
            var mk=$f('hxFmMkdir'); if(mk) mk.style.opacity = st.cur ? '1' : '.5'; /* v0.12.1（2026-09-15）：根列表屏没有"在此"，新建钮压灰 */ }
        }catch(e){}
      }
      /* v0.12.0（2026-09-15）：面包屑每段可点回跳；🏠手机=回根列表 */
      /* v0.12.1（2026-09-15，挂号#104）：①🏠旁加显眼「⬅返回上一层」钮，有上级即亮，点=回父目录；②每段回跳改走hist足迹栈（data-hxfmp记栈下标不记路径），修掉SAF safdoc://URI含斜杠按"/"拼路径点中段必坏的实锤 */
      function renderCrumb(){
        var c=$f('hxFmCrumb'); if(!c) return;
        var canBack=st.hist.length>0;
        var html='<span id="hxFmBack" style="cursor:'+(canBack?'pointer':'default')+';font-size:14px;color:'+(canBack?'#fff':'#b3a892')+';background:'+(canBack?'#7a9e7e':'#eee6d6')+';border-radius:8px;padding:3px 10px;margin-right:6px;white-space:nowrap;">⬅返回上一层</span>'+
          '<span data-hxfmp="__ROOT__" style="cursor:pointer;">🏠 手机</span>';
        var i;
        for(i=0;i<st.hist.length;i++){
          html+=' <span style="color:#b3a892;">›</span> <span data-hxfmp="'+i+'" style="cursor:pointer;">'+escH(st.hist[i].name)+'</span>';
        }
        c.innerHTML=html;
        var bk=$f('hxFmBack');
        if(bk && canBack) bk.addEventListener('click', function(){
          st.hist.pop();
          st.cur=st.hist.length?st.hist[st.hist.length-1].path:null;
          var k=$f('hxFmKw'); if(k) k.value='';
          loadList();
        });
        Array.prototype.forEach.call(c.querySelectorAll('[data-hxfmp]'), function(el){
          el.addEventListener('click', function(){
            var p=el.getAttribute('data-hxfmp');
            if(p==='__ROOT__'){ st.hist=[]; }
            else { st.hist=st.hist.slice(0, parseInt(p,10)+1); }
            st.cur=st.hist.length?st.hist[st.hist.length-1].path:null;
            var k=$f('hxFmKw'); if(k) k.value='';
            loadList();
          });
        });
      }
      /* v0.12.0（2026-09-15）：取数——根=fmRoots；搜索框有字+walk勾=fmWalk(当前目录)按名字过滤平铺；否则fmList目录在前 */
      function fetchRows(){
        var L=window.LearnShell, k=kw(), rows=[], i;
        if(st.cur==null){
          var roots=fmJson(L.fmRoots(), []);
          for(i=0;i<roots.length;i++){ if(roots[i]&&roots[i].path) rows.push({name:String(roots[i].name||roots[i].path), path:String(roots[i].path), dir:true, size:0, t:0}); }
          return rows;
        }
        if(k!=='' && walkOn()){
          var all=fmJson(L.fmWalk(st.cur), []);
          var kl=k.toLowerCase();
          for(i=0;i<all.length;i++){
            var f=all[i]; if(!f||!f.path) continue;
            /* v0.12.1（2026-09-15，挂号#104）：空名/乱码名不静默跳过，标「（名字读不出）」照列；hideKit过滤套装自有件 */
            var nm=String(f.name||''); if(nm==='') nm='（名字读不出）';
            if(hideKit && isKitFile(nm)) continue;
            if(nm.toLowerCase().indexOf(kl)>=0) rows.push({name:nm, path:String(f.path), dir:false, size:(+f.size)||0, t:(+f.t)||0});
          }
          /* v0.12.1（2026-09-15，挂号#104）：搜索平铺也按修改时间新→旧排 */
          rows.sort(function(a,b){ return (b.t-a.t)||(a.name<b.name?-1:(a.name>b.name?1:0)); });
          return rows;
        }
        var ls=fmJson(L.fmList(st.cur), []), dirs=[], files=[];
        for(i=0;i<ls.length;i++){
          var it=ls[i]; if(!it||!it.path) continue;
          /* v0.12.1（2026-09-15，挂号#104）：空名/乱码名不静默跳过，标「（名字读不出）」照列（SAF的DocumentFile.getName对个别exFAT中文名会回null） */
          var nm2=String(it.name||''); if(nm2==='') nm2='（名字读不出）';
          var row={name:nm2, path:String(it.path), dir:!!it.dir, size:(+it.size)||0, t:(+it.t)||0};
          if(!row.dir && hideKit && isKitFile(nm2)) continue; /* v0.12.1（2026-09-15）：hideKit只滤文件，文件夹照常列 */
          if(k!=='' && row.name.toLowerCase().indexOf(k.toLowerCase())<0) continue;
          if(row.dir) dirs.push(row); else files.push(row);
        }
        /* v0.12.1（2026-09-15，挂号#104）：文件夹在前保持壳侧顺序，文件按修改时间新→旧排（实锤：旧版按名排，中文名病历全沉到hxdata_*等英文名套装件后面，洪老师翻不到当没有；新拷的病历时间最新直接浮顶） */
        files.sort(function(a,b){ return (b.t-a.t)||(a.name<b.name?-1:(a.name>b.name?1:0)); });
        return dirs.concat(files);
      }
      function loadList(){
        try{
          renderCrumb();
          var box=$f('hxFmList'); if(!box) return;
          var rows=[];
          try{ rows=fetchRows(); }catch(e){ warn('fm 取目录: '+((e&&e.message)||e)); }
          var html='', i;
          /* v0.12.1（2026-09-15，挂号#104）：顶部小字告诉他看没看全——根屏「共N个存储位置」/搜索「搜到N项」/平时「本层共N项」 */
          if(rows.length) html='<div style="padding:4px 12px;font-size:12px;color:#b3a892;">'+(kw()!==''?('搜到 '+rows.length+' 项'):(st.cur==null?('共 '+rows.length+' 个存储位置'):('本层共 '+rows.length+' 项')))+'</div>';
          if(st.cur==null && !rows.length) html='<div style="padding:24px;text-align:center;color:#8b8272;font-size:13px;">没摸到存储位置</div>';
          else if(!rows.length) html='<div style="padding:24px;text-align:center;color:#8b8272;font-size:13px;">这里是空的</div>';
          for(i=0;i<rows.length;i++){
            var r=rows[i], on=!!st.sel[r.path];
            html+='<div data-hxfmi="'+i+'" style="display:flex;align-items:center;padding:9px 12px;cursor:pointer;border-bottom:1px solid #f3ecdf;'+(on?'background:#eef4ee;':'')+'">'+
              ((mode==='files'&&multi&&!r.dir) ? '<span style="width:22px;font-size:15px;">'+(on?'☑':'☐')+'</span>' : '')+
              '<span style="font-size:18px;margin-right:8px;">'+(r.dir?'📁':fmIcon(r.name))+'</span>'+
              '<span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+escH(r.name)+'</span>'+
              (!r.dir ? '<span style="font-size:12px;color:#8b8272;margin-left:8px;white-space:nowrap;">'+fmtSize(r.size)+' '+fmtDate(r.t)+'</span>' : '<span style="font-size:12px;color:#8b8272;margin-left:8px;">›</span>')+
              '</div>';
          }
          box.innerHTML=html;
          Array.prototype.forEach.call(box.querySelectorAll('[data-hxfmi]'), function(el){
            el.addEventListener('click', function(){
              var idx=parseInt(el.getAttribute('data-hxfmi'),10);
              var r=rows[idx]; if(!r) return;
              if(r.dir){ st.hist.push({path:r.path, name:r.name}); st.cur=r.path; var k=$f('hxFmKw'); if(k) k.value=''; loadList(); return; } /* 📁目录点进入 */ /* v0.12.1（2026-09-15，挂号#104）：进目录同时记hist足迹，⬅返回/面包屑回跳都靠它 */
              if(mode==='folder') return; /* 挑文件夹时文件行只看不点 */
              if(!multi){ fin([{name:r.name, path:r.path, size:r.size, t:r.t}]); return; } /* 单选点中即定 */
              if(st.sel[r.path]){ delete st.sel[r.path]; st.selN--; }
              else { st.sel[r.path]={name:r.name, path:r.path, size:r.size, t:r.t}; st.selN++; }
              loadList(); refreshInfo();
            });
          });
          refreshInfo();
        }catch(e){ warn('fm 列表: '+((e&&e.message)||e)); }
      }
      $f('hxFmX').addEventListener('click', function(){ fin(null); }); /* 右上角✕=cb(null) */
      $f('hxFmCancel').addEventListener('click', function(){ fin(null); });
      /* v0.14.0（2026-09-17，洪老师拍板）：☑全选/☒全不选——有勾选时点=清空全不选；
         没勾选时点=全选：「含子文件夹」勾开着且没搜词→fmWalk递归全选（跟着勾走）；否则选当前列表里显示的全部文件 */
      var allB=$f('hxFmAll');
      if(allB) allB.addEventListener('click', function(){
        if(!(mode==='files'&&multi)) return;
        if(st.selN>0){ st.sel={}; st.selN=0; loadList(); refreshInfo(); return; }
        var files=[], i;
        try{
          if(st.cur!=null && walkOn() && kw()===''){
            var L=window.LearnShell;
            var all=fmJson(L.fmWalk(st.cur), []);
            for(i=0;i<all.length;i++){ var f=all[i]; if(!f||!f.path) continue;
              var nm=String(f.name||''); if(nm==='') nm='（名字读不出）';
              if(hideKit && isKitFile(nm)) continue;
              files.push({name:nm, path:String(f.path), size:(+f.size)||0, t:(+f.t)||0}); }
          } else {
            var rows0=fetchRows();
            for(i=0;i<rows0.length;i++){ var r0=rows0[i]; if(r0&&!r0.dir) files.push(r0); }
          }
        }catch(e){}
        if(!files.length){ fmToast('这里没有文件可勾'); return; }
        files.forEach(function(r){ if(!st.sel[r.path]){ st.sel[r.path]={name:r.name, path:r.path, size:r.size, t:r.t}; st.selN++; } });
        fmToast('全勾上了：'+files.length+' 份');
        loadList(); refreshInfo();
      });
      var okB=$f('hxFmOk');
      if(okB) okB.addEventListener('click', function(){
        if(mode==='folder'){ if(st.cur) fin(String(st.cur)); return; } /* 就选这个文件夹（根列表屏不可点） */
        if(st.selN>0){ var a=[]; for(var p in st.sel){ if(Object.prototype.hasOwnProperty.call(st.sel,p)) a.push(st.sel[p]); } fin(a); }
      });
      /* v0.12.1（2026-09-15，挂号#104）：folder模式「＋在此新建文件夹」——X5里window.prompt不稳（部分版本直接返回null），改用行内小浮层输名字；调壳v1.8.4 fmMkdir桥，成则刷新列表 */
      var mkB=$f('hxFmMkdir');
      if(mkB) mkB.addEventListener('click', function(){
        if(!st.cur) return; /* 根列表屏没有"在此"，钮已压灰 */
        var L=window.LearnShell;
        if(!L || !L.fmMkdir){ fmToast('手机壳太旧，没有新建文件夹这手艺，请先升级壳'); return; }
        var lay=document.createElement('div');
        lay.style.cssText='position:absolute;left:16px;right:16px;bottom:64px;z-index:5;background:#fffdf8;border:1px solid #ddd2ba;border-radius:10px;box-shadow:0 4px 16px rgba(0,0,0,.15);padding:12px;';
        lay.innerHTML='<div style="font-size:14px;margin-bottom:8px;">新文件夹叫啥名？</div>'+
          '<input id="hxFmMkName" type="text" placeholder="例如：新病历" style="width:100%;box-sizing:border-box;border:1px solid #ddd2ba;border-radius:8px;padding:8px 10px;font-size:14px;color:#6b6257;background:#fff;outline:none;"/>'+
          '<div style="text-align:right;margin-top:10px;">'+
          '<button id="hxFmMkNo" type="button" style="background:#fff;color:#6b6257;border:1px solid #ddd2ba;border-radius:8px;padding:7px 14px;font-size:13px;margin-right:8px;cursor:pointer;">算了</button>'+
          '<button id="hxFmMkYes" type="button" style="background:#7a9e7e;color:#fff;border:none;border-radius:8px;padding:7px 14px;font-size:13px;cursor:pointer;">建好</button></div>';
        ui.box.appendChild(lay);
        function closeMk(){ rmNode(lay); }
        $f('hxFmMkNo').addEventListener('click', closeMk);
        $f('hxFmMkYes').addEventListener('click', function(){
          var nm=trim($f('hxFmMkName') ? $f('hxFmMkName').value : '');
          if(nm===''){ fmToast('名字没填'); return; }
          if(nm.indexOf('/')>=0){ fmToast('名字里不能有斜杠'); return; }
          var r='0'; try{ r=String(L.fmMkdir(st.cur, nm)); }catch(e){}
          if(r==='1'){ closeMk(); fmToast('建好了'); loadList(); }
          else fmToast('没建成，这位置可能不让建');
        });
      });
      /* v0.12.1（2026-09-15，挂号#104）：行内小提示条（3秒自消），免alert卡壳 */
      function fmToast(msg){
        try{
          var t=document.createElement('div');
          t.style.cssText='position:absolute;left:50%;bottom:70px;transform:translateX(-50%);background:rgba(60,50,40,.92);color:#fff;font-size:13px;border-radius:8px;padding:8px 16px;z-index:6;white-space:nowrap;';
          t.textContent=msg;
          ui.box.appendChild(t);
          setTimeout(function(){ rmNode(t); }, 3000);
        }catch(e){}
      }
      var kwI=$f('hxFmKw');
      if(kwI) kwI.addEventListener('input', function(){
        try{ if(st.deb) clearTimeout(st.deb); }catch(e){}
        st.deb=setTimeout(function(){ loadList(); }, 300); /* 打字歇300毫秒再搜，免卡 */
      });
      if(wk) wk.addEventListener('change', function(){ loadList(); });
      loadList();
    }
    /* v0.12.0（2026-09-15）：读文件→Promise(base64)；无桥/读不到=reject，宿主自己catch */
    fm.read = function(path){
      return new Promise(function(res, rej){
        try{
          var L=window.LearnShell;
          if(!L || !L.fmRead){ rej(new Error('没有文件桥')); return; }
          var b64=L.fmRead(String(path||''));
          if(typeof b64!=='string'){ rej(new Error('读不到这个文件')); return; }
          res(b64);
        }catch(e){ rej(e); }
      });
    };
    return fm;
  })();

  /* ════ 6. 三级加载器现成代码（接入方照抄；军规1：加载失败主功能照常，只静默降级） ════ */
/* =========================================================================
 * HX.chat — AI对话框心脏 v0.32.0（纯加法新模块，不改任何既有模块）
 * 数据账：
 *   索引 localStorage hx_chat_v1 = {"list":[{"id","title","updated","turns"}],"cur":id|null}
 *   真源 壳授权文件夹 hxdata_hx_chat_<id>.json（HX.big.enc 打包 b64 → LearnShell.writeFile）
 *        结构 {"id","title","msgs":[{"r":"u"|"a","c","t"}],"sum","facts":[],"compTurns","turns"}
 *   桥不在（网页版）回落 localStorage hx_chat_d_<id>（JSON原文，不 b64）
 *   云存档：回复落账后 HX.dav.mirror('hxdata_hx_chat_<id>.json')（闲时镜像，失败静默）
 * 公开接口：
 *   HX.chat.list() -> 数组（坏/无 -> []）
 *   HX.chat.newChat() -> 新 id 'c'+Date.now()（建空存档 + 索引登记 + cur 指向它）
 *   HX.chat.load(id) -> 对话对象或 null（先壳真源 → HX.big.dec；败回落 localStorage）
 *   HX.chat.save(d) -> 写三层（真源 + localStorage 兜底 + 索引更新），全程 try
 *   HX.chat.del(id) -> 索引除名（真源文件留着无害）
 *   HX.chat.setCur(id) / HX.chat.getCur()
 *   HX.chat.send(id,text,cb) cb={onOk(reply),onErr(msg),onTick(秒)}
 *   HX.chat.pullCloud(onDone) onDone(捞回个数) / onDone(-1) 云端没通
 * 总开关：localStorage hx_chat_off==='1' 全模块退休（各公开函数首行判，返回空值/静默）
 * 通道链：棒1 DeepSeek → 棒2 千问 → 棒3 Kimi；每棒 60 秒 AbortController 死心，无则降级
 * ========================================================================= */
HX.chat = (function () {
  'use strict';
  var OFF_KEY = 'hx_chat_off';
  var IDX_KEY = 'hx_chat_v1';
  var D_PREFIX = 'hx_chat_d_';
  var FILE_PREFIX = 'hxdata_hx_chat_';
  var CLOUD_DIR = '/学习套装数据/';
  var PERSONA = '你是洪晓涛医生的医学学习助手。用大白话回答，医学内容给依据（指南/教科书出处），拿不准直说不猜。';

  function isOff() {
    try { return lsGet(OFF_KEY) === '1'; } catch (e) { return false; }
  }
  function nowMs() { return Date.now(); }
  function dName(id) { return D_PREFIX + id; }
  function fName(id) { return FILE_PREFIX + id + '.json'; }
  function safeStr(s) { try { return (s === null || s === undefined) ? '' : String(s); } catch (e) { return ''; } }
  function toast(msg) {
    /* Kimi终审翻案1：DS编了不存在的window.hxToastHold/hxToast/HX.toast——真接口是闭包内hxToastHold(el,hide)，直认本地（老经验：卷内引用自家模块直认） */
    try {
      if (!document.body) return;
      var d = document.createElement('div');
      d.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#4a6b4f;color:#fff;padding:10px 18px;border-radius:20px;font-size:14px;z-index:99999;box-shadow:0 2px 8px rgba(0,0,0,.25)';
      d.textContent = String(msg);
      document.body.appendChild(d);
      if (typeof hxToastHold === 'function') { hxToastHold(d, function(){ try{ if(d.parentNode) d.parentNode.removeChild(d); }catch(e){} }); }
      else { setTimeout(function(){ try{ if(d.parentNode) d.parentNode.removeChild(d); }catch(e){} }, 4000); }
    } catch (e) {}
  }

  /* ---------- 索引读写 ---------- */
  function readIndex() {
    try {
      var raw = lsGet(IDX_KEY);
      if (!raw) return { list: [], cur: null };
      var o = JSON.parse(raw);
      if (!o || typeof o !== 'object') return { list: [], cur: null };
      if (!(o.list instanceof Array)) o.list = [];
      if (o.cur === undefined) o.cur = null;
      return o;
    } catch (e) { return { list: [], cur: null }; }
  }
  function writeIndex(o) {
    try { lsSet(IDX_KEY, JSON.stringify(o)); return true; } catch (e) { return false; }
  }
  function idxUpsert(d) {
    try {
      var o = readIndex();
      var i, hit = -1;
      for (i = 0; i < o.list.length; i++) {
        if (o.list[i] && o.list[i].id === d.id) { hit = i; break; }
      }
      var rec = {
        id: d.id,
        title: safeStr(d.title) || '未命名',
        updated: nowMs(),
        turns: (d.msgs && d.msgs.length) ? Math.floor(d.msgs.length / 2) : 0
      };
      if (hit >= 0) o.list[hit] = rec; else o.list.push(rec);
      writeIndex(o);
    } catch (e) {}
  }
  function idxRemove(id) {
    try {
      var o = readIndex();
      var out = [], i;
      for (i = 0; i < o.list.length; i++) {
        if (o.list[i] && o.list[i].id === id) continue;
        out.push(o.list[i]);
      }
      o.list = out;
      if (o.cur === id) o.cur = null;
      writeIndex(o);
    } catch (e) {}
  }
  function idxHas(id) {
    try {
      var o = readIndex();
      for (var i = 0; i < o.list.length; i++) {
        if (o.list[i] && o.list[i].id === id) return true;
      }
    } catch (e) {}
    return false;
  }

  /* ---------- 真源读写（壳优先，回落 localStorage） ---------- */
  function shellRead(name) {
    try {
      if (window.LearnShell && typeof window.LearnShell.readFile === 'function') {
        return window.LearnShell.readFile(name);
      }
    } catch (e) {}
    return null;
  }
  function shellWrite(name, b64) {
    try {
      if (window.LearnShell && typeof window.LearnShell.writeFile === 'function') {
        window.LearnShell.writeFile(name, b64);
        return true;
      }
    } catch (e) {}
    return false;
  }

  function loadRaw(d) {
    /* 返回对话对象或 null */
    var id = safeStr(d);
    if (!id) return null;
    var file = fName(id);
    /* 1) 壳真源 */
    try {
      var b64 = shellRead(file);
      if (b64) {
        if (HX && HX.big && typeof HX.big.dec === 'function') {
          /* HX.big.dec 是 Promise；同步路径不行，走缓存 localStorage 优先 */
        }
      }
    } catch (e) {}
    /* 优先 localStorage 里存的明文（同步、快、稳） */
    try {
      var raw = lsGet(dName(id));
      if (raw) {
        var o = JSON.parse(raw);
        if (o && typeof o === 'object') return o;
      }
    } catch (e) {}
    /* 回落：从壳真源读 + HX.gh.b64dec 同步解 b64→文本（若有） */
    try {
      var b642 = shellRead(file);
      if (b642 && HX && HX.gh && typeof HX.gh.b64dec === 'function') {
        var txt = HX.gh.b64dec(b642);
        if (txt) {
          var o2 = JSON.parse(txt);
          if (o2 && typeof o2 === 'object') return o2;
        }
      }
    } catch (e) {}
    return null;
  }

  function persist(d) {
    /* 写三层：真源 + localStorage 兜底 + 索引更新 */
    if (!d || !d.id) return false;
    var txt = '';
    try { txt = JSON.stringify(d); } catch (e) { return false; }
    /* localStorage 兜底先写（同步、最稳） */
    try { lsSet(dName(d.id), txt); } catch (e) {}
    /* 壳真源：b64 打包后写 */
    try {
      if (window.LearnShell && typeof window.LearnShell.writeFile === 'function') {
        if (HX && HX.big && typeof HX.big.enc === 'function') {
          try {
            var p = HX.big.enc(txt);
            if (p && typeof p.then === 'function') {
              p.then(function (b64) {
                try { shellWrite(fName(d.id), b64); } catch (e) {}
              }, function () {
                try { shellWrite(fName(d.id), txt); } catch (e) {}
              });
            } else {
              /* 非 Promise 兜底：直接明写 */
              shellWrite(fName(d.id), txt);
            }
          } catch (e) {
            try { shellWrite(fName(d.id), txt); } catch (e2) {}
          }
        } else {
          try { shellWrite(fName(d.id), txt); } catch (e) {}
        }
      }
    } catch (e) {}
    idxUpsert(d);
    try { if (HX.hc && HX.hc.ingest) HX.hc.ingest(d); } catch (eHc) {} /* v0.69.0 t110刀B：话仓自动入库钩 */
    return true;
  }

  /* ---------- 键（钥匙）读取 ---------- */
  function readKeysFromShell() {
    try {
      if (!window.LearnShell || typeof window.LearnShell.readFile !== 'function') return null;
      var b64 = shellRead('hxdata_hx_keys.json');
      if (!b64) return null;
      var txt = null;
      if (HX && HX.gh && typeof HX.gh.b64dec === 'function') {
        try { txt = HX.gh.b64dec(b64); } catch (e) { txt = null; }
      }
      if (!txt) return null;
      try { return JSON.parse(txt); } catch (e) { return null; }
    } catch (e) { return null; }
  }

  function getDsKey() {
    try {
      var k = lsGet('xt_dskey');
      if (k) return k;
    } catch (e) {}
    var obj = readKeysFromShell();
    try {
      if (obj) {
        if (obj.deepseek) return obj.deepseek;
        if (obj.ds) return obj.ds;
      }
    } catch (e) {}
    return '';
  }

  /* ---------- 联网：60 秒死心 fetch ---------- */
  function fetchJson(url, headers, body, onOk, onErr) {
    var ac = null, aborted = false;
    try {
      if (typeof AbortController !== 'undefined') {
        ac = new AbortController();
      }
    } catch (e) { ac = null; }
    var tid = null;
    try {
      if (ac) {
        tid = setTimeout(function () {
          try { aborted = true; ac.abort(); } catch (e) {}
        }, 60000);
      }
    } catch (e) {}
    var opt = {
      method: 'POST',
      headers: headers,
      body: body
    };
    if (ac) opt.signal = ac.signal;
    var done = false;
    function fin(fn, arg) {
      if (done) return; done = true;
      try { if (tid) clearTimeout(tid); } catch (e) {}
      try { fn(arg); } catch (e) {}
    }
    try {
      fetch(url, opt).then(function (resp) {
        if (!resp || !resp.ok) {
          fin(onErr, 'HTTP ' + (resp && resp.status));
          return;
        }
        return resp.json().then(function (j) {
          fin(onOk, j);
        }, function (e2) {
          fin(onErr, '读JSON失败');
        });
      }, function (err) {
        if (aborted) fin(onErr, '60秒没回信');
        else fin(onErr, '网络没通');
      });
    } catch (e) {
      fin(onErr, '请求发不出');
    }
  }

  /* ---------- 通道调用（单棒） ---------- */
  /* spec: name='DeepSeek'|'千问'|'Kimi'; 返回 reply 字符串（空串视为失败） */
  function callDS(messages, cb) {
    var key = getDsKey();
    if (!key) { cb('no_key', 'DeepSeek没钥匙'); return; }
    var url = 'https://api.deepseek.com/v1/chat/completions';
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + key
    };
    var body = JSON.stringify({
      model: 'deepseek-chat',
      messages: messages,
      max_tokens: 2048
    });
    fetchJson(url, headers, body, function (j) {
      try {
        var r = j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content;
        if (r) { cb('ok', r); return; }
      } catch (e) {}
      cb('fail', 'DeepSeek没给正文');
    }, function (msg) {
      cb('fail', 'DeepSeek不通：' + msg);
    });
  }

  function callQwen(messages, cb) {
    var key = '';
    try { if (HX && HX.keys && typeof HX.keys.getQwen === 'function') key = HX.keys.getQwen() || ''; } catch (e) { key = ''; }
    key = String(key || '').replace(/^\s+|\s+$/g, ''); /* v0.33.0刀④（DS实现+Kimi终审）：正式调用钥匙trim去首尾空格（探活已修，本处补上） */
    if (!key) { cb('no_key', '千问没钥匙'); return; }
    var url = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + key
    };
    var maxt = 8192; /* v0.33.0刀①：回信上限2048→8192（qwen-plus上限8192；原Math.min(2048,8192)死代码删，治回信腰斩） */
    var _qwContinued = false; /* v0.33.0刀②：续写硬上限1次（闭包记，防死循环） */
    function _qwSend(msgs, acc) { /* v0.33.0刀②：发信收进函数；acc=已拼半截（Kimi终审翻案1：DS漏拼半截只回第二回正文，补acc累加带全程） */
      var body = JSON.stringify({
        model: 'qwen-plus',
        messages: msgs,
        max_tokens: maxt
      });
      fetchJson(url, headers, body, function (j) {
        try {
          var r = j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content;
          var fr = j && j.choices && j.choices[0] && j.choices[0].finish_reason; /* v0.33.0刀②：读finish_reason判截断 */
          if (r) {
            if (fr === 'length' && !_qwContinued) { /* 截断且没续过→自动续写一回 */
              _qwContinued = true;
              var _m2 = msgs.slice(); /* slice拷贝不动调用方原数组 */
              _m2.push({ role: 'assistant', content: r });
              _m2.push({ role: 'user', content: '刚才你没写完被截断了，请从断掉的地方接着写，不要重头开始' });
              _qwSend(_m2, acc + r);
              return;
            }
            if (fr === 'length') { cb('fail', '千问写到8192上限被截断，续写一回仍没写完'); return; } /* 续写仍截断→报fail，外层接力链照旧换下一家 */
            cb('ok', acc + r);
            return;
          }
        } catch (e) {}
        cb('fail', '千问没给正文');
      }, function (msg) {
        cb('fail', '千问不通：' + msg);
      });
    }
    _qwSend(messages, ''); /* v0.33.0刀②：首发走_qwSend */
  }

  function callKimi(messages, cb) {
    var key = '';
    try { if (HX && HX.keys && typeof HX.keys.get === 'function') key = HX.keys.get() || ''; } catch (e) { key = ''; }
    if (!key) { cb('no_key', 'Kimi没钥匙'); return; }
    /* Kimi终审翻案2：兜底名改真机现行'kimi-k2.7-code-highspeed'（DS写旧名0905），删多余修正贴纸；读hx_aimodel与大管家kimiModel()同口径 */
    var model = 'kimi-k2.7-code-highspeed';
    try {
      var m = lsGet('hx_aimodel');
      if (m) model = m;
    } catch (e) { model = 'kimi-k2.7-code-highspeed'; }
    var url = 'https://api.moonshot.cn/v1/chat/completions';
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + key
    };
    function fire(secondTry) {
      var body = JSON.stringify({
        model: model,
        messages: messages,
        max_tokens: 8192
      });
      fetchJson(url, headers, body, function (j) {
        try {
          var r = j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content;
          if (r) { cb('ok', r); return; }
          if (!secondTry) { fire(true); return; }
        } catch (e) {}
        cb('fail', 'Kimi没给正文');
      }, function (msg) {
        cb('fail', 'Kimi不通：' + msg);
      });
    }
    fire(false);
  }

  /* 组 messages */
  function buildMessages(d) {
    var arr = [];
    arr.push({ role: 'system', content: PERSONA });
    var sum = '';
    var facts = [];
    try { sum = safeStr(d.sum); } catch (e) { sum = ''; }
    try { if (d.facts instanceof Array) facts = d.facts; } catch (e) { facts = []; }
    if (sum || facts.length) {
      var extra = '';
      if (sum) extra += '【前情摘要】' + sum + '\n';
      extra += '【事实卡】\n' + facts.join('\n');
      arr.push({ role: 'system', content: extra });
    }
    var msgs = (d.msgs instanceof Array) ? d.msgs : [];
    /* 最近 6 轮 = 最近 12 条 */
    var start = Math.max(0, msgs.length - 12);
    var i;
    for (i = start; i < msgs.length; i++) {
      var m = msgs[i];
      if (!m) continue;
      var role = (m.r === 'a') ? 'assistant' : 'user';
      arr.push({ role: role, content: safeStr(m.c) });
    }
    return arr;
  }

  /* ---------- 云存档镜像 ---------- */
  function mirror(id) {
    try {
      if (HX && HX.dav && typeof HX.dav.mirror === 'function') {
        HX.dav.mirror(fName(id));
      }
    } catch (e) {}
  }

  /* ---------- 记账 ---------- */
  function billChat(model, inC, outC) {
    try {
      if (HX && HX.bill && typeof HX.bill === 'function') {
        HX.bill('AI对话框', '对话(' + model + ')', inC, outC, model);
      }
    } catch (e) {}
    try {
      if (HX && HX.bb && typeof HX.bb.log === 'function') {
        /* 由调用处再记字数；这里只补空情况 */
      }
    } catch (e) {}
  }

  /* ---------- 压缩 ---------- */
  function tryCompress(id) {
    try {
      var off = lsGet('hx_chat_compress_off');
      if (off === '1') return;
    } catch (e) {}
    var d = loadRaw(id);
    if (!d) return;
    var turns = (d.msgs instanceof Array) ? Math.floor(d.msgs.length / 2) : 0;
    var comp = d.compTurns || 0;
    if (!(turns > 10 && (turns - comp) >= 6)) return;

    /* 造压缩输入：sum + 除最近 6 轮外的老 msgs */
    var oldMsgs = [];
    try {
      var msgs = d.msgs || [];
      var keepFrom = Math.max(0, msgs.length - 12);
      for (var i = 0; i < keepFrom; i++) oldMsgs.push(msgs[i]);
    } catch (e) { return; }

    var payload = '';
    try { payload = (d.sum ? ('【已有摘要】' + d.sum + '\n') : ''); } catch (e) {}
    try {
      for (var j = 0; j < oldMsgs.length; j++) {
        var m = oldMsgs[j];
        if (!m) continue;
        payload += ((m.r === 'a' ? 'AI：' : '我：') + safeStr(m.c) + '\n');
      }
    } catch (e) {}

    var sys = '把以下医患学习对话压缩。输出严格JSON：{"sum":"200字内摘要","facts":["药名/剂量/结论/出处等结构化事实，逐条，没有就空数组"]}';
    var msgs2 = [
      { role: 'system', content: sys },
      { role: 'user', content: payload }
    ];

    var key = getDsKey();
    if (!key) return;

    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + key
    };
    var body = JSON.stringify({
      model: 'deepseek-chat',
      messages: msgs2,
      max_tokens: 1024
    });

    fetchJson('https://api.deepseek.com/v1/chat/completions', headers, body, function (j) {
      try {
        var txt = j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content;
        if (!txt) return;
        /* 剥 JSON */
        var s = safeStr(txt);
        var a = s.indexOf('{'), b = s.lastIndexOf('}');
        if (a < 0 || b <= a) return;
        var obj = JSON.parse(s.substring(a, b + 1));
        if (!obj || typeof obj !== 'object') return;
        var dx = loadRaw(id);
        if (!dx) return;
        if (typeof obj.sum === 'string') dx.sum = obj.sum;
        if (obj.facts instanceof Array) dx.facts = obj.facts;
        dx.compTurns = turns;
        persist(dx);
      } catch (e) {}
    }, function () {
      /* 失败静默，下次再压 */
    });
  }

  /* ---------- davCall 包装（照 HX.dav 里的样式自写一份，120 秒死心） ---------- */
  function davCall(action, user, pass, p3, p4, onDone) {
    try {
      if (!window.LearnShell || typeof window.LearnShell.davAsync !== 'function') {
        onDone(null); return;
      }
      if (!HX._davCbs) HX._davCbs = {};
      var cbId = 'chat_' + nowMs() + '_' + Math.floor(Math.random() * 100000);
      var done = false;
      var tid = setTimeout(function () {
        if (done) return; done = true;
        try { delete HX._davCbs[cbId]; } catch (e) {}
        onDone(null);
      }, 120000);
      HX._davCbs[cbId] = function (result) {
        if (done) return; done = true;
        try { clearTimeout(tid); } catch (e) {}
        try { delete HX._davCbs[cbId]; } catch (e) {}
        onDone(result);
      };
      window.LearnShell.davAsync(action, user, pass, p3, p4, cbId);
    } catch (e) {
      try { onDone(null); } catch (e2) {}
    }
  }

  /* ---------- 公开接口 ---------- */
  var api = {};

  api.list = function () {
    if (isOff()) return [];
    try { return readIndex().list || []; } catch (e) { return []; }
  };

  api.newChat = function () {
    if (isOff()) return null;
    var id = 'c' + nowMs();
    var d = { id: id, title: '', msgs: [], sum: '', facts: [], compTurns: 0, turns: 0 };
    persist(d);
    try {
      var o = readIndex();
      o.cur = id;
      writeIndex(o);
    } catch (e) {}
    return id;
  };

  api.load = function (id) {
    if (isOff()) return null;
    try { return loadRaw(id); } catch (e) { return null; }
  };

  api.save = function (d) {
    if (isOff()) return false;
    try { return persist(d); } catch (e) { return false; }
  };

  api.del = function (id) {
    if (isOff()) return;
    try {
      idxRemove(id);
      toast('记录从列表撤了（云端文件留着无害）');
    } catch (e) {}
  };

  api.setCur = function (id) {
    if (isOff()) return;
    try {
      var o = readIndex();
      o.cur = id;
      writeIndex(o);
    } catch (e) {}
  };

  api.getCur = function () {
    if (isOff()) return null;
    try { return readIndex().cur; } catch (e) { return null; }
  };

  /* 主发送：cb = {onOk(reply), onErr(msg), onTick(sec)} */
  api.send = function (id, text, cb, opt) { /* v0.70.0 刀B：加第4参opt={web}透传总泵联网（SPEC_t113），可缺省老调用零影响 */
    if (isOff()) { try { cb && cb.onErr && cb.onErr('对话功能已退休'); } catch (e) {} return; }
    cb = cb || {};
    opt = opt || {};
    text = safeStr(text);
    if (!text) { try { cb.onErr && cb.onErr('没输入内容'); } catch (e) {} return; }
    var d = api.load(id);
    if (!d) { try { cb.onErr && cb.onErr('对话没找着'); } catch (e) {} return; }

    if (!(d.msgs instanceof Array)) d.msgs = [];
    d.msgs.push({ r: 'u', c: text, t: nowMs() });
    if (!safeStr(d.title)) d.title = text.substring(0, 20);
    api.save(d);

    var messages = buildMessages(d);

    /* 秒表 */
    var tickStart = nowMs();
    var tickTimer = null;
    var stopped = false;
    try {
      if (cb.onTick) {
        tickTimer = setInterval(function () {
          if (stopped) return;
          var sec = Math.floor((nowMs() - tickStart) / 1000);
          try { cb.onTick(sec); } catch (e) {}
        }, 1000);
      }
    } catch (e) { tickTimer = null; }
    function stopTick() {
      stopped = true;
      try { if (tickTimer) clearInterval(tickTimer); } catch (e) {}
    }

    /* 通道链 */
    var inChars = text.length;
    var lastMsg = '';

    function tryDS() {
      callDS(messages, function (st, payload) {
        if (st === 'ok') { done(payload, 'DeepSeek'); return; }
        lastMsg = payload || 'DeepSeek不通';
        if (st === 'no_key') {
          /* 静默换棒不打扰 */
          tryQwen(false);
        } else {
          toast('DeepSeek这条路不通，自动换千问');
          tryQwen(true);
        }
      });
    }
    function tryQwen(bumped) {
      callQwen(messages, function (st, payload) {
        if (st === 'ok') { done(payload, '千问'); return; }
        lastMsg = payload || '千问不通';
        if (st === 'no_key') {
          tryKimi(false);
        } else {
          toast('千问这条路不通，自动换Kimi');
          tryKimi(true);
        }
      });
    }
    function tryKimi(bumped) {
      callKimi(messages, function (st, payload) {
        if (st === 'ok') { done(payload, 'Kimi'); return; }
        lastMsg = payload || 'Kimi不通';
        /* 全灭 */
        stopTick();
        try { cb.onErr && cb.onErr('三家都没通：' + lastMsg); } catch (e) {}
      });
    }

    function done(reply, model) {
      stopTick();
      reply = safeStr(reply);
      if (!reply) {
        try { cb.onErr && cb.onErr('回信是空的'); } catch (e) {}
        return;
      }
      var dx = api.load(id);
      if (!dx) dx = d;
      if (!(dx.msgs instanceof Array)) dx.msgs = d.msgs;
      dx.msgs.push({ r: 'a', c: reply, t: nowMs(), by: model }); /* v0.71.0 鱼骨版面刀A：落账记哪家AI答的 */
      /* 更新 turns（后续压缩判用） */
      try { dx.turns = Math.floor(dx.msgs.length / 2); } catch (e) {}
      api.save(dx);
      mirror(id);
      billChat(model, inChars, reply.length);
      try {
        if (HX && HX.bb && typeof HX.bb.log === 'function') {
          HX.bb.log('note', 'chat 回信 ' + reply.length + '字');
        }
      } catch (e) {}
      try { cb.onOk && cb.onOk(reply, model); } catch (e) {} /* v0.71.0 鱼骨版面刀B：onOk第2参=哪家AI */
      /* 异步触发压缩（不占回信链） */
      try { setTimeout(function () { tryCompress(id); }, 200); } catch (e) {}
    }

    /* v0.70.0 刀B：心脏换泵——总泵在且未关→HX.aip.go直通（msgs=buildMessages产物+web+onProg透传，by映射中文名喂billChat老口径）；aip不在或hx_aip_off=1→老tryDS()链一行不动 */
    var _aipGo = false;
    try { _aipGo = !!(HX.aip && typeof HX.aip.go === 'function' && lsGet('hx_aip_off') !== '1'); } catch (e) { _aipGo = false; }
    if (_aipGo) {
      try {
        HX.aip.go(null, text, { msgs: messages, web: !!opt.web, onProg: cb.onProg }, function (ok, txt, by) {
          if (ok && txt) { done(txt, by === 'qwen' ? '千问' : (by === 'kimi' ? 'Kimi' : 'DeepSeek')); return; }
          stopTick();
          try { cb.onErr && cb.onErr(String(txt || '三家都没通')); } catch (e) {}
        });
      } catch (e) { tryDS(); }
    } else {
      tryDS();
    }
  };

  /* 云端捞回：onDone(n) 或 onDone(-1) */
  api.pullCloud = function (onDone) {
    if (isOff()) { try { onDone && onDone(-1); } catch (e) {} return; }
    onDone = onDone || function () {};
    var ok = false;
    try { ok = (HX && HX.dav && typeof HX.dav.asyncOk === 'function' && HX.dav.asyncOk()); } catch (e) { ok = false; }
    var cred = null;
    try { if (HX && HX.keys && typeof HX.keys.dav === 'function') cred = HX.keys.dav(); } catch (e) { cred = null; }
    if (!ok || !cred || !cred.user || !cred.pass || !window.LearnShell || typeof window.LearnShell.davAsync !== 'function') {
      try { onDone(-1); } catch (e) {}
      return;
    }
    davCall('list', cred.user, cred.pass, CLOUD_DIR, '', function (result) {
      var arr = null;
      try {
        if (typeof result === 'string') arr = JSON.parse(result);
        else if (result && typeof result === 'object') {
          if (result.data) arr = result.data;
          else arr = result;
        }
      } catch (e) { arr = null; }
      if (!(arr instanceof Array)) {
        try { onDone(-1); } catch (e) {}
        return;
      }
      var cands = [];
      try {
        for (var i = 0; i < arr.length; i++) {
          var it = arr[i];
          if (!it) continue;
          var nm = it.name || it.filename || it.path || '';
          if (typeof nm !== 'string') continue;
          var base = nm.split('/').pop();
          if (!base) continue;
          if (base.indexOf(FILE_PREFIX) !== 0) continue;
          if (base.slice(-5) !== '.json') continue;
          var cid = base.substring(FILE_PREFIX.length, base.length - 5);
          if (!cid) continue;
          if (idxHas(cid)) continue;
          cands.push({ id: cid, name: base });
        }
      } catch (e) { cands = []; }

      if (!cands.length) { try { onDone(0); } catch (e) {} return; }

      var got = 0;
      var idx = 0;
      function nextOne() {
        if (idx >= cands.length) {
          try { onDone(got); } catch (e) {}
          return;
        }
        var c = cands[idx++];
        try {
          var p = HX.dav.downFile(CLOUD_DIR + c.name, c.name);
          if (p && typeof p.then === 'function') {
            p.then(function (txt) {
              try {
                if (txt) {
                  var o = JSON.parse(txt);
                  if (o && typeof o === 'object') {
                    if (!o.id) o.id = c.id;
                    if (!(o.msgs instanceof Array)) o.msgs = [];
                    persist(o);
                    got++;
                  }
                }
              } catch (e) {}
              nextOne();
            }, function () { nextOne(); });
          } else {
            /* 同步返回字符串 */
            try {
              if (p) {
                var o2 = JSON.parse(p);
                if (o2 && typeof o2 === 'object') {
                  if (!o2.id) o2.id = c.id;
                  if (!(o2.msgs instanceof Array)) o2.msgs = [];
                  persist(o2);
                  got++;
                }
              }
            } catch (e) {}
            nextOne();
          }
        } catch (e) {
          nextOne();
        }
      }
      nextOne();
    });
  };


  /* v0.36.0 分家④：公共泵——单体只管出提示词，送信换棒这一份全家共用；
     链默认 千问→Kimi→DeepSeek（照单体老习惯千问先），opt.which='qwen'/'kimi'/'ds' 可点名只走一家；
     cb(ok, text, by) by='qwen'/'kimi'/'ds'；流式onProg/联网web暂不支持，要用这两样的单体照旧走自带老泵 */
  api.pump = function (sys, usr, opt, cb) {
    if (isOff()) { try { cb(false, 'chat模块已退休', ''); } catch (e) {} return; }
    opt = opt || {};
    /* v0.70.0 刀A（SPEC_t113）：总泵在且未关→转调HX.aip.go（签名/链序/cb(ok,txt,by)口径一字不变，监察员/AI质检/zg/话仓全部自动归拢调用方零改动）；aip不在或hx_aip_off=1→走老链（callQwen/callKimi/callDS全保留不删） */
    var _useAip = false;
    try { _useAip = !!(HX.aip && typeof HX.aip.go === 'function' && lsGet('hx_aip_off') !== '1'); } catch (e) { _useAip = false; }
    if (_useAip) {
      try {
        HX.aip.go(sys, usr, { which: opt.which, maxTokens: opt.maxTokens, web: !!opt.web, onProg: opt.onProg }, function (ok, txt, by) {
          try { cb(!!ok, txt, by || ''); } catch (e) {}
        });
      } catch (e) { try { cb(false, '总泵调用炸了：' + ((e && e.message) || e), ''); } catch (e2) {} }
      return;
    }
    var msgs = [{ role: 'system', content: String(sys || '') }, { role: 'user', content: String(usr || '') }];
    var chain = [];
    if (opt.which === 'qwen') chain = ['qwen'];
    else if (opt.which === 'kimi') chain = ['kimi'];
    else if (opt.which === 'ds') chain = ['ds'];
    else chain = ['qwen', 'kimi', 'ds'];
    var fnMap = { qwen: callQwen, kimi: callKimi, ds: callDS };
    (function go(i) {
      if (i >= chain.length) { try { cb(false, '三家都没通', ''); } catch (e) {} return; }
      var w = chain[i];
      try {
        fnMap[w](msgs, function (st, txt) {
          if (st === 'ok' && txt) { try { cb(true, txt, w); } catch (e) {} }
          else go(i + 1);
        });
      } catch (e) { go(i + 1); }
    })(0);
  };

  return api;
})();

/* ════ HX.zg AI总管（v0.60.0 2026-10-23，SPEC_AI总管一期 刀B，洪老师拍板「直接开干干完为止」；外援双缺DS破线/千问401，Kimi亲手写全程）════
   职责：手伸进小涛的书——书库直连读写（不依赖小涛页面开着，走HX.store仓管员一本账+壳档案柜）、
   章正文历史版留底退回、命令识别（融进/写进/塞进/并入+《书》+第N章）、三步命令链（取章→AI融合走HX.chat.pump→写回留底）。
   数据键：书台账xt_books_v1、章正文导出账xt_chapters_v1（{"bid_cid":"正文"}）、外改戳xt_chapstamp_v1（{"bid_cid":ts}，小涛v0.22.0开门消费对齐IDB防旧盖新）、历史版xt_chapHist_v1（{"bid_cid":[{ts,why,text}]}每章封顶5版新的在前）。
   总开关hx_zg_off=1全模块退休（公开口返空/false）。全函数try护栏，单点炸不牵连宿主。 */
HX.zg = (function () {
  'use strict';
  var LS_BOOKS = 'xt_books_v1';
  var LS_CHAPS = 'xt_chapters_v1';
  var LS_STAMP = 'xt_chapstamp_v1';
  var LS_HIST = 'xt_chapHist_v1';
  var HIST_MAX = 5;

  function zgOff() {
    try { return lsGet('hx_zg_off') === '1'; } catch (e) { return false; }
  }
  function ckey(bid, cid) { return String(bid) + '_' + String(cid); }
  function mirr(fn) { try { if (HX.dav && HX.dav.mirror) HX.dav.mirror(fn); } catch (e) {} }

  /* 读一个JSON键：HX.store缓存优先（sync后缓存即对齐值），无则真源rRead路=HX.store.get兜底；解析失败返null */
  function readJson(key) {
    var raw = null;
    try { if (HX.store && HX.store.get) raw = HX.store.get(key, null); } catch (e) { raw = null; }
    if (raw === null || raw === undefined) {
      try { raw = lsGet(key); } catch (e2) { raw = null; }
      if (raw === '') raw = null;
    }
    if (raw === null) return null;
    try { var o = JSON.parse(raw); return o; } catch (e) { return null; }
  }
  /* 写一个JSON键：HX.store.set（缓存+影子ts+壳真源一筢）+坚果云镜像；无store降级localStorage */
  function writeJson(key, obj, mirrorName) {
    var txt = '';
    try { txt = JSON.stringify(obj); } catch (e) { return false; }
    var ok = false;
    try {
      if (HX.store && HX.store.set) { ok = !!HX.store.set(key, txt); }
    } catch (e) { ok = false; }
    if (!ok) { try { lsSet(key, txt); ok = true; } catch (e2) {} }
    if (ok && mirrorName) mirr(mirrorName);
    return ok;
  }

  var api = {};

  /* 书库清单：[{id,title,chapters:[{id,t}]}]；没有/坏账返[] */
  api.listBooks = function () {
    if (zgOff()) return [];
    var o = readJson(LS_BOOKS);
    if (!(o instanceof Array)) return [];
    var out = [];
    try {
      for (var i = 0; i < o.length; i++) {
        var b = o[i];
        if (!b || !b.id) continue;
        var chs = [];
        var arr = (b.chapters instanceof Array) ? b.chapters : [];
        for (var j = 0; j < arr.length; j++) {
          var c = arr[j];
          if (!c || !c.id) continue;
          chs.push({ id: c.id, t: String(c.t || ('第' + (j + 1) + '章')) });
        }
        out.push({ id: b.id, title: String(b.title || '未命名书'), chapters: chs });
      }
    } catch (e) {}
    return out;
  };

  /* 取章正文：找不到返null（空串=真空章也返''原文） */
  api.getChap = function (bid, cid) {
    if (zgOff()) return null;
    var o = readJson(LS_CHAPS);
    if (!o || typeof o !== 'object') return null;
    var k = ckey(bid, cid);
    if (!Object.prototype.hasOwnProperty.call(o, k)) return null;
    try { return String(o[k]); } catch (e) { return null; }
  };

  /* 历史版清单（不回报全文）：[{ts,why,len}]新的在前 */
  api.histList = function (bid, cid) {
    if (zgOff()) return [];
    var o = readJson(LS_HIST);
    if (!o || typeof o !== 'object') return [];
    var arr = o[ckey(bid, cid)];
    if (!(arr instanceof Array)) return [];
    var out = [];
    try {
      for (var i = 0; i < arr.length; i++) {
        var h = arr[i];
        if (!h) continue;
        out.push({ ts: (+h.ts) || 0, why: String(h.why || ''), len: String(h.text || '').length });
      }
    } catch (e) {}
    return out;
  };

  function histPush(bid, cid, text, why) {
    try {
      var o = readJson(LS_HIST);
      if (!o || typeof o !== 'object') o = {};
      var k = ckey(bid, cid);
      var arr = (o[k] instanceof Array) ? o[k] : [];
      arr.unshift({ ts: Date.now(), why: String(why || ''), text: String(text) });
      if (arr.length > HIST_MAX) arr = arr.slice(0, HIST_MAX);
      o[k] = arr;
      writeJson(LS_HIST, o, 'hxdata_' + LS_HIST + '.json');
    } catch (e) {}
  }

  /* 写章：旧文留历史→写新文→盖外改戳；返回true/false */
  api.putChap = function (bid, cid, newText, why) {
    if (zgOff()) return false;
    if (bid === null || bid === undefined || cid === null || cid === undefined) return false;
    var oldTxt = api.getChap(bid, cid);
    if (oldTxt !== null && String(oldTxt) !== String(newText)) {
      try { histPush(bid, cid, oldTxt, '改写前留底' + (why ? ('（' + why + '）') : '')); } catch (e) {}
    }
    var o = readJson(LS_CHAPS);
    if (!o || typeof o !== 'object') o = {};
    o[ckey(bid, cid)] = String(newText);
    var ok = writeJson(LS_CHAPS, o, 'hxdata_' + LS_CHAPS + '.json');
    if (ok) {
      try {
        var st = readJson(LS_STAMP);
        if (!st || typeof st !== 'object') st = {};
        st[ckey(bid, cid)] = Date.now();
        writeJson(LS_STAMP, st, 'hxdata_' + LS_STAMP + '.json');
      } catch (e) {}
      /* t107刀1①（2026-10-25 SPEC_t107成书空章根治，洪老师真机报第1位「书传到地方内容是空的」；DS实现+Kimi终审翻案1处=补建kv仓）：双写IndexedDB正本xt-lib-db/chunks（键=ckey同xiaotao bookChapKey格式bid_cid），fire-and-forget不等结果，任何错静默绝不影响返回值 */
      try {
        if (typeof indexedDB !== 'undefined' && indexedDB) {
          var _rq = indexedDB.open('xt-lib-db', 1);
          _rq.onupgradeneeded = function (ev) {
            try {
              var _db = ev.target.result;
              if (!_db.objectStoreNames.contains('chunks')) _db.createObjectStore('chunks', { keyPath: 'id' });
              if (!_db.objectStoreNames.contains('kv')) _db.createObjectStore('kv'); /* 终审翻案：与xiaotao libDbOpen建仓一致，防全新机先成书后开小涛kv永缺 */
            } catch (e) {}
          };
          _rq.onsuccess = function (ev) {
            try {
              var _db2 = ev.target.result;
              var _tx = _db2.transaction('chunks', 'readwrite');
              _tx.objectStore('chunks').put({ id: ckey(bid, cid), text: String(newText) });
            } catch (e) {}
          };
          _rq.onerror = function () {};
        }
      } catch (e) {}
      /* t107刀1②：翻books账state未写→已写（章页标题/目录「未写」全靠这个字段，戳消费链只灌IDB不翻它=主病根），全静默 */
      try {
        var _bk = readJson(LS_BOOKS);
        if (Object.prototype.toString.call(_bk) === '[object Array]') {
          for (var _i = 0; _i < _bk.length; _i++) {
            if (_bk[_i] && _bk[_i].id === bid) {
              var _chs = _bk[_i].chapters;
              if (Object.prototype.toString.call(_chs) === '[object Array]') {
                for (var _j = 0; _j < _chs.length; _j++) {
                  if (_chs[_j] && _chs[_j].id === cid && _chs[_j].state === '未写') {
                    _chs[_j].state = '已写';
                    writeJson(LS_BOOKS, _bk, 'hxdata_xt_books_v1.json');
                  }
                }
              }
            }
          }
        }
      } catch (e) {}
    }
    return ok;
  };

  /* 退回历史版：把ts那版写回（走putChap同链，当前版自动进历史）；成功true */
  api.rollback = function (bid, cid, ts) {
    if (zgOff()) return false;
    var o = readJson(LS_HIST);
    if (!o || typeof o !== 'object') return false;
    var arr = o[ckey(bid, cid)];
    if (!(arr instanceof Array)) return false;
    var hit = null;
    try {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] && (+arr[i].ts) === (+ts)) { hit = arr[i]; break; }
      }
    } catch (e) { hit = null; }
    if (!hit) return false;
    return api.putChap(bid, cid, String(hit.text), '退回历史版');
  };

  /* 中文数字→阿拉伯（一到三十封顶够用） */
  function cn2num(s) {
    try {
      var m = { '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 10 };
      s = String(s || '');
      if (m[s] !== undefined) return m[s];
      if (s.length === 2 && s.charAt(0) === '十') return 10 + (m[s.charAt(1)] || 0);
      if (s.length === 2 && s.charAt(1) === '十') return (m[s.charAt(0)] || 0) * 10;
      if (s.length === 3 && s.charAt(1) === '十') return (m[s.charAt(0)] || 0) * 10 + (m[s.charAt(2)] || 0);
    } catch (e) {}
    return 0;
  }

  /* 命令识别：命中返{book,bookId,chapNo,chapId,chapTitle,material}，否则null。
     宁漏不误：必须四动词条其一+能定位到唯一章才触发；书名缺省=全库只有一本书时免点名。 */
  api.detectCmd = function (text) {
    if (zgOff()) return null;
    var t = String(text || '');
    if (!t) return null;
    var m = t.match(/(融进|写进|塞进|并入)/);
    if (!m) return null;
    var verbAt = m.index;
    var tail = t.substring(verbAt + m[1].length); /* 动词后面=目的地 */
    var head = t.substring(0, verbAt);            /* 动词前面=材料 */
    /* 书名《》 */
    var bookName = '';
    var bm = tail.match(/《([^》]+)》/);
    if (bm) bookName = bm[1];
    /* 章号：第N章（阿拉伯或中文数字）或 章名 */
    var chapNo = 0, chapName = '';
    var cm = tail.match(/第\s*([0-9]+)\s*章/);
    if (cm) chapNo = parseInt(cm[1], 10) || 0;
    if (!chapNo) {
      var cm2 = tail.match(/第\s*([一二三四五六七八九十]{1,3})\s*章/);
      if (cm2) chapNo = cn2num(cm2[1]);
    }
    if (!chapNo) {
      var cm3 = tail.match(/[《「『]?([^《》「』，。；第]{2,12}章)[》」』]?/);
      if (cm3) chapName = cm3[1];
    }
    if (!chapNo && !chapName) return null;
    /* 定位书 */
    var books = api.listBooks();
    if (!books.length) return null;
    var book = null;
    if (bookName) {
      for (var i = 0; i < books.length; i++) {
        if (books[i].title.indexOf(bookName) >= 0 || bookName.indexOf(books[i].title) >= 0) { book = books[i]; break; }
      }
      if (!book) return null;
    } else {
      if (books.length !== 1) return null; /* 多本书又不点名=不猜 */
      book = books[0];
    }
    /* 定位章：章号优先（第N章=目录第N条），章名次之（含包含即中，多义不猜） */
    var chap = null;
    if (chapNo >= 1 && chapNo <= book.chapters.length) {
      chap = book.chapters[chapNo - 1];
    } else if (chapName) {
      var hits = [];
      for (var j = 0; j < book.chapters.length; j++) {
        if (book.chapters[j].t.indexOf(chapName) >= 0 || chapName.indexOf(book.chapters[j].t) >= 0) hits.push(book.chapters[j]);
      }
      if (hits.length === 1) chap = hits[0];
    }
    if (!chap) return null;
    return {
      book: book.title, bookId: book.id,
      chapNo: chapNo, chapId: chap.id, chapTitle: chap.t,
      material: head.replace(/^\s*(把|将|请|帮我把|帮我将)\s*/, '').replace(/[\s，。]+$/, '')
    };
  };

  /* ════ 二期刀F：模糊找章+重复粗筛（hx-common v0.61.0 2026-10-23，SPEC_AI总管二期，洪老师拍板「二期开工」；DS实现+Kimi终审翻案1处亲手落地=DS编造listBooks字段{bid,book,chaps}真身{id,title,chapters}已扶正记账1笔）════ */
  /* 字包含/二字重合打分（本地零费） */
  function zgScoreHint(hint, name) {
    var h = String(hint || ''), n = String(name || '');
    if (!h || !n) return 0;
    if (h.indexOf(n) >= 0) return 100 + n.length;
    var sc = 0;
    for (var i = 0; i + 1 < n.length; i++) {
      var two = n.substr(i, 2);
      if (h.indexOf(two) >= 0) sc += 1;
    }
    return sc;
  }
  /* 书目压compact行（书名||行号||章名，封顶cap行）+平行真身表（AI只回行号，真身本地取防AI编id） */
  function zgCompactBooks(books, cap) {
    var lines = [], map = [], truncated = false;
    for (var i = 0; i < books.length; i++) {
      var b = books[i];
      if (!b) continue;
      var chs = (b.chapters instanceof Array) ? b.chapters : [];
      for (var j = 0; j < chs.length; j++) {
        if (lines.length >= cap) { truncated = true; break; }
        lines.push(String(b.title || '') + '||' + (lines.length + 1) + '||' + String(chs[j].t || ''));
        map.push({ bid: b.id, cid: chs[j].id, book: String(b.title || ''), chapTitle: String(chs[j].t || '') });
      }
      if (truncated) break;
    }
    return { lines: lines, map: map, truncated: truncated };
  }
  /* 模糊找章：①全库只一章免找 ②本地粗配唯一命中且高第二名一倍直接定 ③AI精配（走HX.chat.pump公共口）。
     cbs{onOk({bid,cid,book,chapTitle,conf:'high'|'ai'}),onMiss(msg),onErr(msg)} */
  api.findChap = function (hint, cbs) {
    cbs = cbs || {};
    function good(info) { try { if (cbs.onOk) cbs.onOk(info); } catch (e) {} }
    function miss(msg) { try { if (cbs.onMiss) cbs.onMiss(msg); } catch (e) {} }
    function bad(msg) { try { if (cbs.onErr) cbs.onErr(msg); } catch (e) {} }
    if (zgOff()) { bad('总管总开关关着（hx_zg_off=1）'); return; }
    var hintTxt = String(hint || '');
    if (!hintTxt) { miss('没带话，不知道找哪章'); return; }
    var books = [];
    try { books = api.listBooks() || []; } catch (eB) { books = []; }
    if (!books.length) { miss('账上还没有书'); return; }
    /* 全库只有一章→免找直接定 */
    var totalChap = 0, onlyB = null, onlyC = null;
    for (var i = 0; i < books.length; i++) {
      var chs = (books[i].chapters instanceof Array) ? books[i].chapters : [];
      for (var j = 0; j < chs.length; j++) { totalChap++; onlyB = books[i]; onlyC = chs[j]; }
    }
    if (totalChap === 1 && onlyB && onlyC) {
      good({ bid: onlyB.id, cid: onlyC.id, book: onlyB.title, chapTitle: onlyC.t, conf: 'high' });
      return;
    }
    /* 本地粗配：书名+章名打分，唯一命中且分高出第二名一倍→定 */
    var scored = [];
    for (var a = 0; a < books.length; a++) {
      var b2 = books[a];
      var ch2 = (b2.chapters instanceof Array) ? b2.chapters : [];
      for (var c = 0; c < ch2.length; c++) {
        var s = zgScoreHint(hintTxt, b2.title) + zgScoreHint(hintTxt, ch2[c].t);
        if (s > 0) scored.push({ bid: b2.id, cid: ch2[c].id, book: b2.title, chapTitle: ch2[c].t, score: s });
      }
    }
    scored.sort(function (x, y) { return y.score - x.score; });
    if (scored.length >= 1) {
      var top = scored[0];
      var second = scored.length >= 2 ? scored[1].score : 0;
      if (top.score > 0 && top.score >= second * 2) {
        good({ bid: top.bid, cid: top.cid, book: top.book, chapTitle: top.chapTitle, conf: 'high' });
        return;
      }
    }
    /* 粗配不出唯一→AI精配（材料截700字防超长，SPEC口径原话+材料前500字留余量） */
    var pack = zgCompactBooks(books, 60);
    /* v0.66.0 Kimi终审翻案：原「pack.lines空→miss『账上书目是空的』」会把「有书但没章」的新书库卡死在AI段前，
       独立成书永远判不出——删此行放行给配章员（它能答newBook）；连一本书都没有的情形前面「账上还没有书」已拦过。 */
    /* v0.66.0 刀A.2（2026-10-24 SPEC_AI总管三期）：findChap扩「独立成书」——sys末尾追加一句；解析到newBook→走刀A.3建书建章，不判miss */
    var sys = '你是配章员。根据用户的话和材料，从书目里选唯一最该融进去的章。只许输出一行JSON：{"i":行号}；没有合适的输出 {"i":0}。不许输出别的字。若没有一本沾边，输出{"i":0,"newBook":"建议书名"}';
    var usr = '【用户的话和材料】\n' + hintTxt.substring(0, 700) + '\n\n【书目（书名||行号||章名）】\n' + pack.lines.join('\n');
    if (pack.truncated) usr += '\n（书目有截断，尾部章未列出）';
    try {
      HX.chat.pump(sys, usr, {}, function (ok, txt, by) {
        if (!ok || !txt) { bad('AI没通：' + String(txt || '三家都没通')); return; }
        /* v0.66.0 刀A.2：先看有没有{"i":0,"newBook":"…"}（独立成书）——命中回conf:'newbook'，由调用方建书建章 */
        var mN = String(txt).match(/\{\s*"i"\s*:\s*0\s*,\s*"newBook"\s*:\s*"([^"]{1,60})"\s*\}/);
        if (mN) {
          good({ bid: null, cid: null, book: String(mN[1] || '未命名书'), chapTitle: '第1章', conf: 'newbook' });
          return;
        }
        var m = String(txt).match(/\{\s*"i"\s*:\s*(\d+)\s*\}/);
        var idx = m ? (parseInt(m[1], 10) || 0) : 0;
        if (idx < 1 || idx > pack.map.length) { miss('AI也没找准该融进哪章'); return; }
        var hit = pack.map[idx - 1];
        good({ bid: hit.bid, cid: hit.cid, book: hit.book, chapTitle: hit.chapTitle, conf: 'ai' });
      });
    } catch (e) { bad('找章中途出错'); }
  };
  /* 重复粗筛（本地零费）：材料按句切，≥12字的句在章里出现即计重，返重复字数占比0~100；章空/材料短返0 */
  api.dupRate = function (material, chapText) {
    var mat = String(material || '');
    var chap = String(chapText || '');
    if (!mat || !chap) return 0;
    var sents = mat.split(/[。！？；\n]/);
    var totalChars = 0, dupChars = 0;
    for (var i = 0; i < sents.length; i++) {
      var s = String(sents[i] || '').replace(/^\s+|\s+$/g, '');
      if (!s) continue;
      totalChars += s.length;
      if (s.length >= 12 && chap.indexOf(s) >= 0) dupChars += s.length;
    }
    if (totalChars <= 0) return 0;
    var rate = Math.round(dupChars * 100 / totalChars);
    if (rate < 0) rate = 0;
    if (rate > 100) rate = 100;
    return rate;
  };
  /* ════ 三期刀A.1（hx-common v0.66.0 2026-10-24，SPEC_AI总管三期，洪老师拍板「废暗号」）：AI判令，四动词命令闸退休════
     api.judge(text, presetRule, cbs)：走HX.chat.pump；解析失败/超时/泵不通→onMiss降级普通发送，绝不卡发送。
     cbs{onChat(),onArchive(hint),onMiss(msg)}。Kimi终审翻案1处：DS版未剥```json围栏，AI带围栏回信必解析败→补剥。 */
  api.judge = function (text, presetRule, cbs) {
    /* Kimi终审翻案：DS版漏zgOff闸，总开关关着还会去问AI——补（仿真T6实锤） */
    if (zgOff()) { try { if (cbs && cbs.onMiss) cbs.onMiss('总管总开关关着'); } catch (e0) {} return; }
    cbs = cbs || {};
    function chat() { try { if (cbs.onChat) cbs.onChat(); } catch (e) {} }
    function archive(hint) { try { if (cbs.onArchive) cbs.onArchive(String(hint || '')); } catch (e) {} }
    function miss(msg) { try { if (cbs.onMiss) cbs.onMiss(String(msg || '')); } catch (e) {} }
    var sys = '你是判令员。判断用户这句话是【闲聊】还是【归档】。问话求答的一律算闲聊：讨论/讲讲/分析/怎么看/是什么/为什么/怎么办/聊一聊/对比，以及一切疑问句求回答的话，都是闲聊。只有用户明确说要把内容放进书/归档/存起来/成书/融进书/收进书（要求把内容总结/整理/放进书/成书/存起来都算归档），才算归档。只许输出一行JSON：{"act":"chat"}或{"act":"archive","hint":"材料要点"}，不许输出别的字。';
    var usr = String(text || '');
    try { if (presetRule) usr += '\n\n【预设规矩】' + String(presetRule); } catch (eP) {}
    try {
      HX.chat.pump(sys, usr, {}, function (ok, txt, by) {
        if (!ok || !txt) { miss('AI没通：' + String(txt || '三家都没通')); return; }
        var raw = String(txt).replace(/```[a-zA-Z]*/g, '');
        var m = raw.match(/\{\s*"act"\s*:\s*"(chat|archive)"(?:\s*,\s*"hint"\s*:\s*"([^"]*)")?\s*\}/);
        if (!m) { miss('判令解析没成'); return; }
        if (m[1] === 'chat') { chat(); return; }
        archive(m[2] || String(text || ''));
      });
    } catch (e) { miss('判令中途出错'); }
  };
  /* ════ 三期刀A.3（hx-common v0.66.0）：新建书/新建章——照xt_books_v1现结构{id,title,created,kind,chapters:[{id,t,state,src:[],study:''}]}新增；
     Kimi终审翻案1处：DS版章src写成''（空串），真机书库章src是数组[]，已扶正照真结构。ZG_OFF闸照旧 ════ */
  function zgRandId() {
    try { return Date.now().toString(36) + Math.random().toString(36).substr(2, 8); } catch (e) { return String(Date.now()); }
  }
  api.addBook = function (title) {
    if (zgOff()) return null;
    var t = String(title || '').replace(/^\s+|\s+$/g, '');
    if (!t) t = '未命名书';
    var o = readJson(LS_BOOKS);
    if (!(o instanceof Array)) o = [];
    var bid = zgRandId();
    try {
      o.push({ id: bid, title: t, created: Date.now(), kind: 'ai_zg', chapters: [] });
      var ok = writeJson(LS_BOOKS, o, 'hxdata_' + LS_BOOKS + '.json');
      if (!ok) return null;
    } catch (e) { return null; }
    return bid;
  };
  api.addChapter = function (bid, title) {
    if (zgOff()) return null;
    if (!bid) return null;
    var t = String(title || '').replace(/^\s+|\s+$/g, '');
    if (!t) t = '第1章';
    var o = readJson(LS_BOOKS);
    if (!(o instanceof Array)) return null;
    var hit = null;
    try {
      for (var i = 0; i < o.length; i++) {
        if (o[i] && String(o[i].id) === String(bid)) { hit = o[i]; break; }
      }
    } catch (e) { hit = null; }
    if (!hit) return null;
    if (!(hit.chapters instanceof Array)) hit.chapters = [];
    var cid = zgRandId();
    try {
      hit.chapters.push({ id: cid, t: t, state: '未写', src: [], study: '' });
      var ok2 = writeJson(LS_BOOKS, o, 'hxdata_' + LS_BOOKS + '.json');
      if (!ok2) return null;
    } catch (e2) { return null; }
    return cid;
  };
  /* mergeDup不单设公开口（SPEC刀F第3条自相矛盾处按「实现=merge加可选参opts.rewrite」落地，SPEC留痕已确认） */

  /* 三步命令链：①取章→②AI融合(HX.chat.pump公共口)→③写回留底。每步onStep(n,人话)；失败onErr停下绝不半成品写章。 */
  api.merge = function (opts, cbs) {
    cbs = cbs || {};
    function step(n, s) { try { if (cbs.onStep) cbs.onStep(n, s); } catch (e) {} }
    function bad(msg) { try { if (cbs.onErr) cbs.onErr(msg); } catch (e) {} }
    function good(info) { try { if (cbs.onOk) cbs.onOk(info); } catch (e) {} }
    if (zgOff()) { bad('总管总开关关着（hx_zg_off=1）'); return; }
    opts = opts || {};
    var bid = opts.bid, cid = opts.cid;
    var material = String(opts.material || '');
    if (!material) { bad('没带材料，不知道融什么'); return; }
    step(1, '正在取《' + String(opts.book || '') + '》' + String(opts.chapTitle || '') + '的原章…');
    var oldTxt = api.getChap(bid, cid);
    if (oldTxt === null) { bad('这章还没正文或账上没找着，不能融'); return; }
    step(1, '取到原章（' + oldTxt.length + '字）✓');
    step(2, 'AI 正在把新材料揉进原章…');
    /* v0.66.0 刀A.4（2026-10-24 SPEC_AI总管三期，洪老师拍板「废一字不丢」版本制）：merge提示词删「一个字不许丢」，改「整理成最好的一版」；putChap历史留底机制一字未动=版本制底子 */
    var sys = '你是中文医学笔记整理助手。把【原章】与【新材料】整理成最好的一版：体例统一、重复合并、可以删减重写，知识要点尽量保留；只输出新章正文，不加任何解释、不加前后缀。';
    if (opts.rewrite) sys += '新材料与原章重复度高，请把重复段落重写组织而不是照抄拼接。'; /* v0.61.0二期刀F：重写融可选参，原串一字不动 */
    var usr = '【原章】\n' + oldTxt + '\n\n【新材料】\n' + material;
    try {
      HX.chat.pump(sys, usr, {}, function (ok, txt, by) {
        if (!ok || !txt) { bad('AI没融成：' + String(txt || '三家都没通')); return; }
        var newTxt = String(txt).replace(/^\s+|\s+$/g, '');
        if (newTxt.length < Math.min(20, oldTxt.length)) { bad('AI回信太短不对劲，没敢写回'); return; }
        step(2, 'AI 融好（' + newTxt.length + '字，' + String(by || '') + '出的力）✓');
        step(3, '正在写回并给旧版留底…');
        var okW = api.putChap(bid, cid, newTxt, 'AI总管融合');
        if (!okW) { bad('写回没成功，章没动'); return; }
        step(3, '写回成功，旧版已留底 ✓');
        good({ book: opts.book, chapTitle: opts.chapTitle, oldLen: oldTxt.length, newLen: newTxt.length, by: by });
      });
    } catch (e) { bad('命令链中途出错，章没动'); }
  };

  return api;
})();

/* ════ HX.hc 话仓（v0.69.0 2026-10-25，t110 AI对话小仓库·兼记忆库，SPEC_t110_话仓，洪老师拍板「先干话仓，开工」插队第1位；DS破线+千问401自动降级Kimi亲手全包）════
   职责：①AI对话自动入库（HX.chat persist钩增量配对，清洗去 * # ` > ~ 废符号）②话题数数（洪老师问「某话题存了多少」）
   ③问问题先查仓——有就给仓里的（没花AI钱），没有才问AI（HX.chat.pump），AI答按书格式存仓 ④仓条目可塞书（单体走chatSendBook）。
   数据键：索引 hx_hc_v1={list:[{id,title,updated,turns}]}；详情 hx_hc_d_<id>={id,qa:[{q,a,t}]}；localStorage为主+有壳writeFile备份hxdata_hx_hc_*。
   防循环：a串以「【话仓答】」开头不入仓。上限：500条FIFO；单条a截10000字。
   总开关 hx_hc_off=1 全模块退休（各公开函数首行判，返回空值/静默）。 */
HX.hc = (function () {
  'use strict';
  var OFF_KEY = 'hx_hc_off';
  var IDX_KEY = 'hx_hc_v1';
  var D_PREFIX = 'hx_hc_d_';
  var FILE_PREFIX = 'hxdata_hx_hc_';
  var MAX_ITEMS = 500;
  var MAX_ANS = 10000;
  var HIT_LINE = 0.5;
  var PERSONA = '你是洪晓涛医生的医学学习助手。用大白话回答，医学内容给依据（指南/教科书出处），拿不准直说不猜。';

  function isOff() { try { return lsGet(OFF_KEY) === '1'; } catch (e) { return false; } }
  function nowMs() { return Date.now(); }
  function safeStr(s) { try { return (s === null || s === undefined) ? '' : String(s); } catch (e) { return ''; } }

  /* 清洗：去星号井号反引号行首箭头波浪，空白压缩 */
  function clean(s) {
    try {
      var t = safeStr(s);
      t = t.replace(/[\*#`~]/g, '');
      t = t.replace(/^\s*>\s?/gm, '');
      /* t125刀3a：补强——去【三核：X】判词行、连续横线---、markdown表格竖线（保留文字）；幂等；hx_hc_clean2_off=1不补 */
      try {
        if (lsGet('hx_hc_clean2_off') !== '1') {
          t = t.replace(/【三核：[^】]*】/g, '');
          t = t.replace(/^\s*-{3,}\s*$/gm, '');
          t = t.replace(/\|/g, ' ');
          t = t.replace(/[＊＃]/g, ''); /* t126刀4a：去全角星号＊、全角井号＃ */
          t = t.replace(/\*\*/g, ''); /* t126刀4a：去markdown粗体**残留；幂等 */
        }
      } catch (eC2) {}
      t = t.replace(/[ \t\u3000]+/g, ' ');
      t = t.replace(/\n{3,}/g, '\n\n');
      return t.replace(/^\s+|\s+$/g, '');
    } catch (e) { return safeStr(s); }
  }

  /* ---------- 索引读写 ---------- */
  function readIndex() {
    try {
      var raw = lsGet(IDX_KEY);
      if (!raw) return { list: [] };
      var o = JSON.parse(raw);
      if (!o || typeof o !== 'object') return { list: [] };
      if (!(o.list instanceof Array)) o.list = [];
      return o;
    } catch (e) { return { list: [] }; }
  }
  function writeIndex(o) {
    try {
      lsSet(IDX_KEY, JSON.stringify(o));
      try { if (window.LearnShell && typeof LearnShell.writeFile === 'function' && HX.big && HX.big.enc) { HX.big.enc(JSON.stringify(o)).then(function (b64) { try { LearnShell.writeFile(FILE_PREFIX + 'idx.json', b64); } catch (e2) {} }, function () {}); } } catch (eS) {}
      return true;
    } catch (e) { return false; }
  }

  /* ---------- 详情读写 ---------- */
  function readDetail(id) {
    try {
      var raw = lsGet(D_PREFIX + id);
      if (!raw) return null;
      var o = JSON.parse(raw);
      if (!o || typeof o !== 'object') return null;
      if (!(o.qa instanceof Array)) o.qa = [];
      return o;
    } catch (e) { return null; }
  }
  function writeDetail(o) {
    try {
      var txt = JSON.stringify(o);
      lsSet(D_PREFIX + o.id, txt);
      try { if (window.LearnShell && typeof LearnShell.writeFile === 'function' && HX.big && HX.big.enc) { HX.big.enc(txt).then(function (b64) { try { LearnShell.writeFile(FILE_PREFIX + o.id + '.json', b64); } catch (e2) {} }, function () {}); } } catch (eS) {}
      return true;
    } catch (e) { return false; }
  }

  /* ---------- 入库（HX.chat persist钩调）d={id,title,msgs:[{r,c,t}]} ---------- */
  function ingest(d) {
    if (isOff()) return false;
    try {
      if (!d || !d.id || !(d.msgs instanceof Array)) return false;
      var o = readIndex();
      var rec = null, i;
      for (i = 0; i < o.list.length; i++) { if (o.list[i] && o.list[i].id === d.id) { rec = o.list[i]; break; } }
      var det = rec ? readDetail(d.id) : null;
      if (!det) det = { id: d.id, qa: [] };
      var have = det.qa.length * 2; /* 已入库的msgs条数（u+a一对） */
      var added = 0;
      for (i = have; i + 1 < d.msgs.length; i += 2) {
        var mu = d.msgs[i], ma = d.msgs[i + 1];
        if (!mu || !ma || mu.r !== 'u' || ma.r !== 'a') continue;
        var q = clean(mu.c), a = clean(ma.c);
        if (!q || !a) continue;
        if (a.indexOf('【话仓答】') === 0) continue; /* 防循环：话仓答不再入仓 */
        if (a.length > MAX_ANS) a = a.substring(0, MAX_ANS);
        det.qa.push({ q: q, a: a, t: mu.t || nowMs() });
        added++;
      }
      if (!added) return false;
      writeDetail(det);
      var nrec = { id: d.id, title: safeStr(d.title) || (det.qa.length ? det.qa[0].q.substring(0, 20) : '未命名'), updated: nowMs(), turns: det.qa.length };
      if (rec) { for (i = 0; i < o.list.length; i++) { if (o.list[i] && o.list[i].id === d.id) { o.list[i] = nrec; break; } } }
      else {
        o.list.push(nrec);
        while (o.list.length > MAX_ITEMS) { /* FIFO顶最旧 */
          var old = o.list.shift();
          try { localStorage.removeItem(D_PREFIX + old.id); } catch (eR) {}
        }
      }
      writeIndex(o);
      return true;
    } catch (e) { return false; }
  }

  /* ---------- bigram覆盖率打分 ---------- */
  function grams(s) { var m = {}, i; for (i = 0; i < s.length - 1; i++) { m[s.substring(i, i + 2)] = 1; } return m; }
  function scoreOf(cangQ, q) {
    try {
      if (!cangQ || !q || q.length < 4) return 0;
      var g1 = grams(cangQ), g2 = grams(q), hit = 0, tot = 0, k;
      for (k in g2) { tot++; if (g1[k]) hit++; }
      return tot ? hit / tot : 0;
    } catch (e) { return 0; }
  }

  /* ---------- 查仓：返回{a,score,id,q}或null ---------- */
  function find(q) {
    if (isOff()) return null;
    try {
      q = clean(q);
      if (q.length < 4) return null;
      var o = readIndex(), best = null, i, j;
      for (i = 0; i < o.list.length; i++) {
        var det = readDetail(o.list[i].id);
        if (!det) continue;
        for (j = 0; j < det.qa.length; j++) {
          var sc = scoreOf(det.qa[j].q, q);
          if (sc >= HIT_LINE && (!best || sc > best.score)) {
            best = { a: det.qa[j].a, score: sc, id: det.id, q: det.qa[j].q };
          }
        }
      }
      return best;
    } catch (e) { return null; }
  }

  /* ---------- 问：先仓后AI，AI答按书格式存仓 ---------- */
  function ask(q, cb) {
    if (isOff()) { try { cb(false, '话仓已退休', ''); } catch (e) {} return; }
    try {
      var hit = find(q);
      if (hit) { try { cb(true, hit.a, 'cang'); } catch (e) {} return; }
      HX.chat.pump(PERSONA, q, {}, function (ok, txt, by) {
        try {
          if (ok && txt) {
            var id = 'hc' + nowMs();
            var det = { id: id, qa: [{ q: clean(q), a: clean(txt), t: nowMs() }] };
            writeDetail(det);
            var o = readIndex();
            o.list.push({ id: id, title: clean(q).substring(0, 20), updated: nowMs(), turns: 1 });
            while (o.list.length > MAX_ITEMS) { var old = o.list.shift(); try { localStorage.removeItem(D_PREFIX + old.id); } catch (eR) {} }
            writeIndex(o);
          }
        } catch (eS) {}
        try { cb(ok, txt, by); } catch (e2) {}
      });
    } catch (e) { try { cb(false, '话仓出错', ''); } catch (e2) {} }
  }

  /* ---------- 话题数数：返回{n,turns} ---------- */
  function count(topic) {
    if (isOff()) return { n: 0, turns: 0 };
    try {
      topic = clean(topic);
      if (!topic) { var o0 = readIndex(), t0 = 0, i0; for (i0 = 0; i0 < o0.list.length; i0++) t0 += o0.list[i0].turns || 0; return { n: o0.list.length, turns: t0 }; }
      var o = readIndex(), n = 0, turns = 0, i, j;
      for (i = 0; i < o.list.length; i++) {
        var det = readDetail(o.list[i].id);
        if (!det) continue;
        for (j = 0; j < det.qa.length; j++) {
          if (det.qa[j].q.indexOf(topic) >= 0 || det.qa[j].a.indexOf(topic) >= 0 || scoreOf(det.qa[j].q, topic) >= HIT_LINE) { n++; turns++; }
        }
      }
      return { n: n, turns: turns };
    } catch (e) { return { n: 0, turns: 0 }; }
  }

  function list() { if (isOff()) return []; try { return readIndex().list; } catch (e) { return []; } }
  function detail(id) { if (isOff()) return null; return readDetail(id); }
  function del(id) {
    if (isOff()) return;
    try {
      var o = readIndex(), out = [], i;
      for (i = 0; i < o.list.length; i++) { if (o.list[i] && o.list[i].id !== id) out.push(o.list[i]); }
      o.list = out;
      writeIndex(o);
      try { localStorage.removeItem(D_PREFIX + id); } catch (eR) {}
    } catch (e) {}
  }

  return { ingest: ingest, find: find, ask: ask, count: count, list: list, detail: detail, del: del, clean: clean, _writeDetail: writeDetail }; /* t125刀3b：暴露写详情口供chat🧹洗净全仓钮写回（SPEC_t125明列，本体一字未动） */
})();

/* t125刀5b：浮窗户口镜像进公共口HX.glow（户口归公共件，xiaotao保留现样改调公共口；不另起第二套浮窗，记忆97铁规）；hx_fuchuang_off=1不挂 */
try {
  if (lsGet('hx_fuchuang_off') !== '1') {
    HX.glow = HX.glow || {};
    if (!HX.glow.getSel) HX.glow.getSel = function () { try { var r = lsGet('xt_glow_pend'); if (!r) return ''; var o = JSON.parse(r); return (o && o.text) ? String(o.text) : ''; } catch (e) { return ''; } }; /* 终审扶正：不跨IIFE调lsGetJSON（经验区①），就地JSON.parse */
    if (!HX.glow.setSel) HX.glow.setSel = function (text, from) { try { lsSet('xt_glow_pend', JSON.stringify({ text: String(text || ''), from: String(from || '套装浮窗'), ts: Date.now() })); return true; } catch (e) { return false; } };
    if (!HX.glow.clear) HX.glow.clear = function () { try { localStorage.removeItem('xt_glow_pend'); return true; } catch (e) { return false; } };
  }
} catch (eGlow) {}


  HX.loadLoaderSnippet = [
    "/* hx-common.js 三级加载（照 guanjia-pdf-engine.js 已验证先例）：",
    "   ①壳readFile授权文件夹 → ②同目录fetch(8秒超时) → ③公开仓raw下载后写壳安装；",
    "   全挂也不崩溃：onHxReady/onHxMissing 两个回调里各走各路 */",
    "function hxCommonLoad(onHxReady, onHxMissing){",
    "  function runTxt(txt){ try{ var s=document.createElement('script'); s.textContent=txt; document.head.appendChild(s); }catch(e){} }",
    "  function ok(){ return !!(window.HX && window.HX.HX_COMMON_VERSION); }",
    "  function miss(){ try{ if(onHxMissing) onHxMissing(); }catch(e){} }",
    "  function good(){ try{ if(onHxReady) onHxReady(); }catch(e){} }",
    "  /* ①壳里先读授权文件夹（file://下fetch常被拦，readFile可靠） */",
    "  if(window.LearnShell){",
    "    var f=null; try{ f=LearnShell.readFile('hx-common.js'); }catch(e){}",
    "    if(f){ try{ runTxt(decodeURIComponent(escape(atob(String(f).replace(/\\s+/g,''))))); if(ok()){ good(); return; } }catch(e){} }",
    "  }",
    "  /* ②同目录fetch（壳内file://会挂起，装8秒超时） */",
    "  var _c=new AbortController(); var _t=setTimeout(function(){ _c.abort(); }, 8000);",
    "  fetch('hx-common.js?t='+Date.now(), {cache:'no-store', signal:_c.signal}).then(function(r){",
    "    if(!r.ok) throw new Error('HTTP '+r.status); return r.text();",
    "  }).then(function(txt){",
    "    clearTimeout(_t); runTxt(txt);",
    "    if(ok()){ good(); } else { hxCommonInstall(good, miss); } /* ③在线下载安装 */",
    "  }).catch(function(){ clearTimeout(_t); hxCommonInstall(good, miss); });",
    "}",
    "function hxCommonInstall(good, miss){",
    "  var _c=new AbortController(); var _t=setTimeout(function(){ _c.abort(); }, 30000);",
    "  fetch('https://hongxiaotao177.github.io/hx-common.js?t='+Date.now(), {cache:'no-store', signal:_c.signal}).then(function(r){",
    "    if(!r.ok) throw new Error('HTTP '+r.status); return r.text();",
    "  }).then(function(txt){",
    "    clearTimeout(_t);",
    "    try{ if(window.LearnShell && LearnShell.folderSet && LearnShell.folderSet()) LearnShell.writeFile('hx-common.js', btoa(unescape(encodeURIComponent(txt)))); }catch(e){}",
    "    try{ var s=document.createElement('script'); s.textContent=txt; document.head.appendChild(s); }catch(e){}",
    "    if(window.HX && window.HX.HX_COMMON_VERSION){ good(); } else { miss(); }",
    "  }).catch(function(){ clearTimeout(_t); miss(); });",
    "}"
  ].join('\n');

  /* ════ 8. 部件自升级 HX.selfUp（v0.3.0 2026-09-11 洪老师拍板彻底治"壳内部件不更新"病根） ════
     病根：三级加载器"壳里有就用"不查新旧，壳内旧版公共件用到天荒地老（AI面板事故真凶）。
     治法：开门闲时（约20秒）读云端 version-hx-common.json 比对 HX_COMMON_VERSION，
     旧了→静默下载新版js→写回壳授权文件夹 hx-common.js，下次开门自动用新的。
     全程静默不弹窗；没壳/没网/下载内容不像本体一律跳过不写，绝不影响任何功能（军规1）。 */
  HX.selfUp = function(manual){
    try{
      /* v0.13.1 洪老师2026-09-16拍板：查版本归管家一家——有管家的壳里本部件开门自查退休
         （管家每天闲时统一查全家+验暗号自动装），免两条路重复联网；没管家的老壳/浏览器才照旧自查 */
      try{ if(window.LearnShell && LearnShell.mgOn && LearnShell.mgOn()==='1' && LearnShell.folderSet && LearnShell.folderSet()) return; }catch(e){}
      if(!HX._autoNetOk(manual)) return; /* v0.8.0 开门静默令 */
      if(!window.LearnShell || !LearnShell.folderSet || !LearnShell.folderSet()) return; /* 浏览器里没处写，跳过 */
      setTimeout(function(){
        try{
          fetch('https://hongxiaotao177.github.io/version-hx-common.json?t='+Date.now(), {cache:'no-store'}).then(function(r){
            if(!r.ok) throw new Error('HTTP '+r.status); return r.json();
          }).then(function(j){
            try{
              if(!j || !j.version) return;
              if(HX.cmpVer(j.version, HX_COMMON_VERSION) <= 0) return; /* 已是最新 */
              fetch('https://hongxiaotao177.github.io/hx-common.js?t='+Date.now(), {cache:'no-store'}).then(function(r2){
                if(!r2.ok) throw new Error('HTTP '+r2.status); return r2.text();
              }).then(function(txt){
                try{
                  if(txt.indexOf('HX_COMMON_VERSION')<0) return; /* 下载内容不像本体，不写 */
                  try{ var _old=LearnShell.readFile('hx-common.js'); if(_old) LearnShell.writeFile('hx-common_v'+HX_COMMON_VERSION+'.js', _old); }catch(e){} /* 盖新前旧版留档（备份规矩） */
                  LearnShell.writeFile('hx-common.js', btoa(unescape(encodeURIComponent(txt))));
                  try{ if(window.console && console.info) console.info('[hx-common] 已自动升级到 v'+j.version+'（写进文件夹，下次开门生效）'); }catch(e){}
                }catch(e){}
              }).catch(function(){});
            }catch(e){}
          }).catch(function(){});
        }catch(e){}
      }, 20000);
    }catch(e){}
  };

  window.HX = HX;
  try{ HX.selfUp(); }catch(e){} /* v0.3.0：装完即排闲时自检自升级（内部全try，绝不出错） */
  try{ HX.keys.warm(); }catch(e){} /* v0.16.2 刀D：开门自动跑一次云端取回救援腿（本地有key不碰云端，内部全try静默） */
  /* v0.42.0（t65救火，洪老师真机四图「好像安装不成功」）：index真身侦察兵——
     病根：同vc内index装件写filesDir成功（桥字节对账过），但装完reload同URL(?v=60不变)
     →X5无视no-store给缓存旧页→页面跑旧码→v1.19.5刀2误判账本吹牛回滚→死循环（装多少轮都旧版）。
     治法：主界面开门探一次——实时fetch真身index.html（带时间戳=必中新URL拿不到缓存），
     取文件里最后一条CUR.index，比在跑页面CUR.index新=「装上了没给你看」→location.replace带新query破缓存跳一次；
     跳过去pageVer==fileVer自然停（主防线），sessionStorage标记防连跳（副防线）；
     只探主界面，副件页不探；全程try静默，fetch挂/读不到版本=不动作，绝不出错。 */
  HX.idxProbe=function(){
    try{
      var pp=""; try{ pp=String(location.pathname||""); }catch(eP){}
      if(pp && pp.indexOf("index.html")<0 && pp!=="/") return; /* 只探主界面 */
      if(!window.CUR || !CUR.index) return; /* 副件页没有CUR.index不探 */
      try{ if(sessionStorage.getItem("hx_idx_probe")==="1") return; }catch(eS){}
      var pageVer=String(CUR.index||"");
      if(!pageVer) return;
      var _c=null; try{ _c=new AbortController(); }catch(eA){}
      var _t=setTimeout(function(){ try{ if(_c) _c.abort(); }catch(e2){} }, 8000);
      fetch("index.html?probe="+Date.now(), {cache:"no-store", signal:(_c?_c.signal:undefined)}).then(function(r){
        if(!r.ok) throw new Error("HTTP "+r.status); return r.text();
      }).then(function(txt){
        clearTimeout(_t);
        var ms=txt.match(/(?:^|\n)CUR\.index="([\d.]+)";/g); /* v0.47.1 t76刀3：行首锚定——旧正则被注释里的CUR.index="1.19.6"骗住，fileVer永远1.19.6，侦察兵从没跳过 */
        if(!ms||!ms.length) return;
        var last=ms[ms.length-1];
        var m2=last.match(/"([\d.]+)"/);
        var fileVer=m2?String(m2[1]):"";
        if(!fileVer||fileVer===pageVer) return;
        if(!(HX.cmpVer(fileVer,pageVer)>0)) return; /* 文件不更新不跳 */
        try{ sessionStorage.setItem("hx_idx_probe","1"); }catch(eS2){}
        try{ HX.bb.log("act","index真身侦察兵：页面"+pageVer+"<文件"+fileVer+"，破缓存跳一次"); }catch(eB){}
        location.replace("index.html?v=probe"+Date.now());
      }).catch(function(){ clearTimeout(_t); });
    }catch(e){}
  };
  /* v0.52.0 t82踹门刀：hx-common单件发版破门，与idxProbe并行，直探公开仓在线小牌 */
  HX.probeHx=function(){
    try{
      var pp=""; try{ pp=String(location.pathname||""); }catch(eP){}
      if(pp && pp.indexOf("index.html")<0 && pp!=="/") return; /* 只探主界面，闸门照idxProbe */
      if(!window.CUR || !CUR.index) return; /* 副件页不探 */
      try{ if(sessionStorage.getItem("hx_idx_probe")==="1") return; }catch(eS){} /* 与index破门共用防连跳标记 */
      var pageVer=String(window.HX_COMMON_VERSION||"");
      if(!pageVer) return;
      var _c=null; try{ _c=new AbortController(); }catch(eA){}
      var _t=setTimeout(function(){ try{ if(_c) _c.abort(); }catch(e2){} }, 8000);
      fetch("https://hongxiaotao177.github.io/version-hx-common.json?probe="+Date.now(), {cache:"no-store", signal:(_c?_c.signal:undefined)}).then(function(r){
        if(!r.ok) throw new Error("HTTP "+r.status); return r.json();
      }).then(function(j){
        clearTimeout(_t);
        var fileVer=(j && j.ver)?String(j.ver):"";
        if(!fileVer||fileVer===pageVer) return;
        if(!(HX.cmpVer(fileVer,pageVer)>0)) return; /* 牌不更新不跳 */
        try{ sessionStorage.setItem("hx_idx_probe","1"); }catch(eS2){}
        try{ HX.bb.log("act","hxcommon踹门：在跑"+pageVer+"<仓牌"+fileVer+"，破缓存跳一次"); }catch(eB){}
        location.replace("index.html?v=hxr"+Date.now());
      }).catch(function(){ clearTimeout(_t); });
    }catch(e){}
  };
  try{ HX.idxProbe(); }catch(e){} /* v0.42.0：装完即探（内部全try，绝不出错） */
  try{ HX.probeHx(); }catch(e){} /* v0.52.0：与idxProbe并行，全try静默 */
  try{ if(window.console && console.info) console.info('[hx-common] v'+HX_COMMON_VERSION+' 已装（keys/gh/sj/selfCheck/bill/ai/store/relay/dav）'); }catch(e){}
})();

/* ===== HX.audit 自检审计模块（纯加法） ===== */
(function () {
  try {
    if (!window.HX) { window.HX = {}; }
    if (window.HX.audit) { return; }

    var DAY = 24 * 3600 * 1000;

    function safeGet(k) {
      try { return localStorage.getItem(k); } catch (e) { return null; }
    }
    function safeSet(k, v) {
      try { localStorage.setItem(k, v); } catch (e) {}
    }
    function safeParse(s) {
      try { return JSON.parse(s); } catch (e) { return null; }
    }
    function nowMs() { try { return Date.now(); } catch (e) { return 0; } }

    // 取黑匣子数组（安全）
    function bbTail(n) {
      try {
        if (window.HX && HX.bb && typeof HX.bb.tail === 'function') {
          var a = HX.bb.tail(n);
          if (Object.prototype.toString.call(a) === '[object Array]') { return a; }
        }
      } catch (e) {}
      return [];
    }

    // 从黑匣子里找最后一条满足条件的 t
    function lastFromBB(pred) {
      try {
        var arr = bbTail(500);
        for (var i = arr.length - 1; i >= 0; i--) {
          var it = arr[i];
          if (!it) { continue; }
          try {
            if (pred(it)) {
              var t = Number(it.t);
              if (isFinite(t) && t > 0) { return t; }
            }
          } catch (e2) {}
        }
      } catch (e) {}
      return 0;
    }

    // 从 localStorage JSON 数组取最后条 .t
    function lastFromLogArr(key) {
      try {
        var raw = safeGet(key);
        if (!raw) { return 0; }
        var arr = safeParse(raw);
        if (Object.prototype.toString.call(arr) !== '[object Array]') { return 0; }
        for (var i = arr.length - 1; i >= 0; i--) {
          var it = arr[i];
          if (!it) { continue; }
          var t = Number(it.t);
          if (isFinite(t) && t > 0) { return t; }
        }
      } catch (e) {}
      return 0;
    }

    function lastFromNum(key) {
      try {
        var raw = safeGet(key);
        if (raw === null || raw === undefined || raw === '') { return 0; }
        var t = Number(raw);
        if (isFinite(t) && t > 0) { return t; }
      } catch (e) {}
      return 0;
    }

    // 哨兵定义
    function getSentinels() {
      return [
        {
          key: 'jc',
          name: '监察员走查',
          desc: '闲时自动翻黑匣子找毛病',
          period: DAY,
          last: function () {
            return lastFromBB(function (it) {
              return it.k === 'job' && typeof it.m === 'string' && it.m.indexOf('jc走查') >= 0;
            });
          }
        },
        {
          key: 'auto',
          name: '自动真机检验',
          desc: '验收件机器能核的自己销号',
          period: 7 * DAY,
          last: function () { return lastFromLogArr('hx_chk_autolog'); }
        },
        {
          key: 'ai',
          name: 'AI质检岗',
          desc: '体验件AI先过目再销号',
          period: 7 * DAY,
          last: function () { return lastFromLogArr('hx_chk_ailog_up'); }
        },
        {
          key: 'sos',
          name: '📮会诊链',
          desc: '按📮把现场发给Kimi',
          period: 0,
          last: function () {
            return lastFromBB(function (it) {
              return typeof it.m === 'string' && it.m.indexOf('📮叫Kimi会诊') >= 0;
            });
          }
        },
        {
          key: 'verify',
          name: '装件防谎岗',
          desc: '装完读回真身对账',
          period: 7 * DAY,
          last: function () {
            return lastFromBB(function (it) {
              if (typeof it.m !== 'string') { return false; }
              return it.m.indexOf('对账过') >= 0 || it.m.indexOf('读回') >= 0;
            });
          }
        },
        {
          key: 'mg',
          name: '管家心跳',
          desc: '每天自动查新装件',
          period: 26 * 3600 * 1000,
          last: function () {
            var t = lastFromBB(function (it) { /* v0.44.0终审翻案：hb的身份在app（如'病人大管家'），m只是'黑匣子在线 vX'，查m永远查不到会误判死 */
              return it.k === 'hb' && typeof it.app === 'string' && it.app.indexOf('管家') >= 0;
            });
            if (t > 0) { return t; }
            return lastFromNum('hx_mg_hb');
          }
        },
        {
          key: 'zf',
          name: '账房链',
          desc: '云仓的账自动落到手机',
          period: 26 * 3600 * 1000,
          last: function () { return lastFromBB(function (it) { return it.k === 'zf'; }); } /* v0.54.0刀A1：zf真账在黑匣子k='zf'，hx_zf_checked是sessionStorage开门闸永远读不到（t88假报错根治） */
        }
  ,
        {
          key: 'mqtt',
          name: '传达室连线',
          desc: '手机与传达室的传话筒',
          period: 26 * 3600 * 1000,
          last: function () { return lastFromNum('hx_mqtt_ok_t'); } /* v0.51.0刀B：第8哨（t81/A7） */
        }
      ];
    }

    function pad2(n) { return n < 10 ? '0' + n : '' + n; }

    // 格式：10月19日 07:22（月日不补零，时分补零）
    function fmtTime(ms) {
      try {
        var d = new Date(ms);
        var M = d.getMonth() + 1;
        var D = d.getDate();
        var h = pad2(d.getHours());
        var m = pad2(d.getMinutes());
        return M + '月' + D + '日 ' + h + ':' + m;
      } catch (e) { return '未知时间'; }
    }

    function fmtHours(ms) {
      try {
        var h = ms / 3600000;
        if (h >= 24) {
          var d = h / 24;
          return (Math.round(d * 10) / 10) + '天';
        }
        return (Math.round(h * 10) / 10) + '小时';
      } catch (e) { return '?'; }
    }

    // 公开：list
    function list() {
      try {
        var defs = getSentinels();
        var out = [];
        for (var i = 0; i < defs.length; i++) {
          out.push({
            key: defs[i].key,
            name: defs[i].name,
            desc: defs[i].desc,
            period: defs[i].period
          });
        }
        return out;
      } catch (e) { return []; }
    }

    // 公开：audit
    function audit() {
      var res = { t: nowMs(), rows: [] };
      try {
        var defs = getSentinels();
        var now = nowMs();
        for (var i = 0; i < defs.length; i++) {
          var d = defs[i];
          var last = 0;
          try { last = Number(d.last()) || 0; } catch (e) { last = 0; }
          if (!isFinite(last) || last < 0) { last = 0; }

          var alive = 0;
          var note = '';

          if (d.period === 0) {
            alive = -1;
            if (last > 0) {
              note = '按需型，最后按于' + fmtTime(last);
            } else {
              note = '按需型，还没按过';
            }
          } else if (last === 0) {
            alive = 0;
            note = '从没见过它记账';
          } else {
            var gap = now - last;
            if (gap > 2 * d.period) {
              alive = 0;
              note = '超过' + fmtHours(gap) + '没动静，可能死了';
            } else {
              alive = 1;
              note = '好好的';
            }
          }

          res.rows.push({
            key: d.key,
            name: d.name,
            desc: d.desc,
            last: last,
            alive: alive,
            note: note
          });
        }
      } catch (e) {
        // 数据源异常不炸，返回已收集部分
      }
      return res;
    }

    // v0.45.0 t72：最近账单helper（DS实现，Kimi终审采用；REPORT段DS自作主张重写已弃用亲手改）
    function workline(key) {
      try {
        var i, arr, item, last, cnt, raw, t, n;
        if (key === 'jc') {
          arr = bbTail(500);
          last = null;
          for (i = arr.length - 1; i >= 0; i--) {
            item = arr[i];
            if (item && item.k === 'job' && typeof item.m === 'string' && item.m.indexOf('jc走查') >= 0) {
              last = item;
              break;
            }
          }
          if (!last) return '账单没查到';
          var s = fmtTime(last.t) + '走查了一轮';
          var stuck = null;
          for (i = arr.length - 1; i >= 0; i--) {
            item = arr[i];
            if (item && typeof item.m === 'string' && (item.m.indexOf('jc卡') >= 0 || item.m.indexOf('卡住') >= 0)) {
              stuck = item;
              break;
            }
          }
          if (stuck) s += '，卡在：' + stuck.m;
          else s += '，没卡住';
          return s;
        }
        if (key === 'verify') {
          arr = bbTail(500);
          last = null;
          for (i = arr.length - 1; i >= 0; i--) {
            item = arr[i];
            if (item && typeof item.m === 'string' && item.m.indexOf('对账过') >= 0) {
              last = item;
              break;
            }
          }
          if (!last) return '账单没查到';
          raw = last.m;
          if (raw.length > 60) raw = raw.substring(0, 60) + '…';
          return fmtTime(last.t) + '对账一次：' + raw;
        }
        if (key === 'sos') {
          arr = bbTail(500);
          cnt = 0;
          last = null;
          for (i = 0; i < arr.length; i++) {
            item = arr[i];
            if (item && typeof item.m === 'string' && item.m.indexOf('📮叫Kimi会诊') >= 0) {
              cnt++;
              last = item;
            }
          }
          if (cnt === 0) return '还没按过';
          return '按过' + cnt + '次，最后' + fmtTime(last.t);
        }
        if (key === 'mg') {
          arr = bbTail(500);
          last = null;
          for (i = arr.length - 1; i >= 0; i--) {
            item = arr[i];
            if (item && item.k === 'act' && typeof item.app === 'string' && item.app.indexOf('管家') >= 0) {
              last = item;
              break;
            }
          }
          if (!last) return '最近没见到管家干活账';
          raw = typeof last.m === 'string' ? last.m : '';
          if (raw.length > 60) raw = raw.substring(0, 60) + '…';
          return fmtTime(last.t) + ' ' + raw;
        }
        if (key === 'auto') {
          raw = safeGet('hx_chk_autolog');
          if (!raw) return '还没记过账';
          arr = JSON.parse(raw);
          if (!arr || typeof arr.length !== 'number' || arr.length === 0) return '还没记过账';
          last = arr[arr.length - 1];
          if (!last || typeof last.t !== 'number') return '还没记过账';
          return '账上记了' + arr.length + '笔，最近一笔' + fmtTime(last.t);
        }
        if (key === 'ai') {
          raw = safeGet('hx_chk_ailog_up');
          if (!raw) return '还没记过账';
          arr = JSON.parse(raw);
          if (!arr || typeof arr.length !== 'number' || arr.length === 0) return '还没记过账';
          last = arr[arr.length - 1];
          if (!last || typeof last.t !== 'number') return '还没记过账';
          return '账上记了' + arr.length + '笔，最近一笔' + fmtTime(last.t);
        }
        if (key === 'zf') { /* v0.54.0刀A2：改读黑匣子k='zf'末条（t88） */
          var zfArr = bbTail(500);
          var zfLast = null;
          for (var zi = zfArr.length - 1; zi >= 0; zi--) {
            var zfIt = zfArr[zi];
            if (zfIt && zfIt.k === 'zf') { zfLast = zfIt; break; }
          }
          if (!zfLast) return '还没记过账';
          return '最近' + fmtTime(zfLast.t) + '查过一次账';
        }
        return '账单没查到';
      } catch (e) {
        return '账单没查到';
      }
    }

    // v0.47.0 t75刀A1：抽主行+账单行逻辑，reportText改调它（输出逐字节不变）
    function rows2() {
      var out = [];
      try {
        var a = audit();
        var rows = a.rows || [];
        var good = 0, bad = 0;
        for (var i = 0; i < rows.length; i++) {
          var r = rows[i];
          var idx = i + 1;
          var line = '';
          if (r.alive === 1) {
            good++;
            line = idx + '.' + r.name + ' ✅活的，' + fmtTime(r.last) + '跑过';
          } else if (r.alive === 0) {
            bad++;
            line = idx + '.' + r.name + ' 🔴可疑：' + r.note;
          } else {
            line = idx + '.' + r.name + ' ➖按需型：' + (r.last > 0 ? ('最后按于' + fmtTime(r.last)) : '还没按过');
          }
          out.push({ key: r.key, line: line, bill: '　　账单：' + workline(r.key) });
        }
      } catch (e) {}
      return out;
    } /* t75刀A1 */

    // v0.47.0 t75刀A2：点行展开明细，最多5条最新在前，全本地零联网
    function detail(key) {
      try {
        var out = [];
        var i, arr, it, raw, t, s;
        if (key === 'jc') {
          arr = bbTail(500);
          for (i = arr.length - 1; i >= 0 && out.length < 5; i--) {
            it = arr[i];
            if (it && it.k === 'job' && typeof it.m === 'string' && it.m.indexOf('jc走查') >= 0) {
              out.push(fmtTime(it.t) + ' 走查了一轮');
            }
          }
          for (i = arr.length - 1; i >= 0; i--) {
            it = arr[i];
            if (it && typeof it.m === 'string' && (it.m.indexOf('jc卡') >= 0 || it.m.indexOf('卡住') >= 0)) {
              s = it.m.length > 60 ? it.m.substring(0, 60) : it.m;
              out.push('卡住过：' + fmtTime(it.t) + ' ' + s);
              break;
            }
          }
          if (out.length === 0) { return ['还没有明细账']; }
          return out;
        }
        if (key === 'verify') {
          arr = bbTail(500);
          for (i = arr.length - 1; i >= 0 && out.length < 5; i--) {
            it = arr[i];
            if (it && typeof it.m === 'string' && (it.m.indexOf('对账过') >= 0 || it.m.indexOf('读回') >= 0)) {
              s = it.m.length > 80 ? it.m.substring(0, 80) : it.m;
              out.push(fmtTime(it.t) + ' ' + s);
            }
          }
          if (out.length === 0) { return ['还没有明细账']; }
          return out;
        }
        if (key === 'sos') {
          arr = bbTail(500);
          for (i = arr.length - 1; i >= 0 && out.length < 5; i--) {
            it = arr[i];
            if (it && typeof it.m === 'string' && it.m.indexOf('📮叫Kimi会诊') >= 0) {
              out.push(fmtTime(it.t) + ' 按了一次会诊');
            }
          }
          if (out.length === 0) { return ['还没有明细账']; }
          return out;
        }
        if (key === 'mg') {
          arr = bbTail(500);
          for (i = arr.length - 1; i >= 0 && out.length < 5; i--) {
            it = arr[i];
            if (it && it.k === 'act' && typeof it.app === 'string' && it.app.indexOf('管家') >= 0) {
              s = typeof it.m === 'string' ? it.m : '';
              if (s.length > 80) { s = s.substring(0, 80); }
              out.push(fmtTime(it.t) + ' ' + s);
            }
          }
          if (out.length === 0) {
            for (i = arr.length - 1; i >= 0; i--) {
              it = arr[i];
              if (it && it.k === 'hb' && typeof it.app === 'string' && it.app.indexOf('管家') >= 0) {
                out.push(fmtTime(it.t) + ' 管家心跳在线');
                break;
              }
            }
          }
          if (out.length === 0) { return ['还没有明细账']; }
          return out;
        }
        if (key === 'auto') {
          raw = safeGet('hx_chk_autolog');
          if (!raw) { return ['还没有明细账']; }
          arr = safeParse(raw);
          if (Object.prototype.toString.call(arr) !== '[object Array]' || arr.length === 0) { return ['还没有明细账']; }
          for (i = arr.length - 1; i >= 0 && out.length < 5; i--) {
            it = arr[i];
            if (!it || it.t === undefined || it.tid === undefined || it.sid === undefined) { continue; }
            out.push(fmtTime(it.t) + ' 自动销号 ' + it.tid + '第' + String(it.sid).replace('s', '') + '步');
          }
          if (out.length === 0) { return ['还没有明细账']; }
          return out;
        }
        if (key === 'ai') {
          raw = safeGet('hx_chk_ailog');
          if (!raw) { return ['还没有明细账']; }
          arr = safeParse(raw);
          if (Object.prototype.toString.call(arr) !== '[object Array]' || arr.length === 0) { return ['还没有明细账']; }
          for (i = arr.length - 1; i >= 0 && out.length < 5; i--) {
            it = arr[i];
            if (!it || it.t === undefined || it.tid === undefined || it.sid === undefined) { continue; }
            s = String(it.say || '');
            if (s.length > 60) { s = s.substring(0, 60); }
            out.push(fmtTime(it.t) + ' ' + it.tid + '/' + it.sid + ' ' + it.verdict + '：' + s);
          }
          if (out.length === 0) { return ['还没有明细账']; }
          return out;
        }
        if (key === 'zf') { /* v0.54.0刀A3：改读黑匣子k='zf'最多5条最新在前（t88） */
          var zdArr = bbTail(500);
          var zdOut = [];
          for (var di = zdArr.length - 1; di >= 0 && zdOut.length < 5; di--) {
            var zdIt = zdArr[di];
            if (zdIt && zdIt.k === 'zf') zdOut.push(fmtTime(zdIt.t) + ' ' + String(zdIt.m || '').substring(0, 60));
          }
          if (zdOut.length > 0) return zdOut;
          return ['还没有明细账'];
        }
        if (key === 'mqtt') { /* v0.51.0刀C：传达室连线明细（t81/A7） */
          var okT = lastFromNum('hx_mqtt_ok_t');
          if (okT > 0) { out.push('最近一次连上：' + fmtTime(okT)); }
          var eRaw = safeGet('hx_mqtt_err');
          if (eRaw) { out.push('最近一次连不上：' + String(eRaw).substring(0, 80)); }
          try {
            if (window.HX && HX.mqtt && typeof HX.mqtt.status === 'function') {
              var mst = HX.mqtt.status();
              out.push('现在：' + (mst && mst.connected ? '连着' : '没连') + (mst && mst.lastErr ? '，错误码：' + String(mst.lastErr).substring(0, 60) : ''));
            }
          } catch (e3) {}
          if (out.length === 0) { return ['还没有明细账']; }
          return out;
        }
        return ['还没有明细账'];
      } catch (e) {
        return [];
      }
    } /* t75刀A2 */

    // 公开：reportText
    function reportText() {
      try {
        if (safeGet('hx_audit_off') === '1') {
          return '自检审计已关（hx_audit_off）';
        }
      } catch (e) {}

      try {
        var a = audit();
        var now = a.t || nowMs();
        var d = new Date(now);
        var head = '🩺 自检报告（' + (d.getMonth() + 1) + '月' + d.getDate() + '日 ' +
          pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + '）';

        var lines = [head];
        var good = 0, bad = 0;
        var rows = a.rows || [];
        for (var i = 0; i < rows.length; i++) {
          var r = rows[i];
          if (r.alive === 1) { good++; } else if (r.alive === 0) { bad++; }
        }
        var rr = rows2();
        for (var j = 0; j < rr.length; j++) {
          lines.push(rr[j].line);
          lines.push(rr[j].bill);
        }
        lines.push('——共' + rows.length + '个哨兵，' + good + '个好' + bad + '个可疑。不想让哪个跑，跟Kimi说一声就关。');
        return lines.join('\n');
      } catch (e) {
        return '🩺 自检报告生成失败：' + (e && e.message ? e.message : '未知错误');
      }
    } /* t75刀A1 */

    window.HX.audit = {
      list: list,
      audit: audit,
      reportText: reportText,
      rows2: rows2,
      detail: detail
    }; /* t75刀A3 */
  } catch (e) {
    // 静默
  }
})();


/* ===== HX.wzPoll 问诊室回话轮询模块（纯加法） ===== */
(function () {
  try {
    if (!window.HX) { window.HX = {}; }
    if (window.HX.wzPoll) { return; }

    var URL_BASE = 'https://hongxiaotao177.github.io/问诊室_out.json';
    var SEEN_KEY = 'hx_wz_out_seen';
    var layerEl = null;

    function safeGet(k) {
      try { return localStorage.getItem(k); } catch (e) { return null; }
    }
    function safeSet(k, v) {
      try { localStorage.setItem(k, v); } catch (e) {}
    }

    // 8秒超时 fetch
    function fetchWithTimeout(url, ms) {
      return new Promise(function (resolve, reject) {
        var done = false;
        var timer = setTimeout(function () {
          if (done) { return; }
          done = true;
          reject(new Error('timeout'));
        }, ms);
        try {
          fetch(url, { method: 'GET', cache: 'no-store' }).then(function (r) {
            if (done) { return; }
            done = true;
            clearTimeout(timer);
            resolve(r);
          }, function (err) {
            if (done) { return; }
            done = true;
            clearTimeout(timer);
            reject(err);
          });
        } catch (e) {
          if (!done) {
            done = true;
            clearTimeout(timer);
            reject(e);
          }
        }
      });
    }

    function closeLayer() {
      try {
        if (layerEl && layerEl.parentNode) {
          layerEl.parentNode.removeChild(layerEl);
        }
      } catch (e) {}
      layerEl = null;
    }

    function showLayer(answer, tVal) {
      try {
        closeLayer();
        var wrap = document.createElement('div');
        wrap.style.cssText = 'position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;';

        var card = document.createElement('div');
        card.style.cssText = 'position:relative;background:#fff;color:#222;border-radius:10px;max-width:560px;width:100%;max-height:80vh;padding:16px 16px 12px;box-sizing:border-box;box-shadow:0 8px 30px rgba(0,0,0,0.35);display:flex;flex-direction:column;';

        var title = document.createElement('div');
        title.textContent = '📬 Kimi回话';
        title.style.cssText = 'font-size:16px;font-weight:bold;margin-bottom:10px;padding-right:28px;';

        var closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.style.cssText = 'position:absolute;right:8px;top:8px;width:28px;height:28px;border:none;background:transparent;font-size:18px;line-height:1;cursor:pointer;color:#666;';
        closeBtn.onclick = function () {
          try {
            if (tVal) { safeSet(SEEN_KEY, String(tVal)); }
          } catch (e) {}
          closeLayer();
        };

        var ta = document.createElement('textarea');
        ta.readOnly = true;
        ta.value = answer;
        ta.style.cssText = 'width:100%;min-height:200px;max-height:60vh;box-sizing:border-box;font-size:13px;line-height:1.5;padding:8px;border:1px solid #ddd;border-radius:6px;resize:vertical;font-family:inherit;';

        card.appendChild(title);
        card.appendChild(closeBtn);
        card.appendChild(ta);
        wrap.appendChild(card);
        document.body.appendChild(wrap);
        layerEl = wrap;
      } catch (e) {
        // 静默
      }
    }

    function check() {
      try {
        var url = URL_BASE + '?t=' + Date.now();
        fetchWithTimeout(url, 8000).then(function (r) {
          if (!r || !r.ok) { return; }
          return r.json().then(function (j) {
            try {
              if (!j) { return; }
              var tVal = Number(j.t);
              if (!isFinite(tVal) || tVal <= 0) { return; }
              var seen = Number(safeGet(SEEN_KEY) || 0);
              if (!isFinite(seen)) { seen = 0; }
              if (tVal <= seen) { return; }
              var ans = j.answer;
              if (ans === null || ans === undefined || ans === '') { return; }
              showLayer(String(ans), tVal);
            } catch (e) {}
          });
        }).catch(function () {
          // 静默
        });
      } catch (e) {
        // 静默
      }
    }

    window.HX.wzPoll = {
      check: check
    };

    // 90秒后起跑，且 document 加载完成再起
    function schedule() {
      try {
        setTimeout(function () {
          try {
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
              check();
            } else {
              document.addEventListener('DOMContentLoaded', function () {
                try { check(); } catch (e) {}
              });
            }
          } catch (e) {}
        }, 90000);
      } catch (e) {}
    }
    schedule();
  } catch (e) {
    // 静默
  }
})();

/* ===== v0.46.0 t73 手机账房刀B段1：paho-mqtt-min v1.1.0自包含（32236B，jsdelivr取，禁止外链） ===== */
/*******************************************************************************
 * Copyright (c) 2013, 2016 IBM Corp.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and Eclipse Distribution License v1.0 which accompany this distribution.
 *
 * The Eclipse Public License is available at
 *    http://www.eclipse.org/legal/epl-v10.html
 * and the Eclipse Distribution License is available at
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 *******************************************************************************/
(function(t,q){"object"===typeof exports&&"object"===typeof module?module.exports=q():"function"===typeof define&&define.amd?define(q):"object"===typeof exports?exports=q():t.Paho=q()})(this,function(){return function(t){function q(a,b,c){b[c++]=a>>8;b[c++]=a%256;return c}function r(a,b,c,k){k=q(b,c,k);E(a,c,k);return k+b}function n(a){for(var b=0,c=0;c<a.length;c++){var k=a.charCodeAt(c);2047<k?(55296<=k&&56319>=k&&(c++,b++),b+=3):127<k?b+=2:b++}return b}function E(a,b,c){for(var k=0;k<a.length;k++){var e=
    a.charCodeAt(k);if(55296<=e&&56319>=e){var g=a.charCodeAt(++k);if(isNaN(g))throw Error(f(h.MALFORMED_UNICODE,[e,g]));e=(e-55296<<10)+(g-56320)+65536}127>=e?b[c++]=e:(2047>=e?b[c++]=e>>6&31|192:(65535>=e?b[c++]=e>>12&15|224:(b[c++]=e>>18&7|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function F(a,b,c){for(var k="",e,g=b;g<b+c;){e=a[g++];if(!(128>e)){var m=a[g++]-128;if(0>m)throw Error(f(h.MALFORMED_UTF,[e.toString(16),m.toString(16),""]));if(224>e)e=64*(e-192)+m;else{var d=
    a[g++]-128;if(0>d)throw Error(f(h.MALFORMED_UTF,[e.toString(16),m.toString(16),d.toString(16)]));if(240>e)e=4096*(e-224)+64*m+d;else{var l=a[g++]-128;if(0>l)throw Error(f(h.MALFORMED_UTF,[e.toString(16),m.toString(16),d.toString(16),l.toString(16)]));if(248>e)e=262144*(e-240)+4096*m+64*d+l;else throw Error(f(h.MALFORMED_UTF,[e.toString(16),m.toString(16),d.toString(16),l.toString(16)]));}}}65535<e&&(e-=65536,k+=String.fromCharCode(55296+(e>>10)),e=56320+(e&1023));k+=String.fromCharCode(e)}return k}
    var s=t.localStorage||function(){var a={};return{setItem:function(b,c){a[b]=c},getItem:function(b){return a[b]},removeItem:function(b){delete a[b]}}}(),A=function(a,b){for(var c in a)if(a.hasOwnProperty(c))if(b.hasOwnProperty(c)){if(typeof a[c]!==b[c])throw Error(f(h.INVALID_TYPE,[typeof a[c],c]));}else{c="Unknown property, "+c+". Valid properties are:";for(var k in b)b.hasOwnProperty(k)&&(c=c+" "+k);throw Error(c);}},u=function(a,b){return function(){return a.apply(b,arguments)}},h={OK:{code:0,text:"AMQJSC0000I OK."},
    CONNECT_TIMEOUT:{code:1,text:"AMQJSC0001E Connect timed out."},SUBSCRIBE_TIMEOUT:{code:2,text:"AMQJS0002E Subscribe timed out."},UNSUBSCRIBE_TIMEOUT:{code:3,text:"AMQJS0003E Unsubscribe timed out."},PING_TIMEOUT:{code:4,text:"AMQJS0004E Ping timed out."},INTERNAL_ERROR:{code:5,text:"AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}"},CONNACK_RETURNCODE:{code:6,text:"AMQJS0006E Bad Connack return code:{0} {1}."},SOCKET_ERROR:{code:7,text:"AMQJS0007E Socket error:{0}."},SOCKET_CLOSE:{code:8,
    text:"AMQJS0008I Socket closed."},MALFORMED_UTF:{code:9,text:"AMQJS0009E Malformed UTF data:{0} {1} {2}."},UNSUPPORTED:{code:10,text:"AMQJS0010E {0} is not supported by this browser."},INVALID_STATE:{code:11,text:"AMQJS0011E Invalid state {0}."},INVALID_TYPE:{code:12,text:"AMQJS0012E Invalid type {0} for {1}."},INVALID_ARGUMENT:{code:13,text:"AMQJS0013E Invalid argument {0} for {1}."},UNSUPPORTED_OPERATION:{code:14,text:"AMQJS0014E Unsupported operation."},INVALID_STORED_DATA:{code:15,text:"AMQJS0015E Invalid data in local storage key\x3d{0} value\x3d{1}."},
    INVALID_MQTT_MESSAGE_TYPE:{code:16,text:"AMQJS0016E Invalid MQTT message type {0}."},MALFORMED_UNICODE:{code:17,text:"AMQJS0017E Malformed Unicode string:{0} {1}."},BUFFER_FULL:{code:18,text:"AMQJS0018E Message buffer is full, maximum buffer size: {0}."}},H={0:"Connection Accepted",1:"Connection Refused: unacceptable protocol version",2:"Connection Refused: identifier rejected",3:"Connection Refused: server unavailable",4:"Connection Refused: bad user name or password",5:"Connection Refused: not authorized"},
    f=function(a,b){var c=a.text;if(b)for(var k,e,g=0;g<b.length;g++)if(k="{"+g+"}",e=c.indexOf(k),0<e)var h=c.substring(0,e),c=c.substring(e+k.length),c=h+b[g]+c;return c},B=[0,6,77,81,73,115,100,112,3],C=[0,4,77,81,84,84,4],p=function(a,b){this.type=a;for(var c in b)b.hasOwnProperty(c)&&(this[c]=b[c])};p.prototype.encode=function(){var a=(this.type&15)<<4,b=0,c=[],k=0,e;void 0!==this.messageIdentifier&&(b+=2);switch(this.type){case 1:switch(this.mqttVersion){case 3:b+=B.length+3;break;case 4:b+=C.length+
    3}b+=n(this.clientId)+2;void 0!==this.willMessage&&(b+=n(this.willMessage.destinationName)+2,e=this.willMessage.payloadBytes,e instanceof Uint8Array||(e=new Uint8Array(h)),b+=e.byteLength+2);void 0!==this.userName&&(b+=n(this.userName)+2);void 0!==this.password&&(b+=n(this.password)+2);break;case 8:for(var a=a|2,g=0;g<this.topics.length;g++)c[g]=n(this.topics[g]),b+=c[g]+2;b+=this.requestedQos.length;break;case 10:a|=2;for(g=0;g<this.topics.length;g++)c[g]=n(this.topics[g]),b+=c[g]+2;break;case 6:a|=
    2;break;case 3:this.payloadMessage.duplicate&&(a|=8);a=a|=this.payloadMessage.qos<<1;this.payloadMessage.retained&&(a|=1);var k=n(this.payloadMessage.destinationName),h=this.payloadMessage.payloadBytes,b=b+(k+2)+h.byteLength;h instanceof ArrayBuffer?h=new Uint8Array(h):h instanceof Uint8Array||(h=new Uint8Array(h.buffer))}var f=b,g=Array(1),d=0;do{var z=f%128,f=f>>7;0<f&&(z|=128);g[d++]=z}while(0<f&&4>d);f=g.length+1;b=new ArrayBuffer(b+f);d=new Uint8Array(b);d[0]=a;d.set(g,1);if(3==this.type)f=r(this.payloadMessage.destinationName,
    k,d,f);else if(1==this.type){switch(this.mqttVersion){case 3:d.set(B,f);f+=B.length;break;case 4:d.set(C,f),f+=C.length}a=0;this.cleanSession&&(a=2);void 0!==this.willMessage&&(a=a|4|this.willMessage.qos<<3,this.willMessage.retained&&(a|=32));void 0!==this.userName&&(a|=128);void 0!==this.password&&(a|=64);d[f++]=a;f=q(this.keepAliveInterval,d,f)}void 0!==this.messageIdentifier&&(f=q(this.messageIdentifier,d,f));switch(this.type){case 1:f=r(this.clientId,n(this.clientId),d,f);void 0!==this.willMessage&&
    (f=r(this.willMessage.destinationName,n(this.willMessage.destinationName),d,f),f=q(e.byteLength,d,f),d.set(e,f),f+=e.byteLength);void 0!==this.userName&&(f=r(this.userName,n(this.userName),d,f));void 0!==this.password&&r(this.password,n(this.password),d,f);break;case 3:d.set(h,f);break;case 8:for(g=0;g<this.topics.length;g++)f=r(this.topics[g],c[g],d,f),d[f++]=this.requestedQos[g];break;case 10:for(g=0;g<this.topics.length;g++)f=r(this.topics[g],c[g],d,f)}return b};var G=function(a,b){this._client=
    a;this._keepAliveInterval=1E3*b;this.isReset=!1;var c=(new p(12)).encode(),k=function(a){return function(){return e.apply(a)}},e=function(){this.isReset?(this.isReset=!1,this._client._trace("Pinger.doPing","send PINGREQ"),this._client.socket.send(c),this.timeout=setTimeout(k(this),this._keepAliveInterval)):(this._client._trace("Pinger.doPing","Timed out"),this._client._disconnected(h.PING_TIMEOUT.code,f(h.PING_TIMEOUT)))};this.reset=function(){this.isReset=!0;clearTimeout(this.timeout);0<this._keepAliveInterval&&
    (this.timeout=setTimeout(k(this),this._keepAliveInterval))};this.cancel=function(){clearTimeout(this.timeout)}},v=function(a,b,c,f){b||(b=30);this.timeout=setTimeout(function(a,b,c){return function(){return a.apply(b,c)}}(c,a,f),1E3*b);this.cancel=function(){clearTimeout(this.timeout)}},d=function(a,b,c,d,e){if(!("WebSocket"in t&&null!==t.WebSocket))throw Error(f(h.UNSUPPORTED,["WebSocket"]));if(!("ArrayBuffer"in t&&null!==t.ArrayBuffer))throw Error(f(h.UNSUPPORTED,["ArrayBuffer"]));this._trace("Paho.Client",
    a,b,c,d,e);this.host=b;this.port=c;this.path=d;this.uri=a;this.clientId=e;this._wsuri=null;this._localKey=b+":"+c+("/mqtt"!=d?":"+d:"")+":"+e+":";this._msg_queue=[];this._buffered_msg_queue=[];this._sentMessages={};this._receivedMessages={};this._notify_msg_sent={};this._message_identifier=1;this._sequence=0;for(var g in s)0!==g.indexOf("Sent:"+this._localKey)&&0!==g.indexOf("Received:"+this._localKey)||this.restore(g)};d.prototype.host=null;d.prototype.port=null;d.prototype.path=null;d.prototype.uri=
    null;d.prototype.clientId=null;d.prototype.socket=null;d.prototype.connected=!1;d.prototype.maxMessageIdentifier=65536;d.prototype.connectOptions=null;d.prototype.hostIndex=null;d.prototype.onConnected=null;d.prototype.onConnectionLost=null;d.prototype.onMessageDelivered=null;d.prototype.onMessageArrived=null;d.prototype.traceFunction=null;d.prototype._msg_queue=null;d.prototype._buffered_msg_queue=null;d.prototype._connectTimeout=null;d.prototype.sendPinger=null;d.prototype.receivePinger=null;d.prototype._reconnectInterval=
    1;d.prototype._reconnecting=!1;d.prototype._reconnectTimeout=null;d.prototype.disconnectedPublishing=!1;d.prototype.disconnectedBufferSize=5E3;d.prototype.receiveBuffer=null;d.prototype._traceBuffer=null;d.prototype._MAX_TRACE_ENTRIES=100;d.prototype.connect=function(a){var b=this._traceMask(a,"password");this._trace("Client.connect",b,this.socket,this.connected);if(this.connected)throw Error(f(h.INVALID_STATE,["already connected"]));if(this.socket)throw Error(f(h.INVALID_STATE,["already connected"]));
    this._reconnecting&&(this._reconnectTimeout.cancel(),this._reconnectTimeout=null,this._reconnecting=!1);this.connectOptions=a;this._reconnectInterval=1;this._reconnecting=!1;a.uris?(this.hostIndex=0,this._doConnect(a.uris[0])):this._doConnect(this.uri)};d.prototype.subscribe=function(a,b){this._trace("Client.subscribe",a,b);if(!this.connected)throw Error(f(h.INVALID_STATE,["not connected"]));var c=new p(8);c.topics=a.constructor===Array?a:[a];void 0===b.qos&&(b.qos=0);c.requestedQos=[];for(var d=
    0;d<c.topics.length;d++)c.requestedQos[d]=b.qos;b.onSuccess&&(c.onSuccess=function(a){b.onSuccess({invocationContext:b.invocationContext,grantedQos:a})});b.onFailure&&(c.onFailure=function(a){b.onFailure({invocationContext:b.invocationContext,errorCode:a,errorMessage:f(a)})});b.timeout&&(c.timeOut=new v(this,b.timeout,b.onFailure,[{invocationContext:b.invocationContext,errorCode:h.SUBSCRIBE_TIMEOUT.code,errorMessage:f(h.SUBSCRIBE_TIMEOUT)}]));this._requires_ack(c);this._schedule_message(c)};d.prototype.unsubscribe=
    function(a,b){this._trace("Client.unsubscribe",a,b);if(!this.connected)throw Error(f(h.INVALID_STATE,["not connected"]));var c=new p(10);c.topics=a.constructor===Array?a:[a];b.onSuccess&&(c.callback=function(){b.onSuccess({invocationContext:b.invocationContext})});b.timeout&&(c.timeOut=new v(this,b.timeout,b.onFailure,[{invocationContext:b.invocationContext,errorCode:h.UNSUBSCRIBE_TIMEOUT.code,errorMessage:f(h.UNSUBSCRIBE_TIMEOUT)}]));this._requires_ack(c);this._schedule_message(c)};d.prototype.send=
    function(a){this._trace("Client.send",a);var b=new p(3);b.payloadMessage=a;if(this.connected)0<a.qos?this._requires_ack(b):this.onMessageDelivered&&(this._notify_msg_sent[b]=this.onMessageDelivered(b.payloadMessage)),this._schedule_message(b);else if(this._reconnecting&&this.disconnectedPublishing){if(Object.keys(this._sentMessages).length+this._buffered_msg_queue.length>this.disconnectedBufferSize)throw Error(f(h.BUFFER_FULL,[this.disconnectedBufferSize]));0<a.qos?this._requires_ack(b):(b.sequence=
    ++this._sequence,this._buffered_msg_queue.unshift(b))}else throw Error(f(h.INVALID_STATE,["not connected"]));};d.prototype.disconnect=function(){this._trace("Client.disconnect");this._reconnecting&&(this._reconnectTimeout.cancel(),this._reconnectTimeout=null,this._reconnecting=!1);if(!this.socket)throw Error(f(h.INVALID_STATE,["not connecting or connected"]));var a=new p(14);this._notify_msg_sent[a]=u(this._disconnected,this);this._schedule_message(a)};d.prototype.getTraceLog=function(){if(null!==
    this._traceBuffer){this._trace("Client.getTraceLog",new Date);this._trace("Client.getTraceLog in flight messages",this._sentMessages.length);for(var a in this._sentMessages)this._trace("_sentMessages ",a,this._sentMessages[a]);for(a in this._receivedMessages)this._trace("_receivedMessages ",a,this._receivedMessages[a]);return this._traceBuffer}};d.prototype.startTrace=function(){null===this._traceBuffer&&(this._traceBuffer=[]);this._trace("Client.startTrace",new Date,"1.1.0-2018-11-22T11:35:36Z")};d.prototype.stopTrace=
    function(){delete this._traceBuffer};d.prototype._doConnect=function(a){this.connectOptions.useSSL&&(a=a.split(":"),a[0]="wss",a=a.join(":"));this._wsuri=a;this.connected=!1;this.socket=4>this.connectOptions.mqttVersion?new WebSocket(a,["mqttv3.1"]):new WebSocket(a,["mqtt"]);this.socket.binaryType="arraybuffer";this.socket.onopen=u(this._on_socket_open,this);this.socket.onmessage=u(this._on_socket_message,this);this.socket.onerror=u(this._on_socket_error,this);this.socket.onclose=u(this._on_socket_close,
    this);this.sendPinger=new G(this,this.connectOptions.keepAliveInterval);this.receivePinger=new G(this,this.connectOptions.keepAliveInterval);this._connectTimeout&&(this._connectTimeout.cancel(),this._connectTimeout=null);this._connectTimeout=new v(this,this.connectOptions.timeout,this._disconnected,[h.CONNECT_TIMEOUT.code,f(h.CONNECT_TIMEOUT)])};d.prototype._schedule_message=function(a){this._msg_queue.unshift(a);this.connected&&this._process_queue()};d.prototype.store=function(a,b){var c={type:b.type,
    messageIdentifier:b.messageIdentifier,version:1};switch(b.type){case 3:b.pubRecReceived&&(c.pubRecReceived=!0);c.payloadMessage={};for(var d="",e=b.payloadMessage.payloadBytes,g=0;g<e.length;g++)d=15>=e[g]?d+"0"+e[g].toString(16):d+e[g].toString(16);c.payloadMessage.payloadHex=d;c.payloadMessage.qos=b.payloadMessage.qos;c.payloadMessage.destinationName=b.payloadMessage.destinationName;b.payloadMessage.duplicate&&(c.payloadMessage.duplicate=!0);b.payloadMessage.retained&&(c.payloadMessage.retained=
    !0);0===a.indexOf("Sent:")&&(void 0===b.sequence&&(b.sequence=++this._sequence),c.sequence=b.sequence);break;default:throw Error(f(h.INVALID_STORED_DATA,[a+this._localKey+b.messageIdentifier,c]));}s.setItem(a+this._localKey+b.messageIdentifier,JSON.stringify(c))};d.prototype.restore=function(a){var b=s.getItem(a),c=JSON.parse(b),d=new p(c.type,c);switch(c.type){case 3:for(var b=c.payloadMessage.payloadHex,e=new ArrayBuffer(b.length/2),e=new Uint8Array(e),g=0;2<=b.length;){var m=parseInt(b.substring(0,
    2),16),b=b.substring(2,b.length);e[g++]=m}b=new w(e);b.qos=c.payloadMessage.qos;b.destinationName=c.payloadMessage.destinationName;c.payloadMessage.duplicate&&(b.duplicate=!0);c.payloadMessage.retained&&(b.retained=!0);d.payloadMessage=b;break;default:throw Error(f(h.INVALID_STORED_DATA,[a,b]));}0===a.indexOf("Sent:"+this._localKey)?(d.payloadMessage.duplicate=!0,this._sentMessages[d.messageIdentifier]=d):0===a.indexOf("Received:"+this._localKey)&&(this._receivedMessages[d.messageIdentifier]=d)};
    d.prototype._process_queue=function(){for(var a=null;a=this._msg_queue.pop();)this._socket_send(a),this._notify_msg_sent[a]&&(this._notify_msg_sent[a](),delete this._notify_msg_sent[a])};d.prototype._requires_ack=function(a){var b=Object.keys(this._sentMessages).length;if(b>this.maxMessageIdentifier)throw Error("Too many messages:"+b);for(;void 0!==this._sentMessages[this._message_identifier];)this._message_identifier++;a.messageIdentifier=this._message_identifier;this._sentMessages[a.messageIdentifier]=
    a;3===a.type&&this.store("Sent:",a);this._message_identifier===this.maxMessageIdentifier&&(this._message_identifier=1)};d.prototype._on_socket_open=function(){var a=new p(1,this.connectOptions);a.clientId=this.clientId;this._socket_send(a)};d.prototype._on_socket_message=function(a){this._trace("Client._on_socket_message",a.data);a=this._deframeMessages(a.data);for(var b=0;b<a.length;b+=1)this._handleMessage(a[b])};d.prototype._deframeMessages=function(a){a=new Uint8Array(a);var b=[];if(this.receiveBuffer){var c=
    new Uint8Array(this.receiveBuffer.length+a.length);c.set(this.receiveBuffer);c.set(a,this.receiveBuffer.length);a=c;delete this.receiveBuffer}try{for(c=0;c<a.length;){var d;a:{var e=a,g=c,m=g,n=e[g],l=n>>4,z=n&15,g=g+1,x=void 0,D=0,q=1;do{if(g==e.length){d=[null,m];break a}x=e[g++];D+=(x&127)*q;q*=128}while(0!==(x&128));x=g+D;if(x>e.length)d=[null,m];else{var y=new p(l);switch(l){case 2:e[g++]&1&&(y.sessionPresent=!0);y.returnCode=e[g++];break;case 3:var m=z>>1&3,s=256*e[g]+e[g+1],g=g+2,t=F(e,g,s),
    g=g+s;0<m&&(y.messageIdentifier=256*e[g]+e[g+1],g+=2);var r=new w(e.subarray(g,x));1==(z&1)&&(r.retained=!0);8==(z&8)&&(r.duplicate=!0);r.qos=m;r.destinationName=t;y.payloadMessage=r;break;case 4:case 5:case 6:case 7:case 11:y.messageIdentifier=256*e[g]+e[g+1];break;case 9:y.messageIdentifier=256*e[g]+e[g+1],g+=2,y.returnCode=e.subarray(g,x)}d=[y,x]}}var u=d[0],c=d[1];if(null!==u)b.push(u);else break}c<a.length&&(this.receiveBuffer=a.subarray(c))}catch(v){d="undefined"==v.hasOwnProperty("stack")?
    v.stack.toString():"No Error Stack Available";this._disconnected(h.INTERNAL_ERROR.code,f(h.INTERNAL_ERROR,[v.message,d]));return}return b};d.prototype._handleMessage=function(a){this._trace("Client._handleMessage",a);try{switch(a.type){case 2:this._connectTimeout.cancel();this._reconnectTimeout&&this._reconnectTimeout.cancel();if(this.connectOptions.cleanSession){for(var b in this._sentMessages){var c=this._sentMessages[b];s.removeItem("Sent:"+this._localKey+c.messageIdentifier)}this._sentMessages=
    {};for(b in this._receivedMessages){var d=this._receivedMessages[b];s.removeItem("Received:"+this._localKey+d.messageIdentifier)}this._receivedMessages={}}if(0===a.returnCode)this.connected=!0,this.connectOptions.uris&&(this.hostIndex=this.connectOptions.uris.length);else{this._disconnected(h.CONNACK_RETURNCODE.code,f(h.CONNACK_RETURNCODE,[a.returnCode,H[a.returnCode]]));break}a=[];for(var e in this._sentMessages)this._sentMessages.hasOwnProperty(e)&&a.push(this._sentMessages[e]);if(0<this._buffered_msg_queue.length)for(e=
    null;e=this._buffered_msg_queue.pop();)a.push(e),this.onMessageDelivered&&(this._notify_msg_sent[e]=this.onMessageDelivered(e.payloadMessage));a=a.sort(function(a,b){return a.sequence-b.sequence});e=0;for(var g=a.length;e<g;e++)if(c=a[e],3==c.type&&c.pubRecReceived){var m=new p(6,{messageIdentifier:c.messageIdentifier});this._schedule_message(m)}else this._schedule_message(c);if(this.connectOptions.onSuccess)this.connectOptions.onSuccess({invocationContext:this.connectOptions.invocationContext});
    c=!1;this._reconnecting&&(c=!0,this._reconnectInterval=1,this._reconnecting=!1);this._connected(c,this._wsuri);this._process_queue();break;case 3:this._receivePublish(a);break;case 4:if(c=this._sentMessages[a.messageIdentifier])if(delete this._sentMessages[a.messageIdentifier],s.removeItem("Sent:"+this._localKey+a.messageIdentifier),this.onMessageDelivered)this.onMessageDelivered(c.payloadMessage);break;case 5:if(c=this._sentMessages[a.messageIdentifier])c.pubRecReceived=!0,m=new p(6,{messageIdentifier:a.messageIdentifier}),
    this.store("Sent:",c),this._schedule_message(m);break;case 6:d=this._receivedMessages[a.messageIdentifier];s.removeItem("Received:"+this._localKey+a.messageIdentifier);d&&(this._receiveMessage(d),delete this._receivedMessages[a.messageIdentifier]);var n=new p(7,{messageIdentifier:a.messageIdentifier});this._schedule_message(n);break;case 7:c=this._sentMessages[a.messageIdentifier];delete this._sentMessages[a.messageIdentifier];s.removeItem("Sent:"+this._localKey+a.messageIdentifier);if(this.onMessageDelivered)this.onMessageDelivered(c.payloadMessage);
    break;case 9:if(c=this._sentMessages[a.messageIdentifier]){c.timeOut&&c.timeOut.cancel();if(128===a.returnCode[0]){if(c.onFailure)c.onFailure(a.returnCode)}else if(c.onSuccess)c.onSuccess(a.returnCode);delete this._sentMessages[a.messageIdentifier]}break;case 11:if(c=this._sentMessages[a.messageIdentifier])c.timeOut&&c.timeOut.cancel(),c.callback&&c.callback(),delete this._sentMessages[a.messageIdentifier];break;case 13:this.sendPinger.reset();break;case 14:this._disconnected(h.INVALID_MQTT_MESSAGE_TYPE.code,
    f(h.INVALID_MQTT_MESSAGE_TYPE,[a.type]));break;default:this._disconnected(h.INVALID_MQTT_MESSAGE_TYPE.code,f(h.INVALID_MQTT_MESSAGE_TYPE,[a.type]))}}catch(l){c="undefined"==l.hasOwnProperty("stack")?l.stack.toString():"No Error Stack Available",this._disconnected(h.INTERNAL_ERROR.code,f(h.INTERNAL_ERROR,[l.message,c]))}};d.prototype._on_socket_error=function(a){this._reconnecting||this._disconnected(h.SOCKET_ERROR.code,f(h.SOCKET_ERROR,[a.data]))};d.prototype._on_socket_close=function(){this._reconnecting||
    this._disconnected(h.SOCKET_CLOSE.code,f(h.SOCKET_CLOSE))};d.prototype._socket_send=function(a){if(1==a.type){var b=this._traceMask(a,"password");this._trace("Client._socket_send",b)}else this._trace("Client._socket_send",a);this.socket.send(a.encode());this.sendPinger.reset()};d.prototype._receivePublish=function(a){switch(a.payloadMessage.qos){case "undefined":case 0:this._receiveMessage(a);break;case 1:var b=new p(4,{messageIdentifier:a.messageIdentifier});this._schedule_message(b);this._receiveMessage(a);
    break;case 2:this._receivedMessages[a.messageIdentifier]=a;this.store("Received:",a);a=new p(5,{messageIdentifier:a.messageIdentifier});this._schedule_message(a);break;default:throw Error("Invaild qos\x3d"+a.payloadMessage.qos);}};d.prototype._receiveMessage=function(a){if(this.onMessageArrived)this.onMessageArrived(a.payloadMessage)};d.prototype._connected=function(a,b){if(this.onConnected)this.onConnected(a,b)};d.prototype._reconnect=function(){this._trace("Client._reconnect");this.connected||(this._reconnecting=
    !0,this.sendPinger.cancel(),this.receivePinger.cancel(),128>this._reconnectInterval&&(this._reconnectInterval*=2),this.connectOptions.uris?(this.hostIndex=0,this._doConnect(this.connectOptions.uris[0])):this._doConnect(this.uri))};d.prototype._disconnected=function(a,b){this._trace("Client._disconnected",a,b);if(void 0!==a&&this._reconnecting)this._reconnectTimeout=new v(this,this._reconnectInterval,this._reconnect);else if(this.sendPinger.cancel(),this.receivePinger.cancel(),this._connectTimeout&&
    (this._connectTimeout.cancel(),this._connectTimeout=null),this._msg_queue=[],this._buffered_msg_queue=[],this._notify_msg_sent={},this.socket&&(this.socket.onopen=null,this.socket.onmessage=null,this.socket.onerror=null,this.socket.onclose=null,1===this.socket.readyState&&this.socket.close(),delete this.socket),this.connectOptions.uris&&this.hostIndex<this.connectOptions.uris.length-1)this.hostIndex++,this._doConnect(this.connectOptions.uris[this.hostIndex]);else if(void 0===a&&(a=h.OK.code,b=f(h.OK)),
    this.connected){this.connected=!1;if(this.onConnectionLost)this.onConnectionLost({errorCode:a,errorMessage:b,reconnect:this.connectOptions.reconnect,uri:this._wsuri});a!==h.OK.code&&this.connectOptions.reconnect&&(this._reconnectInterval=1,this._reconnect())}else if(4===this.connectOptions.mqttVersion&&!1===this.connectOptions.mqttVersionExplicit)this._trace("Failed to connect V4, dropping back to V3"),this.connectOptions.mqttVersion=3,this.connectOptions.uris?(this.hostIndex=0,this._doConnect(this.connectOptions.uris[0])):
    this._doConnect(this.uri);else if(this.connectOptions.onFailure)this.connectOptions.onFailure({invocationContext:this.connectOptions.invocationContext,errorCode:a,errorMessage:b})};d.prototype._trace=function(){if(this.traceFunction){var a=Array.prototype.slice.call(arguments),b;for(b in a)"undefined"!==typeof a[b]&&a.splice(b,1,JSON.stringify(a[b]));b=a.join("");this.traceFunction({severity:"Debug",message:b})}if(null!==this._traceBuffer)for(b=0,a=arguments.length;b<a;b++)this._traceBuffer.length==
    this._MAX_TRACE_ENTRIES&&this._traceBuffer.shift(),0===b?this._traceBuffer.push(arguments[b]):"undefined"===typeof arguments[b]?this._traceBuffer.push(arguments[b]):this._traceBuffer.push("  "+JSON.stringify(arguments[b]))};d.prototype._traceMask=function(a,b){var c={},d;for(d in a)a.hasOwnProperty(d)&&(c[d]=d==b?"******":a[d]);return c};var w=function(a){var b;if("string"===typeof a||a instanceof ArrayBuffer||ArrayBuffer.isView(a)&&!(a instanceof DataView))b=a;else throw f(h.INVALID_ARGUMENT,[a,
    "newPayload"]);var c,d=0,e=!1,g=!1;Object.defineProperties(this,{payloadString:{enumerable:!0,get:function(){return"string"===typeof b?b:F(b,0,b.length)}},payloadBytes:{enumerable:!0,get:function(){if("string"===typeof b){var a=new ArrayBuffer(n(b)),a=new Uint8Array(a);E(b,a,0);return a}return b}},destinationName:{enumerable:!0,get:function(){return c},set:function(a){if("string"===typeof a)c=a;else throw Error(f(h.INVALID_ARGUMENT,[a,"newDestinationName"]));}},qos:{enumerable:!0,get:function(){return d},
    set:function(a){if(0===a||1===a||2===a)d=a;else throw Error("Invalid argument:"+a);}},retained:{enumerable:!0,get:function(){return e},set:function(a){if("boolean"===typeof a)e=a;else throw Error(f(h.INVALID_ARGUMENT,[a,"newRetained"]));}},topic:{enumerable:!0,get:function(){return c},set:function(a){c=a}},duplicate:{enumerable:!0,get:function(){return g},set:function(a){g=a}}})};return{Client:function(a,b,c,k){var e;if("string"!==typeof a)throw Error(f(h.INVALID_TYPE,[typeof a,"host"]));if(2==arguments.length){k=
    b;e=a;var g=e.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);if(g)a=g[4]||g[2],b=parseInt(g[7]),c=g[8];else throw Error(f(h.INVALID_ARGUMENT,[a,"host"]));}else{3==arguments.length&&(k=c,c="/mqtt");if("number"!==typeof b||0>b)throw Error(f(h.INVALID_TYPE,[typeof b,"port"]));if("string"!==typeof c)throw Error(f(h.INVALID_TYPE,[typeof c,"path"]));e="ws://"+(-1!==a.indexOf(":")&&"["!==a.slice(0,1)&&"]"!==a.slice(-1)?"["+a+"]":a)+":"+b+c}for(var m=g=0;m<k.length;m++){var n=k.charCodeAt(m);
    55296<=n&&56319>=n&&m++;g++}if("string"!==typeof k||65535<g)throw Error(f(h.INVALID_ARGUMENT,[k,"clientId"]));var l=new d(e,a,b,c,k);Object.defineProperties(this,{host:{get:function(){return a},set:function(){throw Error(f(h.UNSUPPORTED_OPERATION));}},port:{get:function(){return b},set:function(){throw Error(f(h.UNSUPPORTED_OPERATION));}},path:{get:function(){return c},set:function(){throw Error(f(h.UNSUPPORTED_OPERATION));}},uri:{get:function(){return e},set:function(){throw Error(f(h.UNSUPPORTED_OPERATION));
    }},clientId:{get:function(){return l.clientId},set:function(){throw Error(f(h.UNSUPPORTED_OPERATION));}},onConnected:{get:function(){return l.onConnected},set:function(a){if("function"===typeof a)l.onConnected=a;else throw Error(f(h.INVALID_TYPE,[typeof a,"onConnected"]));}},disconnectedPublishing:{get:function(){return l.disconnectedPublishing},set:function(a){l.disconnectedPublishing=a}},disconnectedBufferSize:{get:function(){return l.disconnectedBufferSize},set:function(a){l.disconnectedBufferSize=
    a}},onConnectionLost:{get:function(){return l.onConnectionLost},set:function(a){if("function"===typeof a)l.onConnectionLost=a;else throw Error(f(h.INVALID_TYPE,[typeof a,"onConnectionLost"]));}},onMessageDelivered:{get:function(){return l.onMessageDelivered},set:function(a){if("function"===typeof a)l.onMessageDelivered=a;else throw Error(f(h.INVALID_TYPE,[typeof a,"onMessageDelivered"]));}},onMessageArrived:{get:function(){return l.onMessageArrived},set:function(a){if("function"===typeof a)l.onMessageArrived=
    a;else throw Error(f(h.INVALID_TYPE,[typeof a,"onMessageArrived"]));}},trace:{get:function(){return l.traceFunction},set:function(a){if("function"===typeof a)l.traceFunction=a;else throw Error(f(h.INVALID_TYPE,[typeof a,"onTrace"]));}}});this.connect=function(a){a=a||{};A(a,{timeout:"number",userName:"string",password:"string",willMessage:"object",keepAliveInterval:"number",cleanSession:"boolean",useSSL:"boolean",invocationContext:"object",onSuccess:"function",onFailure:"function",hosts:"object",
    ports:"object",reconnect:"boolean",mqttVersion:"number",mqttVersionExplicit:"boolean",uris:"object"});void 0===a.keepAliveInterval&&(a.keepAliveInterval=60);if(4<a.mqttVersion||3>a.mqttVersion)throw Error(f(h.INVALID_ARGUMENT,[a.mqttVersion,"connectOptions.mqttVersion"]));void 0===a.mqttVersion?(a.mqttVersionExplicit=!1,a.mqttVersion=4):a.mqttVersionExplicit=!0;if(void 0!==a.password&&void 0===a.userName)throw Error(f(h.INVALID_ARGUMENT,[a.password,"connectOptions.password"]));if(a.willMessage){if(!(a.willMessage instanceof
    w))throw Error(f(h.INVALID_TYPE,[a.willMessage,"connectOptions.willMessage"]));a.willMessage.stringPayload=null;if("undefined"===typeof a.willMessage.destinationName)throw Error(f(h.INVALID_TYPE,[typeof a.willMessage.destinationName,"connectOptions.willMessage.destinationName"]));}"undefined"===typeof a.cleanSession&&(a.cleanSession=!0);if(a.hosts){if(!(a.hosts instanceof Array))throw Error(f(h.INVALID_ARGUMENT,[a.hosts,"connectOptions.hosts"]));if(1>a.hosts.length)throw Error(f(h.INVALID_ARGUMENT,
    [a.hosts,"connectOptions.hosts"]));for(var b=!1,d=0;d<a.hosts.length;d++){if("string"!==typeof a.hosts[d])throw Error(f(h.INVALID_TYPE,[typeof a.hosts[d],"connectOptions.hosts["+d+"]"]));if(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(a.hosts[d]))if(0===d)b=!0;else{if(!b)throw Error(f(h.INVALID_ARGUMENT,[a.hosts[d],"connectOptions.hosts["+d+"]"]));}else if(b)throw Error(f(h.INVALID_ARGUMENT,[a.hosts[d],"connectOptions.hosts["+d+"]"]));}if(b)a.uris=a.hosts;else{if(!a.ports)throw Error(f(h.INVALID_ARGUMENT,
    [a.ports,"connectOptions.ports"]));if(!(a.ports instanceof Array))throw Error(f(h.INVALID_ARGUMENT,[a.ports,"connectOptions.ports"]));if(a.hosts.length!==a.ports.length)throw Error(f(h.INVALID_ARGUMENT,[a.ports,"connectOptions.ports"]));a.uris=[];for(d=0;d<a.hosts.length;d++){if("number"!==typeof a.ports[d]||0>a.ports[d])throw Error(f(h.INVALID_TYPE,[typeof a.ports[d],"connectOptions.ports["+d+"]"]));var b=a.hosts[d],g=a.ports[d];e="ws://"+(-1!==b.indexOf(":")?"["+b+"]":b)+":"+g+c;a.uris.push(e)}}}l.connect(a)};
    this.subscribe=function(a,b){if("string"!==typeof a&&a.constructor!==Array)throw Error("Invalid argument:"+a);b=b||{};A(b,{qos:"number",invocationContext:"object",onSuccess:"function",onFailure:"function",timeout:"number"});if(b.timeout&&!b.onFailure)throw Error("subscribeOptions.timeout specified with no onFailure callback.");if("undefined"!==typeof b.qos&&0!==b.qos&&1!==b.qos&&2!==b.qos)throw Error(f(h.INVALID_ARGUMENT,[b.qos,"subscribeOptions.qos"]));l.subscribe(a,b)};this.unsubscribe=function(a,
    b){if("string"!==typeof a&&a.constructor!==Array)throw Error("Invalid argument:"+a);b=b||{};A(b,{invocationContext:"object",onSuccess:"function",onFailure:"function",timeout:"number"});if(b.timeout&&!b.onFailure)throw Error("unsubscribeOptions.timeout specified with no onFailure callback.");l.unsubscribe(a,b)};this.send=function(a,b,c,d){var e;if(0===arguments.length)throw Error("Invalid argument.length");if(1==arguments.length){if(!(a instanceof w)&&"string"!==typeof a)throw Error("Invalid argument:"+
    typeof a);e=a;if("undefined"===typeof e.destinationName)throw Error(f(h.INVALID_ARGUMENT,[e.destinationName,"Message.destinationName"]));}else e=new w(b),e.destinationName=a,3<=arguments.length&&(e.qos=c),4<=arguments.length&&(e.retained=d);l.send(e)};this.publish=function(a,b,c,d){var e;if(0===arguments.length)throw Error("Invalid argument.length");if(1==arguments.length){if(!(a instanceof w)&&"string"!==typeof a)throw Error("Invalid argument:"+typeof a);e=a;if("undefined"===typeof e.destinationName)throw Error(f(h.INVALID_ARGUMENT,
    [e.destinationName,"Message.destinationName"]));}else e=new w(b),e.destinationName=a,3<=arguments.length&&(e.qos=c),4<=arguments.length&&(e.retained=d);l.send(e)};this.disconnect=function(){l.disconnect()};this.getTraceLog=function(){return l.getTraceLog()};this.startTrace=function(){l.startTrace()};this.stopTrace=function(){l.stopTrace()};this.isConnected=function(){return l.connected}},Message:w}}("undefined"!==typeof global?global:"undefined"!==typeof self?self:"undefined"!==typeof window?window:
    {})});

/* ===== v0.46.0 t73 手机账房刀B段2：HX.mqtt传话筒（SPEC_hx-common_v0.46.0_手机账房刀B_HX.mqtt，DS实现+Kimi终审翻案4处亲手落地） ===== */
/* v0.56.0 2026-10-21（t91 mqtt三条静默死路补账：Paho缺失记账+退避/取钥匙失败上黑匣子/60秒后台记账；SPEC_hx-common_v0.56.0_mqtt静默路径补账，DS实现） */
(function () {
  var HX = window.HX = window.HX || {};
  var OFF_KEY = 'hx_mqtt_off';
  var PW_KEY = 'hx_mqtt_pw';
  var HOST = 'ws://39.97.246.65:9001/mqtt'; /* v0.55.0刀1：paho 2参构造强制URI带路径，无路径同步抛异常卡死connecting，t89根治 */
  var USER = 'hx_suit';
  var SUB_TOPIC = 'hx/to_suit';
  var PUB_TOPIC = 'hx/to_kimi';
  var KEEPALIVE = 60;
  var OPEN_DELAY = 15000; /* v0.57.1 t93：60秒门槛连吃4次闭门羹（装件后未重开/提前锁屏），改15秒错开开门风暴即可 */
  var BACKOFF_MAX = 30000;

  var client = null;
  var connected = false;
  var lastErr = '';
  var backoff = 1000;
  var reconnectTimer = null;
  var openTimer = null;
  var started = false;
  var connecting = false;
  var lastVerJson = ''; var lastVerT = 0; /* v0.68.0 t111：hx/ver retained牌缓存 */

  function isOff() {
    try {
      return localStorage.getItem(OFF_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function isVisible() {
    try {
      return document.visibilityState === 'visible';
    } catch (e) {
      return false;
    }
  }

  function log(k, m) {
    try {
      if (HX.bb && typeof HX.bb.log === 'function') {
        HX.bb.log(k, m);
      }
    } catch (e) {}
  }

  function rand8() {
    var s = '';
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var i;
    for (i = 0; i < 8; i++) {
      s += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return s;
  }

  function pad2(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  function stamp() {
    var d = new Date();
    return '' + d.getFullYear() + pad2(d.getMonth() + 1) + pad2(d.getDate()) + '_' + pad2(d.getHours()) + pad2(d.getMinutes()) + pad2(d.getSeconds());
  }

  function getPw() {
    try {
      return localStorage.getItem(PW_KEY) || '';
    } catch (e) {
      return '';
    }
  }

  function setPw(v) {
    try {
      localStorage.setItem(PW_KEY, v);
    } catch (e) {}
  }

  function fetchPw(cb) {
    try {
      if (!HX.gh || typeof HX.gh.ready !== 'function' || typeof HX.gh.fileUrl !== 'function' || typeof HX.gh.fetch !== 'function' || typeof HX.gh.b64dec !== 'function') {
        cb('');
        return;
      }
      if (!HX.gh.ready()) {
        cb('');
        return;
      }
      HX.gh.fetch(HX.gh.fileUrl('传达室钥匙.json')).then(function (r) {
        return r.json();
      }).then(function (j) {
        var content = j && j.content;
        if (!content) {
          cb('');
          return;
        }
        var txt = HX.gh.b64dec(content);
        var obj = JSON.parse(txt);
        var pw = obj && obj.mqtt && obj.mqtt.hx_suit;
        if (pw) {
          setPw(pw);
          cb(pw);
        } else {
          cb('');
        }
      }).catch(function () {
        cb('');
      });
    } catch (e) {
      cb('');
    }
  }

  function clearReconnect() {
    if (reconnectTimer) {
      try { clearTimeout(reconnectTimer); } catch (e) {}
      reconnectTimer = null;
    }
  }

  function scheduleReconnect() {
    try {
      if (isOff() || !isVisible()) return;
      clearReconnect();
      var delay = backoff;
      reconnectTimer = setTimeout(function () {
        reconnectTimer = null;
        connect();
      }, delay);
      backoff = backoff * 2;
      if (backoff > BACKOFF_MAX) backoff = BACKOFF_MAX;
    } catch (e) {}
  }

  function disconnect() {
    try {
      clearReconnect();
      if (client) {
        try { client.disconnect(); } catch (e) {}
      }
      connected = false;
    } catch (e) {}
  }

  function publishAnswer(id, ok, data) {
    try {
      var ans = { id: id, t: Date.now(), ok: ok, data: data };
      var msg = JSON.stringify(ans);
      if (client && connected) {
        try { client.publish(PUB_TOPIC, msg, 0, false); } catch (e) {}
      }
      if (shellMqttOn()) { try { window.LearnShell.mqttOut(msg); } catch (eO) {} } /* v0.57.2 t94：壳中继答卷 */
      try {
        if (HX.gh && typeof HX.gh.putFile === 'function') {
          HX.gh.putFile(null, '问诊室_答_' + stamp() + '.json', msg, 'mqtt答卷').then(function () {}, function () {});
        }
      } catch (e) {}
    } catch (e) {}
  }

  function handleMessage(topic, payload) {
    try {
      if (topic !== SUB_TOPIC) return;
      var txt = '';
      try {
        if (typeof payload === 'string') {
          txt = payload;
        } else if (payload && typeof payload.toString === 'function') {
          txt = payload.toString();
        }
      } catch (e) {
        return;
      }
      var req;
      try {
        req = JSON.parse(txt);
      } catch (e) {
        return;
      }
      if (!req || !req.id) return;
      var op = req.op;
      var arg = req.arg;
      var data;
      if (op === 'bbTail') {
        data = HX.jc.wzBbTail(arg || 20);
      } else if (op === 'layout') {
        data = HX.jc.wzLayout();
      } else if (op === 'cur') {
        data = HX.jc.wzCur();
      } else if (op === 'see') {
        data = localStorage.getItem(String(arg || ''));
      } else if (op === 'jbSave') {
        /* v0.49.0 刀A1：交班三小件写手机本地（白名单+manifest比对锚） */
        var JBL_FILES = ['jb_交接说明.md', 'jb_任务总账.md', 'jb_version-all.json', 'jb_交接班记录.md', 'jb_闭环实验单.json']; /* v0.62.0 t100刀2：记录件入白名单；v0.63.0 t101刀A：实验单入白名单 */
        var b64enc = function (s) { return btoa(unescape(encodeURIComponent(String(s)))); };
        if (!window.LearnShell || !window.LearnShell.writeFile) {
          publishAnswer(req.id, false, '桥不在');
          return;
        }
        var jblOff = false;
        try { jblOff = (localStorage.getItem('hx_jbl_off') === '1'); } catch (e) {}
        if (jblOff) {
          publishAnswer(req.id, false, '已关');
          return;
        }
        var files = (arg && arg.files) || {};
        var jiaobanName = (arg && arg.jiaobanName) || '';
        var saved = 0;
        var failed = []; /* v0.62.0 t100刀1：失败名单如实回报 */
        var sizes = {};
        var names = Object.keys(files);
        for (var i = 0; i < names.length; i++) {
          var nm = names[i];
          if (JBL_FILES.indexOf(nm) < 0) continue;
          try {
            var content = String(files[nm]);
            var okw = window.LearnShell.writeFile(nm, b64enc(content));
            if (okw === false) { throw new Error('桥写回false'); } /* v0.62.0 t100刀1：桥返false不再当成功（假账病根） */
            sizes[nm] = unescape(encodeURIComponent(content)).length; /* 终审修1：记utf8字节数非字符数 */
            saved++;
          } catch (e) { failed.push(nm); }
        }
        try {
          var man = { t: Date.now(), files: sizes, src: 'kimi交班推送', jiaobanName: jiaobanName };
          window.LearnShell.writeFile('jb_manifest.json', b64enc(JSON.stringify(man)));
        } catch (e) {}
        publishAnswer(req.id, failed.length === 0, { saved: saved, failed: failed }); /* v0.62.0 t100刀1：有败件ok=false不再假账 */
        return;
      } else if (op === 'jbRead') {
        /* v0.49.0 刀A1：接班读手机本地三小件 */
        var JBL_FILES2 = ['jb_交接说明.md', 'jb_任务总账.md', 'jb_version-all.json', 'jb_交接班记录.md', 'jb_闭环实验单.json']; /* v0.62.0 t100刀2：记录件入白名单；v0.63.0 t101刀A：实验单入白名单 */
        var b64dec = function (s) { return decodeURIComponent(escape(atob(s))); };
        var jblOff2 = false;
        try { jblOff2 = (localStorage.getItem('hx_jbl_off') === '1'); } catch (e) {}
        if (jblOff2) {
          publishAnswer(req.id, false, '已关');
          return;
        }
        if (!window.LearnShell || !window.LearnShell.readFile) {
          publishAnswer(req.id, false, '桥不在');
          return;
        }
        var have = {};
        var lack = [];
        var manRaw = null;
        try {
          var mb = window.LearnShell.readFile('jb_manifest.json');
          if (mb) manRaw = b64dec(mb);
        } catch (e) {}
        for (var j = 0; j < JBL_FILES2.length; j++) {
          var nm2 = JBL_FILES2[j];
          try {
            var rb = window.LearnShell.readFile(nm2);
            if (rb) {
              have[nm2] = b64dec(rb);
            } else {
              lack.push(nm2);
            }
          } catch (e) {
            lack.push(nm2);
          }
        }
        if (!manRaw || lack.length > 0) {
          publishAnswer(req.id, false, { lack: lack, have: have });
          return;
        }
        var manObj = null;
        try { manObj = JSON.parse(manRaw); } catch (e) {}
        publishAnswer(req.id, true, { manifest: manObj, files: have });
        return;
      } else if (op === 'arcList') {
        /* v0.53.0 刀B1：点名列手机档案柜清单（SPEC_hx-common_v0.53.0_套装档案柜） */
        try {
          var arcOff1 = false;
          try { arcOff1 = (localStorage.getItem('hx_arc_off') === '1'); } catch (e) {}
          if (arcOff1) { publishAnswer(req.id, false, '已关'); return; }
          if (!window.LearnShell || typeof window.LearnShell.listFilesRel !== 'function') { publishAnswer(req.id, false, '桥不在'); return; }
          var arrL = null;
          try { arrL = JSON.parse(window.LearnShell.listFilesRel('套装档案柜') || '[]'); } catch (e) { arrL = null; }
          if (!arrL) { publishAnswer(req.id, false, '清单读不出'); return; }
          var listOut = { files: [] };
          for (var li = 0; li < arrL.length; li++) {
            var lf = arrL[li];
            if (!lf || !lf.name) continue;
            listOut.files.push({ name: lf.name, len: (typeof lf.len === 'number') ? lf.len : -1 });
          }
          publishAnswer(req.id, true, listOut);
          return;
        } catch (e) { publishAnswer(req.id, false, '异常'); return; }
      } else if (op === 'arcRead') {
        /* v0.53.0 刀B2：点名取手机档案柜一件（白名单=L1十三件+台账+门条指名，含..或/一律拒） */
        try {
          var arcOff2 = false;
          try { arcOff2 = (localStorage.getItem('hx_arc_off') === '1'); } catch (e) {}
          if (arcOff2) { publishAnswer(req.id, false, '已关'); return; }
          if (!window.LearnShell || typeof window.LearnShell.readFileRel !== 'function') { publishAnswer(req.id, false, '桥不在'); return; }
          var ARC_L1 = ['最新交班表.txt', '任务总账.md', 'next.json', 'version-all.json', 'version-shell.json', 'version-hx-common.json', '改进闭环单.json', '余额账.md', '走查单.json', '验收清单.json', '验收单.json', '记忆库.md', '想法流水.txt', '档案柜台账.json'];
          var wantName = (arg && arg.name) ? String(arg.name) : '';
          if (!wantName || wantName.indexOf('..') >= 0 || wantName.indexOf('/') >= 0) { publishAnswer(req.id, false, '名不在白名单'); return; }
          var proceedRead = function () {
            try {
              var rb = window.LearnShell.readFileRel('套装档案柜/' + wantName);
              if (!rb) { publishAnswer(req.id, false, { lack: wantName }); return; }
              var cont = null;
              try { cont = decodeURIComponent(escape(atob(rb))); } catch (e) { cont = null; }
              if (cont === null) { publishAnswer(req.id, false, { lack: wantName }); return; }
              publishAnswer(req.id, true, { name: wantName, content: cont });
            } catch (e) { publishAnswer(req.id, false, '异常'); }
          };
          if (ARC_L1.indexOf(wantName) >= 0) { proceedRead(); return; }
          HX.gh.getFile(null, '最新交班表.txt').then(function (txt) {
            var first = txt ? String(txt).replace(/^\uFEFF/, '').split(/\r?\n/)[0].trim() : '';
            if (first && first === wantName) { proceedRead(); return; }
            publishAnswer(req.id, false, '名不在白名单');
          }, function () { publishAnswer(req.id, false, '名不在白名单'); });
          return;
        } catch (e) { publishAnswer(req.id, false, '异常'); return; }
      } else {
        publishAnswer(req.id, false, 'op不在白名单');
        return;
      }
      publishAnswer(req.id, true, data);
    } catch (e) {}
  }

  var shellLogged = false;
  function shellMqttOn() { try { return !!(window.LearnShell && typeof window.LearnShell.shellMqtt === 'function' && window.LearnShell.shellMqtt() === '1'); } catch (e) { return false; } } /* v0.57.2 t94：壳传达室常驻岗在岗旗（vc64桥） */

  function connect() {
    try {
      if (shellMqttOn()) { try { if (!shellLogged) { shellLogged = true; log('mqtt', '壳接管传话筒'); localStorage.setItem('hx_mqtt_ok_t', String(Date.now())); } } catch (eS) {} return; } /* v0.57.2 t94：壳常驻岗在线，网页腿退休不自连，ok_t照记让哨兵转绿 */
      if (isOff() || !isVisible()) return;
      if (connecting) return;
      if (client && connected) return;
      var pw = getPw();
      if (!pw) {
        fetchPw(function (p) {
          if (p) {
            connect();
          } else {
            try { localStorage.setItem('hx_mqtt_err', '取钥匙失败 @' + Date.now()); } catch (e2) {} /* v0.51.0刀A3：取钥匙失败记账（t81/A7） */
            log('mqtt', '取钥匙失败'); /* v0.56.0刀B：取钥匙失败上黑匣子（t91） */
            scheduleReconnect(); /* 取钥匙失败退避下轮再试（Kimi终审翻案4：DS稿失败=永不再试） */
          }
        });
        return;
      }
      if (!window.Paho || !window.Paho.MQTT || !window.Paho.MQTT.Client) { try { localStorage.setItem('hx_mqtt_err', 'Paho库不在 @' + Date.now()); } catch (eP) {} log('mqtt', 'Paho库不在'); scheduleReconnect(); return; } /* v0.56.0刀A：Paho缺失记账+退避再试（t91） */
      var cid = 'suit-' + rand8();
      var c;
      try { c = new window.Paho.MQTT.Client(HOST, cid); } catch (eNew) { try { localStorage.setItem('hx_mqtt_err', '构造异常:' + String(eNew && eNew.message || eNew).substring(0, 60) + ' @' + Date.now()); } catch (e3) {} scheduleReconnect(); return; } /* v0.55.0刀2：构造同步异常记账+退避重试，不再卡死connecting（t89） */
      connecting = true;
      client = c;
      c.onConnectionLost = function (resp) {
        connected = false;
        connecting = false;
        try {
          if (resp && resp.errorCode) {
            lastErr = String(resp.errorCode);
          }
        } catch (e) {}
        if (isOff()) return;
        if (!isVisible()) return;
        scheduleReconnect();
      };
      c.onMessageArrived = function (m) {
        try {
          if (m && m.destinationName === 'hx/ver') { lastVerJson = String(m.payloadString || ''); lastVerT = Date.now(); return; } /* v0.68.0 t111刀B：牌频道截存，不进令白名单 */
          handleMessage(m.destinationName, m.payloadString);
        } catch (e) {}
      };
      c.onConnect = function () {
        connected = true;
        connecting = false;
        backoff = 1000;
        lastErr = '';
        try { localStorage.setItem('hx_mqtt_ok_t', String(Date.now())); try { localStorage.removeItem('hx_mqtt_err'); } catch (e2) {} log('mqtt', '连上'); } catch (e) {} /* v0.51.0刀A1：连上记账（t81/A7） */
        try { c.subscribe(SUB_TOPIC); } catch (e) {}
        try { if (localStorage.getItem('hx_mqtt_ver_off') !== '1') { c.subscribe('hx/ver'); } } catch (eV1) {} /* v0.68.0 t111刀A：多订ECS真源牌频道 */
      };
      try {
        c.connect({
          onSuccess: function () {
            connected = true;
            connecting = false;
            backoff = 1000;
            lastErr = '';
            try { localStorage.setItem('hx_mqtt_ok_t', String(Date.now())); try { localStorage.removeItem('hx_mqtt_err'); } catch (e2) {} log('mqtt', '连上'); } catch (e) {} /* v0.51.0刀A1：连上记账（t81/A7） */
            try { c.subscribe(SUB_TOPIC); } catch (e) {}
        try { if (localStorage.getItem('hx_mqtt_ver_off') !== '1') { c.subscribe('hx/ver'); } } catch (eV1) {} /* v0.68.0 t111刀A：多订ECS真源牌频道 */
          },
          onFailure: function (e) {
            connected = false;
            connecting = false;
            try { lastErr = String((e && e.errorMessage) || 'connect_fail'); } catch (x) {}
            try { localStorage.setItem('hx_mqtt_err', String(lastErr || 'connect_fail') + ' @' + Date.now()); log('mqtt', '连不上:' + lastErr); } catch (e2) {} /* v0.51.0刀A2：连不上记错误码（t81/A7） */
            if (isOff() || !isVisible()) return;
            scheduleReconnect();
          },
          timeout: 10,
          userName: USER,
          password: pw,
          keepAliveInterval: KEEPALIVE
        });
      } catch (e) {
        connecting = false;
        if (isOff() || !isVisible()) return;
        scheduleReconnect();
      }
    } catch (e) {
      connecting = false;
    }
  }

  function start() {
    try {
      if (started) return;
      started = true;
      if (isOff()) return;
      openTimer = setTimeout(function () {
        openTimer = null;
        if (isOff()) return;
        if (!isVisible()) { try { localStorage.setItem('hx_mqtt_err', '开门时在后台 @' + Date.now()); } catch (eB) {} log('mqtt', '开门60秒到点在后台'); return; } /* v0.56.0刀C：60秒到点在后台记账（t91） */
        connect();
      }, OPEN_DELAY);
    } catch (e) {}
  }

  function onVisChange() {
    try {
      if (isOff()) {
        disconnect();
        return;
      }
      if (isVisible()) {
        backoff = 1000;
        connect();
      } else {
        disconnect();
      }
    } catch (e) {}
  }

  try {
    if (typeof document !== 'undefined' && document.addEventListener) {
      document.addEventListener('visibilitychange', onVisChange, false);
    }
  } catch (e) {}

  try {
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('load', start, false);
    }
  } catch (e) {}

  try {
    if (typeof document !== 'undefined' && document.readyState === 'complete') {
      start();
    }
  } catch (e) {}

  HX.mqtt = {
    shellIn: function (payload) { /* v0.57.2 t94：壳常驻岗桥进来的传达室来信，走白名单老六令 */
      try { handleMessage(SUB_TOPIC, String(payload)); return true; } catch (e) { return false; }
    },
    ver: function () { /* v0.68.0 t111刀C：取ECS真源retained牌，无则null */
      try {
        if (!lastVerJson) return null;
        return { json: lastVerJson, age: Date.now() - lastVerT };
      } catch (e) { return null; }
    },
    status: function () {
      try {
        return { connected: !!connected, lastErr: String(lastErr || '') };
  
    } catch (e) {
        return { connected: false, lastErr: '' };
      }
    },
    send: function (topic, msg) {
      try {
        if (topic !== PUB_TOPIC) return false;
        if (!client || !connected) return false;
        try {
          client.publish(topic, String(msg), 0, false);
          return true;
        } catch (e) {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
  };
})();

/* ===== v0.49.0 刀A2：交班本地存取公开口 HX.jbl ===== */
(function () {
  try {
    var HX = window.HX = window.HX || {}; /* 终审修2：起手式补齐，不裸引用全局 */
    var JBL_FILES = ['jb_交接说明.md', 'jb_任务总账.md', 'jb_version-all.json', 'jb_交接班记录.md', 'jb_闭环实验单.json']; /* v0.62.0 t100刀2：记录件入白名单；v0.63.0 t101刀A：实验单入白名单 */
    function b64dec(s) {
      try { return decodeURIComponent(escape(atob(s))); } catch (e) { return null; }
    }
    function isOff() {
      try { return localStorage.getItem('hx_jbl_off') === '1'; } catch (e) { return false; }
    }
    HX.jbl = {
      status: function () {
        try {
          if (isOff()) return null;
          var bridge = !!(window.LearnShell && window.LearnShell.readFile);
          var man = null;
          var filesOk = false;
          if (bridge) {
            try {
              var mb = window.LearnShell.readFile('jb_manifest.json');
              if (mb) {
                var raw = b64dec(mb);
                if (raw) man = JSON.parse(raw);
              }
            } catch (e) {}
            try {
              var ok = 0;
              for (var i = 0; i < JBL_FILES.length; i++) {
                try {
                  var rb = window.LearnShell.readFile(JBL_FILES[i]);
                  if (rb) ok++;
                } catch (e) {}
              }
              filesOk = (ok === JBL_FILES.length);
            } catch (e) {}
          }
          return { bridge: bridge, manifest: man, filesOk: filesOk };
        } catch (e) {
          return { bridge: false, manifest: null, filesOk: false };
        }
      }
    };
  } catch (e) {}
})();

/* ===== v0.48.0 t77 真机自报 ===== */
(function () {
  try {
    var LS_OFF = 'hx_zb_off';
    var LS_LAST = 'hx_zb_last';
    var LS_PEND = 'hx_zb_pend';
    var PEND_MAX = 10;
    var THROTTLE_MS = 60000;
    var hooked = false;
    var memLast = null;
    var memPend = null;

    function lsGet(k) {
      try {
        return localStorage.getItem(k);
      } catch (e) {
        return null;
      }
    }

    function lsSet(k, v) {
      try {
        localStorage.setItem(k, v);
        return true;
      } catch (e) {
        return false;
      }
    }

    function lsDel(k) {
      try {
        localStorage.removeItem(k);
        return true;
      } catch (e) {
        return false;
      }
    }

    function pad2(n) {
      n = String(n);
      return n.length < 2 ? '0' + n : n;
    }

    function stamp(ms) {
      var d = new Date(ms);
      return String(d.getFullYear()) + pad2(d.getMonth() + 1) + pad2(d.getDate()) + '_' + pad2(d.getHours()) + pad2(d.getMinutes()) + pad2(d.getSeconds());
    }

    function readLast() {
      var raw = lsGet(LS_LAST);
      if (raw) {
        try {
          var o = JSON.parse(raw);
          if (o && typeof o === 'object') {
            return { m: String(o.m), t: Number(o.t) || 0 };
          }
        } catch (e) {}
      }
      return memLast;
    }

    function writeLast(o) {
      memLast = o;
      lsSet(LS_LAST, JSON.stringify(o));
    }

    function readPend() {
      var raw = lsGet(LS_PEND);
      if (raw) {
        try {
          var a = JSON.parse(raw);
          if (a && a.length !== undefined) {
            return a;
          }
        } catch (e) {}
      }
      return memPend || [];
    }

    function writePend(a) {
      memPend = a;
      lsSet(LS_PEND, JSON.stringify(a));
    }

    function buildMsg(m) {
      var title = '';
      try {
        title = document.title;
      } catch (e) {}
      var v = '';
      try {
        v = HX_COMMON_VERSION;
      } catch (e) {}
      return {
        type: 'zibao',
        app: title,
        v: v,
        m: String(m).slice(0, 300),
        t: Date.now()
      };
    }

    function sendMqtt(obj) {
      try {
        if (HX && HX.mqtt && typeof HX.mqtt.send === 'function') {
          HX.mqtt.send('hx/to_kimi', JSON.stringify(obj));
        }
      } catch (e) {}
    }

    function putOne(obj, cb) {
      try {
        if (HX && HX.gh && typeof HX.gh.putFile === 'function') {
          var name = '真机自报_' + stamp(obj.t) + '.json';
          var p = HX.gh.putFile(null, name, JSON.stringify(obj, null, 1), '真机自报');
          if (p && typeof p.then === 'function') {
            p.then(function () {
              try { cb(true); } catch (e) {}
            }, function () {
              try { cb(false); } catch (e) {}
            });
            return;
          }
        }
      } catch (e) {}
      try { cb(false); } catch (e) {}
    }

    function addPend(obj) {
      try {
        var a = readPend();
        a.push(obj);
        while (a.length > PEND_MAX) {
          a.shift();
        }
        writePend(a);
      } catch (e) {}
    }

    function flushPend() {
      try {
        var a = readPend();
        if (!a || !a.length) {
          return;
        }
        var idx = 0;
        function step() {
          if (idx >= a.length) {
            writePend([]);
            return;
          }
          var obj = a[idx];
          putOne(obj, function (ok) {
            try {
              if (ok) {
                idx++;
                step();
              }
            } catch (e) {}
          });
        }
        step();
      } catch (e) {}
    }

    function report(m) {
      try {
        var now = Date.now();
        var last = readLast();
        if (last) {
          if (String(last.m) === String(m) && (now - last.t) < THROTTLE_MS) {
            return;
          }
          if ((now - last.t) < THROTTLE_MS) {
            return;
          }
        }
        writeLast({ m: String(m), t: now });
        var obj = buildMsg(m);
        sendMqtt(obj);
        putOne(obj, function (ok) {
          try {
            if (!ok) {
              addPend(obj);
            } else {
              flushPend();
            }
          } catch (e) {}
        });
      } catch (e) {}
    }

    function hook() {
      try {
        if (hooked) {
          return;
        }
        if (!HX || !HX.bb || typeof HX.bb.log !== 'function') {
          return;
        }
        var oldLog = HX.bb.log;
        HX.bb.log = function (k, m) {
          var r;
          try {
            r = oldLog.apply(this, arguments);
          } catch (e) {}
          try {
            if (String(k) === 'err') {
              report(m);
            }
          } catch (e) {}
          return r;
        };
        hooked = true;
        flushPend();
      } catch (e) {}
    }

    function status() {
      try {
        return {
          hooked: hooked,
          pend: readPend().length,
          lastT: (function () {
            var l = readLast();
            return l ? l.t : 0;
          })()
        };
      } catch (e) {
        return { hooked: false, pend: 0, lastT: 0 };
      }
    }

    function test() {
      try {
        var obj = buildMsg('自报测试');
        sendMqtt(obj);
        putOne(obj, function (ok) {
          try {
            if (!ok) {
              addPend(obj);
            }
          } catch (e) {}
        });
      } catch (e) {}
    }

    try {
      if (lsGet(LS_OFF) === '1') {
        return;
      }
    } catch (e) {
      return;
    }

    try {
      if (typeof window !== 'undefined') {
        if (!window.HX) {
          window.HX = {};
        }
        window.HX.zb = {
          status: status,
          test: test
        };
      }
    } catch (e) {}

    try {
      setTimeout(function () {
        try {
          hook();
        } catch (e) {}
      }, 60000);
    } catch (e) {}
  } catch (e) {}
})();

/* ===== v0.53.0 刀A：套装档案柜 HX.arc（手机全量备份+对账+接班本地取件；SPEC_hx-common_v0.53.0_套装档案柜，DS实现+Kimi终审翻案2处亲手落地：①一层l1ok双重计数（预计数+重下成功重复计）翻断点续备单计——size一致才计l1ok+skipped，不一致才重下；②SAF老家模式四桥全返false会14件全fail炸台账，补试写探针写不进直接收） ===== */
(function () {
  try {
    var HX = window.HX = window.HX || {};
    var DIR = '套装档案柜';
    var LEDGER = '档案柜台账.json';
    var L1 = ['最新交班表.txt', '任务总账.md', 'next.json', 'version-all.json', 'version-shell.json', 'version-hx-common.json', '改进闭环单.json', '余额账.md', '走查单.json', '验收清单.json', '验收单.json', '记忆库.md', '想法流水.txt'];
    var LS_OFF = 'hx_arc_off';
    var LS_MAX = 'hx_arc_max';
    var LS_UP = 'hx_arc_up';

    function isOff() {
      try { return localStorage.getItem(LS_OFF) === '1'; } catch (e) { return false; }
    }
    function getMax() {
      try {
        var n = parseInt(localStorage.getItem(LS_MAX), 10);
        if (!isNaN(n) && n > 0) return n;
      } catch (e) {}
      return 5;
    }
    function shOk() {
      try {
        return !!(window.LearnShell && typeof window.LearnShell.writeFileRel === 'function' && typeof window.LearnShell.listFilesRel === 'function');
      } catch (e) { return false; }
    }
    function b64enc(s) {
      try { return btoa(unescape(encodeURIComponent(String(s)))); } catch (e) { return ''; }
    }
    function b64dec(s) {
      try { return decodeURIComponent(escape(atob(String(s)))); } catch (e) { return null; }
    }
    function utf8len(s) {
      try { return unescape(encodeURIComponent(String(s))).length; } catch (e) { return 0; }
    }
    function ledPath() { return DIR + '/' + LEDGER; }
    function filePath(n) { return DIR + '/' + n; }

    /* 回读 listFilesRel(DIR) → {name:len} 映射（SAF返"[]"=空映射，不炸） */
    function listMap() {
      var map = {};
      try {
        var raw = window.LearnShell.listFilesRel(DIR);
        var arr = null;
        if (typeof raw === 'string') {
          try { arr = JSON.parse(raw); } catch (e) { arr = null; }
        }
        if (arr && arr.length) {
          for (var i = 0; i < arr.length; i++) {
            var it = arr[i];
            if (!it || !it.name) continue;
            map[it.name] = (typeof it.len === 'number') ? it.len : -1;
          }
        }
      } catch (e) {}
      return map;
    }

    /* 读一层第14件：门条指名交接说明文件名（读门条「最新交班表.txt」内容第一行 trim；含/或..弃用） */
    function pickJiaobanName() {
      try {
        if (!HX.gh || typeof HX.gh.getFile !== 'function') return Promise.resolve(null);
        return HX.gh.getFile(null, '最新交班表.txt').then(function (txt) {
          if (!txt) return null;
          var s = String(txt).replace(/^﻿/, '');
          var first = (s.split(/\r?\n/)[0] || '').trim();
          if (!first) return null;
          if (first.indexOf('/') >= 0 || first.indexOf('..') >= 0) return null;
          if (!/\.(md|txt|json)$/i.test(first)) return null;
          return first;
        }, function () { return null; });
      } catch (e) { return Promise.resolve(null); }
    }

    /* 单件下载+写+回读对账；回读不等同轮再下一次再写再对，仍不等记fail */
    function backupOne(name) {
      return new Promise(function (resolve) {
        var done = function (r) { resolve(r); };
        try {
          var tryWrite = function (s, attempt) {
            var n = utf8len(s);
            try {
              if (!window.LearnShell.writeFileRel(filePath(name), b64enc(s))) {
                if (attempt < 1) { tryWrite(s, attempt + 1); return; }
                done({ name: name, ok: false, reason: 'writeFalse' }); return;
              }
            } catch (e) {
              done({ name: name, ok: false, reason: 'writeErr' }); return;
            }
            var m = listMap();
            if (m[name] === n) { done({ name: name, ok: true, len: n }); return; }
            if (attempt < 1) { tryWrite(s, attempt + 1); return; }
            done({ name: name, ok: false, reason: 'lenMismatch' });
          };
          HX.gh.getFile(null, name).then(function (txt) {
            if (txt === null || typeof txt === 'undefined') { done({ name: name, ok: false, reason: 'noContent' }); return; }
            tryWrite(String(txt), 0);
          }, function () { done({ name: name, ok: false, reason: 'getErr' }); });
        } catch (e) {
          done({ name: name, ok: false, reason: 'exception' });
        }
      });
    }

    /* 列仓根（GitHub API，钥匙HX.keys.gh()，照HX.gh段同款headers） */
    function listRepo() {
      return new Promise(function (resolve) {
        try {
          var keys = null;
          try { keys = (HX.keys && typeof HX.keys.gh === 'function') ? HX.keys.gh() : null; } catch (e) { keys = null; }
          if (!keys || !keys.u || !keys.r || !keys.t) { resolve({ ok: false, reason: '没钥匙', items: [] }); return; }
          var url = 'https://api.github.com/repos/' + encodeURIComponent(keys.u) + '/' + encodeURIComponent(keys.r) + '/contents/';
          var headers = { 'Authorization': 'token ' + keys.t, 'Accept': 'application/vnd.github+json' };
          fetch(url, { method: 'GET', headers: headers }).then(function (resp) {
            if (!resp || !resp.ok) { resolve({ ok: false, reason: 'apiFail', items: [] }); return; }
            resp.json().then(function (arr) {
              resolve({ ok: true, items: (arr && arr.length) ? arr : [] });
            }, function () { resolve({ ok: false, reason: 'jsonErr', items: [] }); });
          }, function () { resolve({ ok: false, reason: 'netErr', items: [] }); });
        } catch (e) { resolve({ ok: false, reason: 'exception', items: [] }); }
      });
    }

    /* 推台账镜像（hx_arc_up防重推，照HX.jc镜像先例） */
    function pushLedger(led) {
      try {
        if (!HX.gh || typeof HX.gh.putFile !== 'function') return;
        var s = JSON.stringify(led, null, 1);
        var last = null;
        try { last = localStorage.getItem(LS_UP); } catch (e) {}
        if (last === s) return;
        HX.gh.putFile(null, LEDGER, s, '档案柜台账').then(function () {
          try { localStorage.setItem(LS_UP, s); } catch (e) {}
        }, function () {});
      } catch (e) {}
    }

    /* 本地台账写+读 */
    function writeLedger(led) {
      try { window.LearnShell.writeFileRel(ledPath(), b64enc(JSON.stringify(led, null, 1))); } catch (e) {}
    }
    function readLedger() {
      try {
        var b = window.LearnShell.readFileRel(ledPath());
        if (typeof b === 'string' && b) {
          var raw = b64dec(b);
          if (raw) return JSON.parse(raw);
        }
      } catch (e) {}
      return null;
    }

    /* 一轮流程 */
    function runOnce() {
      return new Promise(function (resolve) {
        if (isOff()) { resolve({ ok: false, note: '已关' }); return; }
        if (!shOk()) { resolve({ ok: false, note: '桥不在' }); return; }
        /* 终审修2：SAF老家模式四桥全返false——先试写探针，写不进直接收，不炸14件fail */
        try {
          if (!window.LearnShell.writeFileRel(DIR + '/.probe', b64enc('1'))) {
            resolve({ ok: false, note: '桥写不进' }); return;
          }
          try { if (typeof window.LearnShell.deleteFileRel === 'function') window.LearnShell.deleteFileRel(DIR + '/.probe'); } catch (e0) {}
        } catch (e) { resolve({ ok: false, note: '桥写不进' }); return; }
        var gate = true;
        try { if (typeof HX._autoNetOk === 'function') gate = !!HX._autoNetOk({}); } catch (e) { gate = true; }
        if (!gate) { resolve({ ok: false, note: '闸不过' }); return; }

        listRepo().then(function (rep) {
          if (!rep.ok) {
            var failLed = { ver: '0.53.0', t: Date.now(), l1ok: 0, l1total: 0, arcTotal: 0, lack: [], fail: [], skipped: 0, note: rep.reason || '仓列不出' };
            writeLedger(failLed);
            resolve({ ok: false, note: failLed.note, ledger: failLed }); return;
          }
          var items = rep.items || [];
          var repoMap = {};
          var i, it, nm;
          for (i = 0; i < items.length; i++) {
            it = items[i] || {};
            nm = it.name || '';
            if (!nm || it.type !== 'file') continue;
            repoMap[nm] = { size: (typeof it.size === 'number' ? it.size : -1) };
          }
          var map0 = listMap();

          pickJiaobanName().then(function (jbName) {
            var l1List = L1.slice(0);
            if (jbName && l1List.indexOf(jbName) < 0) l1List.push(jbName);
            var lack = [], fail = [];
            var l1ok = 0, skipped = 0;
            var l1total = l1List.length;
            /* 终审修1：一层也断点续备——仓里有的、本地size一致=已对账通过（计l1ok+skipped），不一致/没有才进重下队列，单计不双计 */
            var l1Redo = [];
            var a, ln, wantS, haveL;
            for (a = 0; a < l1List.length; a++) {
              ln = l1List[a];
              if (!repoMap[ln]) { lack.push(ln); continue; }
              wantS = repoMap[ln].size;
              haveL = map0[ln];
              if (typeof haveL === 'number' && haveL >= 0 && haveL === wantS) { l1ok++; skipped++; continue; }
              l1Redo.push(ln);
            }
            /* 三层候选：其余.md/.json/.txt、不含_备份_、≤2MB、不在一层名单；断点续备size一致跳过 */
            var l3Todo = [];
            for (var bn in repoMap) {
              if (!Object.prototype.hasOwnProperty.call(repoMap, bn)) continue;
              if (l1List.indexOf(bn) >= 0) continue;
              if (bn === LEDGER) continue;
              if (bn.indexOf('_备份_') >= 0) continue;
              if (bn.indexOf('..') >= 0 || bn.indexOf('/') >= 0) continue;
              if (!/\.(md|json|txt)$/i.test(bn)) continue;
              if (repoMap[bn].size > 2097152) continue;
              if (map0[bn] === repoMap[bn].size) { skipped++; continue; }
              l3Todo.push(bn);
            }
            var maxN = getMax();
            if (l3Todo.length > maxN) l3Todo = l3Todo.slice(0, maxN);

            var seq = l1Redo.concat(l3Todo);
            var idx = 0;
            var walk = function () {
              if (idx >= seq.length) {
                var curMap = listMap();
                var arcTotal = 0, k;
                for (k in curMap) { if (Object.prototype.hasOwnProperty.call(curMap, k)) arcTotal++; }
                var led = { ver: '0.53.0', t: Date.now(), l1ok: l1ok, l1total: l1total, arcTotal: arcTotal, lack: lack, fail: fail, skipped: skipped, note: '一轮完成' };
                if (!jbName) led.note = '门条读不到，仅备前13件';
                writeLedger(led);
                pushLedger(led);
                resolve({ ok: true, ledger: led }); return;
              }
              var cur = seq[idx++];
              var isL1 = (l1List.indexOf(cur) >= 0);
              backupOne(cur).then(function (r) {
                if (r && r.ok) { if (isL1) l1ok++; }
                else { fail.push(cur); }
                walk();
              }, function () { fail.push(cur); walk(); });
            };
            walk();
          });
        });
      });
    }

    HX.arc = {
      status: function () {
        var out = { on: !isOff(), bridge: shOk(), l1ok: null, l1total: null, arcTotal: null, last: null, lastNote: null };
        try {
          var led = readLedger();
          if (led) {
            out.l1ok = (typeof led.l1ok === 'number') ? led.l1ok : null;
            out.l1total = (typeof led.l1total === 'number') ? led.l1total : null;
            out.arcTotal = (typeof led.arcTotal === 'number') ? led.arcTotal : null;
            out.last = led.t || null;
            out.lastNote = led.note || null;
          }
        } catch (e) {}
        return out;
      },
      run: function () { return runOnce(); }
    };

    /* 调度：开门120秒起跑（错开jc60秒/mqtt60秒），每开门最多一轮；hx_arc_off=1不挂 */
    if (!isOff() && shOk()) {
      try {
        setTimeout(function () {
          try { runOnce().then(function () {}, function () {}); } catch (e) {}
        }, 120000);
      } catch (e) {}
    }
  } catch (e) {}
})();

/* ═══ v0.57.0 2026-10-21（t92 Paho库入库：来源eclipse-paho/paho.mqtt.javascript v1.1.0 src/paho-mqtt.js，90293字节原样内嵌未改一字，EPL/EDL许可头随库保留；置于IIFE之外因内层use strict使顶层this=undefined） ═══ */
/*******************************************************************************
 * Copyright (c) 2013 IBM Corp.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and Eclipse Distribution License v1.0 which accompany this distribution.
 *
 * The Eclipse Public License is available at
 *    http://www.eclipse.org/legal/epl-v10.html
 * and the Eclipse Distribution License is available at
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 * Contributors:
 *    Andrew Banks - initial API and implementation and initial documentation
 *******************************************************************************/


// Only expose a single object name in the global namespace.
// Everything must go through this module. Global Paho module
// only has a single public function, client, which returns
// a Paho client object given connection details.

/**
 * Send and receive messages using web browsers.
 * <p>
 * This programming interface lets a JavaScript client application use the MQTT V3.1 or
 * V3.1.1 protocol to connect to an MQTT-supporting messaging server.
 *
 * The function supported includes:
 * <ol>
 * <li>Connecting to and disconnecting from a server. The server is identified by its host name and port number.
 * <li>Specifying options that relate to the communications link with the server,
 * for example the frequency of keep-alive heartbeats, and whether SSL/TLS is required.
 * <li>Subscribing to and receiving messages from MQTT Topics.
 * <li>Publishing messages to MQTT Topics.
 * </ol>
 * <p>
 * The API consists of two main objects:
 * <dl>
 * <dt><b>{@link Paho.Client}</b></dt>
 * <dd>This contains methods that provide the functionality of the API,
 * including provision of callbacks that notify the application when a message
 * arrives from or is delivered to the messaging server,
 * or when the status of its connection to the messaging server changes.</dd>
 * <dt><b>{@link Paho.Message}</b></dt>
 * <dd>This encapsulates the payload of the message along with various attributes
 * associated with its delivery, in particular the destination to which it has
 * been (or is about to be) sent.</dd>
 * </dl>
 * <p>
 * The programming interface validates parameters passed to it, and will throw
 * an Error containing an error message intended for developer use, if it detects
 * an error with any parameter.
 * <p>
 * Example:
 *
 * <code><pre>
var client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess:onConnect});

function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("/World");
  var message = new Paho.MQTT.Message("Hello");
  message.destinationName = "/World";
  client.send(message);
};
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0)
	console.log("onConnectionLost:"+responseObject.errorMessage);
};
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  client.disconnect();
};
 * </pre></code>
 * @namespace Paho
 */

/* jshint shadow:true */
(function ExportLibrary(root, factory) {
	if(typeof exports === "object" && typeof module === "object"){
		module.exports = factory();
	} else if (typeof define === "function" && define.amd){
		define(factory);
	} else if (typeof exports === "object"){
		exports = factory();
	} else {
		//if (typeof root.Paho === "undefined"){
		//	root.Paho = {};
		//}
		root.Paho = factory();
	}
})(this, function LibraryFactory(){


	var PahoMQTT = (function (global) {

	// Private variables below, these are only visible inside the function closure
	// which is used to define the module.
	var version = "@VERSION@-@BUILDLEVEL@";

	/**
	 * @private
	 */
	var localStorage = global.localStorage || (function () {
		var data = {};

		return {
			setItem: function (key, item) { data[key] = item; },
			getItem: function (key) { return data[key]; },
			removeItem: function (key) { delete data[key]; },
		};
	})();

		/**
	 * Unique message type identifiers, with associated
	 * associated integer values.
	 * @private
	 */
		var MESSAGE_TYPE = {
			CONNECT: 1,
			CONNACK: 2,
			PUBLISH: 3,
			PUBACK: 4,
			PUBREC: 5,
			PUBREL: 6,
			PUBCOMP: 7,
			SUBSCRIBE: 8,
			SUBACK: 9,
			UNSUBSCRIBE: 10,
			UNSUBACK: 11,
			PINGREQ: 12,
			PINGRESP: 13,
			DISCONNECT: 14
		};

		// Collection of utility methods used to simplify module code
		// and promote the DRY pattern.

		/**
	 * Validate an object's parameter names to ensure they
	 * match a list of expected variables name for this option
	 * type. Used to ensure option object passed into the API don't
	 * contain erroneous parameters.
	 * @param {Object} obj - User options object
	 * @param {Object} keys - valid keys and types that may exist in obj.
	 * @throws {Error} Invalid option parameter found.
	 * @private
	 */
		var validate = function(obj, keys) {
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					if (keys.hasOwnProperty(key)) {
						if (typeof obj[key] !== keys[key])
							throw new Error(format(ERROR.INVALID_TYPE, [typeof obj[key], key]));
					} else {
						var errorStr = "Unknown property, " + key + ". Valid properties are:";
						for (var validKey in keys)
							if (keys.hasOwnProperty(validKey))
								errorStr = errorStr+" "+validKey;
						throw new Error(errorStr);
					}
				}
			}
		};

		/**
	 * Return a new function which runs the user function bound
	 * to a fixed scope.
	 * @param {function} User function
	 * @param {object} Function scope
	 * @return {function} User function bound to another scope
	 * @private
	 */
		var scope = function (f, scope) {
			return function () {
				return f.apply(scope, arguments);
			};
		};

		/**
	 * Unique message type identifiers, with associated
	 * associated integer values.
	 * @private
	 */
		var ERROR = {
			OK: {code:0, text:"AMQJSC0000I OK."},
			CONNECT_TIMEOUT: {code:1, text:"AMQJSC0001E Connect timed out."},
			SUBSCRIBE_TIMEOUT: {code:2, text:"AMQJS0002E Subscribe timed out."},
			UNSUBSCRIBE_TIMEOUT: {code:3, text:"AMQJS0003E Unsubscribe timed out."},
			PING_TIMEOUT: {code:4, text:"AMQJS0004E Ping timed out."},
			INTERNAL_ERROR: {code:5, text:"AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}"},
			CONNACK_RETURNCODE: {code:6, text:"AMQJS0006E Bad Connack return code:{0} {1}."},
			SOCKET_ERROR: {code:7, text:"AMQJS0007E Socket error:{0}."},
			SOCKET_CLOSE: {code:8, text:"AMQJS0008I Socket closed."},
			MALFORMED_UTF: {code:9, text:"AMQJS0009E Malformed UTF data:{0} {1} {2}."},
			UNSUPPORTED: {code:10, text:"AMQJS0010E {0} is not supported by this browser."},
			INVALID_STATE: {code:11, text:"AMQJS0011E Invalid state {0}."},
			INVALID_TYPE: {code:12, text:"AMQJS0012E Invalid type {0} for {1}."},
			INVALID_ARGUMENT: {code:13, text:"AMQJS0013E Invalid argument {0} for {1}."},
			UNSUPPORTED_OPERATION: {code:14, text:"AMQJS0014E Unsupported operation."},
			INVALID_STORED_DATA: {code:15, text:"AMQJS0015E Invalid data in local storage key={0} value={1}."},
			INVALID_MQTT_MESSAGE_TYPE: {code:16, text:"AMQJS0016E Invalid MQTT message type {0}."},
			MALFORMED_UNICODE: {code:17, text:"AMQJS0017E Malformed Unicode string:{0} {1}."},
			BUFFER_FULL: {code:18, text:"AMQJS0018E Message buffer is full, maximum buffer size: {0}."},
		};

		/** CONNACK RC Meaning. */
		var CONNACK_RC = {
			0:"Connection Accepted",
			1:"Connection Refused: unacceptable protocol version",
			2:"Connection Refused: identifier rejected",
			3:"Connection Refused: server unavailable",
			4:"Connection Refused: bad user name or password",
			5:"Connection Refused: not authorized"
		};

	/**
	 * Format an error message text.
	 * @private
	 * @param {error} ERROR value above.
	 * @param {substitutions} [array] substituted into the text.
	 * @return the text with the substitutions made.
	 */
		var format = function(error, substitutions) {
			var text = error.text;
			if (substitutions) {
				var field,start;
				for (var i=0; i<substitutions.length; i++) {
					field = "{"+i+"}";
					start = text.indexOf(field);
					if(start > 0) {
						var part1 = text.substring(0,start);
						var part2 = text.substring(start+field.length);
						text = part1+substitutions[i]+part2;
					}
				}
			}
			return text;
		};

		//MQTT protocol and version          6    M    Q    I    s    d    p    3
		var MqttProtoIdentifierv3 = [0x00,0x06,0x4d,0x51,0x49,0x73,0x64,0x70,0x03];
		//MQTT proto/version for 311         4    M    Q    T    T    4
		var MqttProtoIdentifierv4 = [0x00,0x04,0x4d,0x51,0x54,0x54,0x04];

		/**
	 * Construct an MQTT wire protocol message.
	 * @param type MQTT packet type.
	 * @param options optional wire message attributes.
	 *
	 * Optional properties
	 *
	 * messageIdentifier: message ID in the range [0..65535]
	 * payloadMessage:	Application Message - PUBLISH only
	 * connectStrings:	array of 0 or more Strings to be put into the CONNECT payload
	 * topics:			array of strings (SUBSCRIBE, UNSUBSCRIBE)
	 * requestQoS:		array of QoS values [0..2]
	 *
	 * "Flag" properties
	 * cleanSession:	true if present / false if absent (CONNECT)
	 * willMessage:  	true if present / false if absent (CONNECT)
	 * isRetained:		true if present / false if absent (CONNECT)
	 * userName:		true if present / false if absent (CONNECT)
	 * password:		true if present / false if absent (CONNECT)
	 * keepAliveInterval:	integer [0..65535]  (CONNECT)
	 *
	 * @private
	 * @ignore
	 */
		var WireMessage = function (type, options) {
			this.type = type;
			for (var name in options) {
				if (options.hasOwnProperty(name)) {
					this[name] = options[name];
				}
			}
		};

		WireMessage.prototype.encode = function() {
		// Compute the first byte of the fixed header
			var first = ((this.type & 0x0f) << 4);

			/*
		 * Now calculate the length of the variable header + payload by adding up the lengths
		 * of all the component parts
		 */

			var remLength = 0;
			var topicStrLength = [];
			var destinationNameLength = 0;
			var willMessagePayloadBytes;

			// if the message contains a messageIdentifier then we need two bytes for that
			if (this.messageIdentifier !== undefined)
				remLength += 2;

			switch(this.type) {
			// If this a Connect then we need to include 12 bytes for its header
			case MESSAGE_TYPE.CONNECT:
				switch(this.mqttVersion) {
				case 3:
					remLength += MqttProtoIdentifierv3.length + 3;
					break;
				case 4:
					remLength += MqttProtoIdentifierv4.length + 3;
					break;
				}

				remLength += UTF8Length(this.clientId) + 2;
				if (this.willMessage !== undefined) {
					remLength += UTF8Length(this.willMessage.destinationName) + 2;
					// Will message is always a string, sent as UTF-8 characters with a preceding length.
					willMessagePayloadBytes = this.willMessage.payloadBytes;
					if (!(willMessagePayloadBytes instanceof Uint8Array))
						willMessagePayloadBytes = new Uint8Array(payloadBytes);
					remLength += willMessagePayloadBytes.byteLength +2;
				}
				if (this.userName !== undefined)
					remLength += UTF8Length(this.userName) + 2;
				if (this.password !== undefined)
					remLength += UTF8Length(this.password) + 2;
				break;

			// Subscribe, Unsubscribe can both contain topic strings
			case MESSAGE_TYPE.SUBSCRIBE:
				first |= 0x02; // Qos = 1;
				for ( var i = 0; i < this.topics.length; i++) {
					topicStrLength[i] = UTF8Length(this.topics[i]);
					remLength += topicStrLength[i] + 2;
				}
				remLength += this.requestedQos.length; // 1 byte for each topic's Qos
				// QoS on Subscribe only
				break;

			case MESSAGE_TYPE.UNSUBSCRIBE:
				first |= 0x02; // Qos = 1;
				for ( var i = 0; i < this.topics.length; i++) {
					topicStrLength[i] = UTF8Length(this.topics[i]);
					remLength += topicStrLength[i] + 2;
				}
				break;

			case MESSAGE_TYPE.PUBREL:
				first |= 0x02; // Qos = 1;
				break;

			case MESSAGE_TYPE.PUBLISH:
				if (this.payloadMessage.duplicate) first |= 0x08;
				first  = first |= (this.payloadMessage.qos << 1);
				if (this.payloadMessage.retained) first |= 0x01;
				destinationNameLength = UTF8Length(this.payloadMessage.destinationName);
				remLength += destinationNameLength + 2;
				var payloadBytes = this.payloadMessage.payloadBytes;
				remLength += payloadBytes.byteLength;
				if (payloadBytes instanceof ArrayBuffer)
					payloadBytes = new Uint8Array(payloadBytes);
				else if (!(payloadBytes instanceof Uint8Array))
					payloadBytes = new Uint8Array(payloadBytes.buffer);
				break;

			case MESSAGE_TYPE.DISCONNECT:
				break;

			default:
				break;
			}

			// Now we can allocate a buffer for the message

			var mbi = encodeMBI(remLength);  // Convert the length to MQTT MBI format
			var pos = mbi.length + 1;        // Offset of start of variable header
			var buffer = new ArrayBuffer(remLength + pos);
			var byteStream = new Uint8Array(buffer);    // view it as a sequence of bytes

			//Write the fixed header into the buffer
			byteStream[0] = first;
			byteStream.set(mbi,1);

			// If this is a PUBLISH then the variable header starts with a topic
			if (this.type == MESSAGE_TYPE.PUBLISH)
				pos = writeString(this.payloadMessage.destinationName, destinationNameLength, byteStream, pos);
			// If this is a CONNECT then the variable header contains the protocol name/version, flags and keepalive time

			else if (this.type == MESSAGE_TYPE.CONNECT) {
				switch (this.mqttVersion) {
				case 3:
					byteStream.set(MqttProtoIdentifierv3, pos);
					pos += MqttProtoIdentifierv3.length;
					break;
				case 4:
					byteStream.set(MqttProtoIdentifierv4, pos);
					pos += MqttProtoIdentifierv4.length;
					break;
				}
				var connectFlags = 0;
				if (this.cleanSession)
					connectFlags = 0x02;
				if (this.willMessage !== undefined ) {
					connectFlags |= 0x04;
					connectFlags |= (this.willMessage.qos<<3);
					if (this.willMessage.retained) {
						connectFlags |= 0x20;
					}
				}
				if (this.userName !== undefined)
					connectFlags |= 0x80;
				if (this.password !== undefined)
					connectFlags |= 0x40;
				byteStream[pos++] = connectFlags;
				pos = writeUint16 (this.keepAliveInterval, byteStream, pos);
			}

			// Output the messageIdentifier - if there is one
			if (this.messageIdentifier !== undefined)
				pos = writeUint16 (this.messageIdentifier, byteStream, pos);

			switch(this.type) {
			case MESSAGE_TYPE.CONNECT:
				pos = writeString(this.clientId, UTF8Length(this.clientId), byteStream, pos);
				if (this.willMessage !== undefined) {
					pos = writeString(this.willMessage.destinationName, UTF8Length(this.willMessage.destinationName), byteStream, pos);
					pos = writeUint16(willMessagePayloadBytes.byteLength, byteStream, pos);
					byteStream.set(willMessagePayloadBytes, pos);
					pos += willMessagePayloadBytes.byteLength;

				}
				if (this.userName !== undefined)
					pos = writeString(this.userName, UTF8Length(this.userName), byteStream, pos);
				if (this.password !== undefined)
					pos = writeString(this.password, UTF8Length(this.password), byteStream, pos);
				break;

			case MESSAGE_TYPE.PUBLISH:
				// PUBLISH has a text or binary payload, if text do not add a 2 byte length field, just the UTF characters.
				byteStream.set(payloadBytes, pos);

				break;

				//    	    case MESSAGE_TYPE.PUBREC:
				//    	    case MESSAGE_TYPE.PUBREL:
				//    	    case MESSAGE_TYPE.PUBCOMP:
				//    	    	break;

			case MESSAGE_TYPE.SUBSCRIBE:
				// SUBSCRIBE has a list of topic strings and request QoS
				for (var i=0; i<this.topics.length; i++) {
					pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
					byteStream[pos++] = this.requestedQos[i];
				}
				break;

			case MESSAGE_TYPE.UNSUBSCRIBE:
				// UNSUBSCRIBE has a list of topic strings
				for (var i=0; i<this.topics.length; i++)
					pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
				break;

			default:
				// Do nothing.
			}

			return buffer;
		};

		function decodeMessage(input,pos) {
			var startingPos = pos;
			var first = input[pos];
			var type = first >> 4;
			var messageInfo = first &= 0x0f;
			pos += 1;


			// Decode the remaining length (MBI format)

			var digit;
			var remLength = 0;
			var multiplier = 1;
			do {
				if (pos == input.length) {
					return [null,startingPos];
				}
				digit = input[pos++];
				remLength += ((digit & 0x7F) * multiplier);
				multiplier *= 128;
			} while ((digit & 0x80) !== 0);

			var endPos = pos+remLength;
			if (endPos > input.length) {
				return [null,startingPos];
			}

			var wireMessage = new WireMessage(type);
			switch(type) {
			case MESSAGE_TYPE.CONNACK:
				var connectAcknowledgeFlags = input[pos++];
				if (connectAcknowledgeFlags & 0x01)
					wireMessage.sessionPresent = true;
				wireMessage.returnCode = input[pos++];
				break;

			case MESSAGE_TYPE.PUBLISH:
				var qos = (messageInfo >> 1) & 0x03;

				var len = readUint16(input, pos);
				pos += 2;
				var topicName = parseUTF8(input, pos, len);
				pos += len;
				// If QoS 1 or 2 there will be a messageIdentifier
				if (qos > 0) {
					wireMessage.messageIdentifier = readUint16(input, pos);
					pos += 2;
				}

				var message = new Message(input.subarray(pos, endPos));
				if ((messageInfo & 0x01) == 0x01)
					message.retained = true;
				if ((messageInfo & 0x08) == 0x08)
					message.duplicate =  true;
				message.qos = qos;
				message.destinationName = topicName;
				wireMessage.payloadMessage = message;
				break;

			case  MESSAGE_TYPE.PUBACK:
			case  MESSAGE_TYPE.PUBREC:
			case  MESSAGE_TYPE.PUBREL:
			case  MESSAGE_TYPE.PUBCOMP:
			case  MESSAGE_TYPE.UNSUBACK:
				wireMessage.messageIdentifier = readUint16(input, pos);
				break;

			case  MESSAGE_TYPE.SUBACK:
				wireMessage.messageIdentifier = readUint16(input, pos);
				pos += 2;
				wireMessage.returnCode = input.subarray(pos, endPos);
				break;

			default:
				break;
			}

			return [wireMessage,endPos];
		}

		function writeUint16(input, buffer, offset) {
			buffer[offset++] = input >> 8;      //MSB
			buffer[offset++] = input % 256;     //LSB
			return offset;
		}

		function writeString(input, utf8Length, buffer, offset) {
			offset = writeUint16(utf8Length, buffer, offset);
			stringToUTF8(input, buffer, offset);
			return offset + utf8Length;
		}

		function readUint16(buffer, offset) {
			return 256*buffer[offset] + buffer[offset+1];
		}

		/**
	 * Encodes an MQTT Multi-Byte Integer
	 * @private
	 */
		function encodeMBI(number) {
			var output = new Array(1);
			var numBytes = 0;

			do {
				var digit = number % 128;
				number = number >> 7;
				if (number > 0) {
					digit |= 0x80;
				}
				output[numBytes++] = digit;
			} while ( (number > 0) && (numBytes<4) );

			return output;
		}

		/**
	 * Takes a String and calculates its length in bytes when encoded in UTF8.
	 * @private
	 */
		function UTF8Length(input) {
			var output = 0;
			for (var i = 0; i<input.length; i++)
			{
				var charCode = input.charCodeAt(i);
				if (charCode > 0x7FF)
				{
					// Surrogate pair means its a 4 byte character
					if (0xD800 <= charCode && charCode <= 0xDBFF)
					{
						i++;
						output++;
					}
					output +=3;
				}
				else if (charCode > 0x7F)
					output +=2;
				else
					output++;
			}
			return output;
		}

		/**
	 * Takes a String and writes it into an array as UTF8 encoded bytes.
	 * @private
	 */
		function stringToUTF8(input, output, start) {
			var pos = start;
			for (var i = 0; i<input.length; i++) {
				var charCode = input.charCodeAt(i);

				// Check for a surrogate pair.
				if (0xD800 <= charCode && charCode <= 0xDBFF) {
					var lowCharCode = input.charCodeAt(++i);
					if (isNaN(lowCharCode)) {
						throw new Error(format(ERROR.MALFORMED_UNICODE, [charCode, lowCharCode]));
					}
					charCode = ((charCode - 0xD800)<<10) + (lowCharCode - 0xDC00) + 0x10000;

				}

				if (charCode <= 0x7F) {
					output[pos++] = charCode;
				} else if (charCode <= 0x7FF) {
					output[pos++] = charCode>>6  & 0x1F | 0xC0;
					output[pos++] = charCode     & 0x3F | 0x80;
				} else if (charCode <= 0xFFFF) {
					output[pos++] = charCode>>12 & 0x0F | 0xE0;
					output[pos++] = charCode>>6  & 0x3F | 0x80;
					output[pos++] = charCode     & 0x3F | 0x80;
				} else {
					output[pos++] = charCode>>18 & 0x07 | 0xF0;
					output[pos++] = charCode>>12 & 0x3F | 0x80;
					output[pos++] = charCode>>6  & 0x3F | 0x80;
					output[pos++] = charCode     & 0x3F | 0x80;
				}
			}
			return output;
		}

		function parseUTF8(input, offset, length) {
			var output = "";
			var utf16;
			var pos = offset;

			while (pos < offset+length)
			{
				var byte1 = input[pos++];
				if (byte1 < 128)
					utf16 = byte1;
				else
				{
					var byte2 = input[pos++]-128;
					if (byte2 < 0)
						throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16),""]));
					if (byte1 < 0xE0)             // 2 byte character
						utf16 = 64*(byte1-0xC0) + byte2;
					else
					{
						var byte3 = input[pos++]-128;
						if (byte3 < 0)
							throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16)]));
						if (byte1 < 0xF0)        // 3 byte character
							utf16 = 4096*(byte1-0xE0) + 64*byte2 + byte3;
						else
						{
							var byte4 = input[pos++]-128;
							if (byte4 < 0)
								throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
							if (byte1 < 0xF8)        // 4 byte character
								utf16 = 262144*(byte1-0xF0) + 4096*byte2 + 64*byte3 + byte4;
							else                     // longer encodings are not supported
								throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
						}
					}
				}

				if (utf16 > 0xFFFF)   // 4 byte character - express as a surrogate pair
				{
					utf16 -= 0x10000;
					output += String.fromCharCode(0xD800 + (utf16 >> 10)); // lead character
					utf16 = 0xDC00 + (utf16 & 0x3FF);  // trail character
				}
				output += String.fromCharCode(utf16);
			}
			return output;
		}

		/**
	 * Repeat keepalive requests, monitor responses.
	 * @ignore
	 */
		var Pinger = function(client, keepAliveInterval) {
			this._client = client;
			this._keepAliveInterval = keepAliveInterval*1000;
			this.isReset = false;

			var pingReq = new WireMessage(MESSAGE_TYPE.PINGREQ).encode();

			var doTimeout = function (pinger) {
				return function () {
					return doPing.apply(pinger);
				};
			};

			/** @ignore */
			var doPing = function() {
				if (!this.isReset) {
					this._client._trace("Pinger.doPing", "Timed out");
					this._client._disconnected( ERROR.PING_TIMEOUT.code , format(ERROR.PING_TIMEOUT));
				} else {
					this.isReset = false;
					this._client._trace("Pinger.doPing", "send PINGREQ");
					this._client.socket.send(pingReq);
					this.timeout = setTimeout(doTimeout(this), this._keepAliveInterval);
				}
			};

			this.reset = function() {
				this.isReset = true;
				clearTimeout(this.timeout);
				if (this._keepAliveInterval > 0)
					this.timeout = setTimeout(doTimeout(this), this._keepAliveInterval);
			};

			this.cancel = function() {
				clearTimeout(this.timeout);
			};
		};

		/**
	 * Monitor request completion.
	 * @ignore
	 */
		var Timeout = function(client, timeoutSeconds, action, args) {
			if (!timeoutSeconds)
				timeoutSeconds = 30;

			var doTimeout = function (action, client, args) {
				return function () {
					return action.apply(client, args);
				};
			};
			this.timeout = setTimeout(doTimeout(action, client, args), timeoutSeconds * 1000);

			this.cancel = function() {
				clearTimeout(this.timeout);
			};
		};

	/**
	 * Internal implementation of the Websockets MQTT V3.1 client.
	 *
	 * @name Paho.ClientImpl @constructor
	 * @param {String} host the DNS nameof the webSocket host.
	 * @param {Number} port the port number for that host.
	 * @param {String} clientId the MQ client identifier.
	 */
		var ClientImpl = function (uri, host, port, path, clientId) {
		// Check dependencies are satisfied in this browser.
			if (!("WebSocket" in global && global.WebSocket !== null)) {
				throw new Error(format(ERROR.UNSUPPORTED, ["WebSocket"]));
			}
			if (!("ArrayBuffer" in global && global.ArrayBuffer !== null)) {
				throw new Error(format(ERROR.UNSUPPORTED, ["ArrayBuffer"]));
			}
			this._trace("Paho.Client", uri, host, port, path, clientId);

			this.host = host;
			this.port = port;
			this.path = path;
			this.uri = uri;
			this.clientId = clientId;
			this._wsuri = null;

			// Local storagekeys are qualified with the following string.
			// The conditional inclusion of path in the key is for backward
			// compatibility to when the path was not configurable and assumed to
			// be /mqtt
			this._localKey=host+":"+port+(path!="/mqtt"?":"+path:"")+":"+clientId+":";

			// Create private instance-only message queue
			// Internal queue of messages to be sent, in sending order.
			this._msg_queue = [];
			this._buffered_msg_queue = [];

			// Messages we have sent and are expecting a response for, indexed by their respective message ids.
			this._sentMessages = {};

			// Messages we have received and acknowleged and are expecting a confirm message for
			// indexed by their respective message ids.
			this._receivedMessages = {};

			// Internal list of callbacks to be executed when messages
			// have been successfully sent over web socket, e.g. disconnect
			// when it doesn't have to wait for ACK, just message is dispatched.
			this._notify_msg_sent = {};

			// Unique identifier for SEND messages, incrementing
			// counter as messages are sent.
			this._message_identifier = 1;

			// Used to determine the transmission sequence of stored sent messages.
			this._sequence = 0;


			// Load the local state, if any, from the saved version, only restore state relevant to this client.
			for (var key in localStorage)
				if (   key.indexOf("Sent:"+this._localKey) === 0 || key.indexOf("Received:"+this._localKey) === 0)
					this.restore(key);
		};

		// Messaging Client public instance members.
		ClientImpl.prototype.host = null;
		ClientImpl.prototype.port = null;
		ClientImpl.prototype.path = null;
		ClientImpl.prototype.uri = null;
		ClientImpl.prototype.clientId = null;

		// Messaging Client private instance members.
		ClientImpl.prototype.socket = null;
		/* true once we have received an acknowledgement to a CONNECT packet. */
		ClientImpl.prototype.connected = false;
		/* The largest message identifier allowed, may not be larger than 2**16 but
		 * if set smaller reduces the maximum number of outbound messages allowed.
		 */
		ClientImpl.prototype.maxMessageIdentifier = 65536;
		ClientImpl.prototype.connectOptions = null;
		ClientImpl.prototype.hostIndex = null;
		ClientImpl.prototype.onConnected = null;
		ClientImpl.prototype.onConnectionLost = null;
		ClientImpl.prototype.onMessageDelivered = null;
		ClientImpl.prototype.onMessageArrived = null;
		ClientImpl.prototype.traceFunction = null;
		ClientImpl.prototype._msg_queue = null;
		ClientImpl.prototype._buffered_msg_queue = null;
		ClientImpl.prototype._connectTimeout = null;
		/* The sendPinger monitors how long we allow before we send data to prove to the server that we are alive. */
		ClientImpl.prototype.sendPinger = null;
		/* The receivePinger monitors how long we allow before we require evidence that the server is alive. */
		ClientImpl.prototype.receivePinger = null;
		ClientImpl.prototype._reconnectInterval = 1; // Reconnect Delay, starts at 1 second
		ClientImpl.prototype._reconnecting = false;
		ClientImpl.prototype._reconnectTimeout = null;
		ClientImpl.prototype.disconnectedPublishing = false;
		ClientImpl.prototype.disconnectedBufferSize = 5000;

		ClientImpl.prototype.receiveBuffer = null;

		ClientImpl.prototype._traceBuffer = null;
		ClientImpl.prototype._MAX_TRACE_ENTRIES = 100;

		ClientImpl.prototype.connect = function (connectOptions) {
			var connectOptionsMasked = this._traceMask(connectOptions, "password");
			this._trace("Client.connect", connectOptionsMasked, this.socket, this.connected);

			if (this.connected)
				throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));
			if (this.socket)
				throw new Error(format(ERROR.INVALID_STATE, ["already connected"]));

			if (this._reconnecting) {
			// connect() function is called while reconnect is in progress.
			// Terminate the auto reconnect process to use new connect options.
				this._reconnectTimeout.cancel();
				this._reconnectTimeout = null;
				this._reconnecting = false;
			}

			this.connectOptions = connectOptions;
			this._reconnectInterval = 1;
			this._reconnecting = false;
			if (connectOptions.uris) {
				this.hostIndex = 0;
				this._doConnect(connectOptions.uris[0]);
			} else {
				this._doConnect(this.uri);
			}

		};

		ClientImpl.prototype.subscribe = function (filter, subscribeOptions) {
			this._trace("Client.subscribe", filter, subscribeOptions);

			if (!this.connected)
				throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

            var wireMessage = new WireMessage(MESSAGE_TYPE.SUBSCRIBE);
            wireMessage.topics = filter.constructor === Array ? filter : [filter];
            if (subscribeOptions.qos === undefined)
                subscribeOptions.qos = 0;
            wireMessage.requestedQos = [];
            for (var i = 0; i < wireMessage.topics.length; i++)
                wireMessage.requestedQos[i] = subscribeOptions.qos;

			if (subscribeOptions.onSuccess) {
				wireMessage.onSuccess = function(grantedQos) {subscribeOptions.onSuccess({invocationContext:subscribeOptions.invocationContext,grantedQos:grantedQos});};
			}

			if (subscribeOptions.onFailure) {
				wireMessage.onFailure = function(errorCode) {subscribeOptions.onFailure({invocationContext:subscribeOptions.invocationContext,errorCode:errorCode, errorMessage:format(errorCode)});};
			}

			if (subscribeOptions.timeout) {
				wireMessage.timeOut = new Timeout(this, subscribeOptions.timeout, subscribeOptions.onFailure,
					[{invocationContext:subscribeOptions.invocationContext,
						errorCode:ERROR.SUBSCRIBE_TIMEOUT.code,
						errorMessage:format(ERROR.SUBSCRIBE_TIMEOUT)}]);
			}

			// All subscriptions return a SUBACK.
			this._requires_ack(wireMessage);
			this._schedule_message(wireMessage);
		};

		/** @ignore */
		ClientImpl.prototype.unsubscribe = function(filter, unsubscribeOptions) {
			this._trace("Client.unsubscribe", filter, unsubscribeOptions);

			if (!this.connected)
				throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));

            var wireMessage = new WireMessage(MESSAGE_TYPE.UNSUBSCRIBE);
            wireMessage.topics = filter.constructor === Array ? filter : [filter];

			if (unsubscribeOptions.onSuccess) {
				wireMessage.callback = function() {unsubscribeOptions.onSuccess({invocationContext:unsubscribeOptions.invocationContext});};
			}
			if (unsubscribeOptions.timeout) {
				wireMessage.timeOut = new Timeout(this, unsubscribeOptions.timeout, unsubscribeOptions.onFailure,
					[{invocationContext:unsubscribeOptions.invocationContext,
						errorCode:ERROR.UNSUBSCRIBE_TIMEOUT.code,
						errorMessage:format(ERROR.UNSUBSCRIBE_TIMEOUT)}]);
			}

			// All unsubscribes return a SUBACK.
			this._requires_ack(wireMessage);
			this._schedule_message(wireMessage);
		};

		ClientImpl.prototype.send = function (message) {
			this._trace("Client.send", message);

			var wireMessage = new WireMessage(MESSAGE_TYPE.PUBLISH);
			wireMessage.payloadMessage = message;

			if (this.connected) {
			// Mark qos 1 & 2 message as "ACK required"
			// For qos 0 message, invoke onMessageDelivered callback if there is one.
			// Then schedule the message.
				if (message.qos > 0) {
					this._requires_ack(wireMessage);
				} else if (this.onMessageDelivered) {
					this._notify_msg_sent[wireMessage] = this.onMessageDelivered(wireMessage.payloadMessage);
				}
				this._schedule_message(wireMessage);
			} else {
			// Currently disconnected, will not schedule this message
			// Check if reconnecting is in progress and disconnected publish is enabled.
				if (this._reconnecting && this.disconnectedPublishing) {
				// Check the limit which include the "required ACK" messages
					var messageCount = Object.keys(this._sentMessages).length + this._buffered_msg_queue.length;
					if (messageCount > this.disconnectedBufferSize) {
						throw new Error(format(ERROR.BUFFER_FULL, [this.disconnectedBufferSize]));
					} else {
						if (message.qos > 0) {
						// Mark this message as "ACK required"
							this._requires_ack(wireMessage);
						} else {
							wireMessage.sequence = ++this._sequence;
							// Add messages in fifo order to array, by adding to start
							this._buffered_msg_queue.unshift(wireMessage);
						}
					}
				} else {
					throw new Error(format(ERROR.INVALID_STATE, ["not connected"]));
				}
			}
		};

		ClientImpl.prototype.disconnect = function () {
			this._trace("Client.disconnect");

			if (this._reconnecting) {
			// disconnect() function is called while reconnect is in progress.
			// Terminate the auto reconnect process.
				this._reconnectTimeout.cancel();
				this._reconnectTimeout = null;
				this._reconnecting = false;
			}

			if (!this.socket)
				throw new Error(format(ERROR.INVALID_STATE, ["not connecting or connected"]));

			var wireMessage = new WireMessage(MESSAGE_TYPE.DISCONNECT);

			// Run the disconnected call back as soon as the message has been sent,
			// in case of a failure later on in the disconnect processing.
			// as a consequence, the _disconected call back may be run several times.
			this._notify_msg_sent[wireMessage] = scope(this._disconnected, this);

			this._schedule_message(wireMessage);
		};

		ClientImpl.prototype.getTraceLog = function () {
			if ( this._traceBuffer !== null ) {
				this._trace("Client.getTraceLog", new Date());
				this._trace("Client.getTraceLog in flight messages", this._sentMessages.length);
				for (var key in this._sentMessages)
					this._trace("_sentMessages ",key, this._sentMessages[key]);
				for (var key in this._receivedMessages)
					this._trace("_receivedMessages ",key, this._receivedMessages[key]);

				return this._traceBuffer;
			}
		};

		ClientImpl.prototype.startTrace = function () {
			if ( this._traceBuffer === null ) {
				this._traceBuffer = [];
			}
			this._trace("Client.startTrace", new Date(), version);
		};

		ClientImpl.prototype.stopTrace = function () {
			delete this._traceBuffer;
		};

		ClientImpl.prototype._doConnect = function (wsurl) {
		// When the socket is open, this client will send the CONNECT WireMessage using the saved parameters.
			if (this.connectOptions.useSSL) {
				var uriParts = wsurl.split(":");
				uriParts[0] = "wss";
				wsurl = uriParts.join(":");
			}
			this._wsuri = wsurl;
			this.connected = false;



			if (this.connectOptions.mqttVersion < 4) {
				this.socket = new WebSocket(wsurl, ["mqttv3.1"]);
			} else {
				this.socket = new WebSocket(wsurl, ["mqtt"]);
			}
			this.socket.binaryType = "arraybuffer";
			this.socket.onopen = scope(this._on_socket_open, this);
			this.socket.onmessage = scope(this._on_socket_message, this);
			this.socket.onerror = scope(this._on_socket_error, this);
			this.socket.onclose = scope(this._on_socket_close, this);

			this.sendPinger = new Pinger(this, this.connectOptions.keepAliveInterval);
			this.receivePinger = new Pinger(this, this.connectOptions.keepAliveInterval);
			if (this._connectTimeout) {
				this._connectTimeout.cancel();
				this._connectTimeout = null;
			}
			this._connectTimeout = new Timeout(this, this.connectOptions.timeout, this._disconnected,  [ERROR.CONNECT_TIMEOUT.code, format(ERROR.CONNECT_TIMEOUT)]);
		};


		// Schedule a new message to be sent over the WebSockets
		// connection. CONNECT messages cause WebSocket connection
		// to be started. All other messages are queued internally
		// until this has happened. When WS connection starts, process
		// all outstanding messages.
		ClientImpl.prototype._schedule_message = function (message) {
			// Add messages in fifo order to array, by adding to start
			this._msg_queue.unshift(message);
			// Process outstanding messages in the queue if we have an  open socket, and have received CONNACK.
			if (this.connected) {
				this._process_queue();
			}
		};

		ClientImpl.prototype.store = function(prefix, wireMessage) {
			var storedMessage = {type:wireMessage.type, messageIdentifier:wireMessage.messageIdentifier, version:1};

			switch(wireMessage.type) {
			case MESSAGE_TYPE.PUBLISH:
				if(wireMessage.pubRecReceived)
					storedMessage.pubRecReceived = true;

				// Convert the payload to a hex string.
				storedMessage.payloadMessage = {};
				var hex = "";
				var messageBytes = wireMessage.payloadMessage.payloadBytes;
				for (var i=0; i<messageBytes.length; i++) {
					if (messageBytes[i] <= 0xF)
						hex = hex+"0"+messageBytes[i].toString(16);
					else
						hex = hex+messageBytes[i].toString(16);
				}
				storedMessage.payloadMessage.payloadHex = hex;

				storedMessage.payloadMessage.qos = wireMessage.payloadMessage.qos;
				storedMessage.payloadMessage.destinationName = wireMessage.payloadMessage.destinationName;
				if (wireMessage.payloadMessage.duplicate)
					storedMessage.payloadMessage.duplicate = true;
				if (wireMessage.payloadMessage.retained)
					storedMessage.payloadMessage.retained = true;

				// Add a sequence number to sent messages.
				if ( prefix.indexOf("Sent:") === 0 ) {
					if ( wireMessage.sequence === undefined )
						wireMessage.sequence = ++this._sequence;
					storedMessage.sequence = wireMessage.sequence;
				}
				break;

			default:
				throw Error(format(ERROR.INVALID_STORED_DATA, [prefix+this._localKey+wireMessage.messageIdentifier, storedMessage]));
			}
			localStorage.setItem(prefix+this._localKey+wireMessage.messageIdentifier, JSON.stringify(storedMessage));
		};

		ClientImpl.prototype.restore = function(key) {
			var value = localStorage.getItem(key);
			var storedMessage = JSON.parse(value);

			var wireMessage = new WireMessage(storedMessage.type, storedMessage);

			switch(storedMessage.type) {
			case MESSAGE_TYPE.PUBLISH:
				// Replace the payload message with a Message object.
				var hex = storedMessage.payloadMessage.payloadHex;
				var buffer = new ArrayBuffer((hex.length)/2);
				var byteStream = new Uint8Array(buffer);
				var i = 0;
				while (hex.length >= 2) {
					var x = parseInt(hex.substring(0, 2), 16);
					hex = hex.substring(2, hex.length);
					byteStream[i++] = x;
				}
				var payloadMessage = new Message(byteStream);

				payloadMessage.qos = storedMessage.payloadMessage.qos;
				payloadMessage.destinationName = storedMessage.payloadMessage.destinationName;
				if (storedMessage.payloadMessage.duplicate)
					payloadMessage.duplicate = true;
				if (storedMessage.payloadMessage.retained)
					payloadMessage.retained = true;
				wireMessage.payloadMessage = payloadMessage;

				break;

			default:
				throw Error(format(ERROR.INVALID_STORED_DATA, [key, value]));
			}

			if (key.indexOf("Sent:"+this._localKey) === 0) {
				wireMessage.payloadMessage.duplicate = true;
				this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
			} else if (key.indexOf("Received:"+this._localKey) === 0) {
				this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
			}
		};

		ClientImpl.prototype._process_queue = function () {
			var message = null;

			// Send all queued messages down socket connection
			while ((message = this._msg_queue.pop())) {
				this._socket_send(message);
				// Notify listeners that message was successfully sent
				if (this._notify_msg_sent[message]) {
					this._notify_msg_sent[message]();
					delete this._notify_msg_sent[message];
				}
			}
		};

		/**
	 * Expect an ACK response for this message. Add message to the set of in progress
	 * messages and set an unused identifier in this message.
	 * @ignore
	 */
		ClientImpl.prototype._requires_ack = function (wireMessage) {
			var messageCount = Object.keys(this._sentMessages).length;
			if (messageCount > this.maxMessageIdentifier)
				throw Error ("Too many messages:"+messageCount);

			while(this._sentMessages[this._message_identifier] !== undefined) {
				this._message_identifier++;
			}
			wireMessage.messageIdentifier = this._message_identifier;
			this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
			if (wireMessage.type === MESSAGE_TYPE.PUBLISH) {
				this.store("Sent:", wireMessage);
			}
			if (this._message_identifier === this.maxMessageIdentifier) {
				this._message_identifier = 1;
			}
		};

		/**
	 * Called when the underlying websocket has been opened.
	 * @ignore
	 */
		ClientImpl.prototype._on_socket_open = function () {
		// Create the CONNECT message object.
			var wireMessage = new WireMessage(MESSAGE_TYPE.CONNECT, this.connectOptions);
			wireMessage.clientId = this.clientId;
			this._socket_send(wireMessage);
		};

		/**
	 * Called when the underlying websocket has received a complete packet.
	 * @ignore
	 */
		ClientImpl.prototype._on_socket_message = function (event) {
			this._trace("Client._on_socket_message", event.data);
			var messages = this._deframeMessages(event.data);
			for (var i = 0; i < messages.length; i+=1) {
				this._handleMessage(messages[i]);
			}
		};

		ClientImpl.prototype._deframeMessages = function(data) {
			var byteArray = new Uint8Array(data);
			var messages = [];
			if (this.receiveBuffer) {
				var newData = new Uint8Array(this.receiveBuffer.length+byteArray.length);
				newData.set(this.receiveBuffer);
				newData.set(byteArray,this.receiveBuffer.length);
				byteArray = newData;
				delete this.receiveBuffer;
			}
			try {
				var offset = 0;
				while(offset < byteArray.length) {
					var result = decodeMessage(byteArray,offset);
					var wireMessage = result[0];
					offset = result[1];
					if (wireMessage !== null) {
						messages.push(wireMessage);
					} else {
						break;
					}
				}
				if (offset < byteArray.length) {
					this.receiveBuffer = byteArray.subarray(offset);
				}
			} catch (error) {
				var errorStack = ((error.hasOwnProperty("stack") == "undefined") ? error.stack.toString() : "No Error Stack Available");
				this._disconnected(ERROR.INTERNAL_ERROR.code , format(ERROR.INTERNAL_ERROR, [error.message,errorStack]));
				return;
			}
			return messages;
		};

		ClientImpl.prototype._handleMessage = function(wireMessage) {

			this._trace("Client._handleMessage", wireMessage);

			try {
				switch(wireMessage.type) {
				case MESSAGE_TYPE.CONNACK:
					this._connectTimeout.cancel();
					if (this._reconnectTimeout)
						this._reconnectTimeout.cancel();

					// If we have started using clean session then clear up the local state.
					if (this.connectOptions.cleanSession) {
						for (var key in this._sentMessages) {
							var sentMessage = this._sentMessages[key];
							localStorage.removeItem("Sent:"+this._localKey+sentMessage.messageIdentifier);
						}
						this._sentMessages = {};

						for (var key in this._receivedMessages) {
							var receivedMessage = this._receivedMessages[key];
							localStorage.removeItem("Received:"+this._localKey+receivedMessage.messageIdentifier);
						}
						this._receivedMessages = {};
					}
					// Client connected and ready for business.
					if (wireMessage.returnCode === 0) {

						this.connected = true;
						// Jump to the end of the list of uris and stop looking for a good host.

						if (this.connectOptions.uris)
							this.hostIndex = this.connectOptions.uris.length;

					} else {
						this._disconnected(ERROR.CONNACK_RETURNCODE.code , format(ERROR.CONNACK_RETURNCODE, [wireMessage.returnCode, CONNACK_RC[wireMessage.returnCode]]));
						break;
					}

					// Resend messages.
					var sequencedMessages = [];
					for (var msgId in this._sentMessages) {
						if (this._sentMessages.hasOwnProperty(msgId))
							sequencedMessages.push(this._sentMessages[msgId]);
					}

					// Also schedule qos 0 buffered messages if any
					if (this._buffered_msg_queue.length > 0) {
						var msg = null;
						while ((msg = this._buffered_msg_queue.pop())) {
							sequencedMessages.push(msg);
							if (this.onMessageDelivered)
								this._notify_msg_sent[msg] = this.onMessageDelivered(msg.payloadMessage);
						}
					}

					// Sort sentMessages into the original sent order.
					var sequencedMessages = sequencedMessages.sort(function(a,b) {return a.sequence - b.sequence;} );
					for (var i=0, len=sequencedMessages.length; i<len; i++) {
						var sentMessage = sequencedMessages[i];
						if (sentMessage.type == MESSAGE_TYPE.PUBLISH && sentMessage.pubRecReceived) {
							var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, {messageIdentifier:sentMessage.messageIdentifier});
							this._schedule_message(pubRelMessage);
						} else {
							this._schedule_message(sentMessage);
						}
					}

					// Execute the connectOptions.onSuccess callback if there is one.
					// Will also now return if this connection was the result of an automatic
					// reconnect and which URI was successfully connected to.
					if (this.connectOptions.onSuccess) {
						this.connectOptions.onSuccess({invocationContext:this.connectOptions.invocationContext});
					}

					var reconnected = false;
					if (this._reconnecting) {
						reconnected = true;
						this._reconnectInterval = 1;
						this._reconnecting = false;
					}

					// Execute the onConnected callback if there is one.
					this._connected(reconnected, this._wsuri);

					// Process all queued messages now that the connection is established.
					this._process_queue();
					break;

				case MESSAGE_TYPE.PUBLISH:
					this._receivePublish(wireMessage);
					break;

				case MESSAGE_TYPE.PUBACK:
					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
					// If this is a re flow of a PUBACK after we have restarted receivedMessage will not exist.
					if (sentMessage) {
						delete this._sentMessages[wireMessage.messageIdentifier];
						localStorage.removeItem("Sent:"+this._localKey+wireMessage.messageIdentifier);
						if (this.onMessageDelivered)
							this.onMessageDelivered(sentMessage.payloadMessage);
					}
					break;

				case MESSAGE_TYPE.PUBREC:
					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
					// If this is a re flow of a PUBREC after we have restarted receivedMessage will not exist.
					if (sentMessage) {
						sentMessage.pubRecReceived = true;
						var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, {messageIdentifier:wireMessage.messageIdentifier});
						this.store("Sent:", sentMessage);
						this._schedule_message(pubRelMessage);
					}
					break;

				case MESSAGE_TYPE.PUBREL:
					var receivedMessage = this._receivedMessages[wireMessage.messageIdentifier];
					localStorage.removeItem("Received:"+this._localKey+wireMessage.messageIdentifier);
					// If this is a re flow of a PUBREL after we have restarted receivedMessage will not exist.
					if (receivedMessage) {
						this._receiveMessage(receivedMessage);
						delete this._receivedMessages[wireMessage.messageIdentifier];
					}
					// Always flow PubComp, we may have previously flowed PubComp but the server lost it and restarted.
					var pubCompMessage = new WireMessage(MESSAGE_TYPE.PUBCOMP, {messageIdentifier:wireMessage.messageIdentifier});
					this._schedule_message(pubCompMessage);


					break;

				case MESSAGE_TYPE.PUBCOMP:
					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
					delete this._sentMessages[wireMessage.messageIdentifier];
					localStorage.removeItem("Sent:"+this._localKey+wireMessage.messageIdentifier);
					if (this.onMessageDelivered)
						this.onMessageDelivered(sentMessage.payloadMessage);
					break;

				case MESSAGE_TYPE.SUBACK:
					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
					if (sentMessage) {
						if(sentMessage.timeOut)
							sentMessage.timeOut.cancel();
						// This will need to be fixed when we add multiple topic support
						if (wireMessage.returnCode[0] === 0x80) {
							if (sentMessage.onFailure) {
								sentMessage.onFailure(wireMessage.returnCode);
							}
						} else if (sentMessage.onSuccess) {
							sentMessage.onSuccess(wireMessage.returnCode);
						}
						delete this._sentMessages[wireMessage.messageIdentifier];
					}
					break;

				case MESSAGE_TYPE.UNSUBACK:
					var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
					if (sentMessage) {
						if (sentMessage.timeOut)
							sentMessage.timeOut.cancel();
						if (sentMessage.callback) {
							sentMessage.callback();
						}
						delete this._sentMessages[wireMessage.messageIdentifier];
					}

					break;

				case MESSAGE_TYPE.PINGRESP:
				/* The sendPinger or receivePinger may have sent a ping, the receivePinger has already been reset. */
					this.sendPinger.reset();
					break;

				case MESSAGE_TYPE.DISCONNECT:
				// Clients do not expect to receive disconnect packets.
					this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code , format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
					break;

				default:
					this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code , format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
				}
			} catch (error) {
				var errorStack = ((error.hasOwnProperty("stack") == "undefined") ? error.stack.toString() : "No Error Stack Available");
				this._disconnected(ERROR.INTERNAL_ERROR.code , format(ERROR.INTERNAL_ERROR, [error.message,errorStack]));
				return;
			}
		};

		/** @ignore */
		ClientImpl.prototype._on_socket_error = function (error) {
			if (!this._reconnecting) {
				this._disconnected(ERROR.SOCKET_ERROR.code , format(ERROR.SOCKET_ERROR, [error.data]));
			}
		};

		/** @ignore */
		ClientImpl.prototype._on_socket_close = function () {
			if (!this._reconnecting) {
				this._disconnected(ERROR.SOCKET_CLOSE.code , format(ERROR.SOCKET_CLOSE));
			}
		};

		/** @ignore */
		ClientImpl.prototype._socket_send = function (wireMessage) {

			if (wireMessage.type == 1) {
				var wireMessageMasked = this._traceMask(wireMessage, "password");
				this._trace("Client._socket_send", wireMessageMasked);
			}
			else this._trace("Client._socket_send", wireMessage);

			this.socket.send(wireMessage.encode());
			/* We have proved to the server we are alive. */
			this.sendPinger.reset();
		};

		/** @ignore */
		ClientImpl.prototype._receivePublish = function (wireMessage) {
			switch(wireMessage.payloadMessage.qos) {
			case "undefined":
			case 0:
				this._receiveMessage(wireMessage);
				break;

			case 1:
				var pubAckMessage = new WireMessage(MESSAGE_TYPE.PUBACK, {messageIdentifier:wireMessage.messageIdentifier});
				this._schedule_message(pubAckMessage);
				this._receiveMessage(wireMessage);
				break;

			case 2:
				this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
				this.store("Received:", wireMessage);
				var pubRecMessage = new WireMessage(MESSAGE_TYPE.PUBREC, {messageIdentifier:wireMessage.messageIdentifier});
				this._schedule_message(pubRecMessage);

				break;

			default:
				throw Error("Invaild qos=" + wireMessage.payloadMessage.qos);
			}
		};

		/** @ignore */
		ClientImpl.prototype._receiveMessage = function (wireMessage) {
			if (this.onMessageArrived) {
				this.onMessageArrived(wireMessage.payloadMessage);
			}
		};

		/**
	 * Client has connected.
	 * @param {reconnect} [boolean] indicate if this was a result of reconnect operation.
	 * @param {uri} [string] fully qualified WebSocket URI of the server.
	 */
		ClientImpl.prototype._connected = function (reconnect, uri) {
		// Execute the onConnected callback if there is one.
			if (this.onConnected)
				this.onConnected(reconnect, uri);
		};

		/**
	 * Attempts to reconnect the client to the server.
   * For each reconnect attempt, will double the reconnect interval
   * up to 128 seconds.
	 */
		ClientImpl.prototype._reconnect = function () {
			this._trace("Client._reconnect");
			if (!this.connected) {
				this._reconnecting = true;
				this.sendPinger.cancel();
				this.receivePinger.cancel();
				if (this._reconnectInterval < 128)
					this._reconnectInterval = this._reconnectInterval * 2;
				if (this.connectOptions.uris) {
					this.hostIndex = 0;
					this._doConnect(this.connectOptions.uris[0]);
				} else {
					this._doConnect(this.uri);
				}
			}
		};

		/**
	 * Client has disconnected either at its own request or because the server
	 * or network disconnected it. Remove all non-durable state.
	 * @param {errorCode} [number] the error number.
	 * @param {errorText} [string] the error text.
	 * @ignore
	 */
		ClientImpl.prototype._disconnected = function (errorCode, errorText) {
			this._trace("Client._disconnected", errorCode, errorText);

			if (errorCode !== undefined && this._reconnecting) {
				//Continue automatic reconnect process
				this._reconnectTimeout = new Timeout(this, this._reconnectInterval, this._reconnect);
				return;
			}

			this.sendPinger.cancel();
			this.receivePinger.cancel();
			if (this._connectTimeout) {
				this._connectTimeout.cancel();
				this._connectTimeout = null;
			}

			// Clear message buffers.
			this._msg_queue = [];
			this._buffered_msg_queue = [];
			this._notify_msg_sent = {};

			if (this.socket) {
			// Cancel all socket callbacks so that they cannot be driven again by this socket.
				this.socket.onopen = null;
				this.socket.onmessage = null;
				this.socket.onerror = null;
				this.socket.onclose = null;
				if (this.socket.readyState === 1)
					this.socket.close();
				delete this.socket;
			}

			if (this.connectOptions.uris && this.hostIndex < this.connectOptions.uris.length-1) {
			// Try the next host.
				this.hostIndex++;
				this._doConnect(this.connectOptions.uris[this.hostIndex]);
			} else {

				if (errorCode === undefined) {
					errorCode = ERROR.OK.code;
					errorText = format(ERROR.OK);
				}

				// Run any application callbacks last as they may attempt to reconnect and hence create a new socket.
				if (this.connected) {
					this.connected = false;
					// Execute the connectionLostCallback if there is one, and we were connected.
					if (this.onConnectionLost) {
						this.onConnectionLost({errorCode:errorCode, errorMessage:errorText, reconnect:this.connectOptions.reconnect, uri:this._wsuri});
					}
					if (errorCode !== ERROR.OK.code && this.connectOptions.reconnect) {
					// Start automatic reconnect process for the very first time since last successful connect.
						this._reconnectInterval = 1;
						this._reconnect();
						return;
					}
				} else {
				// Otherwise we never had a connection, so indicate that the connect has failed.
					if (this.connectOptions.mqttVersion === 4 && this.connectOptions.mqttVersionExplicit === false) {
						this._trace("Failed to connect V4, dropping back to V3");
						this.connectOptions.mqttVersion = 3;
						if (this.connectOptions.uris) {
							this.hostIndex = 0;
							this._doConnect(this.connectOptions.uris[0]);
						} else {
							this._doConnect(this.uri);
						}
					} else if(this.connectOptions.onFailure) {
						this.connectOptions.onFailure({invocationContext:this.connectOptions.invocationContext, errorCode:errorCode, errorMessage:errorText});
					}
				}
			}
		};

		/** @ignore */
		ClientImpl.prototype._trace = function () {
		// Pass trace message back to client's callback function
			if (this.traceFunction) {
				var args = Array.prototype.slice.call(arguments);
				for (var i in args)
				{
					if (typeof args[i] !== "undefined")
						args.splice(i, 1, JSON.stringify(args[i]));
				}
				var record = args.join("");
				this.traceFunction ({severity: "Debug", message: record	});
			}

			//buffer style trace
			if ( this._traceBuffer !== null ) {
				for (var i = 0, max = arguments.length; i < max; i++) {
					if ( this._traceBuffer.length == this._MAX_TRACE_ENTRIES ) {
						this._traceBuffer.shift();
					}
					if (i === 0) this._traceBuffer.push(arguments[i]);
					else if (typeof arguments[i] === "undefined" ) this._traceBuffer.push(arguments[i]);
					else this._traceBuffer.push("  "+JSON.stringify(arguments[i]));
				}
			}
		};

		/** @ignore */
		ClientImpl.prototype._traceMask = function (traceObject, masked) {
			var traceObjectMasked = {};
			for (var attr in traceObject) {
				if (traceObject.hasOwnProperty(attr)) {
					if (attr == masked)
						traceObjectMasked[attr] = "******";
					else
						traceObjectMasked[attr] = traceObject[attr];
				}
			}
			return traceObjectMasked;
		};

		// ------------------------------------------------------------------------
		// Public Programming interface.
		// ------------------------------------------------------------------------

		/**
	 * The JavaScript application communicates to the server using a {@link Paho.Client} object.
	 * <p>
	 * Most applications will create just one Client object and then call its connect() method,
	 * however applications can create more than one Client object if they wish.
	 * In this case the combination of host, port and clientId attributes must be different for each Client object.
	 * <p>
	 * The send, subscribe and unsubscribe methods are implemented as asynchronous JavaScript methods
	 * (even though the underlying protocol exchange might be synchronous in nature).
	 * This means they signal their completion by calling back to the application,
	 * via Success or Failure callback functions provided by the application on the method in question.
	 * Such callbacks are called at most once per method invocation and do not persist beyond the lifetime
	 * of the script that made the invocation.
	 * <p>
	 * In contrast there are some callback functions, most notably <i>onMessageArrived</i>,
	 * that are defined on the {@link Paho.Client} object.
	 * These may get called multiple times, and aren't directly related to specific method invocations made by the client.
	 *
	 * @name Paho.Client
	 *
	 * @constructor
	 *
	 * @param {string} host - the address of the messaging server, as a fully qualified WebSocket URI, as a DNS name or dotted decimal IP address.
	 * @param {number} port - the port number to connect to - only required if host is not a URI
	 * @param {string} path - the path on the host to connect to - only used if host is not a URI. Default: '/mqtt'.
	 * @param {string} clientId - the Messaging client identifier, between 1 and 23 characters in length.
	 *
	 * @property {string} host - <i>read only</i> the server's DNS hostname or dotted decimal IP address.
	 * @property {number} port - <i>read only</i> the server's port.
	 * @property {string} path - <i>read only</i> the server's path.
	 * @property {string} clientId - <i>read only</i> used when connecting to the server.
	 * @property {function} onConnectionLost - called when a connection has been lost.
	 *                            after a connect() method has succeeded.
	 *                            Establish the call back used when a connection has been lost. The connection may be
	 *                            lost because the client initiates a disconnect or because the server or network
	 *                            cause the client to be disconnected. The disconnect call back may be called without
	 *                            the connectionComplete call back being invoked if, for example the client fails to
	 *                            connect.
	 *                            A single response object parameter is passed to the onConnectionLost callback containing the following fields:
	 *                            <ol>
	 *                            <li>errorCode
	 *                            <li>errorMessage
	 *                            </ol>
	 * @property {function} onMessageDelivered - called when a message has been delivered.
	 *                            All processing that this Client will ever do has been completed. So, for example,
	 *                            in the case of a Qos=2 message sent by this client, the PubComp flow has been received from the server
	 *                            and the message has been removed from persistent storage before this callback is invoked.
	 *                            Parameters passed to the onMessageDelivered callback are:
	 *                            <ol>
	 *                            <li>{@link Paho.Message} that was delivered.
	 *                            </ol>
	 * @property {function} onMessageArrived - called when a message has arrived in this Paho.client.
	 *                            Parameters passed to the onMessageArrived callback are:
	 *                            <ol>
	 *                            <li>{@link Paho.Message} that has arrived.
	 *                            </ol>
	 * @property {function} onConnected - called when a connection is successfully made to the server.
	 *                                  after a connect() method.
	 *                                  Parameters passed to the onConnected callback are:
	 *                                  <ol>
	 *                                  <li>reconnect (boolean) - If true, the connection was the result of a reconnect.</li>
	 *                                  <li>URI (string) - The URI used to connect to the server.</li>
	 *                                  </ol>
	 * @property {boolean} disconnectedPublishing - if set, will enable disconnected publishing in
	 *                                            in the event that the connection to the server is lost.
	 * @property {number} disconnectedBufferSize - Used to set the maximum number of messages that the disconnected
	 *                                             buffer will hold before rejecting new messages. Default size: 5000 messages
	 * @property {function} trace - called whenever trace is called. TODO
	 */
		var Client = function (host, port, path, clientId) {

			var uri;

			if (typeof host !== "string")
				throw new Error(format(ERROR.INVALID_TYPE, [typeof host, "host"]));

			if (arguments.length == 2) {
			// host: must be full ws:// uri
			// port: clientId
				clientId = port;
				uri = host;
				var match = uri.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);
				if (match) {
					host = match[4]||match[2];
					port = parseInt(match[7]);
					path = match[8];
				} else {
					throw new Error(format(ERROR.INVALID_ARGUMENT,[host,"host"]));
				}
			} else {
				if (arguments.length == 3) {
					clientId = path;
					path = "/mqtt";
				}
				if (typeof port !== "number" || port < 0)
					throw new Error(format(ERROR.INVALID_TYPE, [typeof port, "port"]));
				if (typeof path !== "string")
					throw new Error(format(ERROR.INVALID_TYPE, [typeof path, "path"]));

				var ipv6AddSBracket = (host.indexOf(":") !== -1 && host.slice(0,1) !== "[" && host.slice(-1) !== "]");
				uri = "ws://"+(ipv6AddSBracket?"["+host+"]":host)+":"+port+path;
			}

			var clientIdLength = 0;
			for (var i = 0; i<clientId.length; i++) {
				var charCode = clientId.charCodeAt(i);
				if (0xD800 <= charCode && charCode <= 0xDBFF)  {
					i++; // Surrogate pair.
				}
				clientIdLength++;
			}
			if (typeof clientId !== "string" || clientIdLength > 65535)
				throw new Error(format(ERROR.INVALID_ARGUMENT, [clientId, "clientId"]));

			var client = new ClientImpl(uri, host, port, path, clientId);

			//Public Properties
			Object.defineProperties(this,{
				"host":{
					get: function() { return host; },
					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
				},
				"port":{
					get: function() { return port; },
					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
				},
				"path":{
					get: function() { return path; },
					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
				},
				"uri":{
					get: function() { return uri; },
					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
				},
				"clientId":{
					get: function() { return client.clientId; },
					set: function() { throw new Error(format(ERROR.UNSUPPORTED_OPERATION)); }
				},
				"onConnected":{
					get: function() { return client.onConnected; },
					set: function(newOnConnected) {
						if (typeof newOnConnected === "function")
							client.onConnected = newOnConnected;
						else
							throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnConnected, "onConnected"]));
					}
				},
				"disconnectedPublishing":{
					get: function() { return client.disconnectedPublishing; },
					set: function(newDisconnectedPublishing) {
						client.disconnectedPublishing = newDisconnectedPublishing;
					}
				},
				"disconnectedBufferSize":{
					get: function() { return client.disconnectedBufferSize; },
					set: function(newDisconnectedBufferSize) {
						client.disconnectedBufferSize = newDisconnectedBufferSize;
					}
				},
				"onConnectionLost":{
					get: function() { return client.onConnectionLost; },
					set: function(newOnConnectionLost) {
						if (typeof newOnConnectionLost === "function")
							client.onConnectionLost = newOnConnectionLost;
						else
							throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnConnectionLost, "onConnectionLost"]));
					}
				},
				"onMessageDelivered":{
					get: function() { return client.onMessageDelivered; },
					set: function(newOnMessageDelivered) {
						if (typeof newOnMessageDelivered === "function")
							client.onMessageDelivered = newOnMessageDelivered;
						else
							throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageDelivered, "onMessageDelivered"]));
					}
				},
				"onMessageArrived":{
					get: function() { return client.onMessageArrived; },
					set: function(newOnMessageArrived) {
						if (typeof newOnMessageArrived === "function")
							client.onMessageArrived = newOnMessageArrived;
						else
							throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageArrived, "onMessageArrived"]));
					}
				},
				"trace":{
					get: function() { return client.traceFunction; },
					set: function(trace) {
						if(typeof trace === "function"){
							client.traceFunction = trace;
						}else{
							throw new Error(format(ERROR.INVALID_TYPE, [typeof trace, "onTrace"]));
						}
					}
				},
			});

			/**
		 * Connect this Messaging client to its server.
		 *
		 * @name Paho.Client#connect
		 * @function
		 * @param {object} connectOptions - Attributes used with the connection.
		 * @param {number} connectOptions.timeout - If the connect has not succeeded within this
		 *                    number of seconds, it is deemed to have failed.
		 *                    The default is 30 seconds.
		 * @param {string} connectOptions.userName - Authentication username for this connection.
		 * @param {string} connectOptions.password - Authentication password for this connection.
		 * @param {Paho.Message} connectOptions.willMessage - sent by the server when the client
		 *                    disconnects abnormally.
		 * @param {number} connectOptions.keepAliveInterval - the server disconnects this client if
		 *                    there is no activity for this number of seconds.
		 *                    The default value of 60 seconds is assumed if not set.
		 * @param {boolean} connectOptions.cleanSession - if true(default) the client and server
		 *                    persistent state is deleted on successful connect.
		 * @param {boolean} connectOptions.useSSL - if present and true, use an SSL Websocket connection.
		 * @param {object} connectOptions.invocationContext - passed to the onSuccess callback or onFailure callback.
		 * @param {function} connectOptions.onSuccess - called when the connect acknowledgement
		 *                    has been received from the server.
		 * A single response object parameter is passed to the onSuccess callback containing the following fields:
		 * <ol>
		 * <li>invocationContext as passed in to the onSuccess method in the connectOptions.
		 * </ol>
	 * @param {function} connectOptions.onFailure - called when the connect request has failed or timed out.
		 * A single response object parameter is passed to the onFailure callback containing the following fields:
		 * <ol>
		 * <li>invocationContext as passed in to the onFailure method in the connectOptions.
		 * <li>errorCode a number indicating the nature of the error.
		 * <li>errorMessage text describing the error.
		 * </ol>
	 * @param {array} connectOptions.hosts - If present this contains either a set of hostnames or fully qualified
		 * WebSocket URIs (ws://iot.eclipse.org:80/ws), that are tried in order in place
		 * of the host and port paramater on the construtor. The hosts are tried one at at time in order until
		 * one of then succeeds.
	 * @param {array} connectOptions.ports - If present the set of ports matching the hosts. If hosts contains URIs, this property
		 * is not used.
	 * @param {boolean} connectOptions.reconnect - Sets whether the client will automatically attempt to reconnect
	 * to the server if the connection is lost.
	 *<ul>
	 *<li>If set to false, the client will not attempt to automatically reconnect to the server in the event that the
	 * connection is lost.</li>
	 *<li>If set to true, in the event that the connection is lost, the client will attempt to reconnect to the server.
	 * It will initially wait 1 second before it attempts to reconnect, for every failed reconnect attempt, the delay
	 * will double until it is at 2 minutes at which point the delay will stay at 2 minutes.</li>
	 *</ul>
	 * @param {number} connectOptions.mqttVersion - The version of MQTT to use to connect to the MQTT Broker.
	 *<ul>
	 *<li>3 - MQTT V3.1</li>
	 *<li>4 - MQTT V3.1.1</li>
	 *</ul>
	 * @param {boolean} connectOptions.mqttVersionExplicit - If set to true, will force the connection to use the
	 * selected MQTT Version or will fail to connect.
	 * @param {array} connectOptions.uris - If present, should contain a list of fully qualified WebSocket uris
	 * (e.g. ws://iot.eclipse.org:80/ws), that are tried in order in place of the host and port parameter of the construtor.
	 * The uris are tried one at a time in order until one of them succeeds. Do not use this in conjunction with hosts as
	 * the hosts array will be converted to uris and will overwrite this property.
		 * @throws {InvalidState} If the client is not in disconnected state. The client must have received connectionLost
		 * or disconnected before calling connect for a second or subsequent time.
		 */
			this.connect = function (connectOptions) {
				connectOptions = connectOptions || {} ;
				validate(connectOptions,  {timeout:"number",
					userName:"string",
					password:"string",
					willMessage:"object",
					keepAliveInterval:"number",
					cleanSession:"boolean",
					useSSL:"boolean",
					invocationContext:"object",
					onSuccess:"function",
					onFailure:"function",
					hosts:"object",
					ports:"object",
					reconnect:"boolean",
					mqttVersion:"number",
					mqttVersionExplicit:"boolean",
					uris: "object"});

				// If no keep alive interval is set, assume 60 seconds.
				if (connectOptions.keepAliveInterval === undefined)
					connectOptions.keepAliveInterval = 60;

				if (connectOptions.mqttVersion > 4 || connectOptions.mqttVersion < 3) {
					throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.mqttVersion, "connectOptions.mqttVersion"]));
				}

				if (connectOptions.mqttVersion === undefined) {
					connectOptions.mqttVersionExplicit = false;
					connectOptions.mqttVersion = 4;
				} else {
					connectOptions.mqttVersionExplicit = true;
				}

				//Check that if password is set, so is username
				if (connectOptions.password !== undefined && connectOptions.userName === undefined)
					throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.password, "connectOptions.password"]));

				if (connectOptions.willMessage) {
					if (!(connectOptions.willMessage instanceof Message))
						throw new Error(format(ERROR.INVALID_TYPE, [connectOptions.willMessage, "connectOptions.willMessage"]));
					// The will message must have a payload that can be represented as a string.
					// Cause the willMessage to throw an exception if this is not the case.
					connectOptions.willMessage.stringPayload = null;

					if (typeof connectOptions.willMessage.destinationName === "undefined")
						throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.willMessage.destinationName, "connectOptions.willMessage.destinationName"]));
				}
				if (typeof connectOptions.cleanSession === "undefined")
					connectOptions.cleanSession = true;
				if (connectOptions.hosts) {

					if (!(connectOptions.hosts instanceof Array) )
						throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));
					if (connectOptions.hosts.length <1 )
						throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, "connectOptions.hosts"]));

					var usingURIs = false;
					for (var i = 0; i<connectOptions.hosts.length; i++) {
						if (typeof connectOptions.hosts[i] !== "string")
							throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
						if (/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(connectOptions.hosts[i])) {
							if (i === 0) {
								usingURIs = true;
							} else if (!usingURIs) {
								throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
							}
						} else if (usingURIs) {
							throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], "connectOptions.hosts["+i+"]"]));
						}
					}

					if (!usingURIs) {
						if (!connectOptions.ports)
							throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
						if (!(connectOptions.ports instanceof Array) )
							throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));
						if (connectOptions.hosts.length !== connectOptions.ports.length)
							throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, "connectOptions.ports"]));

						connectOptions.uris = [];

						for (var i = 0; i<connectOptions.hosts.length; i++) {
							if (typeof connectOptions.ports[i] !== "number" || connectOptions.ports[i] < 0)
								throw new Error(format(ERROR.INVALID_TYPE, [typeof connectOptions.ports[i], "connectOptions.ports["+i+"]"]));
							var host = connectOptions.hosts[i];
							var port = connectOptions.ports[i];

							var ipv6 = (host.indexOf(":") !== -1);
							uri = "ws://"+(ipv6?"["+host+"]":host)+":"+port+path;
							connectOptions.uris.push(uri);
						}
					} else {
						connectOptions.uris = connectOptions.hosts;
					}
				}

				client.connect(connectOptions);
			};

			/**
		 * Subscribe for messages, request receipt of a copy of messages sent to the destinations described by the filter.
		 *
		 * @name Paho.Client#subscribe
		 * @function
		 * @param {string} filter describing the destinations to receive messages from.
		 * <br>
		 * @param {object} subscribeOptions - used to control the subscription
		 *
		 * @param {number} subscribeOptions.qos - the maximum qos of any publications sent
		 *                                  as a result of making this subscription.
		 * @param {object} subscribeOptions.invocationContext - passed to the onSuccess callback
		 *                                  or onFailure callback.
		 * @param {function} subscribeOptions.onSuccess - called when the subscribe acknowledgement
		 *                                  has been received from the server.
		 *                                  A single response object parameter is passed to the onSuccess callback containing the following fields:
		 *                                  <ol>
		 *                                  <li>invocationContext if set in the subscribeOptions.
		 *                                  </ol>
		 * @param {function} subscribeOptions.onFailure - called when the subscribe request has failed or timed out.
		 *                                  A single response object parameter is passed to the onFailure callback containing the following fields:
		 *                                  <ol>
		 *                                  <li>invocationContext - if set in the subscribeOptions.
		 *                                  <li>errorCode - a number indicating the nature of the error.
		 *                                  <li>errorMessage - text describing the error.
		 *                                  </ol>
		 * @param {number} subscribeOptions.timeout - which, if present, determines the number of
		 *                                  seconds after which the onFailure calback is called.
		 *                                  The presence of a timeout does not prevent the onSuccess
		 *                                  callback from being called when the subscribe completes.
		 * @throws {InvalidState} if the client is not in connected state.
		 */
			this.subscribe = function (filter, subscribeOptions) {
				if (typeof filter !== "string" && filter.constructor !== Array)
					throw new Error("Invalid argument:"+filter);
				subscribeOptions = subscribeOptions || {} ;
				validate(subscribeOptions,  {qos:"number",
					invocationContext:"object",
					onSuccess:"function",
					onFailure:"function",
					timeout:"number"
				});
				if (subscribeOptions.timeout && !subscribeOptions.onFailure)
					throw new Error("subscribeOptions.timeout specified with no onFailure callback.");
				if (typeof subscribeOptions.qos !== "undefined" && !(subscribeOptions.qos === 0 || subscribeOptions.qos === 1 || subscribeOptions.qos === 2 ))
					throw new Error(format(ERROR.INVALID_ARGUMENT, [subscribeOptions.qos, "subscribeOptions.qos"]));
				client.subscribe(filter, subscribeOptions);
			};

		/**
		 * Unsubscribe for messages, stop receiving messages sent to destinations described by the filter.
		 *
		 * @name Paho.Client#unsubscribe
		 * @function
		 * @param {string} filter - describing the destinations to receive messages from.
		 * @param {object} unsubscribeOptions - used to control the subscription
		 * @param {object} unsubscribeOptions.invocationContext - passed to the onSuccess callback
											  or onFailure callback.
		 * @param {function} unsubscribeOptions.onSuccess - called when the unsubscribe acknowledgement has been received from the server.
		 *                                    A single response object parameter is passed to the
		 *                                    onSuccess callback containing the following fields:
		 *                                    <ol>
		 *                                    <li>invocationContext - if set in the unsubscribeOptions.
		 *                                    </ol>
		 * @param {function} unsubscribeOptions.onFailure called when the unsubscribe request has failed or timed out.
		 *                                    A single response object parameter is passed to the onFailure callback containing the following fields:
		 *                                    <ol>
		 *                                    <li>invocationContext - if set in the unsubscribeOptions.
		 *                                    <li>errorCode - a number indicating the nature of the error.
		 *                                    <li>errorMessage - text describing the error.
		 *                                    </ol>
		 * @param {number} unsubscribeOptions.timeout - which, if present, determines the number of seconds
		 *                                    after which the onFailure callback is called. The presence of
		 *                                    a timeout does not prevent the onSuccess callback from being
		 *                                    called when the unsubscribe completes
		 * @throws {InvalidState} if the client is not in connected state.
		 */
			this.unsubscribe = function (filter, unsubscribeOptions) {
				if (typeof filter !== "string" && filter.constructor !== Array)
					throw new Error("Invalid argument:"+filter);
				unsubscribeOptions = unsubscribeOptions || {} ;
				validate(unsubscribeOptions,  {invocationContext:"object",
					onSuccess:"function",
					onFailure:"function",
					timeout:"number"
				});
				if (unsubscribeOptions.timeout && !unsubscribeOptions.onFailure)
					throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.");
				client.unsubscribe(filter, unsubscribeOptions);
			};

			/**
		 * Send a message to the consumers of the destination in the Message.
		 *
		 * @name Paho.Client#send
		 * @function
		 * @param {string|Paho.Message} topic - <b>mandatory</b> The name of the destination to which the message is to be sent.
		 * 					   - If it is the only parameter, used as Paho.Message object.
		 * @param {String|ArrayBuffer} payload - The message data to be sent.
		 * @param {number} qos The Quality of Service used to deliver the message.
		 * 		<dl>
		 * 			<dt>0 Best effort (default).
		 *     			<dt>1 At least once.
		 *     			<dt>2 Exactly once.
		 * 		</dl>
		 * @param {Boolean} retained If true, the message is to be retained by the server and delivered
		 *                     to both current and future subscriptions.
		 *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
		 *                     A received message has the retained boolean set to true if the message was published
		 *                     with the retained boolean set to true
		 *                     and the subscrption was made after the message has been published.
		 * @throws {InvalidState} if the client is not connected.
		 */
			this.send = function (topic,payload,qos,retained) {
				var message ;

				if(arguments.length === 0){
					throw new Error("Invalid argument."+"length");

				}else if(arguments.length == 1) {

					if (!(topic instanceof Message) && (typeof topic !== "string"))
						throw new Error("Invalid argument:"+ typeof topic);

					message = topic;
					if (typeof message.destinationName === "undefined")
						throw new Error(format(ERROR.INVALID_ARGUMENT,[message.destinationName,"Message.destinationName"]));
					client.send(message);

				}else {
				//parameter checking in Message object
					message = new Message(payload);
					message.destinationName = topic;
					if(arguments.length >= 3)
						message.qos = qos;
					if(arguments.length >= 4)
						message.retained = retained;
					client.send(message);
				}
			};

			/**
		 * Publish a message to the consumers of the destination in the Message.
		 * Synonym for Paho.Mqtt.Client#send
		 *
		 * @name Paho.Client#publish
		 * @function
		 * @param {string|Paho.Message} topic - <b>mandatory</b> The name of the topic to which the message is to be published.
		 * 					   - If it is the only parameter, used as Paho.Message object.
		 * @param {String|ArrayBuffer} payload - The message data to be published.
		 * @param {number} qos The Quality of Service used to deliver the message.
		 * 		<dl>
		 * 			<dt>0 Best effort (default).
		 *     			<dt>1 At least once.
		 *     			<dt>2 Exactly once.
		 * 		</dl>
		 * @param {Boolean} retained If true, the message is to be retained by the server and delivered
		 *                     to both current and future subscriptions.
		 *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
		 *                     A received message has the retained boolean set to true if the message was published
		 *                     with the retained boolean set to true
		 *                     and the subscrption was made after the message has been published.
		 * @throws {InvalidState} if the client is not connected.
		 */
			this.publish = function(topic,payload,qos,retained) {
				var message ;

				if(arguments.length === 0){
					throw new Error("Invalid argument."+"length");

				}else if(arguments.length == 1) {

					if (!(topic instanceof Message) && (typeof topic !== "string"))
						throw new Error("Invalid argument:"+ typeof topic);

					message = topic;
					if (typeof message.destinationName === "undefined")
						throw new Error(format(ERROR.INVALID_ARGUMENT,[message.destinationName,"Message.destinationName"]));
					client.send(message);

				}else {
					//parameter checking in Message object
					message = new Message(payload);
					message.destinationName = topic;
					if(arguments.length >= 3)
						message.qos = qos;
					if(arguments.length >= 4)
						message.retained = retained;
					client.send(message);
				}
			};

			/**
		 * Normal disconnect of this Messaging client from its server.
		 *
		 * @name Paho.Client#disconnect
		 * @function
		 * @throws {InvalidState} if the client is already disconnected.
		 */
			this.disconnect = function () {
				client.disconnect();
			};

			/**
		 * Get the contents of the trace log.
		 *
		 * @name Paho.Client#getTraceLog
		 * @function
		 * @return {Object[]} tracebuffer containing the time ordered trace records.
		 */
			this.getTraceLog = function () {
				return client.getTraceLog();
			};

			/**
		 * Start tracing.
		 *
		 * @name Paho.Client#startTrace
		 * @function
		 */
			this.startTrace = function () {
				client.startTrace();
			};

			/**
		 * Stop tracing.
		 *
		 * @name Paho.Client#stopTrace
		 * @function
		 */
			this.stopTrace = function () {
				client.stopTrace();
			};

			this.isConnected = function() {
				return client.connected;
			};
		};

		/**
	 * An application message, sent or received.
	 * <p>
	 * All attributes may be null, which implies the default values.
	 *
	 * @name Paho.Message
	 * @constructor
	 * @param {String|ArrayBuffer} payload The message data to be sent.
	 * <p>
	 * @property {string} payloadString <i>read only</i> The payload as a string if the payload consists of valid UTF-8 characters.
	 * @property {ArrayBuffer} payloadBytes <i>read only</i> The payload as an ArrayBuffer.
	 * <p>
	 * @property {string} destinationName <b>mandatory</b> The name of the destination to which the message is to be sent
	 *                    (for messages about to be sent) or the name of the destination from which the message has been received.
	 *                    (for messages received by the onMessage function).
	 * <p>
	 * @property {number} qos The Quality of Service used to deliver the message.
	 * <dl>
	 *     <dt>0 Best effort (default).
	 *     <dt>1 At least once.
	 *     <dt>2 Exactly once.
	 * </dl>
	 * <p>
	 * @property {Boolean} retained If true, the message is to be retained by the server and delivered
	 *                     to both current and future subscriptions.
	 *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
	 *                     A received message has the retained boolean set to true if the message was published
	 *                     with the retained boolean set to true
	 *                     and the subscrption was made after the message has been published.
	 * <p>
	 * @property {Boolean} duplicate <i>read only</i> If true, this message might be a duplicate of one which has already been received.
	 *                     This is only set on messages received from the server.
	 *
	 */
		var Message = function (newPayload) {
			var payload;
			if (   typeof newPayload === "string" ||
		newPayload instanceof ArrayBuffer ||
		(ArrayBuffer.isView(newPayload) && !(newPayload instanceof DataView))
			) {
				payload = newPayload;
			} else {
				throw (format(ERROR.INVALID_ARGUMENT, [newPayload, "newPayload"]));
			}

			var destinationName;
			var qos = 0;
			var retained = false;
			var duplicate = false;

			Object.defineProperties(this,{
				"payloadString":{
					enumerable : true,
					get : function () {
						if (typeof payload === "string")
							return payload;
						else
							return parseUTF8(payload, 0, payload.length);
					}
				},
				"payloadBytes":{
					enumerable: true,
					get: function() {
						if (typeof payload === "string") {
							var buffer = new ArrayBuffer(UTF8Length(payload));
							var byteStream = new Uint8Array(buffer);
							stringToUTF8(payload, byteStream, 0);

							return byteStream;
						} else {
							return payload;
						}
					}
				},
				"destinationName":{
					enumerable: true,
					get: function() { return destinationName; },
					set: function(newDestinationName) {
						if (typeof newDestinationName === "string")
							destinationName = newDestinationName;
						else
							throw new Error(format(ERROR.INVALID_ARGUMENT, [newDestinationName, "newDestinationName"]));
					}
				},
				"qos":{
					enumerable: true,
					get: function() { return qos; },
					set: function(newQos) {
						if (newQos === 0 || newQos === 1 || newQos === 2 )
							qos = newQos;
						else
							throw new Error("Invalid argument:"+newQos);
					}
				},
				"retained":{
					enumerable: true,
					get: function() { return retained; },
					set: function(newRetained) {
						if (typeof newRetained === "boolean")
							retained = newRetained;
						else
							throw new Error(format(ERROR.INVALID_ARGUMENT, [newRetained, "newRetained"]));
					}
				},
				"topic":{
					enumerable: true,
					get: function() { return destinationName; },
					set: function(newTopic) {destinationName=newTopic;}
				},
				"duplicate":{
					enumerable: true,
					get: function() { return duplicate; },
					set: function(newDuplicate) {duplicate=newDuplicate;}
				}
			});
		};

		// Module contents.
		return {
			Client: Client,
			Message: Message
		};
	// eslint-disable-next-line no-nested-ternary
	})(typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	return PahoMQTT;
});

/* v0.57.0适配器：官方源root.Paho={Client,Message}，HX.mqtt调Paho.MQTT.Client，包一层对齐（既有代码零改动） */
try { var _p = window.Paho || (typeof Paho !== 'undefined' ? Paho : null); if (_p && !_p.MQTT) { window.Paho = { MQTT: _p }; } } catch (ePA) {}


/* ══ v0.58.0（2026-10-22班，t95值夜班套件刀3，SPEC_值夜班_t95_V1，设计Kimi/终审Kimi）：
   HX.yeban值夜质检员——壳vc66夜班窗口（22~07点∧充电∧关屏）每3分钟经MainActivity.poke戳HX.yeban.tick()干一件，
   轮转游标hx_yb_cur三件：①keys键值体检（mqtt钥匙/连上时刻）②bb黑匣子近24h err条数 ③hb纯心跳；
   账写hx_yb_log(≤200条满砍半)+成绩单hx_yb_score{date,total,green,red,fixed,todo[]}（跨天自动清零重开）；
   上行：tick顺手试推仓根「夜班台账.json」（HX.gh.putFile四参现签名，距上次>1小时才推，败了下回再试）；
   总开关localStorage hx_yb_off=1退休；全模块try/catch包死、夜里不弹窗不打扰；纯加法，既有码一行未动。 */
try {
(function () {
  if (window.HX && HX.yeban) return;
  if (!window.HX) window.HX = {};
  var LS = window.localStorage;
  function gj(k, d) { try { var v = LS.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function sj(k, v) { try { LS.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function p2(n) { return (n < 10 ? '0' : '') + n; }
  function fmt(d) { return d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()) + ' ' + p2(d.getHours()) + ':' + p2(d.getMinutes()); }
  function log(step, ok, msg) {
    try {
      var a = gj('hx_yb_log', []);
      a.push({ t: Date.now(), step: step, ok: !!ok, msg: String(msg).slice(0, 200) });
      if (a.length > 200) a = a.slice(-100);
      sj('hx_yb_log', a);
      var today = fmt(new Date()).slice(0, 10);
      var sc = gj('hx_yb_score', null);
      if (!sc || sc.date !== today) sc = { date: today, total: 0, green: 0, red: 0, fixed: 0, todo: [] };
      sc.total++; if (ok) sc.green++; else sc.red++;
      sj('hx_yb_score', sc);
    } catch (e) {}
  }
  function stepKeys() {
    var bad = [];
    if (!LS.getItem('hx_mqtt_pw')) bad.push('mqtt钥匙缺');
    if (!parseInt(LS.getItem('hx_mqtt_ok_t') || '0', 10)) bad.push('mqtt从未连上');
    return bad.length ? { ok: false, msg: bad.join('；') } : { ok: true, msg: '键值健' };
  }
  function stepBb() {
    try {
      if (window.HX && HX.bb && HX.bb.log && HX.bb.log.length) {
        var n = 0, cut = Date.now() - 86400000;
        HX.bb.log.forEach(function (e) {
          try { if (e && (e.t || 0) > cut && (e.lv === 'err' || /^\[err\]|error/i.test(String(e.m || '')))) n++; } catch (e1) {}
        });
        return { ok: n <= 5, msg: '近24h err ' + n + '条' };
      }
    } catch (e) {}
    return { ok: true, msg: 'bb不在跳过' };
  }
  function stepHb() { return { ok: true, msg: '夜班心跳' }; }
  var STEPS = [['keys', stepKeys], ['bb', stepBb], ['hb', stepHb]];
  function upload() {
    try {
      var last = parseInt(LS.getItem('hx_yb_up_t') || '0', 10);
      if (Date.now() - last < 3600000) return;
      var a = gj('hx_yb_log', []);
      if (!a.length) return;
      if (!(window.HX && HX.gh && typeof HX.gh.putFile === 'function')) return;
      LS.setItem('hx_yb_up_t', String(Date.now()));
      var body = JSON.stringify({ ver: 'v1', score: gj('hx_yb_score', {}), log: a }, null, 1);
      HX.gh.putFile(null, '夜班台账.json', body, '夜班台账 ' + fmt(new Date()));
    } catch (e) {}
  }
  function tick() {
    try {
      if (LS.getItem('hx_yb_off') === '1') return 'off';
      var cur = parseInt(LS.getItem('hx_yb_cur') || '0', 10) % STEPS.length;
      LS.setItem('hx_yb_cur', String(cur + 1));
      var r = { ok: true, msg: '' };
      try { r = STEPS[cur][1]() || r; } catch (eS) { r = { ok: false, msg: 'step炸:' + eS.message }; }
      log(STEPS[cur][0], r.ok, r.msg);
      upload();
      return JSON.stringify({ step: STEPS[cur][0], ok: !!r.ok });
    } catch (e) {
      try { log('tick', false, 'tick炸:' + e.message); } catch (e2) {}
      return 'err';
    }
  }
  window.HX.yeban = {
    tick: tick,
    score: function () { return gj('hx_yb_score', null); },
    log: function () { return gj('hx_yb_log', []); }
  };
})();
} catch (eYB) {}

/* ══ v0.59.0（2026-10-23，t96 🧪真机检验总钮一期刀1，SPEC_真机检验总钮一期_t96，设计Kimi/DS实现/Kimi终审落地）：
   HX.zhiban白天质检员——纯加法新增：壳vc67白天值班期每3分钟戳HX.zhiban.tick()干一件，
   轮转游标hx_zb_cur三件：①keys键值体检（mqtt钥匙/连上时刻）②bb黑匣子近24h err条数 ③hb纯心跳；
   账写hx_zb_log(≤200条满砍半)+成绩单hx_zb_score{date,total,green,red,fixed,todo[]}（跨天自动清零重开）；
   上行：tick顺手试推仓根「白班台账.json」（HX.gh.putFile四参现签名，距上次>1小时才推，败了下回再试）；
   总开关localStorage hx_zb_off=1退休；全模块try/catch包死、不弹窗不打扰；既有码全件IDENTICAL。 */
try {
(function () {
  if (window.HX && HX.zhiban) return;
  if (!window.HX) window.HX = {};
  var LS = window.localStorage;
  function gj(k, d) { try { var v = LS.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function sj(k, v) { try { LS.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function p2(n) { return (n < 10 ? '0' : '') + n; }
  function fmt(d) { return d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()) + ' ' + p2(d.getHours()) + ':' + p2(d.getMinutes()); }
  function log(step, ok, msg) {
    try {
      var a = gj('hx_zb_log', []);
      a.push({ t: Date.now(), step: step, ok: !!ok, msg: String(msg).slice(0, 200) });
      if (a.length > 200) a = a.slice(-100);
      sj('hx_zb_log', a);
      var today = fmt(new Date()).slice(0, 10);
      var sc = gj('hx_zb_score', null);
      if (!sc || sc.date !== today) sc = { date: today, total: 0, green: 0, red: 0, fixed: 0, todo: [] };
      sc.total++; if (ok) sc.green++; else sc.red++;
      sj('hx_zb_score', sc);
    } catch (e) {}
  }
  function stepKeys() {
    var bad = [];
    if (!LS.getItem('hx_mqtt_pw')) bad.push('mqtt钥匙缺');
    if (!parseInt(LS.getItem('hx_mqtt_ok_t') || '0', 10)) bad.push('mqtt从未连上');
    return bad.length ? { ok: false, msg: bad.join('；') } : { ok: true, msg: '键值健' };
  }
  function stepBb() {
    try {
      if (window.HX && HX.bb && HX.bb.log && HX.bb.log.length) {
        var n = 0, cut = Date.now() - 86400000;
        HX.bb.log.forEach(function (e) {
          try { if (e && (e.t || 0) > cut && (e.lv === 'err' || /^\[err\]|error/i.test(String(e.m || '')))) n++; } catch (e1) {}
        });
        return { ok: n <= 5, msg: '近24h err ' + n + '条' };
      }
    } catch (e) {}
    return { ok: true, msg: 'bb不在跳过' };
  }
  function stepHb() { return { ok: true, msg: '白班心跳' }; }
  var STEPS = [['keys', stepKeys], ['bb', stepBb], ['hb', stepHb]];
  function upload() {
    try {
      var last = parseInt(LS.getItem('hx_zb_up_t') || '0', 10);
      if (Date.now() - last < 3600000) return;
      var a = gj('hx_zb_log', []);
      if (!a.length) return;
      if (!(window.HX && HX.gh && typeof HX.gh.putFile === 'function')) return;
      LS.setItem('hx_zb_up_t', String(Date.now()));
      var body = JSON.stringify({ ver: 'v1', score: gj('hx_zb_score', {}), log: a }, null, 1);
      HX.gh.putFile(null, '白班台账.json', body, '白班台账 ' + fmt(new Date()));
    } catch (e) {}
  }
  function tick() {
    try {
      if (LS.getItem('hx_zb_off') === '1') return 'off';
      var cur = parseInt(LS.getItem('hx_zb_cur') || '0', 10) % STEPS.length;
      LS.setItem('hx_zb_cur', String(cur + 1));
      var r = { ok: true, msg: '' };
      try { r = STEPS[cur][1]() || r; } catch (eS) { r = { ok: false, msg: 'step炸:' + eS.message }; }
      log(STEPS[cur][0], r.ok, r.msg);
      upload();
      return JSON.stringify({ step: STEPS[cur][0], ok: !!r.ok });
    } catch (e) {
      try { log('tick', false, 'tick炸:' + e.message); } catch (e2) {}
      return 'err';
    }
  }
  window.HX.zhiban = {
    tick: tick,
    score: function () { return gj('hx_zb_score', null); },
    log: function () { return gj('hx_zb_log', []); }
  };
})();
} catch (eZB) {}

/* ── v0.63.0 t101刀B：HX.syRemind开门实验提醒（E1后续刀，SPEC_hx-common_v0.63.0，洪老师「你以后要提醒我」拍板）——开门100秒前台起跑，HX.gh.readJson取闭环实验单.json，在途件（state不含销号/作废）常驻黑框🧪提醒（hxToastHold点✕才关），一天一次hx_sy_remind_d节流，失败/网断/没在途件全静默；总开关hx_sy_remind_off=1；公开口status/run。纯加法一IIFE，其余一行未动 */
try { (function () {
  if (!window.HX) window.HX = {};
  var LS = {
    getItem: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    setItem: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var SHEET = '闭环实验单.json';
  function todayStr() {
    var d = new Date();
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }
  function off() { return LS.getItem('hx_sy_remind_off') === '1'; }
  function reminded() { return LS.getItem('hx_sy_remind_d') === todayStr(); }
  function liveItems(data) {
    var out = [];
    try {
      var items = (data && data.items) || [];
      for (var i = 0; i < items.length; i++) {
        var st = String(items[i].state || '');
        if (st.indexOf('销号') >= 0 || st.indexOf('作废') >= 0) continue;
        out.push(items[i]);
      }
    } catch (e) {}
    return out;
  }
  function compose(list) {
    var lines = ['🧪闭环实验还盯着呢（' + list.length + '件在途）：'];
    var show = Math.min(list.length, 3);
    for (var i = 0; i < show; i++) {
      var it = list[i];
      var tri = String(it['触发'] || '').replace(/\s+/g, ' ').slice(0, 40);
      var ttl = String(it.title || '').replace(/（.*?）/g, '').slice(0, 16);
      lines.push('①②③'.charAt(i) + ' ' + String(it.id || '?') + ' ' + ttl + (tri ? '——' + tri : ''));
    }
    if (list.length > 3) lines.push('……等' + list.length + '件');
    return lines.join('\n');
  }
  function showToast(msg) {
    try {
      if (!document.body) return;
      var d = document.createElement('div');
      d.textContent = msg;
      d.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:12px 18px;border-radius:12px;font-size:14px;z-index:99999;box-shadow:0 2px 10px rgba(0,0,0,.35);max-width:86vw;white-space:pre-line;line-height:1.6';
      /* 终审修1：hxToastHold在主闭包内（110~6167行）本IIFE够不着，照hxToastHold样式自带✕常驻点✕才关（洪老师铁规不许自动消失） */
      var x = document.createElement('span');
      x.textContent = '✕';
      x.style.cssText = 'margin-left:10px;cursor:pointer;font-weight:bold;padding:4px 10px;font-size:16px';
      x.addEventListener('click', function () { try { d.remove(); } catch (e) {} });
      d.appendChild(x);
      document.body.appendChild(d);
      try { if (window.HX && HX.bb && typeof HX.bb.log === 'function') { HX.bb.log('note', '黑框:' + msg.slice(0, 100)); } } catch (e1) {} /* 照hxToastHold先例黑框留账 */
    } catch (e) {}
  }
  function run(force) {
    try {
      if (off()) return 'off';
      if (!force && reminded()) return '今天已提过';
      if (!window.HX.gh || typeof HX.gh.readJson !== 'function' || !HX.gh.ready()) return 'gh没ready';
      HX.gh.readJson(SHEET).then(function (r) {
        try {
          var list = liveItems(r && r.data);
          if (!list.length) return; /* 没在途件静默 */
          showToast(compose(list));
          LS.setItem('hx_sy_remind_d', todayStr());
        } catch (e) {}
      }, function () { /* 网断静默 */ });
      return '起跑';
    } catch (e) { return 'err:' + e.message; }
  }
  function boot() {
    try {
      if (off()) return;
      setTimeout(function () {
        try {
          if (document.visibilityState && document.visibilityState !== 'visible') return;
          run(false);
        } catch (e) {}
      }, 100000); /* 错峰jc60s/wzPoll90s/arc120s */
    } catch (e) {}
  }
  window.HX.syRemind = {
    run: function () { return run(true); }, /* 手动提一次，不记节流 */
    status: function () {
      return JSON.stringify({ off: off(), todayReminded: reminded() });
    }
  };
  boot();
})(); } catch (eSY) {}

/* ════ HX.aip AI总泵（v0.70.0 2026-10-25 SPEC_t113，洪老师拍板「AI功能归拢插队+联网要+AI对话当试验田」；外援双缺=DS破线8.09自动降级+千问401挂账，Kimi亲手全包）════
   职责：全家AI调用一个口子。链缺省=千问→Kimi→DS（照公共泵老口径）；opt.which可点名只走一家；
   opt.web=true联网搜只走千问棒（百炼兼容端点body加enable_search=true，管家私泵v0.57.4已验证此参数）；
   千问棒流式优先（有getReader+TextDecoder才流，否则非流式兜底）+finish_reason截断续写一回拼接+HTTP400料>12000字砍中段留头4000尾4000重发一回（各硬上限1次，砍料用局部变量不污染外层）；
   Kimi棒非流式空包重发一回（照老callKimi fire(secondTry)口径）；DS棒非流式max_tokens 8192；
   死心=非流式opt.timeout缺省60秒总时长／流式30秒无新字死心；
   换棒吐司人话（no_key静默换棒不打扰）；终败HX.air.report双死（全try）；成功HX.bill('AI总泵',...)记账（全try）；
   总开关hx_aip_off=1→go直接cb(false,'总泵已退休','')，调用方回退各自老链。 */
try { if (!window.HX) window.HX = {}; } catch (eAip0) {}
window.HX.aip = (function () {
  'use strict';
  var HX = window.HX; /* v0.70.0终审修1：卷尾HX有let/const段TDZ隐患（node实测），直认window.HX */

  function _ls(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function _off() { try { return _ls('hx_aip_off') === '1'; } catch (e) { return false; } }
  function _toast(m, ms) {
    try {
      if (!document.body) return;
      var d = document.createElement('div');
      d.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#4a6b4f;color:#fff;padding:10px 18px;border-radius:20px;font-size:14px;z-index:99999;box-shadow:0 2px 8px rgba(0,0,0,.25)';
      d.textContent = String(m);
      document.body.appendChild(d);
      if (typeof hxToastHold === 'function') { hxToastHold(d, function(){ try{ if(d.parentNode) d.parentNode.removeChild(d); }catch(e){} }); }
      else { setTimeout(function(){ try{ if(d.parentNode) d.parentNode.removeChild(d); }catch(e){} }, ms || 4000); }
    } catch (e) {}
  }
  function _keyQwen() {
    var k = '';
    try { if (HX && HX.keys && typeof HX.keys.getQwen === 'function') k = HX.keys.getQwen() || ''; } catch (e) { k = ''; }
    return String(k || '').replace(/^\s+|\s+$/g, '');
  }
  function _keyKimi() {
    var k = '';
    try { if (HX && HX.keys && typeof HX.keys.get === 'function') k = HX.keys.get() || ''; } catch (e) { k = ''; }
    return String(k || '');
  }
  function _keyDs() {
    try { var k = _ls('xt_dskey'); if (k) return String(k); } catch (e) {}
    try {
      if (window.LearnShell && typeof window.LearnShell.readFile === 'function') {
        var b64 = window.LearnShell.readFile('hxdata_hx_keys.json');
        if (b64 && HX && HX.gh && typeof HX.gh.b64dec === 'function') {
          var o = JSON.parse(HX.gh.b64dec(b64) || '{}');
          if (o && (o.deepseek || o.ds)) return String(o.deepseek || o.ds);
        }
      }
    } catch (e) {}
    return '';
  }
  function _modelKimi() {
    var m = 'kimi-k2.7-code-highspeed';
    try { var v = _ls('hx_aimodel'); if (v) m = v; } catch (e) {}
    return m;
  }
  /* 非流式POST：opt.timeout缺省60秒死心；onOk(j) / onErr(msg, httpStatus) */
  function _post(url, key, body, timeout, onOk, onErr) {
    var ac = null, aborted = false, tid = null;
    try { if (typeof AbortController !== 'undefined') ac = new AbortController(); } catch (e) { ac = null; }
    try {
      if (ac) tid = setTimeout(function () { try { aborted = true; ac.abort(); } catch (e) {} }, timeout || 60000);
    } catch (e) {}
    var fo = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key }, body: JSON.stringify(body) };
    if (ac) fo.signal = ac.signal;
    var done = false;
    function fin(fn, a, b) { if (done) return; done = true; try { if (tid) clearTimeout(tid); } catch (e) {} try { fn(a, b); } catch (e) {} }
    try {
      fetch(url, fo).then(function (r) {
        if (!r || !r.ok) {
          var st = r ? r.status : 0;
          try { return r.text().then(function (tx) { fin(onErr, 'HTTP ' + st, st); }, function () { fin(onErr, 'HTTP ' + st, st); }); } catch (e) { fin(onErr, 'HTTP ' + st, st); return; }
        }
        return r.json().then(function (j) { fin(onOk, j); }, function () { fin(onErr, '读JSON失败', 0); });
      }, function () {
        if (aborted) fin(onErr, (timeout || 60000) / 1000 + '秒没回信', 0);
        else fin(onErr, '网络没通', 0);
      });
    } catch (e) { fin(onErr, '请求发不出', 0); }
  }
  /* 千问棒（流式优先/续写/砍料/联网）；cb(st,payload) st='ok'|'fail'|'no_key' */
  function _qwen(msgs, o, cb) {
    var key = _keyQwen();
    if (!key) { cb('no_key', '千问没钥匙'); return; }
    var url = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
    var maxt = Math.min(o.maxTokens || 8192, 8192);
    var web = !!o.web;
    var continued = false, trimmed = false;
    function mkBody(m) {
      var b = { model: 'qwen-plus', messages: m, max_tokens: maxt };
      if (web) b.enable_search = true;
      return b;
    }
    function prog(t) { try { if (typeof o.onProg === 'function') o.onProg(t); } catch (e) {} }
    function send(m, acc, isRetry) {
      /* 流式优先：onProg在或有流能力都试流（无onProg也流，最后整交） */
      var canStream = false;
      try { canStream = (typeof TextDecoder !== 'undefined'); } catch (e) { canStream = false; }
      if (!canStream) { nonStream(m, acc); return; }
      var body = mkBody(m); body.stream = true;
      var ac = null, deadTid = null, accTxt = acc, frLast = '';
      try { if (typeof AbortController !== 'undefined') ac = new AbortController(); } catch (e) { ac = null; }
      function armDead() {
        try { if (deadTid) clearTimeout(deadTid); } catch (e) {}
        try { if (ac) deadTid = setTimeout(function () { try { ac.abort(); } catch (e) {} }, 30000); } catch (e) {}
      }
      armDead();
      var fo = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key }, body: JSON.stringify(body) };
      if (ac) fo.signal = ac.signal;
      fetch(url, fo).then(function (r) {
        if (!r || !r.ok) {
          var st = r ? r.status : 0;
          try { if (deadTid) clearTimeout(deadTid); } catch (e) {}
          if (st === 400 && !trimmed && _tooBig(m)) { doTrim(m, acc); return null; }
          throw new Error('HTTP ' + st);
        }
        if (!r.body || typeof r.body.getReader !== 'function') {
          /* 无流能力回落非流式 */
          return r.json().then(function (j) { handleJson(j, m, acc); });
        }
        var reader = r.body.getReader();
        var dec = new TextDecoder('utf-8');
        var buf = '';
        function pump() {
          return reader.read().then(function (res) {
            if (res.done) { finishStream(m); return; }
            armDead();
            try {
              buf += dec.decode(res.value, { stream: true });
              var lines = buf.split('\n');
              buf = lines.pop() || '';
              for (var i = 0; i < lines.length; i++) {
                var ln = lines[i].replace(/\r$/, '');
                if (ln.indexOf('data:') !== 0) continue;
                var payload = ln.slice(5).replace(/^\s+/, '');
                if (payload === '[DONE]') continue;
                try {
                  var j = JSON.parse(payload);
                  var ch = j && j.choices && j.choices[0];
                  if (ch) {
                    var dlt = ch.delta && ch.delta.content;
                    if (dlt) { accTxt += dlt; prog(accTxt); }
                    if (ch.finish_reason) frLast = ch.finish_reason;
                  }
                } catch (e) {}
              }
            } catch (e) {}
            return pump();
          }, function () { /* 读流抛错/死心abort */
            try { if (deadTid) clearTimeout(deadTid); } catch (e) {}
            cb('fail', '千问流断了');
          });
        }
        return pump();
      }, function () {
        try { if (deadTid) clearTimeout(deadTid); } catch (e) {}
        cb('fail', '千问不通：网络没通或30秒没新字');
      }).catch(function (err) {
        try { if (deadTid) clearTimeout(deadTid); } catch (e) {}
        cb('fail', '千问不通：' + ((err && err.message) || err));
      });
      function finishStream(m2) {
        try { if (deadTid) clearTimeout(deadTid); } catch (e) {}
        if (accTxt && frLast === 'length' && !continued) {
          continued = true;
          _toast('千问写到上限被截断，自动接着写…', 3500);
          var cm = m2.slice();
          cm.push({ role: 'assistant', content: accTxt.slice(acc.length) });
          cm.push({ role: 'user', content: '刚才你没写完被截断了，请从断掉的地方接着写，不要重头开始' });
          send(cm, accTxt, true);
          return;
        }
        if (accTxt && frLast === 'length') { cb('fail', '千问写到上限被截断，续写一回仍没写完'); return; }
        if (accTxt) { cb('ok', accTxt); return; }
        cb('fail', '千问没给正文');
      }
    }
    function handleJson(j, m, acc) {
      try {
        var ch = j && j.choices && j.choices[0];
        var c = ch && ch.message && ch.message.content;
        var fr = ch && ch.finish_reason;
        if (c && fr === 'length' && !continued) {
          continued = true;
          _toast('千问写到上限被截断，自动接着写…', 3500);
          var cm = m.slice();
          cm.push({ role: 'assistant', content: c });
          cm.push({ role: 'user', content: '接着断处写，别重头' });
          send(cm, acc + c, true);
          return;
        }
        if (c && fr === 'length') { cb('fail', '千问写到上限被截断，续写一回仍没写完'); return; }
        if (c) { cb('ok', acc + c); return; }
      } catch (e) {}
      cb('fail', '千问没给正文');
    }
    function nonStream(m, acc) {
      _post(url, key, mkBody(m), o.timeout, function (j) { handleJson(j, m, acc); }, function (msg, st) {
        if (st === 400 && !trimmed && _tooBig(m)) { doTrim(m, acc); return; }
        cb('fail', '千问不通：' + msg);
      });
    }
    function _tooBig(m) {
      var t = 0;
      try { for (var i = 0; i < m.length; i++) t += String(m[i] && m[i].content || '').length; } catch (e) {}
      return t > 12000;
    }
    function doTrim(m, acc) {
      trimmed = true;
      _toast('料太大千问整包不收，自动砍中段留头尾重发一次…', 4000);
      var m2 = m.slice();
      try {
        for (var i = m2.length - 1; i >= 0; i--) {
          if (m2[i] && m2[i].role === 'user') {
            var u = String(m2[i].content || '');
            if (u.length > 9000) m2[i] = { role: 'user', content: u.slice(0, 4000) + '\n…（中段太长已省略）…\n' + u.slice(-4000) };
            break;
          }
        }
      } catch (e) {}
      nonStream(m2, acc);
    }
    send(msgs, '', false);
  }
  /* Kimi棒（非流式，空包重发一回）；cb(st,payload) */
  function _kimi(msgs, o, cb) {
    var key = _keyKimi();
    if (!key) { cb('no_key', 'Kimi没钥匙'); return; }
    var url = 'https://api.moonshot.cn/v1/chat/completions';
    function fire(secondTry) {
      _post(url, key, { model: _modelKimi(), messages: msgs, max_tokens: Math.min(o.maxTokens || 8192, 8192) }, o.timeout, function (j) {
        try {
          var r = j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content;
          if (r) { cb('ok', r); return; }
          if (!secondTry) { fire(true); return; }
        } catch (e) {}
        cb('fail', 'Kimi没给正文');
      }, function (msg) { cb('fail', 'Kimi不通：' + msg); });
    }
    fire(false);
  }
  /* DS棒（非流式）；cb(st,payload) */
  function _ds(msgs, o, cb) {
    var key = _keyDs();
    if (!key) { cb('no_key', 'DeepSeek没钥匙'); return; }
    _post('https://api.deepseek.com/v1/chat/completions', key, { model: 'deepseek-chat', messages: msgs, max_tokens: Math.min(o.maxTokens || 8192, 8192) }, o.timeout, function (j) {
      try {
        var r = j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content;
        if (r) { cb('ok', r); return; }
      } catch (e) {}
      cb('fail', 'DeepSeek没给正文');
    }, function (msg) { cb('fail', 'DeepSeek不通：' + msg); });
  }
  var _fn = { qwen: _qwen, kimi: _kimi, ds: _ds };
  var _cn = { qwen: '千问', kimi: 'Kimi', ds: 'DeepSeek' };
  var api = {};
  /* HX.aip.go(sys, usr, opt, cb)：cb(ok, txt, by)。opt={which,maxTokens,onProg,web,timeout,msgs} */
  api.go = function (sys, usr, opt, cb) {
    cb = (typeof cb === 'function') ? cb : function () {};
    if (_off()) { try { cb(false, '总泵已退休', ''); } catch (e) {} return; }
    opt = opt || {};
    var msgs;
    if (opt.msgs instanceof Array && opt.msgs.length) msgs = opt.msgs;
    else msgs = [{ role: 'system', content: String(sys || '') }, { role: 'user', content: String(usr || '') }];
    var chain;
    if (opt.web) chain = ['qwen']; /* 联网只有千问棒能办（enable_search） */
    else if (opt.which === 'qwen' || opt.which === 'kimi' || opt.which === 'ds') chain = [opt.which];
    else chain = ['qwen', 'kimi', 'ds'];
    var inChars = 0;
    try { for (var i = 0; i < msgs.length; i++) inChars += String(msgs[i] && msgs[i].content || '').length; } catch (e) {}
    var lastMsg = '';
    (function go(i) {
      if (i >= chain.length) {
        var fin = opt.web ? ('联网这活只有千问能办，千问没通：' + lastMsg) : ('三家都没通：' + lastMsg);
        try { if (HX && HX.air && typeof HX.air.report === 'function' && _ls('hx_air_off') !== '1') { HX.air.report('qwen', false, 'final'); HX.air.report('kimi', false, 'final'); } } catch (e) {}
        try { cb(false, fin, ''); } catch (e) {}
        return;
      }
      var w = chain[i];
      try {
        _fn[w](msgs, opt, function (st, payload) {
          if (st === 'ok' && payload) {
            try { if (HX && HX.bill) HX.bill('AI总泵', 'go(' + _cn[w] + ')', inChars, String(payload).length, w); } catch (e) {}
            try { cb(true, payload, w); } catch (e) {}
            return;
          }
          lastMsg = payload || (_cn[w] + '不通');
          if (st === 'no_key') { go(i + 1); return; } /* 没钥匙静默换棒 */
          if (i + 1 < chain.length) _toast(_cn[w] + '这条路不通，自动换' + _cn[chain[i + 1]]);
          go(i + 1);
        });
      } catch (e) { lastMsg = _cn[w] + '调用炸了：' + ((e && e.message) || e); go(i + 1); }
    })(0);
  };
  return api;
})();
