#!/bin/bash

set -e

echo "========================================="
echo "CORE PLATFORM HEALTH VALIDATION"
echo "========================================="

echo ""
echo "[1] NODE STATUS"
kubectl get nodes -o wide

echo ""
echo "[2] NON-RUNNING PODS"
kubectl get pods -A | grep -Ev 'Running|Completed' || true

echo ""
echo "[3] LONGHORN STATUS"
kubectl get pods -n longhorn-system

echo ""
echo "[4] OBSERVABILITY STATUS"
kubectl get pods -n observability

echo ""
echo "[5] CICD STATUS"
kubectl get pods -n cicd

echo ""
echo "[6] STORAGE STATUS"
kubectl get pvc -A

echo ""
echo "[7] INGRESS STATUS"
kubectl get gateways -A || true
kubectl get virtualservices -A || true

echo ""
echo "[8] RESOURCE UTILIZATION"
kubectl top node || true

echo ""
echo "========================================="
echo "PLATFORM HEALTH CHECK COMPLETE"
echo "========================================="
