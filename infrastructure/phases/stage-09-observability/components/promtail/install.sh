#!/bin/bash

set -e

echo ""
echo "Installing Promtail..."
echo ""

helm upgrade --install promtail grafana/promtail \
  --namespace observability \
  -f infrastructure/phases/stage-09-observability/values/promtail-values.yaml

echo ""
echo "Promtail Installation Complete"
echo ""
