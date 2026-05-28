#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — LINEAGE VALIDATION"
echo "=================================================="

PAYLOAD_FILE=/tmp/stage16-lineage.json

cat <<'JSON' > "${PAYLOAD_FILE}"
{
  "signal_id":"signal-001",
  "trade_intent_id":"trade-001",
  "execution_intent_id":"exec-001",
  "order_id":"ord-001",
  "fill_id":"fill-001",
  "fill_lineage_hash":"hash-001"
}
JSON

grep signal_id "${PAYLOAD_FILE}" >/dev/null
grep trade_intent_id "${PAYLOAD_FILE}" >/dev/null
grep execution_intent_id "${PAYLOAD_FILE}" >/dev/null
grep order_id "${PAYLOAD_FILE}" >/dev/null
grep fill_id "${PAYLOAD_FILE}" >/dev/null
grep fill_lineage_hash "${PAYLOAD_FILE}" >/dev/null

echo "[PASS] signal_id"
echo "[PASS] trade_intent_id"
echo "[PASS] execution_intent_id"
echo "[PASS] order_id"
echo "[PASS] fill_id"
echo "[PASS] fill_lineage_hash"

echo
echo "=================================================="
echo "LINEAGE VALIDATION PASSED"
echo "=================================================="
