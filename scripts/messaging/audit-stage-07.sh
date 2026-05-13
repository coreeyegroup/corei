#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Stage-07 Event Backbone Audit"
echo "========================================="

echo
echo "Kafka runtime:"
kubectl get pods -n kafka

echo
echo "Kafka services:"
kubectl get svc -n kafka

echo
echo "Kafka persistence:"
kubectl get pvc -n kafka

echo
echo "Governed Kafka topics:"
kubectl exec -n kafka kafka-broker-0 -- \
kafka-topics \
--bootstrap-server localhost:9092 \
--list | sort

echo
echo "Schema governance:"
kubectl exec -n kafka kafka-broker-0 -- \
curl -s \
http://schema-registry:8081/apis/registry/v2/search/artifacts \
| jq .

echo
echo "Kafka log directory:"
kubectl exec -n kafka kafka-broker-0 -- \
printenv KAFKA_LOG_DIRS

echo
echo "Stage-07 audit completed successfully."
