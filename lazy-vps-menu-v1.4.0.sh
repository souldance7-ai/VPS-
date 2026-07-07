#!/usr/bin/env bash
# ==============================================================================
# LazyVPS Quick Menu Pack / 懒人建 VPS 快速菜单包
# Formal Version: v1.4.0
# Update Date: 2026-07-07
# ==============================================================================
# v1.4.0 Interactive TUI:
# - 支持数字直达、↑↓←→方向键、Enter 执行、Q 退出
# - 支持协议热键：T=Trojan, V=VLESS Reality, H=Hysteria2, A=AnyTLS, U=TUIC, D=AnyTLS+TUIC
# - AnyTLS / TUIC 使用 lazy-vps-protocol-addon.sh 部署
# - 原 v1.2.6 / v1.2.x 大菜单功能通过 legacy 旧主脚本接续，不强行删除旧能力
# ============================================================================== 
set -Eeuo pipefail

APP="LazyVPS Quick Menu Pack / 懒人建 VPS 快速菜单包"
VER="正式 v1.4.0 · Interactive TUI · T/V/H/A/TUIC"
UPDATE_DATE="2026-07-07"
ROOT="/opt/lazy-vps-menu"
OUT="$ROOT/outputs"
LEGACY_DIR="$ROOT/legacy"
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
REPO_RAW="https://raw.githubusercontent.com/souldance7-ai/VPS-/main"
mkdir -p "$ROOT" "$OUT" "$LEGACY_DIR" 2>/dev/null || true

R=$'\033[0m'; B=$'\033[1m'; DIM=$'\033[2m'; REV=$'\033[7m'
RED=$'\033[31m'; GRN=$'\033[32m'; YLW=$'\033[33m'; BLU=$'\033[34m'; MAG=$'\033[35m'; CYN=$'\033[36m'; WHT=$'\033[37m'

ok(){ printf "${GRN}[完成]${R} %s\n" "$1" >&2; }
info(){ printf "${GRN}[信息]${R} %s\n" "$1" >&2; }
warn(){ printf "${YLW}[警告]${R} %s\n" "$1" >&2; }
err(){ printf "${RED}[错误]${R} %s\n" "$1" >&2; }
note(){ printf "${BLU}[说明]${R} %s\n" "$1" >&2; }
has(){ command -v "$1" >/dev/null 2>&1; }
pause(){ echo; read -rp "按 Enter 返回菜单..." _ || true; }

banner(){
  clear || true
  printf "${CYN}┌────────────────────────────────────────────────────────────────────────────┐${R}\n"
  printf "${CYN}│${R} ${B}${GRN}%s${R}\n" "$APP"
  printf "${CYN}│${R} ${YLW}%s${R}\n" "$VER"
  printf "${CYN}│${R} ${DIM}Update: %s · GitHub: souldance7-ai/VPS-${R}\n" "$UPDATE_DATE"
  printf "${CYN}└────────────────────────────────────────────────────────────────────────────┘${R}\n"
}

# --------------------------- addon / legacy loader ---------------------------
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
  local addon target tmp
  if addon="$(find_addon 2>/dev/null)"; then
    if bash -n "$addon" >/dev/null 2>&1; then echo "$addon"; return 0; fi
    warn "找到 lazy-vps-protocol-addon.sh，但语法检查失败，准备重新下载：$addon"
  fi
  warn "本地未找到可用 lazy-vps-protocol-addon.sh，尝试从 GitHub 下载。"
  if has curl; then
    mkdir -p "$ROOT"
    target="$ROOT/lazy-vps-protocol-addon.sh"
    tmp="$target.tmp.$$"
    if curl -fL --retry 2 --connect-timeout 10 "$REPO_RAW/lazy-vps-protocol-addon.sh?v=$(date +%s)" -o "$tmp"; then
      if bash -n "$tmp" >/dev/null 2>&1; then
        mv -f "$tmp" "$target"; chmod +x "$target"; echo "$target"; return 0
      fi
      rm -f "$tmp"; err "GitHub 下载到的 addon 语法检查失败；请确认仓库根目录 addon 为 v1.4.0。"; return 1
    fi
    rm -f "$tmp"
  fi
  err "找不到 lazy-vps-protocol-addon.sh。请与 lazy-vps-menu.sh 一起上传到 GitHub 根目录。"
  return 1
}

