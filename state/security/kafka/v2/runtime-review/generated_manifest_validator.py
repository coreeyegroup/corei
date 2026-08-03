#!/usr/bin/env python3

import yaml
from pathlib import Path


INPUT_FILE = Path(
    "state/security/kafka/v2/manifests/secured-statefulset.yaml"
)

OUTPUT_FILE = Path(
    "state/security/kafka/v2/reports/generated-manifest-validation.yaml"
)


def count_by_name(items, target):

    total = 0

    for item in items:

        if item.get("name") == target:

            total += 1

    return total


def detect_profile(raw_text):

    has_inter_broker_scram = (
        "sasl.mechanism.inter.broker.protocol=SCRAM-SHA-256"
        in raw_text
    )

    has_inter_broker_security = (
        "security.inter.broker.protocol=SASL_SSL"
        in raw_text
    )

    has_sasl_ssl_broker = (
        "inter.broker.listener.name=SASL_SSL"
        in raw_text
    )

    if (
        has_inter_broker_scram
        or has_inter_broker_security
        or has_sasl_ssl_broker
    ):

        if (
            has_inter_broker_scram
            and has_inter_broker_security
            and has_sasl_ssl_broker
        ):

            return "TARGET"

        raise RuntimeError(
            "mixed target profile detected"
        )

    return "RECOVERY"


def main():

    raw_text = INPUT_FILE.read_text()

    profile = detect_profile(
        raw_text
    )

    manifest = yaml.safe_load(
        raw_text
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
            "kafka container missing"
        )

    volumes = pod_spec.get(
        "volumes",
        []
    )

    mounts = kafka_container.get(
        "volumeMounts",
        []
    )

    env = kafka_container.get(
        "env",
        []
    )

    ports = kafka_container.get(
        "ports",
        []
    )

    checks = {

        "tls_volume_once":
            count_by_name(
                volumes,
                "kafka-runtime-tls"
            ) == 1,

        "jaas_volume_once":
            count_by_name(
                volumes,
                "kafka-security-runtime"
            ) == 1,

        "tls_mount_once":
            count_by_name(
                mounts,
                "kafka-runtime-tls"
            ) == 1,

        "jaas_mount_once":
            count_by_name(
                mounts,
                "kafka-security-runtime"
            ) == 1,

        "kafka_opts_once":
            count_by_name(
                env,
                "KAFKA_OPTS"
            ) == 1,

        "port_9094_once":
            len([
                p
                for p in ports
                if p.get(
                    "containerPort"
                ) == 9094
            ]) == 1,

        "sasl_enabled_mechanisms_present":
            "sasl.enabled.mechanisms=SCRAM-SHA-256"
            in raw_text,

        "listener_scram_jaas_present":
            "listener.name.sasl_ssl.scram-sha-256.sasl.jaas.config"
            in raw_text,

        "listener_sasl_mechanism_present":
            "listener.name.sasl_ssl.sasl.enabled.mechanisms=SCRAM-SHA-256"
            in raw_text,

        "ssl_keystore_location_present":
            "ssl.keystore.location=/etc/kafka/tls/keystore.jks"
            in raw_text,

        "ssl_truststore_location_present":
            "ssl.truststore.location=/etc/kafka/tls/truststore.jks"
            in raw_text,

        "sasl_ssl_listener_present":
            "SASL_SSL://0.0.0.0:9094"
            in raw_text,

        "advertised_sasl_ssl_present":
            "SASL_SSL://kafka.kafka.svc.cluster.local:9094"
            in raw_text,

        "listener_map_contains_sasl_ssl":
            "SASL_SSL:SASL_SSL"
            in raw_text
    }

    if profile == "RECOVERY":

        checks.update({

            "recovery_profile":
                True,

            "inter_broker_scram_absent":
                "sasl.mechanism.inter.broker.protocol"
                not in raw_text,

            "inter_broker_security_absent":
                "security.inter.broker.protocol"
                not in raw_text,

            "sasl_ssl_broker_absent":
                "inter.broker.listener.name=SASL_SSL"
                not in raw_text
        })

    elif profile == "TARGET":

        checks.update({

            "target_profile":
                True,

            "inter_broker_scram_present":
                "sasl.mechanism.inter.broker.protocol=SCRAM-SHA-256"
                in raw_text,

            "inter_broker_security_present":
                "security.inter.broker.protocol=SASL_SSL"
                in raw_text,

            "sasl_ssl_broker_present":
                "inter.broker.listener.name=SASL_SSL"
                in raw_text
        })

    passed = all(
        checks.values()
    )

    report = {
        "status":
            "PASS" if passed else "FAIL",
        "profile":
            profile,
        "checks":
            checks
    }

    OUTPUT_FILE.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    with open(
        OUTPUT_FILE,
        "w"
    ) as f:

        yaml.safe_dump(
            report,
            f,
            sort_keys=False
        )

    if not passed:

        raise RuntimeError(
            "generated manifest validation failed"
        )

    print(
        "[PASS] generated manifest validated"
    )


if __name__ == "__main__":
    main()
