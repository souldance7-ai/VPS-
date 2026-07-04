# LazyVPS Quick Menu Pack / 懒人建 VPS 快速菜单包

正式版：**v1.3.0 · TUIC + AnyTLS 协议扩展版**  
更新日期：**2026-07-04**

> 本次升级基于公开库当前主脚本 `lazy-vps-menu.sh v1.2.15` 的使用方式继续扩展，不覆盖原有 Trojan、导出、HTTP 下载、诊断等功能。新增一个安全的协议扩展入口：`lazy-vps-protocol-addon.sh`。

---

## 本次新增

| 功能 | 协议 | 底层 | 推荐定位 |
|---|---|---|---|
| AnyTLS 一键建立 | AnyTLS | TCP / TLS | 稳定线、长时间工作、与 Trojan / AnyTLS 对比 |
| TUIC v5 一键建立 | TUIC v5 | UDP / QUIC | 高速测试线、低延迟、手机、视频、游戏 |
| FLClash / mihomo 导出 | YAML | 客户端导入 | 生成完整单节点配置 `01_IMPORT_FLCLASH.yaml` |
| sing-box 客户端导出 | JSON | 本地测试 | 生成 `02_IMPORT_SINGBOX_CLIENT.json` |
| HTTP 临时下载 | Python HTTP Server | 8088/TCP | 手机扫码/浏览器下载导入文件 |

---

## 一键使用

### VPS/Linux 执行

```bash
chmod +x lazy-vps-protocol-addon.sh
bash lazy-vps-protocol-addon.sh
```

### VPS/Linux 执行：快速建立 AnyTLS

```bash
bash lazy-vps-protocol-addon.sh --quick anytls
```

### VPS/Linux 执行：快速建立 TUIC v5

```bash
bash lazy-vps-protocol-addon.sh --quick tuic
```

### VPS/Linux 执行：启动 HTTP 下载

```bash
bash lazy-vps-protocol-addon.sh --quick http
```

---

## 输出文件位置

脚本执行后会输出到：

```text
/opt/lazy-vps-menu/outputs/
```

主要文件：

```text
01_IMPORT_FLCLASH.yaml          # FLClash / mihomo 完整单节点配置
02_IMPORT_SINGBOX_CLIENT.json   # sing-box 客户端测试配置
00_README_IMPORT.txt            # 本次节点信息说明
latest_anytls_mihomo.yaml       # 最近一次 AnyTLS mihomo 配置
latest_tuic_mihomo.yaml         # 最近一次 TUIC mihomo 配置
```

---

## 协议选择建议

### AnyTLS

适合：

- 长时间工作使用；
- 作为 Trojan / AnyTLS 稳定线对比；
- VPS 出口纯净度较好、TCP 路由较稳的场景；
- AI / ChatGPT 工作线的备选协议。

注意：

- 默认使用自签证书；
- 导出配置默认 `skip-cert-verify: true` / `insecure: true`；
- AI 解锁看出口 IP 纯净度，不是只看协议。

### TUIC v5

适合：

- UDP 路由好的 VPS；
- 手机网络、视频、游戏、低延迟测试；
- 高延迟跨境线路测速；
- 与 Hysteria2 做体感对比。

注意：

- TUIC 走 UDP / QUIC，必须放行 UDP 端口；
- 中国三网环境下 UDP 可能被限速、丢包或 QoS；
- 建议作为高速测试线，不建议直接替代主力稳定线。

---

## 与原主菜单整合方式

本包不强行改写你的原始 `lazy-vps-menu.sh`，避免破坏原有 v1.2.15 大菜单。推荐做法：

```text
lazy-vps-menu.sh                 # 保留原版主菜单
lazy-vps-protocol-addon.sh       # 新增协议扩展菜单
protocols/install-anytls.sh      # AnyTLS 快捷入口
protocols/install-tuic.sh        # TUIC 快捷入口
```

后续若要把它合并进主菜单，请参考：

```text
docs/PATCH_FOR_MAIN_MENU.md
```

---

## 分享安全

本项目不内置：

- 个人 VPS IP；
- 私有域名；
- 节点密码；
- 订阅地址；
- Telegram Bot Token；
- SSH Key。

所有密码、UUID、证书都在使用者自己的 VPS 上本地生成。

---

## 推荐仓库提交说明

```text
feat: add TUIC v5 and AnyTLS protocol builders
```

