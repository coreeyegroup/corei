#!/usr/bin/env bash

set -euo pipefail

ROOT="$HOME/corei"

mkdir -p "$ROOT/docs/adr"

cd "$ROOT"

cat > docs/adr/README.md <<'EOF'
# Architecture Decision Records

Purpose:
Maintain immutable architectural decision history.

Rules:
- ADRs are append-only.
- Superseded ADRs are never deleted.
- All major platform decisions require ADR references.
EOF

cat > docs/adr/ADR-001-kafka-source-of-truth.md <<'EOF'
# ADR-001 — Kafka as Single Source of Truth

Status: ACCEPTED

Decision:
Kafka is the authoritative event backbone.

Consequences:
- State reconstruction must be replay-safe.
- Services derive state from canonical event streams.
EOF

cat > docs/adr/ADR-002-sha256-lineage.md <<'EOF'
# ADR-002 — SHA-256 Hash Chain Lineage

Status: ACCEPTED

Decision:
All lineage propagation uses SHA-256 deterministic chaining.
EOF

cat > docs/adr/ADR-003-fixed-point-int64.md <<'EOF'
# ADR-003 — Fixed Point int64 Arithmetic

Status: ACCEPTED

Decision:
Floating-point arithmetic is prohibited in financial systems.
EOF

cat > docs/adr/ADR-004-event-time-governance.md <<'EOF'
# ADR-004 — Event-Time Governance

Status: ACCEPTED

Decision:
All ordering uses canonical event_time governance.
EOF

cat > docs/adr/ADR-005-paper-first-activation.md <<'EOF'
# ADR-005 — Paper-First Activation Policy

Status: ACCEPTED

Decision:
All strategies must pass paper validation before live execution.
EOF


echo "ADR initialization complete"
