#!/usr/bin/env bash
# ==============================================================================
# LazyVPS v1.3.2 Main Menu Patch
# 功能：在保留原 lazy-vps-menu.sh 全部功能的基础上，把 AnyTLS/TUIC 接入原互动菜单。
# 用法：在 GitHub 仓库根目录执行：bash patch-main-menu-v1.3.2.sh
# ==============================================================================
set -Eeuo pipefail

MAIN="${1:-lazy-vps-menu.sh}"
ADDON="${2:-lazy-vps-protocol-addon.sh}"
VER="v1.3.2"
DATE="2026-07-04"

ok(){ printf '\033[32m[完成]\033[0m %s\n' "$1"; }
warn(){ printf '\033[33m[警告]\033[0m %s\n' "$1"; }
err(){ printf '\033[31m[错误]\033[0m %s\n' "$1"; }

[[ -f "$MAIN" ]] || { err "找不到 $MAIN。请在 LazyVPS 仓库根目录执行。"; exit 1; }
[[ -f "$ADDON" ]] || warn "找不到 $ADDON。仍会接入菜单，但运行 AnyTLS/TUIC 时会尝试从 GitHub raw 下载。"

TS="$(date '+%Y%m%d_%H%M%S')"
cp -a "$MAIN" "${MAIN}.bak.${TS}"
ok "已备份原主脚本：${MAIN}.bak.${TS}"

python3 - "$MAIN" <<'PY'
from pathlib import Path
import re
import sys

main_path = Path(sys.argv[1])
s = main_path.read_text(encoding='utf-8')
orig = s

INJECT = r'''
# ==============================================================================
# LazyVPS v1.3.2 Protocol Addon Bridge / AnyTLS + TUIC 主菜单接入
# 说明：这里不重写原 Trojan/VLESS/Hysteria2/Xray 功能，只把协议扩展交给
# lazy-vps-protocol-addon.sh 处理，避免破坏已验证的原主菜单逻辑。
# ==============================================================================
PROTO_ADDON_URL="https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-protocol-addon.sh"
PROTO_ADDON_LOCAL="$ROOT/lazy-vps-protocol-addon.sh"

ensure_protocol_addon(){
  mkdir -p "$ROOT" 2>/dev/null || true
  local src=""
  for src in "./lazy-vps-protocol-addon.sh" "$PWD/lazy-vps-protocol-addon.sh" "$(dirname "${BASH_SOURCE[0]:-$0}")/lazy-vps-protocol-addon.sh"; do
    if [[ -f "$src" ]]; then
      cp -f "$src" "$PROTO_ADDON_LOCAL" 2>/dev/null || true
      chmod +x "$PROTO_ADDON_LOCAL" 2>/dev/null || true
      ok "已载入本地协议扩展：$PROTO_ADDON_LOCAL"
      return 0
    fi
  done
  if [[ -s "$PROTO_ADDON_LOCAL" ]]; then
    chmod +x "$PROTO_ADDON_LOCAL" 2>/dev/null || true
    return 0
  fi
  note "本机未找到 lazy-vps-protocol-addon.sh，尝试从 GitHub raw 下载。"
  if has curl; then
    curl -fsSL "$PROTO_ADDON_URL" -o "$PROTO_ADDON_LOCAL" || true
  elif has wget; then
    wget -qO "$PROTO_ADDON_LOCAL" "$PROTO_ADDON_URL" || true
  fi
  if [[ ! -s "$PROTO_ADDON_LOCAL" ]]; then
    err "协议扩展下载失败。请确认仓库根目录已上传 lazy-vps-protocol-addon.sh。"
    err "也可手动复制到：$PROTO_ADDON_LOCAL"
    return 1
  fi
  chmod +x "$PROTO_ADDON_LOCAL" 2>/dev/null || true
  ok "协议扩展已准备完成：$PROTO_ADDON_LOCAL"
}

deploy_anytls(){
  need_root
  ensure_protocol_addon || return 1
  bash "$PROTO_ADDON_LOCAL" --quick anytls
}

deploy_tuic(){
  need_root
  ensure_protocol_addon || return 1
  bash "$PROTO_ADDON_LOCAL" --quick tuic
}

deploy_anytls_tuic(){
  need_root
  ensure_protocol_addon || return 1
  bash "$PROTO_ADDON_LOCAL" --quick anytls-tuic
}

protocol_suite(){
  while true; do
    section "Protocol Suite / 协议部署"
    note "原 Hysteria2 功能保留，同时新增 AnyTLS 与 TUIC v5。"
    note "AnyTLS 走 TCP/TLS；TUIC 走 UDP/QUIC，云安全组必须放行 UDP。"
    echo
    printf " 1) Hysteria2 8443 / 原 H 协议部署\n"
    printf " 2) AnyTLS TCP/TLS / 新增稳定线\n"
    printf " 3) TUIC v5 UDP/QUIC / 新增高速测试线\n"
    printf " 4) AnyTLS + TUIC 双协议同机部署\n"
    printf " 0) 返回\n"
    read -rp "序号: " ans
    case "$ans" in
      1) deploy_hy2; pause ;;
      2) deploy_anytls; pause ;;
      3) deploy_tuic; pause ;;
      4) deploy_anytls_tuic; pause ;;
      0|"") return ;;
      *) warn "输入无效。" ;;
    esac
  done
}
# ============================================================================== 
'''

