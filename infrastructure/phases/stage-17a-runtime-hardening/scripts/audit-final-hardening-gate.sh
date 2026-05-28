#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

AUDIT_FILE="${BASE}/reports/final-hardening-gate-audit.log"

echo "======================================================" >> "${AUDIT_FILE}"
echo "FINAL HARDENING GATE AUDIT $(date --iso-8601=seconds)" >> "${AUDIT_FILE}"
echo "======================================================" >> "${AUDIT_FILE}"

cat "${BASE}/reports/final-hardening-gate-report.txt" >> "${AUDIT_FILE}"

echo "" >> "${AUDIT_FILE}"

echo "[PASS] Final hardening audit persisted"
