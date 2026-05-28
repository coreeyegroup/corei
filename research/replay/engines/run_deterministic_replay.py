import pandas as pd


INPUT_PATH = (
    "/home/jovyan/generated_features/"
    "persisted_goldfx_features_v1.parquet"
)

OUTPUT_PATH = (
    "/home/jovyan/replay_results/"
    "deterministic_replay_results.parquet"
)


df = pd.read_parquet(INPUT_PATH)

df = df.sort_values("event_time").reset_index(drop=True)

df["action"] = "HOLD"

position = 0

entry_price = 0.0

realized_pnl = []

buy_signals = 0
sell_signals = 0
trade_count = 0


for i in range(1, len(df)):

    current_return = df.loc[i, "returns"]

    current_price = df.loc[i, "mid_price"]

    if current_return > 0.002 and position == 0:

        df.loc[i, "action"] = "BUY"

        position = 1

        entry_price = current_price

        buy_signals += 1

        print(
            f"[BUY] "
            f"index={i} "
            f"price={current_price}"
        )

    elif current_return < -0.002 and position == 1:

        df.loc[i, "action"] = "SELL"

        pnl = current_price - entry_price

        realized_pnl.append(pnl)

        position = 0

        trade_count += 1

        sell_signals += 1

        print(
            f"[SELL] "
            f"index={i} "
            f"price={current_price} "
            f"pnl={pnl}"
        )


df["pnl"] = 0.0


sell_indices = df[df["action"] == "SELL"].index

for idx, pnl in zip(sell_indices, realized_pnl):

    df.loc[idx, "pnl"] = pnl


total_return = sum(realized_pnl)


print("\n=== REPLAY SUMMARY ===")

print(f"Trades executed: {trade_count}")

print(f"Buy signals: {buy_signals}")

print(f"Sell signals: {sell_signals}")

print(f"Total PnL: {total_return}")


import os

os.makedirs(
    "/home/jovyan/replay_results",
    exist_ok=True
)

df.to_parquet(OUTPUT_PATH)

print(f"\nReplay results written to: {OUTPUT_PATH}")
