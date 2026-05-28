#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17-paper-trading-validation"

AUDIT_FILE="${BASE}/reports/lineage-audit.log"

echo "======================================================" >> "${AUDIT_FILE}"
echo "LINEAGE AUDIT $(date --iso-8601=seconds)" >> "${AUDIT_FILE}"
echo "======================================================" >> "${AUDIT_FILE}"

cat "${BASE}/reports/lineage-report.txt" >> "${AUDIT_FILE}"

echo "" >> "${AUDIT_FILE}"

echo "[PASS] Lineage audit persisted"
