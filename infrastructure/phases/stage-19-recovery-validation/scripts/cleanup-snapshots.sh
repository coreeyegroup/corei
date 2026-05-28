#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "[Cleanup] Removing temporary snapshot artifacts"

find "${ROOT_DIR}/tmp" -type f -delete

echo "[Cleanup] Complete"
