#!/usr/bin/env bash
# Publish the loopback-only Hub through a dedicated, named Cloudflare Tunnel.
set -Eeuo pipefail
umask 077

die() { echo "錯誤：$*" >&2; exit 1; }
[[ ${EUID:-$(id -u)} -eq 0 ]] || die '請以 root 執行。'
: "${PULSE_HOSTNAME:?請設定 PULSE_HOSTNAME，例如 status.example.com}"
PULSE_HOSTNAME="${PULSE_HOSTNAME,,}"
PULSE_TUNNEL_NAME="${PULSE_TUNNEL_NAME:-corenet-pulse}"
[[ "$PULSE_TUNNEL_NAME" =~ ^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$ ]] || die 'Tunnel 名稱格式不正確。'
[[ ${#PULSE_HOSTNAME} -le 253 && "$PULSE_HOSTNAME" == *.* && "$PULSE_HOSTNAME" =~ \.[a-z]{2,}$ ]] || die '請使用完整域名，不可填 IP 或 URL。'
IFS='.' read -r -a PULSE_LABELS <<< "$PULSE_HOSTNAME"
for PULSE_LABEL in "${PULSE_LABELS[@]}"; do
  [[ "$PULSE_LABEL" =~ ^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$ ]] || die '域名格式不正確。'
done

systemctl is-active --quiet corenet-pulse-hub || die 'Hub 尚未啟動，請先完成 Hub 安裝。'
id corenet-pulse >/dev/null 2>&1 || die '找不到 Hub 服務帳號。'
if ! command -v curl >/dev/null 2>&1 || ! command -v python3 >/dev/null 2>&1; then
  apt-get update
  DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends ca-certificates curl python3
fi
python3 - <<'PY'
import json
with open('/etc/corenet-pulse/hub.json', encoding='utf-8') as f:
    cfg = json.load(f)
if cfg.get('listen') != '127.0.0.1:9800':
    raise SystemExit('錯誤：Hub 設定必須只監聽 127.0.0.1:9800。')
PY
curl --noproxy '*' -fsS --max-time 5 http://127.0.0.1:9800/healthz >/dev/null

PULSE_TMP="$(mktemp -d)"
trap 'rm -rf -- "$PULSE_TMP"' EXIT
trap 'echo "部署未完成；請保留錯誤訊息。不要刪除既有的 Tunnel 憑證。" >&2' ERR
PULSE_TUNNEL_DIR=/etc/corenet-pulse/tunnel
PULSE_CREDENTIALS="${PULSE_TUNNEL_DIR}/credentials.json"
PULSE_CERT="${HOME}/.cloudflared/cert.pem"
install -d -o root -g corenet-pulse -m 0750 "$PULSE_TUNNEL_DIR"

if ! command -v cloudflared >/dev/null 2>&1; then
  echo '安裝 Cloudflare 官方 cloudflared 套件…'
  install -d -m 0755 /usr/share/keyrings
  curl -fsSL --retry 3 https://pkg.cloudflare.com/cloudflare-main.gpg -o "$PULSE_TMP/cloudflare-main.gpg"
  install -m 0644 "$PULSE_TMP/cloudflare-main.gpg" /usr/share/keyrings/cloudflare-main.gpg
  if [[ ! -e /etc/apt/sources.list.d/cloudflared.list ]]; then
    printf '%s\n' 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main' >"$PULSE_TMP/cloudflared.list"
    install -m 0644 "$PULSE_TMP/cloudflared.list" /etc/apt/sources.list.d/cloudflared.list
  fi
  apt-get update
  DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends cloudflared
fi
PULSE_CF_BIN="$(command -v cloudflared)"
[[ "$PULSE_CF_BIN" == /* && "$PULSE_CF_BIN" != *[[:space:]]* ]] || die 'cloudflared 執行檔路徑不正確。'

# An explicit empty config prevents unrelated tunnels' settings being reused.
printf '{}\n' >"$PULSE_TMP/empty.yml"
cf() { "$PULSE_CF_BIN" tunnel --config "$PULSE_TMP/empty.yml" "$@"; }
if [[ ! -s "$PULSE_CERT" ]]; then
  echo "請用電腦瀏覽器開啟接下來的登入連結，選擇管理 ${PULSE_HOSTNAME} 的網域並授權。"
  echo '完成後本指令會自動繼續；憑證保存在主機，不必貼回聊天。'
  cf login
fi
[[ -s "$PULSE_CERT" ]] || die 'Cloudflare 登入尚未完成，請完成登入後重跑本指令。'

if [[ ! -e "$PULSE_CREDENTIALS" ]]; then
  # cloudflared refuses duplicate names; never delete/recreate an existing tunnel.
  cf --origincert "$PULSE_CERT" create --credentials-file "$PULSE_CREDENTIALS" "$PULSE_TUNNEL_NAME"
fi
PULSE_TUNNEL_ID="$(python3 - "$PULSE_CREDENTIALS" <<'PY'
import json, sys, uuid
try:
    with open(sys.argv[1], encoding='utf-8') as f:
        credentials = json.load(f)
    tunnel_id = str(uuid.UUID(credentials['TunnelID']))
    if not credentials.get('TunnelSecret') or not credentials.get('AccountTag'):
        raise ValueError('missing fields')
except (OSError, ValueError, KeyError, TypeError, AttributeError):
    raise SystemExit('錯誤：Tunnel 憑證不完整；請保留檔案並檢查建立 Tunnel 時的錯誤。')
print(tunnel_id)
PY
)"
chown root:corenet-pulse "$PULSE_CREDENTIALS"
chmod 0640 "$PULSE_CREDENTIALS"

cat >"$PULSE_TMP/config.yml" <<EOF
tunnel: ${PULSE_TUNNEL_ID}
credentials-file: ${PULSE_CREDENTIALS}
metrics: 127.0.0.1:0
ingress:
  - hostname: ${PULSE_HOSTNAME}
    service: http://127.0.0.1:9800
  - service: http_status:404
EOF
"$PULSE_CF_BIN" tunnel --config "$PULSE_TMP/config.yml" ingress validate

# No --overwrite-dns: a conflicting DNS record must not be replaced silently.
cf --origincert "$PULSE_CERT" route dns "$PULSE_TUNNEL_ID" "$PULSE_HOSTNAME"
if [[ -f "$PULSE_TUNNEL_DIR/config.yml" ]]; then
  cp -p "$PULSE_TUNNEL_DIR/config.yml" "$PULSE_TUNNEL_DIR/config.yml.bak.$(date +%s)"
fi
install -o root -g corenet-pulse -m 0640 "$PULSE_TMP/config.yml" "$PULSE_TUNNEL_DIR/config.yml"

cat >"$PULSE_TMP/corenet-pulse-tunnel.service" <<EOF
[Unit]
Description=CORENET Pulse Cloudflare Tunnel
After=network-online.target corenet-pulse-hub.service
Wants=network-online.target corenet-pulse-hub.service

[Service]
Type=simple
User=corenet-pulse
Group=corenet-pulse
ExecStart=${PULSE_CF_BIN} tunnel --config ${PULSE_TUNNEL_DIR}/config.yml --no-autoupdate run
Restart=always
RestartSec=5
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
UMask=0077

[Install]
WantedBy=multi-user.target
EOF
install -m 0644 "$PULSE_TMP/corenet-pulse-tunnel.service" /etc/systemd/system/corenet-pulse-tunnel.service
systemctl daemon-reload
systemctl enable corenet-pulse-tunnel
systemctl restart corenet-pulse-tunnel
systemctl is-active --quiet corenet-pulse-tunnel

echo "正在驗證 https://${PULSE_HOSTNAME}，首次 DNS／憑證生效可能需要稍候…"
if curl --noproxy '*' -fsS --connect-timeout 5 --max-time 10 --retry 6 --retry-all-errors --retry-delay 3 --retry-max-time 70 \
    "https://${PULSE_HOSTNAME}/api/public/state" -o "$PULSE_TMP/public.json"; then
  python3 - "$PULSE_TMP/public.json" <<'PY'
import json, sys
with open(sys.argv[1], encoding='utf-8') as f:
    state = json.load(f)
with open('/etc/corenet-pulse/hub.json', encoding='utf-8') as f:
    cfg = json.load(f)
if state.get('site', {}).get('name') != cfg['site']['name'] or not isinstance(state.get('nodes'), list):
    raise SystemExit('錯誤：公開網址的回應與本機探針不符，請檢查 DNS／Tunnel。')
print('公開 HTTPS API 驗證成功。')
PY
  echo "探針網址：https://${PULSE_HOSTNAME}"
else
  echo 'Tunnel 服務已啟動，公開 HTTPS 尚未驗證成功，請稍後重試：' >&2
  echo "curl -fsS https://${PULSE_HOSTNAME}/api/public/state" >&2
  echo '診斷指令：journalctl -u corenet-pulse-tunnel -n 30 --no-pager' >&2
  exit 1
fi
