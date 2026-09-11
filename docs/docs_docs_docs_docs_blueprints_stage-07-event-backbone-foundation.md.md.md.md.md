# STAGE 7 — EVENT BACKBONE FOUNDATION

## PURPOSE

Build the authoritative event system.

Kafka is the single source of truth.
All state derives from it.

This stage is not complete until every topic,
schema, and governance rule is in place and validated.

---

## INCLUDES

### Apache Kafka 3.7 (KRaft mode, no ZooKeeper)

- 1 controller + 1 broker (dev)
- 3+3 topology deferred to Stage-22 production architecture
- PVC: /var/lib/kafka/data (Longhorn, 20Gi)
- log.dirs validated: NOT /tmp
- PLAINTEXT auth (dev)
- SASL_SSL deferred to Stage-21

---

### Apicurio Registry 2.x
(Confluent-compatible schema governance APIs)

- All 7 Avro schemas registered at startup
- Compatibility: BACKWARD (enforced — no exceptions)

Subjects:
- signal_v1
- trade_intent_v1
- execution_intent_v1
- execution_order_v1
- fill_v1
- kill_switch_v1
- audit_event_v1

---

### Kafka UI 0.7

Operational visibility layer for Kafka governance.

---

## GOVERNED TOPOLOGY

All 23 Kafka topics created with correct configuration.

### Partition Governance

- Partitions: 3 (dev)
- Partitions: 6 (production / Stage-22)

### Replication Governance

- Replication factor: 1 (dev)
- Replication factor: 3 (production / Stage-22)

### Retention Governance

- Trading streams: 7 days
- audit_stream: permanent retention (-1)

### Ordering Governance

- kill_switch_stream partitions = 1
- strict global ordering guaranteed

---

## FAILURE TOPOLOGY

### Dead Letter Governance

dead_letter_stream
with structured failure envelope.

### Retry Governance

retry_stream
with retry backoff metadata.

---

## ACL GOVERNANCE

ACL governance substrate operational.

Production enforcement deferred until:
- SASL_SSL enablement
- service-account credentials
- workload onboarding

---

## CONSUMER GROUP GOVERNANCE

Convention:

<service>-<purpose>-cg

---

## PARTITION KEY GOVERNANCE

Trading-event producers MUST use:

partition_key = account_id + order_id

Applies to:
- trade_intent_stream
- execution_intent_stream
- execution_order_stream
- fill_stream
- order_state_stream

Purpose:
- deterministic ordering
- replay consistency
- execution sequencing guarantees
- portfolio reconstruction safety

---

## AUTHORITATIVE SCRIPTS

### Stage Lifecycle

infrastructure/phases/stage-07-event-backbone/setup.sh

### Kafka Runtime

scripts/messaging/install-kafka.sh

### Schema Governance

scripts/messaging/install-schema-registry.sh

scripts/messaging/register-schemas.sh

infrastructure/components/schema-registry/scripts/enforce-schema-compatibility.sh

### Topic Governance

scripts/messaging/create-topics.sh

### ACL Governance

scripts/messaging/apply-acls.sh

### Kafka UI

scripts/messaging/install-kafka-ui.sh

### Validation Gate

infrastructure/phases/stage-07-event-backbone/validate.sh

scripts/messaging/validate-topics.sh

scripts/messaging/validate-schemas.sh

scripts/messaging/validate-replay.sh

scripts/messaging/validate-acls.sh

scripts/messaging/validate-event-backbone.sh

---

## VALIDATION REQUIREMENTS

Validation gate MUST confirm:

- all 23 topics exist
- all 7 schemas registered
- BACKWARD compatibility enforced
- audit_stream retention.ms = -1
- kill_switch_stream partitions = 1
- producer → consumer validation passes
- message integrity validation passes
- kafka-broker-0 PVC = Bound
- KAFKA_LOG_DIRS != /tmp

---

## END-TO-END VALIDATION

Validation executes isolated producer → consumer
integrity verification using ephemeral validation topic.

Validation topic removed after successful verification.

---

## GATE

validate.sh exits 0

All:
- topics
- schemas
- governance rules
- replay guarantees
- transport guarantees

validated successfully.

---

## OUTPUT

Deterministic governed event backbone operational.

All downstream services publish and consume
through authoritative governed Kafka topology.

---

## TIME

20-25 minutes
