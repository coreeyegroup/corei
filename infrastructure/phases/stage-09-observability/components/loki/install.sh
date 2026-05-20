#!/bin/bash

set -e

echo ""
echo "Installing Loki..."
echo ""

helm upgrade --install loki grafana/loki \
  --namespace observability \
  -f infrastructure/phases/stage-09-observability/values/loki-values.yaml

kubectl scale statefulset loki-chunks-cache -n observability --replicas=0 || true

echo ""
echo "Loki Installation Complete"
echo ""
