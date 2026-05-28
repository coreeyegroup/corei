import json
import pandas as pd


INPUT_PATH = (
    "/home/jovyan/replay_datasets/"
    "persisted_goldfx_replay_v1.json"
)

OUTPUT_PATH = (
    "/home/jovyan/generated_features/"
    "persisted_goldfx_features_v1.parquet"
)


with open(INPUT_PATH) as f:
    data = json.load(f)

df = pd.DataFrame(data)

df["bid_price"] = df["bid_price"].astype(float)
df["ask_price"] = df["ask_price"].astype(float)

df["mid_price"] = (
    df["bid_price"] +
    df["ask_price"]
) / 2

df["spread"] = (
    df["ask_price"] -
    df["bid_price"]
)

df["returns"] = (
    df["mid_price"]
    .pct_change()
    .fillna(0)
)

print(df.head())

print(df["mid_price"].nunique())

print(df["returns"].describe())

df.to_parquet(OUTPUT_PATH)

print(
    f"Replay features written to: "
    f"{OUTPUT_PATH}"
)
