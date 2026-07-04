#!/usr/bin/env bash
set -Eeuo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
bash "$DIR/lazy-vps-protocol-addon.sh" --quick tuic
