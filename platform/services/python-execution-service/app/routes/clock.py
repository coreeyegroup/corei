from fastapi import APIRouter

from app.models.clock import (
    ClockRequest,
    ClockResponse
)

from app.services.clock_service import (
    generate_clock_state
)

router = APIRouter()


@router.post(
    "/api/v1/clock/state",
    response_model=ClockResponse
)
def clock_state(
    request: ClockRequest
):

    return generate_clock_state(
        request.workflow_id
    )
