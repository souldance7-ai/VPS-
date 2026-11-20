# PITOPONE 后台库存采集器

将完整部署包解压，在同一目录运行 `deploy.cmd`。命令先更新现有 Cloudflare Pages 项目 `pitopone-ip-atlas`，再安装本采集器。用于 `ip-guide.pitopone.com` 的定时采集器由一个独立 Cloudflare Worker 和 D1 数据库组成。网站的即时库存读取可以独立使用。

## 安装

在安装 Node.js 22.12 或更新版本的电脑上，打开采集器所在文件夹中的终端。首次登录使用拥有对应 Cloudflare 账户、Workers、D1 及域名路由管理权限的账号。

```text
npx --yes wrangler@4 login
node install.mjs
```

安装命令会检查现有 Pages 接口、查找或创建专属 D1 数据库，初始化表结构并部署 Worker。重复执行沿用同名数据库。脚本生成 `wrangler.json`，登录使用 Wrangler 的授权流程。历史接口路由为 `ip-guide.pitopone.com/api/stock-history/*`。安装前检查 Pages 版本，随后定时采集直接读取商家公开接口，共用网站内的 SKU、机房及硬件判读逻辑。

## 查看效果

打开 [采集状态](https://ip-guide.pitopone.com/api/stock-history/health)。`installed: true` 表示历史接口可用，`sampled` 是已采集的套餐数，`lastCheckedAt` 是最近采集时间。新建或修改 Cron Trigger 的配置传播可能需要约 15 分钟。首轮之后，打开有库存探针的套餐详情，查看最近后台读数与最近变动。如果浏览器前台读数与后台读数不同，请对照各自的读取时间。

每分钟触发一次，每轮最多读取六款，每次最多并行两个请求。每个 SKU 的轮询周期等于套餐数除以六向上取整（分钟），健康接口直接显示 `periodMinutes`。数据库保留最近一次读数、上一次有效状态及 30 天内确认的状态变动。首次采集只建立基线。商家接口失联或取消库存展示时，页面显示失联或无库存字段，保留先前有效读数的时间。后台采集可在无人访问网站时运行。响应受 Cloudflare 账户剩余额度、商家访问策略及服务端缓存影响。

当前清单为 93 项，每分钟最多读取 6 项，约 16 分钟完整轮询一遍。D1 的记录更新另计，共享账户现有资源。查看 Cloudflare 面板的用量及例外记录。调整或暂停时，修改本地 `wrangler.json` 的 `triggers.crons`，空数组会停用 Cron；重新运行 `npx --yes wrangler@4 deploy --config wrangler.json` 生效。调大 Cron 间隔时请同步修改 monitor.mjs 的分片时间单位，以便每个分片均能被访问。

[Cloudflare 定时触发器](https://developers.cloudflare.com/workers/configuration/cron-triggers/) · [Workers 路由](https://developers.cloudflare.com/workers/configuration/routing/routes/) · [D1 限制](https://developers.cloudflare.com/d1/platform/limits/)

## V8 库存修订

后台使用与网站一致的商家库存识别规则，直接读取商家来源。已部署 V7 时，在完整 V9 部署包目录运行 deploy.cmd monitor 以更新原 Worker 并继续使用现有 D1。健康页面显示 sampled（尝试采集）、verified（本轮得到明确库存状态）、offline（来源无法读取）、unreported（来源没有可识别的库存）。

## V9

Mkcloud 的记录对应具体 SKU；NewNB 的记录对应节点是否开放月付并可开通。更新沿用原 D1 与 Worker。官网配置按钮或第三方探针在线均不足以作为可下单的判定依据。

## V10 商家报价

93 个采集目标含 87 个库存与 6 个仅报价目标。57 个支持官方月价及配置，包括 Mkcloud 35 个 SKU、NewNB 3 个节点基础月价、VMSilo 6 个默认配置、Back Waves 新加坡 Global 01 、Wasabi Hosting 新加坡 1GB 、Vultr 10 个区域的 vc2-1c-1gb 及 Tamago WTT.500M.VPS.4。网络描述来自商家。NewNB 的可选范围不代表基础价包括最高档。VMSilo 的配置按钮不提供明确库存数量。Vultr 将区域可部署型号与全球价格表对应，并优先使用区域月价。该接口没有端口和中国大陆路由数据。D1 沿用现有记录，新增每个 SKU 最近一次有效报价、配置和读取时间。来源暂时无法读取时打开方案的后台记录可以查看上次有效报价。健康接口的 quoteTargetCount、quoteSampled、lastQuoteAt 分别为报价覆盖、已保留报价的目标数与最近报价读取时间。quoteFresh 为最近 18 分钟内读到报价的目标数，stockChecksFresh 为最近 18 分钟内尝试读取库存的目标数，lastStockCheckAt 是最后一次库存检查时间。
