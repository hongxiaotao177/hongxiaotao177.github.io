/* 新AI管家功能网页更新器：照旧套装查牌、校验、写后回读；不碰学习数据和原生程序。 */
(function(){
'use strict';
var CACHE='aimanager_web_update_v1',META='aimanager_update_receipt_v1',TAKEOVER_ERROR='aimanager_update_takeover_error_v1';
var PUBLIC_API='https://api.github.com/repos/hongxiaotao177/hongxiaotao177.github.io/contents/ai-manager/';
var PUBLIC_RAW='https://raw.githubusercontent.com/hongxiaotao177/hongxiaotao177.github.io/main/ai-manager/';
var LOCAL_HISTORY=[
 {version:'1.4.1',releasedAt:'2026-11-02',note:'修复新版下载后一直停在刷新；刷新失败明说，接管失败保留旧版并显示原因。'},
 {version:'1.4.0',releasedAt:'2026-11-02',note:'改用系统原生选字，确认原文和字数后问概念，数字标落到原选文末尾并随重开恢复。'},
 {version:'1.3.0',releasedAt:'2026-11-02',note:'首页亮版本，自动查新，更新写后回读，逐版历史可见。'},
 {version:'1.2.0',releasedAt:'2026-11-02',note:'学习功能直接进入新AI管家，旧问话接回，增加点亮、复核、脑图、对话仓库和手动成书。'},
 {version:'1.1.2',releasedAt:'2026-11-01',note:'修复问话失败链和打开闪退，保留原问话、历史和提示词。'}
];
var S={version:'1.4.1',busy:false,message:'准备检查新版本',state:'waiting',lastCheck:0,lastReceipt:null,history:LOCAL_HISTORY.slice(),timer:null};
function $(id){return document.getElementById(id);}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function readJson(key,fallback){try{var x=JSON.parse(localStorage.getItem(key)||'');return x||fallback;}catch(e){return fallback;}}
function saveJson(key,value){localStorage.setItem(key,JSON.stringify(value));}
function cmp(a,b){var x=String(a||'0').split('.'),y=String(b||'0').split('.'),n=Math.max(x.length,y.length);for(var i=0;i<n;i++){var p=parseInt(x[i]||'0',10)||0,q=parseInt(y[i]||'0',10)||0;if(p!==q)return p>q?1:-1;}return 0;}
function enc(s){return new TextEncoder().encode(String(s));}
function dec(s){var a=atob(String(s||'').replace(/\s/g,'')),b=new Uint8Array(a.length);for(var i=0;i<a.length;i++)b[i]=a.charCodeAt(i);return new TextDecoder().decode(b);}
function sha256Pure(bytes){
 var K=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
 var H=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19],l=bytes.length,bit=l*8,total=Math.ceil((l+9)/64)*64,data=new Uint8Array(total);data.set(bytes);data[l]=128;var dv=new DataView(data.buffer);dv.setUint32(total-8,Math.floor(bit/4294967296));dv.setUint32(total-4,bit>>>0);
 function rr(x,n){return (x>>>n)|(x<<(32-n));}
 for(var off=0;off<total;off+=64){var w=new Uint32Array(64);for(var t=0;t<16;t++)w[t]=dv.getUint32(off+t*4);for(t=16;t<64;t++){var a=w[t-15],b=w[t-2];w[t]=(w[t-16]+(rr(a,7)^rr(a,18)^(a>>>3))+w[t-7]+(rr(b,17)^rr(b,19)^(b>>>10)))>>>0;}
  var A=H[0],B=H[1],C=H[2],D=H[3],E=H[4],F=H[5],G=H[6],I=H[7];
  for(t=0;t<64;t++){var t1=(I+(rr(E,6)^rr(E,11)^rr(E,25))+((E&F)^((~E)&G))+K[t]+w[t])>>>0,t2=((rr(A,2)^rr(A,13)^rr(A,22))+((A&B)^(A&C)^(B&C)))>>>0;I=G;G=F;F=E;E=(D+t1)>>>0;D=C;C=B;B=A;A=(t1+t2)>>>0;}
  H[0]=(H[0]+A)>>>0;H[1]=(H[1]+B)>>>0;H[2]=(H[2]+C)>>>0;H[3]=(H[3]+D)>>>0;H[4]=(H[4]+E)>>>0;H[5]=(H[5]+F)>>>0;H[6]=(H[6]+G)>>>0;H[7]=(H[7]+I)>>>0;
 }
 return H.map(function(x){return ('00000000'+x.toString(16)).slice(-8);}).join('');
}
async function sha256(text){var bytes=enc(text);try{if(window.crypto&&crypto.subtle){var d=await crypto.subtle.digest('SHA-256',bytes);return Array.from(new Uint8Array(d)).map(function(x){return ('0'+x.toString(16)).slice(-2);}).join('');}}catch(e){}return sha256Pure(bytes);}
async function request(url,opt,ms){var ctl=typeof AbortController!=='undefined'?new AbortController():null,timer=null;opt=opt||{};opt.cache='no-store';if(ctl){opt.signal=ctl.signal;timer=setTimeout(function(){ctl.abort();},ms||20000);}try{var r=await fetch(url,opt);if(!r.ok)throw new Error('http_'+r.status);return r;}finally{if(timer)clearTimeout(timer);}}
async function publicText(path){var last='';try{var r=await request(PUBLIC_API+path.split('/').map(encodeURIComponent).join('/'),{headers:{Accept:'application/vnd.github+json'}},20000),j=await r.json();return dec(j.content);}catch(e){last=String(e.message||e);}try{var r2=await request(PUBLIC_RAW+path.split('/').map(encodeURIComponent).join('/'),{},20000);return await r2.text();}catch(e2){throw new Error(last+' / '+String(e2.message||e2));}}
async function privateText(path){var C=window.APP_CONFIG;if(!C||!C.github)throw new Error('private_config_missing');var base='https://api.github.com/repos/'+C.github.owner+'/'+C.github.repo+'/contents/ai-manager/update/';var r=await request(base+path.split('/').map(encodeURIComponent).join('/'),{headers:{Authorization:'Bearer '+C.github.token,Accept:'application/vnd.github+json'}},20000),j=await r.json();return dec(j.content);}
async function fetchText(path){try{return await publicText(path);}catch(e){try{return await privateText(path);}catch(e2){throw new Error('版本仓暂时连不上');}}}
function fmt(t){if(!t)return '还没有记录';try{return new Date(t).toLocaleString('zh-CN',{hour12:false});}catch(e){return String(t);}}
function log(event,detail){try{if(window.Standalone&&Standalone.logStep)Standalone.logStep('update_'+event,Object.assign({version:S.version},detail||{}));}catch(e){}}
function render(){var v=$('currentVersion'),s=$('updateStatus');if(v)v.textContent=S.version;if(s){s.textContent=S.message;s.className='update-status '+S.state;}var m=$('updateModalContent');if(m)m.innerHTML=modalInner();}
function modalInner(){var h='<div class="version-now"><b>当前版本 '+esc(S.version)+'</b></div><p>'+esc(S.message)+'</p><p class="meta">最近检查：'+esc(fmt(S.lastCheck))+'</p>';if(S.lastReceipt)h+='<p class="update-receipt">上次更新：'+esc(S.lastReceipt.version)+' · '+esc(fmt(S.lastReceipt.at))+'<br>'+esc(S.lastReceipt.result||'已回读一致')+'</p>';h+='<button class="primary" data-update-check="1">现在检查新版本</button><h3>逐版历史</h3>';h+=S.history.map(function(x){return '<div class="release-item"><b>'+esc(x.version)+'</b><span class="meta"> '+esc(x.releasedAt||x.date||'')+'</span><p>'+esc(x.note||x.summary||'')+'</p></div>';}).join('');return h;}
function modalHtml(){return '<div id="updateModalContent">'+modalInner()+'</div>';}
function saveMeta(){try{saveJson(META,{lastCheck:S.lastCheck,lastReceipt:S.lastReceipt,history:S.history,message:S.message,state:S.state});}catch(e){}}
function stickyError(text){S.state='failed';S.message=text;render();saveMeta();try{$('toastText').textContent=text;$('toast').classList.add('show');}catch(e){}}
function refreshWait(remote){S.state='failed';S.message='新版已存好，请彻底关闭AI管家再打开一次，不用重装';render();saveMeta();log('refresh_wait',{remote:remote});try{$('toastText').textContent=S.message;$('toast').classList.add('show');}catch(e){}}
function refresh(remote){setTimeout(function(){try{var href=location.href.split('#')[0].split('?')[0];location.replace(href+'?web_update='+Date.now());}catch(e){refreshWait(remote);}},800);setTimeout(function(){if(S.version!==remote)refreshWait(remote);},3500);}
function pendingCache(){var c=readJson(CACHE,null);return c&&c.validated===true&&c.html&&c.version&&cmp(c.version,S.version)>0?c:null;}
async function fetchHistory(){try{var h=JSON.parse(await fetchText('releases.json')),arr=Array.isArray(h)?h:h.releases;if(Array.isArray(arr)&&arr.length){S.history=arr.slice(0,50);render();}}catch(e){}}
async function check(manual){
 if(S.busy)return {state:'busy'};var pending=pendingCache();if(pending){if(manual){try{localStorage.removeItem(TAKEOVER_ERROR);}catch(e){}refresh(pending.version);}else refreshWait(pending.version);return {state:'waiting_restart',remote:pending.version};}
 if(manual){try{localStorage.removeItem(TAKEOVER_ERROR);}catch(e){}}
 S.busy=true;S.state='checking';S.message=manual?'正在手动检查新版本':'正在检查新版本';render();log('check',{manual:!!manual});
 try{
  var card=JSON.parse(await fetchText('version.json')),remote=String(card.version||card.versionName||'');if(!/^\d+(?:\.\d+)*$/.test(remote))throw new Error('版本牌格式不对');
  S.lastCheck=Date.now();fetchHistory();
  if(cmp(remote,S.version)<=0){S.state='latest';S.message=cmp(remote,S.version)===0?'本机已是最新版':'本机版本比仓库新，未回退';render();saveMeta();log('latest',{remote:remote});return {state:'latest',remote:remote};}
  var web=card.web||{};S.state='downloading';S.message='发现新版 '+remote+'，正在下载并核验';render();log('download',{remote:remote});
  var html=await fetchText(web.file||'index.html'),bytes=enc(html).length,digest=await sha256(html);
  if(web.bytes&&bytes!==Number(web.bytes))throw new Error('下载长度不一致，未替换现版');
  if(!web.sha256||digest.toLowerCase()!==String(web.sha256).toLowerCase())throw new Error('下载指纹不一致，未替换现版');
  if(html.indexOf('<html')<0||html.indexOf('AI管家')<0||html.indexOf("window.__APP_VERSION__='"+remote+"'")<0)throw new Error('更新件身份不对，未替换现版');
  var cache={version:remote,html:html,bytes:bytes,sha256:digest,validated:true,writtenAt:Date.now()};saveJson(CACHE,cache);
  var back=readJson(CACHE,null);if(!back||back.version!==remote||back.html!==html||back.validated!==true)throw new Error('写后回读不一致，未替换现版');
  var backDigest=await sha256(back.html);if(backDigest!==digest||enc(back.html).length!==bytes)throw new Error('回读指纹不一致，未替换现版');
  S.lastReceipt={version:remote,at:Date.now(),result:'新版已写入并回读一致',note:String(card.note||'')};S.state='success';S.message='新版 '+remote+' 已回读一致，正在刷新';render();saveMeta();log('success',{remote:remote,bytes:bytes});
  refresh(remote);return {state:'updated',remote:remote};
 }catch(e){var msg=String(e.message||e);if(msg==='版本仓暂时连不上')msg='暂时连不上版本仓，现版未动，请稍后再查';else if(msg==='Failed to fetch'||msg==='Load failed'||/abort/i.test(msg))msg='网络检查没完成，现版未动，请稍后再查';else if(/quota|存储|保存/i.test(msg))msg='手机没能保存更新，现版未动';stickyError('更新没完成：'+msg);log('failed',{reason:msg.slice(0,120)});return {state:'failed',reason:msg};
 }finally{S.busy=false;}
}
function init(version){S.version=String(version||window.__APP_VERSION__||'1.4.1');var meta=readJson(META,{});S.lastCheck=meta.lastCheck||0;S.lastReceipt=meta.lastReceipt||null;if(Array.isArray(meta.history)&&meta.history.length)S.history=meta.history;var failure=window.__UPDATE_TAKEOVER_ERROR__||readJson(TAKEOVER_ERROR,null);if(failure){S.state='failed';S.message='新版没能打开，已保留旧版和问话：'+String(failure.error||'未知原因');render();saveMeta();stickyError(S.message);log('takeover_failed',{target:failure.version||'',reason:String(failure.error||'').slice(0,120)});return;}if(S.lastReceipt&&S.lastReceipt.version===S.version){S.state='success';S.message='当前版本已回读一致，可点版本看记录';}else if(meta.message&&meta.state==='failed'){S.state='failed';S.message=meta.message;}render();setTimeout(function(){check(false);},1200);S.timer=setInterval(function(){if(!document.hidden)check(false);},600000);document.addEventListener('visibilitychange',function(){if(!document.hidden)check(false);});}
window.AppUpdater={init:init,check:check,modalHtml:modalHtml,cmp:cmp,sha256:sha256,_state:S,_cacheKey:CACHE};
window.__UPDATE_TEST__={check:check,state:S,cmp:cmp,sha256:sha256,cacheKey:CACHE,metaKey:META};
})();
