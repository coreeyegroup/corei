#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-15 — EXECUTION FOUNDATION DEPLOYMENT"
echo "=================================================="

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"

cd "$ROOT_DIR"

NAMESPACE="execution"

SERVICES=(
  execution-intent-service
  account-routing-service
  risk-engine-service
  policy-engine-service
  position-sizer-service
  order-engine-service
)

wait_for_rollout() {

    local deployment=$1

    echo
    echo "Waiting for rollout: $deployment"

    kubectl rollout status \
        deployment/$deployment \
        -n $NAMESPACE \
        --timeout=180s
}

wait_for_readiness() {

    local service=$1

    echo
    echo "Waiting for readiness: $service"

    kubectl wait \
        --for=condition=available \
        deployment/$service \
        -n $NAMESPACE \
        --timeout=180s
}

echo
echo "[1/8] Deploying execution namespace..."

kubectl apply -f \
    kubernetes/execution/namespace.yaml

echo
echo "[2/8] Deploying execution services..."

for service in "${SERVICES[@]}"; do

    echo
    echo "=================================================="
    echo "Deploying: $service"
    echo "=================================================="

    kubectl apply -f \
        kubernetes/execution/$service/configmap.yaml

    kubectl apply -f \
        kubernetes/execution/$service/service.yaml

    kubectl apply -f \
        kubernetes/execution/$service/deployment.yaml

    kubectl apply -f \
        kubernetes/execution/$service/hpa.yaml

    kubectl apply -f \
        kubernetes/execution/$service/networkpolicy.yaml

    wait_for_rollout "$service"

    wait_for_readiness "$service"

    echo
    echo "$service deployment completed."

    if [[ "$service" == "risk-engine-service" ]]; then

        echo
        echo "[GOVERNANCE CHECK]"
        echo "risk-engine-service ready."
        echo "downstream execution deployment allowed."
    fi
done

echo
echo "[3/8] Validating deployment topology..."

kubectl get deployments -n $NAMESPACE

echo
echo "[4/8] Validating service topology..."

kubectl get svc -n $NAMESPACE

echo
echo "[5/8] Validating pod topology..."

kubectl get pods -n $NAMESPACE

echo
echo "[6/8] Validating HPA topology..."

kubectl get hpa -n $NAMESPACE

echo
echo "[7/8] Validating network policies..."

kubectl get networkpolicy -n $NAMESPACE

echo
echo "[8/8] Stage-15 deployment completed."

echo
echo "=================================================="
echo "STAGE-15 EXECUTION DEPLOYMENT SUCCESSFUL"
echo "=================================================="
echo
