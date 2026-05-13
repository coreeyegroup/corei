#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Enforcing Schema Compatibility"
echo "========================================="

SCHEMA_REGISTRY_URL="http://schema-registry.kafka.svc.cluster.local:8081"

SUBJECTS=(
  signal_v1
  trade_intent_v1
  execution_intent_v1
  execution_order_v1
  fill_v1
  kill_switch_v1
  audit_event_v1
)

for SUBJECT in "${SUBJECTS[@]}"
do

echo
echo "Setting compatibility BACKWARD for: $SUBJECT"

curl -s \
-X PUT \
-H "Content-Type: application/vnd.schemaregistry.v1+json" \
--data '{"compatibility":"BACKWARD"}' \
"$SCHEMA_REGISTRY_URL/config/$SUBJECT" \
| jq .

echo
echo "Validating compatibility for: $SUBJECT"

MODE=$(curl -s \
"$SCHEMA_REGISTRY_URL/config/$SUBJECT" \
| jq -r '.compatibilityLevel')

echo "Compatibility: $MODE"

if [ "$MODE" != "BACKWARD" ]
then

echo
echo "Compatibility enforcement failed for $SUBJECT"

exit 1

fi

done

echo
echo "All schema compatibility rules enforced successfully."
