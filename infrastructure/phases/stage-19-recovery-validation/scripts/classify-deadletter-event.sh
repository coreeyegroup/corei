#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

RECOVERABLE_DIR="${ROOT_DIR}/state/deadletter/recoverable"
UNRECOVERABLE_DIR="${ROOT_DIR}/state/deadletter/unrecoverable"

echo "========================================="
echo "CLASSIFY DEADLETTER EVENT"
echo "========================================="

LATEST_EVENT="$(find "${RECOVERABLE_DIR}" -type f | sort | tail -n 1)"

if grep -q "INVALID_PRICE" "${LATEST_EVENT}"; then

  cp "${LATEST_EVENT}" "${UNRECOVERABLE_DIR}/"

  echo "[DLQ] Event classified as unrecoverable"

else

  echo "[DLQ] Event classified as recoverable"

fi

echo "========================================="
