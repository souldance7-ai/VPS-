# PITOPONE 全球主机选购图鉴

V12 商家、付款周期与库存版收录 VPS、住宅接入候选及物理服务器。简体中文为默认语言，右上角可切换繁体中文、英语和日语。网址为 https://ip-guide.pitopone.com/ 。

## 部署到现有网站

下载完整部署包，全部解压后在 Windows 运行 deploy.cmd。命令先发布 pages 目录到现有 pitopone-ip-atlas 的 main 生产环境，再更新 pitopone-stock-watch 并复用已有 D1。要手动上传前端，可在 Pages 的「创建部署」里选择生产环境并拖入 pages 文件夹。仅补发后台时运行 deploy.cmd monitor。


## 商家、付款周期和优惠码

全站商家可按名称或别名选择。方案支持按月付、季付、半年付及年付筛选。卡片与规格表按所选周期显示整期应付金额。商品优惠提供适用周期、来源和复制按钮。库存颜色配合文字，显示最近可核对的读取时间。

## 按需求选购

「找出口」可以把原生或跨地区 IP、接入网络、固定或动态分配、独享公网 IPv4 或共享 NAT，与电信、联通、移动线路、独服和库存组合筛选。候选数值随组合更新。点击产品查看商家原文、属性覆盖的 SKU 或可选服务、采集时间。分享链接可以保留已选地区、条件和搜索词。

目录按同币种月均价排序时，按实际月付、季付、半年付或年付金额折算，可查看原账期。估价、过往样机报价和须登录才显示的区域价格各自标明。点击首页「核验样本 IP」可查可见前缀与起源 ASN；选购方法含机房/线路样本、地址归属和去回程复核步骤。

VPS.TAIPEI 的官方公开页列出平台和机房条件。其 VM 创建页要求登录。网站提供购买入口、公开计算示例与注明日期的历史资料。

## 购买方案与复核

- 「套餐报价」支持按机房、来源、活动状态、虚拟或物理服务器及库存探针筛选。展开后可对照 CPU、内存、硬盘、端口速率、流量、付款周期、续费和用码条件。一次性优惠、多期续费和用码前的原价都有独立说明。
- 「补货与新帖」可切换 NodeSeek、NodeSeek 拼车、MeowVPS 商家动态、ICMP不可达喵评测、烧饼推广、VPSDeer、VPSTS、VPSUU 和 PoorVPSMsg。公开 RSS 或频道预览提供帖子原文、发布时间与本次读取时间。打开消息标签后每 5 分钟刷新当前来源。可从识别出的商家直接进入站内方案目录。边缘缓存为 5 分钟。订阅源中断时，界面可显示上一份成功读取的缓存及其时间。
- 「品牌活动」列出商家条款和活动窗口。「方案目录」支持地区、原生 IP 证据、大陆线路、运营商、服务器类别与优惠的组合，也可按商家、线路及优惠码搜索，最多并排比较三种方案。
- 截止日期只有年月日时，活动页照录原文。具体 IP 类型和线路随产品、运营商及方向而异。核验页按用户输入的单个公网 IP 向 RIPEstat 查询路由前缀与起源 ASN。需由商家或用户提供的机房样本做进一步比对。

## 库存读取

套餐和机房标识与商家库存字段匹配时，目录和详情可以查询。详情打开时每 2 分钟刷新。显示商家原始来源及读取时间。Ava Nano 读取活动发布的剩余名额。第三方监控导航、结账按钮、多机房选择器分别保留来源和购买入口。库存判读依赖具体产品的公示字段。

无人浏览时由独立 Cloudflare Worker 定时采集，部署时使用现有 D1。健康检查地址为 https://ip-guide.pitopone.com/api/stock-history/health 。本版 1917 个库存或报价目标，其中 1744 个支持读取库存，1884 个支持报价；同一目标可同时支持两者。普通商品、GreenCloud、Mkcloud、ComputeGuy / EDIS 分别约每 15、24、30、50 分钟轮询一次。十个公开消息来源分批每十分钟更新。详情提供可核对的最近读数、时间和库存变动。

## 文件与来源

