# SECURITY PROPERTY TRANSITION PLAN

CURRENT GENERATED PROPERTIES

sasl.enabled.mechanisms=SCRAM-SHA-256

listener.name.sasl_ssl.scram-sha-256.sasl.jaas.config

listener.name.sasl_ssl.sasl.enabled.mechanisms

sasl.mechanism.inter.broker.protocol=SCRAM-SHA-256

ssl.keystore.location

ssl.truststore.location

RECOVERY PROFILE

KEEP

sasl.enabled.mechanisms

listener.name.sasl_ssl.scram-sha-256.sasl.jaas.config

listener.name.sasl_ssl.sasl.enabled.mechanisms

ssl.keystore.location

ssl.truststore.location

REMOVE

sasl.mechanism.inter.broker.protocol=SCRAM-SHA-256

TARGET PROFILE

ADD

security.inter.broker.protocol=SASL_SSL

inter.broker.listener.name=SASL_SSL

sasl.mechanism.inter.broker.protocol=SCRAM-SHA-256

RESULT

Recovery model remains stable.

Target model remains blueprint compliant.
