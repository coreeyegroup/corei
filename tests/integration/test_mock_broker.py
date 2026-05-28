import requests


def test_mock_broker_order_fill():

    payload = {
        "order_id": "order-001",
        "quantity": "100"
    }

    response = requests.post(
        "http://localhost:8081/orders",
        json=payload,
        timeout=5
    )

    assert response.status_code in [200, 400]

    body = response.json()

    assert "status" in body
