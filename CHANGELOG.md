# CHANGELOG

## v1.3.0 · 2026-07-04

### Added

- 新增 `lazy-vps-protocol-addon.sh` 协议扩展菜单。
- 新增 AnyTLS 一键建立：基于 sing-box inbound `anytls`。
- 新增 TUIC v5 一键建立：基于 sing-box inbound `tuic`。
- 新增 FLClash / mihomo 完整单节点配置导出：`01_IMPORT_FLCLASH.yaml`。
- 新增 sing-box 客户端测试配置导出：`02_IMPORT_SINGBOX_CLIENT.json`。
- 新增 HTTP 临时下载功能，方便手机/电脑直接导入输出文件。
- 新增 `protocols/install-anytls.sh` 与 `protocols/install-tuic.sh` 快捷入口。
- 新增分享安全检查文件 `SECURITY_SHARE_CHECK.txt`。
- 新增外部脚本审计文件 `EXTERNAL_SCRIPT_AUDIT.md`。
- 新增主菜单合并说明 `docs/PATCH_FOR_MAIN_MENU.md`。

### Changed

- 不覆盖原 `lazy-vps-menu.sh v1.2.15`，采用外挂扩展方式升级，降低破坏现有功能风险。
- 协议命名建议更新：`T` 继续保留给 Trojan，TUIC 不简写为 `T`，直接使用 `TUIC`。

### Notes

- AnyTLS 默认 TCP 端口：`8443`。
- TUIC 默认 UDP 端口：`10443`。
- 自签证书导出配置默认开启 `skip-cert-verify` / `insecure`。
- 云厂商安全组仍需手动确认放行对应端口。

