#!/usr/bin/env bash
#
# ==============================================================================
#  LazyVPS Quick Menu Pack / 懒人建 VPS 快速菜单包
#  Formal Version: v1.2.15
#  Update Date: 2026-06-23
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
#   bash lazy-vps-menu.sh --quick media-dns
#   bash lazy-vps-menu.sh --quick dns-show
#   bash lazy-vps-menu.sh --quick dns-rollback
#   bash lazy-vps-menu.sh --quick public-ip
#   bash lazy-vps-menu.sh --quick export-check
#   bash lazy-vps-menu.sh --quick remote-publish
#   bash lazy-vps-menu.sh --quick node-test
#   bash lazy-vps-menu.sh --quick nq-archive
#   bash lazy-vps-menu.sh --quick airport-chain
#   bash lazy-vps-menu.sh --quick advanced-export
#   bash lazy-vps-menu.sh --quick strategy-template
#   bash lazy-vps-menu.sh --quick node-classify
#   bash lazy-vps-menu.sh --quick protocol-lint
#   bash lazy-vps-menu.sh --quick vless-guide
#
# ==============================================================================

set -o pipefail

APP="懒人建 VPS 快速菜单包"
VER="正式 v1.2.15 · V4/V6 独立端口与双栈策略版"
UPDATE_DATE="2026-06-23"

ROOT="/opt/lazy-vps-menu"
OUT="$ROOT/outputs"
BAK="$ROOT/backups"
HTTP_DIR="$ROOT/http-download"
LOG="$ROOT/lazy-vps.log"
REPORTS="$ROOT/reports"

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
MEDIA_DNS_DROPIN="/etc/systemd/resolved.conf.d/lazy-vps-media-dns.conf"
MEDIA_DNS_STATE="$ROOT/media_dns_state.conf"

mkdir -p "$ROOT" "$OUT" "$BAK" "$HTTP_DIR" "$REPORTS" /var/log/xray 2>/dev/null || true
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

is_private_ip(){
  local ip="$1" a b
  [[ "$ip" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]] || return 1
  IFS='.' read -r a b _ <<< "$ip"
  if (( a == 10 )); then return 0; fi
  if (( a == 172 && b >= 16 && b <= 31 )); then return 0; fi
  if (( a == 192 && b == 168 )); then return 0; fi
  if (( a == 100 && b >= 64 && b <= 127 )); then return 0; fi
  if (( a == 127 )); then return 0; fi
  return 1
}

public_ip_override(){
  awk -F= '/^PUBLIC_IP_OVERRIDE=/{print $2}' "$ROOT/public_ip_override.conf" 2>/dev/null | head -1
}

ip4_external(){
  local ip
  for url in "https://api.ipify.org" "https://ifconfig.me" "https://icanhazip.com"; do
    ip="$(curl -4 -s --max-time 6 "$url" 2>/dev/null | tr -d ' \r\n' || true)"
    if [[ -n "$ip" && "$ip" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]] && ! is_private_ip "$ip"; then
      echo "$ip"; return 0
    fi
  done
  return 1
}

ip4(){
  local ip
  ip="$(public_ip_override)"
  if [[ -n "$ip" ]]; then echo "$ip"; return 0; fi
  ip="$(ip4_external || true)"
  if [[ -n "$ip" ]]; then echo "$ip"; return 0; fi
  ip="$(ip route get 1.1.1.1 2>/dev/null | grep -oP 'src \K[0-9.]+' | head -1 || true)"
  echo "$ip"
}

public_ip_for_links(){
  local ip
  ip="$(ip4)"
  if [[ -z "$ip" || "$(is_private_ip "$ip" && echo yes || echo no)" == "yes" ]]; then
    warn "检测到公网 IP 为空或为私网 IP：${ip:-EMPTY}。可能是 NAT VPS 或 DNS 解析异常。"
    warn "请运行 35) Public IP Guard 手动设置真实公网 IP / 域名，避免 HTTP 下载链接错误。"
  fi
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
  printf "${GRN}${B}   懒人建 VPS 快速菜单包${R}  ${YLW}${B}正式 v1.2.13${R}  ${DIM}2026-06-22${R}\n"
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

media_dns_current(){
  awk -F= '/^dns=/{print $2}' "$MEDIA_DNS_STATE" 2>/dev/null | head -1
}

flclash_dns_nameservers_yaml(){
  local indent="${1:-    }"
  local mdns
  mdns="$(media_dns_current)"
  if [[ -n "$mdns" ]]; then
    printf "%s- %s\n" "$indent" "$mdns"
    printf "%s- 1.1.1.1\n" "$indent"
    printf "%s- 8.8.8.8\n" "$indent"
  else
    printf "%s- 223.5.5.5\n" "$indent"
    printf "%s- 119.29.29.29\n" "$indent"
    printf "%s- 1.1.1.1\n" "$indent"
    printf "%s- 8.8.8.8\n" "$indent"
  fi
}

flclash_dns_nameservers_inline(){
  local mdns
  mdns="$(media_dns_current)"
  if [[ -n "$mdns" ]]; then
    printf "%s,1.1.1.1,8.8.8.8" "$mdns"
  else
    printf "223.5.5.5,119.29.29.29,1.1.1.1,8.8.8.8"
  fi
}

note_export_dns_profile(){
  local mdns
  mdns="$(media_dns_current)"
  if [[ -n "$mdns" ]]; then
    note "检测到 Media DNS：$mdns，导出的 FLClash / 中转客户端配置会优先写入该 DNS。"
  else
    note "未检测到 Media DNS，导出的 FLClash 配置使用默认 DNS。"
  fi
}



proxy_server_from_latest(){
  awk '
    /^[[:space:]]*server:[[:space:]]*/ {
      gsub(/"/, "", $2);
      print $2;
      exit
    }' "$OUT/latest_flclash_fragment.yaml" 2>/dev/null
}

clash_direct_rule_for_server(){
  local server="$1"
  [[ -n "$server" ]] || return 0
  if [[ "$server" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]]; then
    echo "  - IP-CIDR,${server}/32,DIRECT,no-resolve"
  elif [[ "$server" == *:* ]]; then
    echo "  - IP-CIDR6,${server}/128,DIRECT,no-resolve"
  else
    echo "  - DOMAIN,${server},DIRECT"
  fi
}

inject_direct_rule_into_yaml(){
  local file="$1" server="$2"
  [[ -f "$file" && -n "$server" ]] || return 0
  python3 - "$file" "$server" <<'PY_DIRECT_RULE'
import sys, re
path, server = sys.argv[1:3]
s = open(path, encoding="utf-8").read()
if re.match(r"^(\d{1,3}\.){3}\d{1,3}$", server):
    rule = f"  - IP-CIDR,{server}/32,DIRECT,no-resolve"
elif ":" in server:
    rule = f"  - IP-CIDR6,{server}/128,DIRECT,no-resolve"
else:
    rule = f"  - DOMAIN,{server},DIRECT"
if rule not in s and "rules:\n" in s:
    s = s.replace("rules:\n", "rules:\n" + rule + "\n", 1)
open(path, "w", encoding="utf-8").write(s)
PY_DIRECT_RULE
}

patch_vless_servername_in_outputs(){
  local sni="$1"
  [[ -n "$sni" ]] || return 0
  for f in "$OUT"/01_IMPORT_FLCLASH*.yaml "$OUT"/latest_flclash_fragment.yaml "$OUT"/03_DO_NOT_IMPORT_NODE_FRAGMENT.yaml; do
    [[ -f "$f" ]] || continue
    python3 - "$f" "$sni" <<'PY_PATCH_SNI'
import sys, re
path, sni = sys.argv[1:3]
text = open(path, encoding="utf-8").read()
text = re.sub(r'(?m)^(\s*servername:\s*).+$', r'\1' + sni, text)
open(path, "w", encoding="utf-8").write(text)
PY_PATCH_SNI
  done
}

write_imports(){
  local node node_q proxy_server
  node="$(grep -m1 '^- name:' "$OUT/latest_flclash_fragment.yaml" 2>/dev/null | sed 's/^- name:[[:space:]]*//' | sed 's/^"//;s/"$//')"
  [[ -n "$node" ]] || node="GF-Node"
  node_q="$(yaml_quote "$node")"
  proxy_server="$(proxy_server_from_latest)"

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
EOF
  flclash_dns_nameservers_yaml "    " >> "$OUT/01_IMPORT_FLCLASH.yaml"
  cat >> "$OUT/01_IMPORT_FLCLASH.yaml" <<EOF

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
EOF
  clash_direct_rule_for_server "$proxy_server" >> "$OUT/01_IMPORT_FLCLASH.yaml"
  cat >> "$OUT/01_IMPORT_FLCLASH.yaml" <<EOF
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
# 代理服务器本身直连，避免回环
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
    sni="$(ask 'SNI：默认沿用当前服务端 SNI' "${cur_sni:-www.cloudflare.com}")"
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
    sni="$(ask 'SNI' 'www.cloudflare.com')"
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
  sni="$(ask 'Reality serverName，推荐统一使用 Cloudflare；可填 www.microsoft.com / www.apple.com / www.yahoo.com' 'www.cloudflare.com')"

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
  sni="$(ask 'SNI' 'www.cloudflare.com')"
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
  note_export_dns_profile
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
  ip="$(public_ip_for_links)"
  now="$(ts)"
  dir="/root/LazyVPS_Node_Output_${ip}_${now}"
  pkg="${dir}.tar.gz"

  mkdir -p "$dir/DO_NOT_IMPORT_fragments" "$dir/server_config_backup" "$dir/status"
  [[ -f "$OUT/01_IMPORT_FLCLASH.yaml" ]] && cp "$OUT/01_IMPORT_FLCLASH.yaml" "$dir/01_IMPORT_FLCLASH.yaml"
  export_advanced_flclash >/dev/null 2>&1 || true
  [[ -f "$OUT/01_IMPORT_FLCLASH_ADVANCED.yaml" ]] && cp "$OUT/01_IMPORT_FLCLASH_ADVANCED.yaml" "$dir/01_IMPORT_FLCLASH_ADVANCED.yaml"
  [[ -f "$OUT/01_IMPORT_FLCLASH_IPV4.yaml" ]] && cp "$OUT/01_IMPORT_FLCLASH_IPV4.yaml" "$dir/01_IMPORT_FLCLASH_IPV4.yaml"
  [[ -f "$OUT/01_IMPORT_FLCLASH_IPV6.yaml" ]] && cp "$OUT/01_IMPORT_FLCLASH_IPV6.yaml" "$dir/01_IMPORT_FLCLASH_IPV6.yaml"
  [[ -f "$OUT/01_IMPORT_FLCLASH_IPV6_STABLE.yaml" ]] && cp "$OUT/01_IMPORT_FLCLASH_IPV6_STABLE.yaml" "$dir/01_IMPORT_FLCLASH_IPV6_STABLE.yaml"
  [[ -f "$OUT/01_IMPORT_FLCLASH_DUALSTACK.yaml" ]] && cp "$OUT/01_IMPORT_FLCLASH_DUALSTACK.yaml" "$dir/01_IMPORT_FLCLASH_DUALSTACK.yaml"
  cp -f "$OUT"/01_IMPORT_FLCLASH_IPV6_PORT*.yaml "$dir/" 2>/dev/null || true
  cp -f "$OUT"/01_IMPORT_FLCLASH_IPV6_REALITY_PORT*.yaml "$dir/" 2>/dev/null || true
  cp -f "$OUT"/01_IMPORT_FLCLASH_IPV4_REALITY_PORT*.yaml "$dir/" 2>/dev/null || true
  [[ -f "$OUT/01_IMPORT_FLCLASH_V4V6_SPLIT.yaml" ]] && cp "$OUT/01_IMPORT_FLCLASH_V4V6_SPLIT.yaml" "$dir/01_IMPORT_FLCLASH_V4V6_SPLIT.yaml"
  [[ -f "$OUT/01_IMPORT_FLCLASH_DUALSTACK_AUTO.yaml" ]] && cp "$OUT/01_IMPORT_FLCLASH_DUALSTACK_AUTO.yaml" "$dir/01_IMPORT_FLCLASH_DUALSTACK_AUTO.yaml"
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
  [[ -f "$OUT/01_IMPORT_FLCLASH_ADVANCED.yaml" ]] && cp "$OUT/01_IMPORT_FLCLASH_ADVANCED.yaml" "$HTTP_DIR/01_IMPORT_FLCLASH_ADVANCED.yaml"
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
  ip="$(public_ip_for_links)"
  mkdir -p "$HTTP_DIR"
  if [[ ! -f /root/lazy-vps-output-latest.tar.gz ]]; then
    warn "未发现导出包，正在自动导出。"
    export_pkg >/dev/null 2>&1 || true
  fi
  cp -f /root/lazy-vps-output-latest.tar.gz "$HTTP_DIR/" 2>/dev/null || true
  [[ -f "$OUT/01_IMPORT_FLCLASH.yaml" ]] && cp -f "$OUT/01_IMPORT_FLCLASH.yaml" "$HTTP_DIR/"
  [[ -f "$OUT/01_IMPORT_FLCLASH_ADVANCED.yaml" ]] && cp -f "$OUT/01_IMPORT_FLCLASH_ADVANCED.yaml" "$HTTP_DIR/"
  [[ -f "$OUT/01_IMPORT_FLCLASH_IPV4.yaml" ]] && cp -f "$OUT/01_IMPORT_FLCLASH_IPV4.yaml" "$HTTP_DIR/"
  [[ -f "$OUT/01_IMPORT_FLCLASH_IPV6.yaml" ]] && cp -f "$OUT/01_IMPORT_FLCLASH_IPV6.yaml" "$HTTP_DIR/"
  [[ -f "$OUT/01_IMPORT_FLCLASH_IPV6_STABLE.yaml" ]] && cp -f "$OUT/01_IMPORT_FLCLASH_IPV6_STABLE.yaml" "$HTTP_DIR/"
  [[ -f "$OUT/01_IMPORT_FLCLASH_DUALSTACK.yaml" ]] && cp -f "$OUT/01_IMPORT_FLCLASH_DUALSTACK.yaml" "$HTTP_DIR/"
  cp -f "$OUT"/01_IMPORT_FLCLASH_IPV6_PORT*.yaml "$HTTP_DIR/" 2>/dev/null || true
  cp -f "$OUT"/01_IMPORT_FLCLASH_IPV6_ONLY_PORT*.yaml "$HTTP_DIR/" 2>/dev/null || true
  cp -f "$OUT"/01_IMPORT_FLCLASH_IPV6_REALITY_443.yaml "$HTTP_DIR/" 2>/dev/null || true
  cp -f "$OUT"/01_IMPORT_FLCLASH_IPV6_REALITY_PORT*.yaml "$HTTP_DIR/" 2>/dev/null || true
  cp -f "$OUT"/01_IMPORT_FLCLASH_IPV4_REALITY_PORT*.yaml "$HTTP_DIR/" 2>/dev/null || true
  [[ -f "$OUT/01_IMPORT_FLCLASH_V4V6_SPLIT.yaml" ]] && cp -f "$OUT/01_IMPORT_FLCLASH_V4V6_SPLIT.yaml" "$HTTP_DIR/"
  [[ -f "$OUT/01_IMPORT_FLCLASH_DUALSTACK_AUTO.yaml" ]] && cp -f "$OUT/01_IMPORT_FLCLASH_DUALSTACK_AUTO.yaml" "$HTTP_DIR/"
  [[ -f "$OUT/02_IMPORT_SURGE.conf" ]] && cp -f "$OUT/02_IMPORT_SURGE.conf" "$HTTP_DIR/"
  [[ -f "$HTTP_PID" ]] && kill "$(cat "$HTTP_PID")" 2>/dev/null || true
  fw_open_port "$HTTP_PORT" "tcp"
  (cd "$HTTP_DIR" && nohup python3 -m http.server "$HTTP_PORT" --bind 0.0.0.0 >/tmp/lazy-vps-http.log 2>&1 & echo $! > "$HTTP_PID")
  ok "HTTP 下载已开启。"
  echo "FLClash: http://$ip:$HTTP_PORT/01_IMPORT_FLCLASH.yaml"
  [[ -f "$OUT/01_IMPORT_FLCLASH_ADVANCED.yaml" ]] && echo "进阶FLClash: http://$ip:$HTTP_PORT/01_IMPORT_FLCLASH_ADVANCED.yaml"
  [[ -f "$OUT/01_IMPORT_FLCLASH_IPV4.yaml" ]] && echo "IPv4 FLClash: http://$ip:$HTTP_PORT/01_IMPORT_FLCLASH_IPV4.yaml"
  [[ -f "$OUT/01_IMPORT_FLCLASH_IPV6.yaml" ]] && echo "IPv6 FLClash: http://$ip:$HTTP_PORT/01_IMPORT_FLCLASH_IPV6.yaml"
  [[ -f "$OUT/01_IMPORT_FLCLASH_IPV6_STABLE.yaml" ]] && echo "IPv6 Stable FLClash: http://$ip:$HTTP_PORT/01_IMPORT_FLCLASH_IPV6_STABLE.yaml"
  [[ -f "$OUT/01_IMPORT_FLCLASH_DUALSTACK.yaml" ]] && echo "DualStack FLClash: http://$ip:$HTTP_PORT/01_IMPORT_FLCLASH_DUALSTACK.yaml"
  for f in "$HTTP_DIR"/01_IMPORT_FLCLASH_IPV6_PORT*.yaml "$HTTP_DIR"/01_IMPORT_FLCLASH_IPV6_ONLY_PORT*.yaml "$HTTP_DIR"/01_IMPORT_FLCLASH_IPV6_REALITY_PORT*.yaml; do
    [[ -f "$f" ]] && echo "IPv6 独立端口 FLClash: http://$ip:$HTTP_PORT/$(basename "$f")"
  done
  for f in "$HTTP_DIR"/01_IMPORT_FLCLASH_IPV4_REALITY_PORT*.yaml; do
    [[ -f "$f" ]] && echo "IPv4 备用端口 FLClash: http://$ip:$HTTP_PORT/$(basename "$f")"
  done
  [[ -f "$HTTP_DIR/01_IMPORT_FLCLASH_V4V6_SPLIT.yaml" ]] && echo "V4/V6 Split FLClash: http://$ip:$HTTP_PORT/01_IMPORT_FLCLASH_V4V6_SPLIT.yaml"
  [[ -f "$HTTP_DIR/01_IMPORT_FLCLASH_DUALSTACK_AUTO.yaml" ]] && echo "DualStack Auto FLClash: http://$ip:$HTTP_PORT/01_IMPORT_FLCLASH_DUALSTACK_AUTO.yaml"
  curl -I --connect-timeout 5 "http://127.0.0.1:${HTTP_PORT}/01_IMPORT_FLCLASH_IPV6_STABLE.yaml" >/dev/null 2>&1 && ok "HTTP 本机校验：IPv6 Stable 200 OK" || warn "HTTP 本机校验未通过，请执行 IPv6 Mode → HTTP Sync Verify。"
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
  note "验证建议：客户端继续选择当前入口节点后，打开 https://ip.net.coffee/claude/ 检查 AI 出口是否显示日本/台湾。"
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

  python3 - "$OUT/latest_flclash_fragment.yaml" "$OUT/01_IMPORT_FLCLASH_RELAY.yaml" "$entry" "$port" "$relay_name" "$(media_dns_current)" <<'PY'
import sys, yaml
frag_path, out_path, entry, port, name, media_dns = sys.argv[1:7]
media_dns = (media_dns or "").strip()
if media_dns:
    nameservers = [media_dns, "1.1.1.1", "8.8.8.8"]
else:
    nameservers = ["223.5.5.5", "119.29.29.29", "1.1.1.1", "8.8.8.8"]
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
        "nameserver": nameservers
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

media_dns_valid_ip(){
  local ip="$1"
  [[ "$ip" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]] || return 1
  local IFS='.' a b c d
  read -r a b c d <<< "$ip"
  for n in "$a" "$b" "$c" "$d"; do
    [[ "$n" -ge 0 && "$n" -le 255 ]] || return 1
  done
}

media_dns_backup(){
  mkdir -p "$BAK"
  [[ -f /etc/resolv.conf ]] && cp -a /etc/resolv.conf "$BAK/resolv.conf.before_media_dns_$(ts).bak" 2>/dev/null || true
  [[ -f /etc/systemd/resolved.conf ]] && cp -a /etc/systemd/resolved.conf "$BAK/resolved.conf.before_media_dns_$(ts).bak" 2>/dev/null || true
  [[ -f "$MEDIA_DNS_DROPIN" ]] && cp -a "$MEDIA_DNS_DROPIN" "$BAK/lazy-vps-media-dns.before_media_dns_$(ts).bak" 2>/dev/null || true
  ok "已备份 DNS 相关配置到：$BAK"
}

media_dns_write_state(){
  local label="$1" dns="$2" mode="$3"
  cat > "$MEDIA_DNS_STATE" <<EOF
label=$label
dns=$dns
mode=$mode
updated=$(date '+%F %T')
note=Media DNS 仅用于流媒体 DNS/CDN 解析辅助，不改变 VPS 出口 IP。
EOF
}

media_dns_apply(){
  local dns="$1" label="$2" mode="resolv.conf"
  section "Media DNS Unlock / 流媒体 DNS 解锁辅助"
  note "该功能用于接入商提供的流媒体 DNS，例如 Zouter 151.243.229.229。"
  note "它可能改善 Netflix / Disney+ / YouTube 等平台的 DNS/CDN 区域解析。"
  warn "它不会改变 VPS 出口 IP，也不能保证绕过所有平台的 IP 风控。"
  warn "如果平台主要看出口 IP 是否可用，仍需要换落地 VPS、服务端分流或端口中转。"

  media_dns_valid_ip "$dns" || { err "DNS IP 格式不正确：$dns"; return 1; }

  echo
  info "准备设置 DNS：$dns  ($label)"
  read -rp "确认写入 Media DNS？[y/N]: " ans
  [[ "$ans" =~ ^[Yy]$ ]] || return 0

  media_dns_backup

  if systemctl is-active --quiet systemd-resolved 2>/dev/null; then
    mode="systemd-resolved"
    mkdir -p /etc/systemd/resolved.conf.d
    cat > "$MEDIA_DNS_DROPIN" <<EOF
[Resolve]
DNS=$dns
FallbackDNS=1.1.1.1 8.8.8.8
DNSStubListener=yes
EOF
    systemctl restart systemd-resolved
    ok "已写入 systemd-resolved drop-in：$MEDIA_DNS_DROPIN"
  else
    mode="resolv.conf"
    if [[ -L /etc/resolv.conf ]]; then
      warn "/etc/resolv.conf 是软链接；若由云厂商或 systemd 管理，重启后可能被覆盖。"
    fi
    cat > /etc/resolv.conf <<EOF
nameserver $dns
nameserver 1.1.1.1
nameserver 8.8.8.8
EOF
    ok "已写入 /etc/resolv.conf"
  fi

  media_dns_write_state "$label" "$dns" "$mode"
  media_dns_show

  echo
  note "建议验证：重新连接客户端节点后，打开 Netflix / Disney+ / YouTube / TikTok 等检测。"
  note "若无变化，说明该平台主要看出口 IP，不是 DNS 解析问题。"
}

media_dns_apply_zouter(){
  media_dns_apply "151.243.229.229" "Zouter Media DNS"
}

media_dns_apply_custom(){
  section "Custom Media DNS / 自定义流媒体 DNS"
  note "请输入接入商提供的 DNS。示例：151.243.229.229"
  read -rp "DNS IP: " dns
  [[ -n "$dns" ]] || { warn "未输入 DNS。"; return; }
  media_dns_apply "$dns" "Custom Media DNS"
}

media_dns_show(){
  section "Media DNS 状态 / Show DNS"
  if [[ -f "$MEDIA_DNS_STATE" ]]; then
    info "LazyVPS Media DNS 状态："
    cat "$MEDIA_DNS_STATE"
  else
    warn "未发现 LazyVPS Media DNS 状态文件：$MEDIA_DNS_STATE"
  fi

  echo
  info "/etc/resolv.conf 指向："
  readlink -f /etc/resolv.conf 2>/dev/null || true

  echo
  info "/etc/resolv.conf 内容："
  sed -n '1,20p' /etc/resolv.conf 2>/dev/null || true

  if has resolvectl; then
    echo
    info "resolvectl DNS："
    resolvectl dns 2>/dev/null || true
  fi

  if has dig; then
    local dns
    dns="$(awk -F= '/^dns=/{print $2}' "$MEDIA_DNS_STATE" 2>/dev/null | head -1)"
    [[ -n "$dns" ]] || dns="151.243.229.229"
    echo
    info "测试解析 netflix.com / disneyplus.com："
    echo "dig @$dns netflix.com +short"
    dig @"$dns" netflix.com +short 2>/dev/null | head -5 || true
    echo "dig @$dns disneyplus.com +short"
    dig @"$dns" disneyplus.com +short 2>/dev/null | head -5 || true
  else
    warn "未安装 dig，如需解析测试可执行：apt update && apt install -y dnsutils"
  fi
}

media_dns_rollback(){
  section "Media DNS Rollback / 回滚 DNS"
  warn "将移除 LazyVPS systemd-resolved drop-in，并尝试恢复最近的 resolv.conf 备份。"
  read -rp "确认回滚 DNS？[y/N]: " ans
  [[ "$ans" =~ ^[Yy]$ ]] || return 0

  rm -f "$MEDIA_DNS_DROPIN" 2>/dev/null || true

  local latest
  latest="$(ls -t "$BAK"/resolv.conf.before_media_dns_*.bak 2>/dev/null | head -1 || true)"
  if [[ -n "$latest" ]]; then
    cp -a "$latest" /etc/resolv.conf 2>/dev/null || warn "恢复 /etc/resolv.conf 失败，可能是软链接或权限问题。"
    ok "已尝试恢复：$latest"
  else
    warn "没有找到 resolv.conf 备份。"
  fi

  if systemctl is-active --quiet systemd-resolved 2>/dev/null; then
    systemctl restart systemd-resolved || true
  fi

  rm -f "$MEDIA_DNS_STATE" 2>/dev/null || true
  media_dns_show
}

media_dns_test(){
  section "Media DNS Test / 解析测试"
  local dns domain
  dns="$(awk -F= '/^dns=/{print $2}' "$MEDIA_DNS_STATE" 2>/dev/null | head -1)"
  [[ -n "$dns" ]] || dns="151.243.229.229"
  read -rp "测试 DNS [$dns]: " input_dns
  dns="${input_dns:-$dns}"
  read -rp "测试域名 [netflix.com]: " domain
  domain="${domain:-netflix.com}"
  domain="${domain#http://}"
  domain="${domain#https://}"
  domain="${domain%%/*}"
  domain="${domain%%:*}"
  if [[ -z "$domain" ]]; then
    warn "域名为空，改用 netflix.com"
    domain="netflix.com"
  fi

  if ! has dig; then
    warn "未安装 dig，正在安装 dnsutils。"
    apt update && apt install -y dnsutils || { err "dnsutils 安装失败。"; return 1; }
  fi

  echo
  info "使用 Media DNS：$dns"
  dig @"$dns" "$domain" +short || true
  echo
  info "对比 Cloudflare DNS：1.1.1.1"
  dig @1.1.1.1 "$domain" +short || true
}

run_dns_unlock(){
  section "DNS Unlock / 流媒体 DNS 解锁工具"
  note "本菜单包含 Zouter Media DNS、自定义 Media DNS、Alice DNS Unlock、查看与回滚。"
  note "Media DNS 是流媒体 DNS/CDN 解析辅助，不等于更换出口 IP。"
  warn "若平台主要判断出口 IP 是否可用，DNS 解锁不会替代干净落地 IP。"

  echo
  printf "${CYN}请选择：${R}
"
  printf "  1) Zouter Media DNS / 使用 Zouter 流媒体 DNS：151.243.229.229
"
  printf "  2) Custom Media DNS / 自定义接入商流媒体 DNS
"
  printf "  3) Alice DNS Unlock / 第三方 DNS Alice 解锁脚本
"
  printf "  4) Show DNS / 查看当前 DNS 与解析测试
"
  printf "  5) Rollback DNS / 回滚 LazyVPS DNS 配置
"
  printf "  6) Test DNS / 指定域名解析对比
"
  printf "  0) 返回
"
  read -rp "序号: " ans

  case "$ans" in
    1) media_dns_apply_zouter ;;
    2) media_dns_apply_custom ;;
    3)
      warn "第三方 DNS 分流脚本，可能修改 dnsmasq / resolv / 端口 53。"
      read -rp "继续运行 Alice DNS Unlock？[y/N]: " y
      [[ "$y" =~ ^[Yy]$ ]] || return
      wget https://raw.githubusercontent.com/Jimmyzxk/DNS-Alice-Unlock/refs/heads/main/dns-unlock.sh -O /root/dns-unlock.sh
      bash /root/dns-unlock.sh
      ;;
    4) media_dns_show ;;
    5) media_dns_rollback ;;
    6) media_dns_test ;;
    0|"") return ;;
    *) warn "输入无效。" ;;
  esac
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

