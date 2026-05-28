import time
import pandas as pd
import mlflow


INPUT_PATH = (
    "/home/jovyan/generated_features/"
    "persisted_goldfx_features_v1.parquet"
)

OUTPUT_PATH = (
    "/home/jovyan/replay_results/"
    "deterministic_replay_results.parquet"
)


REPLAY_SPEED = 0.0001

SHORT_WINDOW = 5
LONG_WINDOW = 20


df = pd.read_parquet(INPUT_PATH)

df["short_ma"] = (
    df["mid_price"]
    .rolling(SHORT_WINDOW)
    .mean()
)

df["long_ma"] = (
    df["mid_price"]
    .rolling(LONG_WINDOW)
    .mean()
)

position = 0

entry_price = None

trades = []

buy_signals = 0
sell_signals = 0


mlflow.set_experiment(
    "deterministic-replay-engine"
)

with mlflow.start_run():

    for i in range(LONG_WINDOW, len(df)):

        row = df.iloc[i]

        short_ma = row["short_ma"]
        long_ma = row["long_ma"]

        price = row["mid_price"]

        replay_timestamp = row["event_time"]

        time.sleep(REPLAY_SPEED)

        if short_ma > long_ma and position == 0:

            position = 1

            entry_price = price

            buy_signals += 1

            trades.append({
                "event_time": replay_timestamp,
                "action": "BUY",
                "price": price,
            })

            print(
                f"[BUY] "
                f"{price} "
                f"{replay_timestamp}"
            )

        elif short_ma < long_ma and position == 1:

            pnl = price - entry_price

            position = 0

            sell_signals += 1

            trades.append({
                "event_time": replay_timestamp,
                "action": "SELL",
                "price": price,
                "pnl": pnl,
            })

            print(
                f"[SELL] "
                f"{price} "
                f"PnL={pnl}"
            )

    trades_df = pd.DataFrame(trades)

    total_pnl = (
        trades_df["pnl"].sum()
        if "pnl" in trades_df.columns
        else 0
    )

    mlflow.log_metric(
        "buy_signals",
        buy_signals
    )

    mlflow.log_metric(
        "sell_signals",
        sell_signals
    )

    mlflow.log_metric(
        "total_pnl",
        total_pnl
    )

    mlflow.log_metric(
        "total_trades",
        len(trades_df)
    )

    trades_df.to_parquet(OUTPUT_PATH)

    print("\n=== REPLAY SUMMARY ===")

    print(
        f"Buy signals: {buy_signals}"
    )

    print(
        f"Sell signals: {sell_signals}"
    )

    print(
        f"Total trades: {len(trades_df)}"
    )

    print(
        f"Total PnL: {total_pnl}"
    )

    print(
        f"Replay results written to: "
        f"{OUTPUT_PATH}"
    )
