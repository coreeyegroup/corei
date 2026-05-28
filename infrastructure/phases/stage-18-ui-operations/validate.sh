#!/usr/bin/env bash

set -euo pipefail

echo "[Stage-18.6] Validating workflow automation runtime"

kubectl wait \
  --for=condition=available \
  deployment/n8n \
  -n n8n \
  --timeout=180s >/dev/null

echo "[PASS] n8n deployment"

kubectl get svc n8n-service \
  -n n8n >/dev/null

echo "[PASS] n8n service"

kubectl get ingress n8n-ingress \
  -n n8n >/dev/null

echo "[PASS] n8n ingress"

N8N_POD=$(kubectl get pods \
  -n n8n \
  -l app=n8n \
  -o jsonpath="{.items[0].metadata.name}")

if [[ -z "${N8N_POD}" ]]; then
    echo "[FAIL] n8n pod missing"
    exit 1
fi

echo "[PASS] n8n pod detected"

N8N_STATUS=$(kubectl get pod \
  -n n8n \
  "${N8N_POD}" \
  -o jsonpath='{.status.phase}')

if [[ "${N8N_STATUS}" != "Running" ]]; then
    echo "[FAIL] n8n pod not running"
    exit 1
fi

echo "[PASS] n8n pod running"

echo "[PASS] Stage-18.6 validation complete"
