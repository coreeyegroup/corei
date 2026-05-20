# CORE EYE Structured Logging Governance

## Purpose

Define mandatory logging standards for all platform services.

Observability is institutional infrastructure.
Logs must support:
- operational monitoring
- incident investigation
- trace correlation
- audit analysis
- reconciliation analysis
- regulatory investigation

---

# Required Fields

Every structured log MUST contain:

| Field | Purpose |
|---|---|
| service | emitting service |
| trace_id | distributed tracing correlation |
| account_id | trading/account lineage |
| event_time | deterministic ordering |
| level | severity classification |
| message | human-readable event |

---

# Log Format

Canonical format:
- JSON
- UTF-8
- one object per line

---

# Severity Levels

| Level | Meaning |
|---|---|
| DEBUG | development diagnostics |
| INFO | normal operation |
| WARNING | degraded condition |
| ERROR | operational failure |
| CRITICAL | trading/system risk |

---

# Trace Correlation

All trading-critical services must propagate:
- trace_id
- signal lineage
- execution lineage

Required future correlation:
signal_id → order_id → fill_id

---

# Governance Rules

Forbidden:
- plaintext logs
- multiline logs
- missing timestamps
- unstructured exceptions
- inconsistent severity naming

Mandatory:
- ISO8601 timestamps
- UTC timezone
- deterministic field names
- structured JSON emission

---

# Future Enforcement

Future stages will implement:
- Fluent Bit parsing
- Loki label extraction
- OpenTelemetry correlation
- SIEM forwarding
- retention governance
- compliance archival
