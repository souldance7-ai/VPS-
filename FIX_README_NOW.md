# FIX README NOW / 立即修复 README

这个包只修复开源首页说明，不改 `lazy-vps-menu.sh` 主脚本。

## 处理方式

1. 解压本包。
2. 把本包中的 `README.md`、`QUICK_START.md`、`CHANGELOG.md` 复制到你的 GitHub 仓库根目录。
3. 覆盖原本 v1.3.3 的短 README。
4. 提交并推送。

## Windows CMD 执行

```bat
git status --short
git add README.md QUICK_START.md CHANGELOG.md FIX_README_NOW.md README_FULL_v1.3.4.md
git commit -m "docs: restore full LazyVPS README with quick commands and protocol guide"
git push
```

## 推送后确认

打开 GitHub 首页，README 应该显示：

```text
LazyVPS Quick Menu Pack / 懒人建 VPS 快速菜单包
一键快速运行
你想做什么？先看这里
推荐执行顺序
互动功能面板总览
AnyTLS / TUIC 快捷命令
```

不是只显示：

```text
LazyVPS v1.3.3 主菜单修正版
```
