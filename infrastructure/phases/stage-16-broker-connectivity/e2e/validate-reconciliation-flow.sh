#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — RECONCILIATION FLOW VALIDATION"
echo "=================================================="

RESPONSE=$(curl -s -X POST http://localhost:8005/reconcile \
-H "Content-Type: application/json" \
-d '{
  "signal_id":"signal-001",
  "trade_intent_id":"trade-001",
  "execution_intent_id":"exec-001",
  "order_id":"ord-001",
  "broker_order_id":"ord-001",
  "fill_id":"fill-001",
  "fill_lineage_hash":"hash-001",
  "account_id":"acct-001"
}')

echo "${RESPONSE}" | grep MATCHED >/dev/null

echo "[PASS] reconciliation matched"

echo
echo "=================================================="
echo "RECONCILIATION FLOW VALIDATION PASSED"
echo "=================================================="
