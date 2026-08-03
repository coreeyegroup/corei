#!/usr/bin/env python3

import yaml
from pathlib import Path


PARSED_FILE = Path(
    "state/security/kafka/v2/manifests/parsed-statefulset.yaml"
)

PLAN_FILE = Path(
    "state/security/kafka/v2/manifests/security-mutation-plan.yaml"
)

OUTPUT_FILE = Path(
    "state/security/kafka/v2/reports/validation-report.yaml"
)


def main():

    parsed = yaml.safe_load(
        PARSED_FILE.read_text()
    )

    plan = yaml.safe_load(
        PLAN_FILE.read_text()
    )

    checks = {
        "kafka_container_found":
            parsed.get(
                "kafka_container_found",
                False
            ),

        "tls_volume_defined":
            bool(
                plan.get(
                    "tls_volume"
                )
            ),

        "jaas_volume_defined":
            bool(
                plan.get(
                    "jaas_volume"
                )
            ),

        "tls_mount_defined":
            bool(
                plan.get(
                    "tls_mount"
                )
            ),

        "jaas_mount_defined":
            bool(
                plan.get(
                    "jaas_mount"
                )
            ),

        "env_var_defined":
            bool(
                plan.get(
                    "env_var"
                )
            ),

        "listener_defined":
            bool(
                plan.get(
                    "listener"
                )
            )
    }

    passed = all(
        checks.values()
    )

    report = {
        "status":
            "PASS" if passed else "FAIL",

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
            "validation failed"
        )

    print(
        "[PASS] validation complete"
    )


if __name__ == "__main__":
    main()
