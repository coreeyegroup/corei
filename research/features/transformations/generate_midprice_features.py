import json
import pandas as pd
from pathlib import Path

input_path = Path(
    "/home/jovyan/replay_datasets/goldfx_ticks_v1.json"
)

output_dir = Path(
    "/home/jovyan/generated_features"
)

output_dir.mkdir(
    parents=True,
    exist_ok=True
)

with open(input_path) as f:
    data = json.load(f)

df = pd.DataFrame(data)

df["bid_price"] = df["bid_price"].astype(float)
df["ask_price"] = df["ask_price"].astype(float)

df["mid_price"] = (
    df["bid_price"] +
    df["ask_price"]
) / 2.0

df["spread"] = (
    df["ask_price"] -
    df["bid_price"]
)

df["event_time"] = df["event_time"].astype("int64")

output_file = output_dir / "goldfx_features_v1.parquet"

df.to_parquet(output_file)

print(df.head())

print(f"\nGenerated features: {len(df)} rows")
print(f"Feature dataset written to: {output_file}")
