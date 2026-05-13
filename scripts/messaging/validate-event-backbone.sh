#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Validating End-to-End Event Backbone"
echo "========================================="

TEST_TOPIC="event_backbone_validation_stream"

TEST_MESSAGE='{"event":"stage07_validation","status":"ok"}'

echo
echo "Creating validation topic..."

kubectl exec -n kafka kafka-broker-0 -- \
kafka-topics \
--bootstrap-server localhost:9092 \
--create \
--if-not-exists \
--topic "$TEST_TOPIC" \
--partitions 1 \
--replication-factor 1

echo
echo "Producing validation event..."

echo "$TEST_MESSAGE" | kubectl exec -i -n kafka kafka-broker-0 -- \
kafka-console-producer \
--bootstrap-server localhost:9092 \
--topic "$TEST_TOPIC"

sleep 2

echo
echo "Consuming validation event..."

CONSUMED=$(
kubectl exec -n kafka kafka-broker-0 -- \
kafka-console-consumer \
--bootstrap-server localhost:9092 \
--topic "$TEST_TOPIC" \
--from-beginning \
--timeout-ms 5000 \
--max-messages 1
)

echo
echo "Produced message:"
echo "$TEST_MESSAGE"

echo
echo "Consumed message:"
echo "$CONSUMED"

if [ "$TEST_MESSAGE" != "$CONSUMED" ]
then

echo
echo "Event backbone corruption validation failed."

exit 1

fi

echo
echo "Message integrity validation passed."

echo
echo "Deleting validation topic..."

kubectl exec -n kafka kafka-broker-0 -- \
kafka-topics \
--bootstrap-server localhost:9092 \
--delete \
--topic "$TEST_TOPIC"

echo
echo "End-to-end event backbone validation completed successfully."
