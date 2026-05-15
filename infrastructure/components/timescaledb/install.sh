#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

echo "[INFO] Installing TimescaleDB StatefulSet..."

kubectl apply -f "${ROOT_DIR}/kubernetes/storage/timescaledb-statefulset.yaml"

kubectl rollout status statefulset/timescaledb -n storage
