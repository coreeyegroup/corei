from fastapi import FastAPI

from app.services.reconciliation_service import ReconciliationService

app = FastAPI(
    title="reconciliation-service",
    version="stage-16"
)

reconciliation_service = ReconciliationService()

@app.get("/health/live")
def live():
    return {"status": "live"}

@app.get("/health/ready")
def ready():
    return {"status": "ready"}

@app.post("/reconcile")
def reconcile(payload: dict):

    return reconciliation_service.reconcile(payload)
