from fastapi import APIRouter

from app.models.trading_day import (
    TradingDayRequest,
    TradingDayResponse
)

from app.services.trading_day_service import (
    generate_trading_day_state
)

router = APIRouter()


@router.post(
    "/api/v1/trading-day/state",
    response_model=TradingDayResponse
)
def trading_day_state(
    request: TradingDayRequest
):

    return generate_trading_day_state(
        request.workflow_id,
        request.market,
        request.business_day,
        request.session_state,
        request.health_state
    )
