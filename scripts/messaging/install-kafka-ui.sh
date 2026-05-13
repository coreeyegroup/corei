#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Installing Kafka UI"
echo "========================================="

kubectl apply -f \
"$HOME/corei/kubernetes/messaging/kafka-ui/kafka-ui-service.yaml"

kubectl apply -f \
"$HOME/corei/kubernetes/messaging/kafka-ui/kafka-ui.yaml"

echo
echo "Waiting for Kafka UI readiness..."

kubectl rollout status deployment/kafka-ui \
-n kafka \
--timeout=600s

echo
echo "Kafka UI operational."

kubectl get pods -n kafka
