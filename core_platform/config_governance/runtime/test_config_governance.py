from core_platform.config_governance.lineage.config_lineage import (
    ConfigLineage
)


def test_config_lineage():

    lineage = ConfigLineage()

    result = lineage.lineage_hash("config")

    assert len(result) == 64
