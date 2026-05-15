import os
import json
import psycopg2

from kafka import KafkaConsumer

KAFKA_BROKER = os.getenv(
    "KAFKA_BROKER",
    "kafka-broker-0.kafka.kafka.svc.cluster.local:9092"
)

POSTGRES_HOST = os.getenv(
    "POSTGRES_HOST",
    "postgres.storage.svc.cluster.local"
)

POSTGRES_DB = os.getenv(
    "POSTGRES_DB",
    "coredb"
)

POSTGRES_USER = os.getenv(
    "POSTGRES_USER",
    "postgres"
)

POSTGRES_PASSWORD = os.getenv(
    "POSTGRES_PASSWORD"
)

consumer = KafkaConsumer(
    "audit_stream",
    bootstrap_servers=[KAFKA_BROKER],
    auto_offset_reset="earliest",
    enable_auto_commit=True,
    group_id="persistence-writer-audit-cg",
    value_deserializer=lambda x: json.loads(x.decode("utf-8"))
)

conn = psycopg2.connect(
    host=POSTGRES_HOST,
    dbname=POSTGRES_DB,
    user=POSTGRES_USER,
    password=POSTGRES_PASSWORD
)

cursor = conn.cursor()

print("Persistence writer started...")

for message in consumer:
    event = message.value

    event_id = event.get("event_id")
    event_type = event.get("event_type")
    payload = json.dumps(event)
    created_at = int(event.get("created_at", 0))

    cursor.execute(
        """
        INSERT INTO audit_log (
            event_id,
            event_type,
            payload,
            created_at
        )
        VALUES (%s, %s, %s, %s)
        ON CONFLICT (event_id) DO NOTHING
        """,
        (
            event_id,
            event_type,
            payload,
            created_at
        )
    )

    conn.commit()

    print(f"Ingested audit event: {event_id}")
