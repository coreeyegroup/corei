#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "========== STAGE-19 INVENTORY =========="

find "${ROOT_DIR}" | sort

echo "========================================"
