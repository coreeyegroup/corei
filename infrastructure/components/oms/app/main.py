from fastapi import FastAPI

from app.services.oms_service import OMSService
from app.sessions.session_manager import SessionManager

app = FastAPI(
    title="oms",
    version="stage-16"
)

oms_service = OMSService()

session_manager = SessionManager()

@app.get("/health/live")
def live():
    return {"status": "live"}

@app.get("/health/ready")
def ready():
    return {"status": "ready"}

@app.get("/session/status")
def session_status():
    return session_manager.status()

@app.post("/orders/accept")
def accept_order(order: dict):

    return oms_service.accept_order(order)

@app.post("/orders/dispatch")
def dispatch_order(order: dict):

    return oms_service.dispatch_order(order)
