#!/usr/bin/env python3

import yaml
from pathlib import Path


NORMALIZED_FILE = Path(
    "state/security/kafka/v2/manifests/normalized-statefulset.yaml"
)

PLAN_FILE = Path(
    "state/security/kafka/v2/manifests/security-mutation-plan.yaml"
)

OUTPUT_FILE = Path(
    "state/security/kafka/v2/manifests/secured-statefulset.yaml"
)


def ensure_list(obj, key):
    if key not in obj or obj[key] is None:
        obj[key] = []
    return obj[key]


def inject_runtime_security(command_text):

    command_text = command_text.replace(
        "listeners=PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093",
        "listeners=PLAINTEXT://0.0.0.0:9092,SASL_SSL://0.0.0.0:9094,CONTROLLER://0.0.0.0:9093"
    )

    command_text = command_text.replace(
        "advertised.listeners=PLAINTEXT://kafka.kafka.svc.cluster.local:9092",
        "advertised.listeners=PLAINTEXT://kafka.kafka.svc.cluster.local:9092,SASL_SSL://kafka.kafka.svc.cluster.local:9094"
    )

    command_text = command_text.replace(
        "listener.security.protocol.map=PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT",
        "listener.security.protocol.map=PLAINTEXT:PLAINTEXT,SASL_SSL:SASL_SSL,CONTROLLER:PLAINTEXT"
    )

    security_block = """
sasl.enabled.mechanisms=SCRAM-SHA-256

listener.name.sasl_ssl.scram-sha-256.sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required;

listener.name.sasl_ssl.sasl.enabled.mechanisms=SCRAM-SHA-256

sasl.mechanism.inter.broker.protocol=SCRAM-SHA-256

ssl.keystore.location=/etc/kafka/tls/keystore.jks

ssl.truststore.location=/etc/kafka/tls/truststore.jks
"""

    marker = "transaction.state.log.min.isr=1"

    if marker in command_text:
        command_text = command_text.replace(
            marker,
            marker + "\n" + security_block.strip()
        )

    return command_text


def main():

    manifest = yaml.safe_load(
        NORMALIZED_FILE.read_text()
    )

    plan = yaml.safe_load(
        PLAN_FILE.read_text()
    )

    pod_spec = (
        manifest["spec"]
        ["template"]
        ["spec"]
    )

    kafka_container = None

    for container in pod_spec["containers"]:
        if container["name"] == "kafka":
            kafka_container = container
            break

    if kafka_container is None:
        raise RuntimeError(
            "kafka container not found"
        )

    volumes = ensure_list(
        pod_spec,
        "volumes"
    )

    volumes.append({
        "name": plan["tls_volume"],
        "secret": {
            "secretName": plan["tls_volume"]
        }
    })

    volumes.append({
        "name": plan["jaas_volume"],
        "secret": {
            "secretName": plan["jaas_volume"]
        }
    })

    mounts = ensure_list(
        kafka_container,
        "volumeMounts"
    )

    mounts.append({
        "name": plan["tls_volume"],
        "mountPath": plan["tls_mount"],
        "readOnly": True
    })

    mounts.append({
        "name": plan["jaas_volume"],
        "mountPath": plan["jaas_mount"],
        "readOnly": True
    })

    env = ensure_list(
        kafka_container,
        "env"
    )

    env.append({
        "name": plan["env_var"],
        "value":
        "-Djava.security.auth.login.config=/etc/kafka/security/kafka_jaas.conf"
    })

    ports = ensure_list(
        kafka_container,
        "ports"
    )

    ports.append({
        "containerPort": 9094,
        "name": "sasl-ssl",
        "protocol": "TCP"
    })

    args = kafka_container.get("args", [])

    if args:
        args[0] = inject_runtime_security(
            args[0]
        )

    with open(
        OUTPUT_FILE,
        "w"
    ) as f:
        yaml.safe_dump(
            manifest,
            f,
            sort_keys=False
        )

    print(
        "[PASS] secured manifest generated"
    )


if __name__ == "__main__":
    main()
