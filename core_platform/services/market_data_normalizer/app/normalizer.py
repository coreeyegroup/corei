import json
import time

from app.symbols import SYMBOL_MAPPING


class MarketDataNormalizer:
    def normalize(self, raw_event: bytes) -> dict:
        payload = json.loads(raw_event.decode())

        instrument = payload["instrument"]

        normalized_symbol = SYMBOL_MAPPING.get(
            instrument,
            instrument,
        )

        exchange_ts = payload.get("exchange_timestamp_ns")

        ingestion_ts = payload.get("ingestion_timestamp_ns")

        event_time = (
            exchange_ts
            if exchange_ts
            else ingestion_ts
        )

        normalized = {
            "event_id": payload["event_id"],
            "symbol": normalized_symbol,
            "event_time": int(event_time),
            "bid_price": str(payload["bid_price"]),
            "ask_price": str(payload["ask_price"]),
            "bid_size": str(payload["bid_size"]),
            "ask_size": str(payload["ask_size"]),
            "normalized_timestamp_ns": time.time_ns(),
            "source": payload["source"],
        }

        return normalized
