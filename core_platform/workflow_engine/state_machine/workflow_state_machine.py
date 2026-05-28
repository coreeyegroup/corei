#!/usr/bin/env python3

VALID_TRANSITIONS = {
    "signal": "risk",
    "risk": "order",
    "order": "fill"
}


class WorkflowStateMachine:

    def next_stage(
        self,
        stage: str
    ):

        return VALID_TRANSITIONS.get(stage)


if __name__ == "__main__":

    machine = WorkflowStateMachine()

    print(
        machine.next_stage("signal")
    )
