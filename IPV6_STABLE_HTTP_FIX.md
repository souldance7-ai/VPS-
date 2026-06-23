# LazyVPS v1.2.9 IPv6 Stable 与 HTTP 修正

## 修正原因

手动生成 `01_IMPORT_FLCLASH_IPV6_STABLE.yaml` 后，文件位于：

```text
/opt/lazy-vps-menu/outputs/
```

但 HTTP 下载服务发布目录是：

```text
/opt/lazy-vps-menu/http-download/
```

因此如果没有复制到 HTTP 目录，客户端通过 URL 添加会提示“网络异常”。

## v1.2.9 修正

- `ipv6-export` 自动生成 `01_IMPORT_FLCLASH_IPV6_STABLE.yaml`
- 自动把 IPv6 server 加引号
- 自动设置 `tcp-concurrent:false`
- 自动同步当前 Xray 服务端 SNI / servername
- `16) HTTP On` 自动发布 IPv6 Stable 文件
- `10) Export` 整包自动包含 IPv6 Stable 文件

## 快速命令

```bash
bash /root/lazy-vps-menu.sh --quick ipv6-export
bash /root/lazy-vps-menu.sh --quick http
```

## 文件

```text
01_IMPORT_FLCLASH_IPV4.yaml
01_IMPORT_FLCLASH_IPV6.yaml
01_IMPORT_FLCLASH_IPV6_STABLE.yaml
01_IMPORT_FLCLASH_DUALSTACK.yaml
```
