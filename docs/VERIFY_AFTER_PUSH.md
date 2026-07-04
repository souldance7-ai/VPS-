# Verify After Push v1.3.3

## 1. 验证 GitHub raw 是否已经是 v1.3.3

```bash
curl -Ls "https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh?v=$(date +%s)" | grep -E "v1.3.3|AnyTLS|TUIC|protocol_suite" | head -30
```

至少要看到：

```text
Formal Version: v1.3.3
Protocol Suite / Hysteria2 + AnyTLS + TUIC
```

## 2. VPS 端清除旧文件重新拉取

```bash
rm -f lazy-vps-menu.sh
curl -L -H "Cache-Control: no-cache" "https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh?v=$(date +%s)" -o lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
grep -nE 'v1.3.3|AnyTLS|TUIC|protocol_suite' lazy-vps-menu.sh | head -40
bash lazy-vps-menu.sh
```
