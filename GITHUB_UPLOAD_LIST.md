# GitHub 上传清单

必须上传 / 修改：

```text
lazy-vps-menu.sh                   # 由 patch-main-menu-v1.3.2.sh 修改后的主脚本
lazy-vps-protocol-addon.sh          # AnyTLS/TUIC 实际部署脚本
patch-main-menu-v1.3.2.sh           # 主菜单补丁器
README.md
QUICK_START.md
CHANGELOG.md
GITHUB_UPLOAD_LIST.md
docs/
protocols/
templates/
```

不要上传：

```text
/opt/lazy-vps-menu/outputs/
/opt/lazy-vps-menu/backups/
*.key
*.crt
真实节点配置
真实订阅地址
SSH Key
```

验证根目录主脚本是否已经升级：

```bash
grep -nE "v1.3.2|AnyTLS|TUIC|protocol_suite" lazy-vps-menu.sh | head -30
```
