#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$HOME/corei"

echo "========================================="
echo "Stage 05 Kubernetes Platform Setup"
echo "========================================="

"$ROOT_DIR/scripts/kubernetes/install-kubernetes.sh"

echo
echo "Initializing Kubernetes cluster..."

sudo kubeadm init \
--config "$ROOT_DIR/kubernetes/cluster-config/kubeadm-config.yaml"

mkdir -p "$HOME/.kube"

sudo cp \
/etc/kubernetes/admin.conf \
"$HOME/.kube/config"

sudo chown \
$(id -u):$(id -g) \
"$HOME/.kube/config"

echo
echo "Removing control-plane taint..."

kubectl taint nodes \
--all \
node-role.kubernetes.io/control-plane- || true

"$ROOT_DIR/scripts/kubernetes/install-calico.sh"

echo
echo "Applying namespace governance..."

kubectl apply -f \
"$ROOT_DIR/kubernetes/namespaces/all-namespaces.yaml"

echo
echo "Applying RBAC governance..."

kubectl apply -f \
"$ROOT_DIR/kubernetes/rbac/"

echo
echo "Applying network policies..."

kubectl apply -f \
"$ROOT_DIR/kubernetes/network-policies/"

echo
echo "Applying resource quotas..."

kubectl apply -f \
"$ROOT_DIR/kubernetes/resource-quotas/"

echo
echo "Applying priority classes..."

kubectl apply -f \
"$ROOT_DIR/kubernetes/priority-classes/"

echo
echo "Applying service accounts..."

kubectl apply -f \
"$ROOT_DIR/kubernetes/service-accounts/"

echo
echo "Updating Helm repositories..."

helm repo update || true

echo
echo "Stage 05 setup completed."