catalog.js 与 edition-data.js 保存地区和产品证据。commercial-data.js 保存报价快照。community-data.js 保存 2026-11-20 采集的论坛和评测报价、相关商家条款及套餐映射。编辑采集价保留采集日，部署新版本时更新。商家公开的实时字段在方案详情另标来源与读取时间。订阅在浏览时自动刷新。

forum-feed.js 展示订阅内容，community.js 展示报价和适用条件。stock.js 与 stock-list.js 调用同域库存 API。_worker.js 使用固定来源读取库存与订阅。_routes.json 限定接口路径。

漫画分镜、转场和筛选折叠位于 comic.js 和 comic.css。art 内含原创插画和 Yuki 跳跃动画，暂停或使用系统减少动态效果时显示静态图。字体许可见 fonts/OFL.txt。

- [NodeSeek 情报](https://www.nodeseek.com/categories/info) · [NodeSeek 推广](https://www.nodeseek.com/categories/promotion)
- [烧饼推广](https://sb.sb/go/promotion/) · [订阅说明](https://sb.sb/pages/feeds/)
- [D-VPS 超市](https://d-vps.com/) · [DigVPS RackNerd 评测](https://digvps.com/review/racknerd)
- [不良林文章](https://bulianglin.com/archives/tiktokvps.html) · [原视频](https://youtu.be/du1G5dG1qPQ) · [NodeSeek 查找思路](https://www.nodeseek.com/post-1062104-1)

- [VPSDeer](https://t.me/vpsdeer) · [VPSTS](https://t.me/vpsts) · [VPSUU](https://t.me/vpsuu) · [PoorVPSMsg](https://t.me/PoorVPSMsg)
- [VPS.TAIPEI 机房与计价](https://vps.taipei/) · [VM 创建](https://vps.taipei/customer/vms/new)

## 专线商家

network-plans.js 提供 Neburst、NewNB Cloud、Mkcloud 和 VMSilo 的详细方案。目的地可指线路出口；另列主机位置。价格按报价来源、币种及周期展示。Mkcloud 以商家产品组、SKU 和 ID 联合核对缺货清单；NewNB 按节点及月付订购状态采集。

## V10 的测评与商品入口

首页可以打开近期优惠、条件选机和 YUKI 的长城漫画。测评时间轴支持按作者、地区和型号查找。原文测评直达作者文章。作者主题索引保留公开列表中的页码。评测中的速度及报价对应测试样本，当前可采购的配置在商家目录查看。

后台轮巡读取商家明确公开的字段。Vultr 按地区及型号显示可部署状态，VMSilo 产品页提供价格和配置。缺少库存字段时保留商家入口。线路名称按来源标明，用户测评保留其机房和方向。

[作者主题](https://www.nodeseek.com/space/61099#/discussions) · [ICMP不可达喵](https://www.nodeseek.com/space/28302#/discussions) · [MeowVPS 时间轴](https://meowvps.com/timeline/) · [NodeSeek 拼车](https://www.nodeseek.com/categories/carpool)

## 线路、优惠与探针

首页展示近期活动、有效期内的优惠码和黑五商品。目录支持大陆去程、回程、双向记录、三网及具体骨干的组合。每条记录注明运营商、方向和证据。目录可按绿云、大妈、狗妈和搬瓦工等名称搜索。

[LowEndTalk Offers](https://lowendtalk.com/categories/offers) 提供商家公开原帖。论坛发布时的价格和库存快照保留采集时间。实时查询依赖商家端点，库存采集故障会单独显示。

### CPU 型号
商品卡、详情和比较表区分核心数、具体型号、商家列出的候选和仅公布的处理器系列。CPU 型号可搜索。详情列出资料链接与时间，价格与库存探针仅接受对应商品和机房的型号字段。

### 商家报价、补货与访客统计

目录与比较表按同币种的月均价排序。配置有记录时会分别列出存储类型、上行、下行、每月流量和计费方向。Telegram 公开消息按可辨识的商家和具体商品匹配。频道帖保留原文链接和发布时间，库存颜色取自商家的商品探针。首页同时显示黑五与近期优惠。

网站访问统计由 atlas-traffic-monitor Worker 提供。累计访客使用本站生成的随机浏览器标识去重，存储其散列值。浏览人次在首次进站或切换主要页面时计数，在线窗口为五分钟，每天按 UTC+8 切换。该 Worker 使用独立的 SQLite Durable Object。
