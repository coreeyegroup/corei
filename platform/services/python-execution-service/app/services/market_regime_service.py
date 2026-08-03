from datetime import datetime, UTC

from app.models.market_regime import (
    MarketRegimeRequest,
    MarketRegimeResponse
)


class MarketRegimeService:

    @staticmethod
    def get_state(
        request: MarketRegimeRequest
    ) -> MarketRegimeResponse:

        market_context = request.market_context

        if market_context == "NORMAL":

            market_regime = "NEUTRAL"

            regime_state = "ACTIVE"

            regime_trusted = True

        elif market_context == "LIMITED":

            market_regime = "CAUTION"

            regime_state = "DEGRADED"

            regime_trusted = False

        elif market_context == "DEGRADED":

            market_regime = "DEGRADED"

            regime_state = "DEGRADED"

            regime_trusted = False

        else:

            market_regime = "UNKNOWN"

            regime_state = "INACTIVE"

            regime_trusted = False

        return MarketRegimeResponse(

            workflow_id=request.workflow_id,

            workflow_name="MARKET_REGIME",

            workflow_version="1.0",

            component_type="MARKET_DATA",

            market=request.market,

            market_profile=request.market_profile,

            regime_timestamp=(
                datetime.now(UTC)
                .replace(microsecond=0)
                .isoformat()
                .replace("+00:00", "Z")
            ),

            market_regime=market_regime,

            regime_state=regime_state,

            regime_trusted=regime_trusted
        )
