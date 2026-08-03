# AUTHENTICATION MODEL CORRECTION SPECIFICATION

STATUS

ACTIVE

OBJECTIVE

Eliminate mixed authentication model generation.

CONFIRMED FAULT

Generator emits:

1. Listener JAAS

AND

2. Global JVM JAAS

simultaneously.

TARGET MODEL

Listener Scoped Authentication

AUTHORIZED

listener.name.sasl_ssl.*

listener.name.sasl_ssl.scram-sha-256.*

listener.name.sasl_ssl.sasl.*

PROHIBITED

KAFKA_OPTS

java.security.auth.login.config

Global JAAS Runtime Injection

RESULT

Single Authentication Resolution Path

EXPECTED LOGIN MODULE

ScramLoginModule

EXPECTED STARTUP RESULT

Kafka Broker Startup Success
