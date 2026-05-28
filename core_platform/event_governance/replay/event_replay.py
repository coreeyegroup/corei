#!/usr/bin/env python3

from pathlib import Path


AUDIT_STREAM_PATH = (
    "events/audit_stream/audit-events.jsonl"
)


class EventReplay:

    def replay(self):

        path = Path(AUDIT_STREAM_PATH)

        if not path.exists():
            return {
                "events_replayed": 0
            }

        events = path.read_text().splitlines()

        return {
            "events_replayed": len(events)
        }


if __name__ == "__main__":

    replay = EventReplay()

    print(
        replay.replay()
    )
