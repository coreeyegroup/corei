from typing import Optional

from fastapi import FastAPI, HTTPException

from app.services.broker_adapter_service import BrokerAdapterService

from pydantic import BaseModel


app = FastAPI(
    title="broker-adapter-service",
    version="stage-16",
)

service = BrokerAdapterService()


# ======================================================================
# HEALTH
# ======================================================================

@app.get("/health/live")
def live():
    return {
        "status": "live",
    }


@app.get("/health/ready")
def ready():
    return {
        "status": "ready",
    }


# ======================================================================
# BROKER
# ======================================================================

@app.get("/broker/health")
def broker_health():
    return service.health()


@app.get("/broker/status")
def broker_status():
    return service.status()


@app.get("/broker/providers")
def broker_providers():
    return {
        "brokers": service.list_brokers(),
    }


# ======================================================================
# PROVIDER REGISTRATION (NEW)
# ======================================================================

class BrokerProviderCreate(BaseModel):
    id: str
    name: str
    adapterName: str
    adapterVersion: str = "1.0.0"
    type: str = "BROKER"
    region: str = "UNKNOWN"
    environment: str = "TEST"
    enabled: bool = True
    metadata: Optional[dict] = None


@app.post("/broker/providers", status_code=201)
def create_provider(payload: BrokerProviderCreate):
    try:
        # Merge fields not in DB into metadata JSON (adapterVersion, type, region, environment)
        meta = payload.metadata or {}
        meta.update({
            "adapter_version": payload.adapterVersion,
            "type": payload.type,
            "region": payload.region,
            "environment": payload.environment,
        })
        return service.create_broker(
            broker_id=payload.id,
            display_name=payload.name,
            adapter_name=payload.adapterName,
            enabled=payload.enabled,
            metadata=meta,
        )
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc))


@app.post("/broker/connect")
def broker_connect(
    auth_code: Optional[str] = None,
):
    try:
        return service.connect(
            auth_code
        )
    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )


@app.get("/broker/funds")
def broker_funds():
    try:
        return service.funds()
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )


@app.get("/broker/positions")
def broker_positions():
    try:
        return service.positions()
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )


@app.get("/broker/holdings")
def broker_holdings():
    try:
        return service.holdings()
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )


@app.get("/broker/orders")
def broker_orders():
    try:
        return service.orders()
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )


@app.post("/broker/order")
def broker_order(
    order: dict,
):
    try:
        return service.dispatch(
            order
        )
    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )


@app.delete("/broker/order/{order_id}")
def broker_cancel(
    order_id: str,
):
    try:
        return service.cancel(
            order_id
        )
    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )


@app.post("/broker/simulate-fill")
def simulate_fill(
    order: dict,
):
    return service.simulate_fill(
        order
    )


# ======================================================================
# ACCOUNT
# ======================================================================

@app.post("/broker/accounts")
def register_account(
    account_id: str,
    broker: str,
    display_name: str,
    environment: str = "LIVE",
    enabled: bool = True,
):
    try:
        account = service.register_account(
            account_id=account_id,
            broker=broker,
            display_name=display_name,
            environment=environment,
            enabled=enabled,
        )

        return account.to_dict()

    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )


@app.get("/broker/accounts")
def list_accounts(
    broker: Optional[str] = None,
):
    return service.list_accounts(
        broker
    )


@app.get("/broker/accounts/{account_id}")
def get_account(
    account_id: str,
):
    account = service.get_account(
        account_id
    )

    if account is None:
        raise HTTPException(
            status_code=404,
            detail=f"ACCOUNT_NOT_FOUND: {account_id}",
        )

    return account.to_dict()


@app.delete("/broker/accounts/{account_id}")
def remove_account(
    account_id: str,
):
    removed = service.remove_account(
        account_id
    )

    if not removed:
        raise HTTPException(
            status_code=404,
            detail=f"ACCOUNT_NOT_FOUND: {account_id}",
        )

    return {
        "account_id": account_id,
        "removed": True,
    }


@app.post("/broker/accounts/{account_id}/connect")
def connect_account(
    account_id: str,
    auth_code: Optional[str] = None,
):
    try:
        return service.connect_account(
            account_id=account_id,
            auth_code=auth_code,
        )

    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )


@app.get("/broker/accounts/{account_id}/status")
def account_status(
    account_id: str,
):
    try:
        return service.account_status(
            account_id
        )

    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )


# ======================================================================
# ACCOUNT CREDENTIALS
# ======================================================================

@app.put("/broker/accounts/{account_id}/credentials")
def set_account_credentials(
    account_id: str,
    credentials: dict,
):
    try:
        return service.set_account_credentials(
            account_id=account_id,
            credentials=credentials,
        )

    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )


@app.get("/broker/accounts/{account_id}/credentials")
def get_account_credentials(
    account_id: str,
):
    try:
        return service.get_account_credentials(
            account_id
        )

    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )


@app.delete("/broker/accounts/{account_id}/credentials")
def delete_account_credentials(
    account_id: str,
):
    try:
        removed = service.delete_account_credentials(
            account_id
        )

        return {
            "account_id": account_id,
            "removed": removed,
        }

    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )

@app.post("/broker/mt5/start")
def start_mt5_stream():
    try:
        return service.start_mt5_stream()
    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail=str(exc),
        )
