#!/usr/bin/env python3

import json
from pathlib import Path

SNAPSHOT_PATH = (
    "portfolio/snapshots/latest_snapshot.json"
)


class SnapshotEngine:

    def persist(
        self,
        state: dict
    ):

        Path(SNAPSHOT_PATH).parent.mkdir(
            parents=True,
            exist_ok=True
        )

        Path(SNAPSHOT_PATH).write_text(
            json.dumps(state, indent=2)
        )

        return {
            "snapshot_written": True
        }


if __name__ == "__main__":

    snapshot = SnapshotEngine()

    print(
        snapshot.persist({
            "EURUSD": {
                "quantity": "100000"
            }
        })
    )
