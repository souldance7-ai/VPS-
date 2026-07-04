# v1.3.5 修复方式

问题原因：前一版 `lazy-vps-mainmenu-hotfix-v1.3.3.sh` 在仓库里变成单行，第一字符是 `#`，所以 `bash` 会把整行当注释，执行后不会修改 `lazy-vps-menu.sh`。

正确做法：在 GitHub 仓库根目录执行本包的 v1.3.5 热修复脚本。

```bash
bash lazy-vps-mainmenu-hotfix-v1.3.5.sh
bash -n lazy-vps-menu.sh
grep -nE 'v1.3.5|AnyTLS|TUIC|protocol_suite' lazy-vps-menu.sh | head -40
git status --short
```

必须看到：

```text
M lazy-vps-menu.sh
```

然后再提交：

```bash
git add lazy-vps-menu.sh lazy-vps-protocol-addon.sh lazy-vps-mainmenu-hotfix-v1.3.5.sh README.md QUICK_START.md CHANGELOG.md FIX_NOW.md protocols templates
git commit -m "fix: integrate AnyTLS and TUIC into LazyVPS main menu v1.3.5"
git push
```
