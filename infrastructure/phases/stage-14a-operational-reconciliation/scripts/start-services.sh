#!/bin/bash

set -e

echo "[Stage-14A] Starting trading-logic services..."

REPO_ROOT=$(pwd)

export PYTHONPATH=$REPO_ROOT

SERVICES=(
"instrument-screening-service:8080"
"instrument-monitoring-service:8081"
"strategy-engine-service:8082"
"signal-processor-service:8083"
"decision-engine-service:8084"
)

for entry in "${SERVICES[@]}"
do

    SERVICE=$(echo $entry | cut -d':' -f1)
    PORT=$(echo $entry | cut -d':' -f2)

    echo ""
    echo "[Stage-14A] Starting runtime: $SERVICE"

    nohup env PYTHONPATH=$REPO_ROOT \
    python3 \
    core_platform/services/$SERVICE/app/main.py \
    > runtime/stage-14/logs/$SERVICE-main.log 2>&1 &

    MAIN_PID=$!

    echo $MAIN_PID \
    > runtime/stage-14/pids/$SERVICE-main.pid

    sleep 1

    echo "[Stage-14A] Starting health server: $SERVICE"

    nohup env PYTHONPATH=$REPO_ROOT \
    python3 \
    core_platform/services/$SERVICE/app/health.py \
    > runtime/stage-14/logs/$SERVICE-health.log 2>&1 &

    HEALTH_PID=$!

    echo $HEALTH_PID \
    > runtime/stage-14/pids/$SERVICE-health.pid

    sleep 3

    if curl -s http://localhost:$PORT/health/ready | grep READY > /dev/null
    then
        echo "[PASS] $SERVICE ready on port $PORT"
    else
        echo "[FAIL] $SERVICE readiness failed"

        echo "[INFO] Runtime log:"
        tail -20 runtime/stage-14/logs/$SERVICE-main.log || true

        echo "[INFO] Health log:"
        tail -20 runtime/stage-14/logs/$SERVICE-health.log || true

        exit 1
    fi

done

echo ""
echo "[Stage-14A] All trading-logic services operational"
