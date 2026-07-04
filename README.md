# LazyVPS Quick Menu Pack / 懒人建 VPS 快速菜单包

> 少折腾、快部署、可回滚、可分享。适合新手快速建 VPS，也适合反复测试节点、导出 FLClash / Surge 配置、做 AI / 媒体 / IPv6 / 双栈排查。

![LazyVPS 主菜单](docs/images/01-main-menu.png)

![Version](https://img.shields.io/badge/LazyVPS-v1.3.1-orange)
![Shell](https://img.shields.io/badge/Shell-Bash-green)
![Xray](https://img.shields.io/badge/Core-Xray-blue)
![sing-box](https://img.shields.io/badge/Core-sing--box-purple)
![IPv6](https://img.shields.io/badge/IPv6-Reality%20443-success)
![V4V6](https://img.shields.io/badge/V4%2FV6-Split%20Export-informational)
![Client](https://img.shields.io/badge/Client-FLClash%20%7C%20Surge%20%7C%20sing--box-lightgrey)

**正式版：v1.3.1 · 原功能保留 + TUIC v5 / AnyTLS 协议扩展版**  
**更新日期：2026-07-04**

> 本版 README 以原 `lazy-vps-menu.sh v1.2.15` 的公开首页说明为基础继续整理，保留原有「一键快速运行、推荐执行顺序、IPv6 Reality 443、V4/V6 Split、AI 分流、媒体 DNS、导出下载、功能面板」说明，再新增 `lazy-vps-protocol-addon.sh` 协议扩展入口。  
> 原主菜单不被覆盖；AnyTLS / TUIC 采用外挂扩展方式，便于开源审查、回滚与后续合并。

---

## 目录 / 快速跳转

- [一键快速运行](#一键快速运行)
- [一键复制命令区](#一键复制命令区)
- [你想做什么？先看这里](#你想做什么先看这里)
- [推荐执行顺序](#推荐执行顺序)
- [一、原新 VPS 快速建站流程](#一原新-vps-快速建站流程v10-主流程)
- [二、IPv6 Reality 443 推荐方案](#二ipv6-reality-443-推荐方案v1214)
- [三、V4/V6 独立端口与双栈策略](#三v4v6-独立端口与双栈策略v1215)
- [四、香港入口 + AI 小鸡服务端分流](#四香港入口--ai-小鸡服务端分流v12)
- [五、媒体 DNS 解锁辅助](#五媒体-dns-解锁辅助v121--v122)
- [六、AnyTLS / TUIC v5 协议扩展](#六anytls--tuic-v5-协议扩展v131)
- [七、导出 / 下载 / 导入](#七导出--下载--导入)
- [功能面板总览](#功能面板总览)
- [版本功能保留表](#版本功能保留表)
- [开源文件结构](#开源文件结构)
- [安全提醒](#安全提醒)
- [GitHub 上传命令](#github-上传命令)

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

### 方式二：一行命令直接进入原主菜单互动界面

**VPS / Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh)
```

### 预览原主菜单界面

**VPS / Linux 执行：**

```bash
bash lazy-vps-menu.sh --preview
```

### v1.3.1 新增：一行命令进入 AnyTLS / TUIC 扩展菜单

**VPS / Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-protocol-addon.sh)
```

---

## 一键复制命令区

### 原 LazyVPS 主菜单：一键复制运行

**VPS / Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh)
```

### 原 LazyVPS：下载审查后运行

**VPS / Linux 执行：**

```bash
apt update && apt install -y curl wget
wget -O /root/lazy-vps-menu.sh https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh
chmod +x /root/lazy-vps-menu.sh
bash /root/lazy-vps-menu.sh
```

### v1.3.1 协议扩展菜单：一键复制运行

**VPS / Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-protocol-addon.sh)
```

### v1.3.1 协议扩展：下载审查后运行

**VPS / Linux 执行：**

```bash
apt update && apt install -y curl wget
wget -O /root/lazy-vps-protocol-addon.sh https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-protocol-addon.sh
chmod +x /root/lazy-vps-protocol-addon.sh
bash /root/lazy-vps-protocol-addon.sh
```

### 原 IPv6 / V4V6 / HTTP 快捷命令保留

**VPS / Linux 执行：**

```bash
bash /root/lazy-vps-menu.sh --quick ipv6-r443
bash /root/lazy-vps-menu.sh --quick v4-fallback
bash /root/lazy-vps-menu.sh --quick v4v6-split
bash /root/lazy-vps-menu.sh --quick http
```

### 新 AnyTLS / TUIC / HTTP / Status 快捷命令

**VPS / Linux 执行：**

```bash
bash /root/lazy-vps-protocol-addon.sh --quick anytls
bash /root/lazy-vps-protocol-addon.sh --quick tuic
bash /root/lazy-vps-protocol-addon.sh --quick http
bash /root/lazy-vps-protocol-addon.sh --quick status
```

---

## 你想做什么？先看这里

| 需求 | 推荐入口 | 适合场景 |
|---|---|---|
| 新 VPS 快速建站 | `1 → 2 → 3 → 4 → 5/6/7 → 10 → 16` | 刚买 VPS，想快速部署协议并导入 FLClash |
| IPv6 静态公网加速 | `35 → 7 → 10` | IPv6 原生公网、纯净度好、速度高，推荐 Reality 443 |
| 指定 V4 / 指定 V6 | `35 → 7 → 12 → 13` | 同一台 VPS 同时保留 IPv6 主力与 IPv4 备用 |
| 双栈自动切换 | `35 → 7 → 13` | 生成 `V4V6_SPLIT`，Auto 优先 V6，失败切 V4 |
| AI / GPT 香港入口失败 | `35 → 3` 或 `22 Server AI Routing` | 香港速度好，但 AI 出口要转日本 / 台湾落地 |
| 流媒体 DNS 辅助 | `30 DNS Unlock` | 仅用于媒体 CDN / DNS 解析辅助，不替代干净落地 |
| 导出给电脑 / 手机 | `10 Export → 16 HTTP On` | 生成 `01_IMPORT_FLCLASH*.yaml`，浏览器/手机导入 |
| 配置坏了回滚 | `11 Backup / 12 Rollback Xray` | 改错配置、Xray 起不来、想恢复上一版 |
| 新增 AnyTLS 稳定线 | `lazy-vps-protocol-addon.sh → 1` | TCP/TLS 稳定线、长时间工作、与 Trojan 对比 |
| 新增 TUIC v5 高速线 | `lazy-vps-protocol-addon.sh → 2` | UDP/QUIC、低延迟、手机、视频、游戏、测速 |

---

## 推荐执行顺序

![v1.2.15 推荐执行顺序](docs/images/09-v1215-recommended-flow.png)

### 常规新机

```text
1) System Init → 2) Stable BBR → 3) Firewall Backend → 4) Xray Core → 5/6/7 部署协议 → 10 Export → 16 HTTP On
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

```bash
bash /root/lazy-vps-menu.sh --quick ipv6-r443
bash /root/lazy-vps-menu.sh --quick v4-fallback
bash /root/lazy-vps-menu.sh --quick v4v6-split
bash /root/lazy-vps-menu.sh --quick http
```

### v1.3.1 新增协议扩展推荐流程

```text
原主菜单先完成：
1) System Init → 2) Stable BBR → 3) Firewall Backend

然后执行扩展菜单：
1) AnyTLS TCP/TLS 节点
2) TUIC v5 UDP/QUIC 节点
3) HTTP 下载导入文件
4) Status 检查 sing-box / 输出状态
```

对应 quick 命令：

```bash
bash /root/lazy-vps-protocol-addon.sh --quick anytls
bash /root/lazy-vps-protocol-addon.sh --quick tuic
bash /root/lazy-vps-protocol-addon.sh --quick http
bash /root/lazy-vps-protocol-addon.sh --quick status
```

---

# 一、原新 VPS 快速建站流程（v1.0 主流程）

![新 VPS 快速建站流程](docs/images/03-quick-start-flow.png)

| 顺序 | 菜单 | 用途 |
|---:|---|---|
| 1 | `1) System Init` | 安装依赖、确认 SSH、基础环境 |
| 2 | `2) Stable BBR` | 开启 BBR + fq |
| 3 | `3) Firewall Backend` | AUTO / UFW / NFT / IPTABLES / NONE |
| 4 | `4) Xray Core` | 安装 / 更新 Xray-core |
| 5 | `5) Trojan 443` 或 `6) VLESS Reality` | 部署协议 |
| 6 | `8) Status` | 检查 Xray、端口、防火墙 |
| 7 | `10) Export` | 导出 FLClash / Surge 配置 |
| 8 | `16) HTTP On` | 开启临时下载，电脑/手机导入 |

---

# 二、IPv6 Reality 443 推荐方案（v1.2.14）

![IPv6 Reality 443 定版逻辑](docs/images/04-ipv6-reality-443-flow.png)

实测结论：

| 方案 | 结果 | 建议 |
|---|---|---|
| Trojan IPv6 443 / 2443 | 在部分 FLClash / Mihomo 环境持续 Timeout | 不作为主线 |
| VLESS Reality IPv6 2444 | 可部署，但非 443 有额外风险提示 | 仅排查 |
| VLESS Reality IPv6 443 + hosts 固定解析 | 实测可通，卡片显示 `Vless` | 推荐主线 |

推荐路径：

```text
35) Stability Suite / 稳定增强工具箱
7) IPv6 Mode / IPv6 模式管理
10) IPv6 Reality 443 Clean / 推荐：纯 IPv6 VLESS Reality 443
```

快捷命令：

```bash
bash /root/lazy-vps-menu.sh --quick ipv6-r443
```

填写建议：

```text
IPv6 地址：直接 Enter 使用自动检测值
AAAA 域名：填写你自己的域名，例如 v6-r443.example.com
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

# 三、V4/V6 独立端口与双栈策略（v1.2.15）

![V4/V6 独立端口逻辑](docs/images/08-v4v6-split-flow.png)

v1.2.15 新增的核心逻辑：

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

# 四、香港入口 + AI 小鸡服务端分流（v1.2）

![服务端 AI 分流逻辑](docs/images/05-ai-route-flow.png)

典型用途：香港入口速度很好，但香港出口无法稳定使用 ChatGPT / Claude / Gemini；此时让普通网站仍走香港，AI 域名转发到日本 / 台湾落地。

推荐入口：

```text
22) Server AI Routing / 服务端 AI 分流
23) AI Route Show / 查看服务端 AI 分流
24) AI Route Rollback / 回滚服务端 AI 分流
```

配置完成后，建议打开检测网站确认 AI 出口是否变成日本 / 台湾：

```text
https://ip.net.coffee/claude/
```

---

# 五、媒体 DNS 解锁辅助（v1.2.1 / v1.2.2）

![媒体 DNS 解锁辅助](docs/images/06-media-dns-flow.png)

媒体 DNS 功能用于接入 Zouter Media DNS、自定义 Media DNS 或 Alice DNS Unlock。它可以改善 Netflix / Disney+ / YouTube / TikTok 等平台的 CDN / DNS 解析，但不等于换干净落地 IP。

推荐入口：

```text
30) DNS Unlock / 媒体 DNS 解锁与导出同步
```

---

# 六、AnyTLS / TUIC v5 协议扩展（v1.3.1）

v1.3.1 新增一个独立协议扩展入口：

```text
lazy-vps-protocol-addon.sh
```

它不会覆盖原本 `lazy-vps-menu.sh`，而是额外建立 sing-box 服务端配置，并导出 FLClash / mihomo 与 sing-box 客户端配置。

## 6.1 AnyTLS 一键建立

| 项目 | 说明 |
|---|---|
| 协议 | AnyTLS |
| 底层 | TCP / TLS |
| 服务端 | sing-box inbound `anytls` |
| 默认端口 | 8443/TCP |
| 推荐定位 | 稳定线、长时间工作、与 Trojan / AnyTLS 体感对比 |
| 导出文件 | `01_IMPORT_FLCLASH.yaml`、`latest_anytls_mihomo.yaml`、`02_IMPORT_SINGBOX_CLIENT.json` |

**VPS / Linux 执行：**

```bash
bash /root/lazy-vps-protocol-addon.sh --quick anytls
```

## 6.2 TUIC v5 一键建立

| 项目 | 说明 |
|---|---|
| 协议 | TUIC v5 |
| 底层 | UDP / QUIC |
| 服务端 | sing-box inbound `tuic` |
| 默认端口 | 10443/UDP |
| 推荐定位 | 高速测试线、手机、视频、游戏、低延迟、与 Hysteria2 对比 |
| 导出文件 | `01_IMPORT_FLCLASH.yaml`、`latest_tuic_mihomo.yaml`、`02_IMPORT_SINGBOX_CLIENT.json` |

**VPS / Linux 执行：**

```bash
bash /root/lazy-vps-protocol-addon.sh --quick tuic
```

## 6.3 AnyTLS / TUIC 选择建议

| 场景 | 优先建议 |
|---|---|
| 长时间工作、AI、网页、普通办公 | Trojan / AnyTLS / VLESS Reality 优先 |
| 手机网络、视频、游戏、UDP 应用 | TUIC / Hysteria2 可作为测试线 |
| 中国三网环境 UDP 丢包明显 | 不要把 TUIC 当唯一主力 |
| 出口 IP 纯净度不好 | 换出口或做服务端分流，协议本身不能解决 AI 解锁 |

---

# 七、导出 / 下载 / 导入

![导出与导入流程](docs/images/07-export-import-flow.png)

原主菜单推荐顺序：

```text
10) Export / 导出配置包
16) HTTP On / 开启临时 HTTP 下载
```

v1.3.1 扩展菜单推荐顺序：

```text
1) 部署 AnyTLS 或 2) 部署 TUIC
3) 启动 HTTP 下载导入文件
4) 查看 sing-box / 当前配置状态
```

常见下载链接：

```text
http://YOUR_VPS_IPV4:8088/01_IMPORT_FLCLASH.yaml
http://YOUR_VPS_IPV4:8088/01_IMPORT_FLCLASH_IPV6_REALITY_PORT443.yaml
http://YOUR_VPS_IPV4:8088/01_IMPORT_FLCLASH_IPV4_REALITY_PORT8443.yaml
http://YOUR_VPS_IPV4:8088/01_IMPORT_FLCLASH_V4V6_SPLIT.yaml
http://YOUR_VPS_IPV4:8088/02_IMPORT_SURGE.conf
http://YOUR_VPS_IPV4:8088/lazy-vps-output-latest.tar.gz
```

v1.3.1 新增输出链接：

```text
http://YOUR_VPS_IPV4:8088/latest_anytls_mihomo.yaml
http://YOUR_VPS_IPV4:8088/latest_tuic_mihomo.yaml
http://YOUR_VPS_IPV4:8088/02_IMPORT_SINGBOX_CLIENT.json
http://YOUR_VPS_IPV4:8088/00_README_IMPORT.txt
```

FLClash / mihomo 一般只导入：

```text
01_IMPORT_FLCLASH*.yaml
latest_anytls_mihomo.yaml
latest_tuic_mihomo.yaml
```

不要公开上传或误导入：

```text
DO_NOT_IMPORT_fragments
server_config_backup
reports
/opt/lazy-vps-menu/outputs/ 内含真实节点密码的文件
```

---

# 功能面板总览

![IPv6 Mode 面板](docs/images/02-ipv6-menu.png)

| 分区 | 功能 |
|---|---|
| BASIC | 系统初始化、BBR、防火墙、Xray Core |
| PROTOCOL | Trojan / VLESS Reality / Hysteria2 |
| CHECK | 状态检查、查看输出、导出配置 |
| BACKUP | 备份、回滚、停止服务 |
| DOWNLOAD | HTTP 下载、NodeQuality、总配置合并 |
| RELAY | AI 分流、端口中转、机场链规则模板 |
| TUNE | DNS Unlock、诊断、稳定增强、IPv6 Mode |
| PROTOCOL ADDON | AnyTLS / TUIC v5 / sing-box 状态检查 / HTTP 下载 |

---

# 版本功能保留表

| 版本 | 功能重点 | 本版状态 |
|---|---|---|
| v1.0 | 新 VPS 快速建站主流程 | 保留 |
| v1.2 | 香港入口 + AI 小鸡服务端分流 | 保留 |
| v1.2.1 / v1.2.2 | 媒体 DNS 解锁辅助 | 保留 |
| v1.2.14 | IPv6 Reality 443 推荐方案 | 保留 |
| v1.2.15 | V4/V6 独立端口、DualStack Auto、V4V6 Split Export | 保留 |
| v1.3.1 | AnyTLS / TUIC v5 协议扩展、sing-box 客户端导出 | 新增 |

---

# 开源文件结构

```text
lazy-vps-menu.sh                       原主脚本，不覆盖原逻辑
lazy-vps-protocol-addon.sh             v1.3.1 新增协议扩展主菜单
protocols/install-anytls.sh            AnyTLS 快捷入口
protocols/install-tuic.sh              TUIC v5 快捷入口
protocols/status.sh                    sing-box / 输出状态检查入口
templates/                             mihomo / sing-box 客户端模板
README.md                              GitHub 首页说明，保留原功能并新增协议扩展
CHANGELOG.md                           更新记录
QUICK_START.md                         一键复制命令精简版
GITHUB_UPLOAD_LIST.md                   上传文件清单
EXTERNAL_SCRIPT_AUDIT.md               外部脚本审计说明
SECURITY_SHARE_CHECK.txt               开源分享安全检查
docs/PATCH_FOR_MAIN_MENU.md            后续合并进原主菜单的建议
docs/PUBLISH_COMMANDS.md               GitHub 上传命令
docs/TUIC_ANYTLS_GUIDE.md              TUIC / AnyTLS 使用说明
一键同步LazyVPS_v1.3.1到GitHub.cmd     Windows 一键提交辅助脚本
```

原仓库既有文件继续保留：

```text
QUICK_START.md
IPV6_REALITY_443_GUIDE.md
V4V6_SPLIT_GUIDE.md
AI_SERVICE_ROUTING.md
MEDIA_DNS_UNLOCK.md
AIRPORT_CHAIN_UNLOCK.md
TROUBLESHOOTING.md
SCAN_REPORT.txt
docs/images/
```

---

# 安全提醒

- 脚本本身不内置个人 IP、私有域名、节点密码或订阅地址。
- 导出的 `01_IMPORT_FLCLASH*.yaml` 会包含你自己的节点密码 / UUID / Reality public-key，请勿公开发布。
- AnyTLS / TUIC 导出的 `latest_*_mihomo.yaml` 与 `02_IMPORT_SINGBOX_CLIENT.json` 也包含真实节点密码，请勿上传公开仓库。
- `HTTP On` 是临时下载服务，下载完成后建议执行 `17) HTTP Off` 或关闭扩展菜单的 HTTP 服务。
- 第三方脚本如 BBRv3、NetSpeed、DNS Unlock 可能修改内核 / DNS / 网络参数，请先看说明再执行。
- 如果配置改坏，可使用 `11 Backup` 或 `12 Rollback Xray` 回滚；sing-box 配置会备份到 `/opt/lazy-vps-menu/backups/`。

---

# GitHub 上传命令

## Windows CMD 执行：复制本包到仓库后上传

```bat
git clone https://github.com/souldance7-ai/VPS-.git
cd VPS-
```

把本包文件复制覆盖到 `VPS-` 文件夹后：

**Windows CMD 执行：**

```bat
git status
git add .
git commit -m "feat: add TUIC v5 and AnyTLS builders while keeping original README"
git push
```

## VPS / Linux 执行：拉取后测试

```bash
git clone https://github.com/souldance7-ai/VPS-.git
cd VPS-
chmod +x lazy-vps-menu.sh lazy-vps-protocol-addon.sh protocols/*.sh
bash lazy-vps-menu.sh --preview
bash lazy-vps-protocol-addon.sh --quick status
```

---

# 写在最后

v1.2.15 的重点是把 IPv6 实测结论沉淀成稳定流程：**IPv6 Reality 443 做主力，IPv4 独立备用端口，最后用 V4/V6 Split 配置让用户自由指定或自动切换。**

v1.3.1 的重点不是替换原主菜单，而是在保留原功能的基础上新增 **AnyTLS 稳定线** 与 **TUIC v5 高速 UDP/QUIC 测试线**。这样仓库首页仍然是完整的 LazyVPS Quick Menu Pack，而不是只剩协议扩展说明。
