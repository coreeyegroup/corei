# APPROVED RUNTIME PROPERTY SET

STATUS

ACTIVE

PURPOSE

Freeze Kafka 3.7.1 runtime
authentication requirements
before implementation.

CONFIRMED PROPERTIES

sasl.enabled.mechanisms

listener.name.sasl_ssl.scram-sha-256.sasl.jaas.config

listener.name.sasl_ssl.sasl.enabled.mechanisms

ssl.keystore.location

ssl.truststore.location

REQUIRED IMPLEMENTATION REVIEW

listener-scoped authentication resolution

KafkaServer JAAS interaction

SCRAM listener runtime selection

KERBEROS FALLBACK RCA

CONFIRMED

AUTHORIZATION

PENDING IMPLEMENTATION
