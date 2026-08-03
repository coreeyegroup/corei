#!/usr/bin/env python3

import shutil
import sys
from pathlib import Path


ROOT = Path(
    "state/security/kafka/v2"
)

SOURCE_MANIFEST = (
    ROOT /
    "manifests" /
    "secured-statefulset.yaml"
)

SOURCE_VALIDATION = (
    ROOT /
    "reports" /
    "generated-manifest-validation.yaml"
)

PACKAGE_ROOT = (
    ROOT /
    "package"
)

PACKAGE_MANIFEST = (
    PACKAGE_ROOT /
    "manifest" /
    "secured-statefulset.yaml"
)

PACKAGE_VALIDATION = (
    PACKAGE_ROOT /
    "validation" /
    "generated-manifest-validation.yaml"
)

PACKAGE_STATE = (
    PACKAGE_ROOT /
    "package.state"
)

PACKAGE_STATE_MD = (
    PACKAGE_ROOT /
    "metadata" /
    "package-state.md"
)

PACKAGE_MANIFEST_MD = (
    PACKAGE_ROOT /
    "metadata" /
    "package-manifest.md"
)


def fail(message):

    print(
        f"[FAIL] {message}"
    )

    sys.exit(1)


def ensure_dirs():

    (
        PACKAGE_ROOT /
        "manifest"
    ).mkdir(
        parents=True,
        exist_ok=True
    )

    (
        PACKAGE_ROOT /
        "validation"
    ).mkdir(
        parents=True,
        exist_ok=True
    )

    (
        PACKAGE_ROOT /
        "metadata"
    ).mkdir(
        parents=True,
        exist_ok=True
    )


def validate_inputs():

    if not SOURCE_MANIFEST.exists():

        fail(
            "source manifest missing"
        )

    if not SOURCE_VALIDATION.exists():

        fail(
            "validation report missing"
        )

    report = (
        SOURCE_VALIDATION
        .read_text()
    )

    if "status: PASS" not in report:

        fail(
            "validation not PASS"
        )

    if "profile: RECOVERY" not in report:

        fail(
            "expected recovery profile"
        )


def build_package():

    shutil.copy2(
        SOURCE_MANIFEST,
        PACKAGE_MANIFEST
    )

    shutil.copy2(
        SOURCE_VALIDATION,
        PACKAGE_VALIDATION
    )


def validate_package():

    if not PACKAGE_MANIFEST.exists():

        fail(
            "package manifest missing"
        )

    if not PACKAGE_VALIDATION.exists():

        fail(
            "package validation missing"
        )

    validation = (
        PACKAGE_VALIDATION
        .read_text()
    )

    if "status: PASS" not in validation:

        fail(
            "packaged validation failed"
        )


def write_metadata():

    PACKAGE_STATE.write_text(
        "\n".join([
            "STATUS=PACKAGED",
            "",
            "PROFILE=RECOVERY",
            "",
            "VALIDATED=YES",
            "",
            "DEPLOYMENT_ALLOWED=NO",
            ""
        ])
    )

    PACKAGE_STATE_MD.write_text(
        "\n".join([
            "# PACKAGE STATE",
            "",
            "STATUS=PACKAGED",
            "",
            "PROFILE=RECOVERY",
            "",
            "VALIDATION=PASS",
            "",
            "DEPLOYMENT_ALLOWED=NO",
            ""
        ])
    )

    PACKAGE_MANIFEST_MD.write_text(
        "\n".join([
            "# PACKAGE MANIFEST",
            "",
            "ARTIFACTS",
            "",
            "secured-statefulset.yaml",
            "",
            "generated-manifest-validation.yaml",
            "",
            "PROFILE=RECOVERY",
            "",
            "STATUS=VALIDATED",
            "",
            "DEPLOYMENT_ALLOWED=NO",
            ""
        ])
    )


def main():

    ensure_dirs()

    validate_inputs()

    build_package()

    validate_package()

    write_metadata()

    print(
        "[PASS] deployment package created"
    )


if __name__ == "__main__":
    main()
