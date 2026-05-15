#!/usr/bin/env bash

set -euo pipefail

echo "[INFO] Validating storage runtime..."

kubectl get pods -n storage
kubectl get statefulsets -n storage
kubectl get deployments -n storage
