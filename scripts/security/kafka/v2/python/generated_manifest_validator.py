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
        has_inter_broker_security
        or has_sasl_ssl_broker
    ):

        if (
            has_inter_broker_security
            and has_sasl_ssl_broker
            and has_inter_broker_scram
        ):

            return "TARGET"

        raise RuntimeError(
            "incomplete target profile detected"
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

    print(
        f"[PASS] profile={profile}"
    )


if __name__ == "__main__":
    main()
