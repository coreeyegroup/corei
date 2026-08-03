from pydantic import BaseModel


class TradingDayRequest(BaseModel):
    workflow_id: str
    market: str
    business_day: bool
    session_state: str
    health_state: str


class TradingDayResponse(BaseModel):
    workflow_id: str
    workflow_name: str
    workflow_version: str
    component_type: str

    trading_allowed: bool

    trading_state: str

    market: str

    session_state: str

    business_day: bool

    health_state: str
