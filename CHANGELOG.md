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
- 写入前自动备份，配置测试失败自动回滚。
- 文档新增 AI_SERVICE_ROUTING.md。
- README 新增服务端 AI 分流步骤、截图、验证方式与常见问题。

### 修正

- 不再使用已移除的 `allowInsecure` 写法。
- 说明 09 导出文件只代表客户端入口配置，不代表服务端 AI outbound。
- 说明成功后客户端仍选择香港入口节点，AI 出口由服务端 routing 决定。

## 正式 v1.1 · 防火墙后端版

- 新增 AUTO / UFW / NFT / IPTABLES / NONE 防火墙后端。
- 普通端口放行与中转规则分离。
