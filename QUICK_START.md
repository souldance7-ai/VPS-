# LazyVPS Quick Start / 一键复制指令

## 一行进入主菜单

**VPS / Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh)
```

## 强制刷新旧版 / 修复 AnyTLS TUIC addon not found

**VPS / Linux 执行：**

```bash
rm -f lazy-vps-menu.sh /root/lazy-vps-menu.sh /opt/lazy-vps-menu/lazy-vps-protocol-addon.sh
curl -L -H "Cache-Control: no-cache" "https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh?v=$(date +%s)" -o lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash -n lazy-vps-menu.sh
grep -nE 'v1.3.8|AnyTLS|TUIC|Protocol Suite' lazy-vps-menu.sh | head -40
bash lazy-vps-menu.sh
```

## 直接部署 AnyTLS

**VPS / Linux 执行：**

```bash
rm -f lazy-vps-menu.sh /root/lazy-vps-menu.sh /opt/lazy-vps-menu/lazy-vps-protocol-addon.sh
curl -L -H "Cache-Control: no-cache" "https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh?v=$(date +%s)" -o lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash lazy-vps-menu.sh --quick anytls
```

## 直接部署 TUIC

**VPS / Linux 执行：**

```bash
rm -f lazy-vps-menu.sh /root/lazy-vps-menu.sh /opt/lazy-vps-menu/lazy-vps-protocol-addon.sh
curl -L -H "Cache-Control: no-cache" "https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh?v=$(date +%s)" -o lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash lazy-vps-menu.sh --quick tuic
```

## 同机部署 AnyTLS + TUIC

**VPS / Linux 执行：**

```bash
rm -f lazy-vps-menu.sh /root/lazy-vps-menu.sh /opt/lazy-vps-menu/lazy-vps-protocol-addon.sh
curl -L -H "Cache-Control: no-cache" "https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh?v=$(date +%s)" -o lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash lazy-vps-menu.sh --quick anytls-tuic
```
