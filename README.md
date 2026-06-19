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

## 快速使用

一键下载并运行：

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

---

## 项目简介

**LazyVPS Quick Menu Pack** 是一个面向 VPS 新手与进阶用户的交互式快速菜单包。

它把常见 VPS 操作整理成菜单形式，适合快速完成系统初始化、协议部署、配置导出、备份回滚、下载合并、AI 分流、中转规则与网络调优诊断。

---

## 功能亮点

| 功能区 | 说明 |
|---|---|
| BASIC 基础环境 | 系统初始化、BBR、防火墙后端、Xray Core |
| PROTOCOL 协议部署 | Trojan 443、Reality 443、Hysteria2 8443 |
| CHECK 检查导出 | 状态检查、节点输出、配置导出 |
| BACKUP 备份服务 | 当前配置备份、Xray / Hysteria2 回滚、停止服务 |
| DOWNLOAD 下载合并 | HTTP 下载、NodeQuality、配置合并 |
| RELAY 分流中转 | 客户端规则、服务端 AI 分流、端口中转 |
| TUNE 调优诊断 | BBRv3、DNS 解锁、TCP 调优、诊断修复 |

---

# v1.2 更新重点：服务端 AI 分流

v1.2 的重点是把 **端口中转** 和 **服务端 AI 域名分流** 拆开。

## 适用场景

```text
香港 VPS 速度很好，但香港出口不能直接使用 GPT / Claude。
希望：
普通网站       → 继续走香港出口
GPT / OpenAI  → 由香港服务端自动转交日本 / 台湾落地节点
```

## 正确逻辑图

<p align="center">
  <img src="./docs/images/server-ai-routing-flow.png" width="860">
</p>

### 角色定义

| 名称 | 含义 | 检测时可能看到 |
|---|---|---|
| 入口 IP | 用户客户端实际连接的 VPS，例如香港节点 | FLClash / Surge 节点 IP |
| 普通出口 IP | 普通网站、ipinfo、部分测速看到的出口 | 通常仍是香港 |
| AI 分流出口 IP | GPT / OpenAI / Claude / Gemini 被转交的出口 | 应显示日本 / 台湾 |
| 落地节点 | 被入口 VPS 调用的日本 / 台湾 Trojan outbound | 不需要出现在客户端配置里 |

> 服务端 AI 分流成功后，`ipinfo.io` 仍显示香港是正常的。  
> 判断是否成功，请看 AI 检测网站里的 **AI 出口 IP**。

---

## v1.2 菜单说明

| 菜单 | 功能 | 使用场景 |
|---|---|---|
| `21) Client AI Rules` | 客户端 AI 规则模板 | 只改客户端规则 |
| `22) Server AI Routing` | 服务端 AI 分流 | 香港节点要 GPT，AI 域名走日本/台湾出口 |
| `23) AI Route Show` | 查看服务端 AI 分流 | 确认 sniffing、outbound、routing 是否写入 |
| `24) AI Route Rollback` | 回滚服务端 AI 分流 | 写错或失效时恢复备份 |
| `25) Relay Forward` | 端口中转规则 | 整个入口端口转发到后端 |
| `26) Relay Client` | 端口中转客户端 | 生成中转客户端配置 |
| `27) Relay Show` | 查看端口中转 | 检查中转规则 |
| `28) Relay Clear` | 清空端口中转 | 清理中转规则 |

---

## 服务端 AI 分流操作步骤

### 第 1 步：脚本放在“入口 VPS”上执行

如果你要让香港节点可以用 GPT，就把 v1.2 脚本放到 **香港 VPS** 上执行，不是在日本 VPS 上执行。

```bash
chmod +x /root/lazy-vps-menu.sh
bash /root/lazy-vps-menu.sh
```

### 第 2 步：进入菜单 22

```text
22) Server AI Routing / 服务端AI分流
```

### 第 3 步：按提示填写 AI 落地节点

<p align="center">
  <img src="./docs/images/ai-route-input-guide.png" width="860">
</p>

### 第 4 步：确认写入并重启 Xray

脚本会自动执行：

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

---

## 如何确认写入成功

菜单选择：

```text
23) AI Route Show / 查看服务端AI分流
```

或执行：

```bash
bash /root/lazy-vps-menu.sh --quick ai-route-show
```

<p align="center">
  <img src="./docs/images/ai-route-show-guide.png" width="860">
</p>

---

## AI IP 检测

连上入口节点后，打开：

```text
https://ip.net.coffee/claude/
```

<p align="center">
  <img src="./docs/images/ai-ip-check-guide.png" width="860">
</p>

正常现象：

```text
中国出口 / 普通出口：香港
Claude / GPT AI 出口：日本 / 台湾落地
Claude / GPT 支持地区：正常
```

---

## 常见误区

### 误区 1：用端口中转解决 GPT

错误理解：

```text
香港端口 → 日本 IP
```

这个是端口中转，不适合“普通网站走香港、AI 域名走日本”的场景。

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

# 原菜单流程保留

下面是原有分区式菜单截图，v1.2 仍保留这些流程，只是在 RELAY 分区中新增并明确了服务端 AI 分流。

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

## 发生异常怎么办

### 配置测试失败

脚本会自动回滚备份，不会直接把原服务写坏。

### 查看 Xray 状态

```bash
systemctl status xray --no-pager
```

### 查看 Xray 日志

```bash
journalctl -u xray -n 80 --no-pager
```

### 回滚服务端 AI 分流

菜单选择：

```text
24) AI Route Rollback / 回滚服务端AI分流
```

或执行：

```bash
bash /root/lazy-vps-menu.sh --quick ai-route-rollback
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
