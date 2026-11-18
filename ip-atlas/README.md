# 原生 IP 图鉴 · PITOPONE

简体中文的台湾、日本 VPS 方案目录。可按地区、接入方式和关键词筛选，查看公开证据，复制询价模板，并用 RIPEstat 核对公网 IPv4／IPv6 的 BGP 起源 ASN 与路由前缀。页面提供 RDAP 和地理数据库的交叉核验入口。

## 本地使用

直接在浏览器打开 `index.html`。商家筛选和询价模板可离线使用。在线核验依赖浏览器与 RIPEstat 的连通性。

## Cloudflare Pages

对已有 Cloudflare 账户，可以创建一个独立的 Pages 项目并上传发布包。压缩包解开后，网站根目录应同时包含 `index.html` 和 `_headers`。使用 Git 集成时选源码分支 `site/ip-atlas`，构建命令留空，输出目录填 `ip-atlas`。

部署成功后，在项目的 **Custom domains** 内添加 `ip-guide.pitopone.com`。先检查该名称有无现有 DNS 记录，再确认该子域的记录和 HTTPS 状态。保留主站以及其他已有服务使用的记录。

## 数据维护

目录数据在 `index.html` 的 `catalog` 中维护。补充产品链接、证据链接和可公开的商家说明。旧测评保留历史标记。收到实际样本后重新核对注册、BGP 和地理定位。

网页只在用户提交核验时向 RIPE NCC 请求用户输入的样本地址。外链各自处理其接收的数据。目录中的住宅线路类别引用公开声明，交付类型以地址核验和合同条件为准。
