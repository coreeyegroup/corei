#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../.. && pwd)"

PID_FILE="${ROOT_DIR}/state/stage-10a/runtime/mock-broker.pid"

if [ ! -f "${PID_FILE}" ]; then
    echo "No PID file found"
    exit 0
fi

BROKER_PID=$(cat "${PID_FILE}")

if ps -p "${BROKER_PID}" > /dev/null 2>&1; then
    kill "${BROKER_PID}"
    echo "Stopped mock broker PID ${BROKER_PID}"
else
    echo "Broker process already stopped"
fi

rm -f "${PID_FILE}"

echo "Simulation stack cleanup complete"
