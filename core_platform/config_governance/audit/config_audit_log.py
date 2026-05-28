#!/usr/bin/env python3

import json
from pathlib import Path


AUDIT_PATH = (
    "artifacts/configuration/config-audit-log.json"
)


class ConfigAuditLog:

    def write_event(
        self,
        event: dict
    ):

        Path(AUDIT_PATH).write_text(
            json.dumps(event, indent=2)
        )

        return {
            "audit_logged": True
        }


if __name__ == "__main__":

    audit = ConfigAuditLog()

    print(
        audit.write_event({
            "event": "config_snapshot_created"
        })
    )
