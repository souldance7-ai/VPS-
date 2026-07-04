# CHANGELOG

## v1.3.5 - 2026-07-04

- 修复 v1.3.3 热修复脚本被压成单行导致 `bash` 执行无效果的问题。
- 真正修改根目录 `lazy-vps-menu.sh`，把第 7 项升级为 `Protocol Suite / Hysteria2 + AnyTLS + TUIC`。
- 新增 `--quick anytls`、`--quick tuic`、`--quick anytls-tuic`、`--quick protocol-suite`。
- 修复 README 首页被补丁说明覆盖的问题，恢复完整开源介绍、一键复制命令与功能导览。
- 重写 `lazy-vps-protocol-addon.sh`，保留真实换行，避免上传后变成注释空脚本。
