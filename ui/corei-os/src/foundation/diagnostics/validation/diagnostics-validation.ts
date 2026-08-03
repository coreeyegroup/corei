/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 06.07
 *
 * File        : diagnostics-validation.ts
 * Purpose     : Platform Diagnostics Framework Validation.
 * =============================================================================
 */

import {

    DiagnosticsManager

} from "../manager";

import {

    DiagnosticStatus

} from "../state/diagnostic-status";

import {

    reportDiagnostics

} from "../diagnostics";

/**
 * ============================================================================
 * Validates the Platform Diagnostics Framework.
 * ============================================================================
 */
export function validateDiagnosticsFramework(): void {

    const diagnostics =
        new DiagnosticsManager(

            "validation-diagnostics",

            "Validation Diagnostics"

        );

    console.group(

        "[COREI] Platform Diagnostics Validation"

    );

    diagnostics.execute();

    console.info(

        "Execution    :",

        diagnostics.getContext().status ===
        DiagnosticStatus.PASS
            ? "PASS"
            : "FAIL"

    );

    console.info(

        "Context      :",

        diagnostics.getContext().id ===
        "validation-diagnostics"
            ? "PASS"
            : "FAIL"

    );

    reportDiagnostics(

        diagnostics

    );

    console.groupEnd();

}