public_ip_guard(){
  section "Public IP Guard / NAT 公网 IP 识别保护"
  note "用于避免 NAT VPS / DNS 故障时，把 10.x / 172.16-31.x / 192.168.x / 100.64.x 误当公网 IP。"
  local ext routeip hostips ov ans manual
  ov="$(public_ip_override)"
  ext="$(ip4_external || true)"
  routeip="$(ip route get 1.1.1.1 2>/dev/null | grep -oP 'src \K[0-9.]+' | head -1 || true)"
  hostips="$(hostname -I 2>/dev/null || true)"
  info "当前 override：${ov:-未设置}"
  info "外部服务检测公网 IPv4：${ext:-失败/为空}"
  info "系统路由源地址：${routeip:-未知}"
  info "hostname -I：${hostips:-未知}"
  if [[ -n "$routeip" ]] && is_private_ip "$routeip"; then
    warn "系统路由源地址是私网 IP：$routeip，不能用于 HTTP 下载链接。"
  fi
  if [[ -n "$ext" ]]; then
    ok "外部公网 IP 检测可用：$ext"
    read -rp "是否保存 $ext 为下载链接使用的公网 IP？[y/N]: " ans
    if [[ "$ans" =~ ^[Yy]$ ]]; then
      echo "PUBLIC_IP_OVERRIDE=$ext" > "$ROOT/public_ip_override.conf"
      ok "已保存 override：$ext"
    fi
  else
    warn "外部公网 IP 检测失败。可能是 DNS、网络或当前 VPS 是 NAT 场景。"
  fi
  read -rp "是否手动输入真实公网 IP / 域名作为 override？[y/N]: " ans
  if [[ "$ans" =~ ^[Yy]$ ]]; then
    read -rp "真实公网 IP / 域名: " manual
    if [[ -n "$manual" ]]; then
      echo "PUBLIC_IP_OVERRIDE=$manual" > "$ROOT/public_ip_override.conf"
      ok "已保存 override：$manual"
    fi
  fi
  info "当前用于链接显示的 IP / 域名：$(ip4)"
}

export_safety_check(){
  section "Export Safety Check / 导出配置安全检查"
  ensure_yaml || return 1
  local file="${1:-$OUT/01_IMPORT_FLCLASH.yaml}" now report rc
  [[ -f "$file" ]] || { warn "未发现 $file，尝试执行导出。"; export_pkg >/dev/null 2>&1 || true; }
  [[ -f "$file" ]] || { err "仍未发现配置：$file"; return 1; }
  now="$(ts)"
  report="$REPORTS/export_safety_${now}.md"
  python3 - "$file" "$report" <<'PY_LAZY_EXPORT_CHECK'
import sys, yaml, collections, ipaddress
f, report = sys.argv[1:3]
issues=[]; warns=[]; ok=[]
try:
    cfg=yaml.safe_load(open(f,encoding='utf-8')) or {}
    ok.append('YAML 解析成功')
except Exception as e:
    cfg={}; issues.append(f'YAML 解析失败：{e}')
proxies=cfg.get('proxies') or []
names=[]
for i,p in enumerate(proxies):
    if not isinstance(p,dict): issues.append(f'proxies[{i}] 不是对象'); continue
    name=p.get('name'); names.append(name)
    for k in ['server','port','type']:
        if not p.get(k): issues.append(f'节点 {name or i} 缺少 {k}')
    if p.get('type') in ['trojan','vless'] and not (p.get('password') or p.get('uuid')):
        warns.append(f'节点 {name} 可能缺少 password/uuid')
for n,c in collections.Counter(names).items():
    if n and c>1: issues.append(f'重复节点名：{n} × {c}')
node_set=set(n for n in names if n)
groups=cfg.get('proxy-groups') or []
group_names=[x.get('name') for x in groups if isinstance(x,dict)]
for g in groups:
    if not isinstance(g,dict): continue
    gname=g.get('name')
    for p in g.get('proxies') or []:
        if p in ['DIRECT','REJECT','GLOBAL','PROXY','PASS'] or p in node_set or p in group_names: continue
        warns.append(f'策略组 {gname} 引用了可能不存在的节点/组：{p}')
rules=cfg.get('rules') or []
if not rules: warns.append('rules 为空')
if not any(str(r).startswith('MATCH,') for r in rules): warns.append('未发现 MATCH 兜底规则')
if any('DO_NOT_IMPORT' in str(x) for x in [f]+rules): issues.append('疑似包含 DO_NOT_IMPORT 片段')
for p in proxies:
    if isinstance(p,dict):
        s=str(p.get('server',''))
        try:
            ip=ipaddress.ip_address(s)
            if ip.is_private: warns.append(f'节点 {p.get("name")} server 是私网 IP：{s}')
        except Exception: pass
status='PASS' if not issues else 'FAIL'
lines=['# Export Safety Report','',f'- 文件：`{f}`',f'- 结果：**{status}**',f'- 节点数：{len(proxies)}',f'- 策略组数：{len(groups)}',f'- 规则数：{len(rules)}','']
lines+=['## 通过项']+[f'- {x}' for x in ok]+['']
lines+=['## 错误']+([f'- {x}' for x in issues] or ['- 无'])+['']
lines+=['## 警告']+([f'- {x}' for x in warns] or ['- 无'])+['']
open(report,'w',encoding='utf-8').write('\n'.join(lines))
print('\n'.join(lines))
sys.exit(1 if issues else 0)
PY_LAZY_EXPORT_CHECK
  rc=$?
  cp "$report" "$REPORTS/export_safety_latest.md" 2>/dev/null || true
  if [[ $rc -eq 0 ]]; then ok "导出配置安全检查通过：$report"; else err "导出配置安全检查发现错误：$report"; fi
  return $rc
}

