#!/usr/bin/env python3

import hashlib
import json
from pathlib import Path


CONFIG_PATH = "config/platform/platform-config.yaml"


class SnapshotEngine:

    def snapshot(self):

        payload = Path(CONFIG_PATH).read_text()

        snapshot_hash = hashlib.sha256(
            payload.encode()
        ).hexdigest()

        snapshot = {
            "snapshot_hash": snapshot_hash,
            "config_path": CONFIG_PATH
        }

        output_path = Path(
            "artifacts/configuration/config-snapshot.json"
        )

        output_path.write_text(
            json.dumps(snapshot, indent=2)
        )

        return snapshot


if __name__ == "__main__":

    engine = SnapshotEngine()

    print(
        engine.snapshot()
    )
