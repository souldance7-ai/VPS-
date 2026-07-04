#!/usr/bin/env bash
# ==============================================================================
# LazyVPS Protocol Addon v1.3.5
# AnyTLS + TUIC v5 builder for sing-box
# ==============================================================================
set -Eeuo pipefail

ROOT="${ROOT:-/opt/lazy-vps-menu}"
OUT="$ROOT/outputs"
BAK="$ROOT/backups"
HTTP_DIR="$ROOT/http-download"
SBOX_DIR="/etc/sing-box"
SBOX_CONF="$SBOX_DIR/config.json"
CERT="$SBOX_DIR/lazyvps-selfsigned.crt"
KEY="$SBOX_DIR/lazyvps-selfsigned.key"
SERVICE="sing-box"
HTTP_PORT="${HTTP_PORT:-8088}"

R=$'\033[0m'; RED=$'\033[31m'; GRN=$'\033[32m'; YLW=$'\033[33m'; CYN=$'\033[36m'; BLU=$'\033[34m'
ok(){ printf "${GRN}[完成]${R} %s\n" "$1"; }
info(){ printf "${CYN}[信息]${R} %s\n" "$1"; }
warn(){ printf "${YLW}[警告]${R} %s\n" "$1"; }
err(){ printf "${RED}[错误]${R} %s\n" "$1"; }
note(){ printf "${BLU}[说明]${R} %s\n" "$1"; }
section(){ printf "\n${CYN}==> %s${R}\n" "$1"; }

need_root(){ [[ "${EUID:-$(id -u)}" -eq 0 ]] || { err "请用 root 执行：sudo -i"; exit 1; }; }
has(){ command -v "$1" >/dev/null 2>&1; }
rand_pass(){ openssl rand -base64 32 | tr -dc 'A-Za-z0-9' | head -c 24; }
rand_uuid(){ if has uuidgen; then uuidgen; else cat /proc/sys/kernel/random/uuid; fi; }
ts(){ date '+%Y%m%d_%H%M%S'; }

ip4_external(){
  local ip
  for url in https://api.ipify.org https://ifconfig.me https://icanhazip.com; do
    ip="$(curl -4 -s --max-time 8 "$url" 2>/dev/null | tr -d ' \r\n' || true)"
    [[ "$ip" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]] && { echo "$ip"; return 0; }
  done
  ip="$(ip route get 1.1.1.1 2>/dev/null | grep -oP 'src \K[0-9.]+' | head -1 || true)"
  echo "$ip"
}

ask(){
  local p="$1" d="$2" v
  printf "%b%s%b [默认: %s]: " "$YLW" "$p" "$R" "$d" >&2
  read -r v
  echo "${v:-$d}"
}

install_deps(){
  section "安装基础依赖"
  mkdir -p "$ROOT" "$OUT" "$BAK" "$HTTP_DIR" "$SBOX_DIR"
  if has apt-get; then
    apt-get update -y
    DEBIAN_FRONTEND=noninteractive apt-get install -y curl wget openssl ca-certificates tar gzip coreutils iproute2
  elif has dnf; then
    dnf install -y curl wget openssl ca-certificates tar gzip iproute
  elif has yum; then
    yum install -y curl wget openssl ca-certificates tar gzip iproute
  fi
}

install_sing_box(){
  section "检查 / 安装 sing-box"
  if has sing-box; then
    sing-box version || true
    ok "sing-box 已存在"
    return 0
  fi
  note "未检测到 sing-box，使用官方安装脚本安装。"
  if has curl; then
    curl -fsSL https://sing-box.app/install.sh | sh
  elif has wget; then
    wget -qO- https://sing-box.app/install.sh | sh
  else
    err "缺少 curl/wget，无法安装 sing-box。"
    exit 1
  fi
  has sing-box || { err "sing-box 安装失败。"; exit 1; }
  sing-box version || true
}

make_cert(){
  section "生成 TLS 自签证书"
  local sni="$1"
  mkdir -p "$SBOX_DIR"
  if [[ -s "$CERT" && -s "$KEY" ]]; then
    ok "证书已存在：$CERT"
    return 0
  fi
  openssl req -x509 -newkey rsa:2048 -sha256 -days 3650 -nodes \
    -keyout "$KEY" -out "$CERT" -subj "/CN=${sni}" >/dev/null 2>&1
  chmod 600 "$KEY" 2>/dev/null || true
  ok "已生成自签证书：$CERT"
  warn "客户端需要开启 skip-cert-verify / insecure=true；生产环境建议改用真实域名证书。"
}