export_verify(){
  section "Export Verify / 导出后验证"
  export_pkg >/dev/null 2>&1 || true
  export_safety_check "$OUT/01_IMPORT_FLCLASH.yaml"
}

remote_publish(){
  section "Remote Publish / 远程订阅发布"
  note "将当前导出的 sub.yaml / surge.conf 上传到远程订阅服务器，并在远端自动备份上一版。"
  [[ -f "$OUT/01_IMPORT_FLCLASH.yaml" ]] || export_pkg >/dev/null 2>&1 || true
  export_safety_check "$OUT/01_IMPORT_FLCLASH.yaml" || { warn "安全检查未通过，仍要继续请手动确认。"; read -rp "继续发布？[y/N]: " go; [[ "$go" =~ ^[Yy]$ ]] || return 1; }
  local user host r_sub r_surge web_sub web_surge tsnow
  user="$(ask '远程 VPS 用户' 'root')"
  host="$(ask_required '远程 VPS IP / 域名')"
  r_sub="$(ask '远程暂存 sub.yaml' '/root/sub.yaml')"
  r_surge="$(ask '远程暂存 surge.conf' '/root/surge.conf')"
  web_sub="$(ask 'Web 订阅 sub.yaml 路径' '/var/www/html/sub.yaml')"
  web_surge="$(ask 'Web 订阅 surge.conf 路径' '/var/www/html/surge.conf')"
  tsnow="$(ts)"
  step "上传文件"
  scp "$OUT/01_IMPORT_FLCLASH.yaml" "${user}@${host}:${r_sub}" || { err "上传 sub.yaml 失败"; return 1; }
  [[ -f "$OUT/02_IMPORT_SURGE.conf" ]] && scp "$OUT/02_IMPORT_SURGE.conf" "${user}@${host}:${r_surge}" || true
  step "远端备份并发布"
  ssh "${user}@${host}" "mkdir -p /var/www/html/backups; [[ -f '$web_sub' ]] && cp '$web_sub' '/var/www/html/backups/sub_${tsnow}.yaml' || true; [[ -f '$web_surge' ]] && cp '$web_surge' '/var/www/html/backups/surge_${tsnow}.conf' || true; mkdir -p \$(dirname '$web_sub') \$(dirname '$web_surge'); cp '$r_sub' '$web_sub'; [[ -f '$r_surge' ]] && cp '$r_surge' '$web_surge' || true; chmod 644 '$web_sub' '$web_surge' 2>/dev/null || true; (nginx -t && systemctl reload nginx) 2>/dev/null || systemctl restart nginx 2>/dev/null || true"
  ok "远程发布完成。"
  echo "测试：curl -I http://${host}/sub.yaml"
}

node_test_pack(){
  section "Node Test Pack / 节点体检包"
  local now report csv ip port node
  now="$(ts)"; report="$REPORTS/node_test_${now}.md"; csv="$REPORTS/node_test_${now}.csv"; ip="$(ip4)"
  port="$(python3 - <<'PY_LAZY_PORT' 2>/dev/null
import json
try:
  c=json.load(open('/usr/local/etc/xray/config.json'))
  print(c.get('inbounds',[{}])[0].get('port','443'))
except Exception: print('443')
PY_LAZY_PORT
)"
  node="$(grep -m1 '^- name:' "$OUT/latest_flclash_fragment.yaml" 2>/dev/null | sed 's/^- name:[[:space:]]*//;s/^"//;s/"$//' || true)"
  {
    echo "# Node Test Pack"
    echo
    echo "- 时间：$(date '+%F %T')"
    echo "- 节点：${node:-未知}"
    echo "- 公网 IP：${ip:-未知}"
    echo "- 端口：$port"
    echo
    echo "## 服务状态"
    systemctl is-active xray 2>/dev/null | sed 's/^/- Xray: /' || true
    echo
    echo "## 端口监听"
    ss -lntup | grep -E ":($port|443|8443|8088)" || true
    echo
    echo "## Xray 配置测试"
    "$XRAY" run -test -config "$XCONF" 2>&1 || true
    echo
    echo "## DNS"
    sed -n '1,10p' /etc/resolv.conf 2>/dev/null || true
    echo
    echo "## 外部连通"
    curl -4 -I --connect-timeout 8 https://www.gstatic.com/generate_204 2>/dev/null | head -5 || true
    curl -4 -I --connect-timeout 8 https://chatgpt.com 2>/dev/null | head -5 || true
    curl -4 -I --connect-timeout 8 https://www.netflix.com 2>/dev/null | head -5 || true
  } | tee "$report"
  echo "metric,value" > "$csv"
  echo "public_ip,${ip:-unknown}" >> "$csv"
  echo "port,$port" >> "$csv"
  echo "xray,$(systemctl is-active xray 2>/dev/null || echo unknown)" >> "$csv"
  ln -sf "$report" "$REPORTS/node_test_latest.md" 2>/dev/null || true
  ok "节点体检完成：$report"
  info "CSV：$csv"
}

