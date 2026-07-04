# LazyVPS v1.3.6 修复重点

如果 VPS 仍显示 `正式 v1.2.13` 或 GitHub raw 查不到 AnyTLS/TUIC，说明根目录 `lazy-vps-menu.sh` 没有被替换。

## 正确修复

在 GitHub 仓库根目录执行：

```bash
bash patch-replace-main-v1.3.6.sh
```

确认：

```bash
grep -nE 'v1.3.6|AnyTLS|TUIC|Protocol Suite' lazy-vps-menu.sh | head -40
git status --short
```

必须看到：

```text
M lazy-vps-menu.sh
```

再 push。
