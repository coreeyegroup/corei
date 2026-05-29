#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../../.. && pwd)"

AUDIT_DIR="${ROOT_DIR}/infrastructure/phases/stage-21-production-hardening/reports"

TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"

mkdir -p "${AUDIT_DIR}"

OUTPUT="${AUDIT_DIR}/stage21a-audit-${TIMESTAMP}.txt"

{
  echo "=================================================="
  echo "STAGE-21A AUDIT"
  echo "=================================================="

  echo
  echo "DATE:"
  date -u

  echo
  echo "KUBERNETES CLIENT VERSION:"
  kubectl version --client 2>/dev/null || true

  echo
  echo "NODES:"
  kubectl get nodes -o wide || true

  echo
  echo "NAMESPACES:"
  kubectl get ns || true

  echo
  echo "PERSISTENT VOLUMES:"
  kubectl get pv || true

  echo
  echo "PERSISTENT VOLUME CLAIMS:"
  kubectl get pvc -A || true

  echo
  echo "INGRESS:"
  kubectl get ingress -A || true

  echo
  echo "SERVICES:"
  kubectl get svc -A || true

  echo
  echo "FALCO:"
  kubectl get pods -n falco || true

  echo
  echo "VAULT:"
  kubectl get pods -n vault || true

  echo
  echo "KAFKA:"
  kubectl get pods -n kafka || true

} > "${OUTPUT}"

echo "[PASS] Audit written to:"
echo "${OUTPUT}"
