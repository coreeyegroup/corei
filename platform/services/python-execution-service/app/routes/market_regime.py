from fastapi import APIRouter

from app.models.market_regime import (
    MarketRegimeRequest,
    MarketRegimeResponse
)

from app.services.market_regime_service import (
    MarketRegimeService
)

router = APIRouter(
    prefix="/api/v1/market-regime",
    tags=["MARKET_REGIME"]
)


@router.post(
    "/state",
    response_model=MarketRegimeResponse
)
def get_market_regime_state(
    request: MarketRegimeRequest
):
    return MarketRegimeService.get_state(
        request
    )
