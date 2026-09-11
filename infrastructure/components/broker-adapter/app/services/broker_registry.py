from typing import Dict, List


class BrokerRegistry:
    """
    Registry of broker providers/adapters.

    This does not own broker-specific implementation.
    It only resolves the existing adapter capability.
    """

    def __init__(self) -> None:
        self._adapters: Dict[str, object] = {}

    def register(self, broker: str, adapter: object) -> None:
        self._adapters[broker.lower()] = adapter

    def get(self, broker: str) -> object:
        adapter = self._adapters.get(broker.lower())

        if adapter is None:
            raise ValueError(f"Unsupported broker: {broker}")

        return adapter

    def list(self) -> List[str]:
        return sorted(self._adapters.keys())

    def contains(self, broker: str) -> bool:
        return broker.lower() in self._adapters
