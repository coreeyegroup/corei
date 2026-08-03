from pydantic import BaseModel


class MarketContextRequest(BaseModel):
    workflow_id: str

    market: str
    market_profile: str

    data_provider: str

    snapshot_timestamp: str

    snapshot_state: str

    feed_health: str

    feed_freshness: str

    snapshot_trusted: bool


class MarketContextResponse(BaseModel):
    workflow_id: str

    workflow_name: str

    workflow_version: str

    component_type: str

    market: str
    market_profile: str

    context_timestamp: str

    market_context: str

    context_state: str

    snapshot_state: str

    context_trusted: bool