nodequality_archive(){
  section "NodeQuality 快速归档"
  mkdir -p "$REPORTS/nodequality"
  local now logf
  now="$(ts)"; logf="$REPORTS/nodequality/nodequality_${now}.log"
  note "运行 run.NodeQuality.com，并保存日志到：$logf"
  read -rp "开始？[Y/n]: " ans
  [[ "$ans" =~ ^[Nn]$ ]] && return 0
  bash <(curl -sL https://run.NodeQuality.com) 2>&1 | tee "$logf"
  ln -sf "$logf" "$REPORTS/nodequality_latest.log" 2>/dev/null || true
  ok "NodeQuality 日志已归档：$logf"
}

airport_chain_template(){
  section "Airport Chain Template / 机场链规则模板"
  note "生成 AI / 媒体机场链策略组模板；不内置任何机场订阅 URL、Token 或节点密码。"
  local out_yaml="$OUT/airport_chain_template.yaml" out_md="$OUT/airport_chain_template.md"
  cat > "$out_yaml" <<'EOF'
# LazyVPS Airport Chain Template / 机场链规则模板
# 使用方式：先在客户端导入自己的机场订阅，再把下列策略组中的占位项替换为自己的机场策略组或节点名。
proxy-groups:
  - name: 🤖 AI机场链
    type: select
    proxies:
      - 手动选择你的机场AI节点或策略组
      - 🏗️ 自建VPS总组
      - DIRECT
  - name: 🎬 流媒体机场链
    type: select
    proxies:
      - 手动选择你的机场媒体节点或策略组
      - 🏗️ 自建VPS总组
      - DIRECT
rules:
  - DOMAIN-SUFFIX,chatgpt.com,🤖 AI机场链
  - DOMAIN-SUFFIX,openai.com,🤖 AI机场链
  - DOMAIN-SUFFIX,oaistatic.com,🤖 AI机场链
  - DOMAIN-SUFFIX,oaiusercontent.com,🤖 AI机场链
  - DOMAIN-SUFFIX,claude.ai,🤖 AI机场链
  - DOMAIN-SUFFIX,anthropic.com,🤖 AI机场链
  - DOMAIN-SUFFIX,gemini.google.com,🤖 AI机场链
  - DOMAIN-SUFFIX,netflix.com,🎬 流媒体机场链
  - DOMAIN-SUFFIX,nflxvideo.net,🎬 流媒体机场链
  - DOMAIN-SUFFIX,disneyplus.com,🎬 流媒体机场链
  - DOMAIN-SUFFIX,disney-plus.net,🎬 流媒体机场链
  - DOMAIN-SUFFIX,youtube.com,🎬 流媒体机场链
  - DOMAIN-SUFFIX,googlevideo.com,🎬 流媒体机场链
  - DOMAIN-SUFFIX,tiktok.com,🎬 流媒体机场链
EOF
  cat > "$out_md" <<'EOF'
# Airport Chain Template / 机场链模板说明

机场链适合：自建 VPS 作为普通入口，AI / 流媒体域名交给外购机场节点或机场策略组。

安全原则：

- 不在开源脚本内置机场订阅 URL
- 不内置 Token
- 不内置节点 password
- 只提供策略组和规则模板

模板文件：airport_chain_template.yaml
EOF
  ok "已生成：$out_yaml"
  ok "说明：$out_md"
}


advanced_strategy_template(){
  section "Advanced Strategy Template / 成熟策略组模板"
  mkdir -p "$OUT"
  local out_yaml="$OUT/advanced_strategy_template.yaml" out_md="$OUT/advanced_strategy_template.md"
  cat > "$out_yaml" <<'EOF'
# LazyVPS Advanced Strategy Groups / 成熟策略组模板
# 用法：合并到 FLClash/Mihomo 配置后，把占位策略组中的节点替换成自己的自建 VPS、外购 VPN 或机场策略组。
proxy-groups:
  - name: 🚦 PROXY
    type: select
    proxies:
      - 🌏 AUTO
      - 🏗️ 自建VPS
      - 🧩 外购VPN
      - ⛓️ AI/媒体机场链
      - DIRECT

  - name: 🌏 AUTO
    type: url-test
    proxies:
      - 手动替换为你的节点
    url: https://www.gstatic.com/generate_204
    interval: 300
    tolerance: 50

  - name: 🏗️ 自建VPS
    type: select
    proxies:
      - 手动替换为你的自建VPS节点
      - DIRECT

  - name: 🧩 外购VPN
    type: select
    proxies:
      - 手动替换为你的外购VPN节点
      - DIRECT

  - name: 🤖 AI组
    type: select
    proxies:
      - ⛓️ AI/媒体机场链
      - 🏗️ 自建VPS
      - 🧩 外购VPN
      - 🚦 PROXY
      - DIRECT

  - name: 🎬 流媒体
    type: select
    proxies:
      - ⛓️ AI/媒体机场链
      - 🧩 外购VPN
      - 🏗️ 自建VPS
      - 🚦 PROXY
      - DIRECT

  - name: ⛓️ AI/媒体机场链
    type: select
    proxies:
      - 手动替换为你的机场AI/媒体策略组
      - 🧩 外购VPN
      - 🏗️ 自建VPS
      - DIRECT

  - name: 🍎 Apple
    type: select
    proxies:
      - DIRECT
      - 🚦 PROXY

  - name: 🔍 Google
    type: select
    proxies:
      - 🚦 PROXY
      - DIRECT

  - name: 🪟 Microsoft
    type: select
    proxies:
      - DIRECT
      - 🚦 PROXY

  - name: 📟 Telegram
    type: select
    proxies:
      - 🚦 PROXY
      - 🧩 外购VPN

  - name: 🎮 Game
    type: select
    proxies:
      - 🚦 PROXY
      - DIRECT

  - name: 🐠 FINAL
    type: select
    proxies:
      - 🚦 PROXY
      - DIRECT

rules:
  - DOMAIN-SUFFIX,chatgpt.com,🤖 AI组
  - DOMAIN-SUFFIX,openai.com,🤖 AI组
  - DOMAIN-SUFFIX,oaistatic.com,🤖 AI组
  - DOMAIN-SUFFIX,oaiusercontent.com,🤖 AI组
  - DOMAIN-SUFFIX,claude.ai,🤖 AI组
  - DOMAIN-SUFFIX,anthropic.com,🤖 AI组
  - DOMAIN-SUFFIX,gemini.google.com,🤖 AI组
  - DOMAIN-SUFFIX,generativelanguage.googleapis.com,🤖 AI组
  - DOMAIN-SUFFIX,netflix.com,🎬 流媒体
  - DOMAIN-SUFFIX,nflxvideo.net,🎬 流媒体
  - DOMAIN-SUFFIX,disneyplus.com,🎬 流媒体
  - DOMAIN-SUFFIX,disney-plus.net,🎬 流媒体
  - DOMAIN-SUFFIX,youtube.com,🎬 流媒体
  - DOMAIN-SUFFIX,googlevideo.com,🎬 流媒体
  - DOMAIN-SUFFIX,telegram.org,📟 Telegram
  - DOMAIN-SUFFIX,t.me,📟 Telegram
  - DOMAIN-SUFFIX,apple.com,🍎 Apple
  - DOMAIN-SUFFIX,icloud.com,🍎 Apple
  - DOMAIN-SUFFIX,microsoft.com,🪟 Microsoft
  - DOMAIN-SUFFIX,windows.com,🪟 Microsoft
  - GEOIP,CN,DIRECT
  - MATCH,🐠 FINAL
EOF

  cat > "$out_md" <<'EOF'
# Advanced Strategy Groups / 成熟策略组模板

该模板吸收成熟机场配置的策略组思路，但不内置任何机场订阅 URL、Token、节点密码或私有域名。

推荐策略：

- `🚦 PROXY`：主代理入口。
- `🌏 AUTO`：自动测速节点组。
- `🏗️ 自建VPS`：自建 VPS 节点。
- `🧩 外购VPN`：外购 VPN / 纯净度节点。
- `⛓️ AI/媒体机场链`：用户自己导入的机场 AI / 媒体策略组。
- `🤖 AI组`：ChatGPT / Claude / Gemini / OpenAI。
- `🎬 流媒体`：Netflix / Disney+ / YouTube 等。
- `🐠 FINAL`：最终兜底。

使用方式：复制 YAML 片段后，根据自己的节点名替换占位项。
EOF

  ok "已生成成熟策略组模板：$out_yaml"
  ok "说明文档：$out_md"
}

export_advanced_flclash(){
  section "Advanced FLClash Export / 进阶 FLClash 导出模板"
  ensure_yaml || return 1
  [[ -f "$OUT/01_IMPORT_FLCLASH.yaml" ]] || { warn "未发现基础导出，尝试先执行 10) Export 生成基础配置。"; [[ -f "$OUT/latest_flclash_fragment.yaml" ]] && write_imports; }
  [[ -f "$OUT/01_IMPORT_FLCLASH.yaml" ]] || { err "未找到 $OUT/01_IMPORT_FLCLASH.yaml，请先部署节点或执行 10) Export。"; return 1; }

  local out_file="$OUT/01_IMPORT_FLCLASH_ADVANCED.yaml"
  python3 - "$OUT/01_IMPORT_FLCLASH.yaml" "$out_file" <<'PY_ADV_EXPORT'
import sys, yaml, re
src, dst = sys.argv[1:3]
cfg = yaml.safe_load(open(src, encoding="utf-8")) or {}
proxies = cfg.get("proxies") or []
names = [p.get("name") for p in proxies if isinstance(p, dict) and p.get("name")]
if not names:
    names = ["DIRECT"]

def has_kw(s, kws):
    s = str(s)
    return any(k.lower() in s.lower() for k in kws)

self_kws = ["Zouter","GoMami","光维","光維","100TB","isvoro","JPCR","腾讯","騰訊","SKYSTROLL","Neburst","TCS","ISIF","V.PS","搬瓦工","BWG"]
external_kws = ["VK","wget","Optin","Optim","纯度","純度","MISAKA","AWS","ATT","HINET"]

self_nodes = [n for n in names if has_kw(n, self_kws)]
external_nodes = [n for n in names if has_kw(n, external_kws) and n not in self_nodes]
if not self_nodes:
    self_nodes = names[:]
if not external_nodes:
    external_nodes = names[:]

media_dns = None
for ns in (cfg.get("dns") or {}).get("nameserver", []) or []:
    if str(ns).strip() == "151.243.229.229":
        media_dns = "151.243.229.229"

dns_nameservers = []
if media_dns:
    dns_nameservers.append(media_dns)
dns_nameservers += ["223.5.5.5","119.29.29.29","1.1.1.1","8.8.8.8"]
# de-duplicate
dns_nameservers = list(dict.fromkeys(dns_nameservers))

groups = [
    {"name":"🚦 PROXY","type":"select","proxies":["🌏 AUTO","🏗️ 自建VPS","🧩 外购VPN","⛓️ AI/媒体机场链","DIRECT"]},
    {"name":"🌏 AUTO","type":"url-test","proxies":names,"url":"https://www.gstatic.com/generate_204","interval":300,"tolerance":50},
    {"name":"🏗️ 自建VPS","type":"select","proxies":self_nodes + ["DIRECT"]},
    {"name":"🧩 外购VPN","type":"select","proxies":external_nodes + ["DIRECT"]},
    {"name":"⛓️ AI/媒体机场链","type":"select","proxies":["🧩 外购VPN","🏗️ 自建VPS","🚦 PROXY","DIRECT"]},
    {"name":"🤖 AI组","type":"select","proxies":["⛓️ AI/媒体机场链","🏗️ 自建VPS","🧩 外购VPN","🚦 PROXY","DIRECT"]},
    {"name":"🎬 流媒体","type":"select","proxies":["⛓️ AI/媒体机场链","🧩 外购VPN","🏗️ 自建VPS","🚦 PROXY","DIRECT"]},
    {"name":"🍎 Apple","type":"select","proxies":["DIRECT","🚦 PROXY"]},
    {"name":"🔍 Google","type":"select","proxies":["🚦 PROXY","DIRECT"]},
    {"name":"🪟 Microsoft","type":"select","proxies":["DIRECT","🚦 PROXY"]},
    {"name":"📟 Telegram","type":"select","proxies":["🚦 PROXY","🧩 外购VPN","DIRECT"]},
    {"name":"🎮 Game","type":"select","proxies":["🚦 PROXY","DIRECT"]},
    {"name":"🐠 FINAL","type":"select","proxies":["🚦 PROXY","DIRECT"]},
]

rules = [
    "DOMAIN-SUFFIX,chatgpt.com,🤖 AI组",
    "DOMAIN-SUFFIX,openai.com,🤖 AI组",
    "DOMAIN-SUFFIX,oaistatic.com,🤖 AI组",
    "DOMAIN-SUFFIX,oaiusercontent.com,🤖 AI组",
    "DOMAIN-SUFFIX,claude.ai,🤖 AI组",
    "DOMAIN-SUFFIX,anthropic.com,🤖 AI组",
    "DOMAIN-SUFFIX,gemini.google.com,🤖 AI组",
    "DOMAIN-SUFFIX,generativelanguage.googleapis.com,🤖 AI组",
    "DOMAIN-SUFFIX,netflix.com,🎬 流媒体",
    "DOMAIN-SUFFIX,nflxvideo.net,🎬 流媒体",
    "DOMAIN-SUFFIX,disneyplus.com,🎬 流媒体",
    "DOMAIN-SUFFIX,disney-plus.net,🎬 流媒体",
    "DOMAIN-SUFFIX,youtube.com,🎬 流媒体",
    "DOMAIN-SUFFIX,googlevideo.com,🎬 流媒体",
    "DOMAIN-SUFFIX,telegram.org,📟 Telegram",
    "DOMAIN-SUFFIX,t.me,📟 Telegram",
    "DOMAIN-SUFFIX,apple.com,🍎 Apple",
    "DOMAIN-SUFFIX,icloud.com,🍎 Apple",
    "DOMAIN-SUFFIX,google.com,🔍 Google",
    "DOMAIN-SUFFIX,microsoft.com,🪟 Microsoft",
    "GEOIP,CN,DIRECT",
    "MATCH,🐠 FINAL",
]

adv = {
    "mixed-port": cfg.get("mixed-port", 7890),
    "allow-lan": cfg.get("allow-lan", False),
    "mode": "rule",
    "log-level": cfg.get("log-level", "info"),
    "ipv6": False,
    "unified-delay": True,
    "tcp-concurrent": True,
    "dns": {
        "enable": True,
        "listen": "127.0.0.1:1053",
        "enhanced-mode": "fake-ip",
        "fake-ip-range": "198.18.0.1/16",
        "fake-ip-filter": ["*.lan","localhost","*.local","*.xboxlive.com","*.msftconnecttest.com","*.msftncsi.com"],
        "default-nameserver": ["223.5.5.5","119.29.29.29"],
        "nameserver": dns_nameservers,
        "fallback": ["tls://1.1.1.1","tls://8.8.8.8"],
        "fallback-filter": {"geoip": True, "geoip-code": "CN", "ipcidr": ["240.0.0.0/4"]}
    },
    "proxies": proxies,
    "proxy-groups": groups,
    "rules": rules
}
open(dst, "w", encoding="utf-8").write("# LazyVPS Advanced FLClash Template / 进阶导出配置\n" + yaml.safe_dump(adv, allow_unicode=True, sort_keys=False))
print(dst)
PY_ADV_EXPORT
  ok "已生成进阶 FLClash 配置：$out_file"
  note "建议先导入基础配置确认节点可用，再尝试进阶模板。"
}

node_classify_rename(){
  section "Node Classify / 节点分类与命名整理"
  ensure_yaml || return 1
  local file="${1:-$OUT/01_IMPORT_FLCLASH_ADVANCED.yaml}"
  [[ -f "$file" ]] || file="$OUT/01_IMPORT_FLCLASH.yaml"
  [[ -f "$file" ]] || { err "未找到可分析的 FLClash 配置，请先执行 10) Export 或 41) Advanced Export。"; return 1; }
  local csv="$REPORTS/node_classify_$(ts).csv" md="$REPORTS/node_classify_$(ts).md"
  python3 - "$file" "$csv" "$md" <<'PY_NODE_CLASSIFY'
import sys, yaml, re, csv
f, out_csv, out_md = sys.argv[1:4]
cfg = yaml.safe_load(open(f, encoding="utf-8")) or {}
proxies = cfg.get("proxies") or []
self_kws = ["Zouter","GoMami","光维","光維","100TB","isvoro","JPCR","腾讯","騰訊","SKYSTROLL","Neburst","TCS","ISIF","V.PS","搬瓦工","BWG"]
external_kws = ["VK","wget","Optin","Optim","纯度","純度","MISAKA","AWS","ATT","HINET"]
region_map = [("香港","🇭🇰 香港"),("HK","🇭🇰 香港"),("日本","🇯🇵 日本"),("JP","🇯🇵 日本"),("台湾","🇹🇼 台湾"),("TW","🇹🇼 台湾"),("新加坡","🇸🇬 新加坡"),("SG","🇸🇬 新加坡"),("韩国","🇰🇷 韩国"),("KR","🇰🇷 韩国"),("美国","🇺🇸 美国"),("US","🇺🇸 美国")]
def contains(s, kws):
    sl=s.lower()
    return any(k.lower() in sl for k in kws)
def region(name):
    for k,v in region_map:
        if k.lower() in name.lower():
            return v
    return "🌐 未识别"
def proto_code(t):
    return {"trojan":"T协议","vless":"R协议","hysteria2":"H协议","ss":"S协议","shadowsocks":"S协议"}.get(str(t).lower(), str(t).upper())
def vendor(name):
    for v in ["Zouter","GoMami","光维云","光維云","100TB","isvoro","JPCR-B","腾讯云","騰訊雲","SKYSTROLL","Neburst","VK","wget企业","Optim","Optin","MISAKA"]:
        if v.lower() in name.lower(): return v
    return "自定义"
rows=[]
for p in proxies:
    if not isinstance(p, dict): continue
    name=str(p.get("name",""))
    t=str(p.get("type",""))
    cat="自建VPS" if contains(name,self_kws) else ("外购VPN/机场" if contains(name,external_kws) else "待人工确认")
    reg=region(name)
    ven=vendor(name)
    suggested=f"{reg}-{ven}-{proto_code(t)}"
    rows.append([name,t,p.get("server",""),cat,reg,ven,suggested])
with open(out_csv,"w",encoding="utf-8-sig",newline="") as fp:
    w=csv.writer(fp); w.writerow(["原节点名","协议","server","分类","地区","商家/来源","建议命名"]); w.writerows(rows)
with open(out_md,"w",encoding="utf-8") as fp:
    fp.write("# LazyVPS 节点分类与命名建议\n\n")
    fp.write("| 原节点名 | 协议 | 分类 | 地区 | 商家/来源 | 建议命名 |\n|---|---|---|---|---|---|\n")
    for r in rows:
        fp.write("| " + " | ".join(str(x).replace("|","/") for x in [r[0],r[1],r[3],r[4],r[5],r[6]]) + " |\n")
print(out_csv)
print(out_md)
PY_NODE_CLASSIFY
  ok "节点分类 CSV：$csv"
  ok "命名建议报告：$md"
}

protocol_export_lint(){
  section "Protocol Export Lint / VLESS/Trojan/Hysteria2 导出体检"
  ensure_yaml || return 1
  local file="${1:-$OUT/01_IMPORT_FLCLASH.yaml}" report="$REPORTS/protocol_lint_$(ts).md"
  [[ -f "$file" ]] || { err "未找到配置：$file"; return 1; }
  python3 - "$file" "$report" <<'PY_PROTOCOL_LINT'
import sys, yaml
f, report = sys.argv[1:3]
cfg=yaml.safe_load(open(f,encoding="utf-8")) or {}
issues=[]; warnings=[]; ok=[]
proxies=cfg.get("proxies") or []
for i,p in enumerate(proxies):
    if not isinstance(p,dict):
        issues.append(f"proxies[{i}] 不是对象"); continue
    name=p.get("name",f"node-{i}")
    t=str(p.get("type","")).lower()
    for k in ["server","port","type"]:
        if not p.get(k): issues.append(f"{name}: 缺少 {k}")
    if t=="vless":
        for k in ["uuid","tls","servername","client-fingerprint"]:
            if not p.get(k): issues.append(f"{name}: VLESS 缺少 {k}")
        if p.get("flow")!="xtls-rprx-vision":
            warnings.append(f"{name}: VLESS 未使用 xtls-rprx-vision")
        ro=p.get("reality-opts") or {}
        if not ro.get("public-key"): issues.append(f"{name}: Reality 缺少 public-key")
        if not ro.get("short-id"): issues.append(f"{name}: Reality 缺少 short-id")
        ok.append(f"{name}: VLESS Reality 字段已检查")
    elif t=="trojan":
        for k in ["password","sni"]:
            if not p.get(k): issues.append(f"{name}: Trojan 缺少 {k}")
        if p.get("network","tcp")!="tcp":
            warnings.append(f"{name}: Trojan network 不是 tcp，请确认客户端兼容")
        ok.append(f"{name}: Trojan 字段已检查")
    elif t in ("hysteria2","hy2"):
        for k in ["password","sni"]:
            if not p.get(k): issues.append(f"{name}: Hysteria2 缺少 {k}")
        ok.append(f"{name}: Hysteria2 字段已检查")
    else:
        warnings.append(f"{name}: 协议 {t} 未纳入深度检查")
with open(report,"w",encoding="utf-8") as fp:
    fp.write("# LazyVPS 协议导出体检报告\n\n")
    fp.write(f"配置文件：`{f}`\n\n")
    fp.write("## 严重问题\n")
    fp.write("\n".join(f"- {x}" for x in issues) if issues else "- 未发现\n")
    fp.write("\n\n## 警告\n")
    fp.write("\n".join(f"- {x}" for x in warnings) if warnings else "- 未发现\n")
    fp.write("\n\n## 通过项\n")
    fp.write("\n".join(f"- {x}" for x in ok) if ok else "- 无\n")
print(report)
if issues:
    sys.exit(2)
PY_PROTOCOL_LINT
  local rc=$?
  if [[ $rc -eq 0 ]]; then ok "协议导出体检通过：$report"; else warn "协议导出体检发现问题：$report"; fi
}

vless_vision_guide(){
  section "VLESS Reality Vision / 支持说明"
  local md="$OUT/vless_reality_vision_guide.md"
  cat > "$md" <<'EOF'
# VLESS Reality Vision 支持说明

LazyVPS 的 `6) VLESS Reality Vision / 部署 VLESS-R 协议` 会生成：

服务端：
- Xray VLESS inbound
- Reality security
- `flow=xtls-rprx-vision`
- x25519 private/public key
- short-id
- client fingerprint: chrome

FLClash/Mihomo 侧：
```yaml
type: vless
tls: true
flow: xtls-rprx-vision
servername: www.cloudflare.com
reality-opts:
  public-key: <public-key>
  short-id: <short-id>
client-fingerprint: chrome
```

注意：
- 默认推荐 `servername: www.cloudflare.com`。VLESS Reality 对客户端内核版本要求较高，建议使用新版 Mihomo / FLClash。
- 若导入后 Timeout，请先执行 `44) Protocol Lint` 检查字段，再检查服务端 Xray 日志。
- Surge 对 VLESS Reality 支持情况和版本有关，建议以 FLClash/Mihomo 为主测试。
EOF
  ok "已生成说明：$md"
  sed -n '1,80p' "$md"
}





current_xray_sni(){
  python3 - <<'PY_CUR_SNI' 2>/dev/null
import json
path="/usr/local/etc/xray/config.json"
try:
    cfg=json.load(open(path))
except Exception:
    raise SystemExit
for ib in cfg.get("inbounds", []):
    st=ib.get("streamSettings", {})
    # Trojan TLS
    tls=st.get("tlsSettings", {})
    if tls.get("serverName"):
        print(tls.get("serverName")); raise SystemExit
    # VLESS Reality
    rs=st.get("realitySettings", {})
    names=rs.get("serverNames") or []
    if names:
        print(names[0]); raise SystemExit
PY_CUR_SNI
}

patch_ipv6_yaml_text(){
  local file="$1" ip6="$2" sni="$3"
  [[ -f "$file" ]] || return 0
  python3 - "$file" "$ip6" "$sni" <<'PY_PATCH_IPV6'
import sys, re
path, ip6, sni = sys.argv[1:4]
text = open(path, encoding="utf-8").read()
if ip6:
    text = text.replace(f"server: {ip6}", f"server: \"{ip6}\"")
    text = text.replace(f"server: '{ip6}'", f"server: \"{ip6}\"")
if sni:
    text = re.sub(r'(?m)^(\s*sni:\s*).+$', r'\1' + sni, text)
    text = re.sub(r'(?m)^(\s*servername:\s*).+$', r'\1' + sni, text)
open(path, "w", encoding="utf-8").write(text)
PY_PATCH_IPV6
}

ipv6_global_addr(){
  ip -6 addr show scope global 2>/dev/null | awk '/inet6 /{print $2}' | cut -d/ -f1 | grep -v '^fd' | grep -v '^fe80' | head -1
}

ip6_external(){
  curl -6 -fsS --connect-timeout 8 https://api64.ipify.org 2>/dev/null || \
  curl -6 -fsS --connect-timeout 8 https://ifconfig.co 2>/dev/null || true
}

ipv6_check(){
  section "IPv6 Check / 检查 VPS IPv6"
  note "用于确认 VPS 是否具备 IPv6 地址、默认路由和外部 IPv6 出口。"
  local v4 v6_local v6_ext
  v4="$(ip4_external || true)"
  v6_local="$(ipv6_global_addr || true)"
  v6_ext="$(ip6_external || true)"
  info "公网 IPv4：${v4:-检测失败}"
  info "本机全局 IPv6：${v6_local:-未发现}"
  info "外部检测 IPv6：${v6_ext:-检测失败}"
  echo
  info "IPv6 地址："
  ip -6 addr show scope global || true
  echo
  info "IPv6 路由："
  ip -6 route || true
  echo
  info "443 监听："
  ss -lntp | grep ':443' || true
  echo
  if [[ -n "$v6_ext" ]]; then
    ok "IPv6 外部出口可用。"
  else
    warn "IPv6 外部出口不可用。若面板显示有 IPv6，请检查系统路由、防火墙或运营商访问。"
  fi
}

ipv6_dns_yaml(){
  local indent="${1:-    }"
  printf "%s- 2606:4700:4700::1111\n" "$indent"
  printf "%s- 2001:4860:4860::8888\n" "$indent"
  printf "%s- 1.1.1.1\n" "$indent"
  printf "%s- 8.8.8.8\n" "$indent"
}

ipv6_make_exports(){
  section "IPv6 Export / IPv4-IPv6-DualStack 导出"
  ensure_yaml || return 1
  [[ -f "$OUT/01_IMPORT_FLCLASH.yaml" ]] || { warn "未发现基础导出，尝试执行 10) Export。"; export_pkg || true; }
  [[ -f "$OUT/01_IMPORT_FLCLASH.yaml" ]] || { err "仍未找到基础配置，请先部署节点并执行 10) Export。"; return 1; }

  local v4 v6 input4 input6
  v4="$(ip4_external || true)"
  v6="$(ip6_external || true)"
  [[ -n "$v6" ]] || v6="$(ipv6_global_addr || true)"
  read -rp "IPv4 地址 [${v4:-空}]: " input4
  read -rp "IPv6 地址 [${v6:-空}]: " input6
  v4="${input4:-$v4}"
  v6="${input6:-$v6}"
  [[ -n "$v4" ]] || warn "未检测到 IPv4，将无法生成完整 IPv4 配置。"
  [[ -n "$v6" ]] || { err "未检测到 IPv6，无法生成 IPv6 / DualStack 配置。"; return 1; }

  python3 - "$OUT/01_IMPORT_FLCLASH.yaml" "$OUT" "$v4" "$v6" <<'PY_IPV6_EXPORT'
import sys, yaml, copy, re
src, outdir, v4, v6 = sys.argv[1:5]
cfg = yaml.safe_load(open(src, encoding="utf-8")) or {}
proxies = cfg.get("proxies") or []
if not proxies:
    raise SystemExit("no proxies found")
base = copy.deepcopy(proxies[0])
base_name = base.get("name", "LazyVPS-Node")

def direct_rule(server):
    if not server:
        return None
    if re.match(r"^(\d{1,3}\.){3}\d{1,3}$", server):
        return f"IP-CIDR,{server}/32,DIRECT,no-resolve"
    if ":" in server:
        return f"IP-CIDR6,{server}/128,DIRECT,no-resolve"
    return f"DOMAIN,{server},DIRECT"

def normalize_dns(c, ipv6=False):
    c["ipv6"] = bool(ipv6)
    d = c.setdefault("dns", {})
    d["enable"] = True
    d["listen"] = "127.0.0.1:1053"
    d["enhanced-mode"] = d.get("enhanced-mode", "fake-ip")
    d["fake-ip-range"] = d.get("fake-ip-range", "198.18.0.1/16")
    if ipv6:
        d["nameserver"] = ["2606:4700:4700::1111", "2001:4860:4860::8888", "1.1.1.1", "8.8.8.8"]
    else:
        d["nameserver"] = ["223.5.5.5", "119.29.29.29", "1.1.1.1", "8.8.8.8"]

def make_single(ip, label, ipv6):
    c = copy.deepcopy(cfg)
    normalize_dns(c, ipv6=ipv6)
    p = copy.deepcopy(base)
    p["name"] = f"{base_name}-{label}"
    p["server"] = ip
    c["proxies"] = [p]
    for g in c.get("proxy-groups", []) or []:
        if isinstance(g, dict) and "proxies" in g:
            g["proxies"] = [p["name"], "DIRECT"]
    rules = c.get("rules") or []
    dr = direct_rule(ip)
    if dr and dr not in rules:
        rules = [dr] + [r for r in rules if not (isinstance(r, str) and r.startswith("MATCH,"))]
    if "MATCH,PROXY" not in rules:
        rules.append("MATCH,PROXY")
    c["rules"] = rules
    return c

def make_dual(v4, v6):
    c = copy.deepcopy(cfg)
    normalize_dns(c, ipv6=True)
    p4 = copy.deepcopy(base); p4["name"] = f"{base_name}-IPv4"; p4["server"] = v4
    p6 = copy.deepcopy(base); p6["name"] = f"{base_name}-IPv6"; p6["server"] = v6
    c["proxies"] = [p4, p6]
    for g in c.get("proxy-groups", []) or []:
        if isinstance(g, dict) and "proxies" in g:
            g["proxies"] = [p4["name"], p6["name"], "DIRECT"]
    rules = c.get("rules") or []
    new_rules = []
    for ip in [v4, v6]:
        dr = direct_rule(ip)
        if dr and dr not in rules and dr not in new_rules:
            new_rules.append(dr)
    rules = new_rules + [r for r in rules if not (isinstance(r, str) and r.startswith("MATCH,"))]
    rules.append("MATCH,PROXY")
    c["rules"] = rules
    return c

def dump(name, obj):
    with open(f"{outdir}/{name}", "w", encoding="utf-8") as fp:
        fp.write(f"# LazyVPS IPv6 Mode Export / {name}\n")
        yaml.safe_dump(obj, fp, allow_unicode=True, sort_keys=False)

if v4:
    dump("01_IMPORT_FLCLASH_IPV4.yaml", make_single(v4, "IPv4", False))
dump("01_IMPORT_FLCLASH_IPV6.yaml", make_single(v6, "IPv6", True))
if v4:
    dump("01_IMPORT_FLCLASH_DUALSTACK.yaml", make_dual(v4, v6))
print("OK")
PY_IPV6_EXPORT

  local cur_sni
  cur_sni="$(current_xray_sni || true)"

  # IPv6 YAML 稳定修正：IPv6 server 加引号、同步当前服务端 SNI / servername
  patch_ipv6_yaml_text "$OUT/01_IMPORT_FLCLASH_IPV6.yaml" "$v6" "$cur_sni"
  patch_ipv6_yaml_text "$OUT/01_IMPORT_FLCLASH_DUALSTACK.yaml" "$v6" "$cur_sni"
  [[ -n "$v4" ]] && patch_ipv6_yaml_text "$OUT/01_IMPORT_FLCLASH_IPV4.yaml" "$v6" "$cur_sni"

  # 生成 IPv6 稳定版：tcp-concurrent:false，适合 FLClash/Mihomo 导入异常或延迟测试不稳时使用
  if [[ -f "$OUT/01_IMPORT_FLCLASH_IPV6.yaml" ]]; then
    cp "$OUT/01_IMPORT_FLCLASH_IPV6.yaml" "$OUT/01_IMPORT_FLCLASH_IPV6_STABLE.yaml"
    sed -i 's/tcp-concurrent: true/tcp-concurrent: false/g' "$OUT/01_IMPORT_FLCLASH_IPV6_STABLE.yaml"
    patch_ipv6_yaml_text "$OUT/01_IMPORT_FLCLASH_IPV6_STABLE.yaml" "$v6" "$cur_sni"
    inject_direct_rule_into_yaml "$OUT/01_IMPORT_FLCLASH_IPV6_STABLE.yaml" "$v6"
  fi

  for f in "$OUT"/01_IMPORT_FLCLASH_IPV*.yaml "$OUT"/01_IMPORT_FLCLASH_DUALSTACK.yaml; do
    [[ -f "$f" ]] || continue
    yaml_firstline_sanitize "$f"
    yaml_validate_file "$f" >/dev/null 2>&1 || warn "YAML 校验异常：$f"
  done

  ok "已生成 IPv4 / IPv6 / DualStack / IPv6 Stable 配置："
  ls -lh "$OUT"/01_IMPORT_FLCLASH_IPV*.yaml "$OUT"/01_IMPORT_FLCLASH_DUALSTACK.yaml "$OUT"/01_IMPORT_FLCLASH_IPV6_STABLE.yaml 2>/dev/null || true
  note "IPv6 Stable 配置会将 IPv6 server 加引号、tcp-concurrent:false，并同步当前服务端 SNI。"
  note "若 IPv6 Stable 仍 Timeout，可直接使用 IPv6 Only Clean 独立端口排查。"
}

ipv6_guard(){
  section "IPv6 Guard / IPv6 泄漏检查"
  note "用于判断 VPS 和导出配置是否可能走 IPv6，避免 AI/媒体检测结果混乱。"
  local v6
  v6="$(ip6_external || true)"
  if [[ -n "$v6" ]]; then
    ok "VPS IPv6 出口可用：$v6"
  else
    warn "VPS IPv6 外部出口不可用或被阻断。"
  fi
  echo
  info "检查 outputs 中 IPv6 设置："
  grep -R --line-number -E '^ipv6:|IP-CIDR6|server: "?[0-9a-fA-F:]+|2606:4700|2001:4860' "$OUT" 2>/dev/null || true
  echo
  note "如果想严格 IPv4 工作，导入 01_IMPORT_FLCLASH_IPV4.yaml。"
  note "如果想测试原生 IPv6，导入 01_IMPORT_FLCLASH_IPV6.yaml。"
  note "如果想双栈对比，导入 01_IMPORT_FLCLASH_DUALSTACK.yaml。"
}


ipv6_yaml_validate(){
  local file="$1"
  [[ -f "$file" ]] || { err "文件不存在：$file"; return 1; }
  python3 - "$file" <<'PY_YAML_VALIDATE'
import sys, yaml
path=sys.argv[1]
try:
    cfg=yaml.safe_load(open(path, encoding="utf-8"))
    if not isinstance(cfg, dict):
        raise ValueError("YAML root is not map")
    if not cfg.get("proxies"):
        raise ValueError("missing proxies")
    print("OK:", path)
except Exception as e:
    print("YAML ERROR:", path, e)
    sys.exit(1)
PY_YAML_VALIDATE
}

ipv6_http_sync_verify(){
  section "HTTP Sync Verify / HTTP 下载同步检查"
  mkdir -p "$HTTP_DIR"
  cp -f "$OUT"/01_IMPORT_FLCLASH*.yaml "$HTTP_DIR/" 2>/dev/null || true
  cp -f "$OUT"/02_IMPORT_SURGE.conf "$HTTP_DIR/" 2>/dev/null || true
  cp -f /root/lazy-vps-output-latest.tar.gz "$HTTP_DIR/" 2>/dev/null || true
  info "HTTP 目录文件："
  ls -lh "$HTTP_DIR" | grep -E 'FLCLASH|SURGE|tar.gz' || true
  echo
  info "本机 HTTP 测试："
  for f in 01_IMPORT_FLCLASH_IPV6_STABLE.yaml 01_IMPORT_FLCLASH_IPV6.yaml 01_IMPORT_FLCLASH_IPV4.yaml; do
    [[ -f "$HTTP_DIR/$f" ]] && curl -I --connect-timeout 5 "http://127.0.0.1:${HTTP_PORT}/${f}" | head -3 || true
  done
  echo
  info "8088 监听："
  ss -lntp | grep ":${HTTP_PORT}" || true
  note "如果 127.0.0.1 是 200 OK，但公网 IPv4 访问失败，多数是云商访问控制或 NAT hairpin；请以 Windows curl 结果为准。"
}

ipv6_dedicated_port_export(){
  section "IPv6 Dedicated Port / IPv6 独立端口导出"
  note "同一个 443 双栈服务并不会冲突；此功能用于单独开一个 IPv6 测试端口，便于排查客户端兼容。"
  local port v6 cur_sni
  read -rp "IPv6 独立测试端口 [2443]: " port
  port="${port:-2443}"
  valid_port "$port" || { err "端口无效"; return 1; }
  v6="$(ip6_external || true)"
  [[ -n "$v6" ]] || v6="$(ipv6_global_addr || true)"
  read -rp "IPv6 地址 [${v6:-空}]: " input6
  v6="${input6:-$v6}"
  [[ -n "$v6" ]] || { err "没有 IPv6 地址。"; return 1; }
  cur_sni="$(current_xray_sni || true)"

  cp "$XCONF" "$XCONF.bak.ipv6_port_${port}.$(ts)" 2>/dev/null || true
  python3 - "$port" <<'PY_ADD_IPV6_PORT'
import sys, json, copy
port=int(sys.argv[1])
path="/usr/local/etc/xray/config.json"
cfg=json.load(open(path))
inbs=cfg.setdefault("inbounds", [])
src=None
for ib in inbs:
    if ib.get("protocol") in ("trojan","vless"):
        src=ib; break
if not src:
    raise SystemExit("未找到 trojan/vless inbound，无法复制 IPv6 独立端口。")
new=copy.deepcopy(src)
new["port"]=port
new["listen"]="::"
new["tag"]=f"{src.get('protocol','proxy')}-ipv6-{port}-in"
# 去重同端口
inbs[:] = [ib for ib in inbs if not (ib.get("port")==port and str(ib.get("tag","")).endswith(f"ipv6-{port}-in"))]
inbs.append(new)
open(path,"w").write(json.dumps(cfg, indent=2, ensure_ascii=False))
print("OK: added inbound", new["tag"], port)
PY_ADD_IPV6_PORT

  "$XRAY" run -test -config "$XCONF" || { err "Xray 配置测试失败，未重启。"; return 1; }
  fw_open_port "$port" "tcp"
  systemctl restart xray
  ok "已新增 IPv6 独立测试端口：$port"

  # 基于 IPv6 stable 生成独立端口文件
  [[ -f "$OUT/01_IMPORT_FLCLASH_IPV6_STABLE.yaml" ]] || ipv6_make_exports || true
  local src="$OUT/01_IMPORT_FLCLASH_IPV6_STABLE.yaml"
  local dst="$OUT/01_IMPORT_FLCLASH_IPV6_PORT${port}.yaml"
  [[ -f "$src" ]] || { err "未找到 IPv6 Stable 配置，无法生成端口配置。"; return 1; }
  cp "$src" "$dst"
  python3 - "$dst" "$v6" "$port" "$cur_sni" <<'PY_PORT_YAML'
import sys, re
path, ip6, port, sni = sys.argv[1:5]
text=open(path, encoding="utf-8").read()
text=re.sub(r'(?m)^(\s*server:\s*).+$', r'\1"' + ip6 + '"', text, count=1)
text=re.sub(r'(?m)^(\s*port:\s*)\d+', r'\1' + port, text, count=1)
if sni:
    text=re.sub(r'(?m)^(\s*sni:\s*).+$', r'\1' + sni, text)
    text=re.sub(r'(?m)^(\s*servername:\s*).+$', r'\1' + sni, text)
text=text.replace("tcp-concurrent: true", "tcp-concurrent: false")
rule=f"  - IP-CIDR6,{ip6}/128,DIRECT,no-resolve"
if rule not in text and "rules:\n" in text:
    text=text.replace("rules:\n", "rules:\n"+rule+"\n", 1)
open(path,"w",encoding="utf-8").write(text)
PY_PORT_YAML

  ipv6_yaml_validate "$dst" || true
  mkdir -p "$HTTP_DIR"
  cp -f "$dst" "$HTTP_DIR/" 2>/dev/null || true
  ok "已生成 IPv6 独立端口配置：$dst"
  note "下载链接：http://$(public_ip_for_links):${HTTP_PORT}/01_IMPORT_FLCLASH_IPV6_PORT${port}.yaml"
  ss -lntp | grep ":${port}" || true
}


yaml_firstline_sanitize(){
  local file="$1"
  [[ -f "$file" ]] || return 0
  python3 - "$file" <<'PY_YAML_FIRSTLINE'
import sys
p=sys.argv[1]
s=open(p,encoding="utf-8").read()
s=s.replace("\\nmixed-port:", "\nmixed-port:")
open(p,"w",encoding="utf-8").write(s)
PY_YAML_FIRSTLINE
}

yaml_validate_file(){
  local file="$1"
  [[ -f "$file" ]] || { err "文件不存在：$file"; return 1; }
  python3 - "$file" <<'PY_YAML_VALIDATE2'
import sys, yaml
p=sys.argv[1]
try:
    cfg=yaml.safe_load(open(p,encoding="utf-8"))
    if not isinstance(cfg, dict): raise ValueError("YAML root 不是 map")
    if not cfg.get("proxies"): raise ValueError("缺少 proxies")
    print("OK:", p)
except Exception as e:
    print("YAML ERROR:", p, e)
    sys.exit(1)
PY_YAML_VALIDATE2
}

ipv6_only_clean_trojan(){
  section "IPv6 Only Clean / 纯 IPv6 独立端口重作"
  note "用于彻底排除 443 双栈、旧配置、YAML 导出等干扰。"
  note "会新增一个只用于 IPv6 测试的 Trojan inbound，默认端口 2443，不影响原 443。"

  local port v6 node pass sni input6
  read -rp "IPv6 独立端口 [2443]: " port
  port="${port:-2443}"
  valid_port "$port" || { err "端口无效"; return 1; }

  v6="$(ip6_external || true)"
  [[ -n "$v6" ]] || v6="$(ipv6_global_addr || true)"
  read -rp "IPv6 地址 [${v6:-空}]: " input6
  v6="${input6:-$v6}"
  [[ -n "$v6" ]] || { err "未检测到 IPv6。"; return 1; }

  node="$(ask '节点名称' 'TW 台湾-自建VPS-T协议-IPv6Only')"
  sni="$(ask 'SNI' 'www.cloudflare.com')"
  pass="node_$(tr -dc A-Za-z0-9 </dev/urandom | head -c 22)"

  backup_all
  cp "$XCONF" "$XCONF.bak.ipv6only_${port}.$(ts)" 2>/dev/null || true

  mkdir -p "$(dirname "$XCONF")"
  openssl req -x509 -newkey rsa:2048 -sha256 -days 3650 -nodes \
    -keyout "/usr/local/etc/xray/trojan-ipv6only-${port}.key" \
    -out "/usr/local/etc/xray/trojan-ipv6only-${port}.crt" \
    -subj "/CN=${sni}" \
    -addext "subjectAltName=DNS:${sni}" >/dev/null 2>&1
  chmod 644 "/usr/local/etc/xray/trojan-ipv6only-${port}.key" "/usr/local/etc/xray/trojan-ipv6only-${port}.crt" 2>/dev/null || true
  chown root:root "/usr/local/etc/xray/trojan-ipv6only-${port}.key" "/usr/local/etc/xray/trojan-ipv6only-${port}.crt" 2>/dev/null || true

  python3 - "$port" "$pass" "$sni" <<'PY_IPV6_ONLY_INBOUND'
import sys, json
port=int(sys.argv[1]); password=sys.argv[2]; sni=sys.argv[3]
path="/usr/local/etc/xray/config.json"
cfg=json.load(open(path))
cfg.setdefault("inbounds", [])
tag=f"trojan-ipv6only-{port}-in"
cfg["inbounds"]=[ib for ib in cfg["inbounds"] if ib.get("tag") != tag and ib.get("port") != port]
cfg["inbounds"].append({
  "listen": "::",
  "port": port,
  "protocol": "trojan",
  "tag": tag,
  "settings": {"clients": [{"password": password}]},
  "streamSettings": {
    "network": "tcp",
    "security": "tls",
    "tlsSettings": {
      "serverName": sni,
      "alpn": ["http/1.1"],
      "certificates": [{
        "certificateFile": f"/usr/local/etc/xray/trojan-ipv6only-{port}.crt",
        "keyFile": f"/usr/local/etc/xray/trojan-ipv6only-{port}.key"
      }]
    }
  },
  "sniffing": {"enabled": True, "destOverride": ["http","tls"]}
})
open(path,"w").write(json.dumps(cfg, indent=2, ensure_ascii=False))
PY_IPV6_ONLY_INBOUND

  "$XRAY" run -test -config "$XCONF" || { err "Xray 配置测试失败，未重启。"; return 1; }
  fw_open_port "$port" "tcp"
  systemctl restart xray
  ok "已新增 IPv6 Only Trojan 端口：$port"

  mkdir -p "$OUT" "$HTTP_DIR"
  local out_file="$OUT/01_IMPORT_FLCLASH_IPV6_ONLY_PORT${port}.yaml"
  cat > "$out_file" <<EOF
# LazyVPS IPv6 Only Clean Export / 独立 IPv6 Trojan 端口
mixed-port: 7890
allow-lan: false
mode: rule
log-level: info
ipv6: true
unified-delay: true
tcp-concurrent: false

dns:
  enable: true
  listen: 127.0.0.1:1053
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  nameserver:
    - 2606:4700:4700::1111
    - 2001:4860:4860::8888
    - 1.1.1.1
    - 8.8.8.8

proxies:
  - name: "$node"
    type: trojan
    server: "$v6"
    port: $port
    password: "$pass"
    sni: $sni
    skip-cert-verify: true
    udp: true
    network: tcp
    alpn:
      - http/1.1
    client-fingerprint: chrome

proxy-groups:
  - name: GLOBAL
    type: select
    proxies:
      - "$node"
      - DIRECT
  - name: PROXY
    type: select
    proxies:
      - "$node"
      - DIRECT

rules:
  - IP-CIDR6,${v6}/128,DIRECT,no-resolve
  - MATCH,PROXY
EOF
  yaml_firstline_sanitize "$out_file"
  yaml_validate_file "$out_file" || { err "IPv6 Only YAML 校验失败。"; return 1; }
  cp -f "$out_file" "$HTTP_DIR/" 2>/dev/null || true
  ok "已生成纯 IPv6 独立端口配置：$out_file"
  note "下载链接：http://$(public_ip_for_links):${HTTP_PORT}/$(basename "$out_file")"
  note "Windows 测试：powershell -NoProfile -Command \"Test-NetConnection -ComputerName '$v6' -Port $port\""
  ss -lntp | grep ":${port}" || true
}

ipv6_reality_only(){
  section "IPv6 Reality Only / 纯 IPv6 VLESS Reality 独立端口"
  note "用于替代 Trojan over IPv6；适合 Trojan IPv6 在 FLClash/Mihomo 下持续 Timeout 的情况。"
  note "默认端口 2444，不影响原 443 / 2443。默认 Reality 目标：www.cloudflare.com。"

  local port v6 server_host domain sni uuid keys private public short node
  read -rp "IPv6 Reality 独立端口 [2444]: " port
  port="${port:-2444}"
  valid_port "$port" || { err "端口无效"; return 1; }

  v6="$(ip6_external || true)"
  [[ -n "$v6" ]] || v6="$(ipv6_global_addr || true)"
  read -rp "IPv6 地址 [${v6:-空}]: " input6
  v6="${input6:-$v6}"
  [[ -n "$v6" ]] || { err "未检测到 IPv6。"; return 1; }

  read -rp "AAAA 域名，可留空；例如 v6-r443.example.com: " domain
  if [[ -n "$domain" ]]; then
    server_host="$domain"
  else
    server_host="$v6"
  fi

  sni="$(ask 'Reality serverName' 'www.cloudflare.com')"
  node="$(ask '节点名称' 'TW 台湾-自建VPS-VLESS-R-IPv6Only')"

  uuid="$($XRAY uuid 2>/dev/null || cat /proc/sys/kernel/random/uuid)"
  keys="$($XRAY x25519 2>/dev/null || true)"
  private="$(echo "$keys" | awk -F': ' '/Private/{print $2; exit}')"
  public="$(echo "$keys" | awk -F': ' '/Public/{print $2; exit}')"
  if [[ -z "$private" || -z "$public" ]]; then
    err "xray x25519 生成密钥失败。"
    echo "$keys"
    return 1
  fi
  short="$(openssl rand -hex 8)"

  backup_all
  cp "$XCONF" "$XCONF.bak.ipv6_reality_${port}.$(ts)" 2>/dev/null || true

  export port uuid private short sni
  python3 - <<'PY_IPV6_REALITY_INBOUND'
import os, json
path="/usr/local/etc/xray/config.json"
cfg=json.load(open(path))
port=int(os.environ["port"])
uuid=os.environ["uuid"]
private=os.environ["private"]
short=os.environ["short"]
sni=os.environ["sni"]
tag=f"vless-ipv6-reality|ipv6-r443-{port}-in"
cfg.setdefault("inbounds", [])
cfg["inbounds"]=[ib for ib in cfg["inbounds"] if ib.get("tag") != tag and ib.get("port") != port]
cfg["inbounds"].append({
  "listen": "::",
  "port": port,
  "protocol": "vless",
  "tag": tag,
  "settings": {
    "decryption": "none",
    "clients": [{"id": uuid, "flow": "xtls-rprx-vision"}]
  },
  "streamSettings": {
    "network": "tcp",
    "security": "reality",
    "realitySettings": {
      "dest": f"{sni}:443",
      "serverNames": [sni],
      "privateKey": private,
      "shortIds": [short]
    }
  },
  "sniffing": {"enabled": True, "destOverride": ["http", "tls", "quic"]}
})
open(path,"w").write(json.dumps(cfg, indent=2, ensure_ascii=False))
print("OK: added", tag, port)
PY_IPV6_REALITY_INBOUND

  "$XRAY" run -test -config "$XCONF" || { err "Xray 配置测试失败，未重启。"; return 1; }
  fw_open_port "$port" "tcp"
  systemctl restart xray
  ok "已新增 IPv6 VLESS Reality 端口：$port"

  mkdir -p "$OUT" "$HTTP_DIR"
  local out_file="$OUT/01_IMPORT_FLCLASH_IPV6_REALITY_PORT${port}.yaml"
  cat > "$out_file" <<EOF
# LazyVPS IPv6 Reality Only Export / 独立 IPv6 VLESS Reality 端口
mixed-port: 7890
allow-lan: false
mode: rule
log-level: info
ipv6: true
unified-delay: true
tcp-concurrent: false

dns:
  enable: true
  listen: 127.0.0.1:1053
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  nameserver:
    - 2606:4700:4700::1111
    - 2001:4860:4860::8888
    - 1.1.1.1
    - 8.8.8.8

proxies:
  - name: "$node"
    type: vless
    server: "$server_host"
    port: $port
    uuid: $uuid
    udp: true
    network: tcp
    tls: true
    flow: xtls-rprx-vision
    servername: $sni
    reality-opts:
      public-key: $public
      short-id: $short
    client-fingerprint: chrome

proxy-groups:
  - name: GLOBAL
    type: select
    proxies:
      - "$node"
      - DIRECT
  - name: PROXY
    type: select
    proxies:
      - "$node"
      - DIRECT

rules:
EOF
  if [[ "$server_host" == *":"* ]]; then
    echo "  - IP-CIDR6,${v6}/128,DIRECT,no-resolve" >> "$out_file"
  else
    echo "  - DOMAIN,${server_host},DIRECT" >> "$out_file"
  fi
  cat >> "$out_file" <<EOF
  - MATCH,PROXY
EOF

  yaml_firstline_sanitize "$out_file" 2>/dev/null || true
  yaml_validate_file "$out_file" || { err "IPv6 Reality YAML 校验失败。"; return 1; }
  cp -f "$out_file" "$HTTP_DIR/" 2>/dev/null || true
  ok "已生成 IPv6 Reality 配置：$out_file"
  note "下载链接：http://$(public_ip_for_links):${HTTP_PORT}/$(basename "$out_file")"
  note "Windows 测试：powershell -NoProfile -Command \"Test-NetConnection -ComputerName '$v6' -Port $port\""
  ss -lntp -6 | grep ":${port}" || true
}


ipv6_reality_443_clean(){
  section "IPv6 Reality 443 Clean / 纯 IPv6 VLESS Reality 443 清洁重建"
  warn "这个功能会把当前 443 入站切换为 VLESS Reality。原 443 Trojan 会先备份，但会暂时不可用。"
  note "适合：IPv6 很重要，2443/2444 非 443 Reality 在 FLClash/Mihomo 下持续 Timeout 的情况。"
  note "默认使用标准 443 + Reality serverName www.cloudflare.com；填写域名时会自动写入 hosts 固定解析，避免公共 DNS 未生效导致 Timeout。"
  echo
  read -rp "确认切换 443 为 VLESS Reality？[y/N]: " sure
  [[ "$sure" =~ ^[Yy]$ ]] || return 0

  local v6 domain server_host sni uuid keys private public short node port
  port="443"
  v6="$(ip6_external || true)"
  [[ -n "$v6" ]] || v6="$(ipv6_global_addr || true)"
  read -rp "IPv6 地址 [${v6:-空}]: " input6
  v6="${input6:-$v6}"
  [[ -n "$v6" ]] || { err "未检测到 IPv6。"; return 1; }

  read -rp "AAAA 域名，建议填写，例如 v6-r443.example.com: " domain
  if [[ -n "$domain" ]]; then
    server_host="$domain"
  else
    server_host="$v6"
  fi

  sni="$(ask 'Reality serverName' 'www.cloudflare.com')"
  node="$(ask '节点名称' 'TW 台湾-自建VPS-VLESS-R-IPv6-443')"
  uuid="$($XRAY uuid 2>/dev/null || cat /proc/sys/kernel/random/uuid)"
  keys="$($XRAY x25519 2>/dev/null || true)"
  private="$(echo "$keys" | awk -F': ' '/Private/{print $2; exit}')"
  public="$(echo "$keys" | awk -F': ' '/Public/{print $2; exit}')"
  if [[ -z "$private" || -z "$public" ]]; then
    err "xray x25519 生成密钥失败。"
    echo "$keys"
    return 1
  fi
  short="$(openssl rand -hex 8)"

  backup_all
  cp "$XCONF" "$BAK/xray_config_before_ipv6_reality_443_$(ts).json" 2>/dev/null || true
  cp "$XCONF" "$XCONF.bak.before_ipv6_reality_443.$(ts)" 2>/dev/null || true

  export port uuid private short sni
  python3 - <<'PY_IPV6_REALITY443'
import os, json
path="/usr/local/etc/xray/config.json"
cfg=json.load(open(path))
port=int(os.environ["port"])
uuid=os.environ["uuid"]
private=os.environ["private"]
short=os.environ["short"]
sni=os.environ["sni"]
tag="vless-ipv6-reality-443-in"
cfg.setdefault("inbounds", [])
# 443 只能有一个入站：清掉所有 port=443 的入站，避免 Trojan/VLESS 端口冲突
cfg["inbounds"]=[ib for ib in cfg["inbounds"] if ib.get("port") != port and ib.get("tag") != tag]
cfg["inbounds"].append({
  "listen": "::",
  "port": port,
  "protocol": "vless",
  "tag": tag,
  "settings": {
    "decryption": "none",
    "clients": [{"id": uuid, "flow": "xtls-rprx-vision"}]
  },
  "streamSettings": {
    "network": "tcp",
    "security": "reality",
    "realitySettings": {
      "dest": f"{sni}:443",
      "serverNames": [sni],
      "privateKey": private,
      "shortIds": [short]
    }
  },
  "sniffing": {"enabled": True, "destOverride": ["http", "tls", "quic"]}
})
open(path,"w").write(json.dumps(cfg, indent=2, ensure_ascii=False))
print("OK: added", tag, port)
PY_IPV6_REALITY443

  "$XRAY" run -test -config "$XCONF" || { err "Xray 配置测试失败，未重启。可用 12) Rollback Xray 回滚。"; return 1; }
  fw_open_port 443 "tcp"
  systemctl restart xray
  ok "已将 443 切换为 IPv6 VLESS Reality。"

  mkdir -p "$OUT" "$HTTP_DIR"
  local out_file="$OUT/01_IMPORT_FLCLASH_IPV6_REALITY_PORT443.yaml"
  local out_alias="$OUT/01_IMPORT_FLCLASH_IPV6_REALITY_443.yaml"
  cat > "$out_file" <<EOF
# LazyVPS IPv6 Reality 443 Clean Export / 纯 IPv6 VLESS Reality 标准 443
mixed-port: 7890
allow-lan: false
mode: rule
log-level: info
ipv6: true
unified-delay: true
tcp-concurrent: false

hosts:
  "$server_host": "$v6"

dns:
  enable: true
  listen: 127.0.0.1:1053
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    - "$server_host"
  nameserver:
    - 2606:4700:4700::1111
    - 2001:4860:4860::8888
    - 1.1.1.1
    - 8.8.8.8

proxies:
  - name: "$node"
    type: vless
    server: "$server_host"
    port: 443
    uuid: $uuid
    udp: true
    network: tcp
    tls: true
    flow: xtls-rprx-vision
    servername: $sni
    reality-opts:
      public-key: $public
      short-id: $short
    client-fingerprint: chrome

proxy-groups:
  - name: GLOBAL
    type: select
    proxies:
      - "$node"
      - DIRECT
  - name: PROXY
    type: select
    proxies:
      - "$node"
      - DIRECT

rules:
  - IP-CIDR6,${v6}/128,DIRECT,no-resolve
EOF
  if [[ "$server_host" != *":"* ]]; then
    echo "  - DOMAIN,${server_host},DIRECT" >> "$out_file"
  fi
  cat >> "$out_file" <<EOF
  - MATCH,PROXY
EOF

  yaml_firstline_sanitize "$out_file" 2>/dev/null || true
  yaml_validate_file "$out_file" || { err "IPv6 Reality 443 YAML 校验失败。"; return 1; }
  cp -f "$out_file" "$out_alias" 2>/dev/null || true
  cp -f "$out_file" "$HTTP_DIR/" 2>/dev/null || true
  ok "已生成 IPv6 Reality 443 配置：$out_file"
  note "兼容别名：$out_alias"
  note "下载链接：http://$(public_ip_for_links):${HTTP_PORT}/$(basename "$out_file")"
  note "Windows 测试：powershell -NoProfile -Command \"Test-NetConnection -ComputerName '$v6' -Port 443\""
  ss -lntp -6 | grep ':443' || true
}

ipv6_reality_443_rollback_hint(){
  section "IPv6 Reality 443 Rollback / 回滚提示"
  note "若 443 Reality 不合适，请执行主菜单 12) Rollback Xray，选择切换前的备份。"
  note "备份目录：/opt/lazy-vps-menu/backups"
  ls -lt "$BAK"/*xray* 2>/dev/null | head -10 || true
}

ipv6_disable(){
  section "IPv6 Disable / 临时关闭系统 IPv6"
  warn "此操作会在系统层关闭 IPv6，适合排查 IPv6 泄漏，不适合你当前想测试 IPv6 的场景。"
  read -rp "确认关闭系统 IPv6？[y/N]: " ans
  [[ "$ans" =~ ^[Yy]$ ]] || return 0
  cp /etc/sysctl.conf "$BAK/sysctl.conf.before_disable_ipv6_$(ts)" 2>/dev/null || true
  cat > /etc/sysctl.d/99-lazyvps-disable-ipv6.conf <<'EOF'
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.lo.disable_ipv6 = 1
EOF
  sysctl --system >/dev/null 2>&1 || true
  ok "已写入 /etc/sysctl.d/99-lazyvps-disable-ipv6.conf"
}

ipv6_rollback(){
  section "IPv6 Rollback / 恢复系统 IPv6"
  rm -f /etc/sysctl.d/99-lazyvps-disable-ipv6.conf
  cat > /etc/sysctl.d/99-lazyvps-enable-ipv6.conf <<'EOF'
net.ipv6.conf.all.disable_ipv6 = 0
net.ipv6.conf.default.disable_ipv6 = 0
net.ipv6.conf.lo.disable_ipv6 = 0
EOF
  sysctl --system >/dev/null 2>&1 || true
  ok "已尝试恢复系统 IPv6。"
  ipv6_check
}


# ------------------------------------------------------------------------------
# v1.2.15: IPv4/IPv6 独立端口与双栈策略
# ------------------------------------------------------------------------------

ipv4_reality_fallback_port(){
  section "IPv4 Fallback Port / IPv4 备用端口部署"
  note "用于双栈 VPS：IPv6 443 做主力，IPv4 单独开备用端口，方便手动指定 V4 / V6。"
  note "默认新增 IPv4 VLESS Reality 8443，不影响已跑通的 IPv6 Reality 443。"
  warn "Reality 非 443 端口在部分网络环境可能有额外识别风险；此处作为 IPv4 备用和排查用途。"
  echo

  local port v4 domain server_host sni uuid keys private public short node out_file
  port="$(ask 'IPv4 备用 Reality 端口' '8443')"
  valid_port "$port" || { err "端口无效。"; return 1; }

  v4="$(ip4_external || true)"
  read -rp "IPv4 地址 [${v4:-空}]: " input4
  v4="${input4:-$v4}"
  [[ -n "$v4" ]] || { err "未检测到 IPv4。若是 NAT VPS，请手动输入公网 IPv4。"; return 1; }

  read -rp "A 域名，可留空；例如 v4-backup.example.com: " domain
  if [[ -n "$domain" ]]; then server_host="$domain"; else server_host="$v4"; fi

  sni="$(ask 'Reality serverName' 'www.cloudflare.com')"
  node="$(ask '节点名称' 'TW 台湾-自建VPS-VLESS-R-IPv4-8443')"
  uuid="$($XRAY uuid 2>/dev/null || cat /proc/sys/kernel/random/uuid)"
  keys="$($XRAY x25519 2>/dev/null || true)"
  private="$(echo "$keys" | awk -F': ' '/Private/{print $2; exit}')"
  public="$(echo "$keys" | awk -F': ' '/Public/{print $2; exit}')"
  if [[ -z "$private" || -z "$public" ]]; then err "xray x25519 生成密钥失败。"; echo "$keys"; return 1; fi
  short="$(openssl rand -hex 8)"

  backup_all
  cp "$XCONF" "$XCONF.bak.ipv4_reality_${port}.$(ts)" 2>/dev/null || true

  export port uuid private short sni
  python3 - <<'PY_IPV4_REALITY_INBOUND'
import os, json
path='/usr/local/etc/xray/config.json'
cfg=json.load(open(path))
port=int(os.environ['port'])
uuid=os.environ['uuid']
private=os.environ['private']
short=os.environ['short']
sni=os.environ['sni']
tag=f'vless-ipv4-reality-{port}-in'
cfg.setdefault('inbounds', [])
# 同端口只保留一个备用入站，避免重复监听
cfg['inbounds']=[ib for ib in cfg['inbounds'] if ib.get('port') != port and ib.get('tag') != tag]
cfg['inbounds'].append({
  'listen':'0.0.0.0',
  'port':port,
  'protocol':'vless',
  'tag':tag,
  'settings':{'decryption':'none','clients':[{'id':uuid,'flow':'xtls-rprx-vision'}]},
  'streamSettings':{
    'network':'tcp',
    'security':'reality',
    'realitySettings':{
      'show':False,
      'dest':f'{sni}:443',
      'xver':0,
      'serverNames':[sni],
      'privateKey':private,
      'shortIds':[short]
    }
  },
  'sniffing':{'enabled':True,'destOverride':['http','tls','quic']}
})
open(path,'w').write(json.dumps(cfg, indent=2, ensure_ascii=False))
print('OK: added', tag, port)
PY_IPV4_REALITY_INBOUND

  "$XRAY" run -test -config "$XCONF" || { err "Xray 配置测试失败，未重启。"; return 1; }
  fw_open_port "$port" "tcp"
  systemctl restart xray
  ok "已新增 IPv4 VLESS Reality 备用端口：$port"

  mkdir -p "$OUT" "$HTTP_DIR"
  out_file="$OUT/01_IMPORT_FLCLASH_IPV4_REALITY_PORT${port}.yaml"
  cat > "$out_file" <<EOF
# LazyVPS IPv4 Fallback Reality Export / IPv4 备用端口
mixed-port: 7890
allow-lan: false
mode: rule
log-level: info
ipv6: false
unified-delay: true
tcp-concurrent: true
EOF
  if [[ -n "$domain" ]]; then
    cat >> "$out_file" <<EOF
hosts:
  "$server_host": "$v4"
EOF
  fi
  cat >> "$out_file" <<EOF

dns:
  enable: true
  listen: 127.0.0.1:1053
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
EOF
  if [[ -n "$domain" ]]; then
    cat >> "$out_file" <<EOF
  fake-ip-filter:
    - "$server_host"
EOF
  fi
  cat >> "$out_file" <<EOF
  nameserver:
    - 223.5.5.5
    - 119.29.29.29
    - 1.1.1.1
    - 8.8.8.8

proxies:
  - name: "$node"
    type: vless
    server: "$server_host"
    port: $port
    uuid: $uuid
    udp: true
    network: tcp
    tls: true
    flow: xtls-rprx-vision
    servername: $sni
    reality-opts:
      public-key: $public
      short-id: $short
    client-fingerprint: chrome

proxy-groups:
  - name: GLOBAL
    type: select
    proxies:
      - "$node"
      - DIRECT
  - name: PROXY
    type: select
    proxies:
      - "$node"
      - DIRECT

rules:
EOF
  if [[ -n "$domain" ]]; then
    echo "  - DOMAIN,${server_host},DIRECT" >> "$out_file"
  else
    echo "  - IP-CIDR,${v4}/32,DIRECT,no-resolve" >> "$out_file"
  fi
  cat >> "$out_file" <<EOF
  - MATCH,PROXY
EOF

  yaml_firstline_sanitize "$out_file" 2>/dev/null || true
  yaml_validate_file "$out_file" || { err "IPv4 Reality YAML 校验失败。"; return 1; }
  cp -f "$out_file" "$HTTP_DIR/" 2>/dev/null || true
  ok "已生成 IPv4 备用配置：$out_file"
  note "下载链接：http://$(public_ip_for_links):${HTTP_PORT}/$(basename "$out_file")"
  note "Windows 测试：powershell -NoProfile -Command \"Test-NetConnection -ComputerName '$v4' -Port $port\""
  ss -lntp | grep ":${port}" || true
}

v4v6_split_export(){
  section "V4/V6 Split Export / V4V6 独立端口导出"
  note "将 IPv6 Reality 443 与 IPv4 备用端口合并成一个 FLClash 配置，便于手动指定 V4 / V6。"
  local v6file v4file out_file alias_file
  v6file="$OUT/01_IMPORT_FLCLASH_IPV6_REALITY_PORT443.yaml"
  [[ -f "$v6file" ]] || v6file="$OUT/01_IMPORT_FLCLASH_IPV6_REALITY_443.yaml"
  v4file="$(ls -t "$OUT"/01_IMPORT_FLCLASH_IPV4_REALITY_PORT*.yaml 2>/dev/null | head -1 || true)"

  [[ -f "$v6file" ]] || { err "找不到 IPv6 Reality 443 配置。请先执行 IPv6 Mode → IPv6 Reality 443。"; return 1; }
  [[ -f "$v4file" ]] || { err "找不到 IPv4 备用端口配置。请先执行 IPv6 Mode → IPv4 Fallback Port。"; return 1; }

  out_file="$OUT/01_IMPORT_FLCLASH_V4V6_SPLIT.yaml"
  alias_file="$OUT/01_IMPORT_FLCLASH_DUALSTACK_AUTO.yaml"

  python3 - "$v6file" "$v4file" "$out_file" <<'PY_V4V6_SPLIT'
import sys, yaml, re
v6file, v4file, outfile = sys.argv[1:4]
def load(p): return yaml.safe_load(open(p, encoding='utf-8'))
def first_proxy(c):
    ps=c.get('proxies') or []
    if not ps: raise SystemExit(f'no proxies in {c}')
    return dict(ps[0])
def server_rule(s):
    if not s: return None
    if re.match(r'^(\d{1,3}\.){3}\d{1,3}$', str(s)):
        return f'IP-CIDR,{s}/32,DIRECT,no-resolve'
    if ':' in str(s):
        return f'IP-CIDR6,{s}/128,DIRECT,no-resolve'
    return f'DOMAIN,{s},DIRECT'
def merge_hosts(*cfgs):
    h={}
    for c in cfgs:
        h.update(c.get('hosts') or {})
    return h
c6=load(v6file); c4=load(v4file)
p6=first_proxy(c6); p4=first_proxy(c4)
# 保留用户命名，但加清晰后缀避免同名
if 'IPv6' not in p6.get('name','') and 'V6' not in p6.get('name',''):
    p6['name']=p6.get('name','IPv6 Reality')+'-V6-443'
if 'IPv4' not in p4.get('name','') and 'V4' not in p4.get('name',''):
    p4['name']=p4.get('name','IPv4 Reality')+'-V4'
node6=p6['name']; node4=p4['name']
hosts=merge_hosts(c6,c4)
fake=[]
for c in [c6,c4]:
    fake += ((c.get('dns') or {}).get('fake-ip-filter') or [])
for s in [p6.get('server'), p4.get('server')]:
    if s and ':' not in str(s) and not re.match(r'^(\d{1,3}\.){3}\d{1,3}$', str(s)):
        fake.insert(0, s)
# 去重保持顺序
seen=set(); fake=[x for x in fake if not (x in seen or seen.add(x))]
rules=[]
for p in [p6,p4]:
    r=server_rule(p.get('server'))
    if r and r not in rules: rules.append(r)
for c in [c6,c4]:
    for r in c.get('rules') or []:
        if isinstance(r,str) and (r.startswith('IP-CIDR') or r.startswith('DOMAIN,')) and r not in rules:
            rules.append(r)
rules.append('MATCH,PROXY')
out={
  'mixed-port':7890,
  'allow-lan':False,
  'mode':'rule',
  'log-level':'info',
  'ipv6':True,
  'unified-delay':True,
  'tcp-concurrent':False,
  'hosts':hosts,
  'dns':{
    'enable':True,
    'listen':'127.0.0.1:1053',
    'enhanced-mode':'fake-ip',
    'fake-ip-range':'198.18.0.1/16',
    'fake-ip-filter':fake,
    'nameserver':['2606:4700:4700::1111','2001:4860:4860::8888','223.5.5.5','119.29.29.29','1.1.1.1','8.8.8.8']
  },
  'proxies':[p6,p4],
  'proxy-groups':[
    {'name':'🌐 Auto','type':'fallback','proxies':[node6,node4],'url':'https://www.gstatic.com/generate_204','interval':300},
    {'name':'🚀 Proxy','type':'select','proxies':['🌐 Auto',node6,node4,'DIRECT']},
    {'name':'🇹🇼 IPv6 主力','type':'select','proxies':[node6,'DIRECT']},
    {'name':'🇹🇼 IPv4 备用','type':'select','proxies':[node4,'DIRECT']},
    {'name':'GLOBAL','type':'select','proxies':['🚀 Proxy','🌐 Auto',node6,node4,'DIRECT']},
    {'name':'PROXY','type':'select','proxies':['🚀 Proxy','🌐 Auto',node6,node4,'DIRECT']},
  ],
  'rules':rules
}
with open(outfile,'w',encoding='utf-8') as f:
    f.write('# LazyVPS V4/V6 Split Export / IPv6主力 + IPv4备用\n')
    yaml.safe_dump(out, f, allow_unicode=True, sort_keys=False)
yaml.safe_load(open(outfile, encoding='utf-8'))
print('OK:', outfile)
PY_V4V6_SPLIT

  yaml_validate_file "$out_file" || { err "V4/V6 Split YAML 校验失败。"; return 1; }
  cp -f "$out_file" "$alias_file" 2>/dev/null || true
  cp -f "$out_file" "$HTTP_DIR/" 2>/dev/null || true
  cp -f "$alias_file" "$HTTP_DIR/" 2>/dev/null || true
  ok "已生成 V4/V6 独立端口配置：$out_file"
  ok "已生成 DualStack Auto 别名：$alias_file"
  note "下载链接：http://$(public_ip_for_links):${HTTP_PORT}/$(basename "$out_file")"
}

dualstack_strategy_template(){
  section "DualStack Strategy / 双栈策略组生成说明"
  local md="$OUT/v4v6_dualstack_strategy.md"
  cat > "$md" <<'EOF'
# LazyVPS V4/V6 独立端口与双栈策略

推荐结构：

```text
IPv6 主力：VLESS Reality 443
IPv4 备用：VLESS Reality 8443 或自定义端口
Auto 策略：优先 IPv6，失败后切 IPv4
```

推荐执行顺序：

```text
1. IPv6 Mode → IPv6 Reality 443
2. IPv6 Mode → IPv4 Fallback Port
3. IPv6 Mode → V4/V6 Split Export
4. HTTP On
5. FLClash 导入 01_IMPORT_FLCLASH_V4V6_SPLIT.yaml
```

导入后可手动指定：

- `🇹🇼 IPv6 主力`：强制走 IPv6 Reality 443
- `🇹🇼 IPv4 备用`：强制走 IPv4 Reality 备用端口
- `🌐 Auto`：自动优先可用节点
EOF
  ok "已生成双栈策略说明：$md"
  sed -n '1,120p' "$md"
}

ipv6_mode_menu(){
  while true; do
    section "IPv6 Mode / IPv6 模式管理"
    note "适合原生 IPv6 / 双栈 VPS，用于生成 IPv4、IPv6、DualStack 三套客户端配置。"
    echo
    printf "  1) IPv6 Check / 检查 VPS IPv6\\n"
    printf "  2) IPv4/IPv6/DualStack Export / 生成三套导出配置\\n"
    printf "  3) IPv6 Guard / IPv6 泄漏检查\\n"
    printf "  4) IPv6 Disable / 临时关闭系统 IPv6\\n"
    printf "  5) IPv6 Rollback / 恢复系统 IPv6\\n"
    printf "  6) IPv6 Dedicated Port / IPv6 独立端口导出\\n"
    printf "  7) HTTP Sync Verify / HTTP 下载同步检查\\n"
    printf "  8) IPv6 Only Clean / 纯 IPv6 Trojan 独立端口重作〔兼容排查〕\\n"
    printf "  9) IPv6 Reality Port / 纯 IPv6 VLESS Reality 独立端口\\n"
    printf " 10) IPv6 Reality 443 Clean / 推荐：纯 IPv6 VLESS Reality 443\\n"
    printf " 11) IPv6 Reality 443 Rollback / 查看回滚提示\\n"
    printf " 12) IPv4 Fallback Port / IPv4 备用端口部署\\n"
    printf " 13) V4/V6 Split Export / V4V6 独立端口导出\\n"
    printf " 14) DualStack Strategy / 双栈策略组说明\\n"
    printf "  0) 返回\\n"
    read -rp "序号: " ans
    case "$ans" in
      1) ipv6_check; pause ;;
      2) ipv6_make_exports; pause ;;
      3) ipv6_guard; pause ;;
      4) ipv6_disable; pause ;;
      5) ipv6_rollback; pause ;;
      6) ipv6_dedicated_port_export; pause ;;
      7) ipv6_http_sync_verify; pause ;;
      8) ipv6_only_clean_trojan; pause ;;
      9) ipv6_reality_only; pause ;;
      10) ipv6_reality_443_clean; pause ;;
      11) ipv6_reality_443_rollback_hint; pause ;;
      12) ipv4_reality_fallback_port; pause ;;
      13) v4v6_split_export; pause ;;
      14) dualstack_strategy_template; pause ;;
      0|"") return ;;
      *) warn "输入无效。" ;;
    esac
  done
}

guided_workflows(){
  while true; do
    section "Guided Workflows / 快速流程向导"
    note "这里把常用流程收进互动菜单，不需要跳出菜单手动执行命令。"
    echo
    printf "  1) 新 VPS 快速建站流程：初始化 → BBR → 防火墙 → Xray\n"
    printf "  2) 导出与下载流程：Export → Export Safety → HTTP On\n"
    printf "  3) 香港入口 + AI 小鸡流程：Server AI Routing → AI Route Show\n"
    printf "  4) Media DNS 流媒体辅助流程：DNS Unlock → Show DNS → Export\n"
    printf "  5) VLESS 稳定性检查流程：Protocol Lint → Node Test → Status\n"
    printf "  6) 远程订阅发布流程：Export Safety → Remote Publish\n"
    printf "  0) 返回\n"
    read -rp "序号: " ans
    case "$ans" in
      1)
        note "建议顺序：1) System Init → 2) Stable BBR → 3) Firewall Backend → 4) Xray Core → 5/6/7 部署协议。"
        read -rp "是否现在依次执行初始化、BBR、防火墙、Xray Core？[y/N]: " y
        if [[ "$y" =~ ^[Yy]$ ]]; then
          init_system; bbr; ufw_basic; install_xray
          ok "基础环境已执行完毕。请回 PROTOCOL 分区选择 5 Trojan / 6 VLESS / 7 Hysteria2。"
        fi
        pause ;;
      2)
        note "导出流程会先生成配置，再做安全检查，最后可开启 HTTP 下载。"
        export_pkg
        export_safety_check || true
        read -rp "是否开启 HTTP 下载？[y/N]: " y
        [[ "$y" =~ ^[Yy]$ ]] && http_start
        pause ;;
      3)
        note "适合香港入口节点速度好，但 GPT/Claude 需要日本/台湾落地。"
        ai_service_route_apply
        ai_service_route_show
        pause ;;
      4)
        note "适合 Zouter / 自定义 Media DNS，用于流媒体 DNS/CDN 解析辅助。"
        run_dns_unlock
        media_dns_show || true
        read -rp "是否重新导出 FLClash，使 Media DNS 同步到配置？[y/N]: " y
        [[ "$y" =~ ^[Yy]$ ]] && export_pkg
        pause ;;
      5)
        note "适合 VLESS Reality 偶尔 Timeout 或节点不稳定时检查。"
        protocol_export_lint || true
        node_test_pack || true
        status_check
        pause ;;
      6)
        note "适合把 sub.yaml / surge.conf 发布到远程订阅服务器。"
        export_safety_check || true
        remote_publish
        pause ;;
      0|"") return ;;
      *) warn "输入无效。" ;;
    esac
  done
}

stability_suite(){
  while true; do
    section "Stability Suite / 稳定增强工具箱"
    note "把 v1.2.15 的长功能项收纳为子菜单，主界面保持简洁。"
    echo
    printf "  1) Guided Workflows / 快速流程向导\n"
    printf "  2) Public IP Guard / NAT 公网 IP 识别保护\n"
    printf "  3) Export Safety / 导出配置安全检查\n"
    printf "  4) Remote Publish / 远程订阅发布\n"
    printf "  5) Node Test Pack / 节点体检包\n"
    printf "  6) NodeQuality Archive / 酒神测试归档\n"
    printf "  7) IPv6 Mode / IPv6 模式管理\n"
    printf "  0) 返回\n"
    read -rp "序号: " ans
    case "$ans" in
      1) guided_workflows; pause ;;
      2) public_ip_guard; pause ;;
      3) export_safety_check; pause ;;
      4) remote_publish; pause ;;
      5) node_test_pack; pause ;;
      6) nodequality_archive; pause ;;
      7) ipv6_mode_menu; pause ;;
      0|"") return ;;
      *) warn "输入无效。" ;;
    esac
  done
}

advanced_suite(){
  while true; do
    section "Advanced Suite / 进阶模板工具箱"
    note "把 v1.2.4 的进阶模板、分类、体检功能收纳为子菜单。"
    echo
    printf "  1) Airport Chain Template / 机场链规则模板\n"
    printf "  2) Advanced Export / 进阶 FLClash 导出\n"
    printf "  3) Strategy Template / 成熟策略组模板\n"
    printf "  4) Node Classify / 节点分类命名整理\n"
    printf "  5) Protocol Lint / 协议导出体检\n"
    printf "  6) VLESS Vision Guide / VLESS Reality Vision 说明\n"
    printf "  7) VLESS Timeout Tips / VLESS 间歇 Timeout 排查建议\n"
    printf "  8) VLESS Reality Repair / Reality 修复向导\n"
    printf "  9) Reality SNI Switch / Reality 目标切换\n"
    printf " 10) VLESS Stable Export / VLESS 稳定导出\n"
    printf "  0) 返回\n"
    read -rp "序号: " ans
    case "$ans" in
      1) airport_chain_template; pause ;;
      2) export_advanced_flclash; pause ;;
      3) advanced_strategy_template; pause ;;
      4) node_classify_rename; pause ;;
      5) protocol_export_lint; pause ;;
      6) vless_vision_guide; pause ;;
      7) vless_timeout_tips; pause ;;
      8) vless_reality_repair; pause ;;
      9) vless_sni_switch; pause ;;
      10) vless_stable_export; pause ;;
      0|"") return ;;
      *) warn "输入无效。" ;;
    esac
  done
}


vless_reality_current_info(){
  python3 - <<'PY_VLESS_INFO'
import json, subprocess, sys, os, re
path="/usr/local/etc/xray/config.json"
try:
    cfg=json.load(open(path))
except Exception as e:
    print("读取 Xray 配置失败:", e)
    sys.exit(1)
found=False
for ib in cfg.get("inbounds", []):
    if ib.get("protocol") == "vless":
        found=True
        st=ib.get("streamSettings", {})
        rs=st.get("realitySettings", {})
        print("port =", ib.get("port"))
        print("network =", st.get("network"))
        print("security =", st.get("security"))
        print("dest =", rs.get("dest"))
        print("serverNames =", rs.get("serverNames"))
        print("shortIds =", rs.get("shortIds"))
        print("privateKey =", "********" if rs.get("privateKey") else "")
        print("clients =")
        for c in ib.get("settings", {}).get("clients", []):
            print(" ", c)
if not found:
    print("未发现 VLESS inbound")
PY_VLESS_INFO
}

vless_reality_public_key(){
  local priv
  priv="$(python3 - <<'PY_PRIV'
import json
cfg=json.load(open('/usr/local/etc/xray/config.json'))
for ib in cfg.get("inbounds", []):
    rs=ib.get("streamSettings", {}).get("realitySettings", {})
    if rs.get("privateKey"):
        print(rs.get("privateKey"))
        break
PY_PRIV
)"
  if [[ -z "$priv" ]]; then
    warn "未找到 Reality privateKey。"
    return 1
  fi
  "$XRAY" x25519 -i "$priv" 2>/dev/null | grep -iE "Public|Password" || true
}

vless_sni_switch(){
  section "Reality SNI Switch / Reality 目标切换"
  note "建议默认统一使用 www.cloudflare.com。"
  note "如果某个目标偶发 Timeout，可在 Cloudflare / Microsoft / Apple / Yahoo 间切换。"
  echo
  printf "  1) www.cloudflare.com  （推荐默认）\n"
  printf "  2) www.microsoft.com   （旧默认，部分线路可能不稳）\n"
  printf "  3) www.apple.com\n"
  printf "  4) www.yahoo.com\n"
  printf "  5) 自定义\n"
  printf "  0) 返回\n"
  read -rp "序号: " ans
  local sni
  case "$ans" in
    1) sni="www.cloudflare.com" ;;
    2) sni="www.microsoft.com" ;;
    3) sni="www.apple.com" ;;
    4) sni="www.yahoo.com" ;;
    5) read -rp "请输入 Reality serverName: " sni ;;
    0|"") return ;;
    *) warn "输入无效。"; return ;;
  esac
  [[ -n "$sni" ]] || { warn "SNI 为空。"; return; }

  backup_all
  cp "$XCONF" "$XCONF.bak.reality_sni.$(ts)" 2>/dev/null || true
  python3 - "$sni" <<'PY_SWITCH_SNI'
import sys, json
sni=sys.argv[1]
path="/usr/local/etc/xray/config.json"
cfg=json.load(open(path))
changed=False
for ib in cfg.get("inbounds", []):
    if ib.get("protocol")=="vless":
        st=ib.setdefault("streamSettings", {})
        rs=st.setdefault("realitySettings", {})
        rs["dest"]=f"{sni}:443"
        rs["serverNames"]=[sni]
        changed=True
open(path,"w").write(json.dumps(cfg, indent=2, ensure_ascii=False))
print("changed =", changed)
print("serverName =", sni)
PY_SWITCH_SNI

  "$XRAY" run -test -config "$XCONF" || { err "Xray 配置测试失败，已保留备份，请手动检查。"; return 1; }
  systemctl restart xray
  ok "已切换服务端 Reality dest/serverNames 为：$sni"

  patch_vless_servername_in_outputs "$sni"
  note "已尝试同步 outputs 内客户端配置 servername。建议重新执行 10) Export / 41) Advanced Export。"
  curl -I --connect-timeout 8 "https://${sni}" 2>/dev/null | head -5 || warn "目标站连接测试无输出，仍可继续客户端测试。"
}

vless_stable_export(){
  section "VLESS Stable Export / VLESS 稳定导出"
  [[ -f "$OUT/01_IMPORT_FLCLASH.yaml" ]] || { warn "未发现基础配置，尝试执行 10) Export。"; export_pkg || return 1; }
  local src="$OUT/01_IMPORT_FLCLASH.yaml" dst="$OUT/01_IMPORT_FLCLASH_VLESS_STABLE.yaml"
  local server
  server="$(awk '/^[[:space:]]*server:[[:space:]]*/{print $2; exit}' "$src" | tr -d '"')"
  cp "$src" "$dst"
  sed -i 's/tcp-concurrent: true/tcp-concurrent: false/g' "$dst"
  inject_direct_rule_into_yaml "$dst" "$server"
  ok "已生成 VLESS 稳定导出：$dst"
  note "稳定版会设置 tcp-concurrent:false，并加入代理服务器 IP/DNS 直连规则。"
}

vless_reality_repair(){
  section "VLESS Reality Repair / Reality 修复向导"
  note "用于排查服务端正常、443 可达，但 FLClash Reality 节点 Timeout 的情况。"
  echo
  info "1) 当前服务端 VLESS / Reality 信息："
  vless_reality_current_info || true
  echo
  info "2) 当前 Reality public-key："
  vless_reality_public_key || true
  echo
  info "3) 协议导出体检："
  protocol_export_lint || true
  echo
  info "4) 节点体检："
  node_test_pack || true
  echo
  warn "如果 UUID / public-key / short-id / flow 都正确，但仍 Timeout，优先切换 Reality SNI 到 www.cloudflare.com，并生成 VLESS Stable Export。"
  echo
  read -rp "是否切换 Reality SNI？[y/N]: " sw
  [[ "$sw" =~ ^[Yy]$ ]] && vless_sni_switch
  read -rp "是否生成 VLESS Stable Export？[y/N]: " se
  [[ "$se" =~ ^[Yy]$ ]] && vless_stable_export
}

vless_timeout_tips(){
  section "VLESS Timeout Tips / VLESS 间歇 Timeout 排查建议"
  local md="$OUT/vless_timeout_tips.md"
  cat > "$md" <<'EOF'
# VLESS Reality Vision 间歇 Timeout 排查建议

## 先判断

如果节点多数时候可连接，但偶尔 Timeout，通常不是字段完全错误，而是以下几类问题：

1. 本地网络抖动、5G CPE 抖动、运营商路由波动。
2. 服务端 CPU / 内存没问题，但链路存在瞬时丢包。
3. Reality 握手目标、SNI、public-key、short-id、client-fingerprint 组合可用但偶发失败。
4. 客户端内核版本或 VLESS Reality 支持不稳定。
5. 全局 `tcp-concurrent: true` 在部分网络环境下可能带来连接波动，可用稳定模板对比。

## 推荐检查顺序

```bash
bash /root/lazy-vps-menu.sh --quick protocol-lint
bash /root/lazy-vps-menu.sh --quick node-test
systemctl status xray --no-pager
journalctl -u xray -n 80 --no-pager
```

## 客户端建议

- FLClash / Mihomo 尽量使用新版。
- 保持：
  - `type: vless`
  - `tls: true`
  - `flow: xtls-rprx-vision`
  - `client-fingerprint: chrome`
  - `reality-opts.public-key`
  - `reality-opts.short-id`
- 如果偶发 Timeout：
  - 先重新测速，不要只看单次 Timeout。
  - 对比 `01_IMPORT_FLCLASH.yaml`、`01_IMPORT_FLCLASH_VLESS_STABLE.yaml` 与 `01_IMPORT_FLCLASH_ADVANCED.yaml`。
  - 如有需要，可将全局 `tcp-concurrent` 临时改为 `false` 做对比。

## 速度测试解读

如果 nPerf / TANet 能达到数百 Mbps，但节点偶发 Timeout，多半是握手或路由瞬时问题，不是带宽不足。
EOF
  ok "已生成排查建议：$md"
  sed -n '1,100p' "$md"
}

ITEMS=(
"System Init / 系统初始化"
"Stable BBR / 开启 BBR+fq"
"Firewall Backend / 防火墙后端"
"Xray Core / 安装或更新 Xray"
"Trojan 443 / 部署 T 协议"
"VLESS Reality Vision / 部署 VLESS-R 协议"
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
"DNS Unlock / 媒体 DNS 解锁与导出同步"
"NetSpeed / 锐速/BBRPlus/BBR2/BBR3"
"TCP Tune / TCP 窗口调优"
"Diagnose / 一键诊断查修"
"Current Trojan / 查看当前 T 参数"
"Stability Suite / 稳定增强工具箱"
"Advanced Suite / 进阶模板工具箱"
"Exit / 退出"
)

DESCS=(
"安装基础依赖、确认 SSH、配置防火墙、开启 BBR"
"启用 Linux 原生 BBR + fq，保守稳定"
"AUTO/UFW/NFT/IPTABLES/NONE，放行常用端口"
"安装或更新 Xray-core"
"稳定常用节点，默认继承当前服务端密码"
"VLESS Reality Vision，含 flow/public-key/short-id/client-fingerprint"
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
"Zouter/Custom/Alice，DNS/CDN 辅助，并同步到 FLClash 导出"
"第三方内核加速脚本，可能重启"
"第三方 TCP 参数调优工具"
"检查服务/日志/配置并可重建导入文件"
"显示当前服务端端口/SNI/密码，避免误用旧配置"
"收纳流程向导、Public IP、Export Safety、Remote Publish、Node Test、NodeQuality"
"收纳机场链、进阶导出、策略组、节点分类、协议体检、VLESS说明"
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
    35) stability_suite ;;
    36) advanced_suite ;;
    37) exit 0 ;;
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

