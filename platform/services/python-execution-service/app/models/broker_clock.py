from pydantic import BaseModel


class BrokerClockRequest(BaseModel):
    workflow_id: str

    broker_profile: str


class BrokerClockResponse(BaseModel):
    workflow_id: str

    workflow_name: str

    workflow_version: str

    component_type: str

    broker_profile: str

    broker_state: str

    broker_health: str

    broker_available: bool
