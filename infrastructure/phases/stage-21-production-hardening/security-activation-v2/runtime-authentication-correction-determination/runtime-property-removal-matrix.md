# RUNTIME PROPERTY REMOVAL MATRIX

LISTENER MODE

PLAINTEXT

REMOVE

sasl.enabled.mechanisms

sasl.mechanism.inter.broker.protocol

security.inter.broker.protocol=SASL*

listener.name.*.sasl.*

listener.name.*.scram.*

listener.name.*.plain.*

listener.name.*.oauth.*

listener.name.*.gssapi.*

listener.name.*.kerberos.*

java.security.auth.login.config

KAFKA_OPTS containing JAAS references

REASON

Any of the above can activate SASL
authentication path resolution.

RESULT

SaslChannelBuilder must never initialize
for PLAINTEXT listeners.
