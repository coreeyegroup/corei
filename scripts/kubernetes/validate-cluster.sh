#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Kubernetes Cluster Validation"
echo "========================================="

kubectl get nodes -o wide

echo
kubectl get pods -n kube-system

echo
kubectl cluster-info

echo
echo "Cluster validation completed."
