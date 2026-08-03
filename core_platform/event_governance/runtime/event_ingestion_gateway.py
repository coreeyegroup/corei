#!/usr/bin/env python3

import json
from pathlib import Path


AUDIT_STREAM_PATH = (
    "events/audit_stream/audit-events.jsonl"
)


class EventIngestionGateway:

    def publish(
        self,
        event: dict
    ):

        Path(AUDIT_STREAM_PATH).parent.mkdir(
            parents=True,
            exist_ok=True
        )

        with open(AUDIT_STREAM_PATH, "a") as stream:
            stream.write(
                json.dumps(event) + "\n"
            )

        return {
            "published": True,
            "event_id": event["event_id"]
        }


if __name__ == "__main__":

    gateway = EventIngestionGateway()

    print(
        gateway.publish({
            "event_id": "evt-001",
            "event_type": "signal.generated",
            "lineage_hash": "abc123",
            "payload": {
                "symbol": "EURUSD"
            }
        })
    )
