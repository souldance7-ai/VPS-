# LazyVPS Quick Menu Pack / 懒人建 VPS 快速菜单包

> 少折腾、快部署、可回滚、可分享。适合 Debian/Ubuntu VPS 快速建立 Trojan、VLESS Reality、Hysteria2、AnyTLS、TUIC、AI 分流、DNS Unlock、配置导出与 HTTP 下载。

## 一键快速运行

### 方式一：下载后运行，适合开源审查

**VPS / Linux 执行：**

```bash
apt update && apt install -y curl wget
wget -O lazy-vps-menu.sh https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash lazy-vps-menu.sh
```

### 方式二：一行命令直接进入互动主菜单

**VPS / Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh)
```

### 如果 VPS 上仍显示 v1.2.x，强制刷新旧文件

**VPS / Linux 执行：**

```bash
rm -f lazy-vps-menu.sh
curl -L -H "Cache-Control: no-cache" "https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh?v=$(date +%s)" -o lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
grep -nE 'v1.3.5|AnyTLS|TUIC|protocol_suite' lazy-vps-menu.sh | head -40
bash lazy-vps-menu.sh
```

## 你想做什么？先看这里

| 目标 | 菜单/命令 |
|---|---|
| 初始化新 VPS | `1) BASIC` → System Init |
| 开启稳定 BBR | `2) Stable BBR` |
| 部署 Trojan 443 | `5) Trojan 443` |
| 部署 VLESS Reality | `6) VLESS Reality Vision` |
| 部署 Hysteria2 / AnyTLS / TUIC | `7) Protocol Suite / Hysteria2 + AnyTLS + TUIC` |
| 导出 FLClash / mihomo 配置 | `10) Export` |
| 开启 HTTP 下载导入 | `16) HTTP On` |
| AI / GPT 客户端规则 | `21) Client AI Rules` |
| 服务端 AI 分流 | `22) Server AI Routing` |
| 媒体 DNS Unlock | `30) DNS Unlock` |
| 一键诊断 | `33) Diagnose` |
| IPv6 / 双栈增强 | `35) Stability Suite` / `36) Advanced Suite` |

## 推荐执行顺序

**VPS / Linux 执行：**

```bash
bash lazy-vps-menu.sh --quick init
bash lazy-vps-menu.sh --quick bbr
bash lazy-vps-menu.sh --quick trojan
bash lazy-vps-menu.sh --quick export
bash lazy-vps-menu.sh --quick http
```

需要新增协议时：

**VPS / Linux 执行：**

```bash
bash lazy-vps-menu.sh --quick protocol-suite
bash lazy-vps-menu.sh --quick anytls
bash lazy-vps-menu.sh --quick tuic
bash lazy-vps-menu.sh --quick anytls-tuic
```

## Protocol Suite / 协议部署

v1.3.5 起，第 7 项升级为协议套件：

```text
7) Protocol Suite / Hysteria2 + AnyTLS + TUIC
```

子菜单：

```text
1) Hysteria2 8443 / 原 H 协议部署
2) AnyTLS TCP/TLS / 新增稳定线
3) TUIC v5 UDP/QUIC / 新增高速测试线
4) AnyTLS + TUIC 双协议同机部署
0) 返回
```

| 协议 | 底层 | 定位 |
|---|---|---|
| Trojan | TCP/TLS | 稳定常用主力线 |
| VLESS Reality | TCP/Reality | 自建 VPS 常用伪装线 |
| Hysteria2 | UDP/QUIC | 高延迟/移动网络测速线 |
| AnyTLS | TCP/TLS | 新增稳定 TCP/TLS 线路 |
| TUIC v5 | UDP/QUIC | 新增低延迟高速 UDP 线路 |

## 导出与下载

执行协议建立后，导入文件会输出到：

```bash
/opt/lazy-vps-menu/outputs/
```

开启 HTTP 下载：

**VPS / Linux 执行：**

```bash
bash lazy-vps-menu.sh --quick http
```

然后浏览器访问脚本显示的 `http://服务器IP:8088/` 下载 FLClash / mihomo / sing-box 导入文件。

## 开源安全提醒

仓库不应包含真实 IP、域名、密码、UUID、订阅链接、SSH Key、证书私钥。执行后生成的 `/opt/lazy-vps-menu/outputs/` 与 `/etc/sing-box/` 是服务器本地敏感资料，不要上传到公开仓库。

## 文件结构

```text
lazy-vps-menu.sh                         # 主互动菜单，必须被 v1.3.5 patch 修改
lazy-vps-protocol-addon.sh               # AnyTLS / TUIC 建立器
lazy-vps-mainmenu-hotfix-v1.3.5.sh       # 主菜单热修复脚本
protocols/install-anytls.sh              # AnyTLS 快捷入口
protocols/install-tuic.sh                # TUIC 快捷入口
QUICK_START.md                           # 一键复制命令
CHANGELOG.md                             # 更新记录
FIX_NOW.md                               # 修复说明
templates/                               # 开源模板，不含真实密钥
```
