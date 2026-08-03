# INTER BROKER MIGRATION STRATEGY

STATUS

ACTIVE

CURRENT STATE

Single Broker

Single Controller

KRaft Mode

RECOVERY STATE

inter.broker.listener.name=PLAINTEXT

No SCRAM inter-broker authentication

TARGET STATE

inter.broker.listener.name=SASL_SSL

security.inter.broker.protocol=SASL_SSL

sasl.mechanism.inter.broker.protocol=SCRAM-SHA-256

RATIONALE

Recovery phase must restore cluster stability.

Target phase must align with:

Multi Broker

Multi Account

Institutional Event Backbone

SEQUENCE

Stage 21 Recovery

↓

Operational Validation

↓

Security Migration Phase

↓

Full Inter-Broker SCRAM

END STATE

Institutional Security Model
