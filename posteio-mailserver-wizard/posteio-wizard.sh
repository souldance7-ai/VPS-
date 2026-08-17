#!/usr/bin/env bash
# Poste.io 邮局全自动互动引导面板
# License: MIT

set -Eeuo pipefail

VERSION="1.0.0"
IMAGE="analogic/poste.io:latest"
STATE_DIR="/etc/posteio-wizard"
CONFIG_FILE="${STATE_DIR}/config.env"
DEFAULT_DATA_DIR="/opt/posteio/data"
DEFAULT_BACKUP_DIR="/opt/posteio/backups"
LOG_FILE="/var/log/posteio-wizard.log"

# 配置变量默认值；部署后由 root:root 0600 配置文件覆盖。
CONTAINER_NAME="poste-mailserver"
MAIL_HOSTNAME=""
MAIL_DOMAIN=""
PUBLIC_IPV4=""
TIMEZONE="UTC"
DATA_DIR="$DEFAULT_DATA_DIR"
BACKUP_DIR="$DEFAULT_BACKUP_DIR"
HTTP_PORT=80
HTTPS_PORT=443
DISABLE_CLAMAV=TRUE
DISABLE_RSPAMD=FALSE

if [[ -t 1 && -z "${NO_COLOR:-}" ]]; then
  C_RESET=$'\033[0m'
  C_BOLD=$'\033[1m'
  C_RED=$'\033[31m'
  C_GREEN=$'\033[32m'
  C_YELLOW=$'\033[33m'
  C_BLUE=$'\033[34m'
  C_CYAN=$'\033[36m'
else
  C_RESET="" C_BOLD="" C_RED="" C_GREEN="" C_YELLOW="" C_BLUE="" C_CYAN=""
fi

log() {
  local level=$1
  shift
  mkdir -p "$(dirname "$LOG_FILE")" 2>/dev/null || true
  printf '%s [%s] %s\n' "$(date '+%F %T')" "$level" "$*" >>"$LOG_FILE" 2>/dev/null || true
}

info() { printf '%sℹ%s %s\n' "$C_CYAN" "$C_RESET" "$*"; log INFO "$*"; }
ok() { printf '%s✔%s %s\n' "$C_GREEN" "$C_RESET" "$*"; log OK "$*"; }
warn() { printf '%s⚠%s %s\n' "$C_YELLOW" "$C_RESET" "$*"; log WARN "$*"; }
fail() { printf '%s✘%s %s\n' "$C_RED" "$C_RESET" "$*" >&2; log ERROR "$*"; }

on_error() {
  local code=$?
  local line=${BASH_LINENO[0]:-unknown}
  fail "执行失败：第 ${line} 行，退出码 ${code}。日志：${LOG_FILE}"
  exit "$code"
}
trap on_error ERR

header() {
  clear 2>/dev/null || true
  printf '%s%s' "$C_CYAN" "$C_BOLD"
  cat <<'EOF'
╔══════════════════════════════════════════════════════════════╗
║            Poste.io 邮局全自动互动引导面板                  ║
║        端口预检 · Docker 部署 · DNS · 验收 · 备份           ║
╚══════════════════════════════════════════════════════════════╝
EOF
  printf '%s' "$C_RESET"
  printf '  版本：%s  ｜  无遥测、无预置域名、无预置 IP\n\n' "$VERSION"
}

separator() { printf '%s\n' "──────────────────────────────────────────────────────────────"; }

pause() {
  [[ -t 0 ]] || return 0
  read -r -p "按 Enter 返回面板..." _
}

confirm() {
  local prompt=$1
  local default=${2:-N}
  local answer
  if [[ "$default" == "Y" ]]; then
    read -r -p "${prompt} [Y/n]：" answer
    answer=${answer:-Y}
  else
    read -r -p "${prompt} [y/N]：" answer
    answer=${answer:-N}
  fi
  [[ "$answer" =~ ^[Yy]$ ]]
}

prompt_value() {
  local __var=$1
  local prompt=$2
  local default=${3:-}
  local value
  if [[ -n "$default" ]]; then
    read -r -p "${prompt} [${default}]：" value
    value=${value:-$default}
  else
    read -r -p "${prompt}：" value
  fi
  printf -v "$__var" '%s' "$value"
}

