#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Stage-07 Event Backbone Validation"
echo "========================================="

echo
echo "Validating Kafka runtime..."

kubectl get pods -n kafka

echo
echo "Validating Kafka topics..."

"$HOME/corei/scripts/messaging/validate-topics.sh"

echo
echo "Validating schema governance..."

"$HOME/corei/scripts/messaging/validate-schemas.sh"

echo
echo "Validating replay governance..."

"$HOME/corei/scripts/messaging/validate-replay.sh"

echo
echo "Validating ACL governance..."

"$HOME/corei/scripts/messaging/validate-acls.sh"

echo
echo "Validating Kafka persistence..."

kubectl get pvc -n kafka

echo
echo "Validating Kafka log directory..."

kubectl exec -n kafka kafka-broker-0 -- \
printenv KAFKA_LOG_DIRS

echo
echo "Stage-07 event backbone validation completed successfully."
