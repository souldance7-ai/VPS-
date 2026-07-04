# TUIC / AnyTLS 使用说明

## 1. AnyTLS 是什么

AnyTLS 是基于 TCP/TLS 的代理协议，适合做稳定线测试。LazyVPS 中的 AnyTLS 由 sing-box 服务端建立，输出 mihomo/FLClash 与 sing-box 客户端配置。

推荐用途：

- 长时间工作；
- AI / ChatGPT 出口纯净度测试；
- 与 Trojan、VLESS Reality、AnyTLS 体感对比；
- VPS TCP 路由较稳的场景。

默认：

```text
端口：8443/tcp
SNI：www.cloudflare.com
证书：自签证书
客户端：skip-cert-verify / insecure = true
```

## 2. TUIC v5 是什么

TUIC v5 是基于 UDP/QUIC 的代理协议，主打低延迟、多路复用与 UDP 代理能力。LazyVPS 中的 TUIC 由 sing-box 服务端建立，输出 mihomo/FLClash 与 sing-box 客户端配置。

推荐用途：

- 手机网络；
- 游戏、视频、语音；
- 高延迟跨境线路体感测试；
- 与 Hysteria2 对比。

默认：

```text
端口：10443/udp
SNI：www.cloudflare.com
拥塞控制：bbr
UDP Relay：native
0-RTT：关闭
证书：自签证书
客户端：skip-cert-verify / insecure = true
```

## 3. 中国三网建议

| 网络条件 | 推荐协议 |
|---|---|
| TCP 稳、UDP 抖动大 | AnyTLS / Trojan |
| UDP 放行且丢包低 | TUIC / Hysteria2 |
| 长时间 GPT 工作 | AnyTLS / Trojan + 干净出口 IP |
| 手机视频体感 | TUIC 可测 |
| 电信家宽 timeout 明显 | 优先稳定 TCP，再测 TUIC |

## 4. 端口与安全组

AnyTLS：

```text
VPS 防火墙：8443/tcp
云厂商安全组：8443/tcp
```

TUIC：

```text
VPS 防火墙：10443/udp
云厂商安全组：10443/udp
```

HTTP 临时下载：

```text
VPS 防火墙：8088/tcp
云厂商安全组：8088/tcp
```

## 5. 排错

### TUIC 不通

重点查：

1. 云厂商安全组是否放行 UDP；
2. VPS 系统防火墙是否放行 UDP；
3. 本地网络是否限制 UDP；
4. 客户端是否支持 TUIC v5；
5. SNI、UUID、password、port 是否一致。

### AnyTLS 不通

重点查：

1. TCP 端口是否放行；
2. 客户端是否支持 AnyTLS；
3. 自签证书场景是否开启 `skip-cert-verify`；
4. SNI、password、port 是否一致；
5. sing-box 服务是否运行。

### 查看服务

**VPS/Linux 执行**

```bash
systemctl status sing-box --no-pager
journalctl -u sing-box --no-pager -n 80
```

