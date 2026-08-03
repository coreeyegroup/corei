# SCRAM REMEDIATION DESIGN

STATUS:
ACTIVE

PURPOSE

Resolve SCRAM authentication startup failure
identified during controlled deployment.

RCA

Kafka startup failure:

No serviceName defined in either JAAS or Kafka config

CAUSE

Current generated configuration mixes:

inter.broker.listener.name=PLAINTEXT

with

sasl.mechanism.inter.broker.protocol=SCRAM-SHA-256

This creates an inconsistent authentication model.

RECOVERY MODEL

External Clients

SASL_SSL

SCRAM-SHA-256

Internal Broker Communication

PLAINTEXT

Controller Communication

PLAINTEXT

TARGET MODEL

External Clients

SASL_SSL

SCRAM-SHA-256

Inter-Broker Communication

SASL_SSL

SCRAM-SHA-256

Future Multi-Broker Compatible

YES

Multi Account Compatible

YES

Multi Service Compatible

YES

AUTHORITY

Master Blueprint remains authoritative.

No remediation may modify target architecture.
