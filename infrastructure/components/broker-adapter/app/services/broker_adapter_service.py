from app.services.adapter_factory import AdapterFactory

class BrokerAdapterService:

    def __init__(self):

        self.adapter = AdapterFactory.create("mock")

    def connect(self):

        return self.adapter.connect()

    def health(self):

        return self.adapter.health()

    def simulate_fill(self, order):

        return self.adapter.simulate_fill(order)
