import json
import psycopg2


OUTPUT_PATH = (
    "/home/jovyan/replay_datasets/"
    "persisted_goldfx_replay_v1.json"
)

QUERY = """
SELECT
    event_id,
    symbol,
    event_time,
    bid_price,
    ask_price,
    bid_size,
    ask_size,
    normalized_timestamp_ns,
    source
FROM ticks
WHERE symbol = 'GOLD.FX'
ORDER BY event_time DESC
LIMIT 10000
"""


conn = psycopg2.connect(
    host="timescaledb.database.svc.cluster.local",
    port=5432,
    database="marketdata",
    user="coreeye",
    password="coreeye"
)

cursor = conn.cursor()

cursor.execute(QUERY)

rows = cursor.fetchall()

dataset = []

for row in rows:
    dataset.append({
        "event_id": row[0],
        "symbol": row[1],
        "event_time": row[2],
        "bid_price": row[3],
        "ask_price": row[4],
        "bid_size": row[5],
        "ask_size": row[6],
        "normalized_timestamp_ns": row[7],
        "source": row[8],
    })

with open(OUTPUT_PATH, "w") as f:
    json.dump(dataset, f)

print(f"Replay rows exported: {len(dataset)}")
print(f"Replay dataset written to: {OUTPUT_PATH}")

cursor.close()
conn.close()
