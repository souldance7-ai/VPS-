# 主菜单接入说明

v1.3.2 不再只是外置 addon，而是通过 `patch-main-menu-v1.3.2.sh` 把 AnyTLS/TUIC 接入原 `lazy-vps-menu.sh`。

## 为什么要 patch 主菜单

用户一键命令下载的是：

```text
https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh
```

如果这个文件还是 v1.2.x，菜单里就不会出现 AnyTLS/TUIC。

## patch 后主菜单变化

原本：

```text
7) Hysteria2 8443 / 部署 H 协议
```

改为：

```text
7) Protocol Suite / Hysteria2 + AnyTLS + TUIC
```

进入后：

```text
1) Hysteria2 8443 / 原 H 协议部署
2) AnyTLS TCP/TLS / 新增稳定线
3) TUIC v5 UDP/QUIC / 新增高速测试线
4) AnyTLS + TUIC 双协议同机部署
0) 返回
```

## 快捷命令

```bash
bash lazy-vps-menu.sh --quick anytls
bash lazy-vps-menu.sh --quick tuic
bash lazy-vps-menu.sh --quick anytls-tuic
bash lazy-vps-menu.sh --quick protocol-suite
```
