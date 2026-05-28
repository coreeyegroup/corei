import asyncio
import time
import uuid

from decimal import Decimal

from app.connectors.base_connector import BaseBrokerConnector
from app.models.market_tick import MarketTick


class MockBrokerConnector(BaseBrokerConnector):

    async def connect(self) -> None:
        return None

    async def disconnect(self) -> None:
        return None

    async def get_next_tick(self) -> MarketTick:

        await asyncio.sleep(1)

        timestamp_ns = time.time_ns()

        return MarketTick(
            event_id=str(uuid.uuid4()),
            instrument="XAUUSD",
            exchange_timestamp_ns=timestamp_ns,
            ingestion_timestamp_ns=time.time_ns(),
            bid_price=Decimal("2350.10"),
            ask_price=Decimal("2350.30"),
            bid_size=Decimal("1.50"),
            ask_size=Decimal("1.75"),
            source="mock"
        )
