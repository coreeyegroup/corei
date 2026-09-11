import zmq
import json
import time
from kafka import KafkaProducer

class Mt5DataAdapter:
    def __init__(self, host: str = "192.168.1.2", port: int = 5555):
        self.host = host
        self.port = port
        self.context = zmq.Context()
        self.socket = self.context.socket(zmq.SUB)
        self.socket.connect(f"tcp://{self.host}:{self.port}")
        self.socket.setsockopt_string(zmq.SUBSCRIBE, "")
        self.producer = None
        self.producer_started = False

    def _try_connect_producer(self):
        if not self.producer_started:
            try:
                # Use Kafka NodePort for retryability
                self.producer = KafkaProducer(
                    bootstrap_servers='kafka.kafka.svc.cluster.local:9092',
                    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
                    api_version_auto_detect=True
                )
                self.producer_started = True
                print("Connected to Kafka successfully.")
            except Exception as e:
                print(f"Kafka is not reachable. Will retry in 5 seconds. Error: {e}")
                self.producer_started = False
                time.sleep(5)
        return self.producer_started

    def start_stream(self):
        print(f"Subscribed to MT5 bridge at {self.host}:{self.port}")
        while True:
            try:
                data = self.socket.recv_json()
                if self._try_connect_producer():
                    data["broker_id"] = "MT5_BROKER_1"
                    self.producer.send('corei.market.data.mt5', data)
            except Exception as e:
                print(f"Error streaming: {e}")
                time.sleep(5)
