import json
import psycopg2
from pathlib import Path

output_dir = Path("/home/jovyan/replay_datasets")
output_dir.mkdir(parents=True, exist_ok=True)

conn = psycopg2.connect(
    host="timescaledb.database.svc.cluster.local",
    dbname="marketdata",
    user="research_user",
    password="research_password"
)

cursor = conn.cursor()

cursor.execute("""
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
WHERE bid_price IS NOT NULL
AND ask_price IS NOT NULL
ORDER BY normalized_timestamp_ns DESC
LIMIT 5000
""")

rows = cursor.fetchall()

output = []

for row in rows:

    output.append({
        "event_id": str(row[0]),
        "symbol": row[1],
        "event_time": int(row[2]),
        "bid_price": str(row[3]),
        "ask_price": str(row[4]),
        "bid_size": str(row[5]),
        "ask_size": str(row[6]),
        "normalized_timestamp_ns": int(row[7]),
        "source": row[8]
    })

output_file = output_dir / "goldfx_ticks_v1.json"

with open(output_file, "w") as f:
    json.dump(output, f, indent=2)

print(f"Exported {len(output)} ticks")
print(f"Dataset written to: {output_file}")
