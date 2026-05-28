#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "VALIDATE SMART ORDER ROUTER CONTINUITY"
echo "========================================="

echo "[SOR] Checking smart-order-router rollout"

kubectl rollout status deployment/smart-order-router \
  -n execution \
  --timeout=120s

echo "[SOR] Checking smart-order-router pod state"

kubectl get pods -n execution | grep smart-order-router

echo "[PASS] Smart-order-router continuity validation successful"

echo "========================================="
