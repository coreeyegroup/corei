# PROPERTY INJECTION REDESIGN

RECOVERY PROFILE

INJECT

sasl.enabled.mechanisms=SCRAM-SHA-256

listener.name.sasl_ssl.scram-sha-256.sasl.jaas.config

listener.name.sasl_ssl.sasl.enabled.mechanisms

ssl.keystore.location

ssl.truststore.location

DO NOT INJECT

sasl.mechanism.inter.broker.protocol

TARGET PROFILE

INJECT

sasl.enabled.mechanisms

listener.name.sasl_ssl.scram-sha-256.sasl.jaas.config

listener.name.sasl_ssl.sasl.enabled.mechanisms

ssl.keystore.location

ssl.truststore.location

security.inter.broker.protocol=SASL_SSL

inter.broker.listener.name=SASL_SSL

sasl.mechanism.inter.broker.protocol=SCRAM-SHA-256

RESULT

Profile-specific generation.

No mixed ownership model.
