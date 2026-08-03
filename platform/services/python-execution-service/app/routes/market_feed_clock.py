from fastapi import APIRouter

from app.models.market_feed_clock import (
    MarketFeedClockRequest,
    MarketFeedClockResponse
)

from app.services.market_feed_clock_service import (
    MarketFeedClockService
)

router = APIRouter(
    prefix="/api/v1/market-feed-clock",
    tags=["MARKET_FEED_CLOCK"]
)


@router.post(
    "/state",
    response_model=MarketFeedClockResponse
)
def get_market_feed_clock_state(
    request: MarketFeedClockRequest
):
    return MarketFeedClockService.get_state(
        request
    )
