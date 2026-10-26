# SPEC_t128 浮窗收发台+一律重排+鱼骨层补充+SOS带账（2026-10-26晚班，洪老师拍板「全部做」）

## 背景拍板
- 想法18:06「AI功能归浮窗管」+18:08「二甲双胍不是鱼骨」两条并入AI总管治病线第1任务。
- 洪老师拍板最狠版=每条新回信一律AI重排（撤全部判断，费用不考虑）。
- 重排/补充/以后所有AI活归「浮窗收发台」统一发起统一记账（不另起第二套浮窗，记忆97）。
- SOS（📮叫Kimi会诊）打包带收发台的账；收发台账自动壳双写=本地档案。

## 刀1（hx-common）：新增 HX.fc 浮窗收发台模块（纯加法IIFE，挂window.HX.aip定义之后）
- HX.fc.go(task, cb)：task={kind,from,sys,usr,opt}；内部调 HX.aip.go(sys, usr, opt||{}, cb2)；cb口径 (ok,txt,by) 原样透传。
- 统一账：localStorage hx_fc_log 环形200条，条={t,kind,from,by,ok,why,inN,outN}；壳双写 hxdata_hx_fc.json（照HX.bb _writeFile/_enc同款，LearnShell不在静默跳过）。
- 每笔成败同时 HX.bb.job('fc_'+String(kind||'ai'), ok, why||'')（真签名三参）。
- 公开口 return {go:go, tail:tail(n), status:status}；tail(n)=最近n条（新在前，照bb.tail同款切片）。
- 总开关 hx_fc_off=1：go退化成直调HX.aip.go不记账（落回老路，调用方零改动）。
- aip不在（HX.aip.go非函数）：cb(false,'总泵没上岗','')并记账。
- 收发台自己不吐司不弹窗（报什么由调用方定）。

## 刀2（chat）：一律重排+裸问话补约定
- 刀2a presetBuildPrompt裸问话分支（现1725行）：'回答控制在200字以内。\n\n'后、userText前追加鱼骨版面段（与1727行同文）；hx_yugu_off=1不追加；hx_chat200_off=1整支照旧不动。
- 刀2b applyFishbone撤判断：allowReflow且hx_yugu_off!=='1'即立_reflow（不再看有无「- 」记号、不再看120字）；本地兜底照旧（无记号才句号切一级；有记号直接fbParse）。
- 刀2c 重排发起改走收发台：HX.fc.go({kind:'reflow',from:'AI总管回信',sys:现排版员sys,usr:现重排usr},cb)；HX.fc不在或hx_fc_off=1→落回现HX.aip.go直调（老码保留）。
- 刀2d 重排回来fbParse为空或fbRender败→自动再排1次（_reflowTry计数上限2）；仍败→fbBox顶插红字「重排未成」+ HX.bb.job('t128_reflow',false,why)（真签名）；成功标「AI已重排」照旧。
- 只重渲fbBox铁规不动（绝不bubble.innerHTML=''）。

## 刀3（chat）：鱼骨层点亮+补充这一层（hx_t128_off=1全退）
- 刀3a fbRender签名加第3参opt（向下兼容，旧两参调用零影响）：opt={onGrow:function(node,path,kidsText)}。
- 刀3b 非叶行绑长按500ms点亮：touchstart/touchend/touchmove(>10px取消)+mousedown/mouseup两路（照t123刀1教训：排除button、长按触发后立_suppressClick旗150ms防连带展开）；触发=该行fb-sel亮+行下公共条「➕补充这一层／✕取消」+ HX.glow.setSel(标题,'AI总管鱼骨')写pend（glow不在静默）。
- 刀3c 点➕：HX.fc.go({kind:'expand',from:'鱼骨补充',sys:'你是排版员，只输出重排后的正文，不加任何解释。',usr:'把下面这一层展开成下一级鱼骨。要求：每行一句人话，行首「- 」，每句≤20字、读得懂；需要正文时在行下给≤200字一段。只输出这些行。\n\n话题路径：'+path+'\n本层标题：'+标题+'\n已有内容：'+(正文||'（无）')})；回来fbParse子树非空→push进node.k、container重渲（调fbRender(container,tree,opt)）、顶标「AI已补充」；空/败→hxToastHold黑框报原因（hxToastHold不在退toast）。
- 刀3d 落账：opt.onGrow非空时补充成功后调它（由applyFishbone第4参透传：applyFishbone(bubble,content,allowReflow,onGrow)——onGrow(tree)由调用方把fbSerialize(tree)写回消息存盘；新增fbSerialize(tree)树转回「- 」文本）。onOk处（现2959行一带）传onGrow=更新msgs末条a的c+HX.chat.save（重开仍在）；renderChat旧消息不传onGrow→补充只重渲不落账+吐司「补充结果只本次看」。
- 刀3e 话仓详情同药（t127刀6处3438行）：fbRender(_ansBody,_ansTree,{onGrow:null})——长按点亮写pend治想法17:10；补充可用但不落仓账。

## 刀4（hx-common HX.jc sjWzSos + fc档案）
- 刀4a 📮叫Kimi会诊payload加一段 fcTail:(HX.fc&&HX.fc.tail)?HX.fc.tail(30):[]（急诊json多一格，老格式不动）。
- 刀4b 核验v0.65.0先存本地hx_wz_sos_pend+闲时补传在不在；在=一行不动，不在=照v0.65.0口径补。
- 刀4c fc账本壳双写（刀1已含）=本地档案自动存，无额外码。

## 版本与开关
- hx-common v0.76.0（刀1+刀4）、chat v0.23.0（刀2+刀3）；version-all/两仓牌同步。
- 总开关：hx_fc_off=1收发台退休／hx_t128_off=1刀3全退／hx_yugu_off=1重排与约定照旧退。

## 红线（一行不动）
发送链主体／命令闸／话仓闸／收发室／预设表单存储／文献双岗三核四函数／PDF问答／送书／看门狗／🌐联网／户口／点亮手势本体（_doGlow）／delBubble／HX.bill口径／HX.aip IIFE本体／HX.bb本体／fbParse／fbFull／xiaotao／index／guanjia／shu／tuomin／壳APK。

## 仿真考卷（node stub）
1.fc.go成功记账+壳双写被调 2.fc.go三家全败记败账+bb.job败 3.hx_fc_off=1直调不记账 4.tail(30)条数口径 5.applyFishbone新回信一律立_reflow（带「- 」也立） 6.重排首败再排一次成功标「AI已重排」 7.两败标「重排未成」+bb账 8.裸问话拼提示词含版面段 9.hx_yugu_off=1不加段不立旗 10.fbRender长按点亮写pend+公共条 11.➕补充回来子树挂node.k+重渲+「AI已补充」 12.补充败黑框 13.fbSerialize往返=fbParse恒等 14.onGrow落账被调 15.hx_t128_off=1不绑长按 16.话仓详情长按点亮pend 17.node --check两文件全过
