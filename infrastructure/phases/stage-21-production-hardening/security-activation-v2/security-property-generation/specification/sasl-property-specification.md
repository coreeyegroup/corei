# SASL PROPERTY SPECIFICATION

PURPOSE

Generate Kafka SASL configuration.

REQUIRED

sasl.enabled.mechanisms=SCRAM-SHA-512

sasl.mechanism.inter.broker.protocol=SCRAM-SHA-512

OBJECTIVE

Prevent fallback to GSSAPI.

PREVENT

Kerberos initialization

serviceName dependency

