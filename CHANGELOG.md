# CHANGELOG

## 正式 v1.2 · 服务端 AI 分流版 — 2026-06-20

### 新增

- 新增 `22) Server AI Routing / 服务端AI分流`。
- 新增 `23) AI Route Show / 查看服务端AI分流`。
- 新增 `24) AI Route Rollback / 回滚服务端AI分流`。
- 将端口中转与服务端 AI 域名分流拆开，避免误操作。
- 支持 ChatGPT / OpenAI / Claude / Gemini / Copilot / Cursor 等 AI 域名走指定 outbound。
- 支持 Xray 26.x 自签证书场景的 `pinnedPeerCertSha256`。
- 留空 pinned 指纹时，自动通过 openssl 抓取落地节点 TLS SHA256。
- README 新增入口 IP、普通出口 IP、AI 分流出口 IP、落地节点的角色定义。
- README 保留原有 BASIC / PROTOCOL / CHECK / BACKUP / DOWNLOAD / RELAY / TUNE 全菜单截图。
- 新增 AI IP 检测网站引导：`https://ip.net.coffee/claude/`。
- 新增全部重新绘制的脱敏示意图，避免真实 IP / password / 证书指纹出现在公开仓库。

### 修正

- 不再使用已移除的 `allowInsecure` 写法。
- 说明 09 导出文件只代表客户端入口配置，不代表服务端 AI outbound。
- 说明成功后客户端仍选择香港入口节点，AI 出口由服务端 routing 决定。

## 正式 v1.1 · 防火墙后端版

- 新增 AUTO / UFW / NFT / IPTABLES / NONE 防火墙后端。
- 普通端口放行与中转规则分离。
