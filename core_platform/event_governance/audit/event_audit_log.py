#!/usr/bin/env python3

import json
from pathlib import Path


AUDIT_LOG_PATH = (
    "artifacts/events/event-audit-log.json"
)


class EventAuditLog:

    def write(
        self,
        event: dict
    ):

        Path(AUDIT_LOG_PATH).write_text(
            json.dumps(event, indent=2)
        )

        return {
            "audit_written": True
        }


if __name__ == "__main__":

    audit = EventAuditLog()

    print(
        audit.write({
            "event": "audit_stream_initialized"
        })
    )
