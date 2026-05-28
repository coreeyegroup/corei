#!/usr/bin/env python3

import json
from pathlib import Path


INCIDENT_LOG = (
    "operations/incidents/incident-log.json"
)


class IncidentManager:

    def persist_incident(
        self,
        incident: dict
    ):

        Path(INCIDENT_LOG).parent.mkdir(
            parents=True,
            exist_ok=True
        )

        Path(INCIDENT_LOG).write_text(
            json.dumps(incident, indent=2)
        )

        return {
            "incident_logged": True
        }


if __name__ == "__main__":

    manager = IncidentManager()

    print(
        manager.persist_incident({
            "severity": "critical",
            "service": "portfolio-service"
        })
    )
