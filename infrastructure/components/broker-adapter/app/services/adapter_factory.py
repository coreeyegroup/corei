from app.adapters.mock_adapter import MockBrokerAdapter
from app.adapters.upstox_adapter import UpstoxAdapter

class AdapterFactory:
    @staticmethod
    def create(adapter_name: str):
        if adapter_name == "mock":
            return MockBrokerAdapter()
        if adapter_name == "upstox":
            return UpstoxAdapter()
        raise Exception(f"UNSUPPORTED_ADAPTER: {adapter_name}")
