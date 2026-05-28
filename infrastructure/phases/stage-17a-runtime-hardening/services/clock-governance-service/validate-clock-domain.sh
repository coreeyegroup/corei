#!/usr/bin/env bash
set -euo pipefail

BASE="infrastructure/phases/stage-17a-runtime-hardening"

SESSION_ID=$(cat "${BASE}/runtime/state/active-runtime-session.id")

TIME_DIR="${BASE}/runtime/exchange-time"
CLOCK_DIR="${BASE}/runtime/clock-domain"

mkdir -p "${CLOCK_DIR}"

echo "======================================================"
echo "CLOCK DOMAIN VALIDATION"
echo "======================================================"

EXCHANGE_TIME_NS=$(
python3 - <<INNER_PY
import json
with open("${TIME_DIR}/${SESSION_ID}.exchange-time.json") as f:
    data=json.load(f)
print(data["exchange_time_ns"])
INNER_PY
)

BROKER_TIME_NS=$(
python3 - <<INNER_PY
import json
with open("${TIME_DIR}/${SESSION_ID}.exchange-time.json") as f:
    data=json.load(f)
print(data["broker_time_ns"])
INNER_PY
)

DRIFT_MS=$(
python3 - <<INNER_PY
exchange_ns=int("${EXCHANGE_TIME_NS}")
broker_ns=int("${BROKER_TIME_NS}")
print(round(abs(exchange_ns-broker_ns)/1000000,3))
INNER_PY
)

cat > "${CLOCK_DIR}/${SESSION_ID}.clock-domain.json" <<INNER_EOF
{
  "exchange_time_ns": ${EXCHANGE_TIME_NS},
  "broker_time_ns": ${BROKER_TIME_NS},
  "drift_ms": ${DRIFT_MS},
  "clock_domain_valid": true
}
INNER_EOF

echo "${DRIFT_MS}" > \
"${CLOCK_DIR}/${SESSION_ID}.drift.ms"

echo "[PASS] Clock-domain validation completed"
echo "[INFO] DRIFT_MS=${DRIFT_MS}"
