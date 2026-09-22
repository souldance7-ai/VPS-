#!/usr/bin/env bash
set -Eeuo pipefail

if [[ ${EUID:-$(id -u)} -ne 0 ]]; then
  echo "請以 root 執行 / run as root" >&2
  exit 1
fi

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
if ! command -v curl >/dev/null 2>&1 || ! command -v openssl >/dev/null 2>&1; then
  apt-get update
  apt-get install -y --no-install-recommends ca-certificates curl openssl
fi

# 重複執行時沿用原有 Token，首次安裝則自動產生，不輸出到終端。
if [[ -r /etc/corenet-pulse/hub.env ]]; then
  # shellcheck disable=SC1091
  source /etc/corenet-pulse/hub.env
fi
AWS_JP_TOKEN="${AWS_JP_TOKEN:-$(openssl rand -hex 32)}"
CHT_CHANGHUA_TOKEN="${CHT_CHANGHUA_TOKEN:-$(openssl rand -hex 32)}"

if [[ "$PULSE_VERSION" == latest ]]; then
  PULSE_DOWNLOAD="https://github.com/${PULSE_REPO}/releases/latest/download/corenet-pulse-hub-linux-${PULSE_ARCH}"
else
  PULSE_DOWNLOAD="https://github.com/${PULSE_REPO}/releases/download/${PULSE_VERSION}/corenet-pulse-hub-linux-${PULSE_ARCH}"
fi

install_hub_binary() {
  local temp_dir temp_binary source_url
  temp_dir="$(mktemp -d)"
  temp_binary="${temp_dir}/corenet-pulse-hub"
  trap 'rm -rf -- "$temp_dir"' RETURN

  if curl -fL --retry 3 "$PULSE_DOWNLOAD" -o "$temp_binary"; then
    install -m 0755 "$temp_binary" /usr/local/bin/corenet-pulse-hub
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
      go build -trimpath -ldflags='-s -w' -o "$temp_binary" ./cmd/hub
  )
  install -m 0755 "$temp_binary" /usr/local/bin/corenet-pulse-hub
}

id corenet-pulse >/dev/null 2>&1 || useradd --system --home-dir /var/lib/corenet-pulse --shell /usr/sbin/nologin corenet-pulse
install -d -o corenet-pulse -g corenet-pulse -m 0750 /var/lib/corenet-pulse
install -d -o root -g corenet-pulse -m 0750 /etc/corenet-pulse
install_hub_binary
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
echo
echo "CORENET Pulse Hub 已安裝：http://127.0.0.1:9800"
echo "Token 保存在 /etc/corenet-pulse/hub.env（權限 0640），未寫入公開倉庫。"
