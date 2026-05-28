#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

POST_DIR="${ROOT_DIR}/state/post-recovery"

mkdir -p "${POST_DIR}"

TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"

echo "[Post-Recovery] Capturing recovered Kubernetes state"

kubectl get all --all-namespaces -o yaml \
  > "${POST_DIR}/cluster-state-${TIMESTAMP}.yaml"

echo "[Post-Recovery] Capturing recovered PostgreSQL dump"

kubectl exec -n database deployment/timescaledb -- \
  pg_dumpall -U coreeye \
  > "${POST_DIR}/postgres-${TIMESTAMP}.sql"

echo "[Post-Recovery] Generating recovery hashes"

find "${POST_DIR}" -type f \
  -exec sha256sum {} \; \
  | sort \
  > "${POST_DIR}/recovery-hashes-${TIMESTAMP}.txt"

echo "[Post-Recovery] Recovery snapshot complete"
