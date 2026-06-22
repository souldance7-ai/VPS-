# LazyVPS Quick Menu Pack / 懒人建 VPS 快速菜单包

<p align="center">
  <img src="./menu-basic.png" width="860">
</p>

<p align="center">
  <b>少折腾 · 快部署 · 可回滚 · 可分享 · 菜单精简 · 支持 VLESS Reality Vision 稳定排查</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-v1.2.5-blue">
  <img src="https://img.shields.io/badge/Shell-Bash-green">
  <img src="https://img.shields.io/badge/UI-Compact-orange">
  <img src="https://img.shields.io/badge/VLESS-Stability-brightgreen">
</p>

---

## 快速使用

```bash
wget -O lazy-vps-menu.sh https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-menu.sh
chmod +x lazy-vps-menu.sh
bash lazy-vps-menu.sh
```

---

## v1.2.5 更新重点

这版主要不是继续堆功能，而是整理 v1.2.4 后主菜单过长的问题。

| 更新 | 说明 |
|---|---|
| 菜单精简 | 主功能栏不再继续增加，TUNE 分区收纳为两个工具箱 |
| 稳定增强工具箱 | Public IP Guard / Export Safety / Remote Publish / Node Test / NodeQuality Archive |
| 进阶模板工具箱 | Airport Chain / Advanced Export / Strategy Template / Node Classify / Protocol Lint / VLESS Guide |
| VLESS Timeout Tips | 增加 VLESS Reality Vision 偶发 Timeout 排查说明 |
| VLESS 建议 | 对偶发 Timeout 的 Reality 节点，优先做协议体检、日志检查和客户端内核版本确认 |

---

## 当前主菜单结构

| 分区 | 内容 |
|---|---|
| BASIC | 初始化、BBR、防火墙、Xray Core |
| PROTOCOL | Trojan、VLESS Reality Vision、Hysteria2 |
| CHECK | Status、Output、Export |
| BACKUP | Backup、Rollback、Stop |
| DOWNLOAD | HTTP 下载、NodeQuality、Local/Remote Merge |
| RELAY | AI 规则、服务端 AI 分流、端口中转 |
| TUNE | BBRv3、DNS Unlock、NetSpeed、TCP Tune、Diagnose、Current Trojan、两个工具箱 |

---

## TUNE 分区新布局

原本 v1.2.4 的 TUNE 页面太长，v1.2.5 改为：

```text
29) BBR v3
30) DNS Unlock
31) NetSpeed
32) TCP Tune
33) Diagnose
34) Current Trojan
35) Stability Suite
36) Advanced Suite
37) Exit
```

### 35) Stability Suite / 稳定增强工具箱

包含：

```text
1) Public IP Guard
2) Export Safety
3) Remote Publish
4) Node Test Pack
5) NodeQuality Archive
```

### 36) Advanced Suite / 进阶模板工具箱

包含：

```text
1) Airport Chain Template
2) Advanced Export
3) Strategy Template
4) Node Classify
5) Protocol Lint
6) VLESS Vision Guide
7) VLESS Timeout Tips
```

---

## VLESS Reality Vision 偶发 Timeout 怎么看？

如果节点多数时候可连，偶尔 Timeout，通常不是字段完全错。优先检查：

```bash
bash /root/lazy-vps-menu.sh --quick protocol-lint
bash /root/lazy-vps-menu.sh --quick node-test
systemctl status xray --no-pager
journalctl -u xray -n 80 --no-pager
```

常见原因：

```text
1. 5G CPE / 本地网络抖动
2. 运营商路由瞬时波动
3. Reality 握手偶发失败
4. 客户端内核版本对 VLESS Reality 支持不稳定
5. tcp-concurrent 在个别网络环境下可能带来波动，可临时对比关闭
```

如果 nPerf / TANet 能跑到数百 Mbps，但节点偶尔 Timeout，多半是握手或路由瞬时问题，不是带宽不足。

---

## 版本主线

| 版本 | 重点 |
|---|---|
| v1.0 | 新 VPS 快速建站 |
| v1.2 | 服务端 AI 分流 |
| v1.2.2 | Media DNS 与 Export 同步 |
| v1.2.3 | Public IP Guard / Remote Publish / Node Test |
| v1.2.4 | VLESS Reality Vision / Advanced Export |
| v1.2.5 | 主界面精简 / 工具箱化 / VLESS Timeout 排查 |

---

## 分享安全

本项目不内置：

```text
VPS IP
私有域名
Trojan / Hysteria2 密码
机场订阅 URL / Token
Cloudflare Token
SSH 登录信息
```

所有 README 示意图均为脱敏示意图，不包含真实 IP、password、pinnedPeerCertSha256 或机场订阅信息。

---

## License

MIT License
