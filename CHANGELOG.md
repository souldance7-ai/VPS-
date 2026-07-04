# CHANGELOG

## v1.3.3 - 2026-07-04

### Fixed

- 修正 v1.3.2 只上传 addon/docs，但 GitHub 根目录 `lazy-vps-menu.sh` 未真正接入 AnyTLS/TUIC 的问题。
- 新增 `lazy-vps-mainmenu-hotfix-v1.3.3.sh`，在最终 dispatch 前覆盖 `run_choice` 与 `quick`，不破坏原 Trojan/VLESS/Hysteria2 等功能。
- 主菜单第 7 项升级为 `Protocol Suite / Hysteria2 + AnyTLS + TUIC`。
- 新增快捷命令：
  - `--quick protocol-suite`
  - `--quick anytls`
  - `--quick tuic`
  - `--quick anytls-tuic`

### Preserved

- 原 LazyVPS 主菜单、原 1–37 功能、原 Hysteria2、Trojan、VLESS Reality、导出、HTTP 下载、AI 分流、DNS Unlock、诊断等功能保留。
