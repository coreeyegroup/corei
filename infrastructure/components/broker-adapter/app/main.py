from fastapi import FastAPI

from app.services.broker_adapter_service import BrokerAdapterService

app = FastAPI(
    title="broker-adapter-service",
    version="stage-16"
)

adapter_service = BrokerAdapterService()

@app.get("/health/live")
def live():
    return {"status": "live"}

@app.get("/health/ready")
def ready():
    return {"status": "ready"}

@app.get("/broker/health")
def broker_health():
    return adapter_service.health()

@app.post("/connect")
def connect():
    return adapter_service.connect()

@app.post("/simulate-fill")
def simulate_fill(order: dict):
    return adapter_service.simulate_fill(order)
