#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../../.. && pwd)"

OUTPUT="${ROOT_DIR}/state/stage-11/inventory/core_platform-topology.txt"

find \
    "${ROOT_DIR}/core_platform" \
    "${ROOT_DIR}/services" \
    -type d | sort > "${OUTPUT}"

echo "Inventory written:"
echo "state/stage-11/inventory/core_platform-topology.txt"
