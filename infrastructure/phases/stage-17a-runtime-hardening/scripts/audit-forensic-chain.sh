#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

AUDIT_FILE="${BASE}/reports/forensic-chain-audit.log"

echo "======================================================" >> "${AUDIT_FILE}"
echo "FORENSIC CHAIN AUDIT $(date --iso-8601=seconds)" >> "${AUDIT_FILE}"
echo "======================================================" >> "${AUDIT_FILE}"

cat "${BASE}/reports/forensic-chain-validation.txt" >> "${AUDIT_FILE}"

echo "" >> "${AUDIT_FILE}"

echo "[PASS] Forensic chain audit persisted"
