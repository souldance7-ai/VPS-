# 外部脚本与网络访问审计

本文件用于说明 `lazy-vps-protocol-addon.sh` 会访问哪些外部地址，方便开源分享时让用户判断风险。

## 1. sing-box 官方安装脚本

```bash
curl -fsSL https://sing-box.app/install.sh | sh
```

用途：安装或更新 sing-box。

说明：

- 仅在 VPS 未检测到 `sing-box` 时执行。
- 使用 sing-box 官方安装入口。
- 若用户不希望自动安装，可先自行安装 sing-box，再执行本脚本。

## 2. 公网 IP 检测

脚本会依序尝试：

```text
https://api.ipify.org
https://ifconfig.me
https://icanhazip.com
```

用途：自动填写客户端连接地址的默认值。

说明：

- 仅用于显示/默认填值。
- 用户可在交互中手动改成自己的域名或公网 IP。

## 3. 本地生成内容

以下内容均在本机生成，不上传第三方：

```text
UUID
AnyTLS 密码
TUIC 密码
TLS 自签证书
FLClash / mihomo 配置
sing-box 客户端配置
```

## 4. 防火墙操作

脚本会尝试放行：

```text
AnyTLS: tcp/8443 或用户自定义 TCP 端口
TUIC: udp/10443 或用户自定义 UDP 端口
HTTP 下载: tcp/8088
```

支持顺序：

```text
ufw -> firewalld -> iptables -> 手动提示
```

## 5. 不做的事情

本脚本不会：

- 上传配置到第三方；
- 写入个人机场订阅；
- 保存 SSH 密钥；
- 读取浏览器 Cookie；
- 修改原 `lazy-vps-menu.sh` 主菜单文件。

