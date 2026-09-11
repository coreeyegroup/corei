from abc import ABC, abstractmethod
from typing import Dict, Optional


class CredentialProvider(ABC):

    @abstractmethod
    def get(
        self,
        credential_ref: str,
    ) -> Dict[str, str]:
        raise NotImplementedError

    @abstractmethod
    def create(
        self,
        credential_ref: str,
        values: Dict[str, str],
    ) -> None:
        raise NotImplementedError

    @abstractmethod
    def update(
        self,
        credential_ref: str,
        values: Dict[str, str],
    ) -> None:
        raise NotImplementedError

    @abstractmethod
    def delete(
        self,
        credential_ref: str,
    ) -> None:
        raise NotImplementedError

    @abstractmethod
    def exists(
        self,
        credential_ref: str,
    ) -> bool:
        raise NotImplementedError
