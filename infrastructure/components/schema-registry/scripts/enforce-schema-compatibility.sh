#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Enforcing Schema Compatibility Governance"
echo "========================================="

REGISTRY_URL="http://schema-registry:8081/apis/registry/v2"

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
echo "Creating BACKWARD compatibility rule for: $SUBJECT"

kubectl exec -i -n kafka kafka-broker-0 -- \
curl -s -X POST \
"$REGISTRY_URL/groups/default/artifacts/$SUBJECT/rules" \
-H "Content-Type: application/json" \
-d '{
  "type":"COMPATIBILITY",
  "config":"BACKWARD"
}' \
| jq .

done

echo
echo "All schema compatibility rules enforced."
