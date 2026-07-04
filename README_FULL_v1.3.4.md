# LazyVPS Quick Menu Pack / 懒人建 VPS 快速菜单包

> 少折腾、快部署、可回滚、可分享。  
> 适合新手快速建 VPS，也适合反复测试节点、导出 FLClash / Surge / Shadowrocket 配置，做 AI / 媒体 / IPv6 / 双栈 / 协议兼容性排查。

![LazyVPS 主菜单](menu-basic.png)

![Version](https://img.shields.io/badge/LazyVPS-v1.3.4-blue)
![Shell](https://img.shields.io/badge/Shell-Bash-green)
![Xray](https://img.shields.io/badge/Core-Xray-orange)
![sing-box](https://img.shields.io/badge/Core-sing--box-purple)
![IPv6](https://img.shields.io/badge/IPv6-Reality%20443-cyan)
![Protocol](https://img.shields.io/badge/Protocol-Trojan%20%7C%20VLESS%20%7C%20Hysteria2%20%7C%20AnyTLS%20%7C%20TUIC-lightgrey)

---

## 目录 / 快速跳转

- [一键快速运行](#一键快速运行)
- [你想做什么？先看这里](#你想做什么先看这里)
- [推荐执行顺序](#推荐执行顺序)
- [新 VPS 快速建站流程](#一新-vps-快速建站流程)
- [协议部署：Trojan / VLESS / Hysteria2 / AnyTLS / TUIC](#二协议部署trojan--vless--hysteria2--anytls--tuic)
- [IPv6 Reality 443 推荐方案](#三ipv6-reality-443-推荐方案)
- [V4/V6 独立端口与双栈策略](#四v4v6-独立端口与双栈策略)
- [香港入口 + AI 小鸡服务端分流](#五香港入口--ai-小鸡服务端分流)
- [媒体 DNS 解锁辅助](#六媒体-dns-解锁辅助)
- [导出 / 下载 / 导入](#七导出--下载--导入)
- [互动功能面板总览](#八互动功能面板总览)
- [快捷命令总表](#九快捷命令总表)
- [开源文件结构](#十开源文件结构)
- [安全提醒](#十一安全提醒)
- [更新记录](#十二更新记录)

---

## 一键快速运行

### 方式一：下载后运行，适合开源审查

**VPS / Linux 执行：**

```bash
apt update && apt install -y curl wget
wget -O lazy-vps-menu.sh https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash lazy-vps-menu.sh
```

### 方式二：一行命令直接进入互动界面

**VPS / Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh)
```

### 方式三：强制刷新下载，避免 VPS 端残留旧版本

当 VPS 上看到的仍是旧版，例如 `v1.2.x`，请直接删除本地旧脚本并重新拉取。

**VPS / Linux 执行：**

```bash
rm -f lazy-vps-menu.sh /root/lazy-vps-menu.sh
curl -L -H "Cache-Control: no-cache" "https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh?v=$(date +%s)" -o lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash lazy-vps-menu.sh
```

### 预览主菜单界面

**VPS / Linux 执行：**

```bash
bash lazy-vps-menu.sh --preview
```

### 快速进入新增协议

**VPS / Linux 执行：**

```bash
bash lazy-vps-menu.sh --quick protocol-suite
bash lazy-vps-menu.sh --quick anytls
bash lazy-vps-menu.sh --quick tuic
bash lazy-vps-menu.sh --quick anytls-tuic
```

---

## 你想做什么？先看这里

| 需求 | 推荐入口 | 适合场景 |
|---|---|---|
| 新 VPS 快速建站 | `1 → 2 → 3 → 4 → 5/6/7 → 10 → 16` | 刚买 VPS，想快速部署协议并导入 FLClash / Surge |
| 稳定常用节点 | `5 Trojan 443` 或 `6 VLESS Reality` | 长时间办公、网页、AI、通用代理 |
| 高速 UDP 测试 | `7 Protocol Suite → TUIC` | 手机网络、游戏、视频、UDP 路径测试 |
| AnyTLS 新协议测试 | `7 Protocol Suite → AnyTLS` | TCP/TLS 稳定线、对比 Trojan/VLESS 体感 |
| Hysteria2 高延迟加速 | `7 Protocol Suite → Hysteria2` | 高延迟、移动网络、UDP 路由较好的线路 |
| IPv6 静态公网加速 | `35 → 7 → 10` | IPv6 原生公网、纯净度好、速度高，推荐 Reality 443 |
| 指定 V4 / 指定 V6 | `35 → 7 → 12 → 13` | 同一台 VPS 同时保留 IPv6 主力与 IPv4 备用 |
| 双栈自动切换 | `35 → 7 → 13` | 生成 `V4V6_SPLIT`，Auto 优先 V6，失败切 V4 |
| AI / GPT 香港入口失败 | `22 Server AI Routing` | 香港速度好，但 AI 出口要转日本 / 台湾落地 |
| 流媒体 DNS 辅助 | `30 DNS Unlock` | 改善媒体 CDN / DNS 解析，不替代干净落地 IP |
| 导出给电脑 / 手机 | `10 Export → 16 HTTP On` | 生成配置后浏览器/手机直接下载导入 |
| 配置坏了回滚 | `11 Backup / 12 Rollback Xray` | 改错配置、Xray 起不来、想恢复上一版 |
| 只想看状态 | `8 Status` | 检查 Xray / sing-box / 防火墙 / 端口 |

---

## 推荐执行顺序

### 常规新机

```text
1) System Init
2) Stable BBR
3) Firewall Backend
4) Xray Core
5) Trojan 443 或 6) VLESS Reality 或 7) Protocol Suite
8) Status
10) Export
16) HTTP On
```

### IPv6 主力 + IPv4 备用

```text
35) Stability Suite
  7) IPv6 Mode
    10) IPv6 Reality 443 Clean
    12) IPv4 Fallback Port
    13) V4/V6 Split Export
16) HTTP On
```

对应 quick 命令：

**VPS / Linux 执行：**

```bash
bash /root/lazy-vps-menu.sh --quick ipv6-r443
bash /root/lazy-vps-menu.sh --quick v4-fallback
bash /root/lazy-vps-menu.sh --quick v4v6-split
bash /root/lazy-vps-menu.sh --quick http
```

### AnyTLS / TUIC 新协议测试

```text
1) System Init
2) Stable BBR
3) Firewall Backend
7) Protocol Suite
  2) AnyTLS TCP/TLS
  3) TUIC v5 UDP/QUIC
