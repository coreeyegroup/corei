from pydantic import BaseModel


class BusinessClockRequest(BaseModel):
    workflow_id: str
    utc_timestamp: str


class BusinessClockResponse(BaseModel):
    workflow_id: str
    workflow_name: str
    workflow_version: str
    component_type: str

    business_date: str

    day_of_week: str

    weekend: bool

    business_day: bool

    business_status: str
