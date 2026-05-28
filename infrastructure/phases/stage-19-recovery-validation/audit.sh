#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "[Stage-19 Audit] Starting governance audit"

test -f "${ROOT_DIR}/setup.sh"
test -f "${ROOT_DIR}/validate.sh"
test -f "${ROOT_DIR}/rollback.sh"
test -f "${ROOT_DIR}/inventory.sh"
test -f "${ROOT_DIR}/stage.env"

echo "[Stage-19 Audit] Governance audit passed"
