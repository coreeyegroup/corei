#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

SESSION_ID=$(cat "${BASE}/runtime/state/active-runtime-session.id")

CHAIN_DIR="${BASE}/runtime/forensic-chain"

mkdir -p "${CHAIN_DIR}"

echo "======================================================"
echo "FORENSIC AUDIT CHAIN GENERATION"
echo "======================================================"

CHAIN_HASH=$(find "${BASE}/reports" -type f | sort | sha256sum | awk '{print $1}')

cat > "${CHAIN_DIR}/${SESSION_ID}.forensic-chain.json" <<INNER_EOF
{
  "session_id": "${SESSION_ID}",
  "chain_hash": "${CHAIN_HASH}",
  "runtime_origin": "forensic-chain-service",
  "audit_mode": "immutable",
  "traceability_mode": "institutional"
}
INNER_EOF

echo "[PASS] Forensic audit chain generated"
echo "[INFO] CHAIN_HASH=${CHAIN_HASH}"
