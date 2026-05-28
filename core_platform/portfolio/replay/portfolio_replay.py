#!/usr/bin/env python3

import json
from pathlib import Path

EVENT_PATH = (
    "portfolio/events/fills.jsonl"
)


class PortfolioReplay:

    def replay(self):

        path = Path(EVENT_PATH)

        if not path.exists():

            return {
                "events_replayed": 0
            }

        events = path.read_text().splitlines()

        return {
            "events_replayed": len(events)
        }


if __name__ == "__main__":

    replay = PortfolioReplay()

    print(
        replay.replay()
    )
