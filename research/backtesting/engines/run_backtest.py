import pandas as pd
import mlflow
from pathlib import Path

from momentum_strategy import MomentumStrategy

FEATURE_DATASET = (
    "/home/jovyan/generated_features/"
    "goldfx_features_v1.parquet"
)

OUTPUT_DIR = Path(
    "/home/jovyan/backtest_results"
)

OUTPUT_DIR.mkdir(
    parents=True,
    exist_ok=True
)

df = pd.read_parquet(FEATURE_DATASET)

strategy = MomentumStrategy()

cash = 100000.0
position = 0
entry_price = None

buy_signals = 0
sell_signals = 0

trade_log = []

for _, row in df.iterrows():

    tick = row.to_dict()

    signal = strategy.on_tick(tick)

    price = tick["mid_price"]

    if signal == "BUY":

        buy_signals += 1

        if position == 0:

            position = 1
            entry_price = price

            trade_log.append({
                "action": "BUY",
                "price": price,
                "event_time": tick["event_time"]
            })

    elif signal == "SELL":

        sell_signals += 1

        if position == 1:

            pnl = price - entry_price

            cash += pnl

            trade_log.append({
                "action": "SELL",
                "price": price,
                "event_time": tick["event_time"],
                "pnl": pnl
            })

            position = 0
            entry_price = None

total_return = cash - 100000.0

results = pd.DataFrame(trade_log)

results_file = (
    OUTPUT_DIR /
    "momentum_strategy_results.parquet"
)

results.to_parquet(results_file)

mlflow.set_tracking_uri(
    "http://mlflow.research.svc.cluster.local:5000"
)

mlflow.set_experiment(
    "coreeye_backtests"
)

with mlflow.start_run():

    mlflow.log_param(
        "strategy",
        "momentum_strategy_v1"
    )

    mlflow.log_metric(
        "total_return",
        total_return
    )

    mlflow.log_metric(
        "trade_count",
        len(results)
    )

    mlflow.log_metric(
        "buy_signals",
        buy_signals
    )

    mlflow.log_metric(
        "sell_signals",
        sell_signals
    )

print(results.head())

print(f"\nTrades executed: {len(results)}")
print(f"Buy signals: {buy_signals}")
print(f"Sell signals: {sell_signals}")
print(f"Total return: {total_return}")

print(
    f"\nBacktest results written to:"
    f" {results_file}"
)
