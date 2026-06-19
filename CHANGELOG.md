# CHANGELOG

## 正式 v1.1 · 防火墙后端版 — 2026-06-19

- 新增 firewall_backend 配置层。
- 支持 AUTO / UFW / NFT / IPTABLES / NONE。
- 端口放行统一改为 fw_open_port。
- 中转规则支持 nftables 与 iptables 两套后端。
- UFW 模式下中转 DNAT/SNAT 仍用 iptables，入口和 route allow 走 UFW。
- NONE 模式不改防火墙，只输出提示。
- 状态检查新增当前防火墙后端显示。
- 保留正式 v1.0 面板界面、Trojan 密码继承逻辑和 Xray 日志权限修复。
