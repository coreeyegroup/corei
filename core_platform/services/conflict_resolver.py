STRATEGY_PRIORITY = {
    "stock_momentum_strategy": 1,
    "gold_timing_strategy": 2,
    "forex_momentum_strategy": 3,
    "mean_reversion_strategy": 4
}

def resolve_signal_conflicts(signals):

    ordered = sorted(
        signals,
        key=lambda signal: (
            STRATEGY_PRIORITY.get(
                signal["strategy_id"],
                999
            ),
            signal["signal_id"]
        )
    )

    return ordered[0]
