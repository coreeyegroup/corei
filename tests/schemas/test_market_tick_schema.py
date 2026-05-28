import json
from pathlib import Path

import pytest
from fastavro.validation import validate
from fastavro.schema import load_schema

ROOT = Path(__file__).resolve().parents[2]

SCHEMA_PATH = ROOT / "schemas/avro/market-data/market-tick.avsc"

VALID_FIXTURE = ROOT / "tests/schemas/fixtures/market-tick-valid.json"

INVALID_FIXTURE = ROOT / "tests/schemas/fixtures/market-tick-invalid.json"


def load_json(path):
    with open(path, "r") as f:
        return json.load(f)


def test_market_tick_valid_schema():
    schema = load_schema(str(SCHEMA_PATH))
    payload = load_json(VALID_FIXTURE)

    assert validate(payload, schema) is True


def test_market_tick_invalid_schema():
    schema = load_schema(str(SCHEMA_PATH))
    payload = load_json(INVALID_FIXTURE)

    with pytest.raises(Exception):
        validate(payload, schema, raise_errors=True)
