#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "VALIDATE OMS CONTINUITY"
echo "========================================="

echo "[OMS] Validating OMS deployment health"

kubectl rollout status deployment/oms \
  -n trading-infra \
  --timeout=120s

echo "[OMS] Validating OMS pod state"

kubectl get pods -n trading-infra | grep oms

echo "[PASS] OMS continuity validation successful"

echo "========================================="
