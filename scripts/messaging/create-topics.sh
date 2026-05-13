#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Creating Kafka Topics"
echo "========================================="

TOPICS_FILE="$HOME/corei/infrastructure/components/kafka/topics/topics.yaml"

TOPIC_LINES=$(awk '
/- name:/ {
  NAME=$3
}

/partitions:/ {
  PARTITIONS=$2
}

/replication_factor:/ {
  RF=$2
}

/retention_ms:/ {
  RETENTION=$2
  print NAME, PARTITIONS, RF, RETENTION
}
' "$TOPICS_FILE")

while read -r NAME PARTITIONS RF RETENTION
do

echo
echo "Creating topic: $NAME"

kubectl exec -n kafka kafka-broker-0 -- \
kafka-topics \
--bootstrap-server localhost:9092 \
--create \
--if-not-exists \
--topic "$NAME" \
--partitions "$PARTITIONS" \
--replication-factor "$RF" \
--config retention.ms="$RETENTION"

echo
echo "Validating topic exists: $NAME"

kubectl exec -n kafka kafka-broker-0 -- \
kafka-topics \
--bootstrap-server localhost:9092 \
--describe \
--topic "$NAME"

done <<< "$TOPIC_LINES"

echo
echo "Kafka topic governance completed."
