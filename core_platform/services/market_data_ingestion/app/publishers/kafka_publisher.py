import json

from aiokafka import AIOKafkaProducer

from app.models.market_tick import MarketTick


class KafkaPublisher:

    def __init__(self, bootstrap_servers: str):

        self._producer = AIOKafkaProducer(
            bootstrap_servers=bootstrap_servers
        )

    async def start(self) -> None:
        await self._producer.start()

    async def stop(self) -> None:
        await self._producer.stop()

    async def publish_tick(self, tick: MarketTick) -> None:

        payload = {
            "event_id": tick.event_id,
            "instrument": tick.instrument,
            "exchange_timestamp_ns": tick.exchange_timestamp_ns,
            "ingestion_timestamp_ns": tick.ingestion_timestamp_ns,
            "bid_price": str(tick.bid_price),
            "ask_price": str(tick.ask_price),
            "bid_size": str(tick.bid_size),
            "ask_size": str(tick.ask_size),
            "source": tick.source
        }

        await self._producer.send_and_wait(
            "raw_market_data_stream",
            json.dumps(payload).encode()
        )
