#!/usr/bin/env bash

set -euo pipefail

echo "====================================="
echo "CREATE SCRAM USERS"
echo "====================================="

ADMIN_PASSWORD=$(openssl rand -base64 32)
SERVICE_PASSWORD=$(openssl rand -base64 32)

echo "${ADMIN_PASSWORD}" \
> state/security/kafka/users/kafka-admin.password

echo "${SERVICE_PASSWORD}" \
> state/security/kafka/users/kafka-service.password

kubectl exec -n kafka kafka-0 -- \
/opt/kafka/bin/kafka-configs.sh \
--bootstrap-server localhost:9092 \
--alter \
--add-config \
'SCRAM-SHA-512=[iterations=4096,password='"${ADMIN_PASSWORD}"']' \
--entity-type users \
--entity-name kafka-admin

kubectl exec -n kafka kafka-0 -- \
/opt/kafka/bin/kafka-configs.sh \
--bootstrap-server localhost:9092 \
--alter \
--add-config \
'SCRAM-SHA-512=[iterations=4096,password='"${SERVICE_PASSWORD}"']' \
--entity-type users \
--entity-name kafka-service

echo
echo "[PASS] SCRAM users created"
