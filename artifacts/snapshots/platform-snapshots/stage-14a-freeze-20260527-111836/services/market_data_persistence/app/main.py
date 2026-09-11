import asyncio
import json

import asyncpg

from aiokafka import AIOKafkaConsumer


KAFKA_BOOTSTRAP = "kafka.kafka.svc.cluster.local:9092"

TOPIC = "normalized_market_data_stream"

DATABASE_URL = (
    "postgresql://coreeye:coreeye"
    "@timescaledb.database.svc.cluster.local:5432/marketdata"
)


async def main():
    conn = await asyncpg.connect(DATABASE_URL)

    consumer = AIOKafkaConsumer(
        TOPIC,
        bootstrap_servers=KAFKA_BOOTSTRAP,
        group_id="market-data-persistence",
    )

    await consumer.start()

    try:
        async for message in consumer:
            payload = json.loads(message.value.decode())

            await conn.execute(
                """
                INSERT INTO ticks (
                    event_id,
                    symbol,
                    event_time,
                    bid_price,
                    ask_price,
                    bid_size,
                    ask_size,
                    normalized_timestamp_ns,
                    source
                )
                VALUES (
                    $1,$2,$3,$4,$5,$6,$7,$8,$9
                )
                ON CONFLICT (event_id) DO NOTHING
                """,
                payload["event_id"],
                payload["symbol"],
                payload["event_time"],
                str(payload["bid_price"]),
                str(payload["ask_price"]),
                str(payload["bid_size"]),
                str(payload["ask_size"]),
                payload["normalized_timestamp_ns"],
                payload["source"],
            )

            print(
                f"PERSISTED: "
                f"{payload['symbol']} "
                f"{payload['event_id']}"
            )

    finally:
        await consumer.stop()
        await conn.close()


asyncio.run(main())