8) Status
10) Export
16) HTTP On
```

对应 quick 命令：

**VPS / Linux 执行：**

```bash
bash /root/lazy-vps-menu.sh --quick anytls
bash /root/lazy-vps-menu.sh --quick tuic
bash /root/lazy-vps-menu.sh --quick anytls-tuic
```

---

# 一、新 VPS 快速建站流程

![新 VPS 快速建站流程](menu-basic.png)

| 顺序 | 菜单 | 用途 |
|---|---|---|
| 1 | `1) System Init` | 安装基础依赖、确认系统环境、准备脚本运行条件 |
| 2 | `2) Stable BBR` | 开启 BBR + fq，优化 TCP 拥塞控制 |
| 3 | `3) Firewall Backend` | 自动选择 UFW / NFT / IPTABLES / NONE |
| 4 | `4) Xray Core` | 安装 / 更新 Xray-core |
| 5 | `5) Trojan 443` | 部署 Trojan TLS，稳定常用节点 |
| 6 | `6) VLESS Reality` | 部署 VLESS Reality Vision，适合自建与抗干扰 |
| 7 | `7) Protocol Suite` | Hysteria2 / AnyTLS / TUIC 协议合集 |
| 8 | `8) Status` | 检查服务、端口、防火墙与配置文件 |
| 9 | `10) Export` | 导出 FLClash / Surge / sing-box / Shadowrocket 配置 |
| 10 | `16) HTTP On` | 开启临时 HTTP 下载，电脑/手机扫码或浏览器导入 |

---

# 二、协议部署：Trojan / VLESS / Hysteria2 / AnyTLS / TUIC

![协议部署菜单](menu-protocol.png)

LazyVPS 的协议部署区用于快速建立可用节点。v1.3.4 保留原有 Trojan / VLESS Reality / Hysteria2，同时新增 AnyTLS 与 TUIC。

## 协议选择建议

| 协议 | 底层特征 | 优点 | 注意事项 |
|---|---|---|---|
| Trojan 443 | TCP + TLS | 稳定、兼容性高、适合作主力 | 速度取决于 TCP 路由质量 |
| VLESS Reality | TCP + Reality | 伪装强、部署常见、适合自建 VPS | 客户端参数要完整匹配 |
| Hysteria2 | UDP / QUIC 风格 | 高延迟线路拉速能力强 | UDP 被限速时会不稳 |
| AnyTLS | TCP + TLS | 新增稳定线，可对比 Trojan/VLESS | 不等于 AI 解锁，仍看出口 IP |
| TUIC v5 | UDP + QUIC | 低延迟、UDP 友好、适合测速/手机/游戏 | 很吃 UDP 质量，部分网络会限速 |

## 第 7 项 Protocol Suite 子菜单

```text
7) Protocol Suite / Hysteria2 + AnyTLS + TUIC

