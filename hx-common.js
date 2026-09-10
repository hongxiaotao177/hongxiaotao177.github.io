/* ═══════════════════════════════════════════════════════════════════════════
   hx-common.js —— 全家9件软件共用公共件母版
   HX_COMMON_VERSION = '0.1.0'（2026-09-10 plan2 军规：钥匙统一+收公共块+不崩溃压倒一切）

   收编四样+账本（AI底座不收）：
     HX.keys    钥匙统一读取（hx_apikey→bg_apikey→xt_apikey；hx_gh_*→br_gh_*；hx_qwenkey→bg_qwen_key；hx_dav_*）
     HX.gh      GitHub 传输（以 software-bridge.html 的19个gh函数为底，统一命名空间 HX.gh.*）
     HX.sj      浮标速记+自动上行（从 software-notes.html 原文提取，8份MD5一致版）
     HX.selfCheck(app, swVersion)  版本自检（学习笔记 ghSelfCheck 通用化，API优先失败走raw直链带?t=防缓存）
     HX.bill    全家AI账本 hx_aibill（照抄学习笔记 hxBill 实现格式）

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
  var HX_COMMON_VERSION = '0.1.1'; /* v0.1.1 2026-09-10：HX.sj.init 加可选 extraBtn（大管家#43「补充上一条」补回，洪老师点名功能）；不传仍是2钮版，默认行为不变 */
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
          '<button id="hxSjClose" type="button">关上</button></div>'+
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

  window.HX = HX;
  try{ if(window.console && console.info) console.info('[hx-common] v'+HX_COMMON_VERSION+' 已装（keys/gh/sj/selfCheck/bill）'); }catch(e){}
})();
