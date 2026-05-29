#!/usr/bin/env bash

set -euo pipefail

keytool \
-importkeystore \
-srckeystore state/security/kafka/runtime-tls/kafka.p12 \
-srcstoretype PKCS12 \
-srcstorepass changeit \
-destkeystore state/security/kafka/runtime-tls/keystore.jks \
-deststorepass changeit \
-destkeypass changeit \
-noprompt

echo
echo "[PASS] JKS keystore generated"
