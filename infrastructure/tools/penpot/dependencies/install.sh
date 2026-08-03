#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

kubectl apply -f "${ROOT_DIR}/../manifests/tools-namespace.yaml"

kubectl apply -f "${ROOT_DIR}/manifests/penpot-postgres-secret.yaml"
kubectl apply -f "${ROOT_DIR}/manifests/penpot-postgres-pvc.yaml"
kubectl apply -f "${ROOT_DIR}/manifests/penpot-postgres-deployment.yaml"
kubectl apply -f "${ROOT_DIR}/manifests/penpot-postgres-service.yaml"

kubectl apply -f "${ROOT_DIR}/manifests/penpot-redis-secret.yaml"
kubectl apply -f "${ROOT_DIR}/manifests/penpot-redis-pvc.yaml"
kubectl apply -f "${ROOT_DIR}/manifests/penpot-redis-deployment.yaml"
kubectl apply -f "${ROOT_DIR}/manifests/penpot-redis-service.yaml"
