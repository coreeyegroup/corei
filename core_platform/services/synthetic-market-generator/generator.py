import json
import random
import time
import uuid

from kafka import KafkaProducer

random.seed(42)

producer = KafkaProducer(
    bootstrap_servers=
    'kafka.kafka.svc.cluster.local:9092',
    value_serializer=lambda v:
    json.dumps(v).encode('utf-8')
)

mid_price = 2350.0
spread = 0.2

print("Synthetic market generator started")

while True:

    drift = random.uniform(-0.25, 0.25)

    mid_price += drift

    bid_price = round(
        mid_price - spread / 2,
        2
    )

    ask_price = round(
        mid_price + spread / 2,
        2
    )

    tick = {

        "event_id": str(uuid.uuid4()),

        "symbol": "GOLD.FX",

        "event_time": time.time_ns(),

        "bid_price": str(bid_price),

        "ask_price": str(ask_price),

        "bid_size": str(100),

        "ask_size": str(100),

        "normalized_timestamp_ns":
        time.time_ns(),

        "source": "synthetic-generator"
    }

    producer.send(
        "normalized_market_data_stream",
        tick
    )

    print(tick)

    time.sleep(1)
