# LazyVPS Quick Menu Pack / 懒人建 VPS 快速菜单包

<p align="center">
  <img src="./menu-basic.png" width="860">
</p>

<p align="center">
  <b>少折腾 · 快部署 · 可回滚 · 可分享 · 支持服务端 AI 分流</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-v1.2-blue">
  <img src="https://img.shields.io/badge/Shell-Bash-green">
  <img src="https://img.shields.io/badge/Xray-26.x-orange">
  <img src="https://img.shields.io/badge/Server_AI_Routing-pinnedPeerCertSha256-brightgreen">
</p>

---

## 你想做什么？先看这里

| 需求 | 直接看哪一段 | 适合场景 |
|---|---|---|
| **新 VPS 快速建站 / 建节点** | [一、新 VPS 快速建站流程](#一新-vps-快速建站流程v10-主流程) | 新买 VPS，要快速部署 Trojan / Reality / Hysteria2，并导出 FLClash / Surge 配置 |
| **香港节点要能用 GPT / Claude** | [二、香港入口节点附挂小鸡使用 AI / GPT](#二香港入口节点附挂小鸡使用-ai--gptv12-更新) | 香港节点速度好，但香港出口不能 GPT，需要把 AI 域名分流到日本 / 台湾落地 |
| **检查服务状态 / 导出配置** | [三、检查、导出与下载配置](#三检查导出与下载配置) | 看 Xray 是否运行、端口是否监听、导出客户端配置 |
| **出问题要回滚** | [四、备份、回滚与故障处理](#四备份回滚与故障处理) | 改坏配置、Xray 启动失败、AI 分流写错 |
| **想看完整菜单截图** | [五、完整菜单界面预览](#五完整菜单界面预览) | 了解 BASIC / PROTOCOL / CHECK / BACKUP / DOWNLOAD / RELAY / TUNE |

---

# 一、新 VPS 快速建站流程（v1.0 主流程）

这一段是最常用的“新机器快速部署流程”。  
适合刚买一台 VPS，想快速完成系统初始化、协议部署、配置导出和客户端下载。

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
| 1 | `1) System Init / 系统初始化` | 安装依赖、基础环境、SSH / 防火墙基础检查 |
| 2 | `2) BBR / 开启 BBR + fq` | 开启常用网络优化 |
| 3 | `3) Firewall Backend / 防火墙后端` | 选择 AUTO / UFW / NFT / IPTABLES / NONE |
| 4 | `4) Xray Core / 安装更新 Xray` | 安装或更新 Xray Core |
| 5 | `5) Trojan 443 / 部署 T 协议` | 新手推荐，兼容性好 |
| 6 | `8) Status / 状态检查` | 确认服务 active、端口监听、防火墙放行 |
| 7 | `10) Export / 导出配置包` | 导出 FLClash / Surge 配置 |
| 8 | `16) HTTP On / 开启 HTTP 下载` | 临时开启网页下载配置 |
| 9 | `17) HTTP Off / 停止 HTTP 下载` | 下载完成后关闭临时服务 |

## 3. 新 VPS 最短流程

如果你只想最快跑通 Trojan 443：

```text
1) System Init
2) BBR
3) Firewall Backend
4) Xray Core
5) Trojan 443
8) Status
10) Export
16) HTTP On
```

## 4. 客户端导入

导出的配置一般在：

```text
/opt/lazy-vps-menu/outputs/
```

常用文件：

| 文件 | 用途 |
|---|---|
| `01_IMPORT_FLCLASH.yaml` | FLClash / Clash 类客户端导入 |
| `02_IMPORT_SURGE.conf` | Surge 导入 |
| `03_DO_NOT_IMPORT_NODE_FRAGMENT.yaml` | 节点片段，不是完整客户端配置 |

> FLClash 只导入 `01_IMPORT_FLCLASH.yaml`。  
> 不要导入 `DO_NOT_IMPORT` 或服务端备份文件。

---

# 二、香港入口节点附挂小鸡使用 AI / GPT（v1.2 更新）

这一段是 v1.2 的重点。  
适合这种场景：

```text
香港 VPS 速度很好，普通网站体验好；
但是香港出口不能直接使用 GPT / Claude；
手上另有日本 / 台湾 VPS 可以解锁 AI；
希望普通网站继续香港出口，AI 域名走日本 / 台湾落地。
```

## 1. 先分清楚 4 个角色

| 名称 | 含义 | 检测时可能看到 |
|---|---|---|
| **入口节点 / 入口 IP** | 客户端实际连接的 VPS，例如香港节点 | FLClash / Surge 节点 IP |
| **普通出口 IP** | 普通网站、ipinfo、普通测速看到的出口 | 通常仍是香港 |
| **AI 分流出口 IP** | GPT / OpenAI / Claude / Gemini 被转交的出口 | 应显示日本 / 台湾 |
| **落地小鸡 / 落地节点** | 被入口 VPS 调用的日本 / 台湾 Trojan outbound | 不需要出现在客户端配置里 |

## 2. 正确逻辑图

<p align="center">
  <img src="./docs/images/server-ai-routing-flow.png" width="860">
</p>

重点：

```text
客户端仍然连接香港入口节点。
普通网站继续走香港本机出口。
只有 ChatGPT / OpenAI / Claude / Gemini 等 AI 域名走日本 / 台湾落地 outbound。
```

这不是端口中转，也不是把整台香港 VPS 全局变成日本。

## 3. 在哪台机器执行？

如果你要让 **香港节点可以用 GPT**，脚本要在 **香港入口 VPS** 上执行：

```text
香港 VPS：执行菜单 22
日本 / 台湾 VPS：只作为 AI 落地 outbound
```

不要跑错到日本 VPS 上。

## 4. 菜单怎么选？

进入脚本后，切到 RELAY 分区，选择：

```text
22) Server AI Routing / 服务端AI分流
```

相关菜单：

| 菜单 | 功能 | 用法 |
|---|---|---|
| `21) Client AI Rules` | 客户端 AI 规则模板 | 只改客户端规则，不改服务端 |
| `22) Server AI Routing` | 服务端 AI 分流 | 香港入口节点要 GPT，用这个 |
| `23) AI Route Show` | 查看服务端 AI 分流 | 确认是否写入成功 |
| `24) AI Route Rollback` | 回滚服务端 AI 分流 | 写错或失败时恢复 |
| `25) Relay Forward` | 端口中转规则 | 整个入口端口转发，不是 AI 域名分流 |

## 5. 菜单 22 填写说明

<p align="center">
  <img src="./docs/images/ai-route-input-guide.png" width="860">
</p>

以日本 Trojan 落地节点为例：

```text
AI 出口 outboundTag：
ai-jp-out

AI 落地节点 IP / 域名：
***.***.***.***

AI 落地 Trojan 端口：
443

AI 落地 Trojan password：
node_**************

AI 落地 Trojan SNI：
www.microsoft.com

pinnedPeerCertSha256：
直接留空，让脚本自动抓取
```

脚本会自动做：

```text
1. 备份当前 Xray 配置
2. 开启 inbound sniffing
3. 新增日本 / 台湾 Trojan outbound
4. 写入 ChatGPT / OpenAI / Claude / Gemini 等 AI 域名路由
5. 自动抓取 pinnedPeerCertSha256
6. 检查 Xray 配置
7. 通过后询问是否重启 Xray
```

如果配置测试失败，会自动回滚。

## 6. 菜单 23 确认写入成功

执行：

```bash
bash /root/lazy-vps-menu.sh --quick ai-route-show
```

或菜单选择：

```text
23) AI Route Show / 查看服务端AI分流
```

应该看到：

<p align="center">
  <img src="./docs/images/ai-route-show-guide.png" width="860">
</p>

重点检查：

```text
sniffing=True
AI outbound 存在
server=***.***.***.***:443
routing rules → AI outbound
```

## 7. 客户端怎么用？

电脑 FLClash / 手机 Surge / Shadowrocket 仍然选择：

```text
香港入口节点
```

不要选日本。  
日本 / 台湾落地是写在香港服务端 Xray outbound 里的，客户端不需要知道。

## 8. 最后用 AI IP 检测网站验证

连上香港入口节点后，打开：

```text
https://ip.net.coffee/claude/
```

<p align="center">
  <img src="./docs/images/ai-ip-check-guide.png" width="860">
</p>

正常结果：

```text
中国出口 / 普通出口：香港
Claude / GPT AI 出口：日本 / 台湾落地
Claude / GPT 支持地区：正常
```

## 9. 常见误区

### 误区 1：用端口中转解决 GPT

错误理解：

```text
香港端口 → 日本 IP
```

这是端口中转，不适合“普通网站走香港、AI 域名走日本”的场景。

正确方式：

```text
Server AI Routing：香港 Xray routing 按域名把 AI 流量转给日本 outbound
```

### 误区 2：用 ipinfo.io 判断是否成功

`ipinfo.io` 检测的是普通出口。  
服务端 AI 分流成功后，普通出口仍可能是香港，这是正常的。

请用 AI IP 检测网站判断 AI 出口。

### 误区 3：Xray 26.x 继续使用 allowInsecure

Xray 26.x 自签证书场景不再建议使用 `allowInsecure`。  
本版本使用 `pinnedPeerCertSha256`，留空时脚本自动抓取落地节点证书 SHA256 指纹。

---

# 三、检查、导出与下载配置

## 1. 检查服务状态

菜单：

```text
8) Status / 状态检查
```

用于确认：

```text
Xray 是否 active running
端口是否监听
防火墙后端是否生效
BBR 是否开启
```

## 2. 查看节点输出

菜单：

```text
9) Output / 查看节点输出
```

用于查看当前节点的 FLClash / Surge 输出片段。

## 3. 导出配置包

菜单：

```text
10) Export / 导出配置包
```

常用导出：

```text
01_IMPORT_FLCLASH.yaml
02_IMPORT_SURGE.conf
```

## 4. 开启临时 HTTP 下载

菜单：

```text
16) HTTP On / 开启 HTTP 下载
```

下载完成后关闭：

```text
17) HTTP Off / 停止 HTTP 下载
```

---

# 四、备份、回滚与故障处理

## 1. 手动备份

菜单：

```text
11) Backup / 备份当前配置
```

## 2. 回滚 Xray

菜单：

```text
12) Rollback Xray / 回滚 Xray
```

## 3. 回滚服务端 AI 分流

菜单：

```text
24) AI Route Rollback / 回滚服务端AI分流
```

或执行：

```bash
bash /root/lazy-vps-menu.sh --quick ai-route-rollback
```

## 4. 查看 Xray 状态

```bash
systemctl status xray --no-pager
```

## 5. 查看 Xray 日志

```bash
journalctl -u xray -n 80 --no-pager
```

---

# 五、完整菜单界面预览

v1.2 保留原有 v1.0 的分区式菜单流程，只是在 RELAY 分区中新增并明确服务端 AI 分流。

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

## 折叠查看完整菜单截图

<details>
<summary>点击展开完整菜单截图</summary>

### BASIC

<img src="./menu-basic.png" width="860">

### PROTOCOL

<img src="./menu-protocol.png" width="860">

### CHECK

<img src="./menu-check.png" width="860">

### BACKUP

<img src="./menu-backup.png" width="860">

### DOWNLOAD

<img src="./menu-download.png" width="860">

### RELAY

<img src="./menu-relay.png" width="860">

### TUNE

<img src="./menu-tune.png" width="860">

</details>

---

## 操作方式

```text
↑ / ↓ 选择功能
← / → 切换分区
Enter 执行
1-32 直达功能
Q 退出
```

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

所有 README 示意图均已脱敏，不包含真实 IP、password、pinnedPeerCertSha256。

---

## License

MIT License
