from fastapi import FastAPI
from app.services.router_service import SmartOrderRouter

app = FastAPI(
    title="smart-order-router",
    version="stage-16"
)

router = SmartOrderRouter()

@app.get("/health/live")
def live():
    return {"status": "live"}

@app.get("/health/ready")
def ready():
    return {"status": "ready"}

@app.get("/route/{account_id}")
def route(account_id: str):

    result = router.select_broker(account_id)

    return result
