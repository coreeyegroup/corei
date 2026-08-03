#!/usr/bin/env python3

import yaml
from pathlib import Path


INPUT_FILE = Path(
    "state/security/kafka/v2/manifests/live-statefulset.yaml"
)

OUTPUT_FILE = Path(
    "state/security/kafka/v2/manifests/parsed-statefulset.yaml"
)


def main():

    if not INPUT_FILE.exists():
        raise RuntimeError(
            f"missing {INPUT_FILE}"
        )

    with open(INPUT_FILE, "r") as f:
        manifest = yaml.safe_load(f)

    if manifest.get("kind") != "StatefulSet":
        raise RuntimeError(
            "expected StatefulSet"
        )

    containers = (
        manifest["spec"]
        ["template"]
        ["spec"]
        .get("containers", [])
    )

    init_containers = (
        manifest["spec"]
        ["template"]
        ["spec"]
        .get("initContainers", [])
    )

    volumes = (
        manifest["spec"]
        ["template"]
        ["spec"]
        .get("volumes", [])
    )

    kafka_container = None

    for container in containers:
        if container.get("name") == "kafka":
            kafka_container = container

    if kafka_container is None:
        raise RuntimeError(
            "kafka container not found"
        )

    parsed = {
        "kind": manifest["kind"],
        "metadata": {
            "name": manifest["metadata"]["name"],
            "namespace": manifest["metadata"]["namespace"]
        },
        "kafka_container_found": True,
        "container_count": len(containers),
        "init_container_count": len(init_containers),
        "volume_count": len(volumes)
    }

    with open(OUTPUT_FILE, "w") as f:
        yaml.safe_dump(
            parsed,
            f,
            sort_keys=False
        )

    print(
        "[PASS] manifest parsed"
    )


if __name__ == "__main__":
    main()
