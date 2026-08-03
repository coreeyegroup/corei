from pydantic import BaseModel


class ClockRequest(BaseModel):
    workflow_id: str


class ClockResponse(BaseModel):
    workflow_id: str
    workflow_name: str
    workflow_version: str
    component_type: str
    platform_state: str
    utc_timestamp: str
    epoch_ms: int
    heartbeat: str
