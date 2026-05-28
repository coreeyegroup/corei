from fastapi import APIRouter
from pydantic import BaseModel
import time

router = APIRouter(prefix="/kill-switch")

class KillSwitchRequest(BaseModel):
    account_id: str
    reason: str
    operator_id: str

@router.post("/activate")
def activate_kill_switch(request: KillSwitchRequest):

    audit_event = {
        "event_type": "kill_switch_activated",
        "account_id": request.account_id,
        "reason": request.reason,
        "operator_id": request.operator_id,
        "timestamp": int(time.time())
    }

    return {
        "status": "activated",
        "audit_event": audit_event
    }
