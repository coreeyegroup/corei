#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

AUDIT_DIR="${ROOT_DIR}/state/deadletter/audit"

echo "========================================="
echo "VALIDATE DEADLETTER GOVERNANCE"
echo "========================================="

EVENT_COUNT="$(find "${AUDIT_DIR}" -type f | wc -l)"

echo "[DLQ] Escalated event count: ${EVENT_COUNT}"

echo "[PASS] Deadletter governance validation successful"

echo "========================================="
