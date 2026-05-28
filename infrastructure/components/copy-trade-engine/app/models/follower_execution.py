from dataclasses import dataclass

@dataclass
class FollowerExecution:

    follower_account_id: str

    follower_execution_id: str

    scaled_quantity: float

    propagation_status: str
