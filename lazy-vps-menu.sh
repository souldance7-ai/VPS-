#!/usr/bin/env bash
# ==============================================================================
# LazyVPS Quick Menu Pack / 懒人建 VPS 快速菜单包
# Formal Version: v1.3.6
# Update Date: 2026-07-05
# ==============================================================================
# v1.3.6 主入口直连版：
# - 主菜单直接显示 Protocol Suite / Hysteria2 + AnyTLS + TUIC
# - AnyTLS / TUIC 由 lazy-vps-protocol-addon.sh 部署
# - 原 v1.2.x 全功能通过 legacy 旧主脚本保留，不删除旧能力
# ============================================================================== 
set -Eeuo pipefail

APP="懒人建 VPS 快速菜单包"
VER="正式 v1.3.6 · Protocol Suite / AnyTLS + TUIC 主入口版"
UPDATE_DATE="2026-07-05"
ROOT="/opt/lazy-vps-menu"
OUT="$ROOT/outputs"
LEGACY_DIR="$ROOT/legacy"
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
REPO_RAW="https://raw.githubusercontent.com/souldance7-ai/VPS-/main"
mkdir -p "$ROOT" "$OUT" "$LEGACY_DIR" 2>/dev/null || true

R=$'\033[0m'; B=$'\033[1m'; DIM=$'\033[2m'
RED=$'\033[31m'; GRN=$'\033[32m'; YLW=$'\033[33m'; BLU=$'\033[34m'; MAG=$'\033[35m'; CYN=$'\033[36m'; WHT=$'\033[37m'

ok(){ printf "${GRN}[完成]${R} %s\n" "$1"; }
info(){ printf "${GRN}[信息]${R} %s\n" "$1"; }
warn(){ printf "${YLW}[警告]${R} %s\n" "$1"; }
err(){ printf "${RED}[错误]${R} %s\n" "$1"; }
note(){ printf "${BLU}[说明]${R} %s\n" "$1"; }
pause(){ echo; read -rp "按 Enter 返回菜单..." _ || true; }
has(){ command -v "$1" >/dev/null 2>&1; }

banner(){
  clear || true
  printf "${CYN}┌────────────────────────────────────────────────────────────────────────────┐${R}\n"
  printf "${CYN}│${R} ${B}${GRN}LazyVPS Quick Menu Pack${R} / 懒人建 VPS 快速菜单包              ${CYN}│${R}\n"
  printf "${CYN}│${R} ${YLW}%s${R}                                             ${CYN}│${R}\n" "$VER"
  printf "${CYN}│${R} ${DIM}Update: %s · GitHub: souldance7-ai/VPS-${R}                 ${CYN}│${R}\n" "$UPDATE_DATE"
  printf "${CYN}└────────────────────────────────────────────────────────────────────────────┘${R}\n"
}

find_addon(){
  local p
  for p in \
    "$SCRIPT_DIR/lazy-vps-protocol-addon.sh" \
    "$ROOT/lazy-vps-protocol-addon.sh" \
    "/root/lazy-vps-protocol-addon.sh"; do
    [[ -s "$p" ]] && { echo "$p"; return 0; }
  done
  return 1
}

install_addon_if_missing(){
  local addon
  if addon="$(find_addon 2>/dev/null)"; then
    echo "$addon"; return 0
  fi
  warn "本地未找到 lazy-vps-protocol-addon.sh，尝试从 GitHub 下载。"
  if has curl; then
    mkdir -p "$ROOT"
    if curl -fsSL "$REPO_RAW/lazy-vps-protocol-addon.sh?v=$(date +%s)" -o "$ROOT/lazy-vps-protocol-addon.sh"; then
      chmod +x "$ROOT/lazy-vps-protocol-addon.sh"
      echo "$ROOT/lazy-vps-protocol-addon.sh"; return 0
    fi
  fi
  err "找不到 lazy-vps-protocol-addon.sh。请把它与 lazy-vps-menu.sh 放在同一目录，或上传到 GitHub 根目录。"
  return 1
}

find_legacy(){
  local p
  for p in \
    "$SCRIPT_DIR/lazy-vps-menu-legacy-v1.2.15.sh" \
    "$SCRIPT_DIR/legacy/lazy-vps-menu-legacy-v1.2.15.sh" \
    "$LEGACY_DIR/lazy-vps-menu-legacy-v1.2.15.sh" \
    "/root/lazy-vps-menu-legacy-v1.2.15.sh"; do
    [[ -s "$p" ]] && { echo "$p"; return 0; }
  done
  return 1
}

install_legacy_if_missing(){
  local legacy
  if legacy="$(find_legacy 2>/dev/null)"; then
    echo "$legacy"; return 0
  fi
  warn "未找到原 v1.2.x legacy 主脚本，尝试从 GitHub 下载备份文件。"
  if has curl; then
    mkdir -p "$LEGACY_DIR"
    for url in \
      "$REPO_RAW/lazy-vps-menu-legacy-v1.2.15.sh" \
      "$REPO_RAW/legacy/lazy-vps-menu-legacy-v1.2.15.sh"; do
      if curl -fsSL "$url?v=$(date +%s)" -o "$LEGACY_DIR/lazy-vps-menu-legacy-v1.2.15.sh"; then
        chmod +x "$LEGACY_DIR/lazy-vps-menu-legacy-v1.2.15.sh"
        echo "$LEGACY_DIR/lazy-vps-menu-legacy-v1.2.15.sh"; return 0
      fi
    done
  fi
  return 1
}

