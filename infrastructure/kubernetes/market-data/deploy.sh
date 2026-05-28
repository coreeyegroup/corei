#!/usr/bin/env bash
set -euo pipefail

kubectl apply -f infrastructure/kubernetes/market-data/namespace.yaml

kubectl apply -f infrastructure/kubernetes/market-data/configmap.yaml

kubectl apply -f infrastructure/kubernetes/market-data/ingestion-service.yaml

kubectl apply -f infrastructure/kubernetes/market-data/ingestion-deployment.yaml
