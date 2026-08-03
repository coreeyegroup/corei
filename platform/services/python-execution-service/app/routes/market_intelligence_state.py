from fastapi import APIRouter

from app.models.market_intelligence_state import (
    MarketIntelligenceStateRequest,
    MarketIntelligenceStateResponse
)

from app.services.market_intelligence_state_service import (
    MarketIntelligenceStateService
)

router = APIRouter(
    prefix="/api/v1/market-intelligence-state",
    tags=["MARKET_INTELLIGENCE_STATE"]
)


@router.post(
    "/state",
    response_model=MarketIntelligenceStateResponse
)
def get_market_intelligence_state(
    request: MarketIntelligenceStateRequest
):
    return MarketIntelligenceStateService.get_state(
        request
    )
