from abc import ABC, abstractmethod

class BaseBrokerAdapter(ABC):

    @abstractmethod
    def connect(self):
        pass

    @abstractmethod
    def health(self):
        pass

    @abstractmethod
    def simulate_fill(self, order):
        pass
