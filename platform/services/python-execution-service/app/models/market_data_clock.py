from pydantic import BaseModel


class MarketDataClockRequest(BaseModel):
    workflow_id: str

    market: str

    market_profile: str


class MarketDataClockResponse(BaseModel):
    workflow_id: str

    workflow_name: str

    workflow_version: str

    component_type: str

    market: str

    market_profile: str

    data_state: str

    data_health: str

    data_freshness: str

    data_available: bool
