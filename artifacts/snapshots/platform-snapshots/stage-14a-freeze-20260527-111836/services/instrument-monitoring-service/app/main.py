import itertools
import json
import time
from datetime import datetime, timezone

from core_platform.services.event_emitter import emit_event

MONITOR_STATES = [
    "READY_FOR_ENTRY",
    "NO_TRADE",
    "APPROACHING_EXIT",
    "BLOCKED"
]

INSTRUMENTS = [
    "BANKNIFTY",
    "NIFTY50",
    "XAUUSD"
]

state_cycle = itertools.cycle(MONITOR_STATES)

def generate_monitor_events():

    events = []

    for instrument in INSTRUMENTS:

        state = next(state_cycle)

        payload = {
            "instrument_id": instrument,
            "monitor_state": state,
            "strategy_context": "multi_timeframe_alignment",
            "session_state": "SESSION_OPEN",
            "volatility_regime": "NORMAL",
            "news_block_active": False,
            "event_time": datetime.now(
                timezone.utc
            ).isoformat()
        }

        emit_event(
            "instrument_monitor_events",
            payload
        )

        events.append(payload)

    return events

if __name__ == "__main__":

    while True:

        result = generate_monitor_events()

        print(json.dumps(result, indent=2))

        time.sleep(30)
