from fastapi import APIRouter

from app.models.market_session import (
    MarketSessionRequest,
    MarketSessionResponse
)

from app.services.market_session_service import (
    generate_market_session_state
)

router = APIRouter()


@router.post(
    "/api/v1/market-session/state",
    response_model=MarketSessionResponse
)
def market_session_state(
    request: MarketSessionRequest
):

    return generate_market_session_state(
        request.workflow_id,
        request.market,
        request.utc_timestamp,
        request.business_day
    )
