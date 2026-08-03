from fastapi import APIRouter

from app.models.market_snapshot import (
    MarketSnapshotRequest,
    MarketSnapshotResponse
)

from app.services.market_snapshot_service import (
    MarketSnapshotService
)

router = APIRouter(
    prefix="/api/v1/market-snapshot",
    tags=["MARKET_SNAPSHOT"]
)


@router.post(
    "/state",
    response_model=MarketSnapshotResponse
)
def get_market_snapshot_state(
    request: MarketSnapshotRequest
):
    return MarketSnapshotService.get_state(
        request
    )
