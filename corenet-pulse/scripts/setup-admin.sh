#!/usr/bin/env bash
# Enable authenticated node name and regional probe management.
set -Eeuo pipefail
umask 077
[[ ${EUID:-$(id -u)} -eq 0 ]] || { echo '請以 root 執行' >&2; exit 1; }
: "${PULSE_HUB_URL:?請設定公開的 PULSE_HUB_URL}"
export PULSE_HUB_URL
for PULSE_COMMAND in python3 curl systemctl flock; do
  command -v "$PULSE_COMMAND" >/dev/null || { echo "缺少必要工具：$PULSE_COMMAND" >&2; exit 1; }
done
[[ -s /etc/corenet-pulse/hub.json ]] || { echo '找不到既有 Hub 設定' >&2; exit 1; }
exec 9>/run/lock/corenet-pulse-update.lock
flock -n 9 || { echo '另一個 Hub 更新正在執行' >&2; exit 1; }
PULSE_CHECK_URL="$(python3 - <<'PY'
import ipaddress, json, os, re
from urllib.parse import urlsplit
u = urlsplit(os.environ['PULSE_HUB_URL'])
if u.scheme != 'https' or not u.hostname or u.username or u.password or u.path not in ('', '/') or u.query or u.fragment or not re.fullmatch(r'[A-Za-z0-9.-]+', u.hostname):
    raise SystemExit('PULSE_HUB_URL 須為探針公開 HTTPS 域名，不含路徑')
try:
    ipaddress.ip_address(u.hostname)
except ValueError:
    pass
else:
    raise SystemExit('管理頁請使用公開域名，不填來源 IP')
if u.port is not None and not 1 <= u.port <= 65535:
    raise SystemExit('HTTPS 連接埠不正確')
config = json.load(open('/etc/corenet-pulse/hub.json'))
url = 'http://' + config.get('listen', '127.0.0.1:9800')
listen = urlsplit(url)
if listen.hostname not in ('127.0.0.1', 'localhost', '::1') or not listen.port or listen.path or listen.query or listen.fragment or listen.username:
    raise SystemExit('Hub 必須只監聽 loopback 位址')
print(url)
PY
)"
PULSE_ADMIN_TMP="$(mktemp -d)"
PULSE_ADMIN_ENV=/etc/corenet-pulse/admin.env
PULSE_ADMIN_LOGIN=/etc/corenet-pulse/admin-login.txt
PULSE_ADMIN_DROPIN=/etc/systemd/system/corenet-pulse-hub.service.d/admin.conf
for PULSE_FILE in "$PULSE_ADMIN_ENV" "$PULSE_ADMIN_LOGIN" "$PULSE_ADMIN_DROPIN"; do
  [[ ! -e "$PULSE_FILE" ]] || cp -p -- "$PULSE_FILE" "$PULSE_ADMIN_TMP/$(basename "$PULSE_FILE")"
