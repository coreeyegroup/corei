from app.connectors.mock_connector import MockBrokerConnector

class EMSService:

    def __init__(self):

        self.connector = MockBrokerConnector()

    def connector_status(self):

        return self.connector.status()

    def connect(self):

        return self.connector.connect()

    def dispatch(self, order):

        return self.connector.dispatch_order(order)
