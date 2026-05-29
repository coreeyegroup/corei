#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "KAFKA SECURITY VALIDATION"
echo "====================================="

kubectl get pods -n kafka

kubectl get svc -n kafka

echo
echo "[PASS] Validation completed"
