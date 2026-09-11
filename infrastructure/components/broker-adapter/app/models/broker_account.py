from dataclasses import dataclass, field
from typing import Any, Dict, Optional


@dataclass
class BrokerAccount:
    account_id: str
    broker: str
    display_name: str
    environment: str = "LIVE"
    enabled: bool = True
    connected: bool = False
    session_id: Optional[str] = None
    credential_id: Optional[str] = None
    metadata: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "account_id": self.account_id,
            "broker": self.broker,
            "display_name": self.display_name,
            "environment": self.environment,
            "enabled": self.enabled,
            "connected": self.connected,
            "session_id": self.session_id,
            "credential_id": self.credential_id,
            "metadata": self.metadata,
        }
