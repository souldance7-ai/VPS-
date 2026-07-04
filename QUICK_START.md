# LazyVPS v1.3.2 QUICK START

## 1. 更新仓库主菜单

**VPS / Linux 或 Git Bash 执行：**

```bash
bash patch-main-menu-v1.3.2.sh
bash -n lazy-vps-menu.sh
bash -n lazy-vps-protocol-addon.sh
grep -nE "v1.3.2|AnyTLS|TUIC|protocol_suite" lazy-vps-menu.sh | head -30
```

## 2. 推送 GitHub

**Windows CMD 执行：**

```bat
git add lazy-vps-menu.sh lazy-vps-protocol-addon.sh patch-main-menu-v1.3.2.sh README.md QUICK_START.md CHANGELOG.md docs protocols templates
git commit -m "feat: integrate AnyTLS and TUIC into LazyVPS main menu"
git push
```

## 3. VPS 一键运行

**VPS / Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh)
```

## 4. AnyTLS / TUIC 快捷命令

**VPS / Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh) --quick anytls
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh) --quick tuic
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh) --quick anytls-tuic
```

## 5. 本地下载后运行

**VPS / Linux 执行：**

```bash
apt update && apt install -y curl wget
wget -O lazy-vps-menu.sh https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash lazy-vps-menu.sh
```
