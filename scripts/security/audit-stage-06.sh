#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"
AUDIT_DIR="$ROOT_DIR/infrastructure/state/stage-06/audit"

mkdir -p "$AUDIT_DIR"

echo "========================================="
echo "Stage 06 Security Authority Audit"
echo "========================================="

find \
"$ROOT_DIR/infrastructure/components" \
-maxdepth 1 \
-type d | sort \
> "$AUDIT_DIR/security-components.txt"

find \
"$ROOT_DIR/kubernetes/security" \
-maxdepth 2 \
-type d | sort \
> "$AUDIT_DIR/security-topology.txt"

find \
"$ROOT_DIR/scripts/security" \
-type f | sort \
> "$AUDIT_DIR/security-scripts.txt"

kubectl get ns \
> "$AUDIT_DIR/cluster-namespaces.txt" || true

kubectl get pods -A \
> "$AUDIT_DIR/all-security-pods.txt" || true

kubectl get peerauthentication -A \
> "$AUDIT_DIR/mtls-policies.txt" 2>/dev/null || true

kubectl get clusterissuers \
> "$AUDIT_DIR/cert-issuers.txt" 2>/dev/null || true

kubectl get validatingwebhookconfigurations \
> "$AUDIT_DIR/admission-webhooks.txt" 2>/dev/null || true

helm repo list \
> "$AUDIT_DIR/helm-security-repositories.txt" || true

kubectl get storageclass \
> "$AUDIT_DIR/storage-classes.txt" || true

find \
"$ROOT_DIR/infrastructure" \
-maxdepth 1 \
-type d | sort \
> "$AUDIT_DIR/stage-topology.txt"

echo
echo "Audit complete:"
find "$AUDIT_DIR" -type f | sort
