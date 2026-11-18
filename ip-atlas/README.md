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
