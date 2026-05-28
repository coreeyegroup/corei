import json
import hashlib
import time
from datetime import datetime, timezone

from core_platform.services.event_emitter import emit_event

INSTRUMENTS = [
    ("BANKNIFTY", 9000),
    ("NIFTY50", 7000),
    ("XAUUSD", 6000)
]

def generate_screened():

    screened = []

    event_time = datetime.now(
        timezone.utc
    ).isoformat()

    for ranking, (instrument, liquidity) in enumerate(
        INSTRUMENTS,
        start=1
    ):

        cycle_id = hashlib.sha256(
            f"{instrument}{event_time}".encode()
        ).hexdigest()

        payload = {
            "instrument_id": instrument,
            "screen_cycle_id": cycle_id,
            "ranking": ranking,
            "liquidity_score": liquidity,
            "volatility_score": int(liquidity * 0.9),
            "trend_score": int(liquidity * 0.8),
            "momentum_score": int(liquidity * 0.7),
            "correlation_score": int(liquidity * 0.1),
            "event_time": event_time
        }

        emit_event(
            "instrument_screened",
            payload
        )

        screened.append(payload)

    return screened

if __name__ == "__main__":

    while True:

        result = generate_screened()

        print(json.dumps(result, indent=2))

        time.sleep(60)
