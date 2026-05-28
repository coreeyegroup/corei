#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

RECOVERABLE_DIR="${ROOT_DIR}/state/deadletter/recoverable"
RECOVERED_DIR="${ROOT_DIR}/state/deadletter/recovered"

echo "========================================="
echo "SIMULATE EVENT RECOVERY"
echo "========================================="

LATEST_EVENT="$(find "${RECOVERABLE_DIR}" -type f | sort | tail -n 1)"

if [[ -z "${LATEST_EVENT}" ]]; then
  echo "[WARN] No recoverable events available"
  exit 0
fi

cp "${LATEST_EVENT}" "${RECOVERED_DIR}/"

echo "[DLQ] Recoverable event replay simulation complete"

echo "========================================="
