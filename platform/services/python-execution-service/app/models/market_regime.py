from pydantic import BaseModel


class MarketRegimeRequest(BaseModel):
    workflow_id: str

    market: str
    market_profile: str

    context_timestamp: str

    market_context: str

    context_state: str

    context_trusted: bool


class MarketRegimeResponse(BaseModel):
    workflow_id: str

    workflow_name: str

    workflow_version: str

    component_type: str

    market: str
    market_profile: str

    regime_timestamp: str

    market_regime: str

    regime_state: str

    regime_trusted: bool
