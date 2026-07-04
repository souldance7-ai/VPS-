#!/usr/bin/env bash
# ==============================================================================
# LazyVPS v1.3.3 Main Menu Hotfix
# 功能：把 AnyTLS / TUIC 接入根目录 lazy-vps-menu.sh，不再只上传 README/addon。
# 用法：在 GitHub 仓库根目录执行：bash lazy-vps-mainmenu-hotfix-v1.3.3.sh
# ==============================================================================
set -Eeuo pipefail

MAIN="${1:-lazy-vps-menu.sh}"
ADDON="${2:-lazy-vps-protocol-addon.sh}"
VER="v1.3.3"
DATE="2026-07-04"

ok(){ printf '\033[32m[完成]\033[0m %s\n' "$1"; }
warn(){ printf '\033[33m[警告]\033[0m %s\n' "$1"; }
err(){ printf '\033[31m[错误]\033[0m %s\n' "$1"; }
info(){ printf '\033[36m[信息]\033[0m %s\n' "$1"; }

[[ -f "$MAIN" ]] || { err "找不到 $MAIN。请先进入 VPS- 仓库根目录，不是进入解压包目录。"; exit 1; }
[[ -f "$ADDON" ]] || warn "当前目录没有 $ADDON；菜单仍会接入，但 VPS 执行时会尝试从 GitHub raw 下载 addon。"

TS="$(date '+%Y%m%d_%H%M%S')"
cp -a "$MAIN" "${MAIN}.bak.${TS}"
ok "已备份原主脚本：${MAIN}.bak.${TS}"

python3 - "$MAIN" <<'PY'
from pathlib import Path
import re
import sys

path = Path(sys.argv[1])
s = path.read_text(encoding='utf-8', errors='ignore')
orig = s

BRIDGE = r'''

# ==============================================================================
# LazyVPS v1.3.3 Main Menu Runtime Bridge / AnyTLS + TUIC 接入层
# 说明：本段插入在最终 dispatch 之前，不覆盖原 Trojan/VLESS/Hysteria2/Xray 逻辑；
#      原功能由 orig_lazyvps_run_choice / orig_lazyvps_quick 原样转发。
# ==============================================================================
LAZYVPS_PROTOCOL_BRIDGE_VERSION="v1.3.3"
VER="正式 v1.3.3 · V4/V6 双栈 + AnyTLS/TUIC 主菜单修正版"
UPDATE_DATE="2026-07-04"
PROTO_ADDON_URL="https://raw.githubusercontent.com/souldance7-ai/VPS-/main/lazy-vps-protocol-addon.sh"
PROTO_ADDON_LOCAL="${ROOT:-/opt/lazy-vps-menu}/lazy-vps-protocol-addon.sh"

# 主菜单第 7 项仍保留 Hysteria2，但升级成协议套件入口。
if [[ "${#ITEMS[@]:-0}" -ge 7 ]]; then
  ITEMS[6]="Protocol Suite / Hysteria2 + AnyTLS + TUIC"
fi
if [[ "${#DESCS[@]:-0}" -ge 7 ]]; then
  DESCS[6]="协议部署子菜单：Hysteria2 / AnyTLS / TUIC v5"
fi

lazyvps_bridge_has(){ command -v "$1" >/dev/null 2>&1; }

lazyvps_script_dir(){
  local src="${BASH_SOURCE[0]:-$0}"
  if [[ "$src" == /dev/fd/* || "$src" == /proc/* ]]; then
    pwd
  else
    cd "$(dirname "$src")" 2>/dev/null && pwd || pwd
  fi
}

ensure_protocol_addon(){
  mkdir -p "${ROOT:-/opt/lazy-vps-menu}" 2>/dev/null || true
  local src dir
  dir="$(lazyvps_script_dir)"
  for src in \
    "./lazy-vps-protocol-addon.sh" \
    "$PWD/lazy-vps-protocol-addon.sh" \
    "$dir/lazy-vps-protocol-addon.sh" \
    "${ROOT:-/opt/lazy-vps-menu}/lazy-vps-protocol-addon.sh"; do
    if [[ -f "$src" && -s "$src" ]]; then
      cp -f "$src" "$PROTO_ADDON_LOCAL" 2>/dev/null || true
      chmod +x "$PROTO_ADDON_LOCAL" 2>/dev/null || true
      ok "已载入协议扩展：$PROTO_ADDON_LOCAL"
      return 0
    fi
  done
  note "本机未找到 lazy-vps-protocol-addon.sh，尝试从 GitHub raw 下载。"
  if lazyvps_bridge_has curl; then
    curl -fsSL "${PROTO_ADDON_URL}?v=$(date +%s)" -o "$PROTO_ADDON_LOCAL" || true
  elif lazyvps_bridge_has wget; then
    wget -qO "$PROTO_ADDON_LOCAL" "${PROTO_ADDON_URL}?v=$(date +%s)" || true
  fi
  if [[ ! -s "$PROTO_ADDON_LOCAL" ]]; then
    err "协议扩展下载失败。请确认 GitHub 根目录已上传 lazy-vps-protocol-addon.sh。"
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
    case "${ans:-}" in
      1) deploy_hy2; pause ;;
      2) deploy_anytls; pause ;;
      3) deploy_tuic; pause ;;
      4) deploy_anytls_tuic; pause ;;
      0|"") return ;;
      *) warn "输入无效。" ;;
    esac
  done
}

# 保存原 run_choice / quick，再覆盖为带 AnyTLS/TUIC 的版本。
if declare -F run_choice >/dev/null 2>&1 && ! declare -F orig_lazyvps_run_choice >/dev/null 2>&1; then
  eval "$(declare -f run_choice | sed '1s/^run_choice/orig_lazyvps_run_choice/')"
fi
if declare -F quick >/dev/null 2>&1 && ! declare -F orig_lazyvps_quick >/dev/null 2>&1; then
  eval "$(declare -f quick | sed '1s/^quick/orig_lazyvps_quick/')"
fi

run_choice(){
  case "${1:-}" in
    7) protocol_suite ;;
    *) orig_lazyvps_run_choice "$@" ;;
  esac
}

quick(){
  case "${1:-}" in
    anytls) deploy_anytls ;;
    tuic) deploy_tuic ;;
    anytls-tuic|tuic-anytls|multi-protocol|multi) deploy_anytls_tuic ;;
    protocol-suite|protocols) protocol_suite ;;
    *) orig_lazyvps_quick "$@" ;;
  esac
}
# ============================================================================== 

'''

