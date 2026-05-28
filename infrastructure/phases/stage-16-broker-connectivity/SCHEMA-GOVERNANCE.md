# STAGE-16 — SCHEMA GOVERNANCE

AUTHORITATIVE PURPOSE

Stage-16 schema governance establishes:

    deterministic execution event contracts

==================================================
AUTHORITATIVE SCHEMA DOMAINS
==================================================

1. broker dispatch schemas
2. broker fill schemas
3. reconciliation schemas
4. copy-trade schemas
5. execution session schemas
6. lineage governance schemas

==================================================
COMPATIBILITY GOVERNANCE
==================================================

Compatibility mode:

    BACKWARD_COMPATIBLE

Forbidden:

- breaking field removal
- incompatible type mutation
- lineage field deletion
- timestamp precision mutation

==================================================
LINEAGE GOVERNANCE
==================================================

Mandatory immutable lineage fields:

- signal_id
- trade_intent_id
- execution_intent_id
- order_id
- fill_id

These fields MUST NEVER be removed.

==================================================
TIMESTAMP GOVERNANCE
==================================================

Authoritative timestamp precision:

    epoch nanoseconds only

==================================================
NUMERIC GOVERNANCE
==================================================

Financial precision:

    int64 only

Forbidden:

- float
- double

==================================================
REPLAY GOVERNANCE
==================================================

All schema evolution MUST preserve:

- replay compatibility
- deterministic reconstruction
- immutable lineage continuity

==================================================
MOCK GOVERNANCE
==================================================

Stage-16 schemas currently govern:

    MOCK EXECUTION EVENTS ONLY
