from fastapi import FastAPI

from app.services.ems_service import EMSService
from app.sessions.session_manager import SessionManager

app = FastAPI(
    title="ems",
    version="stage-16"
)

ems_service = EMSService()

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

@app.get("/connector/status")
def connector_status():
    return ems_service.connector_status()

@app.post("/connect")
def connect():
    return ems_service.connect()

@app.post("/dispatch")
def dispatch(order: dict):
    return ems_service.dispatch(order)
