#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

echo "[INFO] Installing PostgreSQL StatefulSet..."

kubectl apply -f "${ROOT_DIR}/kubernetes/storage/postgres-statefulset.yaml"

kubectl rollout status statefulset/postgres -n storage
