# LazyVPS v1.3.3 快速命令

## 原主菜单一键运行

**VPS / Linux 执行：**

```bash
apt update && apt install -y curl wget
rm -f lazy-vps-menu.sh
curl -L -H "Cache-Control: no-cache" "https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh?v=$(date +%s)" -o lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash lazy-vps-menu.sh
```

## 协议套件入口

**VPS / Linux 执行：**

```bash
bash lazy-vps-menu.sh --quick protocol-suite
```

## AnyTLS

**VPS / Linux 执行：**

```bash
bash lazy-vps-menu.sh --quick anytls
```

## TUIC

**VPS / Linux 执行：**

```bash
bash lazy-vps-menu.sh --quick tuic
```

## AnyTLS + TUIC 双协议

**VPS / Linux 执行：**

```bash
bash lazy-vps-menu.sh --quick anytls-tuic
```

## 验证主脚本是否已更新

**VPS / Linux 执行：**

```bash
grep -nE 'v1.3.3|AnyTLS|TUIC|protocol_suite' lazy-vps-menu.sh | head -40
```
