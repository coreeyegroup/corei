#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Installing Kafka Event Backbone"
echo "========================================="

echo
echo "Creating Kafka namespace..."

kubectl apply -f \
"$HOME/corei/kubernetes/messaging/kafka/namespace.yaml"

echo
echo "Applying Kafka ConfigMap..."

kubectl apply -f \
"$HOME/corei/kubernetes/messaging/configmaps/kafka-config.yaml"

echo
echo "Deploying Kafka service..."

kubectl apply -f \
"$HOME/corei/kubernetes/messaging/kafka/kafka-service.yaml"

echo
echo "Deploying Kafka StatefulSet..."

kubectl apply -f \
"$HOME/corei/kubernetes/messaging/kafka/kafka-statefulset.yaml"

echo
echo "Waiting for Kafka broker readiness..."

kubectl rollout status statefulset/kafka-broker \
-n kafka \
--timeout=600s

echo
echo "Validating Kafka PVC binding..."

kubectl get pvc -n kafka

echo
echo "Validating Kafka log directory..."

kubectl exec -n kafka kafka-broker-0 -- \
printenv KAFKA_LOG_DIRS

echo
echo "Kafka runtime operational."

kubectl get pods -n kafka
