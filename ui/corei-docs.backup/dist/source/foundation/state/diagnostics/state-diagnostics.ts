/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 02.05
 *
 * File        : state-diagnostics.ts
 * Purpose     : Platform State Diagnostics.
 * =============================================================================
 */

import { StateManager } from "../manager";

/**
 * ============================================================================
 * Platform State Diagnostics
 * ============================================================================
 */
export function logStateDiagnostics<T>(
    state: StateManager<T>
): void {

    const context =
        state.getContext();

    console.group(
        `[COREI] State : ${context.name}`
    );

    console.info(
        "State ID    :",
        context.id
    );

    console.info(
        "Lifecycle   :",
        context.state
    );

    console.info(
        "Current     :",
        state.get()
    );

    console.info(
        "Created At  :",
        context.createdAt
    );

    console.groupEnd();

}
