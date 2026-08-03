from fastapi import APIRouter

from app.models.system_health import (
    SystemHealthRequest,
    SystemHealthResponse
)

from app.services.system_health_service import (
    generate_system_health_state
)

router = APIRouter()


@router.post(
    "/api/v1/system-health/state",
    response_model=SystemHealthResponse
)
def system_health_state(
    request: SystemHealthRequest
):

    return generate_system_health_state(
        request.workflow_id
    )
