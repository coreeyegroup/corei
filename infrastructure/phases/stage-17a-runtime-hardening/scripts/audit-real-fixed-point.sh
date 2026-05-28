#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

AUDIT_FILE="${BASE}/reports/real-fixed-point-audit.log"

echo "======================================================" >> "${AUDIT_FILE}"
echo "REAL FIXED-POINT AUDIT $(date --iso-8601=seconds)" >> "${AUDIT_FILE}"
echo "======================================================" >> "${AUDIT_FILE}"

cat "${BASE}/reports/real-fixed-point-validation.txt" >> "${AUDIT_FILE}"

echo "" >> "${AUDIT_FILE}"

echo "[PASS] Real fixed-point audit persisted"
