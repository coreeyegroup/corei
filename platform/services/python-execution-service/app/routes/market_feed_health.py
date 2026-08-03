from fastapi import APIRouter

from app.models.market_feed_health import (
    MarketFeedHealthRequest,
    MarketFeedHealthResponse
)

from app.services.market_feed_health_service import (
    MarketFeedHealthService
)

router = APIRouter(
    prefix="/api/v1/market-feed-health",
    tags=["MARKET_FEED_HEALTH"]
)


@router.post(
    "/state",
    response_model=MarketFeedHealthResponse
)
def get_market_feed_health_state(
    request: MarketFeedHealthRequest
):
    return MarketFeedHealthService.get_state(
        request
    )
