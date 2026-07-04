# CHANGELOG

## v1.3.2 - 2026-07-04

### Fixed

- 修正 v1.3.1 只提供 addon、但主 README 一键命令仍下载原 `lazy-vps-menu.sh` 的问题。
- 修正用户执行一键命令后仍显示 v1.2.x、互动菜单找不到 AnyTLS/TUIC 的问题。

### Added

- 新增 `patch-main-menu-v1.3.2.sh`，用于在保留原主脚本功能的基础上接入协议扩展。
- 原第 7 项 Hysteria2 改为 `Protocol Suite / Hysteria2 + AnyTLS + TUIC`。
- Protocol Suite 内保留 Hysteria2，并新增 AnyTLS、TUIC、AnyTLS+TUIC 双协议部署。
- 新增快捷命令：
  - `--quick anytls`
  - `--quick tuic`
  - `--quick anytls-tuic`
  - `--quick protocol-suite`
- 新增主菜单桥接逻辑：运行 AnyTLS/TUIC 时自动加载 `/opt/lazy-vps-menu/lazy-vps-protocol-addon.sh`，不存在则从 GitHub raw 下载。

### Changed

- `lazy-vps-protocol-addon.sh` 升级为 v1.3.2。
- 协议输出改为先备份旧输出，再生成新输出，避免直接清空旧配置。
- README 恢复原 LazyVPS 功能说明、一键运行、快速命令、导出下载与 GitHub 发布流程。

## v1.3.1 - 2026-07-04

- README 恢复原 LazyVPS 功能脉络。
- 新增 QUICK_START、上传清单与安全说明。

## v1.3.0 - 2026-07-04

- 初版 TUIC / AnyTLS addon。
