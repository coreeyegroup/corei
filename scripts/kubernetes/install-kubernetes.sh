#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Installing Kubernetes 1.29 Runtime"
echo "========================================="

sudo apt-get update

sudo apt-get install -y --allow-downgrades --allow-change-held-packages \
apt-transport-https \
ca-certificates \
curl \
gpg

sudo mkdir -p /etc/apt/keyrings

curl -fsSL \
https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key \
| sudo gpg --dearmor \
-o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

echo \
'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' \
| sudo tee /etc/apt/sources.list.d/kubernetes.list

sudo apt-get update

sudo apt-get install -y --allow-downgrades --allow-change-held-packages \
kubelet=1.29.0-* \
kubeadm=1.29.0-* \
kubectl=1.29.0-*

sudo apt-mark hold \
kubelet \
kubeadm \
kubectl

echo
echo "Kubernetes installation completed."

kubectl version --client || true
kubeadm version || true
