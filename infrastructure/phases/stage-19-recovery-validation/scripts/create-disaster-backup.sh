#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

BACKUP_DIR="${ROOT_DIR}/state/snapshots/disaster-recovery"

mkdir -p "${BACKUP_DIR}"

TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"

echo "========================================="
echo "CREATE DISASTER RECOVERY BACKUP"
echo "========================================="

echo "[Backup] Capturing namespace topology"

kubectl get namespaces -o yaml \
  > "${BACKUP_DIR}/namespaces-${TIMESTAMP}.yaml"

echo "[Backup] Capturing workload manifests"

kubectl get all --all-namespaces -o yaml \
  > "${BACKUP_DIR}/cluster-workloads-${TIMESTAMP}.yaml"

echo "[Backup] Capturing PVC manifests"

kubectl get pvc --all-namespaces -o yaml \
  > "${BACKUP_DIR}/cluster-pvc-${TIMESTAMP}.yaml"

echo "[Backup] Capturing PV manifests"

kubectl get pv -o yaml \
  > "${BACKUP_DIR}/cluster-pv-${TIMESTAMP}.yaml"

echo "[Backup] Disaster recovery backup complete"

echo "========================================="
