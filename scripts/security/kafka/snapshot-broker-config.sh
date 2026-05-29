#!/usr/bin/env bash

set -euo pipefail

mkdir -p state/security/kafka/recovery

kubectl get statefulset kafka \
-n kafka \
-o yaml \
> state/security/kafka/recovery/kafka-statefulset-pre-sasl.yaml

kubectl get configmap kafka-config \
-n kafka \
-o yaml \
> state/security/kafka/recovery/kafka-config-pre-sasl.yaml

echo
echo "[PASS] Broker snapshot complete"
