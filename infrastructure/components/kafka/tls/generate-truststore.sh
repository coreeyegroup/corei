#!/usr/bin/env bash

set -euo pipefail

keytool \
-import \
-file state/security/kafka/ca.crt \
-alias kafka-ca \
-keystore state/security/kafka/runtime-tls/truststore.jks \
-storepass changeit \
-noprompt

echo
echo "[PASS] Truststore generated"
