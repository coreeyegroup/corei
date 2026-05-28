#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

SOURCE_DIR="${ROOT_DIR}/state/deadletter/malformed-events"
TARGET_DIR="${ROOT_DIR}/state/deadletter/recoverable"

LATEST_EVENT="$(find "${SOURCE_DIR}" -type f | sort | tail -n 1)"

echo "========================================="
echo "SIMULATE DEADLETTER ROUTING"
echo "========================================="

if [[ -z "${LATEST_EVENT}" ]]; then
  echo "[FAIL] No malformed event found"
  exit 1
fi

cp "${LATEST_EVENT}" "${TARGET_DIR}/"

echo "[DLQ] Event routed to recoverable deadletter queue"

echo "========================================="
