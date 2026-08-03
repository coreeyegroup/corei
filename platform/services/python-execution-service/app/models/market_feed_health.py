from pydantic import BaseModel


class MarketFeedHealthRequest(BaseModel):
    workflow_id: str

    market: str
    market_profile: str

    data_provider: str

    feed_state: str
    feed_available: bool


class MarketFeedHealthResponse(BaseModel):
    workflow_id: str

    workflow_name: str
    workflow_version: str

    component_type: str

    market: str
    market_profile: str

    data_provider: str

    feed_health: str

    feed_latency_ms: int

    feed_freshness: str

    feed_trusted: bool
