#!/usr/bin/env python3

import yaml
from pathlib import Path


INPUT_FILE = Path(
    "state/security/kafka/v2/manifests/parsed-statefulset.yaml"
)

OUTPUT_FILE = Path(
    "state/security/kafka/v2/manifests/security-mutation-plan.yaml"
)


def main():

    with open(INPUT_FILE, "r") as f:
        parsed = yaml.safe_load(f)

    if not parsed.get(
        "kafka_container_found"
    ):
        raise RuntimeError(
            "kafka container missing"
        )

    mutation_plan = {
        "tls_volume": "kafka-runtime-tls",
        "jaas_volume": "kafka-security-runtime",
        "tls_mount": "/etc/kafka/tls",
        "jaas_mount": "/etc/kafka/security",
        "env_var": "KAFKA_OPTS",
        "listener": "SASL_SSL"
    }

    with open(OUTPUT_FILE, "w") as f:
        yaml.safe_dump(
            mutation_plan,
            f,
            sort_keys=False
        )

    print(
        "[PASS] mutation plan generated"
    )


if __name__ == "__main__":
    main()

