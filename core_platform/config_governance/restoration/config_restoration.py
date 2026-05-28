#!/usr/bin/env python3

from pathlib import Path


class ConfigRestoration:

    def restore(
        self,
        snapshot_path: str
    ):

        snapshot = Path(snapshot_path).read_text()

        return {
            "restored": True,
            "snapshot": snapshot
        }


if __name__ == "__main__":

    restoration = ConfigRestoration()

    print(
        restoration.restore(
            "artifacts/configuration/config-snapshot.json"
        )
    )
