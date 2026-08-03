# RUNTIME MUTATION SPECIFICATION

TARGET

manifest_generator.py

---

MUTATION SCOPE

Startup script only.

---

MUTATIONS

Replace:

listeners=PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093

With:

listeners=PLAINTEXT://0.0.0.0:9092,SASL_SSL://0.0.0.0:9094,CONTROLLER://0.0.0.0:9093

---

Replace:

advertised.listeners=PLAINTEXT://kafka.kafka.svc.cluster.local:9092

With:

advertised.listeners=PLAINTEXT://kafka.kafka.svc.cluster.local:9092,SASL_SSL://kafka.kafka.svc.cluster.local:9094

---

Replace:

listener.security.protocol.map=PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT

With:

listener.security.protocol.map=PLAINTEXT:PLAINTEXT,SASL_SSL:SASL_SSL,CONTROLLER:PLAINTEXT
