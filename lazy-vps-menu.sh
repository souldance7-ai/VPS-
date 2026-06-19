#!/usr/bin/env bash
#
# ==============================================================================
#  LazyVPS Quick Menu Pack / 懒人建 VPS 快速菜单包
#  Formal Version: v1.2
#  Update Date: 2026-06-19
# ==============================================================================
#
#  设计原则：
#   - 不内置任何个人 IP / 私有域名 / 密码
#   - Trojan 443 核心写法保留已验证稳定版本
#   - 已存在 Trojan 配置时，默认继承当前服务端真实密码，不自动换密
#   - 所有远程服务器地址必须由使用者手动输入
#   - 输出文件明确区分：可导入配置 / 不可导入片段 / 服务端备份
#
#  快速运行：
#   chmod +x lazy-vps-menu.sh
#   bash lazy-vps-menu.sh
#
#  快速命令：
#   bash lazy-vps-menu.sh --quick trojan
#   bash lazy-vps-menu.sh --quick export
#   bash lazy-vps-menu.sh --quick http
#   bash lazy-vps-menu.sh --quick remote-merge
#   bash lazy-vps-menu.sh --quick diagnose
#
# ==============================================================================

set -o pipefail

APP="懒人建 VPS 快速菜单包"
VER="正式 v1.2 · 服务端 AI 分流版"
UPDATE_DATE="2026-06-19"

ROOT="/opt/lazy-vps-menu"
OUT="$ROOT/outputs"
BAK="$ROOT/backups"
HTTP_DIR="$ROOT/http-download"
LOG="$ROOT/lazy-vps.log"

XRAY="/usr/local/bin/xray"
XDIR="/usr/local/etc/xray"
XCONF="$XDIR/config.json"

HYDIR="/etc/hysteria"
HYCONF="$HYDIR/config.yaml"

BBR_CONF="/etc/sysctl.d/99-lazy-bbr.conf"

HTTP_PORT="8088"
HTTP_PID="/tmp/lazy-vps-http.pid"

FORWARD_RULES="/etc/lazy-vps-forward.rules"
FORWARD_APPLY="/usr/local/sbin/lazy-vps-forward-apply.sh"
FORWARD_SERVICE="/etc/systemd/system/lazy-vps-forward.service"
FW_BACKEND_CONF="$ROOT/firewall_backend.conf"
FW_OPEN_PORTS="$ROOT/firewall_open_ports.list"

mkdir -p "$ROOT" "$OUT" "$BAK" "$HTTP_DIR" /var/log/xray 2>/dev/null || true
touch "$LOG" 2>/dev/null || true

R=$'\033[0m'
B=$'\033[1m'
DIM=$'\033[2m'
REV=$'\033[7m'
RED=$'\033[31m'
GRN=$'\033[32m'
YLW=$'\033[33m'
BLU=$'\033[34m'
MAG=$'\033[35m'
CYN=$'\033[36m'
WHT=$'\033[37m'

ok()   { printf "${GRN}[完成]${R} %s\n" "$1"; }
info() { printf "${GRN}[信息]${R} %s\n" "$1"; }
warn() { printf "${YLW}[警告]${R} %s\n" "$1"; }
err()  { printf "${RED}[错误]${R} %s\n" "$1"; }
note() { printf "${BLU}[说明]${R} %s\n" "$1"; }
step() { printf "\n${CYN}==> %s${R}\n" "$1"; }
pause(){ echo; read -rp "按 Enter 返回菜单..." _; }
log()  { echo "[$(date '+%F %T')] $1" >> "$LOG" 2>/dev/null || true; }

solid_line(){
  local color="${1:-$CYN}"
  printf "%b%s%b\n" "$color" "────────────────────────────────────────────────────────────────────────────" "$R"
}

section(){
  echo
  solid_line "$CYN"
  printf "${CYN}${B} %s${R}\n" "$1"
  solid_line "$CYN"
}

need_root(){
  [[ "$EUID" -eq 0 ]] || { err "请先 sudo -i 或使用 root 执行。"; exit 1; }
}

has(){ command -v "$1" >/dev/null 2>&1; }

rand_pass(){
  openssl rand -base64 32 | tr -dc 'A-Za-z0-9' | head -c 24
}

ts(){ date '+%Y%m%d_%H%M%S'; }

ip4(){
  local ip
  ip="$(curl -4 -s --max-time 5 https://ifconfig.me 2>/dev/null || true)"
  [[ -n "$ip" ]] || ip="$(curl -4 -s --max-time 5 https://api.ipify.org 2>/dev/null || true)"
  [[ -n "$ip" ]] || ip="$(ip route get 1.1.1.1 2>/dev/null | grep -oP 'src \K[0-9.]+' | head -1 || true)"
  echo "$ip"
}

ask(){
  local p="$1" d="$2" v
  printf "${YLW}%s${R} [默认: %s]: " "$p" "$d" >&2
  read -r v
  echo "${v:-$d}"
}

ask_required(){
  local p="$1" v
  while true; do
    printf "${YLW}%s${R}: " "$p" >&2
    read -r v
    if [[ -n "$v" ]]; then
      echo "$v"
      return 0
    fi
    err "此项不能为空。"
  done
}

valid_port(){
  [[ "$1" =~ ^[0-9]+$ ]] && (( "$1" >= 1 && "$1" <= 65535 ))
}

clean_line(){
  printf "%s" "$1" | tr '\r\n|' '   ' | sed 's/[[:space:]][[:space:]]*/ /g;s/^ //;s/ $//;s/"/”/g'
}

yaml_quote(){
  local s
  s="$(clean_line "$1")"
  printf '"%s"' "$s"
}

fw_backend_default(){
  if [[ -f "$FW_BACKEND_CONF" ]]; then
    awk -F= '/^firewall_backend=/{print toupper($2)}' "$FW_BACKEND_CONF" | head -1
  else
    echo "AUTO"
  fi
}

fw_backend_save(){
  local mode="$1"
  mode="$(printf "%s" "$mode" | tr 'a-z' 'A-Z')"
  case "$mode" in
    AUTO|UFW|NFT|IPTABLES|NONE) ;;
    *) mode="AUTO" ;;
  esac
  mkdir -p "$ROOT"
  echo "firewall_backend=$mode" > "$FW_BACKEND_CONF"
  ok "防火墙后端已保存：$mode"
}

fw_backend_choose(){
  local cur ans
  cur="$(fw_backend_default)"
  echo
  printf "${CYN}请选择防火墙后端 / Firewall Backend：${R}\n"
  printf "  1) AUTO      自动判断，优先使用当前系统环境\n"
  printf "  2) UFW       新手默认，适合 Debian / Ubuntu 快速放行端口\n"
  printf "  3) NFT       新 Debian / 中转推荐，使用 nftables 管理端口和转发\n"
  printf "  4) IPTABLES  兼容旧系统，使用 iptables 管理端口和转发\n"
  printf "  5) NONE      不改防火墙，只输出提示\n"
  read -rp "序号 [当前/默认: $cur]: " ans
  case "${ans:-}" in
    1) fw_backend_save "AUTO" ;;
    2) fw_backend_save "UFW" ;;
    3) fw_backend_save "NFT" ;;
    4) fw_backend_save "IPTABLES" ;;
    5) fw_backend_save "NONE" ;;
    "") fw_backend_save "$cur" ;;
    *) warn "输入无效，保持 $cur"; fw_backend_save "$cur" ;;
  esac
}

fw_backend_resolve(){
  local mode
  mode="$(fw_backend_default)"
  mode="$(printf "%s" "$mode" | tr 'a-z' 'A-Z')"

  if [[ "$mode" != "AUTO" ]]; then
    echo "$mode"
    return 0
  fi

  if has ufw && ufw status 2>/dev/null | grep -qw "active"; then
    echo "UFW"
  elif has nft; then
    echo "NFT"
  elif has iptables; then
    echo "IPTABLES"
  elif has ufw; then
    echo "UFW"
  else
    echo "NONE"
  fi
}

nft_ensure_include(){
  mkdir -p /etc/nftables.d
  if [[ ! -f /etc/nftables.conf ]]; then
    cat > /etc/nftables.conf <<'EOF'
#!/usr/sbin/nft -f
flush ruleset
include "/etc/nftables.d/*.nft"
EOF
  elif ! grep -qF 'include "/etc/nftables.d/*.nft"' /etc/nftables.conf; then
    echo 'include "/etc/nftables.d/*.nft"' >> /etc/nftables.conf
  fi
  systemctl enable nftables >/dev/null 2>&1 || true
}

fw_record_port(){
  local port="$1" proto="$2"
  valid_port "$port" || return 1
  mkdir -p "$ROOT"
  touch "$FW_OPEN_PORTS"
  grep -qx "${proto}|${port}" "$FW_OPEN_PORTS" 2>/dev/null || echo "${proto}|${port}" >> "$FW_OPEN_PORTS"
}

nft_render_ports(){
  local conf="/etc/nftables.d/lazy-vps-ports.nft"
  local tcp_ports udp_ports
  nft_ensure_include

  tcp_ports="$(awk -F'|' '$1=="tcp"{print $2}' "$FW_OPEN_PORTS" 2>/dev/null | sort -n | paste -sd, -)"
  udp_ports="$(awk -F'|' '$1=="udp"{print $2}' "$FW_OPEN_PORTS" 2>/dev/null | sort -n | paste -sd, -)"

  cat > "$conf" <<EOF
#!/usr/sbin/nft -f
table inet lazy_vps_ports {
  chain input {
    type filter hook input priority 0; policy accept;
EOF

  if [[ -n "$tcp_ports" ]]; then
    echo "    tcp dport { ${tcp_ports} } accept" >> "$conf"
  fi
  if [[ -n "$udp_ports" ]]; then
    echo "    udp dport { ${udp_ports} } accept" >> "$conf"
  fi

  cat >> "$conf" <<'EOF'
  }
}
EOF

  nft delete table inet lazy_vps_ports 2>/dev/null || true
  nft -f "$conf" || warn "nft 端口规则加载失败，请手动检查：$conf"
  systemctl restart nftables 2>/dev/null || true
}

iptables_open_port(){
  local port="$1" proto="$2"
  iptables -C INPUT -p "$proto" --dport "$port" -j ACCEPT 2>/dev/null || \
    iptables -I INPUT -p "$proto" --dport "$port" -j ACCEPT 2>/dev/null || true

  if has ip6tables; then
    ip6tables -C INPUT -p "$proto" --dport "$port" -j ACCEPT 2>/dev/null || \
      ip6tables -I INPUT -p "$proto" --dport "$port" -j ACCEPT 2>/dev/null || true
  fi

  if has netfilter-persistent; then
    netfilter-persistent save >/dev/null 2>&1 || true
  elif has iptables-save && [[ -d /etc/iptables ]]; then
    iptables-save > /etc/iptables/rules.v4 2>/dev/null || true
  fi
}

fw_open_port(){
  local port="$1" proto="$2" be
  valid_port "$port" || { warn "端口无效，跳过：$port"; return 1; }
  proto="${proto:-tcp}"
  be="$(fw_backend_resolve)"

  case "$be" in
    NONE)
      warn "防火墙后端为 NONE，未自动放行 ${port}/${proto}。请自行确认安全组/防火墙。"
      ;;
    UFW)
      if has ufw; then
        ufw allow "${port}/${proto}" >/dev/null 2>&1 || true
        info "UFW 已放行：${port}/${proto}"
      else
        warn "未安装 UFW，无法放行 ${port}/${proto}"
      fi
      ;;
    NFT)
      fw_record_port "$port" "$proto"
      nft_render_ports
      info "NFT 已写入放行：${port}/${proto}"
      ;;
    IPTABLES)
      iptables_open_port "$port" "$proto"
      info "iptables 已放行：${port}/${proto}"
      ;;
    *)
      warn "未知防火墙后端：$be，未处理 ${port}/${proto}"
      ;;
  esac
}

