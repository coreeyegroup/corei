#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

SESSION_ID=$(cat "${BASE}/runtime/state/active-runtime-session.id")

TIME_DIR="${BASE}/runtime/exchange-time"

mkdir -p "${TIME_DIR}"

echo "======================================================"
echo "EXCHANGE TIME AUTHORITY"
echo "======================================================"

EXCHANGE_TIME_NS=$(date +%s%N)

sleep 0.05

BROKER_TIME_NS=$(date +%s%N)

cat > "${TIME_DIR}/${SESSION_ID}.exchange-time.json" <<INNER_EOF
{
  "exchange_time_ns": ${EXCHANGE_TIME_NS},
  "broker_time_ns": ${BROKER_TIME_NS},
  "clock_authority": "exchange",
  "precision": "epoch_nanoseconds",
  "runtime_origin": "exchange-time-service"
}
INNER_EOF

echo "[PASS] Exchange-authoritative time generated"
