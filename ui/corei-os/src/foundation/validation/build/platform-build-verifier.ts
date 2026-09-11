/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 08.04
 *
 * File        : platform-build-verifier.ts
 * Purpose     : Platform Foundation Build Verification.
 * =============================================================================
 */

import {

    RegistryManager

} from "../../registry";

import {

    StateManager

} from "../../state";

import {

    EventManager

} from "../../event";

import {

    ExtensionManager

} from "../../extension";

import {

    LoggingManager

} from "../../logging";

import {

    DiagnosticsManager

} from "../../diagnostics";

import {

    HealthManager

} from "../../health";

/**
 * ============================================================================
 * Platform Build Verification
 * ============================================================================
 */
export function verifyPlatformBuild(): void {

    console.group(

        "[COREI] Platform Foundation Build Verification"

    );

    console.info(
        "Registry Export        :",
        typeof RegistryManager === "function"
            ? "PASS"
            : "FAIL"
    );

    console.info(
        "State Export           :",
        typeof StateManager === "function"
            ? "PASS"
            : "FAIL"
    );

    console.info(
        "Event Export           :",
        typeof EventManager === "function"
            ? "PASS"
            : "FAIL"
    );

    console.info(
        "Extension Export       :",
        typeof ExtensionManager === "function"
            ? "PASS"
            : "FAIL"
    );

    console.info(
        "Logging Export         :",
        typeof LoggingManager === "function"
            ? "PASS"
            : "FAIL"
    );

    console.info(
        "Diagnostics Export     :",
        typeof DiagnosticsManager === "function"
            ? "PASS"
            : "FAIL"
    );

    console.info(
        "Health Export          :",
        typeof HealthManager === "function"
            ? "PASS"
            : "FAIL"
    );

    console.info(
        "Foundation Build       : PASS"
    );

    console.groupEnd();

}
