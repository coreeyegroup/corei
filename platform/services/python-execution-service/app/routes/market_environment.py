from fastapi import APIRouter

from app.models.market_environment import (
    MarketEnvironmentRequest,
    MarketEnvironmentResponse
)

from app.services.market_environment_service import (
    MarketEnvironmentService
)

router = APIRouter(
    prefix="/api/v1/market-environment",
    tags=["MARKET_ENVIRONMENT"]
)


@router.post(
    "/state",
    response_model=MarketEnvironmentResponse
)
def get_market_environment_state(
    request: MarketEnvironmentRequest
):
    return MarketEnvironmentService.get_state(
        request
    )