find_legacy(){
  local p
  for p in \
    "$SCRIPT_DIR/lazy-vps-menu-legacy-v1.2.6.sh" \
    "$SCRIPT_DIR/lazy-vps-menu-legacy-v1.2.15.sh" \
    "$SCRIPT_DIR/legacy/lazy-vps-menu-legacy-v1.2.6.sh" \
    "$SCRIPT_DIR/legacy/lazy-vps-menu-legacy-v1.2.15.sh" \
    "$LEGACY_DIR/lazy-vps-menu-legacy-v1.2.6.sh" \
    "$LEGACY_DIR/lazy-vps-menu-legacy-v1.2.15.sh" \
    "/root/lazy-vps-menu-legacy-v1.2.6.sh" \
    "/root/lazy-vps-menu-legacy-v1.2.15.sh"; do
    [[ -s "$p" ]] && { echo "$p"; return 0; }
  done
  return 1
}

legacy_missing_help(){
  err "未找到 v1.2.6 / v1.2.x legacy 旧主脚本。"
  echo
  echo "这版 v1.4.0 已重写互动入口，但原 v1.2.6 的 Trojan / VLESS / Hysteria2 等完整旧功能"
  echo "需要把旧版 lazy-vps-menu.sh 备份为以下任一文件名后一起上传："
  echo
  echo "  legacy/lazy-vps-menu-legacy-v1.2.6.sh"
  echo "  lazy-vps-menu-legacy-v1.2.6.sh"
  echo
  echo "如果只是部署 AnyTLS / TUIC，可直接按 A / U / D，无需 legacy。"
}

run_legacy(){
  local legacy
  if legacy="$(find_legacy 2>/dev/null)"; then
    note "进入原 LazyVPS legacy 主脚本：$legacy"
    bash "$legacy" "$@"
  else
    legacy_missing_help
    return 1
  fi
}

run_legacy_quick(){
  local name="$1" legacy
  if legacy="$(find_legacy 2>/dev/null)"; then
    note "调用 legacy quick：$name"
    bash "$legacy" --quick "$name" || bash "$legacy"
  else
    legacy_missing_help
    return 1
  fi
}

run_addon(){ local addon; addon="$(install_addon_if_missing)" || return 1; bash "$addon" "$@"; }
quick_anytls(){ run_addon --quick anytls; }
quick_tuic(){ run_addon --quick tuic; }
quick_dual(){ run_addon --quick anytls-tuic; }
quick_status(){ run_addon --quick status || status_local; }
quick_http(){ run_addon --quick http || download_local; }

# ----------------------------- local utilities ------------------------------
status_local(){
  banner
  printf "${CYN}${B}CHECK / 本机服务与端口状态${R}\n"
  echo "────────────────────────────────────────────────────────────────────────────"
  systemctl status sing-box --no-pager 2>/dev/null || true
  echo
  ss -lntup 2>/dev/null | grep -E '8443|10443|443|80|xray|sing-box|hysteria' || true
  pause
}

download_local(){
  banner
  printf "${BLU}${B}DOWNLOAD / 配置下载${R}\n"
  echo "────────────────────────────────────────────────────────────────────────────"
  mkdir -p "$OUT"
  if ! compgen -G "$OUT/*" >/dev/null; then warn "未发现配置输出：$OUT"; pause; return 0; fi
  ls -lh "$OUT" || true
  echo
  echo "方式一：Windows CMD 下载单包："
  echo "  scp root@<你的VPS-IP>:/root/lazyvps-config.tar.gz \"%USERPROFILE%\\Downloads\\lazyvps-config.tar.gz\""
  echo
  (cd "$ROOT" && tar -czf /root/lazyvps-config.tar.gz outputs) || true
  ok "已打包：/root/lazyvps-config.tar.gz"
  echo
  read -rp "是否临时开启 8088 HTTP 下载页？[y/N]: " yn || true
  if [[ "${yn,,}" == "y" ]]; then
    cd "$OUT"
    echo "请浏览器打开：http://$(hostname -I | awk '{print $1}'):8088/"
    echo "下载后 Ctrl+C 关闭。"
    python3 -m http.server 8088 --bind 0.0.0.0
  fi
  pause
}

basic_info(){
  banner
  printf "${CYN}${B}BASIC / 系统基础信息${R}\n"
  echo "────────────────────────────────────────────────────────────────────────────"
  uname -a || true
  echo
  ip -br addr 2>/dev/null || true
  echo
  df -h / || true
  echo
  free -h || true
  pause
}

# ----------------------------- interactive TUI ------------------------------
current_section=1
selected=0

section_names=("BASIC" "PROTOCOL" "CHECK" "BACKUP" "DOWNLOAD" "RELAY" "TUNE" "EXIT")
section_colors=("$CYN" "$MAG" "$GRN" "$YLW" "$BLU" "$MAG" "$YLW" "$RED")

