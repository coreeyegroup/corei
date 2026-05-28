#!/bin/bash

set -e

echo "[Stage-14A] Validating runtime readiness..."

PORTS=(
8080
8081
8082
8083
8084
)

for port in "${PORTS[@]}"
do

    if curl -s http://localhost:$port/health/ready | grep READY > /dev/null
    then
        echo "[PASS] Port $port READY"
    else
        echo "[FAIL] Port $port NOT READY"
        exit 1
    fi

done

echo "[Stage-14A] Runtime readiness validation PASSED"