require_root() {
  if (( EUID != 0 )); then
    fail "请使用 root 执行：sudo bash $0"
    exit 1
  fi
}

command_exists() { command -v "$1" >/dev/null 2>&1; }

is_ipv4() {
  local ip=$1 IFS=.
  local -a octets
  read -r -a octets <<<"$ip"
  [[ ${#octets[@]} -eq 4 ]] || return 1
  local octet
  for octet in "${octets[@]}"; do
    [[ "$octet" =~ ^[0-9]{1,3}$ ]] || return 1
    (( 10#$octet >= 0 && 10#$octet <= 255 )) || return 1
  done
}

is_domain() {
  local value=${1,,}
  [[ ${#value} -le 253 ]] || return 1
  [[ "$value" =~ ^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$ ]]
}

is_port() {
  [[ "$1" =~ ^[0-9]+$ ]] && (( 10#$1 >= 1 && 10#$1 <= 65535 ))
}

load_config() {
  [[ -f "$CONFIG_FILE" ]] || return 1
  # 配置文件由本脚本以 root:root 0600 创建。
  # shellcheck disable=SC1090
  source "$CONFIG_FILE"
}

save_config() {
  install -d -m 700 "$STATE_DIR"
  local tmp
  tmp=$(mktemp)
  {
    printf 'CONTAINER_NAME=%q\n' "$CONTAINER_NAME"
    printf 'MAIL_HOSTNAME=%q\n' "$MAIL_HOSTNAME"
    printf 'MAIL_DOMAIN=%q\n' "$MAIL_DOMAIN"
    printf 'PUBLIC_IPV4=%q\n' "$PUBLIC_IPV4"
    printf 'TIMEZONE=%q\n' "$TIMEZONE"
    printf 'DATA_DIR=%q\n' "$DATA_DIR"
    printf 'BACKUP_DIR=%q\n' "$BACKUP_DIR"
    printf 'HTTP_PORT=%q\n' "$HTTP_PORT"
    printf 'HTTPS_PORT=%q\n' "$HTTPS_PORT"
    printf 'DISABLE_CLAMAV=%q\n' "$DISABLE_CLAMAV"
    printf 'DISABLE_RSPAMD=%q\n' "$DISABLE_RSPAMD"
  } >"$tmp"
  install -m 600 "$tmp" "$CONFIG_FILE"
  rm -f "$tmp"
}

detect_os() {
  [[ -r /etc/os-release ]] || { fail "无法识别操作系统。"; return 1; }
  # shellcheck disable=SC1091
  source /etc/os-release
  OS_ID=${ID:-unknown}
  OS_VERSION=${VERSION_ID:-unknown}
}

install_packages() {
  detect_os
  info "检测到系统：${PRETTY_NAME:-${OS_ID} ${OS_VERSION}}"
  info "检查基础工具……"
  if command_exists apt-get; then
    apt-get update -y
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
      ca-certificates curl jq dnsutils openssl netcat-openbsd sqlite3 tar gzip iproute2
  elif command_exists dnf; then
    dnf install -y ca-certificates curl jq bind-utils openssl nmap-ncat sqlite tar gzip iproute
  elif command_exists yum; then
    yum install -y ca-certificates curl jq bind-utils openssl nc sqlite tar gzip iproute
  else
    fail "暂不支持自动安装依赖。请使用 Debian、Ubuntu、Rocky Linux、AlmaLinux。"
    return 1
  fi
  ok "基础工具已就绪。"
}

install_docker() {
  if command_exists docker; then
    ok "Docker 已安装：$(docker --version)"
  else
    info "正在安装 Docker……"
    if command_exists apt-get; then
      apt-get update -y
      DEBIAN_FRONTEND=noninteractive apt-get install -y docker.io
    elif command_exists dnf; then
      dnf -y install dnf-plugins-core
      dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
      dnf install -y docker-ce docker-ce-cli containerd.io
    elif command_exists yum; then
      yum install -y yum-utils
      yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
      yum install -y docker-ce docker-ce-cli containerd.io
    else
      fail "无法自动安装 Docker。"
      return 1
    fi
  fi
  systemctl enable --now docker >/dev/null 2>&1 || service docker start
  docker info >/dev/null
  ok "Docker 服务运行正常。"
}

detect_public_ipv4() {
  if [[ "${POSTEIO_SKIP_IP_LOOKUP:-0}" == "1" ]]; then
    return 1
  fi
  local candidate=""
  local endpoint
  for endpoint in \
    "https://api.ipify.org" \
    "https://ipv4.icanhazip.com" \
    "https://ifconfig.me/ip"; do
    candidate=$(curl -4fsS --max-time 8 "$endpoint" 2>/dev/null | tr -d '[:space:]' || true)
    if is_ipv4 "$candidate"; then
      printf '%s' "$candidate"
      return 0
    fi
  done
  return 1
}

memory_mb() { awk '/MemTotal/ {print int($2/1024)}' /proc/meminfo; }

default_mail_domain() {
  local host=$1
  printf '%s' "${host#*.}"
}

collect_config() {
  local detected_ip default_domain detected_tz mem
  detected_ip=$(detect_public_ipv4 || true)
  detected_tz=$(timedatectl show -p Timezone --value 2>/dev/null || true)
  detected_tz=${detected_tz:-UTC}

  while true; do
    prompt_value MAIL_HOSTNAME "邮件服务器主机名，例如 mail.example.com" "mail.example.com"
    MAIL_HOSTNAME=${MAIL_HOSTNAME,,}
    is_domain "$MAIL_HOSTNAME" && break
    warn "主机名格式不正确，必须是完整域名。"
  done

  default_domain=$(default_mail_domain "$MAIL_HOSTNAME")
  while true; do
    prompt_value MAIL_DOMAIN "收发邮件域名，例如 example.com" "$default_domain"
    MAIL_DOMAIN=${MAIL_DOMAIN,,}
    is_domain "$MAIL_DOMAIN" && break
    warn "邮件域名格式不正确。"
  done

  while true; do
    prompt_value PUBLIC_IPV4 "VPS 公网 IPv4" "$detected_ip"
    is_ipv4 "$PUBLIC_IPV4" && break
    warn "IPv4 格式不正确。"
  done

  prompt_value TIMEZONE "时区" "$detected_tz"
  prompt_value DATA_DIR "邮件数据目录" "$DEFAULT_DATA_DIR"
  prompt_value BACKUP_DIR "备份目录" "$DEFAULT_BACKUP_DIR"
  prompt_value CONTAINER_NAME "Docker 容器名称" "poste-mailserver"
  HTTP_PORT=80

  while true; do
    prompt_value HTTPS_PORT "Web 管理与 Webmail HTTPS 端口" "443"
    if ! is_port "$HTTPS_PORT"; then
      warn "端口必须是 1～65535。"
      continue
    fi
    if [[ " 25 80 110 143 465 587 993 995 4190 " == *" $HTTPS_PORT "* ]]; then
      warn "端口 ${HTTPS_PORT} 已用于邮件服务，请选择 443 或其他未占用端口。"
      continue
    fi
    break
  done
  if [[ "$HTTPS_PORT" != "443" ]]; then
    warn "非标准 HTTPS 端口可能导致后台绝对跳转漏掉端口；能使用 443 时优先使用 443。"
  fi

  mem=$(memory_mb)
  if (( mem >= 3800 )); then
    confirm "检测到 ${mem}MB 内存，是否启用 ClamAV 杀毒？" Y && DISABLE_CLAMAV=FALSE || DISABLE_CLAMAV=TRUE
  else
    DISABLE_CLAMAV=TRUE
    warn "内存仅 ${mem}MB，已默认关闭 ClamAV，避免内存不足。"
  fi
  confirm "是否启用 Rspamd 反垃圾邮件？" Y && DISABLE_RSPAMD=FALSE || DISABLE_RSPAMD=TRUE

  printf '\n'
  separator
  printf '%-20s %s\n' "邮件主机名" "$MAIL_HOSTNAME"
  printf '%-20s %s\n' "邮件域名" "$MAIL_DOMAIN"
  printf '%-20s %s\n' "公网 IPv4" "$PUBLIC_IPV4"
  printf '%-20s %s\n' "管理端口" "$HTTPS_PORT"
  printf '%-20s %s\n' "数据目录" "$DATA_DIR"
  printf '%-20s %s\n' "ClamAV" "$([[ "$DISABLE_CLAMAV" == FALSE ]] && echo 启用 || echo 关闭)"
  printf '%-20s %s\n' "Rspamd" "$([[ "$DISABLE_RSPAMD" == FALSE ]] && echo 启用 || echo 关闭)"
  separator
  if ! confirm "确认以上配置并开始预检？" Y; then
    info "已取消安装，系统未部署 Poste.io。"
    return 1
  fi
}

port_owner() {
  local port=$1
  ss -lntupH 2>/dev/null | awk -v p=":${port}" '$5 ~ (p "$") {print; found=1} END {exit !found}'
}

check_port_free() {
  local port=$1 label=$2
  local owner
  owner=$(port_owner "$port" || true)
  if [[ -n "$owner" ]]; then
    fail "${label} 端口 ${port} 已被占用："
    printf '%s\n' "$owner"
    return 1
  fi
  ok "${label} 端口 ${port} 空闲。"
}

preflight_ports() {
  info "检查 Poste.io 所需监听端口……"
  local -a checks=(
    "25:SMTP 收信"
    "80:HTTP/Let's Encrypt"
    "110:POP3 STARTTLS"
    "143:IMAP STARTTLS"
    "465:SMTPS"
    "587:SMTP Submission"
    "993:IMAPS"
    "995:POP3S"
    "4190:Sieve"
  )
  if [[ "$HTTPS_PORT" != "80" ]]; then
    checks+=("${HTTPS_PORT}:HTTPS 管理/Webmail")
  fi
  local item port label failed=0
  for item in "${checks[@]}"; do
    port=${item%%:*}
    label=${item#*:}
    check_port_free "$port" "$label" || failed=1
  done
  (( failed == 0 )) || {
    fail "存在端口冲突。请先处理冲突服务，脚本未修改系统。"
    return 1
  }
}

check_outbound_25() {
  info "检测 VPS 出站 TCP/25……"
  local target
  for target in gmail-smtp-in.l.google.com mx1.qq.com; do
    if nc -4 -z -w 8 "$target" 25 >/dev/null 2>&1; then
      ok "出站 TCP/25 可用（测试目标：${target}）。"
      return 0
    fi
  done
  warn "出站 TCP/25 连接失败，VPS 商可能封锁 25 端口。"
  warn "可以继续部署，但无法正常向外部邮件服务器投递，建议先向 VPS 商申请解封。"
  return 1
}

configure_firewall() {
  local -a tcp_ports=(25 80 110 143 465 587 993 995 4190 "$HTTPS_PORT")
  local port
  if command_exists ufw && ufw status 2>/dev/null | grep -q '^Status: active'; then
    info "检测到 UFW 已启用。"
    confirm "是否自动放行邮件所需 TCP 端口？" Y || return 0
    for port in "${tcp_ports[@]}"; do ufw allow "${port}/tcp" >/dev/null; done
    ufw reload >/dev/null
    ok "UFW 规则已更新。"
  elif command_exists firewall-cmd && firewall-cmd --state >/dev/null 2>&1; then
    info "检测到 firewalld 已启用。"
    confirm "是否自动放行邮件所需 TCP 端口？" Y || return 0
    for port in "${tcp_ports[@]}"; do firewall-cmd --permanent --add-port="${port}/tcp" >/dev/null; done
    firewall-cmd --reload >/dev/null
    ok "firewalld 规则已更新。"
  else
    warn "未检测到已启用的 UFW/firewalld。请同时检查 VPS 厂商网页防火墙。"
  fi
}

run_container() {
  install -d -m 700 "$DATA_DIR" "$BACKUP_DIR"
  docker run -d \
    --name "$CONTAINER_NAME" \
    --restart always \
    --network host \
    --hostname "$MAIL_HOSTNAME" \
    -e "TZ=$TIMEZONE" \
    -e "HTTP_PORT=$HTTP_PORT" \
    -e "HTTPS_PORT=$HTTPS_PORT" \
    -e "HTTPS=ON" \
    -e "DISABLE_CLAMAV=$DISABLE_CLAMAV" \
    -e "DISABLE_RSPAMD=$DISABLE_RSPAMD" \
    -v "$DATA_DIR:/data" \
    "$IMAGE" >/dev/null
}

wait_for_service() {
  info "等待 Poste.io 初始化……"
  local _
  for _ in {1..60}; do
    if docker inspect -f '{{.State.Running}}' "$CONTAINER_NAME" 2>/dev/null | grep -qx true && \
       ss -lntH 2>/dev/null | awk -v p=":${HTTPS_PORT}" '$4 ~ (p "$") {found=1} END {exit !found}'; then
      ok "Poste.io 已启动并监听 HTTPS/${HTTPS_PORT}。"
      return 0
    fi
    sleep 2
  done
  fail "服务在 120 秒内未就绪。"
  docker logs --tail 80 "$CONTAINER_NAME" || true
  return 1
}

admin_url() {
  if [[ "$HTTPS_PORT" == "443" ]]; then
    printf 'https://%s/admin/login' "$MAIL_HOSTNAME"
  else
    printf 'https://%s:%s/admin/login' "$MAIL_HOSTNAME" "$HTTPS_PORT"
  fi
}

webmail_url() {
  if [[ "$HTTPS_PORT" == "443" ]]; then
    printf 'https://%s/webmail/' "$MAIL_HOSTNAME"
  else
    printf 'https://%s:%s/webmail/' "$MAIL_HOSTNAME" "$HTTPS_PORT"
  fi
}

write_report() {
  local report
  report="/root/posteio-deploy-report-$(date '+%Y%m%d_%H%M%S').txt"
  {
    echo "Poste.io 部署报告"
    echo "生成时间：$(date '+%F %T %Z')"
    echo "邮件主机：$MAIL_HOSTNAME"
    echo "邮件域名：$MAIL_DOMAIN"
    echo "公网 IPv4：$PUBLIC_IPV4"
    echo "管理后台：$(admin_url)"
    echo "Webmail：$(webmail_url)"
    echo "数据目录：$DATA_DIR"
    echo "容器名称：$CONTAINER_NAME"
    echo
    echo "DNS 记录："
    echo "$MAIL_HOSTNAME.  A     $PUBLIC_IPV4"
    echo "$MAIL_DOMAIN.  MX 10  $MAIL_HOSTNAME."
    echo "$MAIL_DOMAIN.  TXT    \"v=spf1 mx ~all\""
    echo "_dmarc.$MAIL_DOMAIN. TXT \"v=DMARC1; p=none; rua=mailto:dmarc-reports@$MAIL_DOMAIN\""
    echo "autodiscover.$MAIL_DOMAIN. CNAME $MAIL_HOSTNAME."
    echo "autoconfig.$MAIL_DOMAIN. CNAME $MAIL_HOSTNAME."
    echo "PTR/rDNS：$PUBLIC_IPV4 -> $MAIL_HOSTNAME（在 VPS 厂商后台设置）"
    echo "DKIM：创建邮件域名后从 Poste.io 后台复制实际公钥。"
  } >"$report"
  chmod 600 "$report"
  ok "部署报告已保存：$report"
}

show_dns_guide() {
  load_config || { warn "尚未保存部署配置，请先安装。"; return 1; }
  header
  local dns_host=$MAIL_HOSTNAME
  if [[ "$MAIL_HOSTNAME" == *."$MAIL_DOMAIN" ]]; then
    dns_host=${MAIL_HOSTNAME:0:${#MAIL_HOSTNAME}-${#MAIL_DOMAIN}-1}
  fi
  printf '%s%sDNS 配置清单%s\n\n' "$C_BOLD" "$C_BLUE" "$C_RESET"
  cat <<EOF
请在域名 DNS 服务商添加：

1. 邮件主机 A 记录
   主机：$dns_host
   类型：A
   内容：$PUBLIC_IPV4
   代理：必须关闭，仅 DNS 解析

2. 邮件域名 MX 记录
   主机：@
   类型：MX
   优先级：10
   内容：$MAIL_HOSTNAME

3. SPF
   主机：@
   类型：TXT
   内容：v=spf1 mx ~all

4. DMARC（初期观察模式）
   主机：_dmarc
   类型：TXT
   内容：v=DMARC1; p=none; rua=mailto:dmarc-reports@$MAIL_DOMAIN

5. 自动发现（可选）
   autodiscover  CNAME  $MAIL_HOSTNAME
   autoconfig    CNAME  $MAIL_HOSTNAME

6. PTR / rDNS（必须在 VPS 厂商后台设置）
   $PUBLIC_IPV4  →  $MAIL_HOSTNAME

7. DKIM
   登录 Poste.io → Virtual domains → $MAIL_DOMAIN → DKIM，
   生成密钥后把后台显示的 TXT 记录原样添加到 DNS。

注意：Cloudflare 等 DNS 平台上的邮件主机必须设为【仅 DNS】，不能开启代理云朵。
EOF
}

dns_value() { dig +short "$2" "$1" 2>/dev/null | sed 's/\.$//' | head -n 1; }

health_check() {
  load_config || { warn "尚未保存部署配置，请先安装。"; return 1; }
  header
  printf '%s%s全项验收%s\n\n' "$C_BOLD" "$C_BLUE" "$C_RESET"

  local failed=0 a_record mx_record ptr_record
  if docker inspect -f '{{.State.Running}}' "$CONTAINER_NAME" 2>/dev/null | grep -qx true; then
    ok "容器 ${CONTAINER_NAME} 正在运行。"
  else
    fail "容器 ${CONTAINER_NAME} 未运行。"
    failed=1
  fi

  local port
  for port in 25 80 465 587 993 995 "$HTTPS_PORT"; do
    if ss -lntH 2>/dev/null | awk -v p=":${port}" '$4 ~ (p "$") {found=1} END {exit !found}'; then
      ok "本机 TCP/${port} 正在监听。"
    else
      fail "本机 TCP/${port} 未监听。"
      failed=1
    fi
  done

  a_record=$(dns_value A "$MAIL_HOSTNAME")
  if [[ "$a_record" == "$PUBLIC_IPV4" ]]; then
    ok "A 记录正确：$MAIL_HOSTNAME → $PUBLIC_IPV4"
  else
    warn "A 记录未匹配。当前：${a_record:-无结果}，预期：$PUBLIC_IPV4"
    failed=1
  fi

  mx_record=$(dig +short MX "$MAIL_DOMAIN" 2>/dev/null | awk 'NR==1 {print $2}' | sed 's/\.$//')
  if [[ "$mx_record" == "$MAIL_HOSTNAME" ]]; then
    ok "MX 记录正确：$MAIL_DOMAIN → $MAIL_HOSTNAME"
  else
    warn "MX 记录未匹配。当前：${mx_record:-无结果}"
    failed=1
  fi

  ptr_record=$(dig +short -x "$PUBLIC_IPV4" 2>/dev/null | sed 's/\.$//' | head -n 1)
  if [[ "$ptr_record" == "$MAIL_HOSTNAME" ]]; then
    ok "PTR/rDNS 正确：$PUBLIC_IPV4 → $MAIL_HOSTNAME"
  else
    warn "PTR/rDNS 未匹配。当前：${ptr_record:-无结果}"
    failed=1
  fi

  check_outbound_25 || failed=1

  if curl -kfsS --max-time 10 \
      --resolve "${MAIL_HOSTNAME}:${HTTPS_PORT}:127.0.0.1" \
      "$(admin_url)" >/dev/null 2>&1; then
    ok "管理页面可以从本机访问。"
  else
    warn "管理页面本机访问失败，请检查容器日志与证书初始化状态。"
    failed=1
  fi

  printf '\n'
  if (( failed == 0 )); then
    ok "核心验收通过。请继续在后台检查 SPF、DKIM、DMARC 诊断。"
  else
    warn "存在未通过项目。脚本未自动篡改 DNS 或 PTR，请按提示处理。"
  fi
}

show_admin_guide() {
  load_config || { warn "尚未保存部署配置，请先安装。"; return 1; }
  header
  printf '%s%s首次建局与创建信箱%s\n\n' "$C_BOLD" "$C_BLUE" "$C_RESET"
  cat <<EOF
管理后台：$(admin_url)

首次打开时：
  1. 创建系统管理员，建议使用 admin@$MAIL_HOSTNAME。
  2. 管理员密码请使用密码管理器生成并保存，脚本不会读取或记录密码。
  3. 登录后进入 Virtual domains，添加邮件域名：$MAIL_DOMAIN。
  4. 在该域名下创建第一个邮箱，例如 user@$MAIL_DOMAIN。
  5. 建议单邮箱配额：5GB；小容量 VPS 不建议设置 unlimited。
  6. 创建 DKIM 密钥，并将后台给出的 TXT 记录添加到 DNS。
  7. Server status → DNS diagnostics，逐项确认 A/MX/PTR/SPF/DKIM/DMARC。

若 HTTPS 使用非标准端口，后台跳转偶尔可能漏掉端口；
请把地址栏改回 $(admin_url) 或从 Webmail 的 Administration 入口进入。
EOF
}

show_client_settings() {
  load_config || { warn "尚未保存部署配置，请先安装。"; return 1; }
  header
  printf '%s%sOutlook / 手机邮件客户端参数%s\n\n' "$C_BOLD" "$C_BLUE" "$C_RESET"
  cat <<EOF
用户名：完整邮箱地址，例如 user@$MAIL_DOMAIN
密码：该邮箱自己的密码，不是系统管理员密码

收件服务器（推荐 IMAP）：
  主机：$MAIL_HOSTNAME
  端口：993
  加密：SSL/TLS
  身份验证：普通密码

发件服务器（推荐）：
  主机：$MAIL_HOSTNAME
  端口：587
  加密：STARTTLS
  需要身份验证：是
  用户名：完整邮箱地址

发件备用：
  端口：465
  加密：SSL/TLS

Webmail：$(webmail_url)
EOF
}

backup_data() {
  load_config || { warn "尚未保存部署配置，请先安装。"; return 1; }
  header
  warn "一致性备份会短暂停止邮件容器，完成后自动恢复。"
  confirm "现在执行备份？" N || return 0

  install -d -m 700 "$BACKUP_DIR"
  local stamp archive was_running=0
  stamp=$(date '+%Y%m%d_%H%M%S')
  archive="${BACKUP_DIR}/posteio-data-${stamp}.tar.gz"

  if docker inspect -f '{{.State.Running}}' "$CONTAINER_NAME" 2>/dev/null | grep -qx true; then
    was_running=1
    docker stop "$CONTAINER_NAME" >/dev/null
  fi

  local backup_status
  set +e
  tar -C "$(dirname "$DATA_DIR")" -czf "$archive" "$(basename "$DATA_DIR")"
  backup_status=$?
  set -e
  if (( was_running == 1 )); then
    docker start "$CONTAINER_NAME" >/dev/null
  fi
  if (( backup_status != 0 )); then
    fail "备份失败，邮件容器已恢复运行。"
    return "$backup_status"
  fi
  chmod 600 "$archive"
  ok "备份完成：$archive"
  ok "SHA256：$(sha256sum "$archive" | awk '{print $1}')"
}

recreate_container() {
  docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true
  run_container
  wait_for_service
}

update_posteio() {
  load_config || { warn "尚未保存部署配置，请先安装。"; return 1; }
  header
  warn "更新前请先完成一致性备份。"
  confirm "确认已备份并拉取最新 Poste.io 镜像？" N || return 0
  docker pull "$IMAGE"
  recreate_container
  ok "Poste.io 已更新，原数据目录保持不变：$DATA_DIR"
}

remove_container() {
  load_config || { warn "尚未保存部署配置。"; return 1; }
  header
  warn "此操作只删除 Docker 容器，不删除邮件、数据库和备份。"
  confirm "确认删除容器 ${CONTAINER_NAME}？" N || return 0
  docker rm -f "$CONTAINER_NAME" >/dev/null
  ok "容器已删除。数据仍保留在：$DATA_DIR"
  info "需要恢复时重新运行安装并填写相同数据目录。"
}

show_logs() {
  load_config || { warn "尚未保存部署配置。"; return 1; }
  docker logs --tail 150 "$CONTAINER_NAME"
}

install_mailserver() {
  header
  require_root
  if [[ -f "$CONFIG_FILE" ]] && load_config && docker inspect "$CONTAINER_NAME" >/dev/null 2>&1; then
    warn "检测到现有容器 ${CONTAINER_NAME}，为保护邮件数据，安装流程已停止。"
    info "请从面板选择验收、备份、更新或查看日志。"
    return 0
  fi

  install_packages
  collect_config
  preflight_ports
  check_outbound_25 || confirm "25 端口尚未通过，仍继续部署？" N || return 0
  configure_firewall
  install_docker
  save_config
  docker pull "$IMAGE"
  run_container
  wait_for_service
  write_report

  printf '\n'
  ok "Poste.io 部署完成。"
  printf '管理后台：%s%s%s\n' "$C_BOLD" "$(admin_url)" "$C_RESET"
  printf 'Webmail ：%s%s%s\n' "$C_BOLD" "$(webmail_url)" "$C_RESET"
  printf '\n接下来按顺序完成：DNS → 首次管理员 → 邮件域名 → DKIM → 创建邮箱 → 验收。\n'
}

menu() {
  require_root
  while true; do
    header
    if load_config; then
      printf '  当前主机：%s%s%s  ｜  容器：%s\n\n' "$C_BOLD" "$MAIL_HOSTNAME" "$C_RESET" "$CONTAINER_NAME"
    else
      printf '  当前状态：%s尚未部署%s\n\n' "$C_YELLOW" "$C_RESET"
    fi
    cat <<'EOF'
  [1] 一键预检并安装 Poste.io
  [2] 显示 DNS / PTR / SPF / DMARC 配置
  [3] 首次管理员与创建信箱引导
  [4] 邮局全项验收
  [5] Outlook / 手机客户端参数
  [6] 一致性备份邮件数据
  [7] 更新 Poste.io 镜像
  [8] 查看最近容器日志
  [9] 删除容器（保留全部数据）
  [0] 退出
EOF
    printf '\n'
    read -r -p "请选择 [0-9]：" choice
    case "$choice" in
      1) install_mailserver || true; pause ;;
      2) show_dns_guide || true; pause ;;
      3) show_admin_guide || true; pause ;;
      4) health_check || true; pause ;;
      5) show_client_settings || true; pause ;;
      6) backup_data || true; pause ;;
      7) update_posteio || true; pause ;;
      8) show_logs || true; pause ;;
      9) remove_container || true; pause ;;
      0) exit 0 ;;
      *) warn "无效选项。"; sleep 1 ;;
    esac
  done
}

usage() {
  cat <<EOF
Poste.io 邮局全自动互动引导面板 v${VERSION}

用法：
  sudo bash posteio-wizard.sh              打开互动面板
  sudo bash posteio-wizard.sh --install    开始互动安装
  sudo bash posteio-wizard.sh --check      执行全项验收
  sudo bash posteio-wizard.sh --dns        显示 DNS 配置
  sudo bash posteio-wizard.sh --client     显示客户端参数
  sudo bash posteio-wizard.sh --backup     备份邮件数据
  sudo bash posteio-wizard.sh --update     更新 Poste.io
  sudo bash posteio-wizard.sh --logs       查看日志
  bash posteio-wizard.sh --version         显示版本

支持：Debian / Ubuntu / Rocky Linux / AlmaLinux
项目无遥测，不上传域名、IP、账号或密码。
EOF
}

if [[ "${BASH_SOURCE[0]}" != "$0" ]]; then
  return 0
fi

case "${1:-}" in
  "") menu ;;
  --install) require_root; install_mailserver ;;
  --check) require_root; health_check ;;
  --dns) require_root; show_dns_guide ;;
  --client) require_root; show_client_settings ;;
  --backup) require_root; backup_data ;;
  --update) require_root; update_posteio ;;
  --logs) require_root; show_logs ;;
  --version) printf '%s\n' "$VERSION" ;;
  -h|--help) usage ;;
  *) fail "未知参数：$1"; usage; exit 2 ;;
esac
