from fastapi import FastAPI

from app.routes.clock import router as clock_router
from app.routes.business_clock import router as business_clock_router
from app.routes.market_session import router as market_session_router
from app.routes.system_health import router as system_health_router
from app.routes.trading_day import router as trading_day_router
from app.routes.trading_phase import (router as trading_phase_router)
from app.routes.trading_window import (router as trading_window_router)
from app.routes.market_event import (router as market_event_router)
from app.routes.broker_clock import (router as broker_clock_router)
from app.routes.market_data_clock import (router as market_data_clock_router)
from app.routes.platform_clock import (router as platform_clock_router)
from app.routes.market_feed_clock import (router as market_feed_clock_router)
from app.routes.market_feed_health import (router as market_feed_health_router)
from app.routes.market_snapshot import (router as market_snapshot_router)
from app.routes.market_context import (router as market_context_router)
from app.routes.market_regime import (router as market_regime_router)
from app.routes.market_environment import (router as market_environment_router)
from app.routes.market_intelligence_state import (router as market_intelligence_state_router)

app = FastAPI(
    title="CORE Python Execution Service",
    version="1.0"
)

app.include_router(clock_router)

app.include_router(
    business_clock_router
)

app.include_router(
    market_session_router
)

app.include_router(
    system_health_router
)

app.include_router(
    trading_day_router
)

app.include_router(
    trading_phase_router
)

app.include_router(
    trading_window_router
)

app.include_router(
    market_event_router
)

app.include_router(
    broker_clock_router
)

app.include_router(
    market_data_clock_router
)

app.include_router(
    platform_clock_router
)

app.include_router(
    market_feed_clock_router
)

app.include_router(
    market_feed_health_router
)

app.include_router(
    market_snapshot_router
)

app.include_router(
    market_context_router
)

app.include_router(
    market_regime_router
)

app.include_router(
    market_environment_router
)

app.include_router(
    market_intelligence_state_router
)



