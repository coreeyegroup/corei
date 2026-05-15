#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

echo "[INFO] Installing Redis StatefulSet..."

kubectl apply -f "${ROOT_DIR}/kubernetes/storage/redis-statefulset.yaml"

kubectl rollout status statefulset/redis -n storage
