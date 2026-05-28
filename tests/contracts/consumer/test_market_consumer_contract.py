from pact import Consumer, Provider


def test_market_data_contract():

    pact = Consumer("market-consumer").has_pact_with(
        Provider("market-provider")
    )

    expected = {
        "event_id": "tick-000001",
        "instrument": "EURUSD"
    }

    (
        pact
        .given("market data exists")
        .upon_receiving("a market tick request")
        .with_request("GET", "/market/tick")
        .will_respond_with(
            200,
            body=expected
        )
    )

    assert expected["instrument"] == "EURUSD"
