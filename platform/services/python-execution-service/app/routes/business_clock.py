from fastapi import APIRouter

from app.models.business_clock import (
    BusinessClockRequest,
    BusinessClockResponse
)

from app.services.business_clock_service import (
    generate_business_clock_state
)

router = APIRouter()


@router.post(
    "/api/v1/business-clock/state",
    response_model=BusinessClockResponse
)
def business_clock_state(
    request: BusinessClockRequest
):

    return generate_business_clock_state(
        request.workflow_id,
        request.utc_timestamp
    )
