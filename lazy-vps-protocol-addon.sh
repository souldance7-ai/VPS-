#!/usr/bin/env bash
# ==============================================================================
# LazyVPS Quick Menu Pack - Protocol Addon
# Version: v1.3.3 · TUIC + AnyTLS Builder · Main Menu Integrated
# Update Date: 2026-07-04
# ==============================================================================
# Design principles:
# - No built-in personal IP / private domain / password / subscription URL.
# - Keep the original lazy-vps-menu.sh v1.2.15 intact; this file is a safe addon.
# - Generate server config, client import YAML/JSON, firewall hints, and backup files.
# - TUIC and AnyTLS are built with sing-box, then exported for mihomo/FLClash.
# ==============================================================================
set -Eeuo pipefail

APP="懒人建 VPS 快速菜单包"
VER="v1.3.3 · TUIC + AnyTLS 协议扩展版 · 主菜单修正版"
UPDATE_DATE="2026-07-04"
ROOT="/opt/lazy-vps-menu"
OUT="$ROOT/outputs"
BAK="$ROOT/backups"
HTTP_DIR="$ROOT/http-download"
LOG="$ROOT/lazy-vps-protocol-addon.log"
SBOX_DIR="/etc/sing-box"
SBOX_CONF="$SBOX_DIR/config.json"
CERT_DIR="$SBOX_DIR/certs"
HTTP_PORT="8088"
HTTP_PID="/tmp/lazy-vps-http.pid"

mkdir -p "$ROOT" "$OUT" "$BAK" "$HTTP_DIR" "$CERT_DIR" 2>/dev/null || true
touch "$LOG" 2>/dev/null || true

R=$'\033[0m'; B=$'\033[1m'; DIM=$'\033[2m'
RED=$'\033[31m'; GRN=$'\033[32m'; YLW=$'\033[33m'; BLU=$'\033[34m'; MAG=$'\033[35m'; CYN=$'\033[36m'; WHT=$'\033[37m'

ok(){ printf "${GRN}[完成]${R} %s\n" "$1"; }
info(){ printf "${GRN}[信息]${R} %s\n" "$1"; }
warn(){ printf "${YLW}[警告]${R} %s\n" "$1"; }
err(){ printf "${RED}[错误]${R} %s\n" "$1"; }
note(){ printf "${BLU}[说明]${R} %s\n" "$1"; }
step(){ printf "\n${CYN}==> %s${R}\n" "$1"; }
log(){ echo "[$(date '+%F %T')] $1" >> "$LOG" 2>/dev/null || true; }
pause(){ echo; read -rp "按 Enter 返回菜单..." _ || true; }

need_root(){ [[ "${EUID:-$(id -u)}" -eq 0 ]] || { err "请先使用 root 执行：sudo -i"; exit 1; }; }
has(){ command -v "$1" >/dev/null 2>&1; }
ts(){ date '+%Y%m%d_%H%M%S'; }
valid_port(){ [[ "${1:-}" =~ ^[0-9]+$ ]] && (( "$1" >= 1 && "$1" <= 65535 )); }
rand_pass(){ openssl rand -hex 16; }
rand_node_suffix(){ openssl rand -hex 2 2>/dev/null || date +%H%M; }

ask(){
  local prompt="$1" default="$2" value
  printf "${YLW}%s${R} [默认: %s]: " "$prompt" "$default" >&2
  read -r value || true
  echo "${value:-$default}"
}

ask_required(){
  local prompt="$1" value
  while true; do
    printf "${YLW}%s${R}: " "$prompt" >&2
    read -r value || true
    [[ -n "$value" ]] && { echo "$value"; return 0; }
    err "此项不能为空。"
  done
}

is_private_ip(){
  local ip="$1" a b
  [[ "$ip" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]] || return 1
  IFS='.' read -r a b _ <<< "$ip"
  (( a == 10 )) && return 0
  (( a == 172 && b >= 16 && b <= 31 )) && return 0
  (( a == 192 && b == 168 )) && return 0
  (( a == 100 && b >= 64 && b <= 127 )) && return 0
  (( a == 127 )) && return 0
  return 1
}

