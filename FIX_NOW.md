# LazyVPS v1.3.3 主菜单修正说明

这次问题的根因：上一版包里新增了 `lazy-vps-protocol-addon.sh`、`protocols/`、`docs/`、README，但没有把 GitHub 根目录的 `lazy-vps-menu.sh` 实际改掉。  
所以一键命令仍然下载旧主脚本，进入菜单当然看不到 AnyTLS / TUIC。

## 必须执行的修正动作

在你的 GitHub 仓库根目录，也就是能看到 `lazy-vps-menu.sh` 的目录执行：

```bash
bash lazy-vps-mainmenu-hotfix-v1.3.3.sh
```

执行后必须看到：

```text
[完成] 关键词检查通过：v1.3.3 / AnyTLS / TUIC 已进入 lazy-vps-menu.sh
```

然后再推送：

```bash
git add lazy-vps-menu.sh lazy-vps-protocol-addon.sh lazy-vps-mainmenu-hotfix-v1.3.3.sh README.md QUICK_START.md CHANGELOG.md GITHUB_UPLOAD_LIST.md SECURITY_SHARE_CHECK.txt docs protocols templates
git commit -m "fix: integrate AnyTLS and TUIC into LazyVPS main menu v1.3.3"
git push
```

## VPS 端重新拉取

不要继续运行旧文件，先删除旧的：

```bash
rm -f lazy-vps-menu.sh
curl -L -H "Cache-Control: no-cache" "https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh?v=$(date +%s)" -o lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
grep -nE 'v1.3.3|AnyTLS|TUIC|protocol_suite' lazy-vps-menu.sh | head -40
bash lazy-vps-menu.sh
```

## 快捷命令

```bash
bash lazy-vps-menu.sh --quick protocol-suite
bash lazy-vps-menu.sh --quick anytls
bash lazy-vps-menu.sh --quick tuic
bash lazy-vps-menu.sh --quick anytls-tuic
```
