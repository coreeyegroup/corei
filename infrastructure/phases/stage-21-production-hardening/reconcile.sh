#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../../.. && pwd)"
REPORT_DIR="${ROOT_DIR}/infrastructure/phases/stage-21-production-hardening/reports"
LOG_DIR="${ROOT_DIR}/infrastructure/phases/stage-21-production-hardening/logs"

TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"

mkdir -p "${REPORT_DIR}"
mkdir -p "${LOG_DIR}"

LOG_FILE="${LOG_DIR}/reconcile-${TIMESTAMP}.log"

exec > >(tee -a "${LOG_FILE}") 2>&1

echo "=================================================="
echo "STAGE-21 GOVERNANCE RECONCILIATION"
echo "=================================================="

echo "[INFO] Collecting cluster topology..."
kubectl get nodes -o wide \
  > "${REPORT_DIR}/nodes-${TIMESTAMP}.txt"

echo "[INFO] Collecting namespace inventory..."
kubectl get namespaces \
  > "${REPORT_DIR}/namespaces-${TIMESTAMP}.txt"

echo "[INFO] Collecting pod inventory..."
kubectl get pods -A -o wide \
  > "${REPORT_DIR}/pods-${TIMESTAMP}.txt"

echo "[INFO] Collecting ingress exposure..."
kubectl get ingress -A \
  > "${REPORT_DIR}/ingress-${TIMESTAMP}.txt"

echo "[INFO] Collecting service exposure..."
kubectl get svc -A \
  > "${REPORT_DIR}/services-${TIMESTAMP}.txt"

echo "[INFO] Collecting daemonsets..."
kubectl get daemonsets -A \
  > "${REPORT_DIR}/daemonsets-${TIMESTAMP}.txt"

echo "[INFO] Collecting deployments..."
kubectl get deployments -A \
  > "${REPORT_DIR}/deployments-${TIMESTAMP}.txt"

echo "[INFO] Collecting statefulsets..."
kubectl get statefulsets -A \
  > "${REPORT_DIR}/statefulsets-${TIMESTAMP}.txt"

echo "[INFO] Collecting PVC inventory..."
kubectl get pvc -A \
  > "${REPORT_DIR}/pvc-${TIMESTAMP}.txt"

echo "[INFO] Collecting storage classes..."
kubectl get storageclass \
  > "${REPORT_DIR}/storageclass-${TIMESTAMP}.txt"

echo "[INFO] Collecting Kafka topology..."
kubectl get pods -n kafka \
  > "${REPORT_DIR}/kafka-runtime-${TIMESTAMP}.txt"

echo "[INFO] Collecting Vault topology..."
kubectl get pods -n vault \
  > "${REPORT_DIR}/vault-runtime-${TIMESTAMP}.txt"

echo "[INFO] Collecting Falco topology..."
kubectl get pods -n falco \
  > "${REPORT_DIR}/falco-runtime-${TIMESTAMP}.txt"

echo "[INFO] Collecting PSA labels..."
kubectl get ns --show-labels \
  > "${REPORT_DIR}/psa-labels-${TIMESTAMP}.txt"

echo "[INFO] Collecting exposed ports..."
ss -tulpn \
  > "${REPORT_DIR}/host-ports-${TIMESTAMP}.txt"

echo "[INFO] Collecting firewall state..."
sudo ufw status verbose \
  > "${REPORT_DIR}/ufw-${TIMESTAMP}.txt" || true

echo "[INFO] Collecting Harbor images..."
kubectl get pods -n harbor \
  > "${REPORT_DIR}/harbor-runtime-${TIMESTAMP}.txt"

echo "[INFO] Collecting ArgoCD applications..."
kubectl get applications -n argocd --ignore-not-found \
  > "${REPORT_DIR}/argocd-apps-${TIMESTAMP}.txt" || true

echo "[INFO] Collecting cert-manager inventory..."
kubectl get certificates -A --ignore-not-found \
  > "${REPORT_DIR}/certificates-${TIMESTAMP}.txt" || true

echo "[INFO] Reconciliation completed successfully."
