# SPEC_浮窗正文点亮返修

## 背景与旧成功经验
2026-10-27真机曾报长按点亮被安卓复制/全选菜单抢走。当时chat v0.28.0用`.fb-sent,.fb-line,.preset-row-main,.fb-full-body`禁文字选择，整篇AI气泡另在`contextmenu`事件直接`preventDefault`，形成成功经验。2026-10-30真机图证明白色内容浮窗仍弹系统菜单。核v0.36.0：禁选择CSS仍在，但`fbFull`正文没有`contextmenu`拦截；公共件全局拦截只认`data-pkey`，这些动态句子没有该属性。

## 只改两处（software-chat.html v0.36.0→v0.36.1）
1. `fbFull`的`bodyEl`上增加`contextmenu`监听，`preventDefault`，照整篇AI气泡旧成功写法。可绑在bodyEl创建后；不得改手势计时、切句、CSS、按钮、关闭、解释、发送、提示词、存储。
2. `_fbFullBindLP`的`_fire`成功点亮后补一条黑匣子账：事件名`priority_chat_fulltext_glow`，第二参`true`，第三参字符串`len=字数`。没有黑匣子则静默，不影响点亮。

## 版本与留痕
只动SW_VERSION及顶部版本注释，追加本返修记录；hx-common、其他单体、壳和旧数据不动。

## 双闸与仿真
- 旧新件逐行diff，除上述两处、版本留痕外全部IDENTICAL；JS语法检查通过。
- 真实浏览器打开原总管，调用fbFull生成正文；对句子派发contextmenu，返修版defaultPrevented=true，原版=false。
- 模拟长按500ms：只点亮对应句、调用HX.glow.setSel、写一条字符串详情的黑匣子账；移动取消、关闭叉、解释入口不回归。
- 总退不新增开关，靠完整旧件回滚。

## 真机销号标准
真机吃到chat v0.36.1；白色内容窗正文长按不再弹复制/全选，对应句黄底并进浮窗长效清单；云侧查到本次点亮；提示词配对发送、看原文、解释、关闭等旧功能回验正常；24小时无相关异常。发布与仿真通过均不等于销号。


## 终审与对照试验回填
- DS与千问均确认只补系统菜单拦截和云侧账；两家分别误写hxBlackBox/HX.log，终审统一翻案为现码HX.bb.job，未采用假接口。
- 原版contextmenu defaultPrevented=false；修复版=true。修复版长按只点亮“第一句，”，来源正确，黄底1处，模拟黑匣子账priority_chat_fulltext_glow/true/len=4；关闭正常；两版页面错误均0。
- AI总管v0.36.1，292241字节，摘要040cd8a7c52a8040；公共件、壳和其他单体未改。
- 研究记录已回填《套装功能说明书》第六条；真机未闭环，不记落实或验收。
