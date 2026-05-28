import hashlib
import json
from datetime import datetime, timezone

DATASET_PATH = "infrastructure/replay/stage-14/datasets/trading-lineage.json"

RESULT_PATH = "infrastructure/replay/stage-14/results/replay-results.json"

with open(DATASET_PATH, "r") as f:
    records = json.load(f)

results = []

for record in records:

    signal_source = (
        f'{record["instrument_id"]}'
        f'{record["strategy_id"]}'
        f'{record["signal_strength_bps"]}'
    )

    signal_hash = hashlib.sha256(
        signal_source.encode()
    ).hexdigest()

    trade_intent_source = (
        f'{record["instrument_id"]}'
        f'{signal_hash}'
    )

    trade_intent_hash = hashlib.sha256(
        trade_intent_source.encode()
    ).hexdigest()

    result = {
        "instrument_id": record["instrument_id"],
        "signal_hash": signal_hash,
        "trade_intent_hash": trade_intent_hash,
        "validated_at": datetime.now(
            timezone.utc
        ).isoformat()
    }

    results.append(result)

with open(RESULT_PATH, "w") as f:
    json.dump(results, f, indent=2)

print(json.dumps(results, indent=2))
