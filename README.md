# LazyVPS Quick Menu Pack / 懒人建 VPS 快速菜单包

<p align="center">
  <img src="./menu-basic.png" width="860">
</p>

<p align="center">
  <b>少折腾 · 快部署 · 可回滚 · 可分享 · 支持服务端 AI 分流与媒体 DNS 辅助</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-v1.2.2-blue">
  <img src="https://img.shields.io/badge/Shell-Bash-green">
  <img src="https://img.shields.io/badge/Xray-26.x-orange">
  <img src="https://img.shields.io/badge/Media_DNS-Export_Sync-brightgreen">
</p>

---

## 你想做什么？先看这里

| 需求 | 直接看哪一段 | 适合场景 |
|---|---|---|
| **新 VPS 快速建站 / 建节点** | [一、新 VPS 快速建站流程](#一新-vps-快速建站流程v10-主流程) | 新买 VPS，要快速部署 Trojan / Reality / Hysteria2，并导出 FLClash / Surge 配置 |
| **香港节点要能用 GPT / Claude** | [二、香港入口节点附挂小鸡使用 AI / GPT](#二香港入口节点附挂小鸡使用-ai--gptv12-更新) | 香港节点速度好，但香港出口不能 GPT，需要把 AI 域名分流到日本 / 台湾落地 |
| **流媒体 DNS / CDN 区域解析辅助** | [三、媒体 DNS 解锁辅助](#三媒体-dns-解锁辅助v122-更新) | 接入商提供 Media DNS，例如 Zouter `151.243.229.229`，用于改善流媒体 DNS/CDN 解析 |
| **机场链 / 外购节点做 AI 或媒体落地** | [四、机场链 / 外购节点链路思路](#四机场链--外购节点链路思路可用于-ai--媒体) | 自建 VPS 做入口，AI / 流媒体走外购机场策略组或纯净节点 |
| **检查、导出、下载配置** | [五、检查、导出与下载配置](#五检查导出与下载配置) | 看 Xray 是否运行、端口是否监听、导出客户端配置 |
| **出问题要回滚** | [六、备份、回滚与故障处理](#六备份回滚与故障处理) | 改坏配置、Xray 启动失败、AI 分流或 DNS 写错 |
| **完整菜单截图** | [七、完整菜单界面预览](#七完整菜单界面预览) | 了解 BASIC / PROTOCOL / CHECK / BACKUP / DOWNLOAD / RELAY / TUNE |

---

# 一、新 VPS 快速建站流程（v1.0 主流程）

## 1. 一键下载并运行

```bash
wget -O lazy-vps-menu.sh https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash lazy-vps-menu.sh
```

一行命令：

```bash
wget -O lazy-vps-menu.sh https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh && chmod +x lazy-vps-menu.sh && bash lazy-vps-menu.sh
```

仅预览界面：

```bash
bash lazy-vps-menu.sh --preview
```

## 2. 新 VPS 推荐执行顺序

| 顺序 | 菜单 | 用途 |
|---|---|---|
| 1 | `1) System Init / 系统初始化` | 安装基础依赖、确认 SSH、配置防火墙、开启 BBR |
| 2 | `2) Stable BBR / 开启 BBR+fq` | 开启 Linux 原生 BBR + fq，保持稳定 |
| 3 | `3) Firewall Backend / 防火墙后端` | 选择 AUTO / UFW / NFT / IPTABLES / NONE |
| 4 | `4) Xray Core / 安装或更新 Xray` | 安装或更新 Xray Core |
| 5 | `5) Trojan 443 / 部署 T 协议` | 新手推荐，兼容性好 |
| 6 | `8) Status / 状态检查` | 确认 Xray active、端口监听、防火墙放行 |
| 7 | `10) Export / 导出配置包` | 导出 FLClash / Surge 配置 |
| 8 | `16) HTTP On / 开启 HTTP 下载` | 临时开启网页下载配置 |
| 9 | `17) HTTP Off / 停止 HTTP 下载` | 下载完成后关闭临时服务 |

---

# 二、香港入口节点附挂小鸡使用 AI / GPT（v1.2 更新）

适合这种场景：

```text
香港 VPS 速度很好，普通网站体验好；
但是香港出口不能直接使用 GPT / Claude；
手上另有日本 / 台湾 VPS 可以解锁 AI；
希望普通网站继续香港出口，AI 域名走日本 / 台湾落地。
```

## 正确逻辑

<p align="center">
  <img src="./docs/images/server-ai-routing-flow.png" width="860">
</p>

| 名称 | 含义 |
|---|---|
| 入口节点 / 入口 IP | 客户端实际连接的 VPS，例如香港节点 |
| 普通出口 IP | 普通网站、ipinfo、普通测速看到的出口，通常仍是香港 |
| AI 分流出口 IP | GPT / OpenAI / Claude / Gemini 被转交的出口，应显示日本 / 台湾 |
| 落地小鸡 | 被入口 VPS 调用的日本 / 台湾 Trojan outbound，不需要出现在客户端配置里 |

## 菜单怎么选？

```text
22) Server AI Routing / 服务端AI分流
23) AI Route Show / 查看服务端AI分流
24) AI Route Rollback / 回滚服务端AI分流
```

> 香港节点要 GPT，用 `22) Server AI Routing`。  
> 不要用 `25) Relay Forward` 去解决 GPT 域名分流问题。

## 验证

连接香港入口节点后，打开：

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

# 三、媒体 DNS 解锁辅助（v1.2.2 更新）

v1.2.2 新增 **Media DNS Unlock / 媒体 DNS 解锁辅助**，并修正导出同步问题。

<p align="center">
  <img src="./docs/images/media-dns-routing-flow.png" width="860">
</p>

## 功能定位

Media DNS 适合：

```text
VPS 出口 IP 本身可用；
但 Netflix / Disney+ / YouTube / TikTok 等流媒体出现 DNS 区域、CDN 分配不理想；
接入商提供专用流媒体 DNS。
```

它不适合：

```text
平台主要判断 VPS 出口 IP 是否为机房、是否干净、是否支持地区。
这种情况 DNS 改了也不一定有用，需要换出口 IP、服务端分流、端口中转或机场链。
```

## 内置模板

```text
Zouter Media DNS：151.243.229.229
```

## 菜单入口

```text
30) DNS Unlock / 媒体 DNS 解锁与导出同步
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

## v1.2.2 导出修正

设置 Media DNS 后，再执行：

```text
10) Export / 导出配置包
```

导出的 `01_IMPORT_FLCLASH.yaml` 会自动同步当前 Media DNS：

```yaml
dns:
  nameserver:
    - 151.243.229.229
    - 1.1.1.1
    - 8.8.8.8
```

如果未设置 Media DNS，则继续使用默认 DNS。

---

# 四、机场链 / 外购节点链路思路（可用于 AI / 媒体）

除了 Media DNS，AI 和流媒体也可以通过 **机场链 / 外购节点策略组** 来处理。

<p align="center">
  <img src="./docs/images/airport-chain-flow.png" width="860">
</p>

## 什么是机场链？

简单说就是：

```text
自建 VPS 做入口 / 普通出口；
AI 或流媒体域名交给外购机场节点或机场策略组；
客户端规则按域名分流。
```

典型场景：

```text
普通网站：自建 VPS / 香港入口
GPT / Claude：机场 AI 策略组
Netflix / Disney+：机场流媒体策略组
```

## 与 Media DNS 的区别

<p align="center">
  <img src="./docs/images/unlock-mode-compare.png" width="860">
</p>

| 方式 | 解决什么 | 出口 IP 会不会变 |
|---|---|---|
| Server AI Routing | 香港入口不能 GPT，把 AI 域名转给日本 / 台湾小鸡 | AI 流量出口会变 |
| Media DNS Unlock | 流媒体 DNS / CDN 解析错误 | 出口 IP 不一定变 |
| Airport Chain / 机场链 | AI / 流媒体需要外购落地、家宽、低风控节点 | 指定域名出口会变 |

## 开源安全原则

脚本可以提供规则模板和说明，但不应该内置：

```text
机场订阅 URL
机场 Token
节点 password
个人私有域名
```

使用者应该自己在 FLClash / Mihomo / Surge 中导入机场订阅，再把 AI / 流媒体规则指向自己的策略组。

---

# 五、检查、导出与下载配置

常用菜单：

```text
8) Status / 状态检查
9) Output / 查看节点输出
10) Export / 导出配置包
16) HTTP On / 开启 HTTP 下载
17) HTTP Off / 停止 HTTP 下载
```

---

# 六、备份、回滚与故障处理

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

# 七、完整菜单界面预览

v1.2.2 保留原有分区式菜单流程，并在 RELAY 分区明确服务端 AI 分流，在 TUNE 分区扩展媒体 DNS 解锁。

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
机场订阅 URL / Token
```

所有 README 示意图均为脱敏示意图，不包含真实 IP、password、pinnedPeerCertSha256 或机场订阅信息。

---

## License

MIT License
