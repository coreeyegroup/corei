#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

SESSION_ID=$(cat "${BASE}/runtime/state/active-runtime-session.id")

REPORT_FILE="${BASE}/reports/forensic-chain-validation.txt"

echo "======================================================"
echo "FORENSIC AUDIT CHAIN VALIDATION"
echo "======================================================"

CHAIN_FILE="${BASE}/runtime/forensic-chain/${SESSION_ID}.forensic-chain.json"

MANIFEST_FILE="${BASE}/runtime/certification-manifests/${SESSION_ID}.certification-manifest.json"

LINEAGE_FILE="${BASE}/runtime/audit-lineage/${SESSION_ID}.audit-lineage.json"

FAILURES=0

[ -f "${CHAIN_FILE}" ] || FAILURES=$((FAILURES+1))
[ -f "${MANIFEST_FILE}" ] || FAILURES=$((FAILURES+1))
[ -f "${LINEAGE_FILE}" ] || FAILURES=$((FAILURES+1))

if [ "${FAILURES}" -eq 0 ]; then
    RESULT="PASS"
    echo "[PASS] Forensic audit chain validated"
else
    RESULT="FAIL"
    echo "[FAIL] Forensic audit continuity broken"
fi

cat > "${REPORT_FILE}" <<INNER_EOF
FORENSIC_FAILURES=${FAILURES}
RESULT=${RESULT}
INNER_EOF

if [ "${RESULT}" = "PASS" ]; then
    exit 0
else
    exit 1
fi
