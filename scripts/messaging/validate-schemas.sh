#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Validating Kafka Schemas"
echo "========================================="

REGISTRY_URL="http://schema-registry:8081/apis/registry/v2"

REQUIRED_SUBJECTS=(
  signal_v1
  trade_intent_v1
  execution_intent_v1
  execution_order_v1
  fill_v1
  kill_switch_v1
  audit_event_v1
)

REGISTERED=$(
kubectl exec -n kafka kafka-broker-0 -- \
curl -s "$REGISTRY_URL/search/artifacts" \
| jq -r '.artifacts[].id'
)

for SUBJECT in "${REQUIRED_SUBJECTS[@]}"
do

echo
echo "Checking subject: $SUBJECT"

if ! echo "$REGISTERED" | grep -q "^${SUBJECT}$"
then

echo
echo "Missing required schema subject: $SUBJECT"

exit 1

fi

echo
echo "Validating compatibility governance for: $SUBJECT"

MODE=$(
kubectl exec -n kafka kafka-broker-0 -- \
curl -s \
"$REGISTRY_URL/groups/default/artifacts/$SUBJECT/rules/COMPATIBILITY" \
| jq -r '.config'
)

echo "Compatibility mode: $MODE"

if [ "$MODE" != "BACKWARD" ]
then

echo
echo "Invalid compatibility governance for: $SUBJECT"

exit 1

fi

done

echo
echo "All schema governance rules validated successfully."
