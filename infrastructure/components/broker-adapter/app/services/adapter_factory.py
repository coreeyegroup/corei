from app.adapters.mock_adapter import MockBrokerAdapter

class AdapterFactory:

    @staticmethod
    def create(adapter_name: str):

        if adapter_name == "mock":
            return MockBrokerAdapter()

        raise Exception(f"UNSUPPORTED_ADAPTER: {adapter_name}")
