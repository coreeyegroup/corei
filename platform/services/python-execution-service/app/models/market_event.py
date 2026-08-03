from pydantic import BaseModel


class MarketEventRequest(BaseModel):
    workflow_id: str

    market: str

    market_profile: str

    window_state: str


class MarketEventResponse(BaseModel):
    workflow_id: str

    workflow_name: str

    workflow_version: str

    component_type: str

    market: str

    market_profile: str

    event_type: str

    event_state: str

    event_severity: str

    event_active: bool

    window_state: str
