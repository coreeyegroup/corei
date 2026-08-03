from datetime import datetime
from datetime import datetime, UTC

from app.models.market_context import (
    MarketContextRequest,
    MarketContextResponse
)


class MarketContextService:

    @staticmethod
    def get_state(
        request: MarketContextRequest
    ) -> MarketContextResponse:

        snapshot_state = request.snapshot_state
        snapshot_trusted = request.snapshot_trusted

        if (
            snapshot_state == "ACTIVE"
            and snapshot_trusted is True
        ):
            market_context = "NORMAL"
            context_state = "ACTIVE"
            context_trusted = True

        elif (
            snapshot_state == "ACTIVE"
            and snapshot_trusted is False
        ):
            market_context = "LIMITED"
            context_state = "DEGRADED"
            context_trusted = False

        elif snapshot_state == "DEGRADED":
            market_context = "DEGRADED"
            context_state = "DEGRADED"
            context_trusted = False

        else:
            market_context = "UNAVAILABLE"
            context_state = "INACTIVE"
            context_trusted = False

        return MarketContextResponse(
            workflow_id=request.workflow_id,

            workflow_name="MARKET_CONTEXT",

            workflow_version="1.0",

            component_type="MARKET_DATA",

            market=request.market,

            market_profile=request.market_profile,

            context_timestamp=(
                datetime.now(UTC)
                .replace(microsecond=0)
                .isoformat()
                .replace("+00:00", "Z")
            ),

            market_context=market_context,

            context_state=context_state,

            snapshot_state=request.snapshot_state,

            context_trusted=context_trusted
        )
