# LazyVPS Quick Menu Pack / 懒人建 VPS 快速菜单包

> v1.4.0 Interactive TUI：保留原 LazyVPS 使用逻辑，新增方向键互动选择，并把 T / V / H / A / TUIC / AnyTLS+TUIC 统一放入协议功能区。

## 一键快速运行

### 方式一：下载后运行，适合开源审查

**VPS/Linux 执行：**

```bash
apt update && apt install -y curl wget ca-certificates
wget -O lazy-vps-menu.sh https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash lazy-vps-menu.sh
```

### 方式二：一行命令直接进入互动界面

**VPS/Linux 执行：**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh)
```

### 强制刷新缓存版本

**VPS/Linux 执行：**

```bash
rm -f lazy-vps-menu.sh /root/lazy-vps-menu.sh /opt/lazy-vps-menu/lazy-vps-protocol-addon.sh
curl -L -H "Cache-Control: no-cache" "https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh?v=$(date +%s)" -o lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash lazy-vps-menu.sh
```

## 新互动方式

进入菜单后支持：

```text
↑ / ↓     上下选择功能
← / →     切换 BASIC / PROTOCOL / CHECK / BACKUP / DOWNLOAD / RELAY / TUNE
Enter     执行当前选项
数字      直接跳转或执行，例如 7、08、10
Q         退出
```

协议热键：

```text
T = Trojan 443
V = VLESS Reality Vision
H = Hysteria2 8443
A = AnyTLS TCP/TLS
U = TUIC v5 UDP/QUIC
D = AnyTLS + TUIC 双协议同机部署
S = 服务状态检查
O = 配置下载 / 打包
```

## 协议功能区

```text
05  Trojan 443 / T 协议
06  VLESS Reality Vision / V 协议
07  Hysteria2 8443 / H 协议
08  AnyTLS TCP/TLS / A 协议
09  TUIC v5 UDP/QUIC / TUIC 协议
10  AnyTLS + TUIC 双协议同机部署
```

AnyTLS / TUIC 使用 sing-box 部署，输出 FLClash / mihomo 与 sing-box 客户端配置。

## Quick 命令

**VPS/Linux 执行：**

```bash
bash lazy-vps-menu.sh --quick anytls
bash lazy-vps-menu.sh --quick tuic
bash lazy-vps-menu.sh --quick anytls-tuic
bash lazy-vps-menu.sh --quick status
bash lazy-vps-menu.sh --quick download
```

旧协议入口：

```bash
bash lazy-vps-menu.sh --quick trojan
bash lazy-vps-menu.sh --quick vless
bash lazy-vps-menu.sh --quick hysteria2
```

> Trojan / VLESS / Hysteria2 会调用 legacy 旧主脚本，以保留原 v1.2.6 / v1.2.x 的完整部署逻辑。

## 保留原 v1.2.6 功能的方法

如果你有原来的 `lazy-vps-menu.sh` v1.2.6 / v1.2.x，请在上传新版前把旧主脚本改名为：

```text
legacy/lazy-vps-menu-legacy-v1.2.6.sh
```

或放在仓库根目录：

```text
lazy-vps-menu-legacy-v1.2.6.sh
```

v1.4.0 新主入口会自动识别，并把原 BASIC / CHECK / BACKUP / RELAY / TUNE 以及 Trojan / VLESS / Hysteria2 交给 legacy 执行。

如果只使用 AnyTLS / TUIC / AnyTLS+TUIC，不需要 legacy。

## 低流量 VPS / GitHub 慢的处理

有些 VPS 到 GitHub Release 很慢。可以先在 Windows 下载 sing-box deb，再上传 VPS：

**Windows CMD 执行：**

```bat
scp "%USERPROFILE%\Downloads\sing-box_1.13.14_linux_amd64.deb" root@你的VPS-IP:/tmp/sing-box.deb
```

再跑：

**VPS/Linux 执行：**

```bash
bash lazy-vps-menu.sh --quick anytls-tuic
```

addon 会优先识别 `/tmp/sing-box.deb`，避免 VPS 直接下载 GitHub Release。

## 导出与下载配置

部署完成后输出目录：

```text
/opt/lazy-vps-menu/outputs
```

推荐打包下载：

**VPS/Linux 执行：**

```bash
cd /opt/lazy-vps-menu
tar -czf /root/lazyvps-config.tar.gz outputs
```

**Windows CMD 执行：**

```bat
scp root@你的VPS-IP:/root/lazyvps-config.tar.gz "%USERPROFILE%\Downloads\lazyvps-config.tar.gz"
```

## GitHub 网页上传

解压本包后，进入 `LazyVPS-Interactive-v1.4.0` 文件夹，Ctrl+A 全选里面的内容，拖到 GitHub：

```text
Add file → Upload files → Commit changes
```

最重要必须覆盖根目录：

```text
lazy-vps-menu.sh
lazy-vps-protocol-addon.sh
protocols/
README.md
QUICK_START.md
CHANGELOG.md
```

## 安全提醒

开源包不内置个人 IP、域名、密码、订阅链接、SSH Key。运行后生成的 `/opt/lazy-vps-menu/outputs` 会包含真实节点密钥，不要上传公开仓库。
