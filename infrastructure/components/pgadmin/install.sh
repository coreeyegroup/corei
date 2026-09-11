#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"

echo "========================================="
echo "Installing pgAdmin"
echo "========================================="

kubectl apply -f \
  "${ROOT_DIR}/kubernetes/database/pgadmin/pgadmin.yaml"

kubectl apply -f \
  "${ROOT_DIR}/kubernetes/database/pgadmin/pgadmin-service.yaml"

kubectl apply -f \
  "${ROOT_DIR}/kubernetes/database/pgadmin/pgadmin-nodeport.yaml"

echo
echo "Waiting for pgAdmin readiness..."

kubectl rollout status deployment/pgadmin \
  -n database \
  --timeout=600s

echo
echo "pgAdmin deployment operational."

kubectl get pods -n database -l app=pgadmin
kubectl get svc -n database pgadmin pgadmin-nodeport
