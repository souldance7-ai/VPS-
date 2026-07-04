# LazyVPS v1.3.3 主菜单修正版

本包用于修正 LazyVPS v1.3.2 中 **AnyTLS / TUIC 已上传 addon，但主菜单 `lazy-vps-menu.sh` 未真正接入** 的问题。

## 这版解决什么

- 保留原 LazyVPS 1–37 项主功能。
- 保留 Trojan / VLESS Reality / Hysteria2 / 导出 / HTTP 下载 / AI 分流 / DNS Unlock 等原功能。
- 将原第 7 项 Hysteria2 升级为：

```text
7) Protocol Suite / Hysteria2 + AnyTLS + TUIC
```

子菜单：

```text
1) Hysteria2 8443 / 原 H 协议部署
2) AnyTLS TCP/TLS / 新增稳定线
3) TUIC v5 UDP/QUIC / 新增高速测试线
4) AnyTLS + TUIC 双协议同机部署
0) 返回
```

## 修正方式

在 GitHub 仓库根目录执行：

```bash
bash lazy-vps-mainmenu-hotfix-v1.3.3.sh
```

然后确认：

```bash
grep -nE 'v1.3.3|AnyTLS|TUIC|protocol_suite' lazy-vps-menu.sh | head -40
```

看到内容后再 `git add/commit/push`。

详细步骤见 `FIX_NOW.md`。
