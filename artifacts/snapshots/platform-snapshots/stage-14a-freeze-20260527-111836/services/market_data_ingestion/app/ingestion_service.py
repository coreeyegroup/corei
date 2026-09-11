from app.config.settings import KAFKA_BOOTSTRAP_SERVERS

from app.connectors.mock_connector import MockBrokerConnector

from app.publishers.kafka_publisher import KafkaPublisher

from app.validators.tick_validator import TickValidator


class MarketDataIngestionService:

    def __init__(self):

        self.connector = MockBrokerConnector()

        self.publisher = KafkaPublisher(
            KAFKA_BOOTSTRAP_SERVERS
        )

    async def run(self) -> None:

        await self.connector.connect()

        await self.publisher.start()

        while True:

            tick = await self.connector.get_next_tick()

            TickValidator.validate(tick)

            await self.publisher.publish_tick(tick)
