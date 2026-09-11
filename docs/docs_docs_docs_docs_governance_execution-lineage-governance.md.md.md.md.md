# EXECUTION LINEAGE GOVERNANCE

## AUTHORITATIVE PURPOSE

This document defines deterministic lineage governance
for the execution layer.

---

## AUTHORITATIVE LINEAGE CHAIN

Signal
→ TradeIntent
→ ExecutionIntent
→ PerAccountIntent
→ ExecutionOrder
→ Fill

---

## LINEAGE RULES

Every downstream execution entity MUST contain:

- lineage_hash
- trace_id
- event_id
- trade_intent_id
- execution_intent_id

---

## HASH GOVERNANCE

Lineage hashes MUST use:

SHA-256

Allowed:

- canonical byte ordering
- deterministic serialization

Forbidden:

- non-deterministic serialization
- unordered map hashing
- mutable lineage identifiers

---

## CHAIN BREAK GOVERNANCE

If lineage continuity breaks:

- execution MUST halt
- validation MUST fail
- replay MUST fail

Lineage corruption is considered:

CRITICAL

---

## REPLAY GOVERNANCE

Replay MUST reproduce:

- identical lineage hashes
- identical ordering
- identical execution identities

Bit-level replay equality is mandatory.
