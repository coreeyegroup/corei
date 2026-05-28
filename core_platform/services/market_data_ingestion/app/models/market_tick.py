from dataclasses import dataclass
from decimal import Decimal


@dataclass
class MarketTick:
    event_id: str

    instrument: str

    exchange_timestamp_ns: int

    ingestion_timestamp_ns: int

    bid_price: Decimal

    ask_price: Decimal

    bid_size: Decimal

    ask_size: Decimal

    source: str
