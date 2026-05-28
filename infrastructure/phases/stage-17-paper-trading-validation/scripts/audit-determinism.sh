#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17-paper-trading-validation"

AUDIT_FILE="${BASE}/reports/determinism-audit.log"

echo "======================================================" >> "${AUDIT_FILE}"
echo "DETERMINISM AUDIT $(date --iso-8601=seconds)" >> "${AUDIT_FILE}"
echo "======================================================" >> "${AUDIT_FILE}"

cat "${BASE}/reports/determinism-report.txt" >> "${AUDIT_FILE}"

echo "" >> "${AUDIT_FILE}"

echo "[PASS] Determinism audit persisted"