fw_open_tcp_udp(){
  local port="$1"
  fw_open_port "$port" "tcp"
  fw_open_port "$port" "udp"
}

fw_configure_backend(){
  section "防火墙后端配置 / Firewall Backend"
  note "可选择 AUTO / UFW / NFT / IPTABLES / NONE。"
  note "AUTO 会根据系统环境自动判断；NONE 不修改防火墙，只输出提醒。"

  fw_backend_choose
  local be
  be="$(fw_backend_resolve)"
  info "当前解析后的实际后端：$be"

  case "$be" in
    UFW)
      note "UFW 模式：适合新手快速放行常用端口。"
      ufw --force reset >/dev/null 2>&1 || true
      ufw default deny incoming >/dev/null 2>&1 || true
      ufw default allow outgoing >/dev/null 2>&1 || true
      ;;
    NFT)
      note "NFT 模式：适合新 Debian 与中转规则。"
      nft_ensure_include
      ;;
    IPTABLES)
      note "IPTABLES 模式：兼容旧系统。"
      ;;
    NONE)
      warn "NONE 模式：不会修改任何防火墙规则。"
      ;;
  esac

  fw_open_port 22 tcp
  fw_open_port 443 tcp
  fw_open_port 8443 tcp
  fw_open_port 8443 udp
  fw_open_port "$HTTP_PORT" tcp

  if [[ "$be" == "UFW" ]]; then
    ufw --force enable >/dev/null 2>&1 || true
    ufw status
  elif [[ "$be" == "NFT" ]]; then
    nft list table inet lazy_vps_ports 2>/dev/null || true
  elif [[ "$be" == "IPTABLES" ]]; then
    iptables -S INPUT | grep -E 'dport (22|443|8443|8088)' || true
  fi
}

strip_ansi(){
  printf "%b" "$1" | sed -E $'s/\x1B\\[[0-9;]*[mK]//g'
}

cover_line(){
  local content="$1"
  local width=76
  local plain len pad

  plain="$(strip_ansi "$content")"
  len=${#plain}
  pad=$((width - len))
  (( pad < 0 )) && pad=0

  printf "${CYN}│${R}"
  printf "%b" "$content"
  printf "%*s" "$pad" ""
  printf "${CYN}│${R}\n"
}

display_ip(){
  if [[ "${PREVIEW_MODE:-0}" == "1" ]]; then
    echo "AUTO-DETECT"
  else
    ip4
  fi
}

banner(){
  clear

  printf "${CYN}┌────────────────────────────────────────────────────────────────────────────┐${R}\n"

  cover_line "${CYN}      _        _      _____  __   __${MAG}      __     __  ____   ____${R}"
  cover_line "${CYN}     | |      / \\    |__  /  \\ \\ / /${MAG}      \\ \\   / / |  _ \\ / ___|${R}"
  cover_line "${CYN}     | |     / _ \\     / /    \\ V /${MAG}        \\ \\ / /  | |_) |\\___ \\${R}"
  cover_line "${CYN}     | |___ / ___ \\   / /_     | |${MAG}          \\ V /   |  __/  ___) |${R}"
  cover_line "${CYN}     |_____/_/   \\_\\ /____|    |_|${MAG}           \\_/    |_|    |____/${R}"
  cover_line ""

  cover_line "${YLW}               \\   |   /${R}${MAG}                              z  z${R}"
  cover_line "${YLW}             '.    O    .'${R}${MAG}                       ______o${R}"
  cover_line "${YLW}          ----    /|\\    ----${R}${GRN}          _\\|/_${R}${MAG}    /_____/|\\___${R}"
  cover_line "${YLW}                  / \\${R}${GRN}                  /|\\${R}${MAG}     /_____/ |    /${R}"
  cover_line "${GRN}                                      / | \\${R}${MAG}    \\     / /___/${R}"
  cover_line "${CYN}             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~${R}"
  cover_line "${YLW}                   SUN  .  SAND${R}${WHT}  .  ${CYN}CODE${R}${WHT}  .  ${MAG}RELAX${R}"

  printf "${CYN}└────────────────────────────────────────────────────────────────────────────┘${R}\n"
  printf "${GRN}${B}   懒人建 VPS 快速菜单包${R}  ${YLW}${B}正式 v1.1${R}  ${DIM}2026-06-19${R}\n"
  printf "   ${CYN}少折腾${R}  ·  ${MAG}快部署${R}  ·  ${GRN}可回滚${R}  ·  ${YLW}可分享${R}\n"
  solid_line "$CYN"
}

install_base(){
  section "系统初始化 / Install Base Packages"
  note "安装 curl / wget / openssl / ufw / tcpdump / jq / python3 等常用工具。"
  if has apt-get; then
    apt-get update -y
    DEBIAN_FRONTEND=noninteractive apt-get install -y curl wget unzip tar socat cron ca-certificates openssl ufw htop tcpdump jq iproute2 python3 openssh-client nftables openssl
  elif has dnf; then
    dnf install -y curl wget unzip tar socat cronie ca-certificates openssl ufw htop tcpdump jq iproute python3 openssh-client nftables openssls
  elif has yum; then
    yum install -y curl wget unzip tar socat cronie ca-certificates openssl ufw htop tcpdump jq iproute python3 openssh-client nftables openssls
  else
    err "未识别包管理器，请手动安装基础套件。"
    return 1
  fi
  ok "基础套件完成。"
}

enable_ssh(){
  section "确认 SSH root/password 登录 / SSH Check"
  if [[ -f /etc/ssh/sshd_config ]]; then
    sed -i 's/^#*PermitRootLogin.*/PermitRootLogin yes/' /etc/ssh/sshd_config
    sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication yes/' /etc/ssh/sshd_config
    systemctl restart ssh 2>/dev/null || systemctl restart sshd 2>/dev/null || true
    ok "SSH 配置已检查。"
  else
    warn "未找到 /etc/ssh/sshd_config，跳过。"
  fi
}

ufw_basic(){
  fw_configure_backend
}

bbr(){
  section "开启 BBR + fq / Stable TCP"
  note "启用 Linux 原生 BBR + fq，保守稳定，不更换内核。"
  modprobe tcp_bbr 2>/dev/null || true
  cat > "$BBR_CONF" <<'EOF'
net.core.default_qdisc=fq
net.ipv4.tcp_congestion_control=bbr
net.ipv4.tcp_slow_start_after_idle=0
net.ipv4.tcp_fastopen=3
EOF
  sysctl --system >/dev/null 2>&1 || true
  sysctl net.ipv4.tcp_congestion_control 2>/dev/null || true
  sysctl net.core.default_qdisc 2>/dev/null || true
  lsmod | grep bbr || true
}

init_system(){
  install_base || return 1
  enable_ssh
  ufw_basic
  bbr
}

backup_all(){
  section "备份当前配置 / Backup Current Config"
  for f in "$XCONF" "$HYCONF" "$BBR_CONF"; do
    [[ -f "$f" ]] && cp -a "$f" "$BAK/$(echo "$f"|sed 's#/#_#g;s#^_##').$(ts).bak" 2>/dev/null || true
  done
  ok "备份目录：$BAK"
}

pick_region(){
  echo >&2
  printf "${CYN}请选择地区 / Region：${R}\n" >&2
  printf "  1) [JP] 日本 / Japan\n" >&2
  printf "  2) [HK] 香港 / Hong Kong\n" >&2
  printf "  3) [TW] 台湾 / Taiwan\n" >&2
  printf "  4) [SG] 新加坡 / Singapore\n" >&2
  printf "  5) [KR] 韩国 / Korea\n" >&2
  printf "  6) [US] 美国 / United States\n" >&2
  printf "  7) [DE] 德国 / Germany\n" >&2
  printf "  8) 自定义 / Custom\n" >&2
  read -rp "序号 [默认:1]: " n
  n="${n:-1}"
  case "$n" in
    1) FLAG="🇯🇵"; AREA="日本"; AREA_CODE="JP";;
    2) FLAG="🇭🇰"; AREA="香港"; AREA_CODE="HK";;
    3) FLAG="🇹🇼"; AREA="台湾"; AREA_CODE="TW";;
    4) FLAG="🇸🇬"; AREA="新加坡"; AREA_CODE="SG";;
    5) FLAG="🇰🇷"; AREA="韩国"; AREA_CODE="KR";;
    6) FLAG="🇺🇸"; AREA="美国"; AREA_CODE="US";;
    7) FLAG="🇩🇪"; AREA="德国"; AREA_CODE="DE";;
    8)
      read -rp "国旗/图标 [🌐]: " FLAG; FLAG="${FLAG:-🌐}"
      read -rp "地区名 [未知]: " AREA; AREA="${AREA:-未知}"
      read -rp "地区代码 [XX]: " AREA_CODE; AREA_CODE="${AREA_CODE:-XX}"
      ;;
    *) FLAG="🇯🇵"; AREA="日本"; AREA_CODE="JP";;
  esac
}

auto_name(){
  local code="$1" merchant useflag custom final ans
  read -rp "$(printf "${YLW}使用自动命名？${R} 格式：国旗 地区-商家-${code}协议 [Y/n]: ")" ans
  if [[ "$ans" =~ ^[Nn]$ ]]; then
    custom="$(ask "请输入完整节点名称" "🇯🇵 日本-自定义商家-${code}协议")"
    clean_line "$custom"
    return
  fi

  pick_region
  read -rp "$(printf "${YLW}节点名是否显示国旗？${R} [Y/n]: ")" useflag
  merchant="$(ask '商家/线路名，例如 Neburst / SKYROLL / 100TB / 自定义' '自定义商家')"
  merchant="$(clean_line "$merchant")"

  if [[ "$useflag" =~ ^[Nn]$ ]]; then
    final="${AREA}-${merchant}-${code}协议"
  else
    final="${FLAG} ${AREA}-${merchant}-${code}协议"
  fi
  clean_line "$final"
}

password_prefix(){
  local code="${AREA_CODE:-node}"
  code="$(printf "%s" "$code" | tr 'A-Z' 'a-z' | tr -cd 'a-z0-9')"
  [[ -n "$code" ]] || code="node"
  echo "$code"
}

get_current_trojan_value(){
  local key="$1"
  [[ -f "$XCONF" ]] || return 1
  has jq || return 1

  local proto
  proto="$(jq -r '.inbounds[0].protocol // empty' "$XCONF" 2>/dev/null || true)"
  [[ "$proto" == "trojan" ]] || return 1

  case "$key" in
    port) jq -r '.inbounds[0].port // empty' "$XCONF" 2>/dev/null ;;
    password) jq -r '.inbounds[0].settings.clients[0].password // empty' "$XCONF" 2>/dev/null ;;
    sni) jq -r '.inbounds[0].streamSettings.tlsSettings.serverName // "www.microsoft.com"' "$XCONF" 2>/dev/null ;;
    tag) jq -r '.inbounds[0].tag // empty' "$XCONF" 2>/dev/null ;;
    *) return 1 ;;
  esac
}

show_current_trojan_detected(){
  local cur_port cur_pass cur_sni
  cur_port="$(get_current_trojan_value port || true)"
  cur_pass="$(get_current_trojan_value password || true)"
  cur_sni="$(get_current_trojan_value sni || true)"

  if [[ -n "$cur_port" && -n "$cur_pass" ]]; then
    info "检测到当前已存在 Trojan 服务端配置："
    echo "  当前端口：${cur_port}"
    echo "  当前 SNI：${cur_sni:-www.microsoft.com}"
    echo "  当前密码：$(printf "%s" "$cur_pass" | sed 's/./*/g' | cut -c1-12)（已隐藏）"
    note "默认沿用当前端口 / SNI / 密码；除非明确选择轮换密码。"
    return 0
  fi
  return 1
}