CAT_START=(1 5 8 11 16 21 29 37)
CAT_END=(4 7 10 15 20 28 36 37)
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

  printf "${YLW}操作：${R}${B}↑↓${R} 选择功能  ${B}←→${R} 切换分区  ${B}Enter${R} 执行  ${B}1-37${R} 直达  ${B}Q${R} 退出\n\n"

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
      [[ "$selected" -ne 37 ]] && pause

    elif [[ "$key" =~ [0-9] ]]; then
      num="$key"

      while IFS= read -rsn1 -t 0.5 key2; do
        [[ "$key2" =~ [0-9] ]] || break
        num="${num}${key2}"
      done

      if [[ "$num" =~ ^[0-9]+$ ]] && ((num>=1 && num<=37)); then
        selected="$num"
        cat="$(find_category "$selected")"
        clear
        run_choice "$selected"
        [[ "$selected" -ne 37 ]] && pause
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
    dns-unlock|media-dns|zouter-dns|dns) run_dns_unlock ;;
    dns-show) media_dns_show ;;
    dns-rollback) media_dns_rollback ;;
    dns-test) media_dns_test ;;
    tcpx) run_tcpx ;;
    tcp-window) run_tcp_window ;;
    diagnose|repair) diagnose_repair ;;
    current) view_current_trojan ;;
    public-ip|ip-guard) public_ip_guard ;;
    export-check|config-lint|lint) export_safety_check ;;
    export-verify) export_verify ;;
    remote-publish|publish) remote_publish ;;
    node-test) node_test_pack ;;
    nq-archive|nodequality-archive) nodequality_archive ;;
    airport-chain) airport_chain_template ;;
    advanced-export|adv-export) export_advanced_flclash ;;
    strategy-template|strategy) advanced_strategy_template ;;
    node-classify|rename-nodes) node_classify_rename ;;
    protocol-lint|proto-lint|vision-lint) protocol_export_lint ;;
    vless-guide|vision-guide) vless_vision_guide ;;
    ipv6-mode) ipv6_mode_menu ;;
    ipv6-check) ipv6_check ;;
    ipv6-export|dualstack-export|ipv6-stable) ipv6_make_exports ;;
    ipv6-guard) ipv6_guard ;;
    ipv6-disable) ipv6_disable ;;
    ipv6-rollback) ipv6_rollback ;;
    ipv6-port|ipv6-dedicated) ipv6_dedicated_port_export ;;
    ipv6-http|http-verify) ipv6_http_sync_verify ;;
    ipv6-only|ipv6-clean) ipv6_only_clean_trojan ;;
    ipv6-reality|ipv6-vless) ipv6_reality_only ;;
    ipv6-r443|ipv6-reality443|ipv6-443) ipv6_reality_443_clean ;;
    v4-fallback|ipv4-fallback|ipv4-reality) ipv4_reality_fallback_port ;;
    v4v6-split|split-export) v4v6_split_export ;;
    dualstack-auto|dualstack-strategy) dualstack_strategy_template ;;
    ipv6-r443-rollback) ipv6_reality_443_rollback_hint ;;
    *) echo "quick: init|bbr|trojan|reality|hysteria2|export|http|nodequality|merge|remote-merge|ai|ai-route|ai-route-show|ai-route-rollback|forward|relay-client|bbrv3|dns-unlock|media-dns|zouter-dns|dns-show|dns-rollback|dns-test|tcpx|tcp-window|diagnose|current|public-ip|export-check|remote-publish|node-test|nq-archive|airport-chain|advanced-export|strategy-template|node-classify|protocol-lint|vless-guide|vless-timeout|reality-repair|sni-switch|vless-stable|ipv6-mode|ipv6-check|ipv6-export|dualstack-export|ipv6-stable|ipv6-guard|ipv6-disable|ipv6-rollback|ipv6-port|ipv6-http|ipv6-only|ipv6-reality|ipv6-r443|ipv6-443|v4-fallback|v4v6-split|dualstack-auto" ;;
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
