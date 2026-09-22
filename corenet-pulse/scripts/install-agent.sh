#!/usr/bin/env bash
set -Eeuo pipefail

if [[ ${EUID:-$(id -u)} -ne 0 ]]; then
  echo "請以 root 執行 / run as root" >&2
  exit 1
fi

: "${PULSE_HUB_URL:?請設定 PULSE_HUB_URL，例如 https://status.example.com}"
: "${PULSE_NODE_ID:?請設定 PULSE_NODE_ID}"
: "${PULSE_NODE_TOKEN:?請設定 PULSE_NODE_TOKEN}"

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
  PULSE_DOWNLOAD="https://github.com/${PULSE_REPO}/releases/latest/download/corenet-pulse-agent-linux-${PULSE_ARCH}"
else
  PULSE_DOWNLOAD="https://github.com/${PULSE_REPO}/releases/download/${PULSE_VERSION}/corenet-pulse-agent-linux-${PULSE_ARCH}"
fi

install -d -m 0750 /etc/corenet-pulse
curl -fL --retry 3 "$PULSE_DOWNLOAD" -o /usr/local/bin/corenet-pulse-agent
chmod 0755 /usr/local/bin/corenet-pulse-agent
cat >/etc/corenet-pulse/agent.env <<EOF
PULSE_HUB_URL=${PULSE_HUB_URL}
PULSE_NODE_ID=${PULSE_NODE_ID}
PULSE_NODE_TOKEN=${PULSE_NODE_TOKEN}
PULSE_INTERVAL=${PULSE_INTERVAL:-3}
EOF
chmod 0600 /etc/corenet-pulse/agent.env
curl -fL --retry 3 "https://raw.githubusercontent.com/${PULSE_REPO}/main/${PULSE_PROJECT_PATH}/deploy/systemd/corenet-pulse-agent.service" \
  -o /etc/systemd/system/corenet-pulse-agent.service
systemctl daemon-reload
systemctl enable --now corenet-pulse-agent
systemctl --no-pager --full status corenet-pulse-agent || true
