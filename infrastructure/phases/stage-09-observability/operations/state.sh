#!/bin/bash

echo ""
echo "========================================"
echo "CORE EYE OBSERVABILITY STATE"
echo "========================================"
echo ""

kubectl get pods -n observability

echo ""
echo "----------------------------------------"
echo ""

kubectl get svc -n observability

echo ""
echo "----------------------------------------"
echo ""

kubectl get prometheusrules -n observability

echo ""
