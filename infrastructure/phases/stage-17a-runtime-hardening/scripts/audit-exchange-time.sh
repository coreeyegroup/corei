#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

AUDIT_FILE="${BASE}/reports/exchange-time-audit.log"

echo "======================================================" >> "${AUDIT_FILE}"
echo "EXCHANGE TIME AUDIT $(date --iso-8601=seconds)" >> "${AUDIT_FILE}"
echo "======================================================" >> "${AUDIT_FILE}"

cat "${BASE}/reports/exchange-time-validation.txt" >> "${AUDIT_FILE}"

echo "" >> "${AUDIT_FILE}"

echo "[PASS] Exchange-time audit persisted"