1) Hysteria2 8443 / 原 H 协议部署
2) AnyTLS TCP/TLS / 新增稳定线
3) TUIC v5 UDP/QUIC / 新增高速测试线
4) AnyTLS + TUIC 双协议同机部署
0) 返回
```

## AnyTLS 快速建立

**VPS / Linux 执行：**

```bash
bash lazy-vps-menu.sh --quick anytls
```

适合：稳定办公、网页、常规代理、与 Trojan/VLESS 做同机对比。

## TUIC 快速建立

**VPS / Linux 执行：**

```bash
bash lazy-vps-menu.sh --quick tuic
```

适合：UDP 线路测试、手机网络、游戏、语音、视频、低延迟体感对比。

## AnyTLS + TUIC 双协议同机部署

**VPS / Linux 执行：**

```bash
bash lazy-vps-menu.sh --quick anytls-tuic
```

建议：一台 VPS 同时建 AnyTLS 与 TUIC，前者看稳定性，后者看 UDP 速度与体感。

---

# 三、IPv6 Reality 443 推荐方案

![IPv6 Reality 443](menu-tune.png)

实测逻辑：

| 方案 | 结果 | 建议 |
|---|---|---|
| Trojan IPv6 443 / 2443 | 部分 FLClash / Mihomo 环境可能 Timeout | 不作为主线 |
| VLESS Reality IPv6 2444 | 可部署，但非 443 有额外风险提示 | 仅排查 |
| VLESS Reality IPv6 443 + hosts 固定解析 | 实测可通，卡片显示 `Vless` | 推荐主线 |

推荐路径：

```text
35) Stability Suite / 稳定增强工具箱
7) IPv6 Mode / IPv6 模式管理
10) IPv6 Reality 443 Clean / 推荐：纯 IPv6 VLESS Reality 443
```

快捷命令：

**VPS / Linux 执行：**

```bash
bash /root/lazy-vps-menu.sh --quick ipv6-r443
```

填写建议：

```text
IPv6 地址：直接 Enter 使用自动检测值
AAAA 域名：填写自己的域名，例如 v6-r443.example.com
Reality serverName：默认 www.cloudflare.com
节点名称：默认即可
```

LazyVPS 会在导出的 FLClash 配置中写入：

```yaml
hosts:
  v6-r443.example.com: YOUR_IPV6
