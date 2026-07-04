# LazyVPS Quick Start / 一键复制命令

本文件用于 GitHub 首页之外的快速复制。原 `lazy-vps-menu.sh` 主菜单命令保留，v1.3.1 仅新增 `lazy-vps-protocol-addon.sh` 协议扩展入口。

---

## 1. 原 LazyVPS 主菜单

### 一行命令直接运行

**VPS / Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh)
```

### 下载审查后运行

**VPS / Linux 执行：**

```bash
apt update && apt install -y curl wget
wget -O /root/lazy-vps-menu.sh https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh
chmod +x /root/lazy-vps-menu.sh
bash /root/lazy-vps-menu.sh
```

### 预览界面

**VPS / Linux 执行：**

```bash
bash /root/lazy-vps-menu.sh --preview
```

---

## 2. 原主菜单常用 Quick 命令

**VPS / Linux 执行：**

```bash
bash /root/lazy-vps-menu.sh --quick ipv6-r443
bash /root/lazy-vps-menu.sh --quick v4-fallback
bash /root/lazy-vps-menu.sh --quick v4v6-split
bash /root/lazy-vps-menu.sh --quick http
```

---

## 3. v1.3.1 新增 AnyTLS / TUIC 协议扩展

### 一行命令直接运行扩展菜单

**VPS / Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-protocol-addon.sh)
```

### 下载审查后运行扩展菜单

**VPS / Linux 执行：**

```bash
apt update && apt install -y curl wget
wget -O /root/lazy-vps-protocol-addon.sh https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-protocol-addon.sh
chmod +x /root/lazy-vps-protocol-addon.sh
bash /root/lazy-vps-protocol-addon.sh
```

### AnyTLS / TUIC 快捷命令

**VPS / Linux 执行：**

```bash
bash /root/lazy-vps-protocol-addon.sh --quick anytls
bash /root/lazy-vps-protocol-addon.sh --quick tuic
bash /root/lazy-vps-protocol-addon.sh --quick http
bash /root/lazy-vps-protocol-addon.sh --quick status
```

---

## 4. 推荐流程

### 常规新机

```text
1) System Init → 2) Stable BBR → 3) Firewall Backend → 4) Xray Core → 5/6/7 部署协议 → 10 Export → 16 HTTP On
```

### IPv6 主力 + IPv4 备用

```text
35) Stability Suite → 7) IPv6 Mode → 10) IPv6 Reality 443 Clean → 12) IPv4 Fallback Port → 13) V4/V6 Split Export → 16) HTTP On
```

### AnyTLS / TUIC 扩展

```text
先用原主菜单完成系统初始化与防火墙，再运行 lazy-vps-protocol-addon.sh 部署 AnyTLS 或 TUIC。
```