# 版本号更新
s = re.sub(r'Formal Version: v[0-9.]+', 'Formal Version: v1.3.2', s, count=1)
s = re.sub(r'Update Date: [0-9-]+', 'Update Date: 2026-07-04', s, count=1)
s = re.sub(r'VER="[^"]*v1\.2\.15[^"]*"', 'VER="正式 v1.3.2 · V4/V6 双栈 + AnyTLS/TUIC 主菜单集成版"', s, count=1)
s = re.sub(r'UPDATE_DATE="[0-9-]+"', 'UPDATE_DATE="2026-07-04"', s, count=1)

# 头部快速命令补充
if '--quick anytls' not in s:
    s = s.replace('# bash lazy-vps-menu.sh --quick vless-guide', '# bash lazy-vps-menu.sh --quick vless-guide\n# bash lazy-vps-menu.sh --quick anytls\n# bash lazy-vps-menu.sh --quick tuic\n# bash lazy-vps-menu.sh --quick anytls-tuic\n# bash lazy-vps-menu.sh --quick protocol-suite')

# 插入桥接函数：放在 ITEMS=( 之前
if 'LazyVPS v1.3.2 Protocol Addon Bridge' not in s:
    idx = s.find('ITEMS=(')
    if idx == -1:
        raise SystemExit('找不到 ITEMS=(，无法安全插入协议扩展。')
    s = s[:idx] + INJECT + '\n' + s[idx:]

# 原菜单第 7 项改成协议套件，Hysteria2 放到子菜单内
s = s.replace('"Hysteria2 8443 / 部署 H 协议"', '"Protocol Suite / Hysteria2 + AnyTLS + TUIC"')
s = s.replace('"UDP 协议，适合移动网络和高吞吐测试"', '"协议部署子菜单：Hysteria2 / AnyTLS / TUIC v5"')
s = re.sub(r'7\)\s*deploy_hy2\s*;;', '7) protocol_suite ;;', s, count=1)

# 快捷命令接入
if 'anytls) deploy_anytls ;;' not in s:
    s = re.sub(
        r'(hysteria2\|hy2\)\s*deploy_hy2\s*;;)',
        r'\1 anytls) deploy_anytls ;; tuic) deploy_tuic ;; anytls-tuic|tuic-anytls|multi-protocol|multi) deploy_anytls_tuic ;; protocol-suite|protocols) protocol_suite ;;',
        s,
        count=1,
    )

# 快捷命令说明文本补充
s = s.replace('trojan|reality|hysteria2|export|http', 'trojan|reality|hysteria2|anytls|tuic|anytls-tuic|protocol-suite|export|http')

required = [
    'Protocol Suite / Hysteria2 + AnyTLS + TUIC',
    'deploy_anytls(){',
    'deploy_tuic(){',
    'anytls) deploy_anytls ;;',
    'tuic) deploy_tuic ;;',
]
missing = [x for x in required if x not in s]
if missing:
    raise SystemExit('补丁未完整写入，缺少：' + ', '.join(missing))

main_path.write_text(s, encoding='utf-8')
print('PATCH_OK')
PY

chmod +x "$MAIN" 2>/dev/null || true
chmod +x "$ADDON" 2>/dev/null || true

if bash -n "$MAIN"; then
  ok "主脚本语法检查通过：$MAIN"
else
  err "主脚本语法检查失败，已保留备份：${MAIN}.bak.${TS}"
  exit 1
fi

if [[ -f "$ADDON" ]]; then
  if bash -n "$ADDON"; then ok "协议扩展语法检查通过：$ADDON"; else err "协议扩展语法检查失败：$ADDON"; exit 1; fi
fi

echo
ok "LazyVPS 主菜单已升级到 v1.3.2。"
echo "验证命令："
echo "  grep -nE 'v1.3.2|AnyTLS|TUIC|protocol_suite' $MAIN | head -30"
echo "  bash $MAIN --quick protocol-suite"
echo "  bash $MAIN --quick anytls"
echo "  bash $MAIN --quick tuic"
