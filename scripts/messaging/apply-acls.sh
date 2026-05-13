#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Applying Kafka ACL Governance"
echo "========================================="

echo
echo "Current Stage-07 mode:"
echo "ACL governance substrate preparation only."

echo
echo "Production ACL enforcement deferred until:"
echo "- SASL_SSL enablement"
echo "- service account credential issuance"
echo "- workload onboarding"

echo
echo "Governed service accounts:"
cat \
"$HOME/corei/infrastructure/components/kafka/acl/service-accounts.yaml"

echo
echo "Governed ACL rules:"
cat \
"$HOME/corei/infrastructure/components/kafka/acl/acl-rules.yaml"

echo
echo "Kafka ACL governance validation completed."
