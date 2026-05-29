# FINAL STATEFULSET MUTATION

ENV

ADD

KAFKA_OPTS=
-Djava.security.auth.login.config=/etc/kafka/security/kafka_jaas.conf

PORTS

ADD

9094
name: sasl-ssl

VOLUMES

kafka-runtime-tls

kafka-security-runtime

VOLUME MOUNTS

/etc/kafka/tls

/etc/kafka/security

SERVER.PROPERTIES

listeners=
PLAINTEXT://0.0.0.0:9092,
SASL_SSL://0.0.0.0:9094,
CONTROLLER://0.0.0.0:9093

advertised.listeners=
PLAINTEXT://kafka.kafka.svc.cluster.local:9092,
SASL_SSL://kafka.kafka.svc.cluster.local:9094

listener.security.protocol.map=
PLAINTEXT:PLAINTEXT,
SASL_SSL:SASL_SSL,
CONTROLLER:PLAINTEXT
