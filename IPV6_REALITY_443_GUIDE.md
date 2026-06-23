# IPv6 Reality 443 推荐方案

## 使用场景

适合原生 IPv6 / 双栈 VPS，尤其是 IPv6 静态公网、带宽较高、AI 纯净度较好的节点。

## 推荐入口

```text
35) Stability Suite
7) IPv6 Mode
10) IPv6 Reality 443 Clean
```

## 快捷命令

```bash
bash /root/lazy-vps-menu.sh --quick ipv6-r443
```

## 核心逻辑

```text
FLClash / Mihomo
  → server 使用域名
  → hosts 固定解析到 IPv6
  → Xray VLESS Reality 443
  → Reality 目标 www.cloudflare.com
```

## 为什么不推荐 Trojan IPv6 主线？

实测中 Trojan IPv6 在部分 FLClash / Mihomo 环境会持续 Timeout，即使 TCP 443 / 2443 可以连接、password 一致、YAML 正常。故 v1.2.14 以 VLESS Reality 443 作为 IPv6 主线。
