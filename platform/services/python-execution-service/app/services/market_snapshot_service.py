from datetime import datetime, UTC

from app.models.market_snapshot import (
    MarketSnapshotRequest,
    MarketSnapshotResponse
)


class MarketSnapshotService:

    @staticmethod
    def get_state(
        request: MarketSnapshotRequest
    ) -> MarketSnapshotResponse:

        if request.feed_health == "UNHEALTHY":

            snapshot_state = "INVALID"
            snapshot_trusted = False

        elif request.feed_health == "DEGRADED":

            snapshot_state = "DEGRADED"
            snapshot_trusted = True

        else:

            snapshot_state = "ACTIVE"
            snapshot_trusted = True

        snapshot_timestamp = (
            datetime.now(UTC)
            .replace(microsecond=0)
            .isoformat()
            .replace("+00:00", "Z")
        )

        return MarketSnapshotResponse(
            workflow_id=request.workflow_id,

            workflow_name="MARKET_SNAPSHOT",
            workflow_version="1.0",

            component_type="MARKET_DATA",

            market=request.market,
            market_profile=request.market_profile,

            data_provider=request.data_provider,

            snapshot_timestamp=snapshot_timestamp,

            snapshot_state=snapshot_state,

            feed_health=request.feed_health,
            feed_freshness=request.feed_freshness,

            snapshot_trusted=snapshot_trusted
        )
