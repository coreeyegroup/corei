#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

echo "[INFO] Installing PgBouncer Deployment..."

kubectl apply -f "${ROOT_DIR}/kubernetes/storage/pgbouncer-deployment.yaml"

kubectl rollout status deployment/pgbouncer -n storage
