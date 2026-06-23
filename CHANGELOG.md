# CHANGELOG

## 正式 v1.2.15 · V4/V6 独立端口与双栈策略版 — 2026-06-23

### 新增

- IPv4 Fallback Port：为 IPv4 单独部署 VLESS Reality 备用端口，默认 8443。
- V4/V6 Split Export：合并 IPv6 Reality 443 与 IPv4 备用端口，生成可手动指定 V4/V6 的 FLClash 配置。
- DualStack Strategy：生成双栈策略说明，推荐 Auto 优先 IPv6，失败切 IPv4。
- 新增图文说明：`docs/images/08-v4v6-split-flow.png` 与 `docs/images/09-v1215-recommended-flow.png`。

### 推荐主线

```text
IPv6 主力：VLESS Reality 443
IPv4 备用：VLESS Reality 8443 / 自定义端口
Auto：优先 V6，失败后 V4 兜底
```

### 快捷命令

```bash
bash /root/lazy-vps-menu.sh --quick ipv6-r443
bash /root/lazy-vps-menu.sh --quick v4-fallback
bash /root/lazy-vps-menu.sh --quick v4v6-split
bash /root/lazy-vps-menu.sh --quick dualstack-auto
```
