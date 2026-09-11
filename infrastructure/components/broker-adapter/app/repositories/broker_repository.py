import os
from typing import Any, Dict, List, Optional

import psycopg
from psycopg.rows import dict_row
from psycopg.types.json import Jsonb  # <--- Add this import

class BrokerRepository:
    """
    Durable PostgreSQL repository for broker/account/credential metadata.

    Secret material is never stored here.
    broker_credentials.secret material remains behind CredentialProvider.
    """

    def __init__(self) -> None:
        self.host = os.getenv(
            "POSTGRES_HOST",
            "timescaledb.database.svc.cluster.local",
        )

        self.port = int(
            os.getenv(
                "POSTGRES_PORT",
                "5432",
            )
        )

        self.database = os.getenv(
            "POSTGRES_DB",
            "marketdata",
        )

        self.user = os.getenv(
            "POSTGRES_USER",
            "coreeye",
        )

        self.password = os.getenv(
            "POSTGRES_PASSWORD",
            "",
        )

        if not self.password:
            raise ValueError(
                "POSTGRES_PASSWORD_REQUIRED"
            )

    def _connect(self):
        return psycopg.connect(
            host=self.host,
            port=self.port,
            dbname=self.database,
            user=self.user,
            password=self.password,
            row_factory=dict_row,
        )

    # ---------------------------------------------------------------
    # Broker providers
    # ---------------------------------------------------------------

    def list_brokers(self) -> List[Dict[str, Any]]:
        with self._connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT
                        broker_id,
                        display_name,
                        adapter_name,
                        enabled,
                        metadata,
                        created_at,
                        updated_at
                    FROM broker_providers
                    ORDER BY broker_id
                    """
                )

                return list(cur.fetchall())

    def get_broker(
        self,
        broker_id: str,
    ) -> Optional[Dict[str, Any]]:
        with self._connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT
                        broker_id,
                        display_name,
                        adapter_name,
                        enabled,
                        metadata,
                        created_at,
                        updated_at
                    FROM broker_providers
                    WHERE broker_id = %s
                    """,
                    (broker_id.lower(),),
                )

                return cur.fetchone()

    def create_broker(
        self,
        broker_id: str,
        display_name: str,
        adapter_name: str,
        enabled: bool,
        metadata: Dict[str, Any],
    ) -> Dict[str, Any]:
        with self._connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO broker_providers (
                        broker_id, display_name, adapter_name, enabled, metadata
                    )
                    VALUES (%s, %s, %s, %s, %s)
                    ON CONFLICT (broker_id) DO UPDATE SET
                        display_name = EXCLUDED.display_name,
                        adapter_name = EXCLUDED.adapter_name,
                        enabled = EXCLUDED.enabled,
                        metadata = EXCLUDED.metadata,
                        updated_at = NOW()
                    RETURNING broker_id, display_name, adapter_name, enabled, metadata
                    """,
                    (
                        broker_id.lower(),
                        display_name,
                        adapter_name,
                        enabled,
                        Jsonb(metadata),  # <--- Use Jsonb adapter
                    ),
                )
                return cur.fetchone()

    # ---------------------------------------------------------------
    # Accounts
    # ---------------------------------------------------------------

    def create_account(
        self,
        account_id: str,
        broker_id: str,
        display_name: str,
        environment: str,
        enabled: bool,
        credential_id: Optional[str],
        metadata: Dict[str, Any],
    ) -> Dict[str, Any]:

        with self._connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO broker_accounts (
                        account_id,
                        broker_id,
                        display_name,
                        environment,
                        enabled,
                        credential_id,
                        metadata
                    )
                    VALUES (
                        %s, %s, %s, %s, %s, %s, %s
                    )
                    RETURNING
                        account_id,
                        broker_id,
                        display_name,
                        environment,
                        enabled,
                        credential_id,
                        metadata,
                        created_at,
                        updated_at
                    """,
                    (
                        account_id,
                        broker_id.lower(),
                        display_name,
                        environment.upper(),
                        enabled,
                        credential_id,
                        Jsonb(metadata),  # <--- Use Jsonb adapter
                    ),
                )

                return cur.fetchone()

    def get_account(
        self,
        account_id: str,
    ) -> Optional[Dict[str, Any]]:

        with self._connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT
                        account_id,
                        broker_id,
                        display_name,
                        environment,
                        enabled,
                        credential_id,
                        metadata,
                        created_at,
                        updated_at
                    FROM broker_accounts
                    WHERE account_id = %s
                    """,
                    (account_id,),
                )

                return cur.fetchone()

    def list_accounts(
        self,
        broker_id: Optional[str] = None,
    ) -> List[Dict[str, Any]]:

        with self._connect() as conn:
            with conn.cursor() as cur:

                if broker_id:
                    cur.execute(
                        """
                        SELECT
                            account_id,
                            broker_id,
                            display_name,
                            environment,
                            enabled,
                            credential_id,
                            metadata,
                            created_at,
                            updated_at
                        FROM broker_accounts
                        WHERE broker_id = %s
                        ORDER BY account_id
                        """,
                        (broker_id.lower(),),
                    )
                else:
                    cur.execute(
                        """
                        SELECT
                            account_id,
                            broker_id,
                            display_name,
                            environment,
                            enabled,
                            credential_id,
                            metadata,
                            created_at,
                            updated_at
                        FROM broker_accounts
                        ORDER BY account_id
                        """
                    )

                return list(cur.fetchall())

    def delete_account(
        self,
        account_id: str,
    ) -> bool:

        with self._connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM broker_accounts
                    WHERE account_id = %s
                    """,
                    (account_id,),
                )

                return cur.rowcount > 0

    def set_account_credential(
        self,
        account_id: str,
        credential_id: Optional[str],
    ) -> Optional[Dict[str, Any]]:

        with self._connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE broker_accounts
                    SET
                        credential_id = %s,
                        updated_at = NOW()
                    WHERE account_id = %s
                    RETURNING
                        account_id,
                        broker_id,
                        display_name,
                        environment,
                        enabled,
                        credential_id,
                        metadata,
                        created_at,
                        updated_at
                    """,
                    (
                        credential_id,
                        account_id,
                    ),
                )

                return cur.fetchone()

    # ---------------------------------------------------------------
    # Credentials
    # ---------------------------------------------------------------

    def create_credential(
        self,
        credential_id: str,
        broker_id: str,
        account_id: str,
        credential_ref: str,
        credential_type: str,
        environment: str,
        enabled: bool,
        metadata: Dict[str, Any],
    ) -> Dict[str, Any]:

        with self._connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO broker_credentials (
                        credential_id,
                        broker_id,
                        account_id,
                        credential_ref,
                        credential_type,
                        environment,
                        enabled,
                        metadata
                    )
                    VALUES (
                        %s, %s, %s, %s,
                        %s, %s, %s, %s
                    )
                    RETURNING
                        credential_id,
                        broker_id,
                        account_id,
                        credential_ref,
                        credential_type,
                        environment,
                        enabled,
                        metadata,
                        created_at,
                        updated_at
                    """,
                    (
                        credential_id,
                        broker_id.lower(),
                        account_id,
                        credential_ref,
                        credential_type.upper(),
                        environment.upper(),
                        enabled,
                        Jsonb(metadata),  # <--- Use Jsonb adapter
                    ),
                )

                return cur.fetchone()

    def get_credential(
        self,
        credential_id: str,
    ) -> Optional[Dict[str, Any]]:

        with self._connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT
                        credential_id,
                        broker_id,
                        account_id,
                        credential_ref,
                        credential_type,
                        environment,
                        enabled,
                        metadata,
                        created_at,
                        updated_at
                    FROM broker_credentials
                    WHERE credential_id = %s
                    """,
                    (credential_id,),
                )

                return cur.fetchone()

    def get_credential_for_account(
        self,
        account_id: str,
    ) -> Optional[Dict[str, Any]]:

        with self._connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT
                        credential_id,
                        broker_id,
                        account_id,
                        credential_ref,
                        credential_type,
                        environment,
                        enabled,
                        metadata,
                        created_at,
                        updated_at
                    FROM broker_credentials
                    WHERE account_id = %s
                      AND enabled = TRUE
                    ORDER BY credential_id
                    LIMIT 1
                    """,
                    (account_id,),
                )

                return cur.fetchone()

    def list_credentials(
        self,
        broker_id: Optional[str] = None,
        account_id: Optional[str] = None,
    ) -> List[Dict[str, Any]]:

        with self._connect() as conn:
            with conn.cursor() as cur:

                if broker_id and account_id:
                    cur.execute(
                        """
                        SELECT
                            credential_id,
                            broker_id,
                            account_id,
                            credential_ref,
                            credential_type,
                            environment,
                            enabled,
                            metadata,
                            created_at,
                            updated_at
                        FROM broker_credentials
                        WHERE broker_id = %s
                          AND account_id = %s
                        ORDER BY credential_id
                        """,
                        (
                            broker_id.lower(),
                            account_id,
                        ),
                    )

                elif broker_id:
                    cur.execute(
                        """
                        SELECT
                            credential_id,
                            broker_id,
                            account_id,
                            credential_ref,
                            credential_type,
                            environment,
                            enabled,
                            metadata,
                            created_at,
                            updated_at
                        FROM broker_credentials
                        WHERE broker_id = %s
                        ORDER BY credential_id
                        """,
                        (broker_id.lower(),),
                    )

                elif account_id:
                    cur.execute(
                        """
                        SELECT
                            credential_id,
                            broker_id,
                            account_id,
                            credential_ref,
                            credential_type,
                            environment,
                            enabled,
                            metadata,
                            created_at,
                            updated_at
                        FROM broker_credentials
                        WHERE account_id = %s
                        ORDER BY credential_id
                        """,
                        (account_id,),
                    )

                else:
                    cur.execute(
                        """
                        SELECT
                            credential_id,
                            broker_id,
                            account_id,
                            credential_ref,
                            credential_type,
                            environment,
                            enabled,
                            metadata,
                            created_at,
                            updated_at
                        FROM broker_credentials
                        ORDER BY credential_id
                        """
                    )

                return list(cur.fetchall())

    def delete_credential(
        self,
        credential_id: str,
    ) -> bool:

        with self._connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM broker_credentials
                    WHERE credential_id = %s
                    """,
                    (credential_id,),
                )

                return cur.rowcount > 0
