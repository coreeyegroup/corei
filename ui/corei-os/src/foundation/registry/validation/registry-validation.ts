/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 01.07
 *
 * File        : registry-validation.ts
 * Purpose     : Registry Framework Validation.
 * =============================================================================
 */

import {

    RegistryManager

} from "../manager";

import {

    logRegistryDiagnostics

} from "../diagnostics";

/**
 * ============================================================================
 * Validates the Registry Framework.
 * ============================================================================
 */
export function validateRegistryFramework(): void {

    const registry =
        new RegistryManager<string>(

            "validation-registry",

            "Validation Registry"

        );

    registry.initialize();

    registry.register(

        "sample",

        "COREI"

    );

    const value =
        registry.get(

            "sample"

        );

    console.group(

        "[COREI] Registry Validation"

    );

    console.info(

        "Initialize : PASS"

    );

    console.info(

        "Register   :",

        value === "COREI"
            ? "PASS"
            : "FAIL"

    );

    console.info(

        "Entries    :",

        registry.list().length

    );

    logRegistryDiagnostics(

        registry

    );

    console.groupEnd();

}
