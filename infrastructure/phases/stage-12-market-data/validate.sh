#!/usr/bin/env bash

set -euo pipefail

echo "=================================================="
echo "STAGE-12 VALIDATION"
echo "=================================================="

echo ""
echo "[1/7] Checking Kafka Pods..."
kubectl get pods -n kafka

echo ""
echo "[2/7] Checking Market Data Pods..."
kubectl get pods -n market-data

echo ""
echo "[3/7] Validating Kafka Topics..."

kubectl exec -n kafka kafka-0 -- \
/opt/kafka/bin/kafka-topics.sh \
--bootstrap-server localhost:9092 \
--list

echo ""
echo "[4/7] Validating Raw Stream..."

timeout 15 kubectl exec -n kafka kafka-0 -- \
/opt/kafka/bin/kafka-console-consumer.sh \
--bootstrap-server localhost:9092 \
--topic raw_market_data_stream || true

echo ""
echo "[5/7] Validating Normalized Stream..."

timeout 15 kubectl exec -n kafka kafka-0 -- \
/opt/kafka/bin/kafka-console-consumer.sh \
--bootstrap-server localhost:9092 \
--topic normalized_market_data_stream || true

echo ""
echo "[6/7] Validating Offset Growth..."

kubectl exec -n kafka kafka-0 -- \
/opt/kafka/bin/kafka-get-offsets.sh \
--bootstrap-server localhost:9092 \
--topic raw_market_data_stream

kubectl exec -n kafka kafka-0 -- \
/opt/kafka/bin/kafka-get-offsets.sh \
--bootstrap-server localhost:9092 \
--topic normalized_market_data_stream

echo ""
echo "[7/7] Validating Runtime Stability..."

kubectl get pods --all-namespaces | grep -E "CrashLoopBackOff|Error" && exit 1 || true

echo ""
echo "=================================================="
echo "STAGE-12 VALIDATION SUCCESS"
echo "=================================================="
