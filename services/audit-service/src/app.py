from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/health/live")
def live():
    return jsonify({
        "status": "alive"
    }), 200


@app.route("/health/ready")
def ready():
    return jsonify({
        "status": "ready"
    }), 200


@app.route("/metadata")
def metadata():
    return jsonify({
        "service": 'audit-service',
        "runtime": "core-platform",
        "environment": "development",
        "governance_mode": "institutional"
    }), 200


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=8080
    )
