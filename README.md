# LazyVPS Quick Menu Pack / 懒人建 VPS 快速菜单包

> v1.3.2 · V4/V6 双栈 + AnyTLS/TUIC 主菜单集成版  
> 本项目用于 VPS 初始化、协议部署、配置导出、HTTP 下载、AI 分流、媒体 DNS、节点体检、订阅合并与调优诊断。

---

## 这版修正了什么

上一版 v1.3.1 只是把 `lazy-vps-protocol-addon.sh` 做成外置扩展包，但 README 的一键命令仍然下载 GitHub 根目录的 `lazy-vps-menu.sh`。如果根目录主脚本没有被 patch，用户执行后还是 v1.2.x，所以互动菜单里当然看不到 AnyTLS / TUIC。

**v1.3.2 已改成主菜单接入方案：**

- 原 `lazy-vps-menu.sh` 全部功能保留。
- 原第 7 项 Hysteria2 改成 `Protocol Suite / Hysteria2 + AnyTLS + TUIC`。
- Hysteria2 不删除，进入 Protocol Suite 后仍可部署。
- 新增 AnyTLS 一键建立。
- 新增 TUIC v5 一键建立。
- 新增 AnyTLS + TUIC 双协议同机部署。
- 新增快捷命令：`--quick anytls`、`--quick tuic`、`--quick anytls-tuic`、`--quick protocol-suite`。

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

> 注意：上面两条命令只有在你把 v1.3.2 patch 后的 `lazy-vps-menu.sh` 推送到 GitHub 后，才会显示 AnyTLS/TUIC。只上传 addon 不够。

---

## 快速命令

**VPS / Linux 执行：**

```bash
# 原本主功能
bash lazy-vps-menu.sh --quick init
bash lazy-vps-menu.sh --quick bbr
bash lazy-vps-menu.sh --quick firewall
bash lazy-vps-menu.sh --quick trojan
bash lazy-vps-menu.sh --quick reality
bash lazy-vps-menu.sh --quick hysteria2
bash lazy-vps-menu.sh --quick export
bash lazy-vps-menu.sh --quick http
bash lazy-vps-menu.sh --quick diagnose

# v1.3.2 新增协议
bash lazy-vps-menu.sh --quick protocol-suite
bash lazy-vps-menu.sh --quick anytls
bash lazy-vps-menu.sh --quick tuic
bash lazy-vps-menu.sh --quick anytls-tuic

# 原本进阶功能
bash lazy-vps-menu.sh --quick media-dns
bash lazy-vps-menu.sh --quick dns-show
bash lazy-vps-menu.sh --quick dns-rollback
bash lazy-vps-menu.sh --quick public-ip
bash lazy-vps-menu.sh --quick export-check
bash lazy-vps-menu.sh --quick remote-publish
bash lazy-vps-menu.sh --quick node-test
bash lazy-vps-menu.sh --quick nq-archive
bash lazy-vps-menu.sh --quick airport-chain
bash lazy-vps-menu.sh --quick advanced-export
bash lazy-vps-menu.sh --quick strategy-template
bash lazy-vps-menu.sh --quick node-classify
bash lazy-vps-menu.sh --quick protocol-lint
bash lazy-vps-menu.sh --quick vless-guide
```

---

## 原主菜单功能保留

| 分区 | 功能 |
|---|---|
| BASIC / 基础环境 | System Init、Stable BBR、防火墙后端、Xray Core |
| PROTOCOL / 协议部署 | Trojan 443、VLESS Reality Vision、Protocol Suite |
| CHECK / 检查导出 | Status、Output、Export |
| BACKUP / 备份服务 | Backup、Rollback Xray、Rollback Hysteria2、Stop Xray、Stop Hysteria2 |
| DOWNLOAD / 下载合并 | HTTP On、HTTP Off、NodeQuality、Local Merge、Remote Merge |
| RELAY / 分流中转 | Client AI Rules、Server AI Routing、AI Route Show、AI Route Rollback、Relay Forward、Relay Client、Relay Show、Relay Clear |
| TUNE / 调优诊断 | BBR v3、DNS Unlock、NetSpeed、TCP Tune、Diagnose、Current Trojan、Stability Suite、Advanced Suite |

---

## v1.3.2 新增 Protocol Suite

进入主菜单后选择原协议区第 7 项：

```text
7) Protocol Suite / Hysteria2 + AnyTLS + TUIC
```

进入后会显示：

```text
1) Hysteria2 8443 / 原 H 协议部署
2) AnyTLS TCP/TLS / 新增稳定线
3) TUIC v5 UDP/QUIC / 新增高速测试线
4) AnyTLS + TUIC 双协议同机部署
0) 返回
```

### AnyTLS 定位

AnyTLS 走 TCP/TLS，适合做稳定线、备用线、工作线测试。脚本使用 sing-box 建立服务端，并输出 FLClash/mihomo 与 sing-box 客户端配置。

### TUIC 定位

TUIC v5 走 UDP/QUIC，适合手机、低延迟、视频、游戏、测速场景。中国三网下 UDP 品质波动较大，建议当高速测试线，不建议直接替代 Trojan / AnyTLS 主力稳定线。

---

## 输出文件

协议部署后默认输出到：

```text
/opt/lazy-vps-menu/outputs/
```

主要文件：

```text
01_IMPORT_FLCLASH.yaml              # FLClash / mihomo 可导入配置
02_IMPORT_SINGBOX_CLIENT.json       # sing-box 客户端测试配置
00_README_IMPORT.txt                # 本次生成参数说明
latest_anytls_mihomo.yaml           # 最近一次 AnyTLS 配置
latest_tuic_mihomo.yaml             # 最近一次 TUIC 配置
latest_anytls_tuic_mihomo.yaml      # 最近一次双协议配置
```

开启 HTTP 下载：

**VPS / Linux 执行：**

```bash
bash lazy-vps-menu.sh --quick http
```

---

## 开源升级步骤

这次不能只把 `README.md` 和 `lazy-vps-protocol-addon.sh` 上传。必须先 patch 根目录的 `lazy-vps-menu.sh`。

**Windows CMD 执行：**

```bat
git clone https://github.com/souldance7-ai/VPS-.git
cd VPS-
```

把本包文件复制进仓库根目录后：

**VPS / Linux 或 Git Bash 执行：**

```bash
bash patch-main-menu-v1.3.2.sh
bash -n lazy-vps-menu.sh
bash -n lazy-vps-protocol-addon.sh
grep -nE "v1.3.2|AnyTLS|TUIC|protocol_suite" lazy-vps-menu.sh | head -30
```

提交：

**Windows CMD 执行：**

```bat
git add lazy-vps-menu.sh lazy-vps-protocol-addon.sh protocols templates docs README.md QUICK_START.md CHANGELOG.md GITHUB_UPLOAD_LIST.md patch-main-menu-v1.3.2.sh
git commit -m "feat: integrate AnyTLS and TUIC into LazyVPS main menu"
git push
```

---

## 推送后验证

**VPS / Linux 执行：**

```bash
curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh | grep -E "v1.3.2|AnyTLS|TUIC|protocol_suite" | head -30
```

直接进入主菜单：

**VPS / Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh)
```

快速建立 AnyTLS：

**VPS / Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh) --quick anytls
```

快速建立 TUIC：

**VPS / Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh) --quick tuic
```

---

## 开源安全说明

本包不内置：

- 私人 VPS IP
- 私人域名
- 真实密码
- SSH Key
- 订阅地址
- 机场节点

脚本运行后生成的 `/opt/lazy-vps-menu/outputs/` 会包含真实节点参数，不要上传到公开仓库。