open_firewall(){
  local port="$1" proto="$2"
  if [[ "$proto" == "tcp" || "$proto" == "both" ]]; then
    if has ufw; then ufw allow "${port}/tcp" >/dev/null 2>&1 || true; fi
    if has iptables; then iptables -C INPUT -p tcp --dport "$port" -j ACCEPT 2>/dev/null || iptables -I INPUT -p tcp --dport "$port" -j ACCEPT 2>/dev/null || true; fi
  fi
  if [[ "$proto" == "udp" || "$proto" == "both" ]]; then
    if has ufw; then ufw allow "${port}/udp" >/dev/null 2>&1 || true; fi
    if has iptables; then iptables -C INPUT -p udp --dport "$port" -j ACCEPT 2>/dev/null || iptables -I INPUT -p udp --dport "$port" -j ACCEPT 2>/dev/null || true; fi
  fi
}

json_escape(){ python3 -c 'import json,sys; print(json.dumps(sys.argv[1], ensure_ascii=False))' "$1"; }

write_server_config(){
  local mode="$1" any_port="$2" any_pass="$3" tuic_port="$4" tuic_uuid="$5" tuic_pass="$6"
  mkdir -p "$SBOX_DIR" "$BAK"
  [[ -f "$SBOX_CONF" ]] && cp -a "$SBOX_CONF" "$BAK/sing-box.config.$(ts).json"

  python3 - "$SBOX_CONF" "$mode" "$any_port" "$any_pass" "$tuic_port" "$tuic_uuid" "$tuic_pass" "$CERT" "$KEY" <<'PY'
import json, sys
conf_path, mode, any_port, any_pass, tuic_port, tuic_uuid, tuic_pass, cert, key = sys.argv[1:]
inbounds = []
if mode in ("anytls", "both"):
    inbounds.append({
        "type": "anytls",
        "tag": "anytls-in",
        "listen": "::",
        "listen_port": int(any_port),
        "users": [{"name": "lazyvps", "password": any_pass}],
        "tls": {"enabled": True, "certificate_path": cert, "key_path": key}
    })
if mode in ("tuic", "both"):
    inbounds.append({
        "type": "tuic",
        "tag": "tuic-in",
        "listen": "::",
        "listen_port": int(tuic_port),
        "users": [{"uuid": tuic_uuid, "password": tuic_pass}],
        "congestion_control": "bbr",
        "auth_timeout": "3s",
        "zero_rtt_handshake": False,
        "heartbeat": "10s",
        "tls": {"enabled": True, "certificate_path": cert, "key_path": key}
    })
conf = {
    "log": {"level": "info", "timestamp": True},
    "inbounds": inbounds,
    "outbounds": [{"type": "direct", "tag": "direct"}],
    "route": {"final": "direct"}
}
open(conf_path, "w", encoding="utf-8").write(json.dumps(conf, ensure_ascii=False, indent=2) + "\n")
PY
  sing-box check -c "$SBOX_CONF"
  systemctl enable "$SERVICE" >/dev/null 2>&1 || true
  systemctl restart "$SERVICE"
  ok "sing-box 配置已写入并重启：$SBOX_CONF"
}

write_outputs(){
  local mode="$1" server="$2" sni="$3" any_port="$4" any_pass="$5" tuic_port="$6" tuic_uuid="$7" tuic_pass="$8"
  mkdir -p "$OUT" "$HTTP_DIR"
  local yaml="$OUT/01_IMPORT_FLCLASH_TUIC_ANYTLS.yaml"
  local json="$OUT/02_IMPORT_SINGBOX_TUIC_ANYTLS.json"
  local note_file="$OUT/00_TUIC_ANYTLS_NODE_INFO.txt"

  : > "$yaml"
  cat >> "$yaml" <<EOFYAML
proxies:
EOFYAML
  if [[ "$mode" == "anytls" || "$mode" == "both" ]]; then
    cat >> "$yaml" <<EOFYAML
  - name: "🇺🇳 LazyVPS-AnyTLS"
    type: anytls
    server: $server
    port: $any_port
    password: "$any_pass"
    sni: "$sni"
    skip-cert-verify: true
    udp: true
EOFYAML
  fi
  if [[ "$mode" == "tuic" || "$mode" == "both" ]]; then
    cat >> "$yaml" <<EOFYAML
  - name: "🇺🇳 LazyVPS-TUIC"
    type: tuic
    server: $server
    port: $tuic_port
    uuid: $tuic_uuid
    password: "$tuic_pass"
    sni: "$sni"
    skip-cert-verify: true
    udp: true
    udp-relay-mode: native
    congestion-controller: bbr
EOFYAML
  fi

  python3 - "$json" "$mode" "$server" "$sni" "$any_port" "$any_pass" "$tuic_port" "$tuic_uuid" "$tuic_pass" <<'PY'
import json, sys
out, mode, server, sni, any_port, any_pass, tuic_port, tuic_uuid, tuic_pass = sys.argv[1:]
outbounds = []
if mode in ("anytls", "both"):
    outbounds.append({
        "type": "anytls", "tag": "LazyVPS-AnyTLS",
        "server": server, "server_port": int(any_port), "password": any_pass,
        "tls": {"enabled": True, "server_name": sni, "insecure": True}
    })
if mode in ("tuic", "both"):
    outbounds.append({
        "type": "tuic", "tag": "LazyVPS-TUIC",
        "server": server, "server_port": int(tuic_port), "uuid": tuic_uuid, "password": tuic_pass,
        "congestion_control": "bbr", "udp_relay_mode": "native",
        "tls": {"enabled": True, "server_name": sni, "insecure": True}
    })
conf = {
    "log": {"level": "info"},
    "inbounds": [{"type": "mixed", "tag": "mixed-in", "listen": "127.0.0.1", "listen_port": 2080}],
    "outbounds": outbounds + [{"type":"direct","tag":"direct"}],
    "route": {"final": outbounds[0]["tag"] if outbounds else "direct"}
}
open(out, "w", encoding="utf-8").write(json.dumps(conf, ensure_ascii=False, indent=2) + "\n")
PY

  cat > "$note_file" <<EOFNOTE
LazyVPS TUIC / AnyTLS 输出信息
================================
服务器地址: $server
TLS SNI: $sni
证书类型: 自签证书，客户端需开启 skip-cert-verify / insecure=true

AnyTLS:
  端口: $any_port/tcp
  密码: $any_pass

TUIC v5:
  端口: $tuic_port/udp
  UUID: $tuic_uuid
  密码: $tuic_pass
  拥塞控制: bbr

导入文件:
  FLClash/mihomo: $yaml
  sing-box:       $json
EOFNOTE

  cp -f "$yaml" "$json" "$note_file" "$HTTP_DIR/" 2>/dev/null || true
  ok "已生成导入配置：$yaml"
  ok "已生成 sing-box 客户端配置：$json"
  ok "已生成节点信息：$note_file"
}

