#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Stage 05 Kubernetes Validation"
echo "========================================="

kubectl get nodes

echo
kubectl get pods -n kube-system

echo
kubectl get namespaces --show-labels

echo
kubectl get networkpolicies -A

echo
kubectl get resourcequotas -A

echo
kubectl cluster-info

echo
echo "STAGE 05 VALIDATION: PASS"
