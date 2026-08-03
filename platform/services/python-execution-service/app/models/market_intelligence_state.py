from pydantic import BaseModel


class MarketIntelligenceStateRequest(BaseModel):

    workflow_id: str

    market: str
    market_profile: str
    data_provider: str

    feed_state: str
    feed_available: bool

    feed_health: str
    feed_latency_ms: int
    feed_freshness: str
    feed_trusted: bool

    snapshot_timestamp: str
    snapshot_state: str
    snapshot_trusted: bool

    context_timestamp: str
    market_context: str
    context_state: str
    context_trusted: bool

    regime_timestamp: str
    market_regime: str
    regime_state: str
    regime_trusted: bool

    environment_timestamp: str
    market_environment: str
    environment_state: str
    environment_trusted: bool


class MarketIntelligenceStateResponse(BaseModel):

    workflow_id: str

    workflow_name: str
    workflow_version: str

    component_type: str

    market: str
    market_profile: str
    data_provider: str

    feed_state: str
    feed_available: bool

    feed_health: str
    feed_latency_ms: int
    feed_freshness: str
    feed_trusted: bool

    snapshot_timestamp: str
    snapshot_state: str
    snapshot_trusted: bool

    context_timestamp: str
    market_context: str
    context_state: str
    context_trusted: bool

    regime_timestamp: str
    market_regime: str
    regime_state: str
    regime_trusted: bool

    environment_timestamp: str
    market_environment: str
    environment_state: str
    environment_trusted: bool
