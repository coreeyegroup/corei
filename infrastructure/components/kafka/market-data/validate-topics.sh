#!/usr/bin/env bash
set -euo pipefail

BOOTSTRAP_SERVER="kafka.kafka.svc.cluster.local:9092"

kubectl exec -n kafka kafka-0 -- \
  /opt/kafka/bin/kafka-topics.sh \
    --bootstrap-server ${BOOTSTRAP_SERVER} \
    --list

echo "[stage-12] topic validation complete"
