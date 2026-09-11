import os
import sys

REPO_ROOT = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../../../.."
    )
)

sys.path.insert(0, REPO_ROOT)

from core_platform.services.conflict_resolver import (
    resolve_signal_conflicts
)

signals = [
    {
        "signal_id": "bbb222",
        "strategy_id": "mean_reversion_strategy"
    },
    {
        "signal_id": "aaa111",
        "strategy_id": "stock_momentum_strategy"
    },
    {
        "signal_id": "ccc333",
        "strategy_id": "gold_timing_strategy"
    }
]

winner = resolve_signal_conflicts(
    signals
)

print(winner)
