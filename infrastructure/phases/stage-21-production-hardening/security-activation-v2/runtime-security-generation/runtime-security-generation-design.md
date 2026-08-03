# RUNTIME SECURITY GENERATION DESIGN

OBJECTIVE

Generator V2 must generate
security-aware server.properties
during Kafka startup.

---

CURRENT STATE

Generator injects:

- TLS mounts
- JAAS mounts
- KAFKA_OPTS
- Port 9094

Generator does NOT inject:

- SASL_SSL listener
- advertised SASL_SSL listener
- security protocol mapping

Result:

Kafka starts

Kafka security listener absent

---

REQUIRED RUNTIME CONFIGURATION

listeners=PLAINTEXT://0.0.0.0:9092,SASL_SSL://0.0.0.0:9094,CONTROLLER://0.0.0.0:9093

advertised.listeners=PLAINTEXT://kafka.kafka.svc.cluster.local:9092,SASL_SSL://kafka.kafka.svc.cluster.local:9094

listener.security.protocol.map=PLAINTEXT:PLAINTEXT,SASL_SSL:SASL_SSL,CONTROLLER:PLAINTEXT

---

SUCCESS CRITERIA

Port 9094 listening

Kafka healthy

Restart count zero

