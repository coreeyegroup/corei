from fastapi import FastAPI

from app.routes.health import router as health_router
from app.routes.kill_switch import router as kill_switch_router
from app.routes.strategies import router as strategy_router
from app.routes.approvals import router as approval_router

app = FastAPI(
    title="CORE SYSTEM Operational API",
    version="1.0.0"
)

app.include_router(health_router)
app.include_router(kill_switch_router)
app.include_router(strategy_router)
app.include_router(approval_router)
