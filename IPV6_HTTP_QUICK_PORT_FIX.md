# LazyVPS v1.2.10 IPv6 HTTP / Quick / 独立端口修正

## 修正内容

- 修正 IPv6 quick 分支：
  - `ipv6-check`
  - `ipv6-export`
  - `ipv6-guard`
  - `ipv6-port`
  - `ipv6-http`
- 新增 HTTP Sync Verify：
  - 同步 outputs 到 http-download
  - 测试本机 127.0.0.1:8088
  - 显示 8088 监听状态
- 新增 IPv6 Dedicated Port：
  - 复制当前 Trojan / VLESS inbound
  - 新增 IPv6 独立测试端口
  - 生成 `01_IMPORT_FLCLASH_IPV6_PORT<port>.yaml`

## 推荐排查顺序

```text
1. IPv6 Check
2. IPv6 Export
3. HTTP Sync Verify
4. 若 IPv6 Stable 仍 Timeout，再试 IPv6 Dedicated Port 2443
```
