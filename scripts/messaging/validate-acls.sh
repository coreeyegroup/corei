#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Validating Kafka ACL Governance"
echo "========================================="

echo
echo "Current Stage-07 mode:"
echo "ACL governance substrate validation only."

echo
echo "Governed service accounts:"
cat \
"$HOME/corei/infrastructure/components/kafka/acl/service-accounts.yaml"

echo
echo "Governed ACL rules:"
cat \
"$HOME/corei/infrastructure/components/kafka/acl/acl-rules.yaml"

echo
echo "ACL governance validation completed."