```

这样即使公共 DNS 暂时查不到 AAAA，FLClash 也可以直接把域名固定到你的 IPv6。

---

# 四、V4/V6 独立端口与双栈策略

![V4/V6 Split](menu-download.png)

核心逻辑：

```text
IPv6 主力：VLESS Reality 443
IPv4 备用：VLESS Reality 8443 / 自定义端口
DualStack Auto：优先 IPv6，失败后切 IPv4
```

推荐菜单：

```text
35) Stability Suite
7) IPv6 Mode
12) IPv4 Fallback Port / IPv4 备用端口部署
13) V4/V6 Split Export / V4V6 独立端口导出
14) DualStack Strategy / 双栈策略组说明
```

推荐生成文件：

| 文件 | 用途 |
|---|---|
| `01_IMPORT_FLCLASH_IPV6_REALITY_PORT443.yaml` | IPv6 主力，VLESS Reality 443 |
| `01_IMPORT_FLCLASH_IPV4_REALITY_PORT8443.yaml` | IPv4 备用，VLESS Reality 8443 |
| `01_IMPORT_FLCLASH_V4V6_SPLIT.yaml` | 同时含 V4 / V6 / Auto 策略组 |
| `01_IMPORT_FLCLASH_DUALSTACK_AUTO.yaml` | DualStack Auto 别名 |

导入后可以手动指定：

```text
IPv6 主力   → 强制走 IPv6 Reality 443
IPv4 备用   → 强制走 IPv4 Reality 8443
Auto        → 优先 V6，失败切 V4
```

---

# 五、香港入口 + AI 小鸡服务端分流

![AI Routing](menu-relay.png)

典型用途：香港入口速度很好，但香港出口无法稳定使用 ChatGPT / Claude / Gemini；此时让普通网站仍走香港，AI 域名转发到日本 / 台湾落地。

推荐入口：

```text
22) Server AI Routing / 服务端 AI 分流
23) AI Route Show / 查看服务端 AI 分流
24) AI Route Rollback / 回滚服务端 AI 分流
```

建议检测：

```text
https://ip.net.coffee/claude/
https://chat.openai.com/cdn-cgi/trace
```

注意：协议本身不保证 AI 解锁。AI 能否稳定使用，主要看出口 IP 纯净度、ASN、DNS 与服务端 routing。

---

# 六、媒体 DNS 解锁辅助

媒体 DNS 功能用于接入 Zouter Media DNS、自定义 Media DNS 或 Alice DNS Unlock。它可以改善 Netflix / Disney+ / YouTube / TikTok 等平台的 CDN / DNS 解析，但不等于换干净落地 IP。

推荐入口：

```text
30) DNS Unlock / 媒体 DNS 解锁辅助
```

适合：

```text
Netflix / Disney+ / YouTube / TikTok / Spotify / Prime Video
```

不适合：

```text
把被风控的出口 IP 变干净
绕过所有 AI 平台限制
替代日本 / 台湾 / 新加坡等干净落地 VPS
```

---

# 七、导出 / 下载 / 导入

![下载导入](menu-download.png)

常规流程：

```text
10) Export / 导出客户端配置
16) HTTP On / 开启临时下载
```

手机或电脑浏览器打开脚本提示的下载地址，即可导入：

| 客户端 | 推荐文件 |
|---|---|
| FLClash / Mihomo | `01_IMPORT_FLCLASH*.yaml` |
| Surge | `surge*.conf` 或脚本提示的 Surge 文件 |
| Shadowrocket | 节点链接 / 订阅链接 / YAML 转换后导入 |
| sing-box | `sing-box*.json` |

HTTP 下载建议：

```text
只在需要导入时临时开启
下载完成后关闭
不要把含真实密码的 outputs 文件夹上传到公开仓库
```

---

# 八、互动功能面板总览

LazyVPS 采用分区式互动菜单，可用方向键选择，也可以输入编号直接执行。

```text
操作：↑↓ 选择功能   ←→ 切换分区   Enter 执行   1-37 直达   Q 退出

