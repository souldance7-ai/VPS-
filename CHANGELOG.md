# CHANGELOG

## v1.3.1 · 2026-07-04

### Changed

- 重新整理 `README.md`，保留原 LazyVPS v1.2.15 首页的完整使用逻辑：
  - 一键快速运行；
  - 一键复制命令；
  - 你想做什么先看这里；
  - 推荐执行顺序；
  - 新 VPS 快速建站流程；
  - IPv6 Reality 443；
  - V4/V6 独立端口与双栈策略；
  - 香港入口 + AI 小鸡服务端分流；
  - 媒体 DNS 解锁辅助；
  - 导出 / 下载 / 导入；
  - 功能面板总览；
  - 安全提醒与开源文件结构。
- 将 AnyTLS / TUIC v5 从“替代首页说明”调整为“协议扩展章节”，避免开源页看起来像换了项目。
- 新增 `QUICK_START.md`，单独保留一键复制命令与快捷命令，方便 GitHub 页面快速复制。
- 新增 `GITHUB_UPLOAD_LIST.md`，列出本次建议上传文件与禁止上传的敏感输出。
- 新增 Windows 一键提交辅助脚本：`一键同步LazyVPS_v1.3.1到GitHub.cmd`。
- 将协议扩展脚本版本号同步为 `v1.3.1`。

### Added

- README 新增「版本功能保留表」，明确 v1.0 / v1.2 / v1.2.1 / v1.2.2 / v1.2.14 / v1.2.15 / v1.3.1 功能延续关系。
- README 新增 AnyTLS / TUIC 的下载链接说明：
  - `latest_anytls_mihomo.yaml`
  - `latest_tuic_mihomo.yaml`
  - `02_IMPORT_SINGBOX_CLIENT.json`
  - `00_README_IMPORT.txt`

### Notes

- v1.3.1 仍然不覆盖原 `lazy-vps-menu.sh` 主脚本。
- 原项目图文说明路径 `docs/images/` 继续保留并在 README 中引用。
- AnyTLS / TUIC 输出文件含真实节点密码，不得上传公开仓库。

---

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
