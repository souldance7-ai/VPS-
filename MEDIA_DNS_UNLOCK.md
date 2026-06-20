# LazyVPS v1.2.2 Media DNS Unlock / 流媒体 DNS 解锁辅助

## 一句话说明

Media DNS Unlock 用于接入商提供的流媒体 DNS / CDN 解析优化。  
它不会改变 VPS 出口 IP，也不能保证绕过所有平台的 IP 风控。

## 当前内置模板

| 模板 | DNS |
|---|---|
| Zouter Media DNS | `151.243.229.229` |

## 菜单入口

```text
30) DNS Unlock / 媒体 DNS 解锁工具
```

子菜单：

```text
1) Zouter Media DNS / 使用 Zouter 流媒体 DNS：151.243.229.229
2) Custom Media DNS / 自定义接入商流媒体 DNS
3) Alice DNS Unlock / 第三方 DNS Alice 解锁脚本
4) Show DNS / 查看当前 DNS 与解析测试
5) Rollback DNS / 回滚 LazyVPS DNS 配置
6) Test DNS / 指定域名解析对比
```

## 快速命令

```bash
bash /root/lazy-vps-menu.sh --quick media-dns
bash /root/lazy-vps-menu.sh --quick dns-show
bash /root/lazy-vps-menu.sh --quick dns-rollback
bash /root/lazy-vps-menu.sh --quick dns-test
```

## 适合场景

```text
流媒体平台因为 DNS/CDN 区域解析不理想导致不可用或分区错误。
接入商明确提供可用区专用流媒体 DNS。
```

## 不适合场景

```text
平台主要判断 VPS 出口 IP 是否为机房、是否干净、是否支持地区。
这种情况 DNS 改了也不一定有用，需要换出口 IP、服务端分流或落地中转。
```

## 回滚

菜单选择：

```text
30) DNS Unlock → 5) Rollback DNS
```

或执行：

```bash
bash /root/lazy-vps-menu.sh --quick dns-rollback
```


## 导出同步

v1.2.2 起，设置 Media DNS 后，执行 `10) Export` 会自动把 Media DNS 写入 `01_IMPORT_FLCLASH.yaml` 的 `dns.nameserver`。

设置 Zouter Media DNS 后导出示例：

```yaml
nameserver:
  - 151.243.229.229
  - 1.1.1.1
  - 8.8.8.8
```

如果想恢复默认 DNS，请先执行：

```bash
bash /root/lazy-vps-menu.sh --quick dns-rollback
```

然后重新执行 `10) Export`。
