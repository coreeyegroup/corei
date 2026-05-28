import time

class LatencySimulator:

    @staticmethod
    def apply(latency_ms: int):

        time.sleep(latency_ms / 1000)
