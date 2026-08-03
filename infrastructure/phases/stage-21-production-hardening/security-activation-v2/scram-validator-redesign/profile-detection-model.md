# PROFILE DETECTION MODEL

RECOVERY PROFILE

MUST CONTAIN

sasl.enabled.mechanisms

listener.name.sasl_ssl.scram-sha-256.sasl.jaas.config

listener.name.sasl_ssl.sasl.enabled.mechanisms

MUST NOT CONTAIN

sasl.mechanism.inter.broker.protocol

security.inter.broker.protocol

inter.broker.listener.name=SASL_SSL

TARGET PROFILE

MUST CONTAIN

sasl.enabled.mechanisms

listener.name.sasl_ssl.scram-sha-256.sasl.jaas.config

listener.name.sasl_ssl.sasl.enabled.mechanisms

sasl.mechanism.inter.broker.protocol

security.inter.broker.protocol

inter.broker.listener.name=SASL_SSL

RESULT

Profile classification becomes deterministic.
