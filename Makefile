.PHONY: \
stage-01 \
stage-02 \
stage-03 \
validate \
structure

stage-01:
./install.sh

stage-02:
./scripts/setup-repos.sh

stage-03:
./scripts/setup-governance.sh

validate:
@echo "Validation framework pending"

structure:
tree -L 2 -a
