#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17-paper-trading-validation"

AUDIT_FILE="${BASE}/reports/risk-enforcement-audit.log"

echo "======================================================" >> "${AUDIT_FILE}"
echo "RISK ENFORCEMENT AUDIT $(date --iso-8601=seconds)" >> "${AUDIT_FILE}"
echo "======================================================" >> "${AUDIT_FILE}"

cat "${BASE}/reports/risk-enforcement-report.txt" >> "${AUDIT_FILE}"

echo "" >> "${AUDIT_FILE}"

echo "[PASS] Risk enforcement audit persisted"
