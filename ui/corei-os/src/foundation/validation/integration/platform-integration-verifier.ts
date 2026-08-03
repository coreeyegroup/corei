/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 08.03
 *
 * File        : platform-integration-verifier.ts
 * Purpose     : Platform Foundation Integration Verification.
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
 * Platform Foundation Integration Verification
 * ============================================================================
 */
export function verifyPlatformIntegration(): void {

    console.group(

        "[COREI] Platform Foundation Integration"

    );

    const registry =
        new RegistryManager(

            "integration-registry",

            "Platform Integration"

        );

    const state =
        new StateManager(

            "integration-state",

            "Platform Integration",

            {}

        );

    const event =
        new EventManager(

            "integration-event",

            "Platform Integration"

        );

    const extension =
        new ExtensionManager(

            "integration-extension",

            "Platform Integration"

        );

    const logging =
        new LoggingManager(

            "integration-logging",

            "Platform Integration"

        );

    const diagnostics =
        new DiagnosticsManager(

            "integration-diagnostics",

            "Platform Integration"

        );

    const health =
        new HealthManager(

            "integration-health",

            "Platform Integration"

        );

    console.info(

        "Registry       :",

        registry ? "PASS" : "FAIL"

    );

    console.info(

        "State          :",

        state ? "PASS" : "FAIL"

    );

    console.info(

        "Event          :",

        event ? "PASS" : "FAIL"

    );

    console.info(

        "Extension      :",

        extension ? "PASS" : "FAIL"

    );

    console.info(

        "Logging        :",

        logging ? "PASS" : "FAIL"

    );

    console.info(

        "Diagnostics    :",

        diagnostics ? "PASS" : "FAIL"

    );

    console.info(

        "Health         :",

        health ? "PASS" : "FAIL"

    );

    console.info(

        "Integration    : PASS"

    );

    console.groupEnd();

}