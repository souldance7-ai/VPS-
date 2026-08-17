# DNS、PTR 与邮件认证配置指南

以下使用文档保留地址举例，不对应任何真实服务器：

- 邮件主机：`mail.example.com`
- 邮件域名：`example.com`
- VPS IPv4：`203.0.113.10`

## 基础记录

| 主机 | 类型 | 内容 | 说明 |
|---|---|---|---|
| `mail` | A | `203.0.113.10` | 必须关闭 CDN/代理 |
| `@` | MX | `10 mail.example.com.` | 不要填写 IP |
| `@` | TXT | `v=spf1 mx ~all` | SPF 初始配置 |
| `_dmarc` | TXT | `v=DMARC1; p=none; rua=mailto:dmarc-reports@example.com` | 初期观察模式 |
| `autodiscover` | CNAME | `mail.example.com.` | Outlook 自动发现，可选 |
| `autoconfig` | CNAME | `mail.example.com.` | Thunderbird 自动配置，可选 |

## PTR / rDNS

PTR 是 IP 到邮件主机名的反向解析：

```text
203.0.113.10 → mail.example.com
```

PTR 由 VPS 服务商控制，不在域名 DNS 面板设置。正向 A 记录和反向 PTR 应互相对应。

## DKIM

DKIM 不能使用文档中的通用值。请在 Poste.io 后台：

```text
Virtual domains → 选择域名 → DKIM → Create a new key
```

然后把后台显示的选择器、主机名和完整 TXT 公钥原样添加到 DNS。

## DMARC 提升策略

建议逐步提高策略：

1. `p=none`：先观察报告。
2. `p=quarantine; pct=10`：小比例进入垃圾邮件。
3. 逐步提高 `pct`。
4. 确认所有合法发送源已通过 SPF/DKIM 后，再使用 `p=reject`。

不要在未确认第三方发信系统前直接设为 `reject`。
