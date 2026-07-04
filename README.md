# LazyVPS Quick Menu Pack / 懒人建 VPS 快速菜单包

懒人建 VPS 快速菜单包，用于 VPS 初装、代理协议部署、节点导出、下载链接生成、AI 分流、DNS 解锁、中转与基础检查。

> v1.3.8 重点：这版是 **GitHub 网页上传直用版**。根目录已经直接放好 `lazy-vps-menu.sh`，不用再执行 patch，也不用进 `DIRECT_REPLACE`。你在 GitHub `Add file → Upload files` 页面，直接把本包「里面的内容」拖进去并 Commit，即可覆盖主入口。

> v1.3.8 修复重点：选择 `08 AnyTLS`、`09 TUIC`、`10 AnyTLS + TUIC` 时，若本地没有 `lazy-vps-protocol-addon.sh`，主脚本会自动从 GitHub 下载并做 `bash -n` 检查；同时已修复 v1.3.6 出现的「警告文字被当作文件路径执行」问题。

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

### 方式二：一行命令直接进入主菜单

**VPS / Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh)
```

### 方式三：强制刷新，避免 VPS 继续跑旧版 v1.2.x

**VPS / Linux 执行：**

```bash
rm -f lazy-vps-menu.sh /root/lazy-vps-menu.sh
curl -L -H "Cache-Control: no-cache" "https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh?v=$(date +%s)" -o lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
grep -nE 'v1.3.8|AnyTLS|TUIC|Protocol Suite' lazy-vps-menu.sh | head -40
bash lazy-vps-menu.sh
```

---

## 新版协议快捷命令

**VPS / Linux 执行：**

```bash
bash lazy-vps-menu.sh --quick protocol-suite
bash lazy-vps-menu.sh --quick anytls
bash lazy-vps-menu.sh --quick tuic
bash lazy-vps-menu.sh --quick anytls-tuic
```

---

## 你想做什么？先看这里

| 需求 | 建议入口 |
|---|---|
| 新 VPS 初装 | 进入主菜单，先做 BASIC / CHECK |
| 部署稳定常用节点 | Trojan 443 / VLESS Reality |
| 部署高速 UDP 节点 | Protocol Suite → TUIC v5 |
| 部署新型 TCP/TLS 稳定线 | Protocol Suite → AnyTLS |
| 同机测试两种新协议 | Protocol Suite → AnyTLS + TUIC |
| 导出 FLClash / mihomo 配置 | DOWNLOAD / Export |
| 开 HTTP 下载链接给手机导入 | DOWNLOAD / HTTP 8088 |
| 香港入口 + 日本/台湾 AI 出口 | AI_SERVICE_ROUTING / AIRPORT_CHAIN |
| 媒体 DNS 解锁 | MEDIA_DNS_UNLOCK |
| IPv6 Reality 443 | IPV6_REALITY_443_GUIDE |
| V4/V6 Split 双栈策略 | V46_SPLIT_GUIDE |

---

## 推荐执行顺序

```text
1. BASIC 基础检查 / 安装依赖 / BBR / 防火墙
2. PROTOCOL 协议部署：Trojan / VLESS / Hysteria2 / AnyTLS / TUIC
3. CHECK 节点连通 / 端口 / 服务状态检查
4. DOWNLOAD 导出配置 / 开 HTTP 下载
5. AI 分流 / DNS Unlock / 中转策略按需配置
```

---

## 主菜单功能面板

```text
[1 BASIC    ]  基础环境、依赖、系统检查、BBR、端口放行
[2 PROTOCOL ]  Trojan / VLESS Reality / Protocol Suite
[3 CHECK    ]  服务状态、端口、日志、节点自检
[4 BACKUP   ]  配置备份、恢复、导出记录
[5 DOWNLOAD ]  mihomo / FLClash / sing-box 配置导出与 HTTP 下载
[6 RELAY    ]  中转、链式入口、远程合并、机场链路
[7 TUNE     ]  AI 分流、媒体 DNS、IPv6、V4/V6 Split、优化工具
[8 EXIT     ]  退出
```

---

## PROTOCOL / 协议部署

```text
05  Trojan 443 / 部署 T 协议
06  VLESS Reality Vision / 部署 VLESS-R 协议
07  Protocol Suite / Hysteria2 + AnyTLS + TUIC
```

进入 `07 Protocol Suite` 后：

```text
1) Hysteria2 8443 / 原 H 协议部署
2) AnyTLS TCP/TLS / 新增稳定线
3) TUIC v5 UDP/QUIC / 新增高速测试线
4) AnyTLS + TUIC 双协议同机部署
0) 返回
```

协议定位：

| 协议 | 定位 | 适合场景 |
|---|---|---|
| Trojan | 稳定、兼容性高 | 长时间工作、普通代理、AI 基础出口 |
| VLESS Reality | 伪装强、部署常见 | 自建 VPS、抗干扰测试 |
| Hysteria2 | UDP 高速 | 高延迟、移动网络、速度测试 |
| AnyTLS | TCP/TLS 新型稳定线 | 工作用稳定节点、三网兼容测试 |
| TUIC v5 | UDP/QUIC 高速低延迟 | 手机、游戏、视频、UDP 环境测试 |

---

## GitHub 网页上传方式

这版可以直接用 GitHub 网页上传，不需要 Git 命令，也不需要 patch。

1. 解压 `LazyVPS-WebUpload-v1.3.8.zip`。
2. 打开里面那层 `LazyVPS-WebUpload-v1.3.8` 文件夹。
3. 重点：不要拖外层压缩包文件夹，要拖「里面的内容」。
4. 在 GitHub 仓库页面点击 `Add file → Upload files`。
5. 把下面这些内容拖进去：

```text
lazy-vps-menu.sh                  # 必须上传：主入口，会覆盖旧版 v1.2.x
lazy-vps-menu-v1.3.8.sh           # 新版主入口备份副本
lazy-vps-protocol-addon.sh        # 必须上传：AnyTLS / TUIC 部署器
protocols/                        # 必须上传：协议快捷脚本
README.md                         # 开源首页说明
QUICK_START.md                    # 一键复制命令
CHANGELOG.md                      # 更新纪录
GITHUB_WEB_UPLOAD_STEPS.md        # 网页上传步骤
FIX_ADDON_NOT_FOUND_v1.3.8.md     # 本次报错修复说明
SECURITY_SHARE_CHECK.txt          # 开源安全提醒
```

6. Commit message 建议写：

```text
fix: replace LazyVPS main entry with v1.3.8 protocol suite
```

7. Commit 后，点开 GitHub 根目录的 `lazy-vps-menu.sh`，确认第一屏有：

```text
Formal Version: v1.3.8
Protocol Suite / AnyTLS + TUIC
```

---

## 文件结构

```text
lazy-vps-menu.sh                  # GitHub raw 一键运行主入口，必须是 v1.3.8
lazy-vps-menu-v1.3.8.sh           # 新主入口备份副本
lazy-vps-protocol-addon.sh        # AnyTLS / TUIC / Hysteria2 扩展部署器
protocols/                        # 协议快捷入口
README.md                         # 开源首页说明
QUICK_START.md                    # 一键复制命令
GITHUB_WEB_UPLOAD_STEPS.md        # 网页上传步骤
FIX_ADDON_NOT_FOUND_v1.3.8.md     # addon not found 修复说明
CHANGELOG.md                      # 更新纪录
```

---

## 安全说明

本仓库不应内置任何个人 IP、域名、密码、订阅链接、SSH Key 或真实节点配置。脚本运行后生成的配置位于 VPS 本机 `/opt/lazy-vps-menu/outputs/`，这些运行产物不要上传公开仓库。
