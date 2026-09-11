from threading import RLock
from typing import Dict, List, Optional

from app.models.broker_account import BrokerAccount


class AccountRegistry:
    """
    Runtime registry for broker accounts.

    Broker identity and account identity are intentionally separate.
    Each account owns its own connection/session state.
    """

    def __init__(self) -> None:
        self._accounts: Dict[str, BrokerAccount] = {}
        self._lock = RLock()

    def register(self, account: BrokerAccount) -> BrokerAccount:
        with self._lock:
            self._accounts[account.account_id] = account
            return account

    def get(self, account_id: str) -> Optional[BrokerAccount]:
        with self._lock:
            return self._accounts.get(account_id)

    def remove(self, account_id: str) -> bool:
        with self._lock:
            return self._accounts.pop(account_id, None) is not None

    def list(self, broker: Optional[str] = None) -> List[BrokerAccount]:
        with self._lock:
            accounts = list(self._accounts.values())

        if broker:
            accounts = [
                account
                for account in accounts
                if account.broker.lower() == broker.lower()
            ]

        return accounts

    def set_connection(
        self,
        account_id: str,
        connected: bool,
        session_id: Optional[str] = None,
    ) -> Optional[BrokerAccount]:
        with self._lock:
            account = self._accounts.get(account_id)

            if account is None:
                return None

            account.connected = connected
            account.session_id = session_id

            return account
