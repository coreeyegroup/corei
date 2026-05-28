#!/usr/bin/env python3

import json
from pathlib import Path


DLQ_PATH = (
    "events/dead_letter_stream/dead-events.jsonl"
)


class DeadLetterRouter:

    def route(
        self,
        event: dict
    ):

        Path(DLQ_PATH).parent.mkdir(
            parents=True,
            exist_ok=True
        )

        with open(DLQ_PATH, "a") as stream:
            stream.write(
                json.dumps(event) + "\n"
            )

        return {
            "dead_lettered": True
        }


if __name__ == "__main__":

    router = DeadLetterRouter()

    print(
        router.route({
            "event_id": "dead-001"
        })
    )
