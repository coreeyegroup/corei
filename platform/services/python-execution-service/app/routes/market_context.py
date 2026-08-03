from fastapi import APIRouter

from app.models.market_context import (
    MarketContextRequest,
    MarketContextResponse
)

from app.services.market_context_service import (
    MarketContextService
)

router = APIRouter(
    prefix="/api/v1/market-context",
    tags=["MARKET_CONTEXT"]
)


@router.post(
    "/state",
    response_model=MarketContextResponse
)
def get_market_context_state(
    request: MarketContextRequest
):
    return MarketContextService.get_state(
        request
    )
