# 推送后验证

## 1. 验证 GitHub raw 是否已经是 v1.3.2

```bash
curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh | grep -E "v1.3.2|AnyTLS|TUIC|protocol_suite" | head -30
```

应该能看到：

```text
Formal Version: v1.3.2
Protocol Suite / Hysteria2 + AnyTLS + TUIC
protocol_suite
anytls) deploy_anytls
```

## 2. 预览主菜单

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh) --preview
```

## 3. 测试快捷命令入口

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh) --quick protocol-suite
```

## 4. 单独测试 addon

```bash
wget -O lazy-vps-protocol-addon.sh https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-protocol-addon.sh
bash -n lazy-vps-protocol-addon.sh
bash lazy-vps-protocol-addon.sh --quick status
```
