#!/bin/bash

echo ""
echo "========================================"
echo "CORE EYE OBSERVABILITY ROLLBACK"
echo "========================================"
echo ""

echo "Rollback governance is manual."

echo ""
echo "Helm rollback examples:"
echo ""

echo "helm history kube-prometheus-stack -n observability"
echo "helm rollback kube-prometheus-stack <REVISION> -n observability"

echo ""
echo "helm history loki -n observability"
echo "helm rollback loki <REVISION> -n observability"

echo ""
echo "kubectl rollout undo deployment/grafana -n observability"
echo ""
