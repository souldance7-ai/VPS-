# LazyVPS QUICK START / 一键复制命令

## 一行命令进入互动菜单

**VPS / Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh)
```

## 下载后审查再运行

**VPS / Linux 执行：**

```bash
apt update && apt install -y curl wget
wget -O lazy-vps-menu.sh https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash lazy-vps-menu.sh
```

## 强制刷新新版，避免跑到 VPS 本地旧版

**VPS / Linux 执行：**

```bash
rm -f lazy-vps-menu.sh /root/lazy-vps-menu.sh
curl -L -H "Cache-Control: no-cache" "https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh?v=$(date +%s)" -o lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash lazy-vps-menu.sh
```

## AnyTLS / TUIC 快捷入口

**VPS / Linux 执行：**

```bash
bash lazy-vps-menu.sh --quick protocol-suite
bash lazy-vps-menu.sh --quick anytls
bash lazy-vps-menu.sh --quick tuic
bash lazy-vps-menu.sh --quick anytls-tuic
```

## IPv6 / 双栈快捷入口

**VPS / Linux 执行：**

```bash
bash /root/lazy-vps-menu.sh --quick ipv6-r443
bash /root/lazy-vps-menu.sh --quick v4-fallback
bash /root/lazy-vps-menu.sh --quick v4v6-split
bash /root/lazy-vps-menu.sh --quick http
```

## GitHub 上传 README 修复

**Windows CMD 执行：**

```bat
git add README.md QUICK_START.md CHANGELOG.md FIX_README_NOW.md README_FULL_v1.3.4.md
git commit -m "docs: restore full LazyVPS README with quick commands and protocol guide"
git push
```
