.PHONY: stage-00 stage-00a stage-01 stage-02 validate structure validate-stage-01 inventory-stage-01 validate-stage-02 inventory-stage-02

stage-00:
	@echo "Stage 00"

stage-00a:
	@echo "Stage 00A"

stage-01:
	@echo "Stage 01"

stage-02:
	@echo "Stage 02"

validate:
	@echo "Validation framework"

structure:
	tree -L 2 -a

validate-stage-01:
	~/corei/infrastructure/phases/stage-01-machine-foundation/validate.sh

inventory-stage-01:
	~/corei/infrastructure/phases/stage-01-machine-foundation/inventory.sh

validate-stage-02:
	~/corei/infrastructure/phases/stage-02-repository-foundation/validate.sh

inventory-stage-02:
	~/corei/infrastructure/phases/stage-02-repository-foundation/inventory.sh