[1 BASIC]  [2 PROTOCOL]  [3 CHECK]  [4 BACKUP]
[5 DOWNLOAD]  [6 RELAY]  [7 TUNE]  [8 EXIT]
```

## 1 BASIC / 基础建机

| 常用编号 | 功能 | 说明 |
|---|---|---|
| 01 | System Init | 安装依赖、校验系统、准备环境 |
| 02 | Stable BBR | 启用 BBR + fq，改善 TCP 体感 |
| 03 | Firewall Backend | 防火墙后端选择与端口放行 |
| 04 | Xray Core | 安装 / 更新 Xray-core |

## 2 PROTOCOL / 协议部署

| 常用编号 | 功能 | 说明 |
|---|---|---|
| 05 | Trojan 443 | 部署 T 协议，稳定常用节点 |
| 06 | VLESS Reality Vision | 部署 VLESS-R，含 flow/public-key/short-id/client-fingerprint |
| 07 | Protocol Suite | Hysteria2 + AnyTLS + TUIC 协议合集 |

## 3 CHECK / 检测诊断

| 功能 | 说明 |
|---|---|
| Status | 检查服务运行、端口监听、防火墙放行 |
| Xray Check | 检查 Xray 配置与日志 |
| sing-box Check | 检查 AnyTLS / TUIC 相关服务 |
| Network Check | 基础网络、IPv4/IPv6、DNS、连通性检查 |

## 4 BACKUP / 备份回滚

| 功能 | 说明 |
|---|---|
| Backup | 备份当前配置 |
| Rollback | 回滚上一版配置 |
| View Config | 查看当前服务配置摘要 |

## 5 DOWNLOAD / 导出下载

| 功能 | 说明 |
|---|---|
| Export | 导出 FLClash / Surge / sing-box 等配置 |
| HTTP On | 开启临时下载服务 |
| HTTP Off | 关闭临时下载服务 |
| Link Show | 显示当前下载链接 |

## 6 RELAY / 中继与 AI 分流

| 功能 | 说明 |
|---|---|
| Server AI Routing | 香港入口 + 日本/台湾 AI 出口分流 |
| Route Show | 查看当前分流规则 |
| Route Rollback | 回滚服务端分流 |
| Chain / Relay | 入口/出口链路测试与中继方案预留 |

## 7 TUNE / 稳定增强

| 功能 | 说明 |
|---|---|
| IPv6 Mode | IPv6 Reality 443 / IPv4 Fallback / V4V6 Split |
| DNS Unlock | 媒体 DNS 解锁辅助 |
| Stability Suite | 稳定性工具箱、双栈策略、端口修复 |
| Quick Fix | 常见端口、防火墙、HTTP 下载异常修复 |

## 8 EXIT / 退出

| 功能 | 说明 |
|---|---|
| Exit | 退出 LazyVPS 菜单 |

---

# 九、快捷命令总表

## 原主功能快捷命令

**VPS / Linux 执行：**

```bash
bash /root/lazy-vps-menu.sh --quick http
bash /root/lazy-vps-menu.sh --quick export
bash /root/lazy-vps-menu.sh --quick status
bash /root/lazy-vps-menu.sh --quick ipv6-r443
bash /root/lazy-vps-menu.sh --quick v4-fallback
bash /root/lazy-vps-menu.sh --quick v4v6-split
```

## v1.3.4 新增协议快捷命令

**VPS / Linux 执行：**

```bash
bash /root/lazy-vps-menu.sh --quick protocol-suite
bash /root/lazy-vps-menu.sh --quick anytls
bash /root/lazy-vps-menu.sh --quick tuic
bash /root/lazy-vps-menu.sh --quick anytls-tuic
```

## 版本确认

**VPS / Linux 执行：**

```bash
grep -nE 'v1.3|AnyTLS|TUIC|Protocol Suite' /root/lazy-vps-menu.sh | head -40
```

---

# 十、开源文件结构

```text
VPS-/
├── lazy-vps-menu.sh                     # 主互动菜单入口，一键命令下载的就是它
├── lazy-vps-protocol-addon.sh           # AnyTLS / TUIC / Hysteria2 扩展入口
├── protocols/
│   ├── install-anytls.sh                # AnyTLS 快速部署
│   ├── install-tuic.sh                  # TUIC v5 快速部署
│   └── status.sh                        # 新协议状态检查
├── templates/
│   ├── mihomo-anytls.yaml               # FLClash / Mihomo AnyTLS 模板
│   ├── mihomo-tuic.yaml                 # FLClash / Mihomo TUIC 模板
│   ├── sing-box-anytls.json             # sing-box AnyTLS 模板
│   └── sing-box-tuic.json               # sing-box TUIC 模板
├── docs/
│   ├── TUIC_ANYTLS_GUIDE.md             # 新协议说明
│   ├── PATCH_FOR_MAIN_MENU.md           # 主菜单接入说明
│   └── PUBLISH_COMMANDS.md              # GitHub 发布命令
├── QUICK_START.md                       # 一键命令简表
├── CHANGELOG.md                         # 更新记录
├── SECURITY_SHARE_CHECK.txt             # 开源安全检查
└── README.md                            # 项目首页说明
```

---

# 十一、安全提醒

公开 GitHub 仓库不要上传以下内容：

```text
真实 VPS IP / 域名绑定表
真实 UUID / password / private-key / short-id
/root/lazy-vps-exports/ 内生成的真实客户端配置
/opt/lazy-vps-menu/outputs/ 内生成的真实节点文件
SSH 私钥、订阅链接、机场订阅、客户节点清单
```

建议开源只上传：

```text
脚本源码
模板文件
说明文档
脱敏截图
示例配置
```

---

# 十二、更新记录

## v1.3.4

- 恢复 README 首页为完整开源说明，而不是只显示 v1.3.3 修补说明。
- 保留原 LazyVPS 一键快速运行、推荐执行顺序、IPv6 Reality 443、V4/V6 Split、AI 分流、DNS Unlock、导出下载说明。
- 新增 AnyTLS / TUIC 快捷命令与互动菜单说明。
- 新增 Protocol Suite 子菜单说明。
- 强化「旧版本缓存清理」命令，避免 VPS 本地仍跑 v1.2.x。

## v1.3.3

- 修正主菜单接入 AnyTLS / TUIC 的问题。
- 将原第 7 项 Hysteria2 升级为 Protocol Suite。

## v1.2.15

- 完善 IPv6 Reality 443、IPv4 Fallback、V4/V6 Split 导出逻辑。

---

## About

LazyVPS Quick Menu Pack 是一个面向自建 VPS / 代理节点测试 / 协议部署 / 客户端配置导出的快速菜单包。目标是：少折腾、快部署、可回滚、可分享。
