import time

class SessionManager:

    def __init__(self):

        self.connected = True

        self.last_heartbeat = time.time()

    def heartbeat(self):

        self.last_heartbeat = time.time()

        return {
            "status": "alive",
            "heartbeat": self.last_heartbeat
        }

    def status(self):

        return {
            "connected": self.connected,
            "last_heartbeat": self.last_heartbeat
        }
