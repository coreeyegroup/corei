#!/usr/bin/env bash

set -euo pipefail

TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"

BACKUP_DIR="${HOME}/stage21a-backups/${TIMESTAMP}"

mkdir -p "${BACKUP_DIR}"

echo "[INFO] Exporting Kubernetes objects..."

kubectl get all -A -o yaml \
  > "${BACKUP_DIR}/cluster-all.yaml"

kubectl get cm -A -o yaml \
  > "${BACKUP_DIR}/configmaps.yaml"

kubectl get secrets -A -o yaml \
  > "${BACKUP_DIR}/secrets.yaml"

kubectl get pvc -A -o yaml \
  > "${BACKUP_DIR}/pvc.yaml"

echo "[PASS] Backup completed:"
echo "${BACKUP_DIR}"
