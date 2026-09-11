import hashlib
import json
import time
from datetime import datetime, timezone

from core_platform.services.event_emitter import emit_event

MONITOR_EVENTS = [
    {
        "instrument_id": "BANKNIFTY",
        "monitor_state": "READY_FOR_ENTRY",
        "strategy_id": "stock_momentum_strategy"
    },
    {
        "instrument_id": "XAUUSD",
        "monitor_state": "READY_FOR_ENTRY",
        "strategy_id": "gold_timing_strategy"
    }
]

def generate_signal(event):

    event_time = datetime.now(
        timezone.utc
    ).isoformat()

    direction = "LONG"

    strength_bps = 8200

    confidence_bps = 7600

    signal_source = (
        f'{event["instrument_id"]}'
        f'{direction}'
        f'{strength_bps}'
        f'{event_time}'
        f'{event["strategy_id"]}'
    )

    signal_id = hashlib.sha256(
        signal_source.encode()
    ).hexdigest()

    payload = {
        "signal_id": signal_id,
        "strategy_id": event["strategy_id"],
        "instrument_id": event["instrument_id"],
        "direction": direction,
        "strength_bps": strength_bps,
        "confidence_bps": confidence_bps,
        "timeframe": "15m",
        "event_time": event_time
    }

    emit_event(
        "signal_events",
        payload
    )

    return payload

if __name__ == "__main__":

    while True:

        signals = []

        for event in MONITOR_EVENTS:

            signal = generate_signal(event)

            signals.append(signal)

        print(json.dumps(signals, indent=2))

        time.sleep(60)
