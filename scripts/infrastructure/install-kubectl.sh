#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Installing kubectl"
echo "========================================="

curl -LO \
"https://dl.k8s.io/release/v1.29.0/bin/linux/amd64/kubectl"

sudo install -o root -g root -m 0755 \
kubectl /usr/local/bin/kubectl

rm -f kubectl

echo
echo "kubectl installation completed."

kubectl version --client
