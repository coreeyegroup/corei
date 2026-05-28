#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

source "${ROOT_DIR}/runtime/python/testing/venv/bin/activate"

echo "=================================================="
echo "STARTING SIMULATION STACK"
echo "=================================================="

EXISTING_PID=$(lsof -ti :8081 || true)

if [ -n "${EXISTING_PID}" ]; then
    echo "Stopping existing broker on port 8081"

    kill "${EXISTING_PID}"

    sleep 1
fi

python tests/mock-services/brokers/mock-broker.py &
BROKER_PID=$!

sleep 1

if ! ps -p "${BROKER_PID}" > /dev/null 2>&1; then
    echo "Mock broker failed to start"
    exit 1
fi

echo "${BROKER_PID}" > \
"${ROOT_DIR}/state/stage-10a/runtime/mock-broker.pid"

python tests/mock-services/market-data/synthetic-market-generator.py

echo "Mock Broker PID: ${BROKER_PID}"

echo ""
echo "Simulation stack initialized"
