#!/usr/bin/env python3

import subprocess
from pathlib import Path


OUTPUT_DIR = Path(
    "state/security/kafka/v2/manifests"
)

OUTPUT_FILE = OUTPUT_DIR / "live-statefulset.yaml"


def main():

    OUTPUT_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    result = subprocess.run(
        [
            "kubectl",
            "get",
            "statefulset",
            "kafka",
            "-n",
            "kafka",
            "-o",
            "yaml"
        ],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        raise RuntimeError(
            result.stderr
        )

    if not result.stdout.strip():
        raise RuntimeError(
            "empty statefulset output"
        )

    OUTPUT_FILE.write_text(
        result.stdout
    )

    print(
        f"[PASS] collected: {OUTPUT_FILE}"
    )


if __name__ == "__main__":
    main()

