#!/usr/bin/env bash
# ============================================================

set -euo pipefail

ROOT="$HOME/corei"

mkdir -p "$ROOT/docs/adr"
mkdir -p "$ROOT/docs/governance"
mkdir -p "$ROOT/docs/standards"
mkdir -p "$ROOT/docs/architecture"

cd "$ROOT"

cat > docs/governance/definition-of-done.md <<'EOF'
# Definition of Done

Every service must include:
- tests
- documentation
- health endpoint
- validation
- contracts
- observability hooks
EOF

# ============================================================
# PR REVIEW POLICY
# ============================================================

cat > docs/governance/pr-review-policy.md <<'EOF'
# PR Review Policy

Rules:
- minimum 1 approver
- CI must pass
- no direct merge to main
- feature branches required
EOF

# ============================================================
# REPOSITORY STRATEGY
# ============================================================

cat > docs/governance/repository-strategy.md <<'EOF'
# Repository Strategy

Multi-repo topology adopted.

Repositories:
- corei-core
- corei-infrastructure
- corei-sdk
- corei-schemas
- corei-services
EOF

# ============================================================
# MASTER STANDARDS INDEX
# ============================================================

cat > docs/architecture/standards.md <<'EOF'
# Engineering Standards Index

References:
- coding-standards.md
- commit-standards.md
- naming-standards.md
- branching-strategy.md
- versioning-policy.md
- environment-naming.md
- schema-versioning.md
- definition-of-done.md
- pr-review-policy.md
EOF


echo "Standards generation complete"

# ============================================================
# BRANCHING STRATEGY
# ============================================================

cat > docs/governance/branching-strategy.md <<'EOF'
# Branching Strategy

main
- production-ready only

staging
- integration testing

dev
- active development

feature/*
- short-lived PR branches
EOF

# ============================================================
# VERSIONING POLICY
# ============================================================

cat > docs/governance/versioning-policy.md <<'EOF'
# Semantic Versioning Policy

Format:
MAJOR.MINOR.PATCH

Rules:
- breaking changes increment MAJOR
- backward compatible changes increment MINOR
- fixes increment PATCH
EOF

# ============================================================
# ENVIRONMENT NAMING
# ============================================================

cat > docs/governance/environment-naming.md <<'EOF'
# Environment Naming

Allowed environments:
- dev
- staging
- production
- disaster-recovery
EOF

# ============================================================
# SCHEMA VERSIONING
# ============================================================

cat > docs/governance/schema-versioning.md <<'EOF'
# Schema Versioning Rules

Rules:
- breaking changes require new schema version
- breaking changes require new topic
- backward compatibility required by default
EOF

# ============================================================
# CODING STANDARDS
# ============================================================

cat > docs/standards/coding-standards.md <<'EOF'
# Coding Standards

## Python
- PEP8 mandatory
- Type hints mandatory
- Black formatting
- Ruff linting

## Go
- gofmt mandatory
- golangci-lint required

## Rust
- cargo fmt mandatory
- clippy required
EOF

# ============================================================
# COMMIT STANDARDS
# ============================================================

cat > docs/standards/commit-standards.md <<'EOF'
# Commit Standards

Conventional Commits mandatory.

Examples:
- feat:
- fix:
- docs:
- refactor:
- test:
- chore:
EOF

# ============================================================
# NAMING STANDARDS
# ============================================================

cat > docs/standards/naming-standards.md <<'EOF'
# Naming Standards

## Services
<domain>-service

## Topics
core.<domain>.v1

## Schemas
<entity>-v1.avsc

## Namespaces
core-<environment>
EOF
