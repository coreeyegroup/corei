#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "STAGE-12 MARKET DATA FOUNDATION SETUP"
echo "========================================="

echo "[1/6] Deploying market-data-ingestion..."
kubectl apply \
-f ~/corei/infrastructure/kubernetes/market-data/ingestion-deployment.yaml

kubectl rollout status deployment/market-data-ingestion \
-n market-data

echo "[2/6] Deploying market-data-normalizer..."
kubectl apply \
-f ~/corei/infrastructure/kubernetes/market-data-normalizer/deployment.yaml

kubectl rollout status deployment/market-data-normalizer \
-n market-data

echo "[3/6] Deploying market-data-persistence..."
kubectl apply \
-f ~/corei/infrastructure/kubernetes/market-data-persistence/deployment.yaml

kubectl rollout status deployment/market-data-persistence \
-n market-data

echo "[4/6] Deploying historical-data-service..."
kubectl apply \
-f ~/corei/infrastructure/kubernetes/historical-data-service/deployment.yaml

kubectl rollout status deployment/historical-data-service \
-n market-data

echo "[5/6] Deploying feature-store-service..."
kubectl apply \
-f ~/corei/infrastructure/kubernetes/feature-store-service/deployment.yaml

kubectl rollout status deployment/feature-store-service \
-n market-data

echo "[6/6] Verifying runtime state..."

kubectl get pods -n market-data

echo "========================================="
echo "STAGE-12 SETUP COMPLETE"
echo "========================================="
