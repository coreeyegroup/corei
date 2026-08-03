# SASL SCRAM SPECIFICATION

PURPOSE

Define complete Kafka SASL/SCRAM
broker configuration requirements.

---

AUTHENTICATION MODEL

Mechanism:

SCRAM-SHA-512

Transport:

SASL_SSL

---

REQUIRED BROKER CONFIGURATION

sasl.enabled.mechanisms

sasl.mechanism.inter.broker.protocol

listener.name.sasl_ssl.*

listener.security.protocol.map

inter.broker.listener.name

---

PROHIBITED

Kerberos

GSSAPI

PLAINTEXT authentication
