from http.server import BaseHTTPRequestHandler, HTTPServer

class Handler(BaseHTTPRequestHandler):

    def do_GET(self):

        if self.path == "/health/ready":

            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"READY")

        else:
            self.send_response(404)
            self.end_headers()

server = HTTPServer(("0.0.0.0", 8084), Handler)

print("decision-engine-service health server running")

server.serve_forever()
