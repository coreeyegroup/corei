# GENERATOR REDESIGN ARCHITECTURE

STATUS

ACTIVE

PURPOSE

Redesign manifest generator to support:

RECOVERY PROFILE

TARGET PROFILE

without modifying the master platform architecture.

CURRENT PROBLEM

Generator injects:

sasl.mechanism.inter.broker.protocol=SCRAM-SHA-256

while broker communication remains:

inter.broker.listener.name=PLAINTEXT

Result:

Mixed security model

Kafka startup failure

TARGET ARCHITECTURE

External Clients

SASL_SSL

SCRAM

Inter-Broker

SASL_SSL

SCRAM

Future Multi-Broker Compatible

YES

Future Multi-Account Compatible

YES

GENERATOR RESPONSIBILITY

Generate security profile

Generate listener profile

Generate broker profile

Generate TLS profile

Generate SCRAM profile

VALIDATION OWNERSHIP

Outside generator

Validator remains authoritative.