fix_xray_log_perm(){
  step "修复 Xray 日志目录权限 / Fix Xray Log Permission"
  note "Xray systemd 默认可能使用 nobody 运行，日志无权限会导致 status=23。"
  mkdir -p /var/log/xray
  touch /var/log/xray/access.log /var/log/xray/error.log

  if getent group nogroup >/dev/null 2>&1; then
    chown -R nobody:nogroup /var/log/xray 2>/dev/null || true
  elif getent group nobody >/dev/null 2>&1; then
    chown -R nobody:nobody /var/log/xray 2>/dev/null || true
  else
    chown -R nobody /var/log/xray 2>/dev/null || true
  fi

  chmod 755 /var/log/xray 2>/dev/null || true
  chmod 664 /var/log/xray/access.log /var/log/xray/error.log 2>/dev/null || true
  ok "Xray 日志权限已修复。"
}

install_xray(){
  section "安装 / 更新 Xray-core"
  if [[ -x "$XRAY" ]]; then
    info "当前：$($XRAY version | head -1)"
    read -rp "是否更新 Xray？[y/N]: " ans
    [[ "$ans" =~ ^[Yy]$ ]] || { fix_xray_log_perm; return 0; }
  fi
  bash <(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)
  mkdir -p "$XDIR" /var/log/xray
  fix_xray_log_perm
  ok "Xray 已安装 / 更新。"
}

make_cert(){
  local sni="$1"
  mkdir -p "$XDIR"
  openssl req -x509 -newkey rsa:2048 -sha256 -days 3650 -nodes \
    -keyout "$XDIR/trojan-selfsigned.key" \
    -out "$XDIR/trojan-selfsigned.crt" \
    -subj "/CN=$sni" \
    -addext "subjectAltName=DNS:$sni" >/dev/null 2>&1
}

write_imports(){
  local node node_q
  node="$(grep -m1 '^- name:' "$OUT/latest_flclash_fragment.yaml" 2>/dev/null | sed 's/^- name:[[:space:]]*//' | sed 's/^"//;s/"$//')"
  [[ -n "$node" ]] || node="GF-Node"
  node_q="$(yaml_quote "$node")"

  cat > "$OUT/01_IMPORT_FLCLASH.yaml" <<EOF
# $APP $VER | Update: $UPDATE_DATE | 完整 FLClash 单节点配置
mixed-port: 7890
allow-lan: false
mode: rule
log-level: info
ipv6: false
unified-delay: true
tcp-concurrent: true

dns:
  enable: true
  listen: 127.0.0.1:1053
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  nameserver:
    - 223.5.5.5
    - 119.29.29.29
    - 1.1.1.1
    - 8.8.8.8

proxies:
EOF
  sed 's/^/  /' "$OUT/latest_flclash_fragment.yaml" >> "$OUT/01_IMPORT_FLCLASH.yaml"
  cat >> "$OUT/01_IMPORT_FLCLASH.yaml" <<EOF

proxy-groups:
  - name: GLOBAL
    type: select
    proxies:
      - ${node_q}
      - DIRECT
  - name: PROXY
    type: select
    proxies:
      - ${node_q}
      - DIRECT

rules:
  - MATCH,PROXY
EOF

  if [[ -f "$OUT/latest_surge_fragment.conf" ]]; then
    local sname
    sname="$(head -1 "$OUT/latest_surge_fragment.conf" | awk -F' = ' '{print $1}')"
    [[ -n "$sname" ]] || sname="$node"
    cat > "$OUT/02_IMPORT_SURGE.conf" <<EOF
; $APP $VER | Update: $UPDATE_DATE | 完整 Surge 单节点配置
[General]
loglevel = notify
ipv6 = false
test-timeout = 5
dns-server = 223.5.5.5, 119.29.29.29, 1.1.1.1, 8.8.8.8
skip-proxy = 127.0.0.1, localhost, *.local
internet-test-url = http://www.gstatic.com/generate_204
proxy-test-url = http://www.gstatic.com/generate_204

[Proxy]
$(cat "$OUT/latest_surge_fragment.conf")

[Proxy Group]
GLOBAL = select, ${sname}, DIRECT
PROXY = select, ${sname}, DIRECT

[Rule]
FINAL,PROXY
EOF
  fi
}

