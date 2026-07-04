# 将 TUIC / AnyTLS 扩展合并进原 `lazy-vps-menu.sh` 的建议

当前公开库主脚本为大菜单结构，建议先不要直接覆盖。最稳方式是保留原主菜单，把本扩展作为「协议扩展入口」。

## 推荐目录结构

```text
VPS-/
├── lazy-vps-menu.sh                 # 原主菜单，保持不动
├── lazy-vps-protocol-addon.sh       # 新增：协议扩展菜单
├── protocols/
│   ├── install-anytls.sh
│   ├── install-tuic.sh
│   └── status.sh
├── README.md
├── CHANGELOG.md
├── SECURITY_SHARE_CHECK.txt
├── EXTERNAL_SCRIPT_AUDIT.md
└── docs/
    ├── PATCH_FOR_MAIN_MENU.md
    ├── TUIC_ANYTLS_GUIDE.md
    └── PUBLISH_COMMANDS.md
```

## 主菜单中可以增加的入口文字

可以在原 `lazy-vps-menu.sh` 的协议/部署区增加两项：

```text
部署 AnyTLS TCP/TLS 节点
部署 TUIC v5 UDP/QUIC 节点
```

## 若要在主脚本中增加 wrapper 函数

把下面函数放在原主脚本的功能函数区：

```bash
run_protocol_addon(){
  local action="$1"
  local base_dir
  base_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  if [[ ! -x "$base_dir/lazy-vps-protocol-addon.sh" ]]; then
    echo "[错误] 未找到 lazy-vps-protocol-addon.sh，请确认扩展文件已上传到同目录。"
    return 1
  fi
  bash "$base_dir/lazy-vps-protocol-addon.sh" --quick "$action"
}

deploy_anytls_addon(){ run_protocol_addon anytls; }
deploy_tuic_addon(){ run_protocol_addon tuic; }
protocol_addon_status(){ run_protocol_addon status; }
```

## 快速命令建议加入原脚本头部说明

```bash
# bash lazy-vps-protocol-addon.sh --quick anytls
# bash lazy-vps-protocol-addon.sh --quick tuic
# bash lazy-vps-protocol-addon.sh --quick http
# bash lazy-vps-protocol-addon.sh --quick status
```

## 注意

1. `T` 简写已经用于 Trojan，不建议把 TUIC 也简写成 `T`。
2. TUIC 一律标为 `TUIC`，节点名称例如：`🇯🇵 日本-商家-TUIC`。
3. AnyTLS 建议标为 `AnyTLS` 或 `A`。若你的命名标准中 `A=AnyTLS`，则可以用：`🇹🇼 台湾-商家-A`。
4. 本扩展使用 sing-box 管理 AnyTLS/TUIC。如果原主菜单正在用 Xray 管理 Trojan，二者不要同时绑定同一个端口。
5. 执行 AnyTLS/TUIC 会重写 `/etc/sing-box/config.json`，但不会改 `/usr/local/etc/xray/config.json`。

