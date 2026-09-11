import asyncio
from collections import deque
from decimal import Decimal

import orjson

from aiokafka import AIOKafkaConsumer
from aiokafka import AIOKafkaProducer


KAFKA_BOOTSTRAP = "kafka.kafka.svc.cluster.local:9092"

INPUT_TOPIC = "normalized_market_data_stream"

OUTPUT_TOPIC = "feature_store_updates"


prices = deque(maxlen=20)


def compute_ema(values, period):
    if len(values) < period:
        return None

    multiplier = Decimal("2") / (Decimal(period) + Decimal("1"))

    ema = Decimal(values[0])

    for price in values[1:]:
        ema = (
            (Decimal(price) - ema) * multiplier
        ) + ema

    return str(round(ema, 5))


def compute_rsi(values, period=14):
    if len(values) < period + 1:
        return None

    gains = []
    losses = []

    for i in range(1, len(values)):
        delta = Decimal(values[i]) - Decimal(values[i - 1])

        if delta >= 0:
            gains.append(delta)
        else:
            losses.append(abs(delta))

    avg_gain = sum(gains) / Decimal(period) if gains else Decimal("0")
    avg_loss = sum(losses) / Decimal(period) if losses else Decimal("0")

    if avg_loss == 0:
        return "100.0"

    rs = avg_gain / avg_loss

    rsi = Decimal("100") - (
        Decimal("100") / (Decimal("1") + rs)
    )

    return str(round(rsi, 5))


async def main():
    consumer = AIOKafkaConsumer(
        INPUT_TOPIC,
        bootstrap_servers=KAFKA_BOOTSTRAP,
        group_id="feature-store-service",
    )

    producer = AIOKafkaProducer(
        bootstrap_servers=KAFKA_BOOTSTRAP,
    )

    await consumer.start()
    await producer.start()

    try:
        async for message in consumer:
            payload = orjson.loads(message.value)

            bid_price = payload["bid_price"]

            prices.append(bid_price)

            ema10 = compute_ema(list(prices), 10)
            ema20 = compute_ema(list(prices), 20)
            rsi14 = compute_rsi(list(prices), 14)

            spread = str(
                Decimal(payload["ask_price"]) -
                Decimal(payload["bid_price"])
            )

            feature_event = {
                "symbol": payload["symbol"],
                "event_time": payload["event_time"],
                "ema_10": ema10,
                "ema_20": ema20,
                "rsi_14": rsi14,
                "spread": spread,
                "source": "feature-store-service",
            }

            await producer.send_and_wait(
                OUTPUT_TOPIC,
                orjson.dumps(feature_event),
            )

            print(
                f"FEATURE UPDATE: "
                f"{payload['symbol']}"
            )

    finally:
        await consumer.stop()
        await producer.stop()


asyncio.run(main())
