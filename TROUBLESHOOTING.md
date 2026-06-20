# TROUBLESHOOTING / 常见故障说明

## 1. Xray 提示 Trojan deprecated

示例：

```text
The feature Trojan (with no Flow, etc.) is deprecated
```

这只是提醒，不是当前错误。配置测试通过且 Xray active running 就可以继续使用。

---

## 2. 配置失败自动回滚

菜单 22 写入前会备份：

```text
/opt/lazy-vps-menu/backups/xray_config_before_ai_route_*.json
```

如果 `xray run -test` 不通过，会自动回滚。

---

## 3. AI 出口没有变

先查服务端配置：

```bash
bash /root/lazy-vps-menu.sh --quick ai-route-show
```

确认：

```text
sniffing=True
AI outbound 存在
routing rules → AI outbound
```

再确认客户端仍连接入口节点，例如香港节点。

---

## 4. 普通 IP 检测仍显示香港

正常。服务端 AI 分流不是全局改出口。  
普通网站仍走香港，AI 域名才走日本 / 台湾。

---

## 5. Media DNS 设置后 FLClash 配置没有同步

v1.2.2 已修正此问题。  
设置 Media DNS 后，请重新执行：

```text
10) Export / 导出配置包
```

然后检查：

```bash
grep -A8 "nameserver:" /opt/lazy-vps-menu/outputs/01_IMPORT_FLCLASH.yaml
```

如果已经设置 Zouter Media DNS，应看到：

```text
- 151.243.229.229
- 1.1.1.1
- 8.8.8.8
```

---

## 6. 回滚 Media DNS

菜单：

```text
30) DNS Unlock
5) Rollback DNS / 回滚 LazyVPS DNS 配置
```

或执行：

```bash
bash /root/lazy-vps-menu.sh --quick dns-rollback
```
