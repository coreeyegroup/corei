from core_platform.portfolio.engine.portfolio_state_engine import (
    PortfolioStateEngine
)


def test_position_accumulation():

    engine = PortfolioStateEngine()

    engine.apply_fill(
        "EURUSD",
        "100",
        "1.0"
    )

    engine.apply_fill(
        "EURUSD",
        "50",
        "2.0"
    )

    snapshot = engine.snapshot()

    assert snapshot["EURUSD"]["quantity"] == "150"
