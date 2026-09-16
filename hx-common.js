/* ═══════════════════════════════════════════════════════════════════════════
   hx-common.js —— 全家9件软件共用公共件母版
   v0.13.2 2026-09-16 班④：闲时速记上行认hx_sj_skip_once标记跳过（摘「检查新版本」按钮带出的多余同步），其余一行未动
   v0.13.0 2026-09-16 班① 第5条：新增长按点亮零件 HX.pick（列表行长按1.5秒点亮该行、账本hx_pick_v1、30秒自动灭、再长按同一行熄灭、点亮别行自动换；触摸+鼠标两路，移动超10px或提前松手取消；堵安卓长按系统菜单）+ HX.ai面板顶部亮牌行（面板打开/每次发送前刷新，显示已点亮文件名或引导语；发送内容仍由宿主决定，不新造数据通道）；其余一行未动
   v0.12.2 2026-09-15（挂号#95，洪老师真机报"速记取图后点输入框又跳图库、不显示取图成功"）：病根=X5壳侧fileChooser回调悬挂在常驻隐藏input上无法自愈，下个手势重放弹图库+saveImg重活链断无回执——①📷取图改每次临时造input用完即弃 ②选图在途闸防重弹（focus+30秒超时兜底复位） ③saveImg改createObjectURL优先+15秒看门狗超时报明白话；其余一行未动
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
     HX.pick    长按点亮零件（v0.13.0 班① 第5条：bind绑长按点亮、账本hx_pick_v1、30秒自动灭、get()公开口；AI面板亮牌只读它）

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
  var HX_COMMON_VERSION = '0.13.2'; /* v0.13.2 2026-09-16 班④：洪老师拍板"把这个多余的命令取消掉"——开门闲时8秒速记上行认 hx_sj_skip_once 标记（主界面v1.19.1「检查新版本」按钮所立）跳过本次，查版本刷新不再带出速记流水.txt上行；「记下后上行」等其他入口一行未动 */ /* v0.13.1 2026-09-16 班③：查版本归管家一家——有管家的壳里HX.selfUp开门自查退休（管家每日闲时统一查装+验暗号），没管家的老壳/浏览器照旧；其余一行未动 */ /* v0.13.0 2026-09-16 班① 第5条：新增长按点亮零件 HX.pick（hx_pick_v1账本+30秒自动灭+触摸鼠标两路长按）+ HX.ai面板顶部亮牌行；其余一行未动 */ /* v0.12.2 2026-09-15（挂号#95，洪老师真机报"速记取图后点输入框又跳图库、不显示取图成功"）：病根=X5壳侧fileChooser回调悬挂在常驻隐藏input上无法自愈，下个手势重放弹图库+saveImg重活链断无回执——①📷取图改每次临时造input用完即弃 ②选图在途闸防重弹（focus+30秒超时兜底复位） ③saveImg改createObjectURL优先+15秒看门狗超时报明白话；其余一行未动 */ /* v0.12.1 2026-09-15（挂号#104，洪老师真机报"U盘病历一个没显示+进到深层回不到上一层"）：HX.fm专修——①文件排序改按修改时间新→旧（实锤：壳侧按名排，中文名病历全沉到套装hxdata_*等英文名件后面，翻不到就当没有；新拷的病历时间最新，直接浮顶），文件夹仍在前；②空名/乱码名件不再哑巴，标「（名字读不出）」照列；③列表顶部加小字「本层共N项」（搜索时「搜到N项」）让他知道看没看全；④面包屑行🏠旁加显眼「⬅返回上一层」钮，有上级即亮，点=回父目录；面包屑回跳改走浏览足迹栈（旧法按"/"拼路径，SAF的safdoc://URI里全是斜杠，点中段必坏——实锤修掉）；⑤pick加opt.hideKit=true时过滤套装自有件（hxdata_*.json、hx-common*.js、guanjia-pdf-engine.js、version-*.json、速记流水.txt、mg_开头、mgver_开头、sjimg_开头、原文库_开头、dsm_开头，文件夹照列），默认false不动其他场景；⑥folder模式底部加「＋在此新建文件夹」钮（壳v1.8.4新fmMkdir桥，X5里prompt不稳，用行内小浮层输名字）；其余一行未动 */ /* v0.12.0 2026-09-15：新增HX.fm手机文件夹逛一逛（壳全盘文件桥六桥+ensure权限引导浮层+pick全屏仿资源管理器+read封装Promise）；其余一行未动 */ /* v0.11.1 2026-09-14：速记📷附图改两步走（挂号#94，洪老师真机验收报「选完图浮窗被关掉没法输说明、图跑哪去不知道」，拍板A+B都做）——①选图不再立刻记行/关面板：压图存壳后面板挂一行「🖼已挂图 sjimg_xxx.jpg（✕可撤销）」，可继续打字补说明，点「记下」图和话一起进流水（save原逻辑未动，只认sjPendImg）；②回执明白话：记下提示图存手机壳文件名+联网传坚果云/学习套装数据/速记图/，上传成功流水行图名后补☁（sjImgUpload出队时回写）；✕撤销=清挂图+出队+删壳文件；其余一行未动 */ /* v0.11.0 2026-09-14：AI面板第2级提示词可改可存（挂号#79，洪老师拍板"不搞三级菜单，就两级，点进去就是几套预设提示词，可改可储存"）——条目带prompts时，第2级点某套进编辑页（全文可改+▶用这套发送+💾存为默认+↩恢复出厂）；改过的存覆盖账本hx_aiprompt_v1.<app>（出厂原文一个字不动，恢复出厂=删覆盖）；宿主函数发送前一句HX.ai.pget(id,idx)查覆盖（乙路，不改送不进去）；条目可带pget/pset/preset钩子接管存储（如大管家问AI接管它自己的hx_gj_askai_v1老账本）；新增HX.ai.pget公开口；其余一行未动 /* v0.10.0 2026-09-14：安心条HX.step（顶部细进度条+两行小字，愣住定格定位，洪老师拍板全家统一）+速记📷附图（压图存壳文件夹sjimg_*+行尾挂图+坚果云/学习套装数据/速记图/上传排队）；其余一行未动 /* v0.9.1 2026-09-14：HX.store.sync批量抱回（壳v1.7.3 readFiles桥）——多件对账一次JNI全读回，免逐件SAF往返卡主线程（洪老师真机报"点大管家变蓝后定住"，病根=5本账本连环读各约2秒）；旧壳无readFiles自动回落逐件读，逻辑一字未改 /* v0.9.0 2026-09-13：常驻通信管家双通道（洪老师拍板一次做完）——新增HX.mg投信层（壳v1.7.0管家在则GitHub联网写信mg_out_给后台服务代发+回信mg_in_轮询取，网页线程不碰网络；管家不在自动走老fetch，全家零改动）+HX.big大件异步编解码（TextEncoder/Decoder分块让气，无则回落老同步）；改道点=gh.fetch一个收口；_autoNetOk闸门规矩不变 /* v0.8.0 2026-09-13：开门静默令（洪老师拍板：开门不许自动同步/不许自动查版本，点了才做）——全家自动联网（dav rescue/mirror、relay闲时送与pull、selfUp、selfCheck、速记开门补推）统一过HX._autoNetOk闸门：默认全关，3秒内真有点击（=点了按钮）或localStorage hx_auto_net=1才放行；新增HX.syncNow()一件全手动补做；本地存取（HX.store/localStorage/壳文件）不联网不受影响；其余一行未动 /* v0.7.0 2026-09-12：HX.dav全异步化（根治#75/#77同步联网卡死主线程）——走壳v1.6.0新davAsync后台桥+HX._davCb回调，ts对账逻辑一行未改；旧壳没davAsync一律静默跳过绝不回退同步老路，壳升级后自动恢复 */ /* v0.6.0 2026-09-12 地基二期：HX.dav的rescue升级为ts对账（云端新超5秒留档_冲突_后盖回/本地新或相等顺手davUp追平/云端缺顺手davUp补齐） */ /* v0.5.0 2026-09-12：新增中转邮路HX.relay+坚果云腿HX.dav */ /* v0.4.0 2026-09-12：新增仓管员HX.store，地基工程一期规矩A/B落地 */ /* v0.3.0 2026-09-11：部件自升级HX.selfUp（病根：壳里旧版公共件永远不升级→AI面板等新功能装了也白装；开门闲时20秒比对云端version-hx-common.json，旧了静默下载写回授权文件夹，下次开门用新的，全程不弹窗） */ /* v0.2.0 2026-09-11：新增HX.ai统一AI面板（两层结构+定位置顶+AI功能生成器，洪老师2026-09-11拍板方法论落地试点）；HX.sj面板加「🤖AI」入口钮；其余一行未动 */ /* v0.1.1 2026-09-10：HX.sj.init 加可选 extraBtn（大管家#43「补充上一条」补回，洪老师点名功能）；不传仍是2钮版，默认行为不变 */
  if(window.HX && window.HX.HX_COMMON_VERSION){ return; } /* 已装过不重复装 */
  var HX = { HX_COMMON_VERSION: HX_COMMON_VERSION, ok: true };
  function warn(m){ try{ if(window.console && console.warn) console.warn('[hx-common] '+m); }catch(e){} }
  function lsGet(k){ try{ return localStorage.getItem(k)||''; }catch(e){ return ''; } }
  function lsSet(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  function trim(s){ return String(s||'').replace(/^\s+|\s+$/g,''); }

  /* ════ 0.9 开门静默闸门（v0.8.0，洪老师2026-09-13拍板：开门不要同步不要查版本，点了才做） ════
     规矩：凡"自动/闲时/开门"触发的联网（坚果云腿、中转邮路、自升级、版本自检、速记开门补推）一律先过HX._autoNetOk()；
     放行只有两种：①3秒内真有手指点击（=点了按钮，点啥干啥）②localStorage hx_auto_net='1'（总开关，默认关）。
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
      if(lsGet('hx_auto_net') === '1') return true; /* 总开关：想恢复全自动就开关=1 */
      return (Date.now() - (HX._lastTap || 0)) < 3000; /* 刚点了按钮（3秒内）才放行 */
    }catch(e){ return false; }
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
    /* 大模型Key：hx_apikey→bg_apikey→xt_apikey 顺序返回第一个非空 */
    get: function(){ try{ return lsGet('hx_apikey')||lsGet('bg_apikey')||lsGet('xt_apikey')||''; }catch(e){ return ''; } },
    /* 千问Key：hx_qwenkey→bg_qwen_key */
    getQwen: function(){ try{ return lsGet('hx_qwenkey')||lsGet('bg_qwen_key')||''; }catch(e){ return ''; } },
    /* 写Key只写 hx_apikey（旧键保留不删，自然淘汰） */
    set: function(v){ try{ lsSet('hx_apikey', String(v==null?'':v)); }catch(e){} },
    /* GitHub 钱罐：hx_gh_tok/user/repo（fallback br_gh_*），三样齐才算有；返回 {t,u,r} 或 null */
    gh: function(){
      try{
        var t=lsGet('hx_gh_tok')||lsGet('br_gh_tok'),
            u=lsGet('hx_gh_user')||lsGet('br_gh_user'),
            r=lsGet('hx_gh_repo')||lsGet('br_gh_repo');
        t=trim(t); u=trim(u); r=trim(r);
        if(!t||!u||!r) return null;
        return { t:t, u:u, r:r, tok:t, user:u, repo:r };
      }catch(e){ return null; }
    },
    /* 坚果云：hx_dav_user/hx_dav_pass；返回 {user,pass} 或 null */
    dav: function(){
      try{
        var u=lsGet('hx_dav_user'), p=lsGet('hx_dav_pass');
        if(!u||!p) return null;
        return { user:u, pass:p };
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
  HX.bill.toast = function(c){try{var d=document.createElement("div");d.textContent=HX.bill.msg(c);d.style.cssText="position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#4a6b4f;color:#fff;padding:10px 18px;border-radius:20px;font-size:14px;z-index:99999;box-shadow:0 2px 8px rgba(0,0,0,.25)";document.body.appendChild(d);setTimeout(function(){d.remove();},4000);}catch(e){}};

  /* ════ 5. 浮标速记 HX.sj（从 software-notes.html 原文提取，8份MD5一致版；行为一字不差） ════
     右下角半透明圆点🏥→弹小输入框→「记下」追加授权文件夹「速记流水.txt」（带时间+软件名+hx_gj_curpt当前病人+页面标题）
     →自动PUT仓根目录；闲时8秒补一次对账（hx_sj_uplocal，内容没变不重复推）；无壳降级提示；没钥匙/没网静默跳过。
     各软件一行接入：HX.sj.init({app:'软件名', getCtx:function(){return '　上下文';} /* 可选 *\/}) */
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
    function sjGhKeys(){ try{ var g=function(k){ return localStorage.getItem(k)||''; }; var t=g('hx_gh_tok')||g('br_gh_tok'),u=g('hx_gh_user')||g('br_gh_user'),r=g('hx_gh_repo')||g('br_gh_repo'); if(!t||!u||!r) return null; return {t:t,u:u,r:r}; }catch(e){ return null; } }
    function sjUpload(){
      try{
        if(!bridged()) return;
        var g=sjGhKeys(); if(!g||!window.fetch) return;
        var b=LearnShell.readFile('速记流水.txt'); if(!b) return;
        var txt=b64d(b); if(!txt) return;
        if(txt===localStorage.getItem('hx_sj_uplocal')) return;
        var api='https://api.github.com/repos/'+encodeURIComponent(g.u)+'/'+encodeURIComponent(g.r)+'/contents/'+encodeURIComponent('速记流水.txt');
        var H={'Authorization':'token '+g.t,'Accept':'application/vnd.github+json'};
        fetch(api,{headers:H}).then(function(resp){ if(resp.status===404) return {sha:null}; if(!resp.ok) throw 0; return resp.json(); }).then(function(j){
          var body={message:'速记自动上行 '+HX_SJ_APP, content:b64e(txt)};
          if(j&&j.sha) body.sha=j.sha;
          return fetch(api,{method:'PUT',headers:H,body:JSON.stringify(body)});
        }).then(function(resp){ if(!resp.ok) throw 0; return resp.json(); }).then(function(){
          try{ localStorage.setItem('hx_sj_uplocal',txt); }catch(e){}
        }).catch(function(){ /* 静默：没网/钥匙不好使都不打搅，下回记下自动补 */ });
        try{ sjImgUpload(); }catch(e){} /* v0.10.0 顺带清hx_sjimg_pend队列：逐件upFile，成功出队失败留 */
      }catch(e){}
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
        var b=LearnShell.readFile('速记流水.txt'); if(!b) return;
        var txt=b64d(b); if(!txt) return;
        var tag='附图 '+fn;
        if(txt.indexOf(tag+'☁')>=0) return;
        if(txt.indexOf(tag)<0) return;
        var neu=txt.replace(tag, tag+'☁');
        LearnShell.writeFile('速记流水.txt', b64e(neu));
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
    function sjToast(m,ms){ var t=$('hxSjToast'); if(!t) return; t.textContent=m; t.style.display='block'; clearTimeout(t._t); t._t=setTimeout(function(){ t.style.display='none'; },(ms||2200)); } /* v0.11.1 加可选时长：回执长话给足时间看 */
    function openPanel(){ var p=$('hxSjPanel'); if(!p) return; p.style.display=(p.style.display==='block')?'none':'block'; if(p.style.display==='block'){ $('hxSjHint').style.display=bridged()?'none':'block'; try{ $('hxSjText').focus(); }catch(e){} } }
    function save(){
      var ta=$('hxSjText'); var v=(ta.value||'').replace(/^\s+|\s+$/g,'');
      if(!v){ sjToast('先写一句再记'); return; }
      if(!bridged()){ $('hxSjHint').style.display='block'; sjToast('请在手机壳里用'); return; }
      var d=new Date();
      var ts=d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+' '+pad(d.getHours())+':'+pad(d.getMinutes());
      var ctx='';
      try{ var pt=localStorage.getItem('hx_gj_curpt'); if(pt){ pt=String(pt).replace(/^["']+|["']+$/g,''); if(pt) ctx+='　病人:'+pt; } }catch(e){}
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
      try{ var b=LearnShell.readFile('速记流水.txt'); if(b) old=b64d(b); }catch(e){ old=''; }
      var neu=old+((old&&old.charAt(old.length-1)!=='\n')?'\n':'')+line+'\n';
      try{
        var hadImg=sjPendImg; /* v0.11.1 记下前留一份，回执要用 */
        LearnShell.writeFile('速记流水.txt', b64e(neu));
        if(hadImg){ sjToast('已记下+图：图存手机壳里 '+hadImg+'，联网后传坚果云/学习套装数据/速记图/，传成行尾标☁', 6000); sjPendImg=''; sjImgLineShow(''); }
        else sjToast('已记下');
        ta.value=''; $('hxSjPanel').style.display='none';
        try{ sjUpload(); }catch(e){} /* 速记自动上行：本地存成后顺手推上网，失败静默下回补 */
      }catch(e){ sjToast('没存成：'+e.message); }
    }
    /* v0.1.1 extraBtn「补充上一条」（大管家 v0.19.0 #43 洪老师速记14:04"可以给上一条补充内容"，原文逻辑一字未改）：
       不开新行，把话以「　补充：」追加到速记流水.txt最后一行末尾；没有上一条提示先记 */
    function appendLast(){
      var ta=$('hxSjText'); var v=(ta.value||'').replace(/^\s+|\s+$/g,'');
      if(!v){ sjToast('先写一句再补充'); return; }
      if(!bridged()){ $('hxSjHint').style.display='block'; sjToast('请在手机壳里用'); return; }
      var old='';
      try{ var b=LearnShell.readFile('速记流水.txt'); if(b) old=b64d(b); }catch(e){ old=''; }
      old=old.replace(/\s+$/,'');
      if(!old){ sjToast('还没有上一条，先点「记下」'); return; }
      var neu=old+'　补充：'+v+'\n';
      try{
        LearnShell.writeFile('速记流水.txt', b64e(neu));
        sjToast('已补到上一条'); ta.value=''; $('hxSjPanel').style.display='none';
        try{ sjUpload(); }catch(e){} /* 顺手上行，失败静默下回补 */
      }catch(e){ sjToast('没存成：'+e.message); }
    }
    /* 页面里还没有速记UI就自动注入（样式+圆点+面板+toast，和9件内嵌版一模一样的结构） */
    function ensureUI(){
      if($('hxSjDot')) return true;
      try{
        if(!document.body) return false;
        var st=document.createElement('style'); st.id='hxSjStyle';
        st.textContent=
          "#hxSjDot{position:fixed;right:18px;bottom:88px;width:52px;height:52px;border-radius:50%;background:rgba(122,158,126,.55);border:2px solid rgba(255,255,255,.75);color:#fff;font-size:22px;z-index:99990;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.18);user-select:none;-webkit-user-select:none}\n"+
          "#hxSjPanel{position:fixed;right:14px;bottom:150px;width:320px;max-width:86vw;background:#fffdf8;border:1px solid #e5ddd0;border-radius:14px;box-shadow:0 6px 24px rgba(0,0,0,.18);z-index:99991;padding:12px;display:none}\n"+
          "#hxSjText{width:100%;box-sizing:border-box;min-height:72px;font-size:18px;line-height:1.5;border:1px solid #ddd2c2;border-radius:10px;padding:10px;background:#fff;color:#4a4238;resize:vertical}\n"+
          "#hxSjPanel .hxSjBtns{display:flex;gap:10px;margin-top:10px}\n"+
          "#hxSjPanel button{flex:1;font-size:18px;padding:10px 0;border:none;border-radius:10px;cursor:pointer}\n"+
          "#hxSjSave{background:#7a9e7e;color:#fff}\n"+
          "#hxSjClose{background:#efe9df;color:#6b6257}\n"+
          "#hxSjHint{font-size:13px;color:#a05848;margin-top:8px;display:none}\n"+
          "#hxSjToast{position:fixed;left:50%;bottom:160px;transform:translateX(-50%);background:rgba(74,64,48,.92);color:#fff;padding:10px 20px;border-radius:20px;font-size:16px;z-index:99992;display:none}";
        document.head.appendChild(st);
        var wrap=document.createElement('div');
        wrap.innerHTML=
          '<div id="hxSjDot" title="速记">🏥</div>'+
          '<div id="hxSjPanel">'+
          '  <textarea id="hxSjText" placeholder="发现啥毛病，写一句…"></textarea>'+
          '  <div id="hxSjImgLine" style="display:none;font-size:13px;color:#4a4238;margin-top:6px;background:#f5efe4;border-radius:8px;padding:4px 8px"></div>'+ /* v0.11.1 挂图行：选了图没记下时显示 */
          '  <div class="hxSjBtns"><button id="hxSjSave" type="button">记下</button>'+
          '<button id="hxSjImg" type="button" style="background:#efe9df;color:#6b6257;">📷图</button>'+ /* v0.10.0 附图钮：始终在「记下」旁，样式同关闭钮 */
          (sjExtraBtn ? '<button id="hxSjAppend" type="button" style="background:#b8925a;color:#fff;">'+String(sjExtraBtn.label||'补充上一条')+'</button>' : '')+ /* v0.1.1 extraBtn：不传不出这钮，默认2钮版 */
          '<button id="hxSjClose" type="button">关上</button>'+
          ((HX.ai && HX.ai.ready && HX.ai.ready()) ? '<button id="hxSjAiBtn" type="button" style="background:#efe9df;color:#6b6257;">🤖AI</button>' : '')+ /* v0.2.0 AI面板入口：HX.ai已init且UI就绪才出这钮，不出现不影响速记 */
          '</div>'+
          '  <div id="hxSjHint">浏览器里存不了，请在手机壳里用</div>'+
          '</div>'+
          '<div id="hxSjToast"></div>';
        while(wrap.firstChild){ document.body.appendChild(wrap.firstChild); }
        return true;
      }catch(e){ warn('sj UI注入失败: '+((e&&e.message)||e)); return false; }
    }
    function bind(){
      var dot=$('hxSjDot'); if(!dot) return;
      dot.addEventListener('click', openPanel);
      $('hxSjSave').addEventListener('click', save);
      if(sjExtraBtn && $('hxSjAppend')) $('hxSjAppend').addEventListener('click', appendLast); /* v0.1.1 extraBtn */
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
        if(!_skip && HX._autoNetOk()) sjUpload();
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
    var _inited = false, _uiOk = false, _inRun = false;
    function $(id){ return document.getElementById(id); }
    function aiToast(m){ var t=$('hxAiToast'); if(!t) return; t.textContent=m; t.style.display='block'; clearTimeout(t._t); t._t=setTimeout(function(){ t.style.display='none'; },2600); }
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
        try{ if(!HX.keys.get() && !HX.keys.getQwen()){ aiToast('还没有API Key，先去设置里填一个'); return; } }catch(e){}
        var usr='（无资料）';
        if(x.useSel){ try{ var s=String(window.getSelection ? window.getSelection() : ''); if(s) usr=s; }catch(e){} }
        _send(x.text||'', usr, function(r){ showResult(x.name, r); }, function(err){ aiToast('AI这条路不通：'+String(err||'').slice(0,60)); });
      }catch(e){ warn('ai 自建条目: '+((e&&e.message)||e)); }
    }
    function mkExtItem(x){
      return { id:x.id, name:x.name, icon:x.icon||'🛠', section:x.section||'', desc:x.desc||'自建功能', custom:true, prompts:null, run:function(){ extRun(x); } };
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
    /* 第1层：全清单，getSection()对上的排最前标「本页」，自建的标「自建」 */
    function renderL1(){
      var body=$('hxAiBody'); if(!body) return;
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
        for(var i=0;i<it.prompts.length;i++) html+='<div class="hxAiRow" data-hxaip="'+i+'">'+escH(it.prompts[i].name||('第'+(i+1)+'套'))+'</div>';
      }else{
        html+='<button id="hxAiGo" type="button" class="hxAiGo">▶ 开始</button>';
      }
      body.innerHTML=html;
      $('hxAiBack').addEventListener('click', renderL1);
      var go=$('hxAiGo'); if(go) go.addEventListener('click', function(){ doRun(it); });
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
        '</div>';
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
          b.textContent='📄已点亮：'+(o.fname||o.pkey)+'（点✓确认发送 / 再长按换一份）';
          b.style.background='#eef4fb'; b.style.color='#3a5a78'; b.style.borderColor='#c9d9ea';
        }else{
          b.textContent='请先到列表长按点亮一份文件';
          b.style.background='#f6f2ea'; b.style.color='#8a8178'; b.style.borderColor='#e5ddd0';
        }
      }catch(e){}
    }
    /* 「＋加AI功能」生成器：依次问三样（宿主hxAsk优先，没有则window.prompt）→存hx_aiext_v1.<app>→进第1层末尾 */
    function genFlow(){
      try{
        var useAsk=(typeof window.hxAsk==='function');
        var finish=function(name, ptext, useSel){
          name=String(name||'').replace(/^\s+|\s+$/g,''); ptext=String(ptext||'').replace(/^\s+|\s+$/g,'');
          if(!name || !ptext){ aiToast('功能名和提示词都要填'); return; }
          var arr=extLoad();
          arr.push({ id:'ext-'+Date.now(), name:name, text:ptext, useSel:!!useSel, icon:'🛠' });
          extSave(arr);
          renderL1(); aiToast('已加到清单末尾（标「自建」）');
        };
        if(useAsk){
          window.hxAsk('① 新AI功能叫啥名？','','',function(name){
            if(name===null||name===undefined) return;
            window.hxAsk('② 提示词：AI要怎么干？','','',function(ptext){
              if(ptext===null||ptext===undefined) return;
              window.hxAsk('③ 带不带当前选中文字？（是/否）','否','',function(s){
                if(s===null||s===undefined) return;
                finish(name, ptext, /^(是|y|yes)/i.test(String(s||'').replace(/^\s+|\s+$/g,'')));
              },'生成');
            },'下一步');
          },'下一步');
        }else{
          var name2=window.prompt('① 新AI功能叫啥名？',''); if(name2===null||name2===undefined) return;
          var ptext2=window.prompt('② 提示词：AI要怎么干？',''); if(ptext2===null||ptext2===undefined) return;
          var s2=window.prompt('③ 带不带当前选中文字？（是/否）','否'); if(s2===null||s2===undefined) return;
          finish(name2, ptext2, /^(是|y|yes)/i.test(String(s2||'').replace(/^\s+|\s+$/g,'')));
        }
      }catch(e){ warn('ai 生成器: '+((e&&e.message)||e)); }
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
    /* HX.ai.init(opt)：opt={app, manifest, getSection, send可选}；重复init只更新manifest不重复绑；document ready后注入UI */
    ai.init = function(opt){
      try{
        opt = opt || {};
        if(opt.app) _app = String(opt.app);
        if(!_app) _app = '未命名软件';
        if(opt.manifest && opt.manifest.length!==undefined) _manifest = opt.manifest;
        if(typeof opt.getSection === 'function') _getSection = opt.getSection;
        if(typeof opt.send === 'function') _send = opt.send;
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
      }catch(e){ warn('ai open: '+((e&&e.message)||e)); }
    };
    /* HX.ai.ready()：面板是否可用（UI注入成功）；面板触发run执行期间短暂返false防套娃 */
    ai.ready = function(){ return !!(_uiOk && !_inRun); };
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
     30秒自动灭（定时器+get()惰性校验双保险）；发送方调 HX.pick.get() 取 {app,pkey,fname,ts}，过期返null；
     无localStorage/无触摸环境一律静默不炸。 */
  HX.pick = (function(){
    var pk = {};
    pk.app = ''; /* 2026-09-16 班① 第5条：宿主可设 HX.pick.app='软件名'，写账本用 */
    var LSK = 'hx_pick_v1';   /* 点亮账本键：值 JSON {app,pkey,fname,ts}（ts=Date.now()毫秒） */
    var HOLD_MS = 1500;       /* 长按判定：按住≥1.5秒 */
    var MOVE_PX = 10;         /* 移动超10px=取消本次长按 */
    var TTL_MS = 30000;       /* 点亮有效期30秒，到点自动灭 */
    var _killTimer = null;    /* 30秒自动灭定时器 */
    var _ctxBound = false;    /* contextmenu 全局只绑一次 */
    function lsGet(){ try{ var s=localStorage.getItem(LSK); if(!s) return null; var o=JSON.parse(s); return (o && o.pkey) ? o : null; }catch(e){ return null; } } /* 无localStorage静默返null */
    function lsSet(o){ try{ localStorage.setItem(LSK, JSON.stringify(o)); }catch(e){} }
    function lsDel(){ try{ localStorage.removeItem(LSK); }catch(e){} }
    /* ES5老WebView兼容的class操作（不用classList） */
    function hasCls(el, c){ return !!el && (' '+el.className+' ').indexOf(' '+c+' ') >= 0; }
    function addCls(el, c){ try{ if(el && !hasCls(el,c)) el.className = (el.className ? el.className+' ' : '') + c; }catch(e){} }
    function rmCls(el, c){ try{ if(el) el.className = (' '+el.className+' ').replace(' '+c+' ',' ').replace(/^\s+|\s+$/g,''); }catch(e){} }
    /* toast人话，默认3秒自消（2026-09-16 班① 第5条） */
    function pkToast(m, ms){
      try{
        var d=document.createElement('div'); d.textContent=m;
        d.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#4a6b8f;color:#fff;padding:10px 18px;border-radius:20px;font-size:14px;z-index:99999;box-shadow:0 2px 8px rgba(0,0,0,.25)';
        document.body.appendChild(d);
        setTimeout(function(){ try{ if(d.remove) d.remove(); else if(d.parentNode) d.parentNode.removeChild(d); }catch(e){} }, ms||3000);
      }catch(e){}
    }
    /* 清页面上所有点亮样式 */
    function clearPicked(){ try{ var els=document.querySelectorAll('.hx-picked'); for(var i=0;i<els.length;i++) rmCls(els[i],'hx-picked'); }catch(e){} }
    /* 30秒自动灭：到点若账本ts未变（没被新点亮顶替）才清账本+清样式 */
    function armKill(ts){
      try{ if(_killTimer){ clearTimeout(_killTimer); _killTimer=null; } }catch(e){}
      _killTimer = setTimeout(function(){
        try{
          var o=lsGet();
          if(o && (+o.ts||0)===ts){ lsDel(); clearPicked(); }
        }catch(e){}
      }, TTL_MS);
    }
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
      if(cur && cur.pkey===pkey && (Date.now()-(+cur.ts||0))<=TTL_MS){
        /* 再长按同一行=熄灭：清class（上面已清）+清账本 */
        lsDel();
        try{ if(_killTimer){ clearTimeout(_killTimer); _killTimer=null; } }catch(e){}
        pkToast('已熄灭点亮', 3000);
        return;
      }
      /* 点亮该行（长按另一行=自动换） */
      addCls(el, 'hx-picked');
      var o={ app:pk.app||'', pkey:pkey, fname:String(el.getAttribute('data-fname')||''), ts:Date.now() };
      lsSet(o);
      armKill(o.ts);
      pkToast('已点亮：'+(o.fname||pkey)+'，点🤖就送这份', 3000);
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
    /* HX.pick.get()：读账本并惰性校验30秒有效期；过期返null并顺手清掉（账本+页面样式） */
    pk.get = function(){
      try{
        var o=lsGet(); if(!o) return null;
        if(Date.now()-(+o.ts||0) > TTL_MS){ lsDel(); clearPicked(); return null; }
        return { app:String(o.app||''), pkey:String(o.pkey||''), fname:String(o.fname||''), ts:(+o.ts)||0 };
      }catch(e){ return null; }
    };
    /* HX.pick.clear()：公开熄灭口（宿主发送成功后可主动灭） */
    pk.clear = function(){
      try{ lsDel(); clearPicked(); if(_killTimer){ clearTimeout(_killTimer); _killTimer=null; } }catch(e){}
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
      if(n==='guanjia-pdf-engine.js'||n==='速记流水.txt') return true;
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
            ? '<button id="hxFmOk" type="button" style="background:#7a9e7e;color:#fff;border:none;border-radius:8px;padding:9px 16px;font-size:14px;margin-right:8px;cursor:pointer;">✅收0份</button>'
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
          if(mode==='files'&&multi){ var ok=$f('hxFmOk'); if(ok) ok.textContent='✅收'+st.selN+'份'; }
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
  try{ if(window.console && console.info) console.info('[hx-common] v'+HX_COMMON_VERSION+' 已装（keys/gh/sj/selfCheck/bill/ai/store/relay/dav）'); }catch(e){}
})();
