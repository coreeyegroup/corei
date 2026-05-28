#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

UNRECOVERABLE_DIR="${ROOT_DIR}/state/deadletter/unrecoverable"
AUDIT_DIR="${ROOT_DIR}/state/deadletter/audit"

mkdir -p "${AUDIT_DIR}"

TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"

echo "========================================="
echo "ESCALATE UNRECOVERABLE EVENT"
echo "========================================="

LATEST_EVENT="$(find "${UNRECOVERABLE_DIR}" -type f | sort | tail -n 1)"

if [[ -z "${LATEST_EVENT}" ]]; then
  echo "[WARN] No unrecoverable events detected"
  exit 0
fi

cp "${LATEST_EVENT}" \
  "${AUDIT_DIR}/escalated-${TIMESTAMP}.json"

echo "[DLQ] Unrecoverable event escalated for human review"

echo "========================================="
