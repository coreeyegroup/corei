from pydantic import BaseModel


class TradingPhaseRequest(BaseModel):
    workflow_id: str

    market: str

    session_state: str

    health_state: str

    trading_allowed: bool


class TradingPhaseResponse(BaseModel):
    workflow_id: str

    workflow_name: str

    workflow_version: str

    component_type: str

    market: str

    phase_state: str

    trading_allowed: bool

    session_state: str

    health_state: str
