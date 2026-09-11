import json
import time
from datetime import datetime, timezone

from core_platform.services.ttl_validator import (
    signal_is_stale
)

from core_platform.services.event_emitter import (
    emit_event
)

SIGNALS = [
    {
        "signal_id": "abc123",
        "strategy_id": "stock_momentum_strategy",
        "instrument_id": "BANKNIFTY",
        "direction": "LONG",
        "strength_bps": 8200,
        "confidence_bps": 7600,
        "timeframe": "15m",
        "event_time": datetime.now(
            timezone.utc
        ).isoformat()
    },
    {
        "signal_id": "expired001",
        "strategy_id": "gold_timing_strategy",
        "instrument_id": "XAUUSD",
        "direction": "LONG",
        "strength_bps": 7900,
        "confidence_bps": 7400,
        "timeframe": "15m",
        "event_time": "2020-01-01T00:00:00+00:00"
    }
]

processed_signal_ids = set()

def signal_is_duplicate(signal):

    return signal["signal_id"] in processed_signal_ids

def validate_signal(signal):

    if signal_is_duplicate(signal):
        return None

    if signal_is_stale(signal["event_time"]):
        return None

    processed_signal_ids.add(
        signal["signal_id"]
    )

    payload = {
        "validated": True,
        "validated_at": datetime.now(
            timezone.utc
        ).isoformat(),
        "signal": signal
    }

    emit_event(
        "signal_events",
        payload
    )

    return payload

if __name__ == "__main__":

    while True:

        validated_signals = []

        for signal in SIGNALS:

            validated = validate_signal(signal)

            if validated:
                validated_signals.append(
                    validated
                )

        print(
            json.dumps(
                validated_signals,
                indent=2
            )
        )

        time.sleep(60)
