#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

OUTPUT_DIR="${ROOT_DIR}/state/pre-recovery/k8s"

mkdir -p "${OUTPUT_DIR}"

TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"

echo "[Snapshot] Capturing Kubernetes workload state"

kubectl get all --all-namespaces -o yaml \
  > "${OUTPUT_DIR}/cluster-state-${TIMESTAMP}.yaml"

kubectl get pvc --all-namespaces -o yaml \
  > "${OUTPUT_DIR}/pvc-state-${TIMESTAMP}.yaml"

kubectl get pv -o yaml \
  > "${OUTPUT_DIR}/pv-state-${TIMESTAMP}.yaml"

echo "[Snapshot] Kubernetes state captured"
