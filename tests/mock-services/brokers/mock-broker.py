#!/usr/bin/env python3

import json
import random
import time
from http.server import BaseHTTPRequestHandler, HTTPServer

SEED = 42
random.seed(SEED)

HOST = "0.0.0.0"
PORT = 8081

BROKER_CONFIG = {
    "fill_latency_ms": 150,
    "partial_fill_probability": 0.10,
    "rejection_probability": 0.05,
    "disconnect_probability": 0.01
}


class MockBrokerHandler(BaseHTTPRequestHandler):

    def _set_response(self, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()

    def do_POST(self):

        if self.path != "/orders":
            self._set_response(404)
            return

        content_length = int(self.headers["Content-Length"])
        payload = self.rfile.read(content_length)

        order = json.loads(payload)

        simulated_latency = (
            BROKER_CONFIG["fill_latency_ms"] / 1000
        )

        time.sleep(simulated_latency)

        rejection_roll = random.random()

        if rejection_roll < BROKER_CONFIG["rejection_probability"]:

            response = {
                "status": "rejected",
                "reason": "simulated rejection",
                "order_id": order["order_id"]
            }

            self._set_response(400)
            self.wfile.write(json.dumps(response).encode())
            return

        partial_fill_roll = random.random()

        if partial_fill_roll < BROKER_CONFIG["partial_fill_probability"]:

            response = {
                "status": "partial_fill",
                "filled_quantity": "50",
                "remaining_quantity": "50",
                "order_id": order["order_id"]
            }

            self._set_response(200)
            self.wfile.write(json.dumps(response).encode())
            return

        response = {
            "status": "filled",
            "filled_quantity": order["quantity"],
            "order_id": order["order_id"]
        }

        self._set_response(200)
        self.wfile.write(json.dumps(response).encode())


if __name__ == "__main__":

    server = HTTPServer((HOST, PORT), MockBrokerHandler)

    print(f"Mock broker running on {HOST}:{PORT}")

    server.serve_forever()