# item format: number|hotkey|title|desc|action
items_basic=(
  "01|1|系统信息 / System Info|查看 IP、内存、磁盘、网卡|basic_info"
  "02|L|进入 legacy 原主菜单|保留 v1.2.6 / v1.2.x 原功能|run_legacy"
)
items_protocol=(
  "05|T|Trojan 443 / T 协议|原稳定功能；调用 legacy|run_legacy_quick trojan"
  "06|V|VLESS Reality Vision / V 协议|原 VLESS-R 功能；调用 legacy|run_legacy_quick vless-guide"
  "07|H|Hysteria2 8443 / H 协议|原 H 协议功能；调用 legacy|run_legacy_quick hysteria2"
  "08|A|AnyTLS TCP/TLS / A 协议|sing-box inbound；稳定线|quick_anytls"
  "09|U|TUIC v5 UDP/QUIC / TUIC 协议|sing-box inbound；高速 UDP 测试线|quick_tuic"
  "10|D|AnyTLS + TUIC 双协议|同机部署 A + TUIC，输出两组配置|quick_dual"
)
items_check=(
  "21|S|服务与端口状态|检查 sing-box/xray/hysteria 与监听端口|quick_status"
  "22|P|输出目录检查|查看 /opt/lazy-vps-menu/outputs|download_local"
)
items_backup=(
  "31|B|打包输出配置|打包 outputs 为 /root/lazyvps-config.tar.gz|download_local"
  "32|L|进入 legacy 备份功能|调用旧版备份/回滚模块|run_legacy"
)
items_download=(
  "41|O|下载配置 / HTTP 8088|SCP 打包或临时 HTTP 下载|download_local"
)
items_relay=(
  "51|R|进入 legacy RELAY|AI 分流 / 中继相关旧功能|run_legacy"
)
items_tune=(
  "61|N|进入 legacy TUNE|BBR / 网络优化旧功能|run_legacy"
)
items_exit=(
  "00|Q|退出 LazyVPS|Exit|exit 0"
)

get_items(){
  case "$current_section" in
    0) printf '%s\n' "${items_basic[@]}" ;;
    1) printf '%s\n' "${items_protocol[@]}" ;;
    2) printf '%s\n' "${items_check[@]}" ;;
    3) printf '%s\n' "${items_backup[@]}" ;;
    4) printf '%s\n' "${items_download[@]}" ;;
    5) printf '%s\n' "${items_relay[@]}" ;;
    6) printf '%s\n' "${items_tune[@]}" ;;
    7) printf '%s\n' "${items_exit[@]}" ;;
  esac
}

count_items(){ get_items | wc -l | tr -d ' '; }

print_sections(){
  local i label color
  for i in "${!section_names[@]}"; do
    color="${section_colors[$i]}"; label="${section_names[$i]}"
    if [[ "$i" -eq "$current_section" ]]; then
      printf "${REV}${color}[%d %s]${R} " "$((i+1))" "$label"
    else
      printf "${color}[%d %s]${R} " "$((i+1))" "$label"
    fi
  done
  echo
}

draw_menu(){
  local idx=0 line num key title desc action color
  banner
  echo "操作：↑↓ 选择  ←→ 切换分区  Enter 执行  数字直达  T/V/H/A/U/D 热键  Q 退出"
  echo
  print_sections
  echo
  color="${section_colors[$current_section]}"
  printf "${color}${B}%s / 功能区${R}\n" "${section_names[$current_section]}"
  echo "────────────────────────────────────────────────────────────────────────────"
  while IFS='|' read -r num key title desc action; do
    [[ -n "$num" ]] || continue
    if [[ "$idx" -eq "$selected" ]]; then
      printf "${REV} ▶ %s  %-42s [%s]${R}\n" "$num" "$title" "$key"
      printf "     ${DIM}%s${R}\n" "$desc"
    else
      printf "   ${color}%s${R}  %-42s ${DIM}[%s]${R}\n" "$num" "$title" "$key"
      printf "     ${DIM}%s${R}\n" "$desc"
    fi
    idx=$((idx+1))
  done < <(get_items)
  echo "────────────────────────────────────────────────────────────────────────────"
  printf "${DIM}当前版本：%s${R}\n" "$VER"
}

