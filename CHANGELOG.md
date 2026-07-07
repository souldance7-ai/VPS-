# CHANGELOG

## v1.4.0 - 2026-07-07

- 重写 LazyVPS 主入口为 Interactive TUI。
- 支持 ↑↓←→ 方向键选择、Enter 执行、数字直达、Q 退出。
- 新增协议热键：T / V / H / A / U / D。
- 保留原 v1.2.6 / v1.2.x legacy 接口，不删除旧功能。
- AnyTLS / TUIC / AnyTLS+TUIC 由 sing-box addon 部署。
- addon 新增 `/tmp/sing-box.deb` 本地优先安装逻辑，适合低流量 VPS 或 GitHub Release 慢的线路。
- README 恢复开源首页、一键复制、互动功能介绍、上传说明。
