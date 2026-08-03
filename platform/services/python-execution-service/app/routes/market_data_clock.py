from fastapi import APIRouter

from app.models.market_data_clock import (
    MarketDataClockRequest,
    MarketDataClockResponse
)

from app.services.market_data_clock_service import (
    generate_market_data_clock_state
)

router = APIRouter()


@router.post(
    "/api/v1/market-data-clock/state",
    response_model=MarketDataClockResponse
)
def market_data_clock_state(
    request: MarketDataClockRequest
):

    return generate_market_data_clock_state(
        request.workflow_id,
        request.market,
        request.market_profile
    )