done
PULSE_ADMIN_CHANGED=0
PULSE_ADMIN_OK=0
cleanup() {
  local result=$?
  trap - EXIT
  if [[ "$PULSE_ADMIN_CHANGED" == 1 && "$PULSE_ADMIN_OK" != 1 ]]; then
    for PULSE_FILE in "$PULSE_ADMIN_ENV" "$PULSE_ADMIN_LOGIN" "$PULSE_ADMIN_DROPIN"; do
      if [[ -e "$PULSE_ADMIN_TMP/$(basename "$PULSE_FILE")" ]]; then
        cp -p -- "$PULSE_ADMIN_TMP/$(basename "$PULSE_FILE")" "$PULSE_FILE"
      else
        rm -f -- "$PULSE_FILE"
      fi
    done
    systemctl daemon-reload
    systemctl restart corenet-pulse-hub || true
    echo '管理頁啟用未通過檢查，已恢復先前管理設定；請查看 Hub 日誌。' >&2
    result=1
  fi
  rm -rf -- "$PULSE_ADMIN_TMP"
  exit "$result"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
PULSE_ADMIN_CHANGED=1
install -d -o corenet-pulse -g corenet-pulse -m 0750 /var/lib/corenet-pulse
install -d -o root -g root -m 0755 /etc/systemd/system/corenet-pulse-hub.service.d
python3 - <<'PY'
import grp, hashlib, os, re, secrets, tempfile
from pathlib import Path
envfile = Path('/etc/corenet-pulse/admin.env')
loginfile = Path('/etc/corenet-pulse/admin-login.txt')
digest = ''
if envfile.exists():
    values = dict(line.split('=', 1) for line in envfile.read_text().splitlines() if '=' in line and not line.startswith('#'))
    digest = values.get('PULSE_ADMIN_KEY_HASH', '')
if digest and not re.fullmatch(r'[0-9a-f]{64}', digest):
    raise SystemExit('既有管理設定格式不正確，停止操作')
def write(path, content, mode, gid):
    with tempfile.NamedTemporaryFile(dir=path.parent, delete=False) as f:
        temp = Path(f.name)
        try:
            f.write(content.encode('utf-8')); f.flush(); os.fsync(f.fileno())
            os.fchown(f.fileno(), 0, gid); os.fchmod(f.fileno(), mode)
            temp.replace(path)
        finally:
            temp.unlink(missing_ok=True)
if not digest or os.environ.get('PULSE_RESET_ADMIN') == '1':
    password = secrets.token_urlsafe(32)
    digest = hashlib.sha256(password.encode()).hexdigest()
    write(loginfile, password + '\n', 0o600, 0)
origin = os.environ['PULSE_HUB_URL'].rstrip('/')
write(envfile, f'PULSE_ADMIN_KEY_HASH={digest}\nPULSE_PUBLIC_URL={origin}\nPULSE_LABELS_FILE=/var/lib/corenet-pulse/node-labels.json\n', 0o640, grp.getgrnam('corenet-pulse').gr_gid)
PY
cat >"$PULSE_ADMIN_DROPIN" <<'UNIT'
[Service]
EnvironmentFile=/etc/corenet-pulse/admin.env
StateDirectory=corenet-pulse
StateDirectoryMode=0750
UMask=0077
UNIT
chmod 0644 "$PULSE_ADMIN_DROPIN"
systemctl daemon-reload
systemctl restart corenet-pulse-hub
for PULSE_ATTEMPT in {1..15}; do
  PULSE_HTTP_CODE="$(curl -sS --max-time 2 -o "$PULSE_ADMIN_TMP/session.json" -w '%{http_code}' "$PULSE_CHECK_URL/api/admin/session" 2>/dev/null)" || PULSE_HTTP_CODE=000
  if [[ "$PULSE_HTTP_CODE" == 401 ]] && systemctl is-active --quiet corenet-pulse-hub && python3 - "$PULSE_ADMIN_TMP/session.json" <<'PY'
import json, sys
try:
    data = json.load(open(sys.argv[1]))
except (ValueError, OSError):
    sys.exit(1)
sys.exit(0 if isinstance(data, dict) and data.get('error') == '請先登入管理頁' else 1)
PY
  then
    PULSE_ADMIN_OK=1
    break
  fi
  sleep 1
done
[[ "$PULSE_ADMIN_OK" == 1 ]] || exit 1
printf '\n管理頁已啟用：%s/admin\n' "${PULSE_HUB_URL%/}"
python3 - <<'PY'
import hashlib
from pathlib import Path
p = Path('/etc/corenet-pulse/admin-login.txt')
env = dict(line.split('=', 1) for line in Path('/etc/corenet-pulse/admin.env').read_text().splitlines() if '=' in line)
if p.exists() and hashlib.sha256(p.read_text().strip().encode()).hexdigest() == env['PULSE_ADMIN_KEY_HASH']:
    print('管理密碼：' + p.read_text().strip())
    print('密碼保存在 /etc/corenet-pulse/admin-login.txt（只有 root 可讀）。')
else:
    print('沿用既有管理密碼；忘記時可加 PULSE_RESET_ADMIN=1 重新執行本腳本。')
PY
echo '登入後可自訂節點名稱及三網探測目標；既有節點與 Agent Token 已保留。'
