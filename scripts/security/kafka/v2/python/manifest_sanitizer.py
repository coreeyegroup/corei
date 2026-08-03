#!/usr/bin/env python3

import yaml
from pathlib import Path

INPUT_FILE = Path(
    "state/security/kafka/v2/manifests/live-statefulset.yaml"
)

OUTPUT_FILE = Path(
    "state/security/kafka/v2/manifests/normalized-statefulset.yaml"
)


def main():

    manifest = yaml.safe_load(
        INPUT_FILE.read_text()
    )

    metadata = manifest.get("metadata", {})

    metadata.pop("creationTimestamp", None)
    metadata.pop("resourceVersion", None)
    metadata.pop("uid", None)
    metadata.pop("generation", None)

    annotations = metadata.get("annotations", {})

    annotations.pop(
        "kubectl.kubernetes.io/last-applied-configuration",
        None
    )

    if not annotations:
        metadata.pop("annotations", None)

    manifest.pop("status", None)

    OUTPUT_FILE.parent.mkdir(
        parents=True,
        exist_ok=True
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
        f"[PASS] normalized: {OUTPUT_FILE}"
    )


if __name__ == "__main__":
    main()

