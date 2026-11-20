# PITOPONE 后台库存采集器

将完整部署包解压，在同一目录运行 `deploy.cmd`。命令先更新现有 Cloudflare Pages 项目 `pitopone-ip-atlas`，再升级本采集器。用于 `ip-guide.pitopone.com` 的定时采集器由一个独立 Cloudflare Worker 和 D1 数据库组成。网站的即时库存读取可以独立使用。

## 升级现有 V10 采集器

在安装 Node.js 22.12 或更新版本的电脑上，打开采集器所在文件夹中的终端。请使用此前部署 V10 历史监控器的 Cloudflare 账户，需要查看 D1 清单、更新 Workers 与管理现有域名路由的权限。

```text
npx --yes wrangler@4 login
node install.mjs
```

升级命令检查 V11 Pages 接口，并从当前账户的 D1 清单读取现有 pitopone-stock-history 的 ID。随后部署新版 Worker，绑定同一个历史数据库。V11 使用 V10 的 stock_latest、stock_changes、offer_latest 表。全新账户须先单独准备历史数据库和上述表结构。如果当前账户没有这份数据库，升级器会显示提示并停止。脚本生成 `wrangler.json`，登录使用 Wrangler 的授权流程。历史接口路由为 `ip-guide.pitopone.com/api/stock-history/*`。升级前检查 Pages 版本，随后定时采集直接读取商家公开接口，共用网站内的 SKU、机房及硬件判读逻辑。

## 查看效果

打开 [采集状态](https://ip-guide.pitopone.com/api/stock-history/health)。`installed: true` 表示历史接口可用，`sampled` 是已采集的套餐数，`lastCheckedAt` 是最近采集时间。新建或修改 Cron Trigger 的配置传播可能需要约 15 分钟。首轮之后，打开有库存探针的套餐详情，查看最近后台读数与最近变动。如果浏览器前台读数与后台读数不同，请对照各自的读取时间。

每分钟触发一次，每轮最多读取十一款，每次最多并行两个请求。每个 SKU 的轮询周期等于套餐数除以十一向上取整（分钟），健康接口直接显示 `periodMinutes`。数据库保留最近一次读数、上一次有效状态及 30 天内确认的状态变动。首次采集只建立基线。商家接口失联或取消库存展示时，页面显示失联或无库存字段，保留先前有效读数的时间。后台采集可在无人访问网站时运行。响应受 Cloudflare 账户剩余额度、商家访问策略及服务端缓存影响。

当前清单为 158 项，每分钟最多读取 11 项，约 15 分钟完整轮询一遍。D1 的记录更新另计，共享账户现有资源。查看 Cloudflare 面板的用量及例外记录。调整或暂停时，修改本地 `wrangler.json` 的 `triggers.crons`，空数组会停用 Cron；重新运行 `npx --yes wrangler@4 deploy --config wrangler.json` 生效。调大 Cron 间隔时请同步修改 monitor.mjs 的分片时间单位，以便每个分片均能被访问。

[Cloudflare 定时触发器](https://developers.cloudflare.com/workers/configuration/cron-triggers/) · [Workers 路由](https://developers.cloudflare.com/workers/configuration/routing/routes/) · [D1 限制](https://developers.cloudflare.com/d1/platform/limits/)

## V8 库存修订

后台使用与网站一致的商家库存识别规则，直接读取商家来源。已部署 V7 时，在完整 V9 部署包目录运行 deploy.cmd monitor 以更新原 Worker 并继续使用现有 D1。健康页面显示 sampled（尝试采集）、verified（本轮得到明确库存状态）、offline（来源无法读取）、unreported（来源没有可识别的库存）。

## V9

Mkcloud 的记录对应具体 SKU；NewNB 的记录对应节点是否开放月付并可开通。更新沿用原 D1 与 Worker。官网配置按钮或第三方探针在线均不足以作为可下单的判定依据。

## V10 商家报价

93 个采集目标含 87 个库存与 6 个仅报价目标。57 个支持官方月价及配置，包括 Mkcloud 35 个 SKU、NewNB 3 个节点基础月价、VMSilo 6 个默认配置、Back Waves 新加坡 Global 01 、Wasabi Hosting 新加坡 1GB 、Vultr 10 个区域的 vc2-1c-1gb 及 Tamago WTT.500M.VPS.4。网络描述来自商家。NewNB 的可选范围不代表基础价包括最高档。VMSilo 的配置按钮不提供明确库存数量。Vultr 将区域可部署型号与全球价格表对应，并优先使用区域月价。该接口没有端口和中国大陆路由数据。D1 沿用现有记录，新增每个 SKU 最近一次有效报价、配置和读取时间。来源暂时无法读取时打开方案的后台记录可以查看上次有效报价。健康接口的 quoteTargetCount、quoteSampled、lastQuoteAt 分别为报价覆盖、已保留报价的目标数与最近报价读取时间。quoteFresh 为最近 18 分钟内读到报价的目标数，stockChecksFresh 为最近 18 分钟内尝试读取库存的目标数，lastStockCheckAt 是最后一次库存检查时间。

## V11 库存、报价与订阅

158 个目标中有 149 个可查库存、122 个可读取报价。新增 BageVM 日本 5 款、MatrixIDC 洛杉矶与圣何塞 16 款、搬瓦工 12 个机房方案、Prepaid-Host 3 个特惠、AkileCloud 台湾 4 款、ISVORO 香港 1 款及 AkkoCloud 圣何塞 3 款（仅报价），以及 MHYIDC 的 21 款香港与德国机房方案（含台湾或澳门 IP）。MHYIDC 探针同时展示商家原卡片的可用数量。月缴与年缴按商品原计费周期显示。Prepaid-Host 活动到期后停止返回活动价。商家网页失联、移除套餐或取消库存字段时，后台保留旧的有效记录和实际观察时间。

每分钟最多 11 个目标，完整轮巡约 15 分钟。健康接口的 stockChecksFresh 是最近 17 分钟内尝试读取库存的目标数，stockReadingsFresh 是同一时间窗内取得明确库存的目标数，quoteFresh 是取得有效报价的目标数。新版本沿用原 D1 及已有记录，无需清空历史。可见的目录卡片与方案详情约每 2 分钟重新读取。实时读取由 Pages Worker 服务。

近期优惠的订阅每 5 分钟更新。LowEndTalk Offers、新帖与补货频道返回原帖链接与发布时间。暂时连不上来源时，优先显示上次在线读取的消息，其次显示有采集日期的版本存档，存档有效期 14 天。论坛帖子不作为库存读数。

「近期优惠 → 补货与新帖 → 公开来源新码」聚合 LowEndTalk Offers、NodeSeek、烧饼、MeowVPS 商家时间线及四个公开 Telegram 频道。页面只展示近 14 天帖子明确标记的优惠码，附原帖时间、原始链接与复制按钮。源码里的半角逗号会保留。帖子同时标明准确时区的截止时间时，系统据此隐藏已过期代码。其余代码显示来源没有注明具体截止时间。