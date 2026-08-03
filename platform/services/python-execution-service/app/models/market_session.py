from pydantic import BaseModel


class MarketSessionRequest(BaseModel):
    workflow_id: str
    market: str
    utc_timestamp: str
    business_day: bool


class MarketSessionResponse(BaseModel):
    workflow_id: str
    workflow_name: str
    workflow_version: str
    component_type: str

    market: str
    timezone: str

    session_state: str

    market_open_time: str
    market_close_time: str

    business_day: bool
