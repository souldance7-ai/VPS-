# Changelog

## v1.3.6 - Main Entry Direct Fix

- 新增实际主入口替换文件 `lazy-vps-menu-v1.3.6.sh`。
- 新增 `DIRECT_REPLACE/lazy-vps-menu.sh`，用于手动直接替换 GitHub 根目录主脚本。
- 新增 `patch-replace-main-v1.3.6.sh`，先备份旧主脚本，再写入新版主入口。
- 保留原 v1.2.x 功能为 legacy，不删除 Trojan/VLESS/导出/AI/DNS 等功能。
- 主菜单显示 `Protocol Suite / Hysteria2 + AnyTLS + TUIC`。
- 新增快捷命令：`--quick anytls`、`--quick tuic`、`--quick anytls-tuic`、`--quick protocol-suite`。
