#!/usr/bin/env python3


class EscalationOrchestrator:

    def escalate(
        self,
        severity: str
    ):

        escalation = {
            "critical": "immediate-escalation",
            "high": "priority-escalation",
            "medium": "standard-escalation"
        }

        return escalation.get(
            severity,
            "unknown"
        )


if __name__ == "__main__":

    orchestrator = EscalationOrchestrator()

    print(
        orchestrator.escalate(
            "critical"
        )
    )
