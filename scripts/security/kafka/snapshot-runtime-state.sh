#!/usr/bin/env bash

set -euo pipefail

mkdir -p state/security/kafka/recovery

kubectl get pods -n kafka -o wide \
> state/security/kafka/recovery/pods.txt

kubectl get svc -n kafka \
> state/security/kafka/recovery/services.txt

kubectl get pvc -n kafka \
> state/security/kafka/recovery/pvc.txt

echo
echo "[PASS] Runtime snapshot complete"
