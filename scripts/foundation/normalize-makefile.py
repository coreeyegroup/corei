from pathlib import Path

content = """
.PHONY: stage-00 stage-00a stage-01 stage-02 validate structure validate-stage-01 inventory-stage-01 validate-stage-02 inventory-stage-02

stage-00:
\t@echo "Stage 00"

stage-00a:
\t@echo "Stage 00A"

stage-01:
\t@echo "Stage 01"

stage-02:
\t@echo "Stage 02"

validate:
\t@echo "Validation framework"

structure:
\ttree -L 2 -a

validate-stage-01:
\t~/corei/infrastructure/phases/stage-01-machine-foundation/validate.sh

inventory-stage-01:
\t~/corei/infrastructure/phases/stage-01-machine-foundation/inventory.sh

validate-stage-02:
\t~/corei/infrastructure/phases/stage-02-repository-foundation/validate.sh

inventory-stage-02:
\t~/corei/infrastructure/phases/stage-02-repository-foundation/inventory.sh
""".lstrip()

Path.home().joinpath("corei/Makefile").write_text(content)

print("Makefile normalized successfully.")
