#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Registering Kafka Schemas"
echo "========================================="

REGISTRY_URL="http://schema-registry:8081/apis/registry/v2"

SCHEMA_ROOT="$HOME/corei/infrastructure/components/kafka/contracts"

find "$SCHEMA_ROOT" -name "*.avsc" | sort | while read -r SCHEMA_FILE
do

SUBJECT=$(basename "$SCHEMA_FILE" .avsc)

echo
echo "Registering subject: $SUBJECT"

kubectl exec -i -n kafka kafka-broker-0 -- \
curl -s -X POST \
"$REGISTRY_URL/groups/default/artifacts" \
-H "Content-Type: application/json" \
-H "X-Registry-ArtifactId: $SUBJECT" \
--data-binary @- \
< "$SCHEMA_FILE" \
| jq .

done

echo
echo "All schemas registered successfully."
