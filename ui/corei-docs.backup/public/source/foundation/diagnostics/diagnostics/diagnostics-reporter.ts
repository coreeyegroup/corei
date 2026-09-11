/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 06.05
 *
 * File        : diagnostics-reporter.ts
 * Purpose     : Platform Diagnostics Reporter.
 * =============================================================================
 */

import {

    DiagnosticsManager

} from "../manager";

/**
 * ============================================================================
 * Platform Diagnostics Reporter
 * ============================================================================
 */
export function reportDiagnostics(
    diagnostics: DiagnosticsManager
): void {

    const context =
        diagnostics.getContext();

    console.group(
        `[COREI] Diagnostics : ${context.source}`
    );

    console.info(
        "Diagnostics ID :",
        context.id
    );

    console.info(
        "Source         :",
        context.source
    );

    console.info(
        "Status         :",
        context.status
    );

    console.info(
        "Executed At    :",
        context.executedAt
    );

    console.groupEnd();

}
