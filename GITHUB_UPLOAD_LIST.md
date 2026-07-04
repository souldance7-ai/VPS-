# GitHub 上传清单 v1.3.3

必须上传/提交：

```text
lazy-vps-menu.sh                         # 必须是 patch 后的新主脚本
lazy-vps-protocol-addon.sh
lazy-vps-mainmenu-hotfix-v1.3.3.sh
protocols/
templates/
docs/
README.md
QUICK_START.md
CHANGELOG.md
GITHUB_UPLOAD_LIST.md
SECURITY_SHARE_CHECK.txt
```

最重要：`lazy-vps-menu.sh` 必须出现在 `git status --short` 里，显示为 `M lazy-vps-menu.sh`。没有这个，VPS 一键命令仍然会进入旧版。
