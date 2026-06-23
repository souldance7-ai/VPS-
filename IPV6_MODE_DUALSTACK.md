# LazyVPS v1.2.8 IPv6 Mode 与双栈导出说明

## 用途

用于原生 IPv6 / 双栈 VPS，自动生成 IPv4、IPv6、DualStack 三套 FLClash 配置。

## 菜单入口

```text
35) Stability Suite
7) IPv6 Mode / IPv6 模式管理
```

## 快速命令

```bash
bash /root/lazy-vps-menu.sh --quick ipv6-check
bash /root/lazy-vps-menu.sh --quick ipv6-export
bash /root/lazy-vps-menu.sh --quick ipv6-guard
bash /root/lazy-vps-menu.sh --quick ipv6-disable
bash /root/lazy-vps-menu.sh --quick ipv6-rollback
```

## 输出文件

```text
01_IMPORT_FLCLASH_IPV4.yaml
01_IMPORT_FLCLASH_IPV6.yaml
01_IMPORT_FLCLASH_DUALSTACK.yaml
```

## 建议测试顺序

1. 先执行 IPv6 Check。
2. 部署 Trojan 或 VLESS Reality。
3. 执行 10) Export。
4. 进入 IPv6 Mode 生成三套导出。
5. 分别导入 IPv4 / IPv6 / DualStack 测试。
6. 稳定后再合并到总配置。
