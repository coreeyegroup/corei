from dataclasses import dataclass, field
from typing import Dict, Optional


@dataclass
class CredentialRecord:
    credential_id: str
    broker: str
    account_id: str
    credential_ref: str
    credential_type: str = "OAUTH"
    environment: str = "LIVE"
    enabled: bool = True
    metadata: Dict[str, str] = field(default_factory=dict)

    def to_dict(self) -> dict:
        return {
            "credential_id": self.credential_id,
            "broker": self.broker,
            "account_id": self.account_id,
            "credential_ref": self.credential_ref,
            "credential_type": self.credential_type,
            "environment": self.environment,
            "enabled": self.enabled,
            "metadata": self.metadata,
        }
