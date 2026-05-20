#!/bin/bash

set -e

echo ""
echo "Installing Prometheus Stack..."
echo ""

helm upgrade --install kube-prometheus-stack prometheus-community/kube-prometheus-stack \
  --namespace observability \
  -f infrastructure/phases/stage-09-observability/values/prometheus-values.yaml

echo ""
echo "Prometheus Stack Installation Complete"
echo ""
