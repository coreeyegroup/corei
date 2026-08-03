from app.models.market_intelligence_state import (
    MarketIntelligenceStateRequest,
    MarketIntelligenceStateResponse
)


class MarketIntelligenceStateService:

    @staticmethod
    def get_state(
        request: MarketIntelligenceStateRequest
    ) -> MarketIntelligenceStateResponse:

        return MarketIntelligenceStateResponse(

            workflow_id="WF-01Z",

            workflow_name="MARKET_INTELLIGENCE_STATE",

            workflow_version="1.0",

            component_type="MARKET_DATA",

            market=request.market,
            market_profile=request.market_profile,
            data_provider=request.data_provider,

            feed_state=request.feed_state,
            feed_available=request.feed_available,

            feed_health=request.feed_health,
            feed_latency_ms=request.feed_latency_ms,
            feed_freshness=request.feed_freshness,
            feed_trusted=request.feed_trusted,

            snapshot_timestamp=request.snapshot_timestamp,
            snapshot_state=request.snapshot_state,
            snapshot_trusted=request.snapshot_trusted,

            context_timestamp=request.context_timestamp,
            market_context=request.market_context,
            context_state=request.context_state,
            context_trusted=request.context_trusted,

            regime_timestamp=request.regime_timestamp,
            market_regime=request.market_regime,
            regime_state=request.regime_state,
            regime_trusted=request.regime_trusted,

            environment_timestamp=request.environment_timestamp,
            market_environment=request.market_environment,
            environment_state=request.environment_state,
            environment_trusted=request.environment_trusted
        )