execute_item_line(){
  local line="$1" num key title desc action cmd args
  IFS='|' read -r num key title desc action <<< "$line"
  [[ -n "${action:-}" ]] || return 1
  read -r cmd args <<< "$action"
  case "$cmd" in
    exit) exit 0 ;;
    run_legacy_quick) run_legacy_quick "$args"; pause ;;
    run_legacy) run_legacy; pause ;;
    quick_anytls) quick_anytls; pause ;;
    quick_tuic) quick_tuic; pause ;;
    quick_dual) quick_dual; pause ;;
    quick_status) quick_status; pause ;;
    download_local) download_local ;;
    basic_info) basic_info ;;
    *) warn "未知动作：$action"; pause ;;
  esac
}

execute_selected(){
  local line
  line="$(get_items | sed -n "$((selected+1))p")"
  execute_item_line "$line"
}

execute_by_number_or_key(){
  local input="${1:-}" line num key title desc action all_sections s
  [[ -z "$input" ]] && return 1
  case "${input,,}" in
    q|quit|exit) exit 0 ;;
    left) current_section=$(( (current_section + 7) % 8 )); selected=0; return 0 ;;
    right) current_section=$(( (current_section + 1) % 8 )); selected=0; return 0 ;;
  esac
  # section number direct: 1..7 switch section; 8 exits like the classic menu
  if [[ "$input" == "8" ]]; then exit 0; fi
  if [[ "$input" =~ ^[1-7]$ ]]; then current_section=$((input-1)); selected=0; return 0; fi
  # quick protocol aliases
  case "${input,,}" in
    t) run_legacy_quick trojan; pause; return 0 ;;
    v) run_legacy_quick vless-guide; pause; return 0 ;;
    h) run_legacy_quick hysteria2; pause; return 0 ;;
    a) quick_anytls; pause; return 0 ;;
    u|tuic) quick_tuic; pause; return 0 ;;
    d|dual|anytls-tuic|tuic-anytls) quick_dual; pause; return 0 ;;
    s|status) quick_status; pause; return 0 ;;
    o|download) download_local; return 0 ;;
    l|legacy) run_legacy; pause; return 0 ;;
  esac
  # item number direct across all sections
  local orig_section="$current_section"
  for s in 0 1 2 3 4 5 6 7; do
    current_section="$s"
    while IFS='|' read -r num key title desc action; do
      [[ -n "$num" ]] || continue
      if [[ "$input" == "$num" || "$input" == "${num#0}" ]]; then
        execute_item_line "$num|$key|$title|$desc|$action"
        return 0
      fi
    done < <(get_items)
  done
  current_section="$orig_section"
  return 1
}

interactive_loop(){
  local key rest n input
  while true; do
    n="$(count_items)"; (( selected < n )) || selected=$((n-1)); (( selected >= 0 )) || selected=0
    draw_menu
    IFS= read -rsn1 key || true
    case "$key" in
      $'\x1b')
        IFS= read -rsn2 -t 0.05 rest || true
        case "$rest" in
          '[A') selected=$(( (selected + n - 1) % n )) ;; # up
          '[B') selected=$(( (selected + 1) % n )) ;;     # down
          '[C') current_section=$(( (current_section + 1) % 8 )); selected=0 ;; # right
          '[D') current_section=$(( (current_section + 7) % 8 )); selected=0 ;; # left
        esac
        ;;
      "") execute_selected ;;
      [0-9])
        input="$key"
        # collect a second digit if user is typing item number like 10/05
        IFS= read -rsn1 -t 0.35 rest || true
        if [[ "${rest:-}" =~ [0-9] ]]; then input+="$rest"; fi
        execute_by_number_or_key "$input" || { warn "无效编号：$input"; sleep 1; }
        ;;
      *) execute_by_number_or_key "$key" || { warn "无效输入：$key"; sleep 1; } ;;
    esac
  done
}

quick_dispatch(){
  case "${1:-}" in
    trojan|t) run_legacy_quick trojan ;;
    vless|vless-reality|v) run_legacy_quick vless-guide ;;
    hysteria2|h) run_legacy_quick hysteria2 ;;
    anytls|a) quick_anytls ;;
    tuic|u) quick_tuic ;;
    anytls-tuic|tuic-anytls|dual|d|multi) quick_dual ;;
    status|s) quick_status ;;
    download|http|o) download_local ;;
    legacy|l) run_legacy ;;
    version|-v|--version) echo "$VER" ;;
    *) err "未知 quick 命令：${1:-}"; echo "可用：trojan/vless/hysteria2/anytls/tuic/anytls-tuic/status/download/legacy"; return 1 ;;
  esac
}

main(){
  case "${1:-}" in
    --quick) quick_dispatch "${2:-}" ;;
    --version|-v) echo "$VER" ;;
    --legacy) run_legacy ;;
    *) interactive_loop ;;
  esac
}
main "$@"
