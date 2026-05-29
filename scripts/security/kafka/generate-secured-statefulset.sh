#!/usr/bin/env bash

set -euo pipefail

SOURCE="state/security/kafka/final-manifest-review/kafka-clean.yaml"
TARGET="state/security/kafka/final-manifest-review/kafka-statefulset-secured.yaml"

cp "${SOURCE}" "${TARGET}"

python3 <<'PY'
from pathlib import Path

p = Path("state/security/kafka/final-manifest-review/kafka-statefulset-secured.yaml")
text = p.read_text()

# ------------------------------------------------------------------
# LISTENERS
# ------------------------------------------------------------------

text = text.replace(
    "listeners=PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093",
    "listeners=PLAINTEXT://0.0.0.0:9092,SASL_SSL://0.0.0.0:9094,CONTROLLER://0.0.0.0:9093"
)

text = text.replace(
    "advertised.listeners=PLAINTEXT://kafka.kafka.svc.cluster.local:9092",
    "advertised.listeners=PLAINTEXT://kafka.kafka.svc.cluster.local:9092,SASL_SSL://kafka.kafka.svc.cluster.local:9094"
)

text = text.replace(
    "listener.security.protocol.map=PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT",
    "listener.security.protocol.map=PLAINTEXT:PLAINTEXT,SASL_SSL:SASL_SSL,CONTROLLER:PLAINTEXT"
)

# ------------------------------------------------------------------
# SCRAM + TLS
# ------------------------------------------------------------------

text = text.replace(
    "inter.broker.listener.name=PLAINTEXT",
    """inter.broker.listener.name=PLAINTEXT

          sasl.enabled.mechanisms=SCRAM-SHA-512

          ssl.keystore.location=/etc/kafka/tls/keystore.jks
          ssl.keystore.password=changeit

          ssl.key.password=changeit

          ssl.truststore.location=/etc/kafka/tls/truststore.jks
          ssl.truststore.password=changeit"""
)

# ------------------------------------------------------------------
# KAFKA_OPTS
# ------------------------------------------------------------------

text = text.replace(
    """        env:
        - name: CLUSTER_ID
          value: MkU3OEVBNTcwNTJENDM2Qk""",
    """        env:
        - name: CLUSTER_ID
          value: MkU3OEVBNTcwNTJENDM2Qk
        - name: KAFKA_OPTS
          value: >-
            -Djava.security.auth.login.config=/etc/kafka/security/kafka_jaas.conf"""
)

# ------------------------------------------------------------------
# PORT 9094
# ------------------------------------------------------------------

text = text.replace(
    """        - containerPort: 9092
          name: broker
          protocol: TCP
        - containerPort: 9093""",
    """        - containerPort: 9092
          name: broker
          protocol: TCP
        - containerPort: 9094
          name: sasl-ssl
          protocol: TCP
        - containerPort: 9093"""
)

# ------------------------------------------------------------------
# CONTAINER MOUNTS
# ------------------------------------------------------------------

text = text.replace(
    """        volumeMounts:
        - mountPath: /var/lib/kafka/data
          name: kafka-data""",
    """        volumeMounts:
        - mountPath: /var/lib/kafka/data
          name: kafka-data
        - mountPath: /etc/kafka/tls
          name: kafka-runtime-tls
          readOnly: true
        - mountPath: /etc/kafka/security
          name: kafka-security-runtime
          readOnly: true"""
)

# ------------------------------------------------------------------
# POD VOLUMES
# ------------------------------------------------------------------

text = text.replace(
    """      restartPolicy: Always""",
    """      volumes:
      - name: kafka-runtime-tls
        secret:
          secretName: kafka-runtime-tls
      - name: kafka-security-runtime
        secret:
          secretName: kafka-security-runtime

      restartPolicy: Always"""
)

p.write_text(text)
PY

echo
echo "[PASS] Secured StatefulSet generated"
echo "${TARGET}"
