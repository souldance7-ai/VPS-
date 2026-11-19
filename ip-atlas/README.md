# PITOPONE 全球主机选购图鉴

简体中文默认，支持繁体中文、英语、日语。纯静态 Cloudflare Pages 项目，无构建依赖。部署包中的 index.html、脚本、样式、art、fonts 和 _headers 均位于站点根目录。保留目录结构并上传整个 ZIP。以本地 HTTP 服务预览。生产域名为 https://ip-guide.pitopone.com/ 。

## 编辑目录

catalog.js 的每条记录对应具体市场与产品。city、provider 与 plan 标识方案；notes 提供四种语言的证据范围与购买提示。url 为商家来源，proof 为补充证据，lg 为公开测试页。商家声明按套餐标注，实测线路需要日期、方向、运营商与可复核记录。入口 ASN、IP 登记国及地理位置不能单独证明住宅接入。IP 检查仅在主动提交后向 RIPEstat 查询单个地址，其他数据库由读者自行打开。

## 优惠维护

atlas.js 保存活动原文、起止时间及商家时区，locale.js 保存适用条件。只有证据覆盖的产品才可填写 deal。页面按时间显示活动状态，后续新增活动需要编辑与重新部署。网站内容核对日期为 2026-11-18。

## 来源

- https://bulianglin.com/archives/tiktokvps.html
- https://youtu.be/du1G5dG1qPQ
- https://www.nodeseek.com/post-1062104-1
- 详见各方案的商家与补充证据链接。海底光缆为原创概念插画。
## 区域版

edition-data.js 收录新增地区记录及其四语采购说明，catalog.js 保留前版方案。每个市场按商家品牌去重，同品牌跨区可分别查询。界面分页并支持三个地区场景、减少动态效果、个人本地采购笔记。图像属于原创场景插画。Instrument Serif 的字体许可见 fonts/OFL.txt。

## 长城漫画版

comic.js 与 comic.css 提供封面画格、滑动浏览、整屏叠页、筛选折叠及右侧详情抽屉。原创画面位于 art/wall-1.webp 至 wall-3.webp。Yuki 跳跃动画由 yuki-jump.gif 播放，暂停或减少动态效果时使用 yuki-still.webp。保留 #directory、#verify、#offers 和 #field 深层链接。

## 选购与库存版 · 2026-11-20

生产项目为 pitopone-ip-atlas。把部署 ZIP 上传到现有 Pages 项目的生产环境，保留根目录 _worker.js 和 _routes.json。静态资源由 Pages 提供，库存由同域 /api/stock/ 接口提供。打开独立 HTML 文件可以预览目录，实时库存需要部署环境。

commercial-data.js 保存按产品和地区整理的报价快照。使用原币别及其实际计费周期。购买页分别展示 CPU、内存、存储、端口速率和流量额度。目录允许仅显示公开报价、公开配置和可自动查询库存的方案。stock.js 和 stock-list.js 对可见产品更新库存，_worker.js 读取商家公开库存源。商家库存读取时间与下单时的最终库存可能有差异。优惠按商家条款及其时区判断是否到期，新优惠和价格需要更新数据后部署。
