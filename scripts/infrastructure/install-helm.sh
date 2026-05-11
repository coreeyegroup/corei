#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Installing Helm"
echo "========================================="

curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 \
| bash

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo add metallb https://metallb.github.io/metallb
helm repo add longhorn https://charts.longhorn.io

helm repo update

echo
echo "Helm installation completed."

helm version
