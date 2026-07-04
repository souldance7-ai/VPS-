#!/usr/bin/env bash
# LazyVPS TUIC v5 one-key wrapper
set -Eeuo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
bash "$SCRIPT_DIR/lazy-vps-protocol-addon.sh" --quick tuic
