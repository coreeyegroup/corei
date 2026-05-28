from fastapi import FastAPI

from sdk.bootstrap.validator import (
    BootstrapValidator
)

app = FastAPI()

validator = BootstrapValidator()

validator.validate({
    "ENVIRONMENT": "dev",
    "SERVICE_NAME": "template-service"
})


@app.get("/health/live")
async def health_live():

    return {
        "status": "alive"
    }


@app.get("/health/ready")
async def health_ready():

    return {
        "status": "ready"
    }


@app.get("/metadata")
async def metadata():

    return {
        "service": "template-service",
        "runtime": "platform-governed"
    }
