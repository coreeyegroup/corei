import os
import threading
from typing import Any, Dict, Optional

from app.credentials.service import CredentialService
from app.models.broker_account import BrokerAccount
from app.services.account_registry import AccountRegistry
from app.services.adapter_factory import AdapterFactory
from app.services.broker_registry import BrokerRegistry
from app.repositories.broker_repository import BrokerRepository

# NEW IMPORT
from app.adapters.mt5_data_adapter import Mt5DataAdapter


class BrokerAdapterService:
    """
    Broker adapter orchestration boundary.

    Runtime:
        BrokerRegistry
        AccountRegistry

    Durable metadata:
        BrokerRepository

    Credential boundary:
        CredentialService

    Broker-specific implementations remain owned by adapters.
    Market-data/feed connectivity remains independent from
    broker execution-account connectivity.
    """

    def __init__(self) -> None:

        self.repository = BrokerRepository()

        self.account_registry = AccountRegistry()
        self.broker_registry = BrokerRegistry()

        self.credential_service = CredentialService(
            repository=self.repository,
        )

        self._register_available_brokers()
        self._restore_accounts()

        self.default_broker = os.getenv(
            "BROKER_ADAPTER",
            "mock",
        ).lower()

        if not self.broker_registry.contains(
            self.default_broker
        ):
            raise ValueError(
                f"UNSUPPORTED_ADAPTER: {self.default_broker}"
            )

        self.adapter = self.broker_registry.get(
            self.default_broker
        )

    # ---------------------------------------------------------------
    # Broker runtime registry
    # ---------------------------------------------------------------

    def _register_available_brokers(self) -> None:

        configured = os.getenv(
            "BROKER_ADAPTERS",
            "mock,upstox",
        )

        for broker_name in configured.split(","):

            broker_name = broker_name.strip().lower()

            if not broker_name:
                continue

            try:
                adapter = AdapterFactory.create(
                    broker_name
                )

                self.broker_registry.register(
                    broker_name,
                    adapter,
                )

            except Exception:
                continue

    # ---------------------------------------------------------------
    # CRITICAL FIX: list_brokers now reads from PostgreSQL repository
    # ---------------------------------------------------------------

    def list_brokers(self):
        # Reads from PostgreSQL (durable) - REQUIRED to see newly added providers
        return self.repository.list_brokers()

    # ---------------------------------------------------------------
    # NEW: Create or update broker metadata
    # ---------------------------------------------------------------

    def create_broker(
        self,
        broker_id: str,
        display_name: str,
        adapter_name: str,
        enabled: bool,
        metadata: Dict[str, Any],
    ) -> Dict[str, Any]:
        return self.repository.create_broker(
            broker_id=broker_id,
            display_name=display_name,
            adapter_name=adapter_name,
            enabled=enabled,
            metadata=metadata,
        )

    # ---------------------------------------------------------------
    # NEW: Start MT5 Data Stream
    # ---------------------------------------------------------------

    def start_mt5_stream(
        self,
        host: str = "192.168.1.2",
        port: int = 5555,
    ):
        # Start the listener in a background thread so it doesn't block the API
        mt5_adapter = Mt5DataAdapter(host=host, port=port)
        thread = threading.Thread(target=mt5_adapter.start_stream, daemon=True)
        thread.start()
        return {
            "status": "started",
            "host": host,
            "port": port,
            "message": "MT5 Data stream connected and forwarding to Kafka"
        }

    # ---------------------------------------------------------------
    # Durable account restoration
    # ---------------------------------------------------------------

    def _restore_accounts(self) -> None:

        rows = self.repository.list_accounts()

        for row in rows:

            broker = row["broker_id"]

            if not self.broker_registry.contains(
                broker
            ):
                continue

            account = BrokerAccount(
                account_id=row["account_id"],
                broker=broker,
                display_name=row["display_name"],
                environment=row["environment"],
                enabled=row["enabled"],
                credential_id=row["credential_id"],
                metadata=row["metadata"] or {},
            )

            self.account_registry.register(
                account
            )

    # ---------------------------------------------------------------
    # Account management
    # ---------------------------------------------------------------

    def register_account(
        self,
        account_id: str,
        broker: str,
        display_name: str,
        environment: str = "LIVE",
        enabled: bool = True,
        credential_id: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
    ) -> BrokerAccount:

        broker = broker.lower()

        if not self.broker_registry.contains(
            broker
        ):
            raise ValueError(
                f"UNSUPPORTED_BROKER: {broker}"
            )

        if not account_id.strip():
            raise ValueError(
                "ACCOUNT_ID_REQUIRED"
            )

        if credential_id:

            credential = self.credential_service.get(
                credential_id
            )

            if credential is None:
                raise ValueError(
                    f"CREDENTIAL_NOT_FOUND: {credential_id}"
                )

            if credential.account_id != account_id:
                raise ValueError(
                    "CREDENTIAL_ACCOUNT_MISMATCH"
                )

        row = self.repository.create_account(
            account_id=account_id,
            broker_id=broker,
            display_name=display_name,
            environment=environment,
            enabled=enabled,
            credential_id=credential_id,
            metadata=metadata or {},
        )

        account = BrokerAccount(
            account_id=row["account_id"],
            broker=row["broker_id"],
            display_name=row["display_name"],
            environment=row["environment"],
            enabled=row["enabled"],
            credential_id=row["credential_id"],
            metadata=row["metadata"] or {},
        )

        self.account_registry.register(
            account
        )

        return account

    def get_account(
        self,
        account_id: str,
    ) -> Optional[BrokerAccount]:

        return self.account_registry.get(
            account_id
        )

    def list_accounts(
        self,
        broker: Optional[str] = None,
    ):

        return [
            account.to_dict()
            for account in self.account_registry.list(
                broker
            )
        ]

    def remove_account(
        self,
        account_id: str,
    ) -> bool:

        removed = self.repository.delete_account(
            account_id
        )

        self.account_registry.remove(
            account_id
        )

        return removed

    # ---------------------------------------------------------------
    # Credential management
    # ---------------------------------------------------------------

    def register_credential(
        self,
        credential_id: str,
        broker: str,
        account_id: str,
        credential_ref: str,
        credential_type: str = "OAUTH",
        environment: str = "LIVE",
        enabled: bool = True,
        metadata: Optional[Dict[str, Any]] = None,
    ):

        broker = broker.lower()

        if not self.broker_registry.contains(
            broker
        ):
            raise ValueError(
                f"UNSUPPORTED_BROKER: {broker}"
            )

        account = self.account_registry.get(
            account_id
        )

        if account is None:
            raise ValueError(
                f"ACCOUNT_NOT_FOUND: {account_id}"
            )

        record = self.credential_service.register(
            credential_id=credential_id,
            broker=broker,
            account_id=account_id,
            credential_ref=credential_ref,
            credential_type=credential_type,
            environment=environment,
            enabled=enabled,
            metadata=metadata,
        )

        self.repository.set_account_credential(
            account_id,
            credential_id,
        )

        account.credential_id = credential_id

        return record.to_dict()

    def get_credential(
        self,
        credential_id: str,
    ):

        record = self.credential_service.get(
            credential_id
        )

        if record is None:
            raise ValueError(
                f"CREDENTIAL_NOT_FOUND: {credential_id}"
            )

        return record.to_dict()

    def list_credentials(
        self,
        broker: Optional[str] = None,
        account_id: Optional[str] = None,
    ):

        return [
            record.to_dict()
            for record in self.credential_service.list(
                broker=broker,
                account_id=account_id,
            )
        ]

    def remove_credential(
        self,
        credential_id: str,
    ):

        record = self.credential_service.get(
            credential_id
        )

        if record is None:
            return False

        removed = self.credential_service.remove(
            credential_id
        )

        if removed:

            account = self.account_registry.get(
                record.account_id
            )

            if account:
                account.credential_id = None

            self.repository.set_account_credential(
                record.account_id,
                None,
            )

        return removed

    # ---------------------------------------------------------------
    # Account-specific broker execution
    # ---------------------------------------------------------------

    def connect_account(
        self,
        account_id: str,
        auth_code: Optional[str] = None,
    ):

        account = self.account_registry.get(
            account_id
        )

        if account is None:
            raise ValueError(
                f"ACCOUNT_NOT_FOUND: {account_id}"
            )

        if not account.enabled:
            raise ValueError(
                f"ACCOUNT_DISABLED: {account_id}"
            )

        adapter = self.broker_registry.get(
            account.broker
        )

        credential = None

        if account.credential_id:

            credential = self.credential_service.resolve(
                account.credential_id
            )

        result = adapter.connect(
            auth_code
        )

        session_id = None

        if isinstance(result, dict):
            session_id = result.get(
                "session_id"
            )

        self.account_registry.set_connection(
            account_id,
            True,
            session_id,
        )

        return {
            "account": account.to_dict(),
            "broker": account.broker,
            "credential_id": account.credential_id,
            "credential_resolved": bool(
                credential
            ),
            "result": result,
        }

    def account_status(
        self,
        account_id: str,
    ):

        account = self.account_registry.get(
            account_id
        )

        if account is None:
            raise ValueError(
                f"ACCOUNT_NOT_FOUND: {account_id}"
            )

        adapter = self.broker_registry.get(
            account.broker
        )

        status = adapter.status()

        return {
            "account": account.to_dict(),
            "broker": account.broker,
            "status": status,
        }

    # ---------------------------------------------------------------
    # Existing default-broker compatibility API
    # ---------------------------------------------------------------

    def connect(
        self,
        auth_code: Optional[str] = None,
    ):
        return self.adapter.connect(
            auth_code
        )

    def health(self):
        return self.adapter.health()

    def funds(self):
        return self.adapter.funds()

    def positions(self):
        return self.adapter.positions()

    def holdings(self):
        return self.adapter.holdings()

    def orders(self):
        return self.adapter.orders()

    def dispatch(self, order):
        return self.adapter.dispatch_order(
            order
        )

    def cancel(self, order_id):
        return self.adapter.cancel_order(
            order_id
        )

    def status(self):
        return self.adapter.status()

    def simulate_fill(self, order):
        return self.adapter.simulate_fill(
            order
        )
