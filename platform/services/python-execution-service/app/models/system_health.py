from pydantic import BaseModel


class SystemHealthRequest(BaseModel):
    workflow_id: str


class SystemHealthResponse(BaseModel):
    workflow_id: str
    workflow_name: str
    workflow_version: str
    component_type: str

    health_state: str

    kubernetes_status: bool

    n8n_status: bool

    python_service_status: bool
