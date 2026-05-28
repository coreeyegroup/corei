#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17-paper-trading-validation"

AUDIT_FILE="${BASE}/reports/kill-switch-audit.log"

echo "======================================================" >> "${AUDIT_FILE}"
echo "KILL SWITCH AUDIT $(date --iso-8601=seconds)" >> "${AUDIT_FILE}"
echo "======================================================" >> "${AUDIT_FILE}"

cat "${BASE}/reports/kill-switch-report.txt" >> "${AUDIT_FILE}"

echo "" >> "${AUDIT_FILE}"

echo "[PASS] Kill-switch audit persisted"
