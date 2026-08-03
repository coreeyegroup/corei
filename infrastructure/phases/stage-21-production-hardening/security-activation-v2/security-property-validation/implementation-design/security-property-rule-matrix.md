# SECURITY PROPERTY RULE MATRIX

PROPERTY

sasl.enabled.mechanisms

RULE

Exists once

EXPECTED

SCRAM-SHA-256

---

PROPERTY

sasl.mechanism.inter.broker.protocol

RULE

Exists once

EXPECTED

SCRAM-SHA-256

---

PROPERTY

ssl.keystore.location

RULE

Exists once

EXPECTED

/etc/kafka/tls/keystore.jks

---

PROPERTY

ssl.truststore.location

RULE

Exists once

EXPECTED

/etc/kafka/tls/truststore.jks
