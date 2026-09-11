from abc import ABC, abstractmethod

from app.models.market_tick import MarketTick


class BaseBrokerConnector(ABC):

    @abstractmethod
    async def connect(self) -> None:
        pass

    @abstractmethod
    async def disconnect(self) -> None:
        pass

    @abstractmethod
    async def get_next_tick(self) -> MarketTick:
        pass
