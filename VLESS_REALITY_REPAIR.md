# LazyVPS v1.2.7 VLESS Reality 修复与稳定导出说明

## 默认建议

v1.2.7 起，VLESS Reality Vision 默认 serverName 统一为：

```text
www.cloudflare.com
```

原因：在 Zouter 日本节点实测中，`www.microsoft.com` 作为 Reality 目标时出现 Timeout，切换 `www.cloudflare.com` 后恢复正常。

## 新增菜单

```text
36) Advanced Suite
8) VLESS Reality Repair / Reality 修复向导
9) Reality SNI Switch / Reality 目标切换
10) VLESS Stable Export / VLESS 稳定导出
```

## 快捷命令

```bash
bash /root/lazy-vps-menu.sh --quick reality-repair
bash /root/lazy-vps-menu.sh --quick sni-switch
bash /root/lazy-vps-menu.sh --quick vless-stable
```

## VLESS Stable Export

生成：

```text
/opt/lazy-vps-menu/outputs/01_IMPORT_FLCLASH_VLESS_STABLE.yaml
```

特点：

- `tcp-concurrent: false`
- 自动加入代理服务器 IP / 域名 DIRECT,no-resolve 规则
- 适合 Reality 偶发 Timeout 时做稳定性对比
