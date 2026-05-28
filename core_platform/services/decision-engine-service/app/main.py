import hashlib
import json
import time
from datetime import datetime, timezone

from core_platform.services.event_emitter import (
    emit_event
)

from core_platform.services.conflict_resolver import (
    resolve_signal_conflicts
)

SIGNALS = [
    {
        "signal_id": "aaa111",
        "strategy_id": "stock_momentum_strategy",
        "instrument_id": "BANKNIFTY",
        "direction": "LONG",
        "strength_bps": 8200
    },
    {
        "signal_id": "bbb222",
        "strategy_id": "mean_reversion_strategy",
        "instrument_id": "BANKNIFTY",
        "direction": "SHORT",
        "strength_bps": 7900
    }
]

def generate_trade_intent(signal):

    event_time = datetime.now(
        timezone.utc
    ).isoformat()

    trade_intent_source = (
        f'{signal["instrument_id"]}'
        f'{signal["signal_id"]}'
        f'{event_time}'
    )

    trade_intent_id = hashlib.sha256(
        trade_intent_source.encode()
    ).hexdigest()

    payload = {
        "trade_intent_id": trade_intent_id,
        "instrument_id": signal["instrument_id"],
        "decision_action": signal["direction"],
        "strategy_set": [
            signal["strategy_id"]
        ],
        "aggregated_strength_bps": signal["strength_bps"],
        "priority_score_bps": 9000,
        "event_time": event_time
    }

    emit_event(
        "decision_events",
        payload
    )

    return payload

if __name__ == "__main__":

    while True:

        selected_signal = resolve_signal_conflicts(
            SIGNALS
        )

        trade_intent = generate_trade_intent(
            selected_signal
        )

        print(
            json.dumps(
                trade_intent,
                indent=2
            )
        )

        time.sleep(60)
