#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Validating pgAdmin"
echo "========================================="

kubectl rollout status deployment/pgadmin \
  -n database \
  --timeout=300s

kubectl get pods \
  -n database \
  -l app=pgadmin

kubectl get svc \
  -n database \
  pgadmin \
  pgadmin-nodeport

echo
echo "[PASS] pgAdmin operational."
