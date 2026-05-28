#!/usr/bin/env python3

import json
from pathlib import Path

from core_platform.portfolio.engine.portfolio_state_engine import (
    PortfolioStateEngine
)


EVENT_LOG = "replay/events/fills.jsonl"


class ReplayEngine:

    def replay(self):

        engine = PortfolioStateEngine()

        path = Path(EVENT_LOG)

        if not path.exists():

            return {}

        for line in path.read_text().splitlines():

            event = json.loads(line)

            engine.apply_fill(
                event["symbol"],
                event["quantity"],
                event["price"]
            )

        return engine.snapshot()


if __name__ == "__main__":

    replay = ReplayEngine()

    print(
        replay.replay()
    )
