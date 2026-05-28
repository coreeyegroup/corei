#!/usr/bin/env bash
set -euo pipefail

BOOTSTRAP_SERVER="kafka.kafka.svc.cluster.local:9092"

TOPICS=(
  raw_market_data_stream
  normalized_market_data_stream
  feature_store_updates
  market_session_stream
  market_validation_stream
  market_dead_letter_stream
  market_replay_stream
  historical_query_stream
)

for topic in "${TOPICS[@]}"
do
  kubectl exec -n kafka kafka-0 -- \
    /opt/kafka/bin/kafka-topics.sh \
      --bootstrap-server ${BOOTSTRAP_SERVER} \
      --create \
      --if-not-exists \
      --topic ${topic} \
      --partitions 6 \
      --replication-factor 1 \
      --config retention.ms=604800000 \
      --config segment.ms=86400000 \
      --config cleanup.policy=delete

done

echo "[stage-12] market-data topics created"
