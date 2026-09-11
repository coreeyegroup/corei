#!/bin/bash

set -e

ROOT="$HOME/corei"

echo ""
echo "=================================================="
echo "COREI — STAGE 3 GOVERNANCE FOUNDATION"
echo "=================================================="
echo ""



# ============================================================
# GOVERNANCE DOCUMENTS
# ============================================================

echo "[1] Creating governance documents"

cat > "$ROOT/docs/governance/event-governance.md" <<'DOC'
# EVENT GOVERNANCE

## REQUIRED EVENT FIELDS

Every event MUST contain:

- event_id
- event_type
- event_version
- event_time
- ingestion_time
- trace_id
- lineage_id
- producer
- schema_version

## EVENT RULES

- event_time = int64 nanoseconds UTC
- no string timestamps
- no float values
- immutable events only
- replay-safe ordering required
DOC



cat > "$ROOT/docs/governance/schema-governance.md" <<'DOC'
# SCHEMA GOVERNANCE

## AUTHORITATIVE RULES

- Avro only
- backward compatible only
- no float
- no decimal
- int64 for all financial fields

## BREAKING CHANGE RULE

Breaking schema changes require:
- new topic version
- migration plan
- replay validation
DOC



cat > "$ROOT/docs/governance/fixed-point-governance.md" <<'DOC'
# FIXED POINT GOVERNANCE

## AUTHORITATIVE LAW

Financial arithmetic MUST use:
- int64 only

FORBIDDEN:
- float
- double
- decimal

## PRECISION

Instrument precision defined externally.
DOC



cat > "$ROOT/docs/governance/timestamp-governance.md" <<'DOC'
# TIMESTAMP GOVERNANCE

## AUTHORITATIVE LAW

All timestamps:
- UTC
- epoch nanoseconds
- int64

## PRIORITY

exchange_time
→ ingestion_time
→ system_time

system_time NEVER drives trading logic.
DOC



cat > "$ROOT/docs/governance/lineage-governance.md" <<'DOC'
# LINEAGE GOVERNANCE

## AUTHORITATIVE LAW

All critical events require:
- SHA-256 lineage chain

## REQUIREMENTS

- immutable lineage propagation
- canonical hashing
- deterministic replay support
DOC



cat > "$ROOT/docs/governance/topic-governance.md" <<'DOC'
# TOPIC GOVERNANCE

## TOPIC FORMAT

<domain>_<entity>_<type>_<version>

Example:
execution_order_stream_v1

## GOVERNANCE

- DLQ required
- retention defined
- replay-safe ordering required
DOC



cat > "$ROOT/docs/governance/service-boundary-governance.md" <<'DOC'
# SERVICE BOUNDARY GOVERNANCE

## AUTHORITATIVE LAW

- one bounded context per service
- no direct DB access between services
- cross-service communication via Kafka only

## HTTP

Allowed only for:
- health
- admin
- observability
DOC



cat > "$ROOT/docs/governance/environment-governance.md" <<'DOC'
# ENVIRONMENT GOVERNANCE

## ENVIRONMENTS

- dev
- staging
- production

## RULES

- no skipping promotion stages
- isolated configuration
- isolated runtime state
DOC



cat > "$ROOT/docs/governance/configuration-governance.md" <<'DOC'
# CONFIGURATION GOVERNANCE

## HIERARCHY

platform
→ environment
→ service
→ runtime override

## RULES

- configuration externalized
- immutable snapshots required
- runtime overrides audited
DOC



# ============================================================
# ARCHITECTURE GOVERNANCE
# ============================================================

echo "[2] Creating architecture governance"

cat > "$ROOT/docs/architecture/governance.md" <<'DOC'
# COREI PLATFORM GOVERNANCE

This document defines the deterministic governance authority
for the COREI institutional trading platform.

Governance domains:

- event governance
- schema governance
- fixed-point governance
- timestamp governance
- lineage governance
- topic governance
- service boundary governance
- environment governance
- configuration governance

All runtime systems must comply.
DOC



# ============================================================
# SCHEMA FOUNDATION
# ============================================================

echo "[3] Creating schema foundation"

cat > "$ROOT/schemas/README.md" <<'DOC'
# COREI SCHEMA FOUNDATION

Authoritative schema registry structure.

All schemas:
- versioned
- validated
- replay-safe
- backward-compatible
DOC



cat > "$ROOT/schemas/avro/common/base-event.avsc" <<'DOC'
{
  "type": "record",
  "name": "BaseEvent",
  "namespace": "corei.common",
  "fields": [
    {"name":"event_id","type":"string"},
    {"name":"event_type","type":"string"},
    {"name":"event_version","type":"string"},
    {"name":"event_time","type":"long"},
    {"name":"trace_id","type":"string"},
    {"name":"lineage_id","type":"string"}
  ]
}
DOC



# ============================================================
# EVENT CONTRACT FOUNDATION
# ============================================================

echo "[4] Creating event contracts"

cat > "$ROOT/contracts/events/event-envelope.yaml" <<'DOC'
event_contract:

  required_fields:
    - event_id
    - event_type
    - event_version
    - event_time
    - trace_id
    - lineage_id

  governance:
    timestamp: int64
    replay_safe: true
    immutable: true
DOC



# ============================================================
# SYSTEM REGISTRY FOUNDATION
# ============================================================

echo "[5] Creating system registry foundation"

cat > "$ROOT/system/system-registry/README.md" <<'DOC'
# SYSTEM REGISTRY

Authoritative ownership registry.

Defines:
- service ownership
- runtime ownership
- bounded contexts
- dependency authority
DOC



# ============================================================
# GOVERNANCE VALIDATORS
# ============================================================

echo "[6] Creating governance validators"



cat > "$ROOT/infrastructure/validation/governance/validate-stage-03.sh" <<'DOC'
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
DOC

chmod +x "$ROOT/infrastructure/validation/governance/validate-stage-03.sh"



# ============================================================
# GOVERNANCE FLOAT DETECTOR
# ============================================================

echo "[7] Creating float governance validator"

cat > "$ROOT/infrastructure/validation/governance/check-no-float.sh" <<'DOC'
#!/bin/bash

set -e

ROOT="$HOME/corei"

echo ""
echo "=========================================="
echo "NO FLOAT GOVERNANCE CHECK"
echo "=========================================="

if grep -R "float" "$ROOT/services" 2>/dev/null; then
  echo ""
  echo "FAIL → float detected"
  exit 1
fi

if grep -R "double" "$ROOT/services" 2>/dev/null; then
  echo ""
  echo "FAIL → double detected"
  exit 1
fi

echo "PASS → no float violations"
DOC

chmod +x "$ROOT/infrastructure/validation/governance/check-no-float.sh"



# ============================================================
# STAGE 3 README
# ============================================================

echo "[8] Creating stage documentation"

cat > "$ROOT/docs/stages/stage-03-platform-governance-foundation.md" <<'DOC'
# STAGE 3 — PLATFORM GOVERNANCE FOUNDATION

## PURPOSE

Establish deterministic architectural law before runtime systems exist.

## GOVERNANCE DOMAINS

- event governance
- schema governance
- fixed-point governance
- timestamp governance
- lineage governance
- topic governance
- service boundaries
- configuration governance
- environment governance

## VALIDATION

Validation scripts enforce:
- required governance files
- schema existence
- float prohibition
- governance structure integrity

## OUTPUT

Institutional deterministic governance authority.
DOC



echo ""
echo "=================================================="
echo "STAGE 3 GOVERNANCE FOUNDATION COMPLETE"
echo "=================================================="
echo ""
