from fastapi import APIRouter

router = APIRouter(prefix="/strategies")

@router.get("/")
def list_strategies():
    return {
        "strategies": [
            "mean_reversion",
            "momentum",
            "stat_arb"
        ]
    }
