from app.models.market_tick import MarketTick


class TickValidator:

    @staticmethod
    def validate(tick: MarketTick) -> None:

        if tick.exchange_timestamp_ns <= 0:
            raise ValueError("invalid exchange timestamp")

        if tick.ingestion_timestamp_ns <= 0:
            raise ValueError("invalid ingestion timestamp")

        if tick.bid_price <= 0:
            raise ValueError("invalid bid price")

        if tick.ask_price <= 0:
            raise ValueError("invalid ask price")

        if tick.bid_price >= tick.ask_price:
            raise ValueError("crossed market detected")
