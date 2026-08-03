from pydantic import BaseModel


class TradingWindowRequest(BaseModel):
    workflow_id: str

    market: str

    market_profile: str

    utc_timestamp: str

    phase_state: str


class TradingWindowResponse(BaseModel):
    workflow_id: str

    workflow_name: str

    workflow_version: str

    component_type: str

    market: str

    market_profile: str

    phase_state: str

    window_state: str

    window_start: str

    window_end: str