ip4(){
  local ip url
  for url in "https://api.ipify.org" "https://ifconfig.me" "https://icanhazip.com"; do
    ip="$(curl -4 -s --max-time 6 "$url" 2>/dev/null | tr -d ' \r\n' || true)"
    if [[ -n "$ip" && "$ip" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]] && ! is_private_ip "$ip"; then
      echo "$ip"; return 0
    fi
  done
  ip="$(ip route get 1.1.1.1 2>/dev/null | grep -oP 'src \K[0-9.]+' | head -1 || true)"
  echo "$ip"
}

uuid_gen(){
  if has sing-box; then
    sing-box generate uuid 2>/dev/null | head -1 && return 0
  fi
  if has uuidgen; then uuidgen && return 0; fi
  if [[ -r /proc/sys/kernel/random/uuid ]]; then cat /proc/sys/kernel/random/uuid && return 0; fi
  python3 - <<'PY' 2>/dev/null || true
import uuid
print(uuid.uuid4())
PY
}

sbox_bin(){
  if has sing-box; then command -v sing-box; return 0; fi
  for p in /usr/local/bin/sing-box /usr/bin/sing-box /bin/sing-box; do
    [[ -x "$p" ]] && { echo "$p"; return 0; }
  done
  return 1
}

install_base(){
  step "安装基础依赖 / Base Packages"
  if has apt-get; then
    apt-get update -y || true
    DEBIAN_FRONTEND=noninteractive apt-get install -y curl wget openssl ca-certificates jq uuid-runtime iproute2 >/dev/null 2>&1 || true
  elif has dnf; then
    dnf install -y curl wget openssl ca-certificates jq util-linux iproute >/dev/null 2>&1 || true
  elif has yum; then
    yum install -y curl wget openssl ca-certificates jq util-linux iproute >/dev/null 2>&1 || true
  else
    warn "未识别包管理器，请手动确认 curl / openssl / jq 已安装。"
  fi
}

ensure_sing_box(){
  step "安装 / 检查 sing-box"
  install_base
  if sbox_bin >/dev/null 2>&1; then
    info "当前 sing-box：$($(sbox_bin) version | head -1)"
  else
    note "未检测到 sing-box，使用官方安装脚本安装最新版。"
    curl -fsSL https://sing-box.app/install.sh | sh
  fi
  local bin
  bin="$(sbox_bin || true)"
  [[ -n "$bin" ]] || { err "sing-box 安装失败，请检查服务器是否能访问 GitHub / sing-box.app。"; return 1; }
  info "sing-box 路径：$bin"
  mkdir -p "$SBOX_DIR" "$CERT_DIR"

  if [[ ! -f /etc/systemd/system/sing-box.service && ! -f /lib/systemd/system/sing-box.service && ! -f /usr/lib/systemd/system/sing-box.service ]]; then
    cat > /etc/systemd/system/sing-box.service <<EOF2
[Unit]
Description=sing-box service
After=network-online.target
Wants=network-online.target

[Service]
ExecStart=$bin run -c $SBOX_CONF
Restart=on-failure
RestartSec=3s
LimitNOFILE=1048576

[Install]
WantedBy=multi-user.target
EOF2
  fi
  systemctl daemon-reload >/dev/null 2>&1 || true
}

backup_singbox(){
  mkdir -p "$BAK"
  if [[ -f "$SBOX_CONF" ]]; then
    cp -a "$SBOX_CONF" "$BAK/sing-box-config.$(ts).json"
    ok "已备份当前 sing-box 配置到：$BAK"
  fi
}

