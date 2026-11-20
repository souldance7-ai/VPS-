# PITOPONE 后台库存采集器

将完整部署包解压，在同一目录运行 `deploy.cmd`。命令先更新现有 Cloudflare Pages 项目 `pitopone-ip-atlas`，再升级本采集器。用于 `ip-guide.pitopone.com` 的定时采集器由一个独立 Cloudflare Worker 和 D1 数据库组成。网站的即时库存读取可以独立使用。

## 升级现有库存采集器

在安装 Node.js 22.12 或更新版本的电脑上，打开采集器所在文件夹中的终端。请使用此前部署历史监控器的 Cloudflare 账户，需要查看 D1 清单、更新 Workers 与管理现有域名路由的权限。

```text
npx --yes wrangler@4 login
node install.mjs
```

升级命令检查 V12 Pages 接口，并从当前账户的 D1 清单读取现有 pitopone-stock-history 的 ID。随后部署新版 Worker，绑定同一个历史数据库。V12 继续使用原有的 stock_latest、stock_changes、offer_latest 表。全新账户须先单独准备历史数据库和上述表结构。如果当前账户没有这份数据库，升级器会显示提示并停止。脚本生成 `wrangler.json`，登录使用 Wrangler 的授权流程。历史接口路由为 `ip-guide.pitopone.com/api/stock-history/*`。升级前检查 Pages 版本，随后定时采集直接读取商家公开接口，共用网站内的 SKU、机房及硬件判读逻辑。

## 查看效果

打开 [采集状态](https://ip-guide.pitopone.com/api/stock-history/health)。`installed: true` 表示历史接口可用，`sampled` 是已采集的套餐数，`lastCheckedAt` 是最近采集时间。新建或修改 Cron Trigger 的配置传播可能需要约 15 分钟。首轮之后，打开有库存探针的套餐详情，查看最近后台读数与最近变动。如果浏览器前台读数与后台读数不同，请对照各自的读取时间。

V12 共轮询 1,917 款商品，1,744 款提供库存探针，1,884 款提供报价探针，同一商品可能两项都有。定时任务每分钟运行，GreenCloud 的 404 款约 24 分钟一遍，MKCloud 的 208 款约 30 分钟一遍，ComputeGuy 和 EDIS Global 的 1,185 款按 100 个机房每分钟读取两页，完整轮巡约 50 分钟，其余来源约 15 分钟一遍。其余三组每分钟最多取样 32 款，绿云同一分类的商品共享一次读取，每分钟最多访问四个绿云分类。MKCloud 各 SKU 共用同一次官方商品目录和缺货清单。ComputeGuy 和 EDIS 的机房快照每个机房只占一个数据库记录，其中保留每个 SKU 的最近一次有效价格、有效库存和最近 12 次状态变化。打开详情可读取近期库存，网站的库存接口会短暂缓存商家响应。

每笔报价按商品标明的币别、周期和起价条件保存。健康接口的 stockTargetCount、quoteTargetCount 是探针覆盖数，stockReadingsFresh、quoteFresh 则是各自轮巡周期加两分钟内成功读取的数量，freshWithinMinutes 显示最长时间窗。商家页面移除数量或失联时仍保留上次有效读数和观察时间。库存转变历史保留 30 天。

[Cloudflare 定时触发器](https://developers.cloudflare.com/workers/configuration/cron-triggers/) · [Workers 路由](https://developers.cloudflare.com/workers/configuration/routing/routes/) · [D1 限制](https://developers.cloudflare.com/d1/platform/limits/)

## 订阅与优惠码

无人浏览时，定时 Worker 每分钟轮巡一个公开来源，每个来源约十分钟一遍。采集 NodeSeek、拼车栏、LowEndTalk、MeowVPS 测评与商家时间线、烧饼和四个 Telegram 公开频道。后台在 D1 保留最近一次内容变化，原文相同会跳过写入。前台遇到来源暂时失联时，选取最新可用的公开快照并标注日期。优惠码跟随原帖来源和到期时间展示。查看 /api/stock-history/feed?source=vpsts 可读取该频道归档。

近期优惠的订阅每 5 分钟更新。LowEndTalk Offers、新帖与补货频道返回原帖链接与发布时间。暂时连不上来源时，优先显示上次在线读取的消息，其次显示有采集日期的版本存档，存档有效期 14 天。论坛帖子不作为库存读数。

「近期优惠 → 补货与新帖 → 公开来源新码」聚合 LowEndTalk Offers、NodeSeek、烧饼、MeowVPS 商家时间线及四个公开 Telegram 频道。页面只展示近 14 天帖子明确标记的优惠码，附原帖时间、原始链接与复制按钮。源码里的半角逗号会保留。帖子同时标明准确时区的截止时间时，系统据此隐藏已过期代码。其余代码显示来源没有注明具体截止时间。