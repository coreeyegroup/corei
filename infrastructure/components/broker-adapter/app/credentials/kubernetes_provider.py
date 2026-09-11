import base64
from typing import Dict

from kubernetes import client, config
from kubernetes.client.rest import ApiException

from app.credentials.base import CredentialProvider


class KubernetesCredentialProvider(CredentialProvider):

    def __init__(
        self,
        namespace: str = "trading-infra",
    ):
        self.namespace = namespace

        try:
            config.load_incluster_config()
        except config.ConfigException:
            config.load_kube_config()

        self.api = client.CoreV1Api()

    def get(self, credential_ref: str) -> Dict[str, str]:
        secret = self.api.read_namespaced_secret(
            credential_ref,
            self.namespace,
        )

        return {
            key: base64.b64decode(value).decode("utf-8")
            for key, value in (secret.data or {}).items()
        }

    def create(
        self,
        credential_ref: str,
        values: Dict[str, str],
    ) -> None:
        encoded = {
            key: base64.b64encode(value.encode()).decode()
            for key, value in values.items()
        }

        body = client.V1Secret(
            metadata=client.V1ObjectMeta(
                name=credential_ref,
            ),
            type="Opaque",
            data=encoded,
        )

        self.api.create_namespaced_secret(
            self.namespace,
            body,
        )

    def update(
        self,
        credential_ref: str,
        values: Dict[str, str],
    ) -> None:
        encoded = {
            key: base64.b64encode(value.encode()).decode()
            for key, value in values.items()
        }

        body = client.V1Secret(
            metadata=client.V1ObjectMeta(
                name=credential_ref,
            ),
            type="Opaque",
            data=encoded,
        )

        self.api.replace_namespaced_secret(
            credential_ref,
            self.namespace,
            body,
        )

    def delete(self, credential_ref: str) -> None:
        try:
            self.api.delete_namespaced_secret(
                credential_ref,
                self.namespace,
            )
        except ApiException as exc:
            if exc.status != 404:
                raise

    def exists(self, credential_ref: str) -> bool:
        try:
            self.api.read_namespaced_secret(
                credential_ref,
                self.namespace,
            )
            return True
        except ApiException as exc:
            if exc.status == 404:
                return False
            raise
