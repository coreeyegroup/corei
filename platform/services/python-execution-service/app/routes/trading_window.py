from fastapi import APIRouter

from app.models.trading_window import (
    TradingWindowRequest,
    TradingWindowResponse
)

from app.services.trading_window_service import (
    generate_trading_window_state
)

router = APIRouter()


@router.post(
    "/api/v1/trading-window/state",
    response_model=TradingWindowResponse
)
def trading_window_state(
    request: TradingWindowRequest
):

    return generate_trading_window_state(
        request.workflow_id,
        request.market,
        request.market_profile,
        request.utc_timestamp,
        request.phase_state
    )
