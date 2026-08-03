from fastapi import APIRouter

from app.models.broker_clock import (
    BrokerClockRequest,
    BrokerClockResponse
)

from app.services.broker_clock_service import (
    generate_broker_clock_state
)

router = APIRouter()


@router.post(
    "/api/v1/broker-clock/state",
    response_model=BrokerClockResponse
)
def broker_clock_state(
    request: BrokerClockRequest
):

    return generate_broker_clock_state(
        request.workflow_id,
        request.broker_profile
    )
