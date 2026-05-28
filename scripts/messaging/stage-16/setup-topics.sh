#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — KAFKA TOPIC SETUP"
echo "=================================================="

NAMESPACE="kafka"

KAFKA_POD=$(kubectl get pods -n ${NAMESPACE} -o name | grep kafka | head -n 1 | cut -d/ -f2)

if [ -z "${KAFKA_POD}" ]; then
  echo "[FAIL] Kafka pod not found"
  exit 1
fi

KAFKA_TOPICS="/opt/kafka/bin/kafka-topics.sh"

TOPICS=(
  broker_dispatch_stream
  broker_health_stream
  broker_execution_stream
  reconciliation_stream
  copy_trade_stream
  copy_trade_audit_stream
  execution_session_stream
  broker_latency_stream
)

for topic in "${TOPICS[@]}"; do

  echo
  echo "[CREATING] ${topic}"

  kubectl exec -n ${NAMESPACE} ${KAFKA_POD} -- \
    ${KAFKA_TOPICS} \
    --bootstrap-server localhost:9092 \
    --create \
    --if-not-exists \
    --topic "${topic}" \
    --partitions 3 \
    --replication-factor 1

done

echo
echo "Stage-16 Kafka topic setup complete"
