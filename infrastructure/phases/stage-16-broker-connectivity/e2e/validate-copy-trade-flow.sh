#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — COPY TRADE FLOW VALIDATION"
echo "=================================================="

RESPONSE=$(curl -s -X POST http://localhost:8006/propagate \
-H "Content-Type: application/json" \
-d '{
  "signal_id":"signal-001",
  "trade_intent_id":"trade-001",
  "execution_intent_id":"exec-001",
  "order_id":"ord-001",
  "fill_id":"fill-001",
  "master_lot":1,
  "master_equity":10000,
  "followers":[
    {
      "account_id":"follower-001",
      "equity":5000
    },
    {
      "account_id":"follower-002",
      "equity":20000
    }
  ]
}')

echo "${RESPONSE}" | grep DISPATCHED >/dev/null

echo "[PASS] follower propagation"

echo
echo "=================================================="
echo "COPY TRADE FLOW VALIDATION PASSED"
echo "=================================================="
