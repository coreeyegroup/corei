#!/usr/bin/env bash

set -euo pipefail

echo "========================================="
echo "Validating Replay Governance"
echo "========================================="

AUDIT_RETENTION=$(kubectl exec -n kafka kafka-broker-0 -- \
kafka-configs \
--bootstrap-server localhost:9092 \
--entity-type topics \
--entity-name audit_stream \
--describe | grep retention.ms || true)

echo
echo "Audit stream retention configuration:"
echo "$AUDIT_RETENTION"

KILL_SWITCH_PARTITIONS=$(kubectl exec -n kafka kafka-broker-0 -- \
kafka-topics \
--bootstrap-server localhost:9092 \
--describe \
--topic kill_switch_stream \
| grep PartitionCount || true)

echo
echo "Kill switch partition governance:"
echo "$KILL_SWITCH_PARTITIONS"

echo
echo "Replay governance validation completed."
