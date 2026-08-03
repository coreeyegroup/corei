from pydantic import BaseModel


class MarketEnvironmentRequest(BaseModel):
    workflow_id: str

    market: str
    market_profile: str

    regime_timestamp: str

    market_regime: str

    regime_state: str

    regime_trusted: bool


class MarketEnvironmentResponse(BaseModel):
    workflow_id: str

    workflow_name: str

    workflow_version: str

    component_type: str

    market: str
    market_profile: str

    environment_timestamp: str

    market_environment: str

    environment_state: str

    environment_trusted: bool