backup_outputs(){
  mkdir -p "$BAK"
  local d="$BAK/outputs.$(ts)"
  local files=("$OUT"/*.yaml "$OUT"/*.json "$OUT"/*.conf "$OUT"/*.txt)
  local found=0
  for f in "${files[@]}"; do
    [[ -e "$f" ]] || continue
    mkdir -p "$d"
    cp -a "$f" "$d"/ 2>/dev/null || true
    found=1
  done
  [[ "$found" == "1" ]] && ok "旧输出已备份：$d" || true
}

fix_cert_perm(){
  chmod 755 "$CERT_DIR" 2>/dev/null || true
  chmod 644 "$CERT_DIR"/*.crt 2>/dev/null || true
  chmod 640 "$CERT_DIR"/*.key 2>/dev/null || true
  if getent group sing-box >/dev/null 2>&1; then
    chgrp -R sing-box "$CERT_DIR" 2>/dev/null || true
  elif getent group nogroup >/dev/null 2>&1; then
    chgrp -R nogroup "$CERT_DIR" 2>/dev/null || true
  fi
}

make_cert(){
  local name="$1" sni="$2" crt="$CERT_DIR/${name}.crt" key="$CERT_DIR/${name}.key"
  step "生成 TLS 自签证书 / Self-signed TLS Cert" >&2
  if [[ -s "$crt" && -s "$key" ]]; then
    info "证书已存在：$crt" >&2
  else
    openssl ecparam -name prime256v1 -genkey -noout -out "$key"
    openssl req -new -x509 -sha256 -days 3650 -key "$key" -out "$crt" \
      -subj "/CN=$sni" -addext "subjectAltName=DNS:$sni" >/dev/null 2>&1 || {
      warn "OpenSSL 不支持 -addext，改用基础 CN 自签证书。" >&2
      openssl req -new -x509 -sha256 -days 3650 -key "$key" -out "$crt" -subj "/CN=$sni" >/dev/null 2>&1
    }
  fi
  fix_cert_perm
  echo "$crt|$key"
}

fw_open_port(){
  local port="$1" proto="$2"
  valid_port "$port" || { warn "端口无效，跳过防火墙：$port"; return 1; }
  proto="${proto:-tcp}"
  step "放行端口 / Firewall Open ${port}/${proto}"
  if has ufw && ufw status 2>/dev/null | grep -qw active; then
    ufw allow "${port}/${proto}" >/dev/null 2>&1 || true
    ok "UFW 已放行 ${port}/${proto}"
  elif has firewall-cmd && systemctl is-active --quiet firewalld 2>/dev/null; then
    firewall-cmd --permanent --add-port="${port}/${proto}" >/dev/null 2>&1 || true
    firewall-cmd --reload >/dev/null 2>&1 || true
    ok "firewalld 已放行 ${port}/${proto}"
  elif has iptables; then
    iptables -C INPUT -p "$proto" --dport "$port" -j ACCEPT 2>/dev/null || iptables -I INPUT -p "$proto" --dport "$port" -j ACCEPT 2>/dev/null || true
    if has ip6tables; then
      ip6tables -C INPUT -p "$proto" --dport "$port" -j ACCEPT 2>/dev/null || ip6tables -I INPUT -p "$proto" --dport "$port" -j ACCEPT 2>/dev/null || true
    fi
    ok "iptables 已尝试放行 ${port}/${proto}"
  else
    warn "未识别防火墙工具，请手动确认云厂商安全组与系统防火墙已放行 ${port}/${proto}。"
  fi
  echo "${proto}|${port}" >> "$ROOT/firewall_open_ports.list" 2>/dev/null || true
}

write_common_mihomo_header(){
  local file="$1"
  cat > "$file" <<EOF2
# $APP $VER | Update: $UPDATE_DATE
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
EOF2
}

append_mihomo_footer(){
  local file="$1" node="$2"
  cat >> "$file" <<EOF2

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
  - MATCH,PROXY
EOF2
}

write_readme_latest(){
  local proto="$1" node="$2" server="$3" port="$4" extra="$5"
  cat > "$OUT/00_README_IMPORT.txt" <<EOF2
LazyVPS Protocol Addon $VER
生成时间：$(date '+%F %T')

协议：$proto
节点名：$node
服务器：$server
端口：$port
$extra

输出文件：
- 01_IMPORT_FLCLASH.yaml：FLClash / mihomo 完整单节点配置
- 02_IMPORT_SINGBOX_CLIENT.json：sing-box 客户端测试配置
- latest_*.yaml/json：最近一次生成的协议片段

注意：
1. 自签证书场景，客户端配置默认 skip-cert-verify / insecure = true。
2. 云厂商安全组仍需手动确认放行端口。
3. TUIC 走 UDP/QUIC，必须确认 UDP 端口放行。
4. AnyTLS 走 TCP/TLS，适合与 Trojan/AnyTLS 稳定线做对比测试。
EOF2
}

restart_singbox(){
  step "检查并启动 sing-box"
  local bin
  bin="$(sbox_bin)"
  "$bin" check -c "$SBOX_CONF"
  systemctl enable sing-box >/dev/null 2>&1 || true
  systemctl restart sing-box
  sleep 1
  systemctl --no-pager --full status sing-box | sed -n '1,18p' || true
  ok "sing-box 已启动 / 重启。"
}

deploy_anytls(){
  need_root
  section_anytls
  ensure_sing_box || return 1
  backup_singbox
  backup_outputs

  local ip server node port sni pass cert_pair crt key
  ip="$(ip4)"
  server="$(ask '客户端连接地址：建议填公网 IP 或域名' "${ip:-your.domain.com}")"
  node="$(ask '节点名称' "🇹🇼 LazyVPS-AnyTLS-$(rand_node_suffix)")"
  port="$(ask 'AnyTLS TCP 端口' '8443')"
  sni="$(ask 'TLS SNI / 证书 CN' 'www.cloudflare.com')"
  pass="$(ask 'AnyTLS 密码' "AT_$(rand_pass)")"
  valid_port "$port" || { err "端口无效：$port"; return 1; }

  cert_pair="$(make_cert anytls "$sni")"
  crt="${cert_pair%%|*}"; key="${cert_pair##*|}"

  step "写入 sing-box AnyTLS 服务端配置"
  cat > "$SBOX_CONF" <<EOF2
{
  "log": {
    "level": "info",
    "timestamp": true
  },
  "inbounds": [
    {
      "type": "anytls",
      "tag": "anytls-in",
      "listen": "0.0.0.0",
      "listen_port": $port,
      "users": [
        {
          "name": "lazyvps",
          "password": "$pass"
        }
      ],
      "padding_scheme": [
        "stop=8",
        "0=30-30",
        "1=100-400",
        "2=400-500,c,500-1000,c,500-1000,c,500-1000,c,500-1000",
        "3=9-9,500-1000",
        "4=500-1000",
        "5=500-1000",
        "6=500-1000",
        "7=500-1000"
      ],
      "tls": {
        "enabled": true,
        "server_name": "$sni",
        "alpn": ["h2", "http/1.1"],
        "certificate_path": "$crt",
        "key_path": "$key"
      }
    }
  ],
  "outbounds": [
    { "type": "direct", "tag": "direct" },
    { "type": "block", "tag": "block" }
  ]
}
EOF2

  restart_singbox
  fw_open_port "$port" tcp

  step "导出 AnyTLS 客户端配置"
  local mf="$OUT/01_IMPORT_FLCLASH.yaml"
  write_common_mihomo_header "$mf"
  cat >> "$mf" <<EOF2
  - name: "$node"
    type: anytls
    server: $server
    port: $port
    password: "$pass"
    client-fingerprint: chrome
    udp: true
    idle-session-check-interval: 30
    idle-session-timeout: 30
    min-idle-session: 0
    sni: "$sni"
    alpn:
      - h2
      - http/1.1
    skip-cert-verify: true
EOF2
  append_mihomo_footer "$mf" "$node"
  cp -a "$mf" "$OUT/latest_anytls_mihomo.yaml"

  cat > "$OUT/02_IMPORT_SINGBOX_CLIENT.json" <<EOF2
{
  "log": { "level": "info", "timestamp": true },
  "inbounds": [
    {
      "type": "mixed",
      "tag": "mixed-in",
      "listen": "127.0.0.1",
      "listen_port": 2080
    }
  ],
  "outbounds": [
    {
      "type": "anytls",
      "tag": "proxy",
      "server": "$server",
      "server_port": $port,
      "password": "$pass",
      "tls": {
        "enabled": true,
        "server_name": "$sni",
        "insecure": true,
        "alpn": ["h2", "http/1.1"],
        "utls": { "enabled": true, "fingerprint": "chrome" }
      }
    },
    { "type": "direct", "tag": "direct" }
  ],
  "route": { "final": "proxy" }
}
EOF2
  cp -a "$OUT/02_IMPORT_SINGBOX_CLIENT.json" "$OUT/latest_anytls_singbox_client.json"
  write_readme_latest "AnyTLS" "$node" "$server" "$port" "SNI：$sni"
  ok "AnyTLS 已部署完成。配置输出目录：$OUT"
}

deploy_tuic(){
  need_root
  section_tuic
  ensure_sing_box || return 1
  backup_singbox
  backup_outputs

  local ip server node port sni uuid pass cc cert_pair crt key
  ip="$(ip4)"
  server="$(ask '客户端连接地址：建议填公网 IP 或域名' "${ip:-your.domain.com}")"
  node="$(ask '节点名称' "🇹🇼 LazyVPS-TUIC-$(rand_node_suffix)")"
  port="$(ask 'TUIC UDP 端口' '10443')"
  sni="$(ask 'TLS SNI / 证书 CN' 'www.cloudflare.com')"
  uuid="$(ask 'TUIC UUID' "$(uuid_gen)")"
  pass="$(ask 'TUIC 密码' "TUIC_$(rand_pass)")"
  cc="$(ask '拥塞控制 cubic/new_reno/bbr' 'bbr')"
  case "$cc" in cubic|new_reno|bbr) ;; *) warn "拥塞控制无效，改为 bbr"; cc="bbr" ;; esac
  valid_port "$port" || { err "端口无效：$port"; return 1; }

  cert_pair="$(make_cert tuic "$sni")"
  crt="${cert_pair%%|*}"; key="${cert_pair##*|}"

  step "写入 sing-box TUIC v5 服务端配置"
  cat > "$SBOX_CONF" <<EOF2
{
  "log": {
    "level": "info",
    "timestamp": true
  },
  "inbounds": [
    {
      "type": "tuic",
      "tag": "tuic-in",
      "listen": "0.0.0.0",
      "listen_port": $port,
      "users": [
        {
          "name": "lazyvps",
          "uuid": "$uuid",
          "password": "$pass"
        }
      ],
      "congestion_control": "$cc",
      "auth_timeout": "3s",
      "zero_rtt_handshake": false,
      "heartbeat": "10s",
      "tls": {
        "enabled": true,
        "server_name": "$sni",
        "alpn": ["h3"],
        "certificate_path": "$crt",
        "key_path": "$key"
      }
    }
  ],
  "outbounds": [
    { "type": "direct", "tag": "direct" },
    { "type": "block", "tag": "block" }
  ]
}
EOF2

  restart_singbox
  fw_open_port "$port" udp

  step "导出 TUIC v5 客户端配置"
  local mf="$OUT/01_IMPORT_FLCLASH.yaml"
  write_common_mihomo_header "$mf"
  cat >> "$mf" <<EOF2
  - name: "$node"
    type: tuic
    server: $server
    port: $port
    uuid: $uuid
    password: "$pass"
    alpn:
      - h3
    sni: "$sni"
    skip-cert-verify: true
    disable-sni: false
    reduce-rtt: false
    request-timeout: 8000
    udp-relay-mode: native
    congestion-controller: $cc
EOF2
  append_mihomo_footer "$mf" "$node"
  cp -a "$mf" "$OUT/latest_tuic_mihomo.yaml"

  cat > "$OUT/02_IMPORT_SINGBOX_CLIENT.json" <<EOF2
{
  "log": { "level": "info", "timestamp": true },
  "inbounds": [
    {
      "type": "mixed",
      "tag": "mixed-in",
      "listen": "127.0.0.1",
      "listen_port": 2080
    }
  ],
  "outbounds": [
    {
      "type": "tuic",
      "tag": "proxy",
      "server": "$server",
      "server_port": $port,
      "uuid": "$uuid",
      "password": "$pass",
      "congestion_control": "$cc",
      "udp_relay_mode": "native",
      "zero_rtt_handshake": false,
      "heartbeat": "10s",
      "tls": {
        "enabled": true,
        "server_name": "$sni",
        "insecure": true,
        "alpn": ["h3"],
        "utls": { "enabled": true, "fingerprint": "chrome" }
      }
    },
    { "type": "direct", "tag": "direct" }
  ],
  "route": { "final": "proxy" }
}
EOF2
  cp -a "$OUT/02_IMPORT_SINGBOX_CLIENT.json" "$OUT/latest_tuic_singbox_client.json"
  write_readme_latest "TUIC v5" "$node" "$server" "$port" "SNI：$sni\nUUID：$uuid\n拥塞控制：$cc\nUDP 放行：必须确认云安全组 + 系统防火墙都放行 ${port}/udp"
  ok "TUIC v5 已部署完成。配置输出目录：$OUT"
}

deploy_anytls_tuic(){
  need_root
  section "部署 AnyTLS + TUIC v5 / 双协议同机部署"
  note "同一台 VPS 同时开启 AnyTLS TCP/TLS 与 TUIC UDP/QUIC。"
  note "会重写 sing-box 配置，但不会动 Xray/Trojan/VLESS/Hysteria2 配置。"
  ensure_sing_box || return 1
  backup_singbox
  backup_outputs

  local ip server prefix any_node tuic_node any_port tuic_port sni any_pass tuic_uuid tuic_pass cc cert_pair crt key
  ip="$(ip4)"
  server="$(ask '客户端连接地址：建议填公网 IP 或域名' "${ip:-your.domain.com}")"
  prefix="$(ask '节点前缀' '🇹🇼 LazyVPS')"
  any_node="${prefix}-AnyTLS"
  tuic_node="${prefix}-TUIC"
  any_port="$(ask 'AnyTLS TCP 端口' '8443')"
  tuic_port="$(ask 'TUIC UDP 端口' '10443')"
  sni="$(ask 'TLS SNI / 证书 CN' 'www.cloudflare.com')"
  any_pass="$(ask 'AnyTLS 密码' "AT_$(rand_pass)")"
  tuic_uuid="$(ask 'TUIC UUID' "$(uuid_gen)")"
  tuic_pass="$(ask 'TUIC 密码' "TUIC_$(rand_pass)")"
  cc="$(ask 'TUIC 拥塞控制 cubic/new_reno/bbr' 'bbr')"
  case "$cc" in cubic|new_reno|bbr) ;; *) warn "拥塞控制无效，改为 bbr"; cc="bbr" ;; esac
  valid_port "$any_port" || { err "AnyTLS 端口无效：$any_port"; return 1; }
  valid_port "$tuic_port" || { err "TUIC 端口无效：$tuic_port"; return 1; }

  cert_pair="$(make_cert lazyvps_multi "$sni")"
  crt="${cert_pair%%|*}"; key="${cert_pair##*|}"

  step "写入 sing-box AnyTLS + TUIC 服务端配置"
  cat > "$SBOX_CONF" <<EOF2
{
  "log": {
    "level": "info",
    "timestamp": true
  },
  "inbounds": [
    {
      "type": "anytls",
      "tag": "anytls-in",
      "listen": "0.0.0.0",
      "listen_port": $any_port,
      "users": [
        {
          "name": "lazyvps-anytls",
          "password": "$any_pass"
        }
      ],
      "padding_scheme": [
        "stop=8",
        "0=30-30",
        "1=100-400",
        "2=400-500,c,500-1000,c,500-1000,c,500-1000,c,500-1000",
        "3=9-9,500-1000",
        "4=500-1000",
        "5=500-1000",
        "6=500-1000",
        "7=500-1000"
      ],
      "tls": {
        "enabled": true,
        "server_name": "$sni",
        "alpn": ["h2", "http/1.1"],
        "certificate_path": "$crt",
        "key_path": "$key"
      }
    },
    {
      "type": "tuic",
      "tag": "tuic-in",
      "listen": "0.0.0.0",
      "listen_port": $tuic_port,
      "users": [
        {
          "name": "lazyvps-tuic",
          "uuid": "$tuic_uuid",
          "password": "$tuic_pass"
        }
      ],
      "congestion_control": "$cc",
      "auth_timeout": "3s",
      "zero_rtt_handshake": false,
      "heartbeat": "10s",
      "tls": {
        "enabled": true,
        "server_name": "$sni",
        "alpn": ["h3"],
        "certificate_path": "$crt",
        "key_path": "$key"
      }
    }
  ],
  "outbounds": [
    { "type": "direct", "tag": "direct" },
    { "type": "block", "tag": "block" }
  ]
}
EOF2

  restart_singbox
  fw_open_port "$any_port" tcp
  fw_open_port "$tuic_port" udp

  step "导出双协议 FLClash / mihomo 配置"
  local mf="$OUT/01_IMPORT_FLCLASH.yaml"
  write_common_mihomo_header "$mf"
  cat >> "$mf" <<EOF2
  - name: "$any_node"
    type: anytls
    server: $server
    port: $any_port
    password: "$any_pass"
    client-fingerprint: chrome
    udp: true
    idle-session-check-interval: 30
    idle-session-timeout: 30
    min-idle-session: 0
    sni: "$sni"
    alpn:
      - h2
      - http/1.1
    skip-cert-verify: true
  - name: "$tuic_node"
    type: tuic
    server: $server
    port: $tuic_port
    uuid: $tuic_uuid
    password: "$tuic_pass"
    alpn:
      - h3
    sni: "$sni"
    skip-cert-verify: true
    disable-sni: false
    reduce-rtt: false
    request-timeout: 8000
    udp-relay-mode: native
    congestion-controller: $cc

proxy-groups:
  - name: GLOBAL
    type: select
    proxies:
      - "$any_node"
      - "$tuic_node"
      - DIRECT
  - name: PROXY
    type: select
    proxies:
      - "$any_node"
      - "$tuic_node"
      - DIRECT

rules:
  - MATCH,PROXY
EOF2
  cp -a "$mf" "$OUT/latest_anytls_tuic_mihomo.yaml"

  cat > "$OUT/02_IMPORT_SINGBOX_CLIENT.json" <<EOF2
{
  "log": { "level": "info", "timestamp": true },
  "inbounds": [
    {
      "type": "mixed",
      "tag": "mixed-in",
      "listen": "127.0.0.1",
      "listen_port": 2080
    }
  ],
  "outbounds": [
    {
      "type": "selector",
      "tag": "proxy",
      "outbounds": ["anytls", "tuic", "direct"],
      "default": "anytls"
    },
    {
      "type": "anytls",
      "tag": "anytls",
      "server": "$server",
      "server_port": $any_port,
      "password": "$any_pass",
      "tls": {
        "enabled": true,
        "server_name": "$sni",
        "insecure": true,
        "alpn": ["h2", "http/1.1"],
        "utls": { "enabled": true, "fingerprint": "chrome" }
      }
    },
    {
      "type": "tuic",
      "tag": "tuic",
      "server": "$server",
      "server_port": $tuic_port,
      "uuid": "$tuic_uuid",
      "password": "$tuic_pass",
      "congestion_control": "$cc",
      "udp_relay_mode": "native",
      "zero_rtt_handshake": false,
      "heartbeat": "10s",
      "tls": {
        "enabled": true,
        "server_name": "$sni",
        "insecure": true,
        "alpn": ["h3"],
        "utls": { "enabled": true, "fingerprint": "chrome" }
      }
    },
    { "type": "direct", "tag": "direct" }
  ],
  "route": { "final": "proxy" }
}
EOF2
  cp -a "$OUT/02_IMPORT_SINGBOX_CLIENT.json" "$OUT/latest_anytls_tuic_singbox_client.json"

  write_readme_latest "AnyTLS + TUIC v5" "$prefix" "$server" "$any_port / $tuic_port" "SNI：$sni\nAnyTLS：${any_port}/tcp\nTUIC：${tuic_port}/udp\nTUIC UUID：$tuic_uuid\n拥塞控制：$cc"
  ok "AnyTLS + TUIC 双协议已部署完成。配置输出目录：$OUT"
}

start_http(){
  need_root
  mkdir -p "$HTTP_DIR"
  cp -a "$OUT"/* "$HTTP_DIR"/ 2>/dev/null || true
  local ip pid
  ip="$(ip4)"
  if [[ -f "$HTTP_PID" ]]; then
    pid="$(cat "$HTTP_PID" 2>/dev/null || true)"
    [[ -n "$pid" ]] && kill "$pid" >/dev/null 2>&1 || true
  fi
  step "启动临时 HTTP 下载服务"
  (cd "$HTTP_DIR" && python3 -m http.server "$HTTP_PORT" --bind 0.0.0.0 >/tmp/lazy-vps-http.log 2>&1 & echo $! > "$HTTP_PID")
  fw_open_port "$HTTP_PORT" tcp
  ok "下载目录：$HTTP_DIR"
  echo "http://${ip:-SERVER_IP}:$HTTP_PORT/01_IMPORT_FLCLASH.yaml"
  echo "http://${ip:-SERVER_IP}:$HTTP_PORT/02_IMPORT_SINGBOX_CLIENT.json"
  echo "http://${ip:-SERVER_IP}:$HTTP_PORT/00_README_IMPORT.txt"
}

export_status(){
  section "服务状态 / Status"
  echo "APP：$APP $VER"
  echo "ROOT：$ROOT"
  echo "OUT ：$OUT"
  echo
  if sbox_bin >/dev/null 2>&1; then
    $(sbox_bin) version | head -5 || true
  else
    warn "未安装 sing-box"
  fi
  echo
  systemctl --no-pager --full status sing-box | sed -n '1,20p' || true
  echo
  [[ -f "$SBOX_CONF" ]] && sed -n '1,220p' "$SBOX_CONF" || true
}

section(){
  echo
  printf "${CYN}────────────────────────────────────────────────────────────────────────────${R}\n"
  printf "${CYN}${B} %s${R}\n" "$1"
  printf "${CYN}────────────────────────────────────────────────────────────────────────────${R}\n"
}

section_anytls(){
  section "部署 AnyTLS / sing-box AnyTLS Builder"
  note "AnyTLS 走 TCP/TLS，适合作为稳定线与 Trojan/AnyTLS 体感对比。"
  note "默认使用自签证书，客户端导出会写 skip-cert-verify/insecure。"
}

section_tuic(){
  section "部署 TUIC v5 / sing-box TUIC Builder"
  note "TUIC 走 UDP/QUIC，必须放行 UDP 端口；适合测低延迟、手机、视频、游戏场景。"
  note "中国三网下 UDP 质量波动大，建议作为高速测试线，不建议直接替代稳定主力线。"
}

banner(){
  clear || true
  printf "${CYN}┌────────────────────────────────────────────────────────────────────────────┐${R}\n"
  printf "${CYN}│${R} ${B}LazyVPS Protocol Addon${R}  ${YLW}TUIC + AnyTLS Builder${R}                         ${CYN}│${R}\n"
  printf "${CYN}│${R} Version: ${VER}   Update: ${UPDATE_DATE}                         ${CYN}│${R}\n"
  printf "${CYN}└────────────────────────────────────────────────────────────────────────────┘${R}\n"
  echo
}

menu(){
  while true; do
    banner
    printf " ${GRN}1${R}) 部署 AnyTLS TCP/TLS 节点\n"
    printf " ${GRN}2${R}) 部署 TUIC v5 UDP/QUIC 节点\n"
    printf " ${GRN}3${R}) 同机部署 AnyTLS + TUIC 双协议\n"
    printf " ${GRN}4${R}) 启动 HTTP 下载导入文件\n"
    printf " ${GRN}5${R}) 查看 sing-box / 当前配置状态\n"
    printf " ${GRN}6${R}) 打开输出目录提示\n"
    printf " ${GRN}Q${R}) 退出\n"
    echo
    read -rp "请选择 [1-6/Q]: " ans || true
    case "${ans:-}" in
      1) deploy_anytls; pause ;;
      2) deploy_tuic; pause ;;
      3) deploy_anytls_tuic; pause ;;
      4) start_http; pause ;;
      5) export_status; pause ;;
      6) echo "输出目录：$OUT"; ls -lah "$OUT" 2>/dev/null || true; pause ;;
      q|Q) exit 0 ;;
      *) warn "输入无效。"; sleep 1 ;;
    esac
  done
}

usage(){
  cat <<EOF2
$APP - Protocol Addon $VER

用法：
  bash lazy-vps-protocol-addon.sh
  bash lazy-vps-protocol-addon.sh --quick anytls
  bash lazy-vps-protocol-addon.sh --quick tuic
  bash lazy-vps-protocol-addon.sh --quick anytls-tuic
  bash lazy-vps-protocol-addon.sh --quick http
  bash lazy-vps-protocol-addon.sh --quick status

输出：
  $OUT/01_IMPORT_FLCLASH.yaml
  $OUT/02_IMPORT_SINGBOX_CLIENT.json
  $OUT/00_README_IMPORT.txt
EOF2
}

main(){
  case "${1:-}" in
    --quick)
      case "${2:-}" in
        anytls) deploy_anytls ;;
        tuic) deploy_tuic ;;
        anytls-tuic|tuic-anytls|multi) deploy_anytls_tuic ;;
        http) start_http ;;
        status) export_status ;;
        *) usage; exit 1 ;;
      esac
      ;;
    -h|--help) usage ;;
    *) menu ;;
  esac
}

main "$@"
