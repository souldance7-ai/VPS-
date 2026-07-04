# LazyVPS v1.3.1 上传文件清单

本次为「保留原 README 功能说明 + 新增 TUIC / AnyTLS 协议扩展」版本。

## 建议上传 / 覆盖

```text
README.md
CHANGELOG.md
QUICK_START.md
GITHUB_UPLOAD_LIST.md
EXTERNAL_SCRIPT_AUDIT.md
SECURITY_SHARE_CHECK.txt
lazy-vps-protocol-addon.sh
protocols/install-anytls.sh
protocols/install-tuic.sh
protocols/status.sh
templates/mihomo-anytls-template.yaml
templates/mihomo-tuic-template.yaml
templates/singbox-anytls-client-template.json
templates/singbox-tuic-client-template.json
docs/PATCH_FOR_MAIN_MENU.md
docs/PUBLISH_COMMANDS.md
docs/TUIC_ANYTLS_GUIDE.md
一键同步LazyVPS_v1.3.1到GitHub.cmd
```

## 不要上传

```text
/opt/lazy-vps-menu/outputs/
/opt/lazy-vps-menu/backups/
*.key
*.crt
真实节点配置
真实订阅链接
真实 VPS 私密信息
```

## 说明

- `lazy-vps-menu.sh` 原主脚本继续保留。
- 本次新增 `lazy-vps-protocol-addon.sh`，不强行覆盖原主菜单。
- README 已保留原 v1.2.15 功能说明与一键命令，同时增加 v1.3.1 协议扩展说明。
