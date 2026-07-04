# LazyVPS Quick Menu Pack / 懒人建 VPS 快速菜单包

懒人建 VPS 快速菜单包，用于 VPS 初装、代理协议部署、节点导出、下载链接生成、AI 分流、DNS 解锁、中转与基础检查。

> v1.3.6 修正重点：这次不是只放 addon，也不是只改 README，而是让 GitHub 根目录的 `lazy-vps-menu.sh` 主入口直接升级。第 7 项会显示 `Protocol Suite / Hysteria2 + AnyTLS + TUIC`。

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
grep -nE 'v1.3.6|AnyTLS|TUIC|Protocol Suite' lazy-vps-menu.sh | head -40
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

## GitHub 开源升级方式

这次一定要让根目录 `lazy-vps-menu.sh` 本身变成 v1.3.6，不能只上传 README 或 addon。

**Windows CMD / Git Bash 执行：**

```bash
cd /d 你的\VPS-\仓库目录
bash patch-replace-main-v1.3.6.sh
```

确认：

**Windows CMD / Git Bash 执行：**

```bash
grep -nE 'v1.3.6|AnyTLS|TUIC|Protocol Suite' lazy-vps-menu.sh | head -40
git status --short
```

必须看到：

```text
M lazy-vps-menu.sh
```

然后提交：

**Windows CMD / Git Bash 执行：**

```bash
git add lazy-vps-menu.sh lazy-vps-menu-legacy-v1.2.15.sh legacy/lazy-vps-menu-legacy-v1.2.15.sh lazy-vps-protocol-addon.sh protocols templates docs README.md QUICK_START.md CHANGELOG.md FIX_NOW.md GITHUB_UPLOAD_LIST.md SECURITY_SHARE_CHECK.txt
git commit -m "fix: replace LazyVPS main entry with v1.3.6 protocol suite"
git push
```

---

## 为什么要保留 legacy 旧主脚本？

原本 `lazy-vps-menu.sh` 已经包含很多已验证功能。v1.3.6 采用「新主入口 + legacy 保留旧功能」方式：

- 新主入口负责显示新版菜单、AnyTLS、TUIC、Protocol Suite。
- 原 v1.2.x 主脚本备份为 `lazy-vps-menu-legacy-v1.2.15.sh`。
- 旧功能不会删除，新菜单需要时会转入 legacy 执行。

这样不会破坏原来的 Trojan、VLESS、导出、HTTP 下载、AI 分流、DNS Unlock 等已验证功能。

---

## 文件结构

```text
lazy-vps-menu.sh                    # GitHub raw 一键运行主入口，必须是 v1.3.6
lazy-vps-menu-v1.3.6.sh             # 新主入口原始副本
lazy-vps-menu-legacy-v1.2.15.sh     # patch 时自动备份出来的旧主脚本
legacy/                             # 旧主脚本备份目录
lazy-vps-protocol-addon.sh          # AnyTLS / TUIC / Hysteria2 扩展部署器
protocols/                          # 协议快捷入口
DIRECT_REPLACE/lazy-vps-menu.sh     # 手动直接替换用主脚本
README.md                           # 开源首页说明
QUICK_START.md                      # 一键复制命令
FIX_NOW.md                          # 修复步骤
GITHUB_UPLOAD_LIST.md               # 上传清单
```

---

## 安全说明

本仓库不应内置任何个人 IP、域名、密码、订阅链接、SSH Key 或真实节点配置。脚本运行后生成的配置位于 VPS 本机 `/opt/lazy-vps-menu/outputs/`，这些运行产物不要上传公开仓库。
