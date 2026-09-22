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

export DEBIAN_FRONTEND=noninteractive
if ! command -v curl >/dev/null 2>&1; then
  apt-get update
  apt-get install -y --no-install-recommends ca-certificates curl
fi

if [[ "$PULSE_VERSION" == latest ]]; then
  PULSE_DOWNLOAD="https://github.com/${PULSE_REPO}/releases/latest/download/corenet-pulse-agent-linux-${PULSE_ARCH}"
else
  PULSE_DOWNLOAD="https://github.com/${PULSE_REPO}/releases/download/${PULSE_VERSION}/corenet-pulse-agent-linux-${PULSE_ARCH}"
fi

install_agent_binary() {
  local temp_dir temp_binary source_url
  temp_dir="$(mktemp -d)"
  temp_binary="${temp_dir}/corenet-pulse-agent"
  trap 'rm -rf -- "$temp_dir"' RETURN

  if curl -fL --retry 3 "$PULSE_DOWNLOAD" -o "$temp_binary"; then
    install -m 0755 "$temp_binary" /usr/local/bin/corenet-pulse-agent
    return
  fi

  echo "Release 尚未提供，改由 GitHub 原始碼安全建置…"
  if ! command -v go >/dev/null 2>&1; then
    apt-get update
    apt-get install -y --no-install-recommends golang-go
  fi
  source_url="https://codeload.github.com/${PULSE_REPO}/tar.gz/refs/heads/main"
  curl -fL --retry 3 "$source_url" -o "${temp_dir}/source.tar.gz"
  mkdir -p "${temp_dir}/source"
  tar -xzf "${temp_dir}/source.tar.gz" --strip-components=1 -C "${temp_dir}/source"
  (
    cd "${temp_dir}/source/${PULSE_PROJECT_PATH}"
    CGO_ENABLED=0 GOOS=linux GOARCH="$PULSE_ARCH" \
      go build -trimpath -ldflags='-s -w' -o "$temp_binary" ./cmd/agent
  )
  install -m 0755 "$temp_binary" /usr/local/bin/corenet-pulse-agent
}

install -d -m 0750 /etc/corenet-pulse
install_agent_binary
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
