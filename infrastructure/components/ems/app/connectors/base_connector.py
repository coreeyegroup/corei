from abc import ABC, abstractmethod

class BaseBrokerConnector(ABC):

    @abstractmethod
    def connect(self):
        pass

    @abstractmethod
    def heartbeat(self):
        pass

    @abstractmethod
    def dispatch_order(self, order):
        pass

    @abstractmethod
    def status(self):
        pass
