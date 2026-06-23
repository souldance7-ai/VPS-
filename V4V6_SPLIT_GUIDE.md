# LazyVPS v1.2.15 · V4/V6 独立端口与双栈策略指南

## 目标

让双栈 VPS 同时保留：

```text
IPv6 主力：VLESS Reality 443
IPv4 备用：VLESS Reality 8443 / 自定义端口
DualStack Auto：优先 IPv6，失败切 IPv4
```

## 推荐步骤

```bash
bash /root/lazy-vps-menu.sh --quick ipv6-r443
bash /root/lazy-vps-menu.sh --quick v4-fallback
bash /root/lazy-vps-menu.sh --quick v4v6-split
bash /root/lazy-vps-menu.sh --quick http
```

## 互动菜单路径

```text
35) Stability Suite
7) IPv6 Mode
10) IPv6 Reality 443 Clean
12) IPv4 Fallback Port
13) V4/V6 Split Export
14) DualStack Strategy
```

## 输出文件

```text
01_IMPORT_FLCLASH_IPV6_REALITY_PORT443.yaml
01_IMPORT_FLCLASH_IPV4_REALITY_PORT8443.yaml
01_IMPORT_FLCLASH_V4V6_SPLIT.yaml
01_IMPORT_FLCLASH_DUALSTACK_AUTO.yaml
```

## 判断标准

FLClash 节点卡片应分别显示：

```text
IPv6 主力：Vless
IPv4 备用：Vless
Auto：可自动切换
```

如有 Timeout，请先检查端口监听、Xray 日志和公共 IP / NAT 配置。
