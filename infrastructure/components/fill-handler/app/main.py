from fastapi import FastAPI

from app.services.fill_handler_service import FillHandlerService

app = FastAPI(
    title="fill-handler-service",
    version="stage-16"
)

fill_handler = FillHandlerService()

@app.get("/health/live")
def live():
    return {"status": "live"}

@app.get("/health/ready")
def ready():
    return {"status": "ready"}

@app.post("/process-fill")
def process_fill(fill: dict):

    return fill_handler.process_fill(fill)
