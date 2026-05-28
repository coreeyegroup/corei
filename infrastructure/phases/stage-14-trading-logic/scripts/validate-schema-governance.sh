#!/bin/bash

set -e

echo "[Stage-14] Validating schema governance..."

SCHEMAS=(
"schemas/screening/InstrumentScreened_v1.avsc"
"schemas/monitoring/InstrumentMonitorEvent_v1.avsc"
"schemas/signal/Signal_v1.avsc"
"schemas/trade_intent/TradeIntent_v1.avsc"
)

for schema in "${SCHEMAS[@]}"
do
    if [ -f "$schema" ]; then
        echo "[PASS] Schema exists: $(basename "$schema")"
    else
        echo "[FAIL] Missing schema: $schema"
        exit 1
    fi
done

echo "[Stage-14] Schema governance validation PASSED"
