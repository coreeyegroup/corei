from app.models.market_feed_clock import (
    MarketFeedClockRequest,
    MarketFeedClockResponse
)


class MarketFeedClockService:

    @staticmethod
    def get_state(
        request: MarketFeedClockRequest
    ) -> MarketFeedClockResponse:

        if request.health_state != "HEALTHY":

            feed_state = "DISCONNECTED"
            feed_available = False

        elif (
            request.session_state == "MARKET_OPEN"
            and request.trading_allowed
        ):

            feed_state = "CONNECTED"
            feed_available = True

        else:

            feed_state = "CONNECTED"
            feed_available = True

        return MarketFeedClockResponse(
            workflow_id=request.workflow_id,

            workflow_name="MARKET_FEED_CLOCK",
            workflow_version="1.0",

            component_type="MARKET_DATA",

            market=request.market,
            market_profile=request.market_profile,

            data_provider=request.data_provider,

            feed_state=feed_state,

            feed_available=feed_available
        )