deploy_trojan(){
  section "部署 Trojan 443/TCP / Stable Trojan"
  note "Trojan 核心写法沿用已验证稳定版本。"
  note "若当前已有 Trojan 配置，默认继承当前服务端真实密码，不自动换密。"
  install_xray || return 1
  backup_all

  rm -f "$OUT"/*.yaml "$OUT"/*.conf 2>/dev/null || true

  local ip name port sni pass pfx cur_port cur_pass cur_sni rotate
  ip="$(ip4)"
  name="$(auto_name T)"

  cur_port="$(get_current_trojan_value port || true)"
  cur_pass="$(get_current_trojan_value password || true)"
  cur_sni="$(get_current_trojan_value sni || true)"

  if [[ -n "$cur_port" && -n "$cur_pass" ]]; then
    show_current_trojan_detected || true
    port="$(ask 'Trojan 端口：默认沿用当前服务端端口' "$cur_port")"
    sni="$(ask 'SNI：默认沿用当前服务端 SNI' "${cur_sni:-www.microsoft.com}")"
    read -rp "$(printf "${YLW}是否轮换 / 重置 Trojan 密码？${R} 默认不换，直接沿用当前密码 [y/N]: ")" rotate
    if [[ "$rotate" =~ ^[Yy]$ ]]; then
      pfx="$(password_prefix)"
      pass="$(ask '新 Trojan 密码' "${pfx}_$(rand_pass)")"
      warn "你选择了轮换密码，旧客户端配置会失效，必须重新导入新 01_IMPORT_FLCLASH.yaml。"
    else
      pass="$cur_pass"
      ok "已沿用当前服务端 Trojan 密码。"
    fi
  else
    warn "未检测到可继承的现有 Trojan 配置，将按新部署生成新密码。"
    port="$(ask 'Trojan 端口' '443')"
    sni="$(ask 'SNI' 'www.microsoft.com')"
    pfx="$(password_prefix)"
    pass="$(ask 'Trojan 密码' "${pfx}_$(rand_pass)")"
  fi

  valid_port "$port" || { err "端口无效"; return 1; }

  step "生成 TLS 自签证书"
  make_cert "$sni"

  step "写入 Xray Trojan 配置"
  cat > "$XCONF" <<EOF
{
  "log": {
    "loglevel": "warning",
    "access": "/var/log/xray/access.log",
    "error": "/var/log/xray/error.log"
  },
  "inbounds": [
    {
      "tag": "trojan-${port}-in",
      "listen": "0.0.0.0",
      "port": ${port},
      "protocol": "trojan",
      "settings": {
        "clients": [
          {
            "password": "${pass}"
          }
        ]
      },
      "streamSettings": {
        "network": "tcp",
        "security": "tls",
        "tlsSettings": {
          "serverName": "${sni}",
          "certificates": [
            {
              "certificateFile": "${XDIR}/trojan-selfsigned.crt",
              "keyFile": "${XDIR}/trojan-selfsigned.key"
            }
          ],
          "alpn": [
            "http/1.1"
          ]
        }
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",
      "tag": "direct"
    }
  ]
}
EOF

  chmod 755 /usr/local/etc "$XDIR"
  chmod 644 "$XCONF" "$XDIR/trojan-selfsigned.crt" "$XDIR/trojan-selfsigned.key"
  fw_open_port "$port" "tcp"

  fix_xray_log_perm
  step "检查配置并启动 Xray"
  "$XRAY" run -test -config "$XCONF" || return 1
  systemctl daemon-reload
  systemctl enable xray >/dev/null 2>&1 || true
  systemctl restart xray

  local name_q
  name_q="$(yaml_quote "$name")"
  cat > "$OUT/latest_flclash_fragment.yaml" <<EOF
- name: ${name_q}
  type: trojan
  server: ${ip}
  port: ${port}
  password: ${pass}
  sni: ${sni}
  skip-cert-verify: true
  udp: true
  network: tcp
  alpn:
    - http/1.1
  client-fingerprint: chrome
EOF

  cat > "$OUT/latest_surge_fragment.conf" <<EOF
${name} = trojan, ${ip}, ${port}, password=${pass}, sni=${sni}, skip-cert-verify=true, udp-relay=true, alpn=http/1.1
EOF

  cp "$OUT/latest_flclash_fragment.yaml" "$OUT/03_DO_NOT_IMPORT_NODE_FRAGMENT.yaml"
  write_imports

  ok "Trojan 部署完成。"
  note "本次客户端配置使用的是当前 Xray 服务端实际密码。"
  status_check
}

deploy_reality(){
  section "部署 VLESS Reality 443/TCP"
  install_xray || return 1
  backup_all
  rm -f "$OUT"/*.yaml "$OUT"/*.conf 2>/dev/null || true

  local ip name port sni uuid key priv pub sid
  ip="$(ip4)"
  name="$(auto_name R)"
  port="$(ask 'Reality 端口，建议 443' '443')"
  valid_port "$port" || { err "端口无效"; return 1; }
  sni="$(ask 'Reality serverName' 'www.microsoft.com')"

  uuid="$($XRAY uuid)"
  key="$($XRAY x25519)"
  priv="$(printf '%s\n' "$key" | grep -iE 'Private|PrivateKey' | awk '{print $NF}' | head -1)"
  pub="$(printf '%s\n' "$key" | grep -iE 'Public|Password' | awk '{print $NF}' | head -1)"
  sid="$(openssl rand -hex 8)"
  [[ -n "$priv" && -n "$pub" ]] || { err "Reality key 生成失败"; echo "$key"; return 1; }

  cat > "$XCONF" <<EOF
{
  "log": {"loglevel":"warning","access":"/var/log/xray/access.log","error":"/var/log/xray/error.log"},
  "inbounds":[{
    "tag":"vless-reality-${port}-in",
    "listen":"0.0.0.0",
    "port":${port},
    "protocol":"vless",
    "settings":{"clients":[{"id":"${uuid}","flow":"xtls-rprx-vision"}],"decryption":"none"},
    "streamSettings":{"network":"tcp","security":"reality","realitySettings":{"show":false,"dest":"${sni}:443","xver":0,"serverNames":["${sni}"],"privateKey":"${priv}","shortIds":["${sid}"]}}
  }],
  "outbounds":[{"protocol":"freedom","tag":"direct"}]
}
EOF

  chmod 755 /usr/local/etc "$XDIR"
  chmod 644 "$XCONF"
  fw_open_port "$port" "tcp"
  fix_xray_log_perm
  "$XRAY" run -test -config "$XCONF" || return 1
  systemctl daemon-reload
  systemctl enable xray >/dev/null 2>&1 || true
  systemctl restart xray

  local name_q
  name_q="$(yaml_quote "$name")"
  cat > "$OUT/latest_flclash_fragment.yaml" <<EOF
- name: ${name_q}
  type: vless
  server: ${ip}
  port: ${port}
  uuid: ${uuid}
  udp: true
  network: tcp
  tls: true
  flow: xtls-rprx-vision
  servername: ${sni}
  reality-opts:
    public-key: ${pub}
    short-id: ${sid}
  client-fingerprint: chrome
EOF
  write_imports
  ok "Reality 部署完成。"
  status_check
}

deploy_hy2(){
  section "部署 Hysteria2 8443/UDP"
  if [[ -x /usr/local/bin/hysteria ]]; then
    info "Hysteria2 已安装。"
  else
    bash <(curl -fsSL https://get.hy2.sh/)
  fi
  backup_all

  local ip name port sni pass pfx
  ip="$(ip4)"
  name="$(auto_name H)"
  port="$(ask 'Hysteria2 UDP 端口' '8443')"
  valid_port "$port" || { err "端口无效"; return 1; }
  sni="$(ask 'SNI' 'www.microsoft.com')"
  pfx="$(password_prefix)"
  pass="$(ask 'Hysteria2 密码' "hy2_${pfx}_$(rand_pass)")"

  mkdir -p "$HYDIR"
  openssl req -x509 -newkey rsa:2048 -sha256 -days 3650 -nodes \
    -keyout "$HYDIR/server.key" \
    -out "$HYDIR/server.crt" \
    -subj "/CN=$sni" \
    -addext "subjectAltName=DNS:$sni" >/dev/null 2>&1

  cat > "$HYCONF" <<EOF
listen: :${port}

tls:
  cert: ${HYDIR}/server.crt
  key: ${HYDIR}/server.key

auth:
  type: password
  password: ${pass}

masquerade:
  type: proxy
  proxy:
    url: https://${sni}/
    rewriteHost: true

quic:
  initStreamReceiveWindow: 8388608
  maxStreamReceiveWindow: 8388608
  initConnReceiveWindow: 20971520
  maxConnReceiveWindow: 20971520
EOF

  chmod 755 "$HYDIR"
  chmod 644 "$HYCONF" "$HYDIR/server.crt" "$HYDIR/server.key"
  fw_open_port "$port" "udp"
  systemctl daemon-reload
  systemctl enable hysteria-server >/dev/null 2>&1 || true
  systemctl restart hysteria-server

  local name_q
  name_q="$(yaml_quote "$name")"
  cat > "$OUT/latest_flclash_fragment.yaml" <<EOF
- name: ${name_q}
  type: hysteria2
  server: ${ip}
  port: ${port}
  password: ${pass}
  sni: ${sni}
  skip-cert-verify: true
  udp: true
EOF

  cat > "$OUT/latest_surge_fragment.conf" <<EOF
${name} = hysteria2, ${ip}, ${port}, password=${pass}, sni=${sni}, skip-cert-verify=true
EOF

  write_imports
  ok "Hysteria2 部署完成。"
  status_check
}

status_check(){
  section "状态检查 / Status"
  info "公网 IPv4：$(ip4)"
  echo
  info "端口监听："
  ss -lntup | grep -E ':22|:443|:8443|:9443|:8088' || true
  echo
  info "Xray："
  systemctl status xray --no-pager 2>/dev/null | head -35 || true
  echo
  info "Hysteria2："
  systemctl status hysteria-server --no-pager 2>/dev/null | head -25 || true
  echo
  info "防火墙后端：$(fw_backend_default) → 实际：$(fw_backend_resolve)"
  echo
  info "UFW："
  ufw status || true
  echo
  info "NFT lazy_vps_ports："
  nft list table inet lazy_vps_ports 2>/dev/null || true
  echo
  info "BBR："
  sysctl net.ipv4.tcp_congestion_control 2>/dev/null || true
  sysctl net.core.default_qdisc 2>/dev/null || true
  lsmod | grep bbr || true
}

show_outputs(){
  [[ -f "$OUT/latest_flclash_fragment.yaml" ]] && write_imports
  section "节点输出 / Export Files"
  info "FLClash 只导入：$OUT/01_IMPORT_FLCLASH.yaml"
  info "Surge 只导入：$OUT/02_IMPORT_SURGE.conf"
  echo
  ls -lh "$OUT" 2>/dev/null || true
  if [[ -f "$OUT/01_IMPORT_FLCLASH.yaml" ]]; then
    echo
    echo "---------- 01_IMPORT_FLCLASH.yaml 预览 ----------"
    head -120 "$OUT/01_IMPORT_FLCLASH.yaml"
    echo "------------------------------------------------"
  else
    warn "尚未生成导入文件，请先部署节点。"
  fi
}

export_pkg(){
  [[ -f "$OUT/latest_flclash_fragment.yaml" ]] && write_imports

  local ip now dir pkg
  ip="$(ip4)"
  now="$(ts)"
  dir="/root/LazyVPS_Node_Output_${ip}_${now}"
  pkg="${dir}.tar.gz"

  mkdir -p "$dir/DO_NOT_IMPORT_fragments" "$dir/server_config_backup" "$dir/status"
  [[ -f "$OUT/01_IMPORT_FLCLASH.yaml" ]] && cp "$OUT/01_IMPORT_FLCLASH.yaml" "$dir/01_IMPORT_FLCLASH.yaml"
  [[ -f "$OUT/02_IMPORT_SURGE.conf" ]] && cp "$OUT/02_IMPORT_SURGE.conf" "$dir/02_IMPORT_SURGE.conf"
  [[ -f "$OUT/latest_flclash_fragment.yaml" ]] && cp "$OUT/latest_flclash_fragment.yaml" "$dir/DO_NOT_IMPORT_fragments/"
  [[ -f "$XCONF" ]] && cp "$XCONF" "$dir/server_config_backup/xray_config_current.json"
  [[ -f "$HYCONF" ]] && cp "$HYCONF" "$dir/server_config_backup/hysteria_config_current.yaml"

  {
    echo "$APP $VER"
    echo "Update Date: $UPDATE_DATE"
    echo "生成时间：$(date '+%F %T')"
    echo "公网 IP：$ip"
    echo
    echo "端口监听："
    ss -lntup | grep -E ':22|:443|:8443|:9443|:8088' || true
    echo
    echo "UFW："
    ufw status || true
  } > "$dir/status/status_report.txt"

  cat > "$dir/README_先看这个.txt" <<EOF
请注意：

FLClash 只导入：
01_IMPORT_FLCLASH.yaml

Surge 只导入：
02_IMPORT_SURGE.conf

不要导入 DO_NOT_IMPORT_fragments 或 server_config_backup。
EOF

  tar -czf "$pkg" -C "$(dirname "$dir")" "$(basename "$dir")"
  cp "$pkg" /root/lazy-vps-output-latest.tar.gz

  mkdir -p "$HTTP_DIR"
  rm -f "$HTTP_DIR"/*
  cp /root/lazy-vps-output-latest.tar.gz "$HTTP_DIR/lazy-vps-output-latest.tar.gz"
  [[ -f "$OUT/01_IMPORT_FLCLASH.yaml" ]] && cp "$OUT/01_IMPORT_FLCLASH.yaml" "$HTTP_DIR/01_IMPORT_FLCLASH.yaml"
  [[ -f "$OUT/02_IMPORT_SURGE.conf" ]] && cp "$OUT/02_IMPORT_SURGE.conf" "$HTTP_DIR/02_IMPORT_SURGE.conf"

  ok "导出完成：$pkg"
  echo
  echo "Windows CMD 下载整包："
  echo "scp root@$ip:/root/lazy-vps-output-latest.tar.gz \"%USERPROFILE%\\Downloads\\lazy-vps-output-latest.tar.gz\""
  echo
  read -rp "是否开启 HTTP 下载？[Y/n]: " ans
  [[ "$ans" =~ ^[Nn]$ ]] || http_start
}

http_start(){
  local ip
  ip="$(ip4)"
  mkdir -p "$HTTP_DIR"
  if [[ ! -f /root/lazy-vps-output-latest.tar.gz ]]; then
    warn "未发现导出包，正在自动导出。"
    export_pkg >/dev/null 2>&1 || true
  fi
  cp -f /root/lazy-vps-output-latest.tar.gz "$HTTP_DIR/" 2>/dev/null || true
  [[ -f "$OUT/01_IMPORT_FLCLASH.yaml" ]] && cp -f "$OUT/01_IMPORT_FLCLASH.yaml" "$HTTP_DIR/"
  [[ -f "$OUT/02_IMPORT_SURGE.conf" ]] && cp -f "$OUT/02_IMPORT_SURGE.conf" "$HTTP_DIR/"
  [[ -f "$HTTP_PID" ]] && kill "$(cat "$HTTP_PID")" 2>/dev/null || true
  fw_open_port "$HTTP_PORT" "tcp"
  (cd "$HTTP_DIR" && nohup python3 -m http.server "$HTTP_PORT" --bind 0.0.0.0 >/tmp/lazy-vps-http.log 2>&1 & echo $! > "$HTTP_PID")
  ok "HTTP 下载已开启。"
  echo "FLClash: http://$ip:$HTTP_PORT/01_IMPORT_FLCLASH.yaml"
  echo "Surge:    http://$ip:$HTTP_PORT/02_IMPORT_SURGE.conf"
  echo "整包:     http://$ip:$HTTP_PORT/lazy-vps-output-latest.tar.gz"
}

http_stop(){
  [[ -f "$HTTP_PID" ]] && kill "$(cat "$HTTP_PID")" 2>/dev/null || true
  rm -f "$HTTP_PID"
  ok "HTTP 下载已停止。"
}

nodequality(){
  section "NodeQuality 酒神一键测试"
  note "运行：bash <(curl -sL https://run.NodeQuality.com)"
  read -rp "开始？[Y/n]: " ans
  [[ "$ans" =~ ^[Nn]$ ]] || bash <(curl -sL https://run.NodeQuality.com)
}

ensure_yaml(){
  python3 - <<'PY' >/dev/null 2>&1
import yaml
PY
  [[ $? -eq 0 ]] && return 0
  warn "安装 python3-yaml。"
  if has apt-get; then
    apt-get update -y >/dev/null 2>&1 || true
    apt-get install -y python3-yaml
  elif has dnf; then
    dnf install -y python3-yaml
  elif has yum; then
    yum install -y python3-yaml
  else
    err "无法自动安装 python3-yaml。"
    return 1
  fi
}

merge_python(){
  local base="$1" frag="$2" out="$3" groups="$4"
  python3 - "$base" "$frag" "$out" "$groups" <<'PY'
import sys, yaml
base, frag, out, groups = sys.argv[1:5]
cfg = yaml.safe_load(open(base, encoding="utf-8")) or {}
fr = yaml.safe_load(open(frag, encoding="utf-8")) or []
node = fr[0] if isinstance(fr, list) else fr
name = node["name"]

cfg.setdefault("proxies", [])
cfg["proxies"] = [p for p in cfg["proxies"] if not (isinstance(p, dict) and p.get("name") == name)]
cfg["proxies"].append(node)

targets = [x.strip() for x in groups.split(",") if x.strip()]
cfg.setdefault("proxy-groups", [])
for g in cfg.get("proxy-groups", []):
    if not isinstance(g, dict):
        continue
    if g.get("name") in targets:
        ps = g.setdefault("proxies", [])
        ps[:] = [x for x in ps if x != name]
        if "DIRECT" in ps:
            ps.insert(ps.index("DIRECT"), name)
        else:
            ps.append(name)

yaml.safe_dump(cfg, open(out, "w", encoding="utf-8"), allow_unicode=True, sort_keys=False, width=140)
print(name)
PY
}

merge_local_config(){
  section "本机总配置合并 / Local Merge"
  note "适用：总配置 sub.yaml 就在当前 VPS。"
  [[ -f "$OUT/latest_flclash_fragment.yaml" ]] || { err "请先部署节点。"; return 1; }
  ensure_yaml || return 1

  local base out groups
  base="$(ask '现有总配置路径' '/root/sub.yaml')"
  [[ -f "$base" ]] || { err "找不到 $base"; return 1; }
  out="$(ask '合并后输出路径' '/root/sub_merged.yaml')"
  groups="$(ask '加入策略组，英文逗号分隔' 'GLOBAL,PROXY,AI,Media,Japan')"

  merge_python "$base" "$OUT/latest_flclash_fragment.yaml" "$out" "$groups" || return 1
  ok "合并完成：$out"
  mkdir -p "$HTTP_DIR"
  cp "$out" "$HTTP_DIR/sub_merged.yaml"
  echo "可下载：http://$(ip4):$HTTP_PORT/sub_merged.yaml"
}

merge_remote_config(){
  section "总配置在其他 VPS：远程合并 / Remote Merge"
  note "适用：当前 VPS 是新节点，总配置 sub.yaml 在另一台 VPS / 订阅服务器。"
  note "本功能不内置任何个人 IP / 域名，必须由使用者手动输入远程地址。"

  [[ -f "$OUT/latest_flclash_fragment.yaml" ]] || { err "请先部署节点。"; return 1; }
  ensure_yaml || return 1

  local remote_user remote_host remote_cfg local_base local_out groups publish_path do_publish
  remote_user="$(ask '远程 VPS 用户' 'root')"
  remote_host="$(ask_required '远程 VPS IP / 域名（总配置所在服务器，例如 sub.example.com）')"
  remote_cfg="$(ask '远程总配置路径' '/root/sub.yaml')"
  local_base="/tmp/lazy_remote_sub_$(ts).yaml"
  local_out="/tmp/lazy_remote_sub_merged_$(ts).yaml"
  groups="$(ask '加入策略组，英文逗号分隔' 'GLOBAL,PROXY,AI,Media,Japan')"

  step "从远程下载总配置"
  scp "${remote_user}@${remote_host}:${remote_cfg}" "$local_base" || { err "下载失败。"; return 1; }

  step "合并当前最新节点"
  merge_python "$local_base" "$OUT/latest_flclash_fragment.yaml" "$local_out" "$groups" || return 1

  step "上传合并后的总配置"
  scp "$local_out" "${remote_user}@${remote_host}:${remote_cfg}" || { err "上传失败。"; return 1; }
  ok "已上传回远程：${remote_host}:${remote_cfg}"

  read -rp "是否同步发布到 Web 订阅目录？例如 /var/www/html/sub.yaml [y/N]: " do_publish
  if [[ "$do_publish" =~ ^[Yy]$ ]]; then
    publish_path="$(ask '远程 Web 订阅路径' '/var/www/html/sub.yaml')"
    ssh "${remote_user}@${remote_host}" "cp '${remote_cfg}' '${publish_path}' && chmod 644 '${publish_path}' && (systemctl reload nginx 2>/dev/null || systemctl restart nginx 2>/dev/null || true)"
    ok "已尝试发布到：${publish_path}"
  fi
}

ai_media_template(){
  section "AI / 流媒体分流模板 / AI & Media Rules"
  note "添加 OpenAI / ChatGPT / Claude / Netflix / YouTube 等基础规则。"
  [[ -f "$OUT/01_IMPORT_FLCLASH.yaml" ]] || { err "请先部署并生成 01_IMPORT_FLCLASH.yaml"; return 1; }
  ensure_yaml || return 1

  python3 - "$OUT/01_IMPORT_FLCLASH.yaml" <<'PY'
import sys, yaml
p = sys.argv[1]
cfg = yaml.safe_load(open(p, encoding="utf-8")) or {}
proxies = cfg.get("proxies") or []
node = proxies[0].get("name", "PROXY") if proxies and isinstance(proxies[0], dict) else "PROXY"

groups = cfg.setdefault("proxy-groups", [])
names = {g.get("name"): g for g in groups if isinstance(g, dict)}
for gn in ["AI", "Media"]:
    if gn not in names:
        groups.insert(0, {"name": gn, "type": "select", "proxies": [node, "PROXY", "GLOBAL", "DIRECT"]})
    else:
        ps = names[gn].setdefault("proxies", [])
        for x in [node, "PROXY", "GLOBAL", "DIRECT"]:
            if x not in ps:
                ps.append(x)

rules = [r for r in cfg.setdefault("rules", []) if not (isinstance(r, str) and r.startswith("MATCH,"))]
adds = [
"DOMAIN-SUFFIX,openai.com,AI",
"DOMAIN-SUFFIX,chatgpt.com,AI",
"DOMAIN-SUFFIX,oaistatic.com,AI",
"DOMAIN-SUFFIX,oaiusercontent.com,AI",
"DOMAIN-SUFFIX,anthropic.com,AI",
"DOMAIN-SUFFIX,claude.ai,AI",
"DOMAIN-SUFFIX,netflix.com,Media",
"DOMAIN-SUFFIX,nflxvideo.net,Media",
"DOMAIN-SUFFIX,disneyplus.com,Media",
"DOMAIN-SUFFIX,youtube.com,Media",
"DOMAIN-SUFFIX,googlevideo.com,Media",
"DOMAIN-SUFFIX,spotify.com,Media"
]
for r in reversed(adds):
    if r not in rules:
        rules.insert(0, r)
rules.append("MATCH,PROXY")
cfg["rules"] = rules
yaml.safe_dump(cfg, open(p, "w", encoding="utf-8"), allow_unicode=True, sort_keys=False, width=140)
PY

  mkdir -p "$HTTP_DIR"
  cp "$OUT/01_IMPORT_FLCLASH.yaml" "$HTTP_DIR/01_IMPORT_FLCLASH.yaml"
  ok "已写入 AI / 流媒体模板：$OUT/01_IMPORT_FLCLASH.yaml"
}


ai_service_route_apply(){
  section "服务端 AI 分流 / Server-side AI Routing"
  note "这个功能不是端口中转。它是在当前 VPS 的 Xray 服务端内写 routing。"
  note "典型用法：客户端连香港节点；普通流量香港直出；ChatGPT/OpenAI/Claude/Gemini 自动走日本 Trojan outbound。Xray 26.x 自签证书使用 pinnedPeerCertSha256，不再使用 allowInsecure。"
  note "适合：香港节点速度好，但香港出口不能 GPT，需要把 AI 域名丢给日本/台湾可解锁节点。"
  echo
  printf "${YLW}流量逻辑：${R}\n"
  echo "  客户端 → 当前 VPS 入站"
  echo "             ├─ 普通网站 → 当前 VPS freedom / 默认出口"
  echo "             └─ AI 域名  → 你填入的日本/台湾 Trojan outbound"
  echo

  [[ -f "$XCONF" ]] || { err "未找到 Xray 配置：$XCONF。请先部署 Trojan / Reality，或确认 Xray 配置路径。"; return 1; }
  [[ -x "$XRAY" ]] || { err "未找到 Xray 主程序：$XRAY。请先安装 Xray。"; return 1; }
  has python3 || { err "缺少 python3，请先执行 System Init。"; return 1; }

  local tag jp_server jp_port jp_pass jp_sni pcs restart_ans bak ans

  tag="$(ask 'AI 出口 outboundTag，建议固定不改' 'ai-jp-out')"
  jp_server="$(ask_required 'AI 落地节点 IP / 域名，例如日本 VPS IP 或域名')"
  jp_port="$(ask 'AI 落地 Trojan 端口' '443')"
  valid_port "$jp_port" || { err "端口无效"; return 1; }
  jp_pass="$(ask_required 'AI 落地 Trojan password / 密码')"
  jp_sni="$(ask 'AI 落地 Trojan SNI' 'www.microsoft.com')"
  pcs="$(ask 'pinnedPeerCertSha256，留空则自动抓取；真实证书也可留空' '')"
  if [[ -z "$pcs" ]]; then
    if has openssl; then
      step "自动抓取 AI 落地 TLS 证书 SHA256 指纹"
      pcs="$(echo | openssl s_client -connect "${jp_server}:${jp_port}" -servername "$jp_sni" -showcerts 2>/dev/null | openssl x509 -outform DER 2>/dev/null | sha256sum | awk '{print $1}')"
      if [[ -n "$pcs" ]]; then
        ok "已自动抓取 pinnedPeerCertSha256：$pcs"
      else
        warn "自动抓取失败。如果落地使用自签证书，请先手动取得 pinnedPeerCertSha256 后再填写。"
      fi
    else
      warn "未安装 openssl，无法自动抓取 pinnedPeerCertSha256。"
    fi
  fi

  echo
  warn "即将修改当前服务端 Xray routing。会先自动备份，失败会自动回滚。"
  printf "${CYN}当前 VPS：${R}服务端入口；${CYN}AI 落地：${R}%s:%s，SNI=%s，Tag=%s，PCS=%s\n" "$jp_server" "$jp_port" "$jp_sni" "$tag" "${pcs:-未设置}"
  read -rp "确认写入服务端 AI 分流？[y/N]: " ans
  [[ "$ans" =~ ^[Yy]$ ]] || { warn "已取消。"; return 0; }

  mkdir -p "$BAK"
  bak="$BAK/xray_config_before_ai_route_$(ts).json"
  cp "$XCONF" "$bak"
  ok "已备份：$bak"

  python3 - "$XCONF" "$tag" "$jp_server" "$jp_port" "$jp_pass" "$jp_sni" "$pcs" <<'PY'
import json, sys
from pathlib import Path

cfg_path = Path(sys.argv[1])
tag = sys.argv[2].strip() or "ai-jp-out"
server = sys.argv[3].strip()
port = int(sys.argv[4])
password = sys.argv[5].strip()
sni = sys.argv[6].strip() or "www.microsoft.com"
pcs = sys.argv[7].strip().replace(":", "").lower()

if not server or not password:
    raise SystemExit("server/password is empty")

cfg = json.loads(cfg_path.read_text(encoding="utf-8"))

cfg.setdefault("outbounds", [])
cfg.setdefault("routing", {})
cfg["routing"].setdefault("rules", [])

# 1) 开启 sniffing。没有 sniffing 就只能看到 IP，服务端无法按域名分流 GPT。
for inbound in cfg.get("inbounds", []):
    if not isinstance(inbound, dict):
        continue
    inbound["sniffing"] = {
        "enabled": True,
        "destOverride": ["http", "tls", "quic"],
        "routeOnly": True
    }

# 2) 删除旧同名 outbound，避免重复。
cfg["outbounds"] = [
    o for o in cfg.get("outbounds", [])
    if not (isinstance(o, dict) and o.get("tag") == tag)
]

# 3) 新增 AI 落地 Trojan outbound。
# Xray 26.x 已移除 allowInsecure；自签证书请使用 pinnedPeerCertSha256。
tls_settings = {
    "serverName": sni,
    "alpn": ["http/1.1"]
}
if pcs:
    tls_settings["pinnedPeerCertSha256"] = pcs

cfg["outbounds"].append({
    "tag": tag,
    "protocol": "trojan",
    "settings": {
        "servers": [
            {
                "address": server,
                "port": port,
                "password": password
            }
        ]
    },
    "streamSettings": {
        "network": "tcp",
        "security": "tls",
        "tlsSettings": tls_settings
    }
})

# 4) 删除旧同名规则，避免越写越多。
cfg["routing"]["rules"] = [
    r for r in cfg["routing"].get("rules", [])
    if not (isinstance(r, dict) and r.get("outboundTag") == tag)
]

# 5) AI 域名规则插到最前面，优先级最高。
ai_domains = [
    "domain:chatgpt.com",
    "domain:openai.com",
    "domain:api.openai.com",
    "domain:auth0.openai.com",
    "domain:oaistatic.com",
    "domain:oaiusercontent.com",
    "domain:cdn.oaistatic.com",
    "domain:ai.com",
    "domain:openaicom.imgix.net",
    "domain:openaiapi-site.azureedge.net",
    "domain:oaidalleapiprodscus.blob.core.windows.net",
    "domain:anthropic.com",
    "domain:claude.ai",
    "domain:perplexity.ai",
    "domain:poe.com",
    "domain:gemini.google.com",
    "domain:aistudio.google.com",
    "domain:generativelanguage.googleapis.com",
    "domain:makersuite.google.com",
    "domain:bard.google.com",
    "domain:copilot.microsoft.com",
    "domain:githubcopilot.com",
    "domain:sydney.bing.com",
    "domain:cursor.com",
    "domain:cursor.sh",
    "openai",
    "chatgpt"
]

cfg["routing"].setdefault("domainStrategy", "IPIfNonMatch")
cfg["routing"]["rules"].insert(0, {
    "type": "field",
    "domain": ai_domains,
    "outboundTag": tag
})

cfg_path.write_text(json.dumps(cfg, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"OK: server-side AI routing written, outboundTag={tag}")
PY

  step "检查 Xray 配置"
  if ! "$XRAY" run -test -config "$XCONF"; then
    err "Xray 配置测试失败，自动回滚。"
    cp "$bak" "$XCONF"
    "$XRAY" run -test -config "$XCONF" || true
    return 1
  fi

  ok "Xray 配置测试通过。"
  read -rp "是否立即重启 Xray 让 AI 分流生效？[Y/n]: " restart_ans
  if [[ ! "$restart_ans" =~ ^[Nn]$ ]]; then
    fix_xray_log_perm >/dev/null 2>&1 || true
    systemctl restart xray
    systemctl status xray --no-pager | sed -n '1,12p'
    ok "已重启 Xray。现在客户端继续选择当前香港节点，GPT 流量会由服务端转到 AI 落地 outbound。"
  else
    warn "尚未重启。稍后执行 systemctl restart xray 才会生效。"
  fi
}

ai_service_route_show(){
  section "查看服务端 AI 分流 / Show Server-side AI Routing"
  [[ -f "$XCONF" ]] || { err "未找到 Xray 配置：$XCONF"; return 1; }
  has python3 || { err "缺少 python3"; return 1; }

  python3 - "$XCONF" <<'PY'
import json, sys
from pathlib import Path
p = Path(sys.argv[1])
cfg = json.loads(p.read_text(encoding="utf-8"))

print("[inbound sniffing]")
for i, inbound in enumerate(cfg.get("inbounds", []), 1):
    sn = inbound.get("sniffing", {}) if isinstance(inbound, dict) else {}
    print(f"  {i}. tag={inbound.get('tag','')} protocol={inbound.get('protocol','')} port={inbound.get('port','')} sniffing={sn.get('enabled', False)} destOverride={sn.get('destOverride', [])}")

print("\n[AI outbound candidates]")
found = False
for o in cfg.get("outbounds", []):
    if not isinstance(o, dict):
        continue
    tag = o.get("tag", "")
    if tag.startswith("ai-") or "ai" in tag.lower():
        found = True
        proto = o.get("protocol", "")
        server = ""
        port = ""
        sni = ""
        if proto == "trojan":
            ss = ((o.get("settings") or {}).get("servers") or [{}])[0]
            server = ss.get("address", "")
            port = ss.get("port", "")
            tls = ((o.get("streamSettings") or {}).get("tlsSettings") or {})
            sni = tls.get("serverName") or ""
            pcs = tls.get("pinnedPeerCertSha256") or ""
        print(f"  tag={tag} protocol={proto} server={server}:{port} sni={sni} pcs={pcs}")
if not found:
    print("  未发现 ai-* outbound。")

print("\n[routing rules → AI outbound]")
found = False
for r in (cfg.get("routing") or {}).get("rules", []):
    if not isinstance(r, dict):
        continue
    tag = r.get("outboundTag", "")
    if tag.startswith("ai-") or "ai" in tag.lower():
        found = True
        domains = r.get("domain", [])
        print(f"  outboundTag={tag} domains={len(domains)}")
        for d in domains[:30]:
            print(f"    - {d}")
        if len(domains) > 30:
            print(f"    ... +{len(domains)-30} more")
if not found:
    print("  未发现 AI routing 规则。")
PY
}

ai_service_route_rollback(){
  section "回滚服务端 AI 分流 / Rollback Server-side AI Routing"
  local latest ans
  latest="$(ls -t "$BAK"/xray_config_before_ai_route_*.json 2>/dev/null | head -1 || true)"
  [[ -n "$latest" ]] || { err "没有找到 AI 分流备份。"; return 1; }
  warn "将回滚到：$latest"
  read -rp "确认回滚并重启 Xray？[y/N]: " ans
  [[ "$ans" =~ ^[Yy]$ ]] || return 0
  cp "$latest" "$XCONF"
  "$XRAY" run -test -config "$XCONF" || { err "备份配置测试失败，未重启。"; return 1; }
  systemctl restart xray
  systemctl status xray --no-pager | sed -n '1,12p'
  ok "已回滚服务端 AI 分流。"
}

write_forward_apply(){
  cat > "$FORWARD_APPLY" <<'EOS'
#!/usr/bin/env bash
set -e

ROOT="/opt/lazy-vps-menu"
RULES="/etc/lazy-vps-forward.rules"
FW_BACKEND_CONF="$ROOT/firewall_backend.conf"

has(){ command -v "$1" >/dev/null 2>&1; }

backend_default(){
  if [ -f "$FW_BACKEND_CONF" ]; then
    awk -F= '/^firewall_backend=/{print toupper($2)}' "$FW_BACKEND_CONF" | head -1
  else
    echo "AUTO"
  fi
}

backend_resolve(){
  local mode
  mode="$(backend_default)"
  case "$mode" in
    AUTO|"")
      if has ufw && ufw status 2>/dev/null | grep -qw "active"; then
        echo "UFW"
      elif has nft; then
        echo "NFT"
      elif has iptables; then
        echo "IPTABLES"
      else
        echo "NONE"
      fi
      ;;
    UFW|NFT|IPTABLES|NONE) echo "$mode" ;;
    *) echo "AUTO" ;;
  esac
}

ensure_forward(){
  sysctl -w net.ipv4.ip_forward=1 >/dev/null 2>&1 || true
  mkdir -p /etc/sysctl.d
  grep -q '^net.ipv4.ip_forward=1' /etc/sysctl.d/99-lazy-forward.conf 2>/dev/null || echo 'net.ipv4.ip_forward=1' > /etc/sysctl.d/99-lazy-forward.conf
}

apply_iptables(){
  iptables -t nat -N LAZY_DNAT 2>/dev/null || true
  iptables -t nat -N LAZY_SNAT 2>/dev/null || true
  iptables -N LAZY_FORWARD 2>/dev/null || true

  iptables -t nat -C PREROUTING -j LAZY_DNAT 2>/dev/null || iptables -t nat -A PREROUTING -j LAZY_DNAT
  iptables -t nat -C POSTROUTING -j LAZY_SNAT 2>/dev/null || iptables -t nat -A POSTROUTING -j LAZY_SNAT
  iptables -C FORWARD -j LAZY_FORWARD 2>/dev/null || iptables -I FORWARD 1 -j LAZY_FORWARD

  iptables -t nat -F LAZY_DNAT
  iptables -t nat -F LAZY_SNAT
  iptables -F LAZY_FORWARD

  iptables -A LAZY_FORWARD -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

  [ -f "$RULES" ] || exit 0

  while IFS='|' read -r proto lport dip dport note; do
    [ -z "$proto" ] && continue
    case "$proto" in
      tcp|both)
        iptables -t nat -A LAZY_DNAT -p tcp --dport "$lport" -j DNAT --to-destination "$dip:$dport"
        iptables -t nat -A LAZY_SNAT -p tcp -d "$dip" --dport "$dport" -j MASQUERADE
        iptables -A LAZY_FORWARD -p tcp -d "$dip" --dport "$dport" -j ACCEPT
        ;;
    esac
    case "$proto" in
      udp|both)
        iptables -t nat -A LAZY_DNAT -p udp --dport "$lport" -j DNAT --to-destination "$dip:$dport"
        iptables -t nat -A LAZY_SNAT -p udp -d "$dip" --dport "$dport" -j MASQUERADE
        iptables -A LAZY_FORWARD -p udp -d "$dip" --dport "$dport" -j ACCEPT
        ;;
    esac
  done < "$RULES"
}

apply_nft(){
  local conf="/etc/nftables.d/lazy-vps-forward.nft"
  mkdir -p /etc/nftables.d

  if [ ! -f /etc/nftables.conf ]; then
    cat > /etc/nftables.conf <<'EOF'
#!/usr/sbin/nft -f
flush ruleset
include "/etc/nftables.d/*.nft"
EOF
  elif ! grep -qF 'include "/etc/nftables.d/*.nft"' /etc/nftables.conf; then
    echo 'include "/etc/nftables.d/*.nft"' >> /etc/nftables.conf
  fi

  cat > "$conf" <<'EOF'
#!/usr/sbin/nft -f
table ip lazy_vps_forward {
  chain prerouting {
    type nat hook prerouting priority -100; policy accept;
EOF

  if [ -f "$RULES" ]; then
    while IFS='|' read -r proto lport dip dport note; do
      [ -z "$proto" ] && continue
      case "$proto" in tcp|both) echo "    tcp dport ${lport} dnat to ${dip}:${dport}" >> "$conf" ;; esac
      case "$proto" in udp|both) echo "    udp dport ${lport} dnat to ${dip}:${dport}" >> "$conf" ;; esac
    done < "$RULES"
  fi

  cat >> "$conf" <<'EOF'
  }

  chain postrouting {
    type nat hook postrouting priority 100; policy accept;
EOF

  if [ -f "$RULES" ]; then
    while IFS='|' read -r proto lport dip dport note; do
      [ -z "$proto" ] && continue
      case "$proto" in tcp|both) echo "    ip daddr ${dip} tcp dport ${dport} masquerade" >> "$conf" ;; esac
      case "$proto" in udp|both) echo "    ip daddr ${dip} udp dport ${dport} masquerade" >> "$conf" ;; esac
    done < "$RULES"
  fi

  cat >> "$conf" <<'EOF'
  }

  chain forward {
    type filter hook forward priority 0; policy accept;
    ct state established,related accept;
EOF

  if [ -f "$RULES" ]; then
    while IFS='|' read -r proto lport dip dport note; do
      [ -z "$proto" ] && continue
      case "$proto" in tcp|both) echo "    ip daddr ${dip} tcp dport ${dport} accept" >> "$conf" ;; esac
      case "$proto" in udp|both) echo "    ip daddr ${dip} udp dport ${dport} accept" >> "$conf" ;; esac
    done < "$RULES"
  fi

  cat >> "$conf" <<'EOF'
  }
}
EOF

  nft delete table ip lazy_vps_forward 2>/dev/null || true
  nft -f "$conf"
  systemctl enable nftables >/dev/null 2>&1 || true
  systemctl restart nftables 2>/dev/null || true
}

apply_none(){
  echo "[WARN] firewall_backend=NONE：未写入任何中转规则。"
  echo "[WARN] 请自行配置 DNAT/SNAT/FORWARD 和云厂商安全组。"
}

main(){
  ensure_forward
  local be
  be="$(backend_resolve)"

  case "$be" in
    NFT) apply_nft ;;
    UFW)
      apply_iptables
      if has ufw && [ -f "$RULES" ]; then
        while IFS='|' read -r proto lport dip dport note; do
          [ -z "$proto" ] && continue
          case "$proto" in tcp|both) ufw allow "${lport}/tcp" >/dev/null 2>&1 || true; ufw route allow proto tcp to "$dip" port "$dport" >/dev/null 2>&1 || true ;; esac
          case "$proto" in udp|both) ufw allow "${lport}/udp" >/dev/null 2>&1 || true; ufw route allow proto udp to "$dip" port "$dport" >/dev/null 2>&1 || true ;; esac
        done < "$RULES"
      fi
      ;;
    IPTABLES) apply_iptables ;;
    NONE) apply_none ;;
    *) apply_iptables ;;
  esac
}

main "$@"
EOS

  chmod +x "$FORWARD_APPLY"

  cat > "$FORWARD_SERVICE" <<EOF
[Unit]
Description=LazyVPS Port Forward Rules
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
ExecStart=${FORWARD_APPLY}
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

  systemctl daemon-reload
  systemctl enable lazy-vps-forward.service >/dev/null 2>&1 || true
}

forward_add(){
  section "端口中转规则 / Port Relay Forward"
  note "入口 VPS 端口 -> 后端 VPS 端口。支持按防火墙后端写入 UFW / NFT / IPTABLES / NONE。"
  install_base >/dev/null 2>&1 || true

  local proto lport dip dport note_text
  proto="$(ask '协议 tcp / udp / both' 'both')"
  [[ "$proto" == "tcp" || "$proto" == "udp" || "$proto" == "both" ]] || { err "协议只支持 tcp / udp / both"; return 1; }
  lport="$(ask '本机入口监听端口，例如 2443' '2443')"
  valid_port "$lport" || { err "端口无效"; return 1; }
  dip="$(ask_required '目标后端 IP，例如后端 VPS IP')"
  dport="$(ask '目标后端端口' '443')"
  valid_port "$dport" || { err "端口无效"; return 1; }
  note_text="$(ask '备注' "forward-${lport}-to-backend-${dport}")"

  touch "$FORWARD_RULES"
  echo "${proto}|${lport}|${dip}|${dport}|${note_text}" >> "$FORWARD_RULES"

  fw_open_port "$lport" "tcp"
  fw_open_port "$lport" "udp"

  write_forward_apply
  "$FORWARD_APPLY"

  ok "已添加中转：本机 ${lport}/${proto} -> ${dip}:${dport}"
  warn "还要确认云厂商安全组放行入口端口 ${lport}。"
}

relay_client_config(){
  section "端口中转客户端配置 / Port Relay Client"
  note "客户端连接入口 VPS，但密码 / SNI 仍沿用后端落地节点。"
  [[ -f "$OUT/latest_flclash_fragment.yaml" ]] || { err "请先在后端 VPS 部署节点或生成节点片段。"; return 1; }
  ensure_yaml || return 1

  local entry port relay_name
  entry="$(ask '入口 VPS 的 IP / 域名，例如 relay.example.com 或入口 VPS IP' 'relay.example.com')"
  port="$(ask '入口 VPS 的中转端口' '2443')"
  valid_port "$port" || { err "端口无效"; return 1; }
  relay_name="$(ask '中转客户端节点名称' '入口VPS-后端落地-T中转')"

  python3 - "$OUT/latest_flclash_fragment.yaml" "$OUT/01_IMPORT_FLCLASH_RELAY.yaml" "$entry" "$port" "$relay_name" <<'PY'
import sys, yaml
frag_path, out_path, entry, port, name = sys.argv[1:6]
fr = yaml.safe_load(open(frag_path, encoding="utf-8")) or []
node = fr[0] if isinstance(fr, list) else fr
node["name"] = name
node["server"] = entry
node["port"] = int(port)
cfg = {
    "mixed-port": 7890,
    "allow-lan": False,
    "mode": "rule",
    "log-level": "info",
    "ipv6": False,
    "unified-delay": True,
    "tcp-concurrent": True,
    "dns": {
        "enable": True,
        "listen": "127.0.0.1:1053",
        "enhanced-mode": "fake-ip",
        "fake-ip-range": "198.18.0.1/16",
        "nameserver": ["223.5.5.5", "119.29.29.29", "1.1.1.1", "8.8.8.8"]
    },
    "proxies": [node],
    "proxy-groups": [
        {"name": "GLOBAL", "type": "select", "proxies": [name, "DIRECT"]},
        {"name": "PROXY", "type": "select", "proxies": [name, "DIRECT"]},
    ],
    "rules": ["MATCH,PROXY"]
}
yaml.safe_dump(cfg, open(out_path, "w", encoding="utf-8"), allow_unicode=True, sort_keys=False, width=140)
PY

  mkdir -p "$HTTP_DIR"
  cp "$OUT/01_IMPORT_FLCLASH_RELAY.yaml" "$HTTP_DIR/01_IMPORT_FLCLASH_RELAY.yaml"
  ok "已生成中转客户端配置：$OUT/01_IMPORT_FLCLASH_RELAY.yaml"
}

forward_show(){
  section "查看中转规则 / Relay Rules"
  if [[ -f "$FORWARD_RULES" ]]; then
    nl -ba "$FORWARD_RULES"
  else
    warn "暂无中转规则。"
  fi
  echo
  info "防火墙后端：$(fw_backend_default) → 实际：$(fw_backend_resolve)"
  echo
  info "当前 iptables LAZY 链："
  iptables -t nat -S LAZY_DNAT 2>/dev/null || true
  iptables -S LAZY_FORWARD 2>/dev/null || true
  echo
  info "当前 nft lazy_vps_forward 表："
  nft list table ip lazy_vps_forward 2>/dev/null || true
}

forward_clear(){
  section "清空中转规则 / Clear Relay"
  warn "只清理本工具的 LAZY_DNAT / LAZY_SNAT / LAZY_FORWARD，不会清空系统所有规则。"
  read -rp "确认清空？[y/N]: " ans
  [[ "$ans" =~ ^[Yy]$ ]] || return
  > "$FORWARD_RULES"
  iptables -t nat -F LAZY_DNAT 2>/dev/null || true
  iptables -t nat -F LAZY_SNAT 2>/dev/null || true
  iptables -F LAZY_FORWARD 2>/dev/null || true
  ok "已清空本工具中转规则。"
}

run_bbrv3(){
  section "BBR v3 一键脚本"
  warn "第三方脚本，可能更换内核或要求重启。请谨慎。"
  read -rp "继续下载并运行 BBR v3 脚本？[y/N]: " ans
  [[ "$ans" =~ ^[Yy]$ ]] || return
  wget https://raw.githubusercontent.com/byJoey/Actions-bbr-v3/refs/heads/main/install.sh -O /root/install-bbr-v3.sh
  chmod +x /root/install-bbr-v3.sh
  bash /root/install-bbr-v3.sh
}

run_dns_unlock(){
  section "DNS Alice Unlock 一键解锁 / DNS 分流"
  warn "第三方 DNS 分流脚本，可能修改 dnsmasq / resolv / 端口 53。"
  read -rp "继续运行？[y/N]: " ans
  [[ "$ans" =~ ^[Yy]$ ]] || return
  wget https://raw.githubusercontent.com/Jimmyzxk/DNS-Alice-Unlock/refs/heads/main/dns-unlock.sh -O /root/dns-unlock.sh
  bash /root/dns-unlock.sh
}

run_tcpx(){
  section "Linux-NetSpeed：锐速 / BBRPlus / BBR2 / BBR3"
  warn "第三方脚本，可能更换内核、重启、影响系统稳定性。"
  read -rp "继续运行？[y/N]: " ans
  [[ "$ans" =~ ^[Yy]$ ]] || return
  wget -O /root/tcpx.sh "https://github.com/ylx2016/Linux-NetSpeed/raw/master/tcpx.sh"
  chmod +x /root/tcpx.sh
  bash /root/tcpx.sh
}

run_tcp_window(){
  section "TCP 窗口调优工具"
  warn "第三方脚本，会修改 TCP / 系统网络参数。"
  read -rp "继续运行？[y/N]: " ans
  [[ "$ans" =~ ^[Yy]$ ]] || return
  wget http://sh.nekoneko.cloud/tools.sh -O /root/tools.sh
  bash /root/tools.sh
}

diagnose_repair(){
  section "一键诊断 / 查修"
  note "不会重装服务，只检查关键状态、修复日志权限，并可重建客户端导入配置。"
  fix_xray_log_perm
  systemctl restart xray 2>/dev/null || true

  status_check

  step "Xray 配置语法检查"
  if [[ -f "$XCONF" && -x "$XRAY" ]]; then
    "$XRAY" run -test -config "$XCONF" || warn "Xray 配置测试失败。"
  else
    warn "Xray 或配置不存在。"
  fi

  step "读取 Xray 当前协议摘要"
  if has jq && [[ -f "$XCONF" ]]; then
    jq -r '.inbounds[0] | "protocol=\(.protocol)\nport=\(.port)\ntag=\(.tag)"' "$XCONF" 2>/dev/null || true
  else
    warn "缺少 jq 或 Xray 配置。"
  fi

  step "最近 Xray 日志"
  journalctl -u xray -n 80 --no-pager 2>/dev/null || true

  echo
  read -rp "是否根据当前 Xray Trojan 配置重建 01_IMPORT_FLCLASH.yaml？[Y/n]: " ans
  if [[ ! "$ans" =~ ^[Nn]$ ]]; then
    repair_import_from_xray
  fi
}

repair_import_from_xray(){
  section "修复 / 重建客户端导入配置"
  fix_xray_log_perm
  systemctl restart xray 2>/dev/null || true
  [[ -f "$XCONF" ]] || { err "找不到 $XCONF"; return 1; }
  has jq || install_base >/dev/null 2>&1 || true

  local proto ip name port pass sni
  proto="$(jq -r '.inbounds[0].protocol // empty' "$XCONF" 2>/dev/null || true)"
  ip="$(ip4)"

  if [[ "$proto" != "trojan" ]]; then
    warn "当前 Xray 不是 Trojan：${proto:-unknown}"
    warn "Reality 客户端需要 public-key，无法只靠服务端 private-key 反推。"
    return 1
  fi

  name="$(auto_name T)"
  port="$(jq -r '.inbounds[0].port' "$XCONF")"
  pass="$(jq -r '.inbounds[0].settings.clients[0].password' "$XCONF")"
  sni="$(jq -r '.inbounds[0].streamSettings.tlsSettings.serverName // "www.microsoft.com"' "$XCONF")"

  local name_q
  name_q="$(yaml_quote "$name")"
  cat > "$OUT/latest_flclash_fragment.yaml" <<EOF
- name: ${name_q}
  type: trojan
  server: ${ip}
  port: ${port}
  password: ${pass}
  sni: ${sni}
  skip-cert-verify: true
  udp: true
  network: tcp
  alpn:
    - http/1.1
  client-fingerprint: chrome
EOF
  cat > "$OUT/latest_surge_fragment.conf" <<EOF
${name} = trojan, ${ip}, ${port}, password=${pass}, sni=${sni}, skip-cert-verify=true, udp-relay=true, alpn=http/1.1
EOF
  write_imports
  ok "已重建客户端导入文件：$OUT/01_IMPORT_FLCLASH.yaml"
}

view_current_trojan(){
  section "查看当前 Trojan 服务端真实参数"
  if show_current_trojan_detected; then
    echo
    warn "如需显示完整密码，请确认周围无人。"
    read -rp "是否显示完整 Trojan 密码？[y/N]: " ans
    if [[ "$ans" =~ ^[Yy]$ ]]; then
      echo "password=$(get_current_trojan_value password)"
    fi
  else
    err "未检测到当前 Trojan 配置。"
  fi
}

rollback_xray(){
  local f
  f="$(ls -t "$BAK"/usr_local_etc_xray_config.json.*.bak 2>/dev/null | head -1)"
  [[ -n "$f" ]] && cp "$f" "$XCONF" && systemctl restart xray && ok "Xray 已回滚：$f" || err "无 Xray 备份。"
}

rollback_hy2(){
  local f
  f="$(ls -t "$BAK"/etc_hysteria_config.yaml.*.bak 2>/dev/null | head -1)"
  [[ -n "$f" ]] && cp "$f" "$HYCONF" && systemctl restart hysteria-server && ok "Hysteria2 已回滚：$f" || err "无 Hysteria2 备份。"
}

stop_xray(){
  backup_all
  systemctl stop xray 2>/dev/null || true
  systemctl disable xray 2>/dev/null || true
  ok "Xray 已停止。"
}

stop_hy2(){
  backup_all
  systemctl stop hysteria-server 2>/dev/null || true
  systemctl disable hysteria-server 2>/dev/null || true
  ok "Hysteria2 已停止。"
}

ITEMS=(
"System Init / 系统初始化"
"Stable BBR / 开启 BBR+fq"
"Firewall Backend / 防火墙后端"
"Xray Core / 安装或更新 Xray"
"Trojan 443 / 部署 T 协议"
"Reality 443 / 部署 R 协议"
"Hysteria2 8443 / 部署 H 协议"
"Status / 状态检查"
"Output / 查看节点输出"
"Export / 导出配置包"
"Backup / 备份当前配置"
"Rollback Xray / 回滚 Xray"
"Rollback Hysteria2 / 回滚 Hysteria2"
"Stop Xray / 停止 Xray"
"Stop Hysteria2 / 停止 Hysteria2"
"HTTP On / 开启 HTTP 下载"
"HTTP Off / 停止 HTTP 下载"
"NodeQuality / 酒神测试"
"Local Merge / 本机总配置合并"
"Remote Merge / 总配置在其他 VPS"
"Client AI Rules / 客户端AI规则模板"
"Server AI Routing / 服务端AI分流"
"AI Route Show / 查看服务端AI分流"
"AI Route Rollback / 回滚服务端AI分流"
"Relay Forward / 端口中转规则"
"Relay Client / 端口中转客户端"
"Relay Show / 查看端口中转"
"Relay Clear / 清空端口中转"
"BBR v3 / 第三方 BBRv3 脚本"
"DNS Unlock / DNS Alice 解锁"
"NetSpeed / 锐速/BBRPlus/BBR2/BBR3"
"TCP Tune / TCP 窗口调优"
"Diagnose / 一键诊断查修"
"Current Trojan / 查看当前 T 参数"
"Exit / 退出"
)

DESCS=(
"安装基础依赖、确认 SSH、配置防火墙、开启 BBR"
"启用 Linux 原生 BBR + fq，保守稳定"
"AUTO/UFW/NFT/IPTABLES/NONE，放行常用端口"
"安装或更新 Xray-core"
"稳定常用节点，默认继承当前服务端密码"
"VLESS Reality，适合伪装直连场景"
"UDP 协议，适合移动网络和高吞吐测试"
"查看端口、服务、防火墙、BBR"
"查看 01_IMPORT_FLCLASH.yaml 与节点片段"
"打包输出，可 HTTP 或 scp 下载"
"备份 Xray / Hysteria2 / BBR 配置"
"恢复最近一次 Xray 配置备份"
"恢复最近一次 Hysteria2 配置备份"
"停止并禁用 Xray 服务"
"停止并禁用 Hysteria2 服务"
"浏览器下载导入配置与整包"
"关闭 8088 临时下载服务"
"运行 run.NodeQuality.com"
"总配置就在当前 VPS 时使用"
"总配置在另一台 VPS / 订阅服务器时使用"
"客户端配置里的 AI/媒体规则，不改变服务端出口"
"服务端按域名分流：普通走本机，GPT/AI 走日本/台湾落地"
"查看当前 Xray 是否已写入 AI outbound 与 routing 规则"
"恢复写入 AI 分流前的 Xray 配置"
"入口端口转发到后端端口，适合整节点中转，不适合域名级 GPT 分流"
"客户端连入口 VPS，但参数沿用后端落地"
"显示本工具记录、iptables 与 nft 中转规则"
"清空本工具的端口转发规则"
"第三方脚本，可能换内核，请谨慎"
"第三方 DNS 分流解锁工具"
"第三方内核加速脚本，可能重启"
"第三方 TCP 参数调优工具"
"检查服务/日志/配置并可重建导入文件"
"显示当前服务端端口/SNI/密码，避免误用旧配置"
"退出菜单"
)

run_choice(){
  case "$1" in
    1) init_system ;;
    2) bbr ;;
    3) ufw_basic ;;
    4) install_xray ;;
    5) deploy_trojan ;;
    6) deploy_reality ;;
    7) deploy_hy2 ;;
    8) status_check ;;
    9) show_outputs ;;
    10) export_pkg ;;
    11) backup_all; ls -lh "$BAK" ;;
    12) rollback_xray ;;
    13) rollback_hy2 ;;
    14) stop_xray ;;
    15) stop_hy2 ;;
    16) http_start ;;
    17) http_stop ;;
    18) nodequality ;;
    19) merge_local_config ;;
    20) merge_remote_config ;;
    21) ai_media_template ;;
    22) ai_service_route_apply ;;
    23) ai_service_route_show ;;
    24) ai_service_route_rollback ;;
    25) forward_add ;;
    26) relay_client_config ;;
    27) forward_show ;;
    28) forward_clear ;;
    29) run_bbrv3 ;;
    30) run_dns_unlock ;;
    31) run_tcpx ;;
    32) run_tcp_window ;;
    33) diagnose_repair ;;
    34) view_current_trojan ;;
    35) exit 0 ;;
  esac
}

CAT_SHORT=(
"BASIC"
"PROTOCOL"
"CHECK"
"BACKUP"
"DOWNLOAD"
"RELAY"
"TUNE"
"EXIT"
)

CAT_CN=(
"基础环境"
"协议部署"
"检查导出"
"备份服务"
"下载合并"
"分流中转"
"调优诊断"
"退出"
)

CAT_START=(1 5 8 11 16 21 29 35)
CAT_END=(4 7 10 15 20 28 34 35)
CAT_FG=(45 213 82 220 75 207 208 196)
CAT_BG=(24 90 22 58 18 53 94 52)

cat_fg(){
  printf '\033[38;5;%sm' "${CAT_FG[$1]}"
}

cat_bg(){
  printf '\033[48;5;%sm' "${CAT_BG[$1]}"
}

find_category(){
  local item="$1"
  local c

  for c in "${!CAT_START[@]}"; do
    if (( item >= CAT_START[c] && item <= CAT_END[c] )); then
      echo "$c"
      return
    fi
  done

  echo 0
}

draw_tabs(){
  local active="$1"
  local row c fg bg

  for row in 0 1; do
    printf "  "
    for ((c=row*4; c<row*4+4; c++)); do
      fg="$(cat_fg "$c")"
      bg="$(cat_bg "$c")"

      if (( c == active )); then
        printf "%b${B}${WHT} %d %-10s ${R} " "$bg" "$((c+1))" "${CAT_SHORT[$c]}"
      else
        printf "%b[%d %-10s]${R} " "$fg" "$((c+1))" "${CAT_SHORT[$c]}"
      fi
    done
    echo
  done
}

draw_panel(){
  local cat="$1"
  local selected="$2"
  local start="${CAT_START[$cat]}"
  local end="${CAT_END[$cat]}"
  local fg bg n idx

  fg="$(cat_fg "$cat")"
  bg="$(cat_bg "$cat")"

  echo
  printf "%b┌──────────────────────────────────────────────────────────────────────────%b\n" "$fg" "$R"
  printf "%b│  %s / %s%b\n" "$fg" "${CAT_SHORT[$cat]}" "${CAT_CN[$cat]}" "$R"
  printf "%b├──────────────────────────────────────────────────────────────────────────%b\n" "$fg" "$R"

  for ((n=start; n<=end; n++)); do
    idx=$((n-1))

    if (( n == selected )); then
      printf "%b│%b%b${B}${WHT}  ▶ %02d  %s  ${R}\n" "$fg" "$R" "$bg" "$n" "${ITEMS[$idx]}"
      printf "%b│%b     ${YLW}说明：${R}%s\n" "$fg" "$R" "${DESCS[$idx]}"
    else
      printf "%b│%b  %b%02d%b  %s\n" "$fg" "$R" "$fg" "$n" "$R" "${ITEMS[$idx]}"
      printf "%b│%b     ${DIM}%s${R}\n" "$fg" "$R" "${DESCS[$idx]}"
    fi

    if (( n < end )); then
      printf "%b│%b\n" "$fg" "$R"
    fi
  done

  printf "%b└──────────────────────────────────────────────────────────────────────────%b\n" "$fg" "$R"
}

draw_menu(){
  local cat="$1"
  local selected="$2"

  banner

  printf "${YLW}操作：${R}${B}↑↓${R} 选择功能  ${B}←→${R} 切换分区  ${B}Enter${R} 执行  ${B}1-35${R} 直达  ${B}Q${R} 退出\n\n"

  draw_tabs "$cat"
  draw_panel "$cat" "$selected"

  echo
  printf "${DIM}分区：%d/8  |  当前选项：%02d  |  公网 IPv4：%s${R}\n" \
    "$((cat+1))" "$selected" "$(display_ip)"
}

menu(){
  local cat=0
  local selected=1
  local key key2 num

  while true; do
    draw_menu "$cat" "$selected"
    IFS= read -rsn1 key

    if [[ "$key" == "" ]]; then
      clear
      run_choice "$selected"
      [[ "$selected" -ne 35 ]] && pause

    elif [[ "$key" =~ [0-9] ]]; then
      num="$key"

      while IFS= read -rsn1 -t 0.5 key2; do
        [[ "$key2" =~ [0-9] ]] || break
        num="${num}${key2}"
      done

      if [[ "$num" =~ ^[0-9]+$ ]] && ((num>=1 && num<=35)); then
        selected="$num"
        cat="$(find_category "$selected")"
        clear
        run_choice "$selected"
        [[ "$selected" -ne 35 ]] && pause
      fi

    elif [[ "$key" == "q" || "$key" == "Q" ]]; then
      exit 0

    elif [[ "$key" == $'\x1b' ]]; then
      read -rsn2 -t 0.1 key2

      case "$key2" in
        "[A")
          ((selected--))
          if (( selected < CAT_START[cat] )); then
            selected="${CAT_END[$cat]}"
          fi
          ;;
        "[B")
          ((selected++))
          if (( selected > CAT_END[cat] )); then
            selected="${CAT_START[$cat]}"
          fi
          ;;
        "[C")
          ((cat++))
          (( cat > 7 )) && cat=0
          selected="${CAT_START[$cat]}"
          ;;
        "[D")
          ((cat--))
          (( cat < 0 )) && cat=7
          selected="${CAT_START[$cat]}"
          ;;
      esac
    fi
  done
}

quick(){
  case "$1" in
    init) init_system ;;
    bbr) bbr ;;
    firewall) fw_configure_backend ;;
    trojan) deploy_trojan ;;
    reality|vless) deploy_reality ;;
    hysteria2|hy2) deploy_hy2 ;;
    export) export_pkg ;;
    http) http_start ;;
    nodequality|nq) nodequality ;;
    merge) merge_local_config ;;
    remote-merge) merge_remote_config ;;
    ai|media) ai_media_template ;;
    ai-route|server-ai|service-ai) ai_service_route_apply ;;
    ai-route-show|server-ai-show) ai_service_route_show ;;
    ai-route-rollback|server-ai-rollback) ai_service_route_rollback ;;
    forward) forward_add ;;
    relay-client) relay_client_config ;;
    bbrv3) run_bbrv3 ;;
    dns-unlock) run_dns_unlock ;;
    tcpx) run_tcpx ;;
    tcp-window) run_tcp_window ;;
    diagnose|repair) diagnose_repair ;;
    current) view_current_trojan ;;
    *) echo "quick: init|bbr|trojan|reality|hysteria2|export|http|nodequality|merge|remote-merge|ai|ai-route|ai-route-show|ai-route-rollback|forward|relay-client|bbrv3|dns-unlock|tcpx|tcp-window|diagnose|current" ;;
  esac
}

if [[ "${1:-}" == "--preview" ]]; then
  PREVIEW_MODE=1
  draw_menu 0 1
  exit 0
fi

need_root
if [[ "${1:-}" == "--quick" ]]; then
  quick "${2:-}"
else
  menu
fi
