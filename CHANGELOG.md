# CHANGELOG

## 正式 v1.2.2 · 媒体 DNS 导出修正版 — 2026-06-20

### 修正

- 修正 v1.2.1 中「VPS 系统 DNS 已设置 Media DNS，但 `10) Export` 导出的 FLClash 配置仍使用默认 DNS」的问题。
- 设置 Media DNS 后，`01_IMPORT_FLCLASH.yaml` 会自动写入：
  - `151.243.229.229`
  - `1.1.1.1`
  - `8.8.8.8`
- 端口中转客户端配置 `01_IMPORT_FLCLASH_RELAY.yaml` 也会同步当前 Media DNS。
- `dns-test` 支持输入完整 URL，会自动清洗为域名，例如 `https://chatgpt.com/` → `chatgpt.com`。

### 保留

- Zouter Media DNS 模板：`151.243.229.229`。
- 自定义 Media DNS。
- DNS 状态查看、解析测试与回滚。
- 服务端 AI 分流 `22 / 23 / 24`。

## 正式 v1.2.1 · 媒体 DNS 解锁辅助版

- 扩展 `30) DNS Unlock / 媒体 DNS 解锁工具`。
- 新增 Zouter Media DNS 模板：`151.243.229.229`。
- 新增自定义 Media DNS。
- 新增 DNS 状态查看与解析测试。
- 新增 DNS 回滚功能。

## 正式 v1.2 · 服务端 AI 分流版

- 新增 `22) Server AI Routing / 服务端AI分流`。
- 新增 `23) AI Route Show / 查看服务端AI分流`。
- 新增 `24) AI Route Rollback / 回滚服务端AI分流`。
- 使用 `pinnedPeerCertSha256` 兼容 Xray 26.x 自签证书场景。
