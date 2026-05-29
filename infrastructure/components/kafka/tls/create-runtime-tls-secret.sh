#!/usr/bin/env bash

set -euo pipefail

kubectl delete secret kafka-runtime-tls \
-n kafka \
--ignore-not-found

kubectl create secret generic kafka-runtime-tls \
-n kafka \
--from-file=keystore.jks=state/security/kafka/runtime-tls/keystore.jks \
--from-file=truststore.jks=state/security/kafka/runtime-tls/truststore.jks

echo
echo "[PASS] Runtime TLS secret created"
