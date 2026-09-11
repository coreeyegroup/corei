import os

from app.config.settings import KAFKA_BOOTSTRAP_SERVERS
from app.connectors.base_connector import BaseBrokerConnector
from app.connectors.mock_connector import MockBrokerConnector
from app.connectors.upstox_connector import UpstoxConnector
from app.publishers.kafka_publisher import KafkaPublisher
from app.validators.tick_validator import TickValidator


class MarketDataIngestionService:
    def __init__(self) -> None:
        provider = os.getenv(
            "MARKET_DATA_PROVIDER",
            "mock",
        ).strip().lower()

        if provider == "upstox":
            self.connector: BaseBrokerConnector = UpstoxConnector()
        elif provider == "mock":
            self.connector = MockBrokerConnector()
        else:
            raise ValueError(
                f"Unsupported MARKET_DATA_PROVIDER: {provider}"
            )

        self.publisher = KafkaPublisher(
            KAFKA_BOOTSTRAP_SERVERS
        )

    async def run(self) -> None:
        await self.connector.connect()
        await self.publisher.start()

        try:
            while True:
                tick = await self.connector.get_next_tick()
                TickValidator.validate(tick)
                await self.publisher.publish_tick(tick)
        finally:
            await self.connector.disconnect()
            await self.publisher.stop()
