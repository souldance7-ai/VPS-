#!/usr/bin/env bash
set -Eeuo pipefail

if [[ ${EUID:-$(id -u)} -ne 0 ]]; then
  echo "請以 root 執行 / run as root" >&2
  exit 1
fi

: "${AWS_JP_TOKEN:?請設定 20 字元以上 AWS_JP_TOKEN}"
: "${CHT_CHANGHUA_TOKEN:?請設定 20 字元以上 CHT_CHANGHUA_TOKEN}"

PULSE_REPO="${PULSE_REPO:-souldance7-ai/VPS-}"
PULSE_PROJECT_PATH="${PULSE_PROJECT_PATH:-corenet-pulse}"
PULSE_VERSION="${PULSE_VERSION:-latest}"
PULSE_ARCH="$(uname -m)"
case "$PULSE_ARCH" in
  x86_64|amd64) PULSE_ARCH=amd64 ;;
  aarch64|arm64) PULSE_ARCH=arm64 ;;
  *) echo "不支援架構: $PULSE_ARCH" >&2; exit 1 ;;
esac

if [[ "$PULSE_VERSION" == latest ]]; then
  PULSE_DOWNLOAD="https://github.com/${PULSE_REPO}/releases/latest/download/corenet-pulse-hub-linux-${PULSE_ARCH}"
else
  PULSE_DOWNLOAD="https://github.com/${PULSE_REPO}/releases/download/${PULSE_VERSION}/corenet-pulse-hub-linux-${PULSE_ARCH}"
fi

id corenet-pulse >/dev/null 2>&1 || useradd --system --home-dir /var/lib/corenet-pulse --shell /usr/sbin/nologin corenet-pulse
install -d -o corenet-pulse -g corenet-pulse -m 0750 /var/lib/corenet-pulse
install -d -o root -g corenet-pulse -m 0750 /etc/corenet-pulse
curl -fL --retry 3 "$PULSE_DOWNLOAD" -o /usr/local/bin/corenet-pulse-hub
chmod 0755 /usr/local/bin/corenet-pulse-hub
if [[ ! -e /etc/corenet-pulse/hub.json ]]; then
  curl -fL --retry 3 "https://raw.githubusercontent.com/${PULSE_REPO}/main/${PULSE_PROJECT_PATH}/configs/hub.example.json" -o /etc/corenet-pulse/hub.json
fi
cat >/etc/corenet-pulse/hub.env <<EOF
PULSE_CONFIG=/etc/corenet-pulse/hub.json
AWS_JP_TOKEN=${AWS_JP_TOKEN}
CHT_CHANGHUA_TOKEN=${CHT_CHANGHUA_TOKEN}
EOF
chown root:corenet-pulse /etc/corenet-pulse/hub.json /etc/corenet-pulse/hub.env
chmod 0640 /etc/corenet-pulse/hub.json /etc/corenet-pulse/hub.env
curl -fL --retry 3 "https://raw.githubusercontent.com/${PULSE_REPO}/main/${PULSE_PROJECT_PATH}/deploy/systemd/corenet-pulse-hub.service" \
  -o /etc/systemd/system/corenet-pulse-hub.service
systemctl daemon-reload
systemctl enable --now corenet-pulse-hub
systemctl --no-pager --full status corenet-pulse-hub || true
