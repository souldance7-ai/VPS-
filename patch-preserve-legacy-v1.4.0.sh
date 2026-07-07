#!/usr/bin/env bash
set -Eeuo pipefail
# Run this inside the existing GitHub repo before replacing lazy-vps-menu.sh.
# It preserves the current main script as legacy, then copies v1.4.0 main into place.
mkdir -p legacy
if [[ -f lazy-vps-menu.sh && ! -f legacy/lazy-vps-menu-legacy-v1.2.6.sh ]]; then
  cp -a lazy-vps-menu.sh legacy/lazy-vps-menu-legacy-v1.2.6.sh
  echo "[OK] saved existing lazy-vps-menu.sh to legacy/lazy-vps-menu-legacy-v1.2.6.sh"
fi
if [[ -f lazy-vps-menu-v1.4.0.sh ]]; then
  cp -a lazy-vps-menu-v1.4.0.sh lazy-vps-menu.sh
  chmod +x lazy-vps-menu.sh lazy-vps-protocol-addon.sh protocols/*.sh 2>/dev/null || true
  echo "[OK] installed lazy-vps-menu.sh v1.4.0"
else
  echo "[ERROR] lazy-vps-menu-v1.4.0.sh not found. Put this script in the v1.4.0 package root."
  exit 1
fi
bash -n lazy-vps-menu.sh
bash -n lazy-vps-protocol-addon.sh
grep -nE 'v1.4.0|Interactive TUI|AnyTLS|TUIC' lazy-vps-menu.sh | head -30
