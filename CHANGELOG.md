# CHANGELOG

## 正式 v1.2.2 · 媒体 DNS 导出修正版 — 2026-06-20

### README 与说明更新

- README 回到 v1.2 的编辑布局：
  - 新 VPS 快速建站流程
  - 香港入口节点附挂小鸡使用 AI / GPT
  - 媒体 DNS 解锁辅助
  - 机场链 / 外购节点链路思路
  - 检查、导出、回滚、完整菜单预览
- 新增 `media-dns-routing-flow.png`：媒体 DNS 解锁逻辑图。
- 新增 `airport-chain-flow.png`：机场链 / 外购节点链路图。
- 新增 `unlock-mode-compare.png`：Server AI Routing / Media DNS / Airport Chain 三种模式对比图。
- 新增 `AIRPORT_CHAIN_UNLOCK.md` 说明文档。
- 所有新增图片均为脱敏示意图，不含真实 IP、password、订阅 URL、Token 或 pinned 证书指纹。

### 功能修正

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

## 正式 v1.2 · 服务端 AI 分流版

- 新增 `22) Server AI Routing / 服务端AI分流`。
- 新增 `23) AI Route Show / 查看服务端AI分流`。
- 新增 `24) AI Route Rollback / 回滚服务端AI分流`。
- 使用 `pinnedPeerCertSha256` 兼容 Xray 26.x 自签证书场景。
