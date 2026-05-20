#!/bin/bash

set -e

echo ""
echo "Configuring Grafana..."
echo ""

kubectl create configmap grafana-datasources \
  --from-file=infrastructure/phases/stage-09-observability/grafana/provisioning/datasources \
  -n observability \
  --dry-run=client -o yaml | kubectl apply -f -

kubectl create configmap grafana-dashboards \
  --from-file=infrastructure/phases/stage-09-observability/grafana/dashboards \
  -n observability \
  --dry-run=client -o yaml | kubectl apply -f -

kubectl apply -f infrastructure/phases/stage-09-observability/grafana/grafana-deployment.yaml

kubectl rollout restart deployment/grafana -n observability

kubectl rollout status deployment/grafana -n observability

echo ""
echo "Grafana Configuration Complete"
echo ""
