# BROKER SECURITY PROPERTIES

REQUIRED

sasl.enabled.mechanisms=SCRAM-SHA-512

sasl.mechanism.inter.broker.protocol=SCRAM-SHA-512

listener.security.protocol.map=
PLAINTEXT:PLAINTEXT,
SASL_SSL:SASL_SSL,
CONTROLLER:PLAINTEXT

---

TLS

ssl.keystore.location

ssl.truststore.location

ssl.keystore.password

ssl.truststore.password

---

SCRAM

listener.name.sasl_ssl.scram-sha-512.sasl.jaas.config
