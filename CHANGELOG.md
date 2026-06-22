# CHANGELOG

## 正式 v1.2.7 · VLESS Reality 修复与稳定导出版 — 2026-06-22

### README 优化

- README 改为完整图文导航版。
- 增加快速使用、快速跳页、菜单路径、快捷命令和面板截图。
- 增加导出文件说明与 VLESS Stable Export 使用说明。
- 增加实际界面截图与逻辑图引用。
- 所有截图均已脱敏处理。

### 功能新增

- 默认 Reality serverName 改为 `www.cloudflare.com`。
- 新增 `VLESS Reality Repair / Reality 修复向导`。
- 新增 `Reality SNI Switch / Reality 目标切换`。
- 新增 `VLESS Stable Export / VLESS 稳定导出`。
- Stable Export 生成 `01_IMPORT_FLCLASH_VLESS_STABLE.yaml`。
- 导出自动加入代理服务器 IP / 域名 DIRECT,no-resolve 规则。

### 实测记录

- 日本 Zouter VLESS Reality：`www.microsoft.com` 目标 Timeout。
- 切换为 `www.cloudflare.com` 后节点恢复正常。
