#!/bin/bash

set -e

echo ""
echo "========================================"
echo "CORE EYE OBSERVABILITY SETUP"
echo "========================================"
echo ""

echo "[1/6] Applying Prometheus alert rules..."
kubectl apply -f infrastructure/phases/stage-09-observability/alerts/trading-alerts.yaml

kubectl apply -f infrastructure/phases/stage-09-observability/alerts/kafka-alerts.yaml

kubectl apply -f infrastructure/phases/stage-09-observability/alerts/infra-alerts.yaml

kubectl apply -f infrastructure/phases/stage-09-observability/alerts/db-alerts.yaml

echo ""
echo "[2/6] Rebuilding Grafana dashboards configmap..."
kubectl create configmap grafana-dashboards \
  --from-file=infrastructure/phases/stage-09-observability/grafana/dashboards \
  -n observability \
  --dry-run=client -o yaml | kubectl apply -f -

echo ""
echo "[3/6] Rebuilding Grafana datasources configmap..."
kubectl create configmap grafana-datasources \
  --from-file=infrastructure/phases/stage-09-observability/grafana/provisioning/datasources \
  -n observability \
  --dry-run=client -o yaml | kubectl apply -f -

echo ""
echo "[4/6] Restarting Grafana..."
kubectl rollout restart deployment/grafana -n observability

echo ""
echo "[5/6] Restarting Alertmanager..."
kubectl rollout restart statefulset alertmanager-kube-prometheus-stack-alertmanager -n observability

echo ""
echo "[6/6] Running validation..."
./infrastructure/phases/stage-09-observability/validate.sh

echo ""
echo "========================================"
echo "OBSERVABILITY SETUP COMPLETE"
echo "========================================"
echo ""
