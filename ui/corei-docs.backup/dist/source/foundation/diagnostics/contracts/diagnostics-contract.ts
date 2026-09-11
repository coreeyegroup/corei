/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 06.02
 *
 * File        : diagnostics-contract.ts
 * Purpose     : Authoritative Platform Diagnostics Contract.
 * =============================================================================
 */

import type { DiagnosticContext } from "../context/diagnostic-context";

/**
 * ============================================================================
 * Institutional Platform Diagnostics Contract
 * ============================================================================
 */
export interface DiagnosticsContract {

    /**
     * Executes diagnostics.
     */
    execute(): void;

    /**
     * Returns the diagnostics execution context.
     */
    getContext(): DiagnosticContext;

}
