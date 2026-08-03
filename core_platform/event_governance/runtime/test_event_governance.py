from core_platform.event_governance.lineage.event_lineage import (
    EventLineage
)


def test_event_lineage():

    lineage = EventLineage()

    result = lineage.lineage_hash({
        "event": "test"
    })

    assert len(result) == 64
