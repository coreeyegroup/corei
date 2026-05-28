#!/bin/bash

set -e

echo "[Stage-14A] Operational reconciliation setup initialized"

REQUIRED_SERVICES=(
instrument-screening-service
instrument-monitoring-service
strategy-engine-service
signal-processor-service
decision-engine-service
)

for service in "${REQUIRED_SERVICES[@]}"
do
    if [ -d "core_platform/services/$service" ]; then
        echo "[PASS] Service topology exists: $service"
    else
        echo "[FAIL] Missing service topology: $service"
        exit 1
    fi
done

echo "[Stage-14A] Operational lifecycle topology verified"
