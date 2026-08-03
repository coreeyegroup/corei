/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 07.01
 *
 * File        : startup-validator.ts
 * Purpose     : Validates the complete platform startup sequence.
 * =============================================================================
 */

import { configurationRegistry } from "../../configuration";
import { runtimeRegistry } from "../../runtime";
import { kernelRegistry } from "../../kernel";

export function validatePlatformStartup(): void {

    console.group("[COREI] Startup Validation");

    console.info(
        "Configuration      :",
        configurationRegistry.get().applicationName
            ? "PASS"
            : "FAIL"
    );

    console.info(
        "Runtime Registered :",
        runtimeRegistry.isRegistered()
            ? "PASS"
            : "FAIL"
    );

    console.info(
        "Kernel Registered  :",
        kernelRegistry.isRegistered()
            ? "PASS"
            : "FAIL"
    );

    console.groupEnd();

}
