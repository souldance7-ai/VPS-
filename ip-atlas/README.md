# PITOPONE 全球主机选购图鉴

长城漫画版收录 VPS、住宅接入候选及物理服务器。简体中文为默认语言，右上角可切换繁体中文、英语和日语。网址为 https://ip-guide.pitopone.com/ 。

## 部署到现有网站

打开 Cloudflare 的「Workers 和 Pages」，选择现有项目 pitopone-ip-atlas，进入「部署 → 创建部署 → 生产环境」，直接上传 pitopone-atlas-forum-v6.zip。index.html、_worker.js 和 _routes.json 都在 ZIP 根目录。完成后打开 https://ip-guide.pitopone.com/#offers 。网站和库存历史采集器使用两个独立部署包。

## 购买方案与复核

- 「套餐报价」支持按机房、来源、活动状态、虚拟或物理服务器及库存探针筛选。展开后可对照 CPU、内存、硬盘、端口速率、流量、付款周期、续费和用码条件。一次性优惠、多期续费和用码前的原价都有独立说明。
- 「论坛新帖」读取 NodeSeek 的公开全站 RSS 和烧饼推广版 RSS，显示 VPS 相关标题、原文和读取时间。边缘缓存为 5 分钟。订阅源中断时，界面可显示上一份成功读取的缓存及其时间。
- 「品牌活动」列出商家条款和活动窗口。「方案目录」支持地区、原生 IP 证据、大陆线路、运营商、服务器类别与优惠的组合，也可按商家、线路及优惠码搜索，最多并排比较三种方案。
- 截止日期只有年月日时，活动页照录原文。具体 IP 类型和线路随产品、运营商及方向而异。核验页按用户输入的单个公网 IP 向 RIPEstat 查询路由前缀与起源 ASN。需由商家或用户提供的机房样本做进一步比对。

## 库存读取

套餐和机房标识与商家库存字段匹配时，目录和详情可以查询。详情打开时每 2 分钟刷新。显示商家原始来源及读取时间。Ava Nano 读取活动发布的剩余名额。第三方监控导航、结账按钮、多机房选择器分别保留来源和购买入口。库存判读依赖具体产品的公示字段。

无人访问时持续采集，需要安装 atlas-stock-monitor 内的独立 Cloudflare Worker 与 D1。先发布网站，再按该目录的 README.zh-CN.md 安装。健康检查地址为 https://ip-guide.pitopone.com/api/stock-history/health 。每分钟处理最多六款，当前清单完整轮巡约 6 分钟。详情提供最近有效读数、读取时间及最近 30 天发生的状态变动。

## 文件与来源

catalog.js 与 edition-data.js 保存地区和产品证据。commercial-data.js 保存报价快照。community-data.js 保存 2026-11-20 采集的论坛和评测报价、相关商家条款及套餐映射。已编辑的价格表随版本部署。RSS 在网站运行时更新。

forum-feed.js 展示订阅内容，community.js 展示报价和适用条件。stock.js 与 stock-list.js 调用同域库存 API。_worker.js 使用固定来源读取库存与订阅。_routes.json 限定接口路径。

漫画分镜、转场和筛选折叠位于 comic.js 和 comic.css。art 内含原创插画和 Yuki 跳跃动画，暂停或使用系统减少动态效果时显示静态图。字体许可见 fonts/OFL.txt。

- [NodeSeek 情报](https://www.nodeseek.com/categories/info) · [NodeSeek 推广](https://www.nodeseek.com/categories/promotion)
- [烧饼推广](https://sb.sb/go/promotion/) · [订阅说明](https://sb.sb/pages/feeds/)
- [D-VPS 超市](https://d-vps.com/) · [DigVPS RackNerd 评测](https://digvps.com/review/racknerd)
- [不良林文章](https://bulianglin.com/archives/tiktokvps.html) · [原视频](https://youtu.be/du1G5dG1qPQ) · [NodeSeek 查找思路](https://www.nodeseek.com/post-1062104-1)
