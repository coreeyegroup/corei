import re
from typing import Any, Dict, List, Optional

from app.credentials.kubernetes_provider import (
    KubernetesCredentialProvider,
)
from app.credentials.models import CredentialRecord
from app.repositories.broker_repository import BrokerRepository


class CredentialService:
    """
    Institutional credential boundary.

    PostgreSQL:
        Stores credential metadata and credential references.

    CredentialProvider:
        Stores and resolves actual secret material.

    Broker adapters:
        Never access PostgreSQL or Kubernetes Secrets directly.
    """

    def __init__(
        self,
        repository: Optional[BrokerRepository] = None,
    ) -> None:

        self.repository = repository or BrokerRepository()

        self.provider = KubernetesCredentialProvider()

    @staticmethod
    def validate_ref(
        credential_ref: str,
    ) -> str:

        if not re.fullmatch(
            r"[a-z0-9]([-a-z0-9]*[a-z0-9])?",
            credential_ref,
        ):
            raise ValueError(
                "INVALID_CREDENTIAL_REFERENCE"
            )

        return credential_ref

    # ---------------------------------------------------------------
    # Metadata
    # ---------------------------------------------------------------

    def register(
        self,
        credential_id: str,
        broker: str,
        account_id: str,
        credential_ref: str,
        credential_type: str = "OAUTH",
        environment: str = "LIVE",
        enabled: bool = True,
        metadata: Optional[Dict[str, Any]] = None,
    ) -> CredentialRecord:

        if not credential_id.strip():
            raise ValueError(
                "CREDENTIAL_ID_REQUIRED"
            )

        if not broker.strip():
            raise ValueError(
                "BROKER_REQUIRED"
            )

        if not account_id.strip():
            raise ValueError(
                "ACCOUNT_ID_REQUIRED"
            )

        credential_ref = self.validate_ref(
            credential_ref
        )

        row = self.repository.create_credential(
            credential_id=credential_id,
            broker_id=broker,
            account_id=account_id,
            credential_ref=credential_ref,
            credential_type=credential_type,
            environment=environment,
            enabled=enabled,
            metadata=metadata or {},
        )

        return self._to_record(row)

    def get(
        self,
        credential_id: str,
    ) -> Optional[CredentialRecord]:

        row = self.repository.get_credential(
            credential_id
        )

        if row is None:
            return None

        return self._to_record(row)

    def get_for_account(
        self,
        account_id: str,
    ) -> Optional[CredentialRecord]:

        row = self.repository.get_credential_for_account(
            account_id
        )

        if row is None:
            return None

        return self._to_record(row)

    def list(
        self,
        broker: Optional[str] = None,
        account_id: Optional[str] = None,
    ) -> List[CredentialRecord]:

        rows = self.repository.list_credentials(
            broker_id=broker,
            account_id=account_id,
        )

        return [
            self._to_record(row)
            for row in rows
        ]

    def remove(
        self,
        credential_id: str,
    ) -> bool:

        record = self.get(credential_id)

        if record is None:
            return False

        deleted = self.repository.delete_credential(
            credential_id
        )

        if deleted:
            self.provider.delete(
                self.validate_ref(
                    record.credential_ref
                )
            )

        return deleted

    # ---------------------------------------------------------------
    # Secret material
    # ---------------------------------------------------------------

    def resolve(
        self,
        credential_id: str,
    ) -> Dict[str, str]:

        record = self.get(credential_id)

        if record is None:
            raise ValueError(
                f"CREDENTIAL_NOT_FOUND: {credential_id}"
            )

        if not record.enabled:
            raise ValueError(
                f"CREDENTIAL_DISABLED: {credential_id}"
            )

        return self.provider.get(
            self.validate_ref(
                record.credential_ref
            )
        )

    def create_secret(
        self,
        credential_ref: str,
        values: Dict[str, str],
    ) -> None:

        self.provider.create(
            self.validate_ref(
                credential_ref
            ),
            values,
        )

    def update_secret(
        self,
        credential_ref: str,
        values: Dict[str, str],
    ) -> None:

        self.provider.update(
            self.validate_ref(
                credential_ref
            ),
            values,
        )

    def delete_secret(
        self,
        credential_ref: str,
    ) -> None:

        self.provider.delete(
            self.validate_ref(
                credential_ref
            )
        )

    def secret_exists(
        self,
        credential_ref: str,
    ) -> bool:

        return self.provider.exists(
            self.validate_ref(
                credential_ref
            )
        )

    # ---------------------------------------------------------------
    # Conversion
    # ---------------------------------------------------------------

    @staticmethod
    def _to_record(
        row: Dict[str, Any],
    ) -> CredentialRecord:

        return CredentialRecord(
            credential_id=row["credential_id"],
            broker=row["broker_id"],
            account_id=row["account_id"],
            credential_ref=row["credential_ref"],
            credential_type=row["credential_type"],
            environment=row["environment"],
            enabled=row["enabled"],
            metadata=row["metadata"] or {},
        )
