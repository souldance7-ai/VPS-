# LazyVPS v1.3.5 快速命令

## 主菜单

**VPS / Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh)
```

## 强制刷新旧版

**VPS / Linux 执行：**

```bash
rm -f lazy-vps-menu.sh
curl -L -H "Cache-Control: no-cache" "https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh?v=$(date +%s)" -o lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
grep -nE 'v1.3.5|AnyTLS|TUIC|protocol_suite' lazy-vps-menu.sh | head -40
bash lazy-vps-menu.sh
```

## AnyTLS / TUIC

**VPS / Linux 执行：**

```bash
bash lazy-vps-menu.sh --quick protocol-suite
bash lazy-vps-menu.sh --quick anytls
bash lazy-vps-menu.sh --quick tuic
bash lazy-vps-menu.sh --quick anytls-tuic
```
