#!/usr/bin/env bash
# LazyVPS AnyTLS + TUIC v5 double-protocol wrapper
set -Eeuo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
bash "$SCRIPT_DIR/lazy-vps-protocol-addon.sh" --quick anytls-tuic
