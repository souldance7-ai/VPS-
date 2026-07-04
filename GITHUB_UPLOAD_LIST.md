# GitHub 上传清单 v1.3.5

必须上传/提交：

```text
lazy-vps-menu.sh
lazy-vps-protocol-addon.sh
lazy-vps-mainmenu-hotfix-v1.3.5.sh
README.md
QUICK_START.md
CHANGELOG.md
FIX_NOW.md
protocols/
templates/
```

确认 `lazy-vps-menu.sh` 已变更后再 push：

```bash
grep -nE 'v1.3.5|AnyTLS|TUIC|protocol_suite' lazy-vps-menu.sh | head -40
git status --short
```
