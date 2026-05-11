#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"
AUDIT_DIR="$ROOT_DIR/infrastructure/state/stage-05/audit"

mkdir -p "$AUDIT_DIR"

echo "========================================="
echo "Stage 05 Kubernetes Authority Audit"
echo "========================================="

kubectl version --client > \
"$AUDIT_DIR/kubectl-version.txt" 2>&1 || true

kubeadm version > \
"$AUDIT_DIR/kubeadm-version.txt" 2>&1 || true

kubectl get nodes -o wide > \
"$AUDIT_DIR/node-state.txt" 2>&1 || true

kubectl get namespaces --show-labels > \
"$AUDIT_DIR/namespaces.txt" 2>&1 || true

kubectl get pods -A -o wide > \
"$AUDIT_DIR/all-pods.txt" 2>&1 || true

kubectl get networkpolicies -A > \
"$AUDIT_DIR/network-policies.txt" 2>&1 || true

kubectl get resourcequotas -A > \
"$AUDIT_DIR/resource-quotas.txt" 2>&1 || true

kubectl get priorityclass > \
"$AUDIT_DIR/priority-classes.txt" 2>&1 || true

kubectl get pdb -A > \
"$AUDIT_DIR/pod-disruption-budgets.txt" 2>&1 || true

kubectl get sa -A > \
"$AUDIT_DIR/service-accounts.txt" 2>&1 || true

kubectl get storageclass > \
"$AUDIT_DIR/storage-classes.txt" 2>&1 || true

helm repo list > \
"$AUDIT_DIR/helm-repositories.txt" 2>&1 || true

find \
"$ROOT_DIR/kubernetes" \
-type d | sort \
> "$AUDIT_DIR/kubernetes-topology.txt"

find \
"$ROOT_DIR/scripts/kubernetes" \
-type f | sort \
> "$AUDIT_DIR/kubernetes-scripts.txt"

find \
"$ROOT_DIR/infrastructure/phases/stage-05-k8s-platform" \
-type f | sort \
> "$AUDIT_DIR/stage-05-lifecycle.txt"

echo
echo "Audit complete:"
find "$AUDIT_DIR" -type f | sort