run_legacy(){
  local legacy
  if legacy="$(install_legacy_if_missing 2>/dev/null)"; then
    note "进入原 LazyVPS v1.2.x 主菜单 / 原功能区。"
    bash "$legacy" "$@"
  else
    err "原功能未找到 legacy 旧主脚本。"
    echo
    echo "解决方式：在 GitHub 仓库根目录先执行 patch-replace-main-v1.3.6.sh。"
    echo "它会把旧 lazy-vps-menu.sh 备份成 lazy-vps-menu-legacy-v1.2.15.sh，再写入新版主入口。"
    echo
    echo "若你已经有旧版文件，也可以手动改名为："
    echo "  lazy-vps-menu-legacy-v1.2.15.sh"
    return 1
  fi
}

protocol_suite(){
  local addon
  addon="$(install_addon_if_missing)" || return 1
  bash "$addon"
}

quick_anytls(){ local addon; addon="$(install_addon_if_missing)" || exit 1; exec bash "$addon" --quick anytls; }
quick_tuic(){ local addon; addon="$(install_addon_if_missing)" || exit 1; exec bash "$addon" --quick tuic; }
quick_anytls_tuic(){ local addon; addon="$(install_addon_if_missing)" || exit 1; exec bash "$addon" --quick anytls-tuic; }
quick_protocol_suite(){ local addon; addon="$(install_addon_if_missing)" || exit 1; exec bash "$addon" --quick protocol-suite; }

quick_dispatch(){
  case "${1:-}" in
    anytls) quick_anytls ;;
    tuic) quick_tuic ;;
    anytls-tuic|tuic-anytls) quick_anytls_tuic ;;
    protocol-suite|protocols|suite) quick_protocol_suite ;;
    version|-v|--version) echo "$VER" ;;
    *) run_legacy --quick "$1" ;;
  esac
}

show_protocol_menu(){
  while true; do
    banner
    printf "${MAG}${B}PROTOCOL / 协议部署${R}\n"
    printf "────────────────────────────────────────────────────────────────────────────\n"
    printf " ${MAG}05${R}  Trojan 443 / 部署 T 协议             ${DIM}原稳定功能，进入 legacy 执行${R}\n"
    printf " ${MAG}06${R}  VLESS Reality Vision / 部署 VLESS-R     ${DIM}原稳定功能，进入 legacy 执行${R}\n"
    printf " ${MAG}07${R}  Hysteria2 8443 / H 协议                ${DIM}原功能 + 新协议套件入口${R}\n"
    printf " ${GRN}08${R}  AnyTLS TCP/TLS / 新增稳定线             ${DIM}sing-box inbound${R}\n"
    printf " ${GRN}09${R}  TUIC v5 UDP/QUIC / 新增高速测试线       ${DIM}sing-box inbound${R}\n"
    printf " ${GRN}10${R}  AnyTLS + TUIC 双协议同机部署             ${DIM}一台 VPS 同时输出两组配置${R}\n"
    printf "────────────────────────────────────────────────────────────────────────────\n"
    read -rp "选择 05/06/07/08/09/10，B 返回，Q 退出: " c
    case "${c,,}" in
      5|05) run_legacy --quick trojan; pause ;;
      6|06) run_legacy --quick vless-guide; pause ;;
      7|07) protocol_suite; pause ;;
      8|08) quick_anytls ;;
      9|09) quick_tuic ;;
      10) quick_anytls_tuic ;;
      b|back|0) return 0 ;;
      q|quit|exit) exit 0 ;;
      *) warn "输入无效。"; sleep 1 ;;
    esac
  done
}

show_main_menu(){
  while true; do
    banner
    printf "操作：↑↓ 选择功能   ↔ 切换分区   Enter 执行   1-37 直达   Q 退出\n\n"
    printf "${CYN}[1 BASIC    ]${R} ${MAG}[2 PROTOCOL ]${R} ${GRN}[3 CHECK    ]${R} ${YLW}[4 BACKUP   ]${R}\n"
    printf "${BLU}[5 DOWNLOAD ]${R} ${MAG}[6 RELAY    ]${R} ${YLW}[7 TUNE     ]${R} ${RED}[8 EXIT     ]${R}\n\n"
    printf "${MAG}PROTOCOL / 协议部署${R}\n"
    printf "────────────────────────────────────────────────────────────────────────────\n"
    printf " ▶ 05  Trojan 443 / 部署 T 协议\n"
    printf "   06  VLESS Reality Vision / 部署 VLESS-R 协议\n"
    printf "   07  Protocol Suite / Hysteria2 + AnyTLS + TUIC\n"
    printf "       ${DIM}说明：进入后可部署 Hysteria2 / AnyTLS / TUIC / 双协议。${R}\n"
    printf "────────────────────────────────────────────────────────────────────────────\n"
    printf "\n${DIM}当前版本：%s${R}\n" "$VER"
    read -rp "输入功能编号或 quick 命令 [1/2/3/4/5/6/7/8/Q]: " c
    case "${c,,}" in
      q|quit|exit|8) exit 0 ;;
      2|protocol|protocols) show_protocol_menu ;;
      7|07) protocol_suite; pause ;;
      8|08|anytls) quick_anytls ;;
      9|09|tuic) quick_tuic ;;
      10|anytls-tuic|tuic-anytls) quick_anytls_tuic ;;
      1|3|4|5|6|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37)
        run_legacy
        pause
        ;;
      5|05) run_legacy --quick trojan; pause ;;
      6|06) run_legacy --quick vless-guide; pause ;;
      *) warn "输入无效。"; sleep 1 ;;
    esac
  done
}

main(){
  case "${1:-}" in
    --quick) quick_dispatch "${2:-}" ;;
    --version|-v) echo "$VER" ;;
    *) show_main_menu ;;
  esac
}

main "$@"
