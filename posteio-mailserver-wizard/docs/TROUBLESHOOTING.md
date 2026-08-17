# 常见故障排查

## 出站 TCP/25 不通

现象：可以登录 Webmail，但发往外部域名的邮件一直在队列中。

处理：

1. 执行 `posteio-wizard --check`。
2. 确认出站 TCP/25 是否成功。
3. 到 VPS 服务商后台申请解除 SMTP/25 限制。
4. 不要用 587 代替服务器之间的投递；587 是邮件客户端提交端口。

工单模板：

```text
您好，我需要在该 VPS 上运行自用邮件服务器。请协助解除出站及入站 TCP/25 限制。
我会配置 PTR、SPF、DKIM、DMARC，并采取强密码、反垃圾邮件与滥用防护措施。
```

## Error 1034 / Edge IP Restricted

常见原因：邮件主机 DNS 错误开启了 CDN/代理，或 Fake-IP/代理软件把邮件域名交给了错误的 DNS 路径。

检查：

```bash
nslookup mail.example.com
```

结果必须是 VPS 的真实公网 IP。Cloudflare 等平台上的邮件主机记录应设为“仅 DNS”。

## 自定义 HTTPS 端口登录后端口消失

推荐优先使用标准 `443`。若必须使用自定义端口：

1. 确认安装环境中的 `HTTPS_PORT` 与浏览器端口一致。
2. 从 Webmail 内的 Administration 入口进入。
3. 或在跳转后把地址栏改回 `https://mail.example.com:自定义端口/admin/`。

## 邮件进入垃圾箱

逐项检查：

- PTR 是否与邮件主机名一致
- A 与 PTR 是否正反一致
- SPF、DKIM、DMARC 是否通过
- VPS IP 是否进入公开黑名单
- HELO/EHLO 主机名是否正确
- 邮件内容是否包含高风险链接、附件或批量发送特征

新 IP 需要逐步建立信誉，不要突然大量发信。

## 容器无法启动

```bash
posteio-wizard --logs
ss -lntup
docker inspect poste-mailserver
```

最常见原因是 25、80、443、465、587、993 等端口已被 Postfix、Nginx、Apache 或其他邮件容器占用。
