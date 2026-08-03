from fastapi import APIRouter

from app.models.market_event import (
    MarketEventRequest,
    MarketEventResponse
)

from app.services.market_event_service import (
    generate_market_event_state
)

router = APIRouter()


@router.post(
    "/api/v1/market-event/state",
    response_model=MarketEventResponse
)
def market_event_state(
    request: MarketEventRequest
):

    return generate_market_event_state(
        request.workflow_id,
        request.market,
        request.market_profile,
        request.window_state
    )
