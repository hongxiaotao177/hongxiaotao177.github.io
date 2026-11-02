/* 新AI管家学习版独立桥：只使用本应用配置、私有备份和动作账，不依赖旧学习套装。 */
(function(){
'use strict';
var C=window.APP_CONFIG, LOGQ='aimanager_log_queue_v1';
var CMD_DONE='aimanager_command_done', CMD_ACTIVE='aimanager_command_active';
var LEARNING_STORE='aimanager_learning_state_v1', LEGACY_STORE='aimanager_state_v2';
var logQueue=[],flushTimer=null,flushBusy=false,remoteBusy=false;
function b64e(s){var b=new TextEncoder().encode(s),a='';for(var i=0;i<b.length;i++)a+=String.fromCharCode(b[i]);return btoa(a);}
function b64d(s){var a=atob(String(s).replace(/\s/g,'')),b=new Uint8Array(a.length);for(var i=0;i<a.length;i++)b[i]=a.charCodeAt(i);return new TextDecoder().decode(b);}
function ghUrl(path){return 'https://api.github.com/repos/'+C.github.owner+'/'+C.github.repo+'/contents/'+path.split('/').map(encodeURIComponent).join('/');}
async function ghGet(path){
 var r=await fetch(ghUrl(path),{headers:{Authorization:'Bearer '+C.github.token,Accept:'application/vnd.github+json'},cache:'no-store'});
 if(r.status===404)return null;if(!r.ok)throw new Error('github_'+r.status);
 var j=await r.json();return {text:b64d(j.content||''),sha:j.sha};
}
async function ghPut(path,text,sha,message){
 var body={message:message||'AI管家动作账',content:b64e(text)};if(sha)body.sha=sha;
 var r=await fetch(ghUrl(path),{method:'PUT',headers:{Authorization:'Bearer '+C.github.token,Accept:'application/vnd.github+json','Content-Type':'application/json'},body:JSON.stringify(body)});
 if(!r.ok)throw new Error('github_'+r.status);return r.json();
}
function logStep(event,detail){
 var row={ts:Date.now(),event:event,shell:C.shell,detail:detail||{}};logQueue.push(row);
 try{localStorage.setItem(LOGQ,JSON.stringify(logQueue.slice(-300)));}catch(e){}
 if(flushTimer)clearTimeout(flushTimer);flushTimer=setTimeout(flushLogs,700);
}
async function appendLogRows(rows){
 var groups={};rows.forEach(function(r){var d=new Date(r.ts).toISOString().slice(0,10);(groups[d]=groups[d]||[]).push(r);});
 for(var day of Object.keys(groups)){
  var path=C.github.logPrefix+day+'.jsonl',old=await ghGet(path);
  var text=(old&&old.text?old.text:'')+groups[day].map(function(r){return JSON.stringify(r);}).join('\n')+'\n';
  await ghPut(path,text,old&&old.sha,'AI管家动作账 '+day);
 }
}
async function flushLogs(){
 if(flushBusy||!logQueue.length||!navigator.onLine)return;flushBusy=true;
 var batch=logQueue.slice();logQueue=logQueue.slice(batch.length);
 try{await appendLogRows(batch);localStorage.setItem(LOGQ,JSON.stringify(logQueue));}
 catch(e){logQueue=batch.concat(logQueue);try{localStorage.setItem(LOGQ,JSON.stringify(logQueue.slice(-300)));}catch(e2){}}
 finally{flushBusy=false;if(logQueue.length)flushTimer=setTimeout(flushLogs,5000);}
}
function providerKey(which){return which==='ds'?'deepseek':which;}
async function callProvider(which,sys,usr){
 var key=providerKey(which),p=C.providers[key];if(!p)throw new Error('provider_missing');
 var r=await fetch(p.url,{method:'POST',headers:{Authorization:'Bearer '+p.key,'Content-Type':'application/json'},body:JSON.stringify({model:p.model,messages:[{role:'system',content:sys},{role:'user',content:usr}],temperature:0.3,max_tokens:2200,stream:false})});
 if(!r.ok)throw new Error('http_'+r.status);
 var j=await r.json(),text=j&&j.choices&&j.choices[0]&&j.choices[0].message&&j.choices[0].message.content;
 if(Array.isArray(text))text=text.map(function(x){return x.text||'';}).join('');
 if(typeof text!=='string'||!text.trim())throw new Error('empty_answer');return text;
}
function nativeLoad(){if(!window.AndroidBackup||typeof AndroidBackup.load!=='function')return '';var b=AndroidBackup.load();return b?b64d(b):'';}
function backupKind(raw){try{var j=JSON.parse(raw);return j&&j.format==='aimanager_learning_v1'?'learning':'legacy';}catch(e){return '';}}
var HX={
 aip:{go:function(sys,usr,opt,cb){
  var which=opt&&opt.which||'qwen',started=Date.now();logStep('ai_try',{provider:which,chars:String(usr||'').length});
  callProvider(which,sys,usr).then(function(text){logStep('answer_received',{provider:which,ms:Date.now()-started,answer_chars:text.length});cb(true,text,which);}).catch(function(e){logStep('ai_failed',{provider:which,ms:Date.now()-started,reason:String(e.message||e).slice(0,100)});cb(false,String(e.message||e),which);});
 }},
 store:{
  get:function(key,fallback){
   var raw='';try{raw=localStorage.getItem(key)||'';}catch(e){}
   if(raw)return raw;
   if(key!==LEARNING_STORE&&key!==LEGACY_STORE)return fallback;
   try{var nativeRaw=nativeLoad();if(!nativeRaw)return fallback;var kind=backupKind(nativeRaw);if((key===LEARNING_STORE&&kind==='learning')||(key===LEGACY_STORE&&kind==='legacy'))return nativeRaw;}catch(e){}
   return fallback;
  },
  set:function(key,value){
   var json=typeof value==='string'?value:JSON.stringify(value);localStorage.setItem(key,json);
   if(key!==LEARNING_STORE)return true;
   if(!window.AndroidBackup||typeof AndroidBackup.save!=='function')return false;
  return AndroidBackup.save(b64e(json))==='1';
  }
 },
 bb:{
  log:function(level,text){logStep('learning_log',{level:String(level||'act'),note:String(text||'').slice(0,280)});},
  job:function(name,ok,error){logStep('learning_job',{name:String(name||'').slice(0,100),ok:!!ok,error:ok?'':String(error||'').slice(0,160)});}
 }
};
window.HX=HX;
function uid(p){return p+'_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,8);}
async function remoteTest(cmd){
 if(remoteBusy)return;var T=window.__LEARNING_TEST__;if(!T)return;
 var active='',done='';try{active=localStorage.getItem(CMD_ACTIVE)||'';done=localStorage.getItem(CMD_DONE)||'';}catch(e){}
 if(done===cmd.id||active===cmd.id)return;
 remoteBusy=true;try{localStorage.setItem(CMD_ACTIVE,cmd.id);}catch(e){}
 logStep('remote_cmd',{id:cmd.id,case:'diabetes_reverse',preset:'帮我挑毛病'});
 var state=T.getState(),c={id:uid('chat'),title:'真机检验',created:Date.now(),messages:[],annotations:[],map:{nodes:[]},mapStatus:''};
 state.chats.unshift(c);state.currentId=c.id;
 var pi=state.presets.findIndex(function(x){return x.name==='帮我挑毛病';});if(pi<0)pi=0;
 var m={id:uid('msg'),question:'糖尿病能不能逆转',presetIndex:pi,status:'sending',attempts:[]};c.messages.push(m);T.setState(state);
 await T.executeMessage(c,m,false);
 var saved=!!(m.answer&&!m.saveFailed),displayed=!!(m.answer&&document.querySelector('[data-message="'+m.id+'"]'));
 if(m.answer){logStep(saved?'answer_saved':'save_failed',{provider:m.answer.provider,save_attempt:1});logStep(displayed?'answer_displayed':'display_failed',{provider:m.answer.provider,display_attempt:1});}
 try{localStorage.setItem(CMD_DONE,cmd.id);localStorage.removeItem(CMD_ACTIVE);}catch(e){}
 logStep('remote_done',{id:cmd.id,status:m.status,provider:m.answer&&m.answer.provider||'',saved:saved,displayed:displayed});remoteBusy=false;
}
async function pollRemote(){
 if(document.hidden||remoteBusy||!navigator.onLine)return;
 try{var f=await ghGet(C.github.commandPath);if(!f)return;var cmd=JSON.parse(f.text);if(cmd&&cmd.id&&cmd.op==='repeat_failure_test')await remoteTest(cmd);}catch(e){}
}
function init(){
 try{var pending=JSON.parse(localStorage.getItem(LOGQ)||'[]');if(Array.isArray(pending)&&pending.length){logQueue=pending.concat(logQueue);flushLogs();}}catch(e){}
 logStep('app_open',{learning:true});setTimeout(pollRemote,2500);setInterval(pollRemote,8000);
 document.addEventListener('visibilitychange',function(){if(!document.hidden)pollRemote();});
 window.__APP_READY__=true;
}
window.Standalone={init:init,logStep:logStep,callProvider:callProvider,remoteTest:remoteTest,flushLogs:flushLogs};
})();