# 移除旧的 v1.3.x bridge，避免重复插入。
s = re.sub(r'\n# =+\n# LazyVPS v1\.3\.[0-9]+ Main Menu Runtime Bridge.*?# =+\s*\n', '\n', s, flags=re.S)
s = re.sub(r'\n# =+\n# LazyVPS v1\.3\.[0-9]+ Protocol Addon Bridge.*?# =+\s*\n', '\n', s, flags=re.S)

# 更新头部注释与变量显示，支持 v1.2.13 / v1.2.15 / 后续版本。
s = re.sub(r'Formal Version:\s*v[0-9.]+', 'Formal Version: v1.3.3', s, count=1)
s = re.sub(r'Update Date:\s*[0-9-]+', 'Update Date: 2026-07-04', s, count=1)
s = re.sub(r'VER="[^"]*"', 'VER="正式 v1.3.3 · V4/V6 双栈 + AnyTLS/TUIC 主菜单修正版"', s, count=1)
s = re.sub(r'UPDATE_DATE="[^"]*"', 'UPDATE_DATE="2026-07-04"', s, count=1)

# 头部快速命令提示追加，不影响实际功能。
if '--quick anytls' not in s:
    anchor = '# bash lazy-vps-menu.sh --quick vless-guide'
    addition = anchor + '\n# bash lazy-vps-menu.sh --quick anytls\n# bash lazy-vps-menu.sh --quick tuic\n# bash lazy-vps-menu.sh --quick anytls-tuic\n# bash lazy-vps-menu.sh --quick protocol-suite'
    if anchor in s:
        s = s.replace(anchor, addition, 1)

# 插入在最终 dispatch 之前。这样原数组、函数都已经定义好，bridge 可安全覆盖菜单入口。
markers = [
    'if [[ "${1:-}" == "--preview" ]]',
    'if [[ "${1:-}" == \'--preview\' ]]',
    'need_root\nif [[ "${1:-}" == "--quick" ]]',
    'need_root if [[ "${1:-}" == "--quick" ]]',
]
idx = -1
used = ''
for m in markers:
    idx = s.rfind(m)
    if idx != -1:
        used = m
        break
if idx == -1:
    raise SystemExit('找不到最终 dispatch 入口，无法安全接入。请把 lazy-vps-menu.sh 发回检查。')

if 'LazyVPS v1.3.3 Main Menu Runtime Bridge' not in s:
    s = s[:idx] + BRIDGE + s[idx:]

required = [
    'LAZYVPS_PROTOCOL_BRIDGE_VERSION="v1.3.3"',
    'Protocol Suite / Hysteria2 + AnyTLS + TUIC',
    'deploy_anytls(){',
    'deploy_tuic(){',
    'orig_lazyvps_run_choice',
    'orig_lazyvps_quick',
    'anytls) deploy_anytls',
    'tuic) deploy_tuic',
]
missing = [x for x in required if x not in s]
if missing:
    raise SystemExit('补丁未完整写入，缺少：' + ', '.join(missing))

path.write_text(s, encoding='utf-8')
print('PATCH_OK marker=' + used)
PY

chmod +x "$MAIN" 2>/dev/null || true
[[ -f "$ADDON" ]] && chmod +x "$ADDON" 2>/dev/null || true

if bash -n "$MAIN"; then
  ok "主脚本语法检查通过：$MAIN"
else
  err "主脚本语法检查失败，已保留备份：${MAIN}.bak.${TS}"
  exit 1
fi

if [[ -f "$ADDON" ]]; then
  if bash -n "$ADDON"; then ok "协议扩展语法检查通过：$ADDON"; else err "协议扩展语法检查失败：$ADDON"; exit 1; fi
fi

if grep -qE 'v1\.3\.3|AnyTLS|TUIC|protocol_suite' "$MAIN"; then
  ok "关键词检查通过：v1.3.3 / AnyTLS / TUIC 已进入 lazy-vps-menu.sh"
else
  err "关键词检查失败，说明主脚本仍未写入新菜单。"
  exit 1
fi

if command -v git >/dev/null 2>&1 && git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo
  info "Git 变更状态："
  git status --short -- "$MAIN" "$ADDON" protocols docs templates README.md QUICK_START.md CHANGELOG.md GITHUB_UPLOAD_LIST.md 2>/dev/null || true
  echo
  info "请确认上面必须出现：M lazy-vps-menu.sh 或 A lazy-vps-menu.sh"
fi

echo
ok "LazyVPS 主菜单已修正到 v1.3.3。"
echo "验证命令："
echo "  grep -nE 'v1.3.3|AnyTLS|TUIC|protocol_suite' $MAIN | head -40"
echo "  bash $MAIN --quick protocol-suite"
echo "  bash $MAIN --quick anytls"
echo "  bash $MAIN --quick tuic"
