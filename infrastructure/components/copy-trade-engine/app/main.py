from fastapi import FastAPI

from app.services.copy_trade_service import CopyTradeService

app = FastAPI(
    title="copy-trade-engine",
    version="stage-16"
)

copy_trade_service = CopyTradeService()

@app.get("/health/live")
def live():
    return {"status": "live"}

@app.get("/health/ready")
def ready():
    return {"status": "ready"}

@app.post("/propagate")
async def propagate(payload: dict):

    return await copy_trade_service.propagate(payload)
