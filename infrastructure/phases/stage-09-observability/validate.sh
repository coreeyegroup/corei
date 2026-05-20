#!/bin/bash

set -e

echo ""
echo "========================================"
echo "CORE EYE OBSERVABILITY VALIDATION"
echo "========================================"
echo ""

echo "[1/10] Checking Prometheus rollout..."
kubectl rollout status statefulset/prometheus-kube-prometheus-stack-prometheus -n observability

echo ""
echo "[2/10] Checking Alertmanager rollout..."
kubectl rollout status statefulset/alertmanager-kube-prometheus-stack-alertmanager -n observability

echo ""
echo "[3/10] Checking Grafana rollout..."
kubectl rollout status deployment/grafana -n observability

echo ""
echo "[4/10] Checking Loki rollout..."
kubectl rollout status statefulset/loki -n observability

echo ""
echo "[5/10] Checking Jaeger rollout..."
kubectl rollout status deployment/jaeger -n observability

echo ""
echo "[6/10] Checking OpenTelemetry Collector rollout..."
kubectl rollout status deployment/otel-collector-opentelemetry-collector -n observability

echo ""
echo "[7/10] Checking PrometheusRule objects..."
kubectl get prometheusrules -n observability

echo ""
echo "[8/10] Checking Grafana dashboards..."
kubectl exec deployment/grafana -n observability -- ls /var/lib/grafana/dashboards

echo ""
echo "[9/10] Checking non-running pods..."

NON_RUNNING=$(kubectl get pods -n observability --no-headers | grep -v Running | grep -v Completed || true)

if [ -n "$NON_RUNNING" ]; then
  echo ""
  echo "ERROR: Non-running pods detected:"
  echo "$NON_RUNNING"
  exit 1
fi

echo ""
echo "[10/10] Checking Alertmanager health..."
kubectl get pods -n observability | grep alertmanager

echo ""
echo "========================================"
echo "OBSERVABILITY VALIDATION PASSED"
echo "========================================"
echo ""
