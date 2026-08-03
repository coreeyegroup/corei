#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

echo "[INFO] Installing Redis..."

kubectl apply \
  -f "${ROOT_DIR}/kubernetes/storage/redis-secret.yaml"

kubectl apply \
  -f "${ROOT_DIR}/kubernetes/storage/redis-statefulset.yaml"

kubectl rollout status \
  statefulset/redis \
  -n database \
  --timeout=300s

echo "[PASS] Redis deployment completed"
