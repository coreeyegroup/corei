from fastapi import APIRouter

router = APIRouter(prefix="/approvals")

@router.get("/")
def approvals():
    return {
        "pending_approvals": []
    }
