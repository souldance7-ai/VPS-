# TUIC / AnyTLS 使用说明

## AnyTLS

- 底层：TCP/TLS
- 建议定位：稳定线、工作线、备用线
- 默认端口：8443/tcp
- 服务端：sing-box anytls inbound
- 客户端：FLClash/mihomo anytls、sing-box anytls outbound

## TUIC v5

- 底层：UDP/QUIC
- 建议定位：高速测试线、手机网络、视频、游戏、低延迟场景
- 默认端口：10443/udp
- 服务端：sing-box tuic inbound
- 客户端：FLClash/mihomo tuic、sing-box tuic outbound

## 中国三网建议

- 电信/移动/联通如果 UDP 质量好，TUIC 体感可能很好。
- 如果 UDP 被限速、丢包、QoS，TUIC 会明显抖动。
- 工作与 GPT 场景建议 Trojan / AnyTLS 做稳定主力，TUIC 做测速与备用。