build_protocol(){
  local mode="$1"
  need_root
  install_deps
  install_sing_box

  local server sni any_port any_pass tuic_port tuic_uuid tuic_pass
  server="$(ask '服务器地址 / IP 或域名' "$(ip4_external)")"
  sni="$(ask 'TLS SNI / 证书 CN' 'lazyvps.local')"
  any_port="$(ask 'AnyTLS TCP 端口' '8444')"
  tuic_port="$(ask 'TUIC UDP 端口' '8445')"
  any_pass="$(rand_pass)"
  tuic_uuid="$(rand_uuid)"
  tuic_pass="$(rand_pass)"

  make_cert "$sni"
  case "$mode" in
    anytls) open_firewall "$any_port" tcp ;;
    tuic) open_firewall "$tuic_port" udp ;;
    both) open_firewall "$any_port" tcp; open_firewall "$tuic_port" udp ;;
  esac
  write_server_config "$mode" "$any_port" "$any_pass" "$tuic_port" "$tuic_uuid" "$tuic_pass"
  write_outputs "$mode" "$server" "$sni" "$any_port" "$any_pass" "$tuic_port" "$tuic_uuid" "$tuic_pass"

  section "完成"
  systemctl status "$SERVICE" --no-pager -l | sed -n '1,18p' || true
  echo
  note "如要用 HTTP 下载导入文件，可回主菜单执行 16) HTTP On，或 bash lazy-vps-menu.sh --quick http"
}

status_protocol(){
  section "TUIC / AnyTLS 状态"
  sing-box version || true
  systemctl status "$SERVICE" --no-pager -l | sed -n '1,30p' || true
  echo
  ls -lh "$OUT"/*TUIC* "$OUT"/*ANYTLS* "$OUT"/*AnyTLS* 2>/dev/null || true
}

menu(){
  while true; do
    section "LazyVPS Protocol Addon v1.3.5"
    echo "  1) 建立 AnyTLS TCP/TLS"
    echo "  2) 建立 TUIC v5 UDP/QUIC"
    echo "  3) 同机建立 AnyTLS + TUIC"
    echo "  4) 查看状态"
    echo "  0) 退出"
    read -rp "序号: " n
    case "${n:-}" in
      1) build_protocol anytls ;;
      2) build_protocol tuic ;;
      3) build_protocol both ;;
      4) status_protocol ;;
      0|q|Q) exit 0 ;;
      *) warn "输入无效" ;;
    esac
  done
}

quick(){
  case "${1:-}" in
    anytls) build_protocol anytls ;;
    tuic) build_protocol tuic ;;
    anytls-tuic|tuic-anytls|both|multi) build_protocol both ;;
    status) status_protocol ;;
    *) echo "用法: bash lazy-vps-protocol-addon.sh --quick anytls|tuic|anytls-tuic|status" ;;
  esac
}

if [[ "${1:-}" == "--quick" ]]; then
  quick "${2:-}"
else
  menu
fi
