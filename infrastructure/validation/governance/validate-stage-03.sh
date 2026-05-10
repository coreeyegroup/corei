#!/bin/bash

set -e

ROOT="$HOME/corei"

PASS=true

echo ""
echo "=========================================="
echo "STAGE 3 — GOVERNANCE VALIDATION"
echo "=========================================="



validate_file() {

  FILE="$1"

  if [ -f "$FILE" ]; then
    echo "PASS → $FILE"
  else
    echo "FAIL → $FILE"
    PASS=false
  fi
}



validate_file "$ROOT/docs/governance/event-governance.md"
validate_file "$ROOT/docs/governance/schema-governance.md"
validate_file "$ROOT/docs/governance/fixed-point-governance.md"
validate_file "$ROOT/docs/governance/timestamp-governance.md"
validate_file "$ROOT/docs/governance/lineage-governance.md"
validate_file "$ROOT/docs/governance/topic-governance.md"
validate_file "$ROOT/docs/governance/service-boundary-governance.md"
validate_file "$ROOT/docs/governance/environment-governance.md"
validate_file "$ROOT/docs/governance/configuration-governance.md"

validate_file "$ROOT/docs/architecture/governance.md"

validate_file "$ROOT/schemas/avro/common/base-event.avsc"

validate_file "$ROOT/contracts/events/event-envelope.yaml"

validate_file "$ROOT/system/system-registry/README.md"



echo ""
echo "=========================================="

if [ "$PASS" = true ]; then
  echo "STATUS: PASS"
  exit 0
else
  echo "STATUS: FAIL"
  exit 1
fi
