# ADR-001 — Kafka as Single Source of Truth

Status: ACCEPTED

Context

The platform requires deterministic replay capability, auditable lineage, and event-driven state reconstruction.

Decision

Kafka is the authoritative event backbone.

All platform state must derive from canonical event streams.

Consequences
Replay-first architecture mandatory
Event lineage mandatory
State reconstruction deterministic
Services become stream consumers/producers
