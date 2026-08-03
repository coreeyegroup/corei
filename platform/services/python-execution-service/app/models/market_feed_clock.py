from pydantic import BaseModel


class MarketFeedClockRequest(BaseModel):
    workflow_id: str

    market: str
    market_profile: str

    data_provider: str

    session_state: str
    health_state: str

    trading_allowed: bool


class MarketFeedClockResponse(BaseModel):
    workflow_id: str

    workflow_name: str
    workflow_version: str

    component_type: str

    market: str
    market_profile: str

    data_provider: str

    feed_state: str

    feed_available: bool
