#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17-paper-trading-validation"

AUDIT_FILE="${BASE}/reports/copy-trade-audit.log"

echo "======================================================" >> "${AUDIT_FILE}"
echo "COPY TRADE AUDIT $(date --iso-8601=seconds)" >> "${AUDIT_FILE}"
echo "======================================================" >> "${AUDIT_FILE}"

cat "${BASE}/reports/copy-trade-report.txt" >> "${AUDIT_FILE}"

echo "" >> "${AUDIT_FILE}"

echo "[PASS] Copy-trade audit persisted"
