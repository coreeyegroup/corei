from app.models.market_feed_health import (
    MarketFeedHealthRequest,
    MarketFeedHealthResponse
)


class MarketFeedHealthService:

    @staticmethod
    def get_state(
        request: MarketFeedHealthRequest
    ) -> MarketFeedHealthResponse:

        if not request.feed_available:

            feed_health = "UNHEALTHY"
            feed_latency_ms = 0
            feed_freshness = "STALE"
            feed_trusted = False

        elif request.feed_state == "DEGRADED":

            feed_health = "DEGRADED"
            feed_latency_ms = 500
            feed_freshness = "DELAYED"
            feed_trusted = True

        else:

            feed_health = "HEALTHY"
            feed_latency_ms = 50
            feed_freshness = "REALTIME"
            feed_trusted = True

        return MarketFeedHealthResponse(
            workflow_id=request.workflow_id,

            workflow_name="MARKET_FEED_HEALTH",
            workflow_version="1.0",

            component_type="MARKET_DATA",

            market=request.market,
            market_profile=request.market_profile,

            data_provider=request.data_provider,

            feed_health=feed_health,

            feed_latency_ms=feed_latency_ms,

            feed_freshness=feed_freshness,

            feed_trusted=feed_trusted
        )
