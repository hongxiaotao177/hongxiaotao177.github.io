/* ═══════════════════════════════════════════════════════════════════════════
   hx-common.js —— 全家9件软件共用公共件母版
   HX_COMMON_VERSION = '0.2.0'（2026-09-10 plan2 军规：钥匙统一+收公共块+不崩溃压倒一切）
   v0.4.0 2026-09-12：新增仓管员HX.store，地基工程一期规矩A/B落地（规矩A：一套门存取；规矩B：时间定新旧、冲突留档不覆盖）；修正：真源文件名前缀hxdata_沿用大管家旧档、兼容老hxStore裸档按mtime认读并升级信封、留档文件名放行中文「_冲突_」字样、留档名时分补秒防同分互盖；其余一行未动
   v0.3.0 2026-09-11：部件自升级HX.selfUp（洪老师拍板彻底治"壳内部件不更新"病根：开门闲时比对云端version-hx-common.json，旧了静默下载新版写回授权文件夹，下次开门生效；全程不弹窗，没壳/没网跳过）；其余一行未动
   v0.2.0 2026-09-11：新增HX.ai统一AI面板（两层结构+定位置顶+AI功能生成器，洪老师2026-09-11拍板方法论落地试点）；HX.sj面板加「🤖AI」入口钮；其余一行未动

   收编四样+账本（AI底座不收）：
     HX.keys    钥匙统一读取（hx_apikey→bg_apikey→xt_apikey；hx_gh_*→br_gh_*；hx_qwenkey→bg_qwen_key；hx_dav_*）
     HX.gh      GitHub 传输（以 software-bridge.html 的19个gh函数为底，统一命名空间 HX.gh.*）
     HX.sj      浮标速记+自动上行（从 software-notes.html 原文提取，8份MD5一致版）
     HX.selfCheck(app, swVersion)  版本自检（学习笔记 ghSelfCheck 通用化，API优先失败走raw直链带?t=防缓存）
     HX.bill    全家AI账本 hx_aibill（照抄学习笔记 hxBill 实现格式）
     HX.store   仓管员：一套门存取（has/get/set/remove/sync/conflicts），壳内文件夹hxdata_<key>.json真源+localStorage缓存，时间定新旧、双动冲突留档（地基工程一期）

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
  var HX_COMMON_VERSION = '0.4.0'; /* v0.4.0 2026-09-12：新增仓管员HX.store，地基工程一期规矩A/B落地 */ /* v0.3.0 2026-09-11：部件自升级HX.selfUp（病根：壳里旧版公共件永远不升级→AI面板等新功能装了也白装；开门闲时20秒比对云端version-hx-common.json，旧了静默下载写回授权文件夹，下次开门用新的，全程不弹窗） */ /* v0.2.0 2026-09-11：新增HX.ai统一AI面板（两层结构+定位置顶+AI功能生成器，洪老师2026-09-11拍板方法论落地试点）；HX.sj面板加「🤖AI」入口钮；其余一行未动 */ /* v0.1.1 2026-09-10：HX.sj.init 加可选 extraBtn（大管家#43「补充上一条」补回，洪老师点名功能）；不传仍是2钮版，默认行为不变 */
  if(window.HX && window.HX.HX_COMMON_VERSION){ return; } /* 已装过不重复装 */
  var HX = { HX_COMMON_VERSION: HX_COMMON_VERSION, ok: true };
  function warn(m){ try{ if(window.console && console.warn) console.warn('[hx-common] '+m); }catch(e){} }
  function lsGet(k){ try{ return localStorage.getItem(k)||''; }catch(e){ return ''; } }
  function lsSet(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  function trim(s){ return String(s||'').replace(/^\s+|\s+$/g,''); }

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
      }catch(e){}
    }
    function sjToast(m){ var t=$('hxSjToast'); if(!t) return; t.textContent=m; t.style.display='block'; clearTimeout(t._t); t._t=setTimeout(function(){ t.style.display='none'; },2200); }
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
      var line='['+ts+'] 【'+HX_SJ_APP+'】'+v+ctx;
      var old='';
      try{ var b=LearnShell.readFile('速记流水.txt'); if(b) old=b64d(b); }catch(e){ old=''; }
      var neu=old+((old&&old.charAt(old.length-1)!=='\n')?'\n':'')+line+'\n';
      try{
        LearnShell.writeFile('速记流水.txt', b64e(neu));
        sjToast('已记下'); ta.value=''; $('hxSjPanel').style.display='none';
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
          '  <div class="hxSjBtns"><button id="hxSjSave" type="button">记下</button>'+
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
      if(HX.ai && HX.ai.ready && HX.ai.ready()){ var sjAiBtn=$('hxSjAiBtn'); if(sjAiBtn) sjAiBtn.addEventListener('click', function(){ try{ $('hxSjPanel').style.display='none'; }catch(e){} try{ HX.ai.open(); }catch(e){} }); } /* v0.2.0 AI面板入口：点击=关速记面板+HX.ai.open() */
      setTimeout(function(){ try{ sjUpload(); }catch(e){} }, 8000); /* 速记自动上行：开门闲时对账补推（上次没网漏的在这补） */
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
     两层结构：第1层功能清单（getSection()对上的条目置顶标「本页」）→第2层条目详情（有prompts列提示词套/无则「▶ 开始」大钮）；
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
        el.addEventListener('click', function(){ doRun(it); }); /* 点一套=执行run：取数/发送/结果宿主自己管 */
      });
    }
    /* 面板触发run：执行期间ready()返false防宿主拦截行套娃；错误只warn不外抛 */
    function doRun(it){
      _inRun=true;
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
      }catch(e){ warn('ai open: '+((e&&e.message)||e)); }
    };
    /* HX.ai.ready()：面板是否可用（UI注入成功）；面板触发run执行期间短暂返false防套娃 */
    ai.ready = function(){ return !!(_uiOk && !_inRun); };
    return ai;
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
    /* 读真源文件 → {v,ts} 或 null（没壳/没文件/坏JSON都算没有，单键坏不炸别键）；
       兼容老hxStore裸档：解析不出信封就按裸值认读 v=文件原文、ts=文件mtime，标_bare待sync升级，绝不丢旧数据 */
    function rRead(key){
      try{
        if(!shOk()) return null;
        var fn = fname(key);
        var b = LearnShell.readFile(fn);
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
    st.sync = function(keys, cb){
      var news = [];
      try{
        keys = keys || [];
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
      try{ if(cb) cb(news); }catch(e){}
    };
    /* 本轮sync累计冲突清单（内存数组） */
    st.conflicts = function(){ try{ return conflictList.slice(); }catch(e){ return []; } };
    return st;
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
  HX.selfUp = function(){
    try{
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
  try{ if(window.console && console.info) console.info('[hx-common] v'+HX_COMMON_VERSION+' 已装（keys/gh/sj/selfCheck/bill/ai）'); }catch(e){}
})();
