from datetime import datetime, UTC

from app.models.market_environment import (
    MarketEnvironmentRequest,
    MarketEnvironmentResponse
)


class MarketEnvironmentService:

    @staticmethod
    def get_state(
        request: MarketEnvironmentRequest
    ) -> MarketEnvironmentResponse:

        market_regime = request.market_regime

        if market_regime == "NEUTRAL":

            market_environment = "STANDARD"

            environment_state = "ACTIVE"

            environment_trusted = True

        elif market_regime == "CAUTION":

            market_environment = "RESTRICTED"

            environment_state = "DEGRADED"

            environment_trusted = False

        elif market_regime == "DEGRADED":

            market_environment = "DEGRADED"

            environment_state = "DEGRADED"

            environment_trusted = False

        else:

            market_environment = "UNAVAILABLE"

            environment_state = "INACTIVE"

            environment_trusted = False

        return MarketEnvironmentResponse(

            workflow_id=request.workflow_id,

            workflow_name="MARKET_ENVIRONMENT",

            workflow_version="1.0",

            component_type="MARKET_DATA",

            market=request.market,

            market_profile=request.market_profile,

            environment_timestamp=(
                datetime.now(UTC)
                .replace(microsecond=0)
                .isoformat()
                .replace("+00:00", "Z")
            ),

            market_environment=market_environment,

            environment_state=environment_state,

            environment_trusted=environment_trusted
        )
