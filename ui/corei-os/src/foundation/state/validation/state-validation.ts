/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 02.07
 *
 * File        : state-validation.ts
 * Purpose     : Platform State Framework Validation.
 * =============================================================================
 */

import {

    StateManager

} from "../manager";

import {

    logStateDiagnostics

} from "../diagnostics";

/**
 * ============================================================================
 * Validates the Platform State Framework.
 * ============================================================================
 */
export function validateStateFramework(): void {

    const state =
        new StateManager<string>(

            "validation-state",

            "Validation State",

            "INITIAL"

        );

    state.initialize();

    state.set(

        "COREI"

    );

    console.group(

        "[COREI] Platform State Validation"

    );

    console.info(

        "Initialize : PASS"

    );

    console.info(

        "Current    :",

        state.get() === "COREI"
            ? "PASS"
            : "FAIL"

    );

    state.reset();

    console.info(

        "Reset      :",

        state.get() === "INITIAL"
            ? "PASS"
            : "FAIL"

    );

    logStateDiagnostics(

        state

    );

    console.groupEnd();

}
