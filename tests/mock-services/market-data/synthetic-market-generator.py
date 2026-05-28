#!/usr/bin/env python3

import json
import random
import time
from decimal import Decimal

SEED = 42
random.seed(SEED)

OUTPUT_FILE = "tests/synthetic/output/generated-ticks.jsonl"

CONFIG = {
    "instrument": "EURUSD",
    "tick_count": 100,
    "base_price": Decimal("1.08450"),
    "volatility": Decimal("0.00010"),
    "spread": Decimal("0.00003")
}


def generate_tick(index, last_price):

    delta = Decimal(str(random.uniform(
        float(-CONFIG["volatility"]),
        float(CONFIG["volatility"])
    )))

    bid = last_price + delta
    ask = bid + CONFIG["spread"]

    tick = {
        "event_id": f"tick-{index:06}",
        "instrument": CONFIG["instrument"],
        "timestamp": int(time.time()) + index,
        "bid_price": str(round(bid, 5)),
        "ask_price": str(round(ask, 5))
    }

    return tick, bid


def main():

    current_price = CONFIG["base_price"]

    with open(OUTPUT_FILE, "w") as f:

        for i in range(CONFIG["tick_count"]):

            tick, current_price = generate_tick(
                i,
                current_price
            )

            f.write(json.dumps(tick) + "\n")

    print(
        f"Generated {CONFIG['tick_count']} deterministic ticks"
    )


if __name__ == "__main__":
    main()
