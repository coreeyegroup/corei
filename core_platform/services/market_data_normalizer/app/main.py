import asyncio
import json

from aiokafka import AIOKafkaConsumer
from aiokafka import AIOKafkaProducer

from app.config import settings
from app.normalizer import MarketDataNormalizer


async def main():
    consumer = AIOKafkaConsumer(
        settings.raw_topic,
        bootstrap_servers=settings.kafka_bootstrap_servers,
        group_id="market-data-normalizer",
    )

    producer = AIOKafkaProducer(
        bootstrap_servers=settings.kafka_bootstrap_servers,
    )

    normalizer = MarketDataNormalizer()

    await consumer.start()
    await producer.start()

    try:
        async for message in consumer:
            normalized = normalizer.normalize(message.value)

            print(normalized)

            await producer.send_and_wait(
                settings.normalized_topic,
                json.dumps(normalized).encode(),
            )

    finally:
        await consumer.stop()
        await producer.stop()


if __name__ == "__main__":
    asyncio.run(main())
