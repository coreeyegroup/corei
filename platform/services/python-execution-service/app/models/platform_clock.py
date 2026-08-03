from pydantic import BaseModel


class PlatformClockRequest(BaseModel):
    workflow_id: str

    utc_timestamp: str

    business_day: bool

    session_state: str

    health_state: str

    trading_allowed: bool

    phase_state: str

    window_state: str

    event_type: str

    event_state: str

    event_active: bool

    broker_state: str

    broker_health: str

    broker_available: bool

    data_state: str

    data_health: str

    data_freshness: str

    data_available: bool


class PlatformClockResponse(BaseModel):
    workflow_id: str

    workflow_name: str

    workflow_version: str

    component_type: str

    utc_timestamp: str

    business_day: bool

    session_state: str

    health_state: str

    trading_allowed: bool

    phase_state: str

    window_state: str

    event_type: str

    event_state: str

    event_active: bool

    broker_state: str

    broker_health: str

    broker_available: bool

    data_state: str

    data_health: str

    data_freshness: str

    data_available: bool
