#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

AUDIT_FILE="${BASE}/reports/real-reconciliation-audit.log"

echo "======================================================" >> "${AUDIT_FILE}"
echo "REAL RECONCILIATION AUDIT $(date --iso-8601=seconds)" >> "${AUDIT_FILE}"
echo "======================================================" >> "${AUDIT_FILE}"

cat "${BASE}/reports/real-reconciliation-validation.txt" >> "${AUDIT_FILE}"

echo "" >> "${AUDIT_FILE}"

echo "[PASS] Real reconciliation audit persisted"
