from fastapi import APIRouter

from app.models.trading_phase import (
    TradingPhaseRequest,
    TradingPhaseResponse
)

from app.services.trading_phase_service import (
    generate_trading_phase_state
)

router = APIRouter()


@router.post(
    "/api/v1/trading-phase/state",
    response_model=TradingPhaseResponse
)
def trading_phase_state(
    request: TradingPhaseRequest
):

    return generate_trading_phase_state(
        request.workflow_id,
        request.market,
        request.session_state,
        request.health_state,
        request.trading_allowed
    )
