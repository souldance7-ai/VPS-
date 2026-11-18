# PITOPONE 全球主机选购图鉴

简体中文默认，支持繁体中文、英语、日语。纯静态 Cloudflare Pages 项目，无构建依赖。将 index.html、atlas.css、atlas.js、locale.js、catalog.js、_headers 和 art/hero.webp 部署到站点根目录。以本地 HTTP 服务预览。生产域名为 https://ip-guide.pitopone.com/ 。

## 编辑目录

catalog.js 的每条记录对应具体市场与产品。city、provider 与 plan 标识方案；notes 提供四种语言的证据范围与购买提示。url 为商家来源，proof 为补充证据，lg 为公开测试页。商家声明按套餐标注，实测线路需要日期、方向、运营商与可复核记录。入口 ASN、IP 登记国及地理位置不能单独证明住宅接入。IP 检查仅在主动提交后向 RIPEstat 查询单个地址，其他数据库由读者自行打开。

## 优惠维护

atlas.js 保存活动原文、起止时间及商家时区，locale.js 保存适用条件。只有证据覆盖的产品才可填写 deal。页面按时间显示活动状态，后续新增活动需要编辑与重新部署。网站内容核对日期为 2026-11-18。

## 来源

- https://bulianglin.com/archives/tiktokvps.html
- https://youtu.be/du1G5dG1qPQ
- https://www.nodeseek.com/post-1062104-1
- 详见各方案的商家与补充证据链接。海底光缆为原创概念插画。