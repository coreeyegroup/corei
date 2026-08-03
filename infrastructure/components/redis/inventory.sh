#!/usr/bin/env bash

set -euo pipefail

echo "===== REDIS INVENTORY ====="

kubectl get pods -n database | grep redis || true

kubectl get pvc -n database | grep redis || true

kubectl get statefulset -n database | grep redis || true
