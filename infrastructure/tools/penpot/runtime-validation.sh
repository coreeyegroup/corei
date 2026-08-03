#!/usr/bin/env bash
set -euo pipefail

echo "===== PENPOT SERVICE ====="
kubectl get svc penpot -n tools

echo
echo "===== PENPOT FRONTEND ENV ====="
kubectl exec -n tools deploy/penpot-frontend -- \
env | grep PENPOT_PUBLIC_URI

echo
echo "===== PENPOT CONFIG JS ====="
curl -s http://192.168.1.10:30822/js/config.js

echo
echo "===== PENPOT PODS ====="
kubectl get pods -n tools
