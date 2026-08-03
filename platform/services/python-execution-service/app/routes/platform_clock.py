from fastapi import APIRouter

from app.models.platform_clock import (
    PlatformClockRequest,
    PlatformClockResponse
)

from app.services.platform_clock_service import (
    generate_platform_clock_state
)

router = APIRouter()


@router.post(
    "/api/v1/platform-clock/state",
    response_model=PlatformClockResponse
)
def platform_clock_state(
    request: PlatformClockRequest
):

  return generate_platform_clock_state(
    request.workflow_id,

    request.utc_timestamp,

    request.business_day,

    request.session_state,

    request.health_state,

    request.trading_allowed,

    request.phase_state,

    request.window_state,

    request.event_type,

    request.event_state,

    request.event_active,

    request.broker_state,

    request.broker_health,

    request.broker_available,

    request.data_state,

    request.data_health,

    request.data_freshness,

    request.data_available
)
