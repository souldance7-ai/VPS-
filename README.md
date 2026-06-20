# LazyVPS Quick Menu Pack / 懒人建 VPS 快速菜单包

<p align="center">
  <img src="./menu-basic.png" width="860">
</p>

<p align="center">
  <b>少折腾 · 快部署 · 可回滚 · 可分享 · 支持服务端 AI 分流与流媒体 DNS 辅助</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-v1.2.2-blue">
  <img src="https://img.shields.io/badge/Shell-Bash-green">
  <img src="https://img.shields.io/badge/Xray-26.x-orange">
  <img src="https://img.shields.io/badge/Media_DNS-Zouter_151.243.229.229-brightgreen">
</p>

---

## 你想做什么？先看这里

| 需求 | 直接看哪一段 | 适合场景 |
|---|---|---|
| **新 VPS 快速建站 / 建节点** | 一、新 VPS 快速建站流程 | 新买 VPS，要快速部署 Trojan / Reality / Hysteria2，并导出 FLClash / Surge 配置 |
| **香港节点要能用 GPT / Claude** | 二、香港入口节点附挂小鸡使用 AI / GPT | 香港节点速度好，但香港出口不能 GPT，需要把 AI 域名分流到日本 / 台湾落地 |
| **流媒体 DNS / CDN 区域解析辅助** | 三、流媒体 DNS 解锁辅助 | 接入商提供 Media DNS，例如 Zouter `151.243.229.229`，用于改善流媒体 DNS/CDN 解析 |
| **检查服务状态 / 导出配置** | 四、检查、导出与下载配置 | 看 Xray 是否运行、端口是否监听、导出客户端配置 |
| **出问题要回滚** | 五、备份、回滚与故障处理 | 改坏配置、Xray 启动失败、AI 分流或 DNS 写错 |
| **想看完整菜单截图** | 六、完整菜单界面预览 | 了解 BASIC / PROTOCOL / CHECK / BACKUP / DOWNLOAD / RELAY / TUNE |

---

# 一、新 VPS 快速建站流程

```bash
wget -O lazy-vps-menu.sh https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash lazy-vps-menu.sh
```

新 VPS 推荐执行顺序：

```text
1) System Init
2) Stable BBR
3) Firewall Backend
4) Xray Core
5) Trojan 443
8) Status
10) Export
16) HTTP On
17) HTTP Off
```

FLClash 只导入：

```text
01_IMPORT_FLCLASH.yaml
```

Surge 导入：

```text
02_IMPORT_SURGE.conf
```

不要导入 `DO_NOT_IMPORT`、节点片段或服务端备份文件。

---

# 二、香港入口节点附挂小鸡使用 AI / GPT

v1.2 重点功能：**Server AI Routing / 服务端 AI 分流**。

适用场景：

```text
香港 VPS 速度很好，但香港出口不能直接使用 GPT / Claude。
希望：
普通网站       → 继续走香港出口
GPT / OpenAI  → 由香港服务端自动转交日本 / 台湾落地节点
```

正确逻辑：

```text
客户端 → 香港入口 VPS
          ├─ 普通网站 → 香港 VPS 本机 freedom 出口
          └─ AI 域名 → 日本 / 台湾 Trojan outbound
```

进入菜单后选择：

```text
22) Server AI Routing / 服务端AI分流
```

查看是否成功：

```bash
bash /root/lazy-vps-menu.sh --quick ai-route-show
```

连接香港入口节点后，打开 AI 检测网站：

```text
https://ip.net.coffee/claude/
```

正常结果：

```text
普通出口：香港
AI 出口：日本 / 台湾
GPT / Claude 支持地区：正常
```

---

# 三、流媒体 DNS 解锁辅助（v1.2.2 更新）

v1.2.2 新增 **Media DNS Unlock / 流媒体 DNS 解锁辅助**。

它适合这种场景：

```text
VPS 出口 IP 本身可用；
但 Netflix / Disney+ / YouTube / TikTok 等流媒体出现 DNS 区域、CDN 分配不理想；
接入商提供专用流媒体 DNS。
```

例如 Zouter 提供：

```text
151.243.229.229
```

菜单入口：

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

快速命令：

```bash
bash /root/lazy-vps-menu.sh --quick media-dns
bash /root/lazy-vps-menu.sh --quick dns-show
bash /root/lazy-vps-menu.sh --quick dns-rollback
bash /root/lazy-vps-menu.sh --quick dns-test
```

重要说明：

```text
Media DNS 只用于流媒体 DNS / CDN 解析辅助。
它不会改变 VPS 出口 IP。
它不能保证绕过所有平台的 IP 风控。
如果平台主要判断出口 IP 是否支持地区，仍需要换落地 VPS、服务端 AI 分流或端口中转。
```

---


## v1.2.2 导出修正

v1.2.2 起，如果已经通过菜单 `30) DNS Unlock` 设置了 Media DNS，之后执行：

```text
10) Export / 导出配置包
```

导出的 `01_IMPORT_FLCLASH.yaml` 会自动同步该 DNS，例如：

```yaml
dns:
  nameserver:
    - 151.243.229.229
    - 1.1.1.1
    - 8.8.8.8
```

如果未设置 Media DNS，则继续使用默认 DNS。  
这样可以避免 VPS 系统 DNS 已经改成 Zouter，但 FLClash 导出配置仍然使用旧 DNS 的情况。

# 四、检查、导出与下载配置

常用菜单：

```text
8) Status / 状态检查
9) Output / 查看节点输出
10) Export / 导出配置包
16) HTTP On / 开启 HTTP 下载
17) HTTP Off / 停止 HTTP 下载
```

---

# 五、备份、回滚与故障处理

常用菜单：

```text
11) Backup / 备份当前配置
12) Rollback Xray / 回滚 Xray
24) AI Route Rollback / 回滚服务端AI分流
30) DNS Unlock → 5) Rollback DNS
33) Diagnose / 一键诊断查修
```

查看 Xray 状态：

```bash
systemctl status xray --no-pager
```

查看日志：

```bash
journalctl -u xray -n 80 --no-pager
```

---

# 六、完整菜单界面预览

v1.2.2 保留原有 v1.0 的分区式菜单流程，并在 RELAY 分区明确服务端 AI 分流，在 TUNE 分区扩展媒体 DNS 解锁。

## BASIC / 基础环境

<p align="center">
  <img src="./menu-basic.png" width="860">
</p>

## PROTOCOL / 协议部署

<p align="center">
  <img src="./menu-protocol.png" width="860">
</p>

## CHECK / 检查导出

<p align="center">
  <img src="./menu-check.png" width="860">
</p>

## BACKUP / 备份服务

<p align="center">
  <img src="./menu-backup.png" width="860">
</p>

## DOWNLOAD / 下载合并

<p align="center">
  <img src="./menu-download.png" width="860">
</p>

## RELAY / 分流中转

<p align="center">
  <img src="./menu-relay.png" width="860">
</p>

## TUNE / 调优诊断

<p align="center">
  <img src="./menu-tune.png" width="860">
</p>

---

## 分享安全

本项目不内置以下敏感信息：

```text
VPS IP
私有域名
Trojan / Hysteria2 密码
订阅地址
Cloudflare Token
SSH 登录信息
```

---

## License

MIT License
