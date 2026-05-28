#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "STAGE-16 — KAFKA TOPIC VALIDATION"
echo "=================================================="

NAMESPACE="kafka"

KAFKA_POD=$(kubectl get pods -n ${NAMESPACE} -o name | grep kafka | head -n 1 | cut -d/ -f2)

if [ -z "${KAFKA_POD}" ]; then
  echo "[FAIL] Kafka pod not found"
  exit 1
fi

KAFKA_TOPICS="/opt/kafka/bin/kafka-topics.sh"

PASS_COUNT=0

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

  if kubectl exec -n ${NAMESPACE} ${KAFKA_POD} -- \
      ${KAFKA_TOPICS} \
      --bootstrap-server localhost:9092 \
      --list | grep -q "^${topic}$"
  then
      echo "[PASS] ${topic}"
      PASS_COUNT=$((PASS_COUNT + 1))
  else
      echo "[FAIL] ${topic}"
      exit 1
  fi

done

echo
echo "=================================================="
echo "TOTAL TOPICS VALIDATED: ${PASS_COUNT}"
echo "STAGE-16 EVENT TOPOLOGY VALIDATION PASSED"
echo "=================================================="
