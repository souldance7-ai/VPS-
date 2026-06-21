# CHANGELOG

## 正式 v1.2.3 · 稳定增强与订阅发布版 — 2026-06-21

### 新增

- `35) Public IP Guard / NAT 公网 IP 识别保护`
- `36) Export Safety / 导出配置安全检查`
- `37) Remote Publish / 远程订阅发布`
- `38) Node Test Pack / 节点体检包`
- `39) NodeQuality Archive / 酒神测试归档`
- `40) Airport Chain Template / 机场链规则模板`
- 新增 `V123_STABILITY_TOOLKIT.md`
- README 新增 v1.2.3 稳定增强工具链说明图

### 修正

- HTTP 下载链接改用 Public IP Guard 逻辑，避免 NAT VPS 显示 10.x 私网地址。
- 远程发布前增加 Export Safety 检查。
- NodeQuality 支持日志归档。

## 正式 v1.2.2 · 媒体 DNS 导出修正版

- 设置 Media DNS 后，`10) Export` 导出的 FLClash 配置会同步当前 Media DNS。
- 支持 Zouter Media DNS `151.243.229.229`。
