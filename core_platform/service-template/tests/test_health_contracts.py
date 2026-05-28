from fastapi.testclient import TestClient

from src.app import app

client = TestClient(app)


def test_health_live():

    response = client.get("/health/live")

    assert response.status_code == 200


def test_health_ready():

    response = client.get("/health/ready")

    assert response.status_code == 200


def test_metadata():

    response = client.get("/metadata")

    assert response.status_code == 200
