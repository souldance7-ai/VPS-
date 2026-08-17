# Poste.io 邮局全自动互动引导面板

面向个人、工作室和小型团队的简体中文 Poste.io 部署工具。它把邮件服务器最容易出错的环节——公网 IP、TCP/25、PTR、DNS、Docker、端口冲突、邮件客户端参数和备份——整理成一个可重复执行的终端面板。

> 本项目不会把任何固定 IP、域名、邮箱或密码写进脚本，也没有项目遥测和信息回传。公网 IP 自动识别会访问公开 IP 查询服务；不需要时可设置 `POSTEIO_SKIP_IP_LOOKUP=1` 后手动输入。

## 功能

- 彩色终端互动面板，全程简体中文
- 自动识别 VPS 公网 IPv4、系统、内存和时区
- 安装 Docker 与必要诊断工具
- 部署 Poste.io Free：`analogic/poste.io:latest`
- 安装前检查 TCP/25 出站、全部端口冲突和系统资源
- 识别 UFW/firewalld，并在确认后放行邮件端口
- 自动生成 A、MX、SPF、DMARC、PTR、DKIM 配置清单
- 容器、监听端口、A/MX/PTR、出站 25、管理页全项验收
- 输出 Outlook、手机邮件客户端的 IMAP/SMTP 参数
- 停机一致性备份、镜像更新、保留数据卸载
- 所有密码均由用户在 Poste.io 页面输入，脚本不读取、不打印、不保存

## 推荐环境

- 全新 VPS，独立公网 IPv4
- Debian 12/13 或 Ubuntu 22.04/24.04
- 最低 2 vCPU、2 GB 内存；启用 ClamAV 建议 4 GB 以上
- 20 GB 以上磁盘
- VPS 商允许入站及出站 TCP/25
- 可设置 PTR/rDNS
- 一个可管理 DNS 的域名

Rocky Linux、AlmaLinux 也提供自动安装支持，但优先推荐 Debian/Ubuntu。

## 一键安装

使用 root 登录 VPS，执行：

```bash
curl -fsSL https://raw.githubusercontent.com/souldance7-ai/VPS-/main/posteio-mailserver-wizard/install.sh | bash
```

以后打开面板：

```bash
posteio-wizard
```

如果不想安装到系统，可直接下载运行：

```bash
curl -fLO https://raw.githubusercontent.com/souldance7-ai/VPS-/main/posteio-mailserver-wizard/posteio-wizard.sh
chmod +x posteio-wizard.sh
sudo ./posteio-wizard.sh
```

## 面板流程

```text
[1] 一键预检并安装 Poste.io
[2] 显示 DNS / PTR / SPF / DMARC 配置
[3] 首次管理员与创建信箱引导
[4] 邮局全项验收
[5] Outlook / 手机客户端参数
[6] 一致性备份邮件数据
[7] 更新 Poste.io 镜像
[8] 查看最近容器日志
[9] 删除容器（保留全部数据）
```

推荐顺序：

```text
VPS 与 TCP/25 预检
        ↓
部署 Poste.io
        ↓
设置 A / MX / PTR / SPF / DMARC
        ↓
首次创建系统管理员
        ↓
添加邮件域名与 DKIM
        ↓
创建邮箱并设置配额
        ↓
全项验收
        ↓
Outlook / 手机客户端登录
```

## 必须理解的边界

以下事项无法由通用脚本代替账号所有者完成：

1. **解封 TCP/25**：由 VPS 服务商控制。
2. **PTR/rDNS**：必须在 VPS 服务商后台设置，或提交工单。
3. **DNS 记录**：每家 DNS 服务商接口不同，本工具生成准确记录，由用户添加。
4. **首次管理员**：必须在自己的 Poste.io 页面创建，避免管理员密码进入终端历史。
5. **DKIM**：密钥由每台 Poste.io 实例生成，必须复制后台实际显示的 TXT 值。

脚本不会为了“全自动”而绕过这些安全边界。

## 端口

| 端口 | 用途 |
|---:|---|
| TCP/25 | 邮件服务器之间收发邮件，必须可用 |
| TCP/80 | HTTP 与 Let's Encrypt 验证 |
| TCP/443 | 管理后台和 Webmail，推荐使用标准端口 |
| TCP/465 | SMTP SSL/TLS |
| TCP/587 | SMTP Submission + STARTTLS，客户端推荐 |
| TCP/993 | IMAP SSL/TLS，客户端推荐 |
| TCP/995 | POP3 SSL/TLS |
| TCP/110、143 | POP3/IMAP STARTTLS，兼容用途 |
| TCP/4190 | Sieve 邮件过滤 |

## Outlook 参数

- 用户名：完整邮箱地址
- IMAP：邮件主机名，端口 `993`，SSL/TLS
- SMTP：邮件主机名，端口 `587`，STARTTLS，需要身份验证
- SMTP 备用：端口 `465`，SSL/TLS

## 常用命令

```bash
posteio-wizard --check
posteio-wizard --dns
posteio-wizard --client
posteio-wizard --backup
posteio-wizard --update
posteio-wizard --logs
```

## 数据与隐私

- 配置保存在 `/etc/posteio-wizard/config.env`，权限 `0600`
- Poste.io 数据默认保存在 `/opt/posteio/data`
- 备份默认保存在 `/opt/posteio/backups`
- 本地运行日志为 `/var/log/posteio-wizard.log`
- 部署报告仅保存在运行脚本的 VPS，不会上传
- 密码不会写入配置、日志、报告或命令历史
- 项目不包含统计、遥测、回传、广告或远程控制代码
- 公网 IP 自动识别会访问 `api.ipify.org`、`ipv4.icanhazip.com` 或 `ifconfig.me`；设置 `POSTEIO_SKIP_IP_LOOKUP=1` 可完全跳过

## 安全建议

- 使用独立高强度管理员密码，并保存到密码管理器
- 管理员邮箱与普通收发邮箱分开
- 单邮箱设置合理配额，不建议无限容量
- 定期执行一致性备份，并把备份复制到另一台设备
- SPF/DKIM 验收后，再把 DMARC 从 `p=none` 逐步提升为 `quarantine` 或 `reject`
- 邮件主机 DNS 记录必须关闭 CDN/代理，仅保留 DNS 解析

## 卸载

面板中的“删除容器”只删除 Docker 容器，默认保留全部邮件数据。项目不会提供无人确认的删库操作。

## 许可证

[MIT License](LICENSE)

## 免责声明

运行邮件服务器需要持续维护信誉、DNS、安全更新、备份和滥用防护。本工具帮助部署与检查，但不能保证邮件一定进入所有收件方的收件箱。
