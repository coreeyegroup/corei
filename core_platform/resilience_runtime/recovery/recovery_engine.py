#!/usr/bin/env python3

import json
from pathlib import Path


RECOVERY_LOG = (
    "resilience/recovery/recovery-log.json"
)


class RecoveryEngine:

    def persist_recovery(
        self,
        event: dict
    ):

        Path(RECOVERY_LOG).parent.mkdir(
            parents=True,
            exist_ok=True
        )

        Path(RECOVERY_LOG).write_text(
            json.dumps(event, indent=2)
        )

        return {
            "recovery_logged": True
        }


if __name__ == "__main__":

    recovery = RecoveryEngine()

    print(
        recovery.persist_recovery({
            "service": "portfolio-service",
            "status": "recovered"
        })
    )
