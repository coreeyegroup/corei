#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Installing Calico CNI"
echo "========================================="

kubectl apply -f \
https://raw.githubusercontent.com/projectcalico/calico/v3.27.0/manifests/calico.yaml

echo
echo "Waiting for kube-system pods..."

kubectl wait \
  --for=condition=Ready pod \
  --all \
  -n kube-system \
  --timeout=300s

echo
echo "Calico installation completed."
