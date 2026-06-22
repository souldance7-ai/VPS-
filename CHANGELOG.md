# CHANGELOG

## 正式 v1.2.7 · VLESS Reality 修复与稳定导出版 — 2026-06-22

### 新增

- 默认 Reality serverName 改为 `www.cloudflare.com`。
- 新增 `VLESS Reality Repair / Reality 修复向导`。
- 新增 `Reality SNI Switch / Reality 目标切换`。
- 新增 `VLESS Stable Export / VLESS 稳定导出`。
- Stable Export 生成 `01_IMPORT_FLCLASH_VLESS_STABLE.yaml`。
- 导出自动加入代理服务器 IP / 域名 DIRECT,no-resolve 规则。
- SNI 可在以下目标间切换：
  - `www.cloudflare.com`
  - `www.microsoft.com`
  - `www.apple.com`
  - `www.yahoo.com`

### 修正

- 避免每次 Export 覆盖用户手动加入的代理服务器直连规则。
- 明确 Advanced Export 适合总配置 / 多策略组，不建议作为单节点首测。
- 增强 VLESS Reality Timeout 排查流程。

### 实测记录

- 日本 Zouter VLESS Reality：`www.microsoft.com` 目标 Timeout。
- 切换为 `www.cloudflare.com` 后节点恢复正常。
