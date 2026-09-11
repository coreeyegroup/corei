/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 06.04
 *
 * File        : diagnostics-manager.ts
 * Purpose     : Generic Platform Diagnostics Manager.
 * =============================================================================
 */

import type {

    DiagnosticsContract

} from "../contracts/diagnostics-contract";

import type {

    DiagnosticContext

} from "../context/diagnostic-context";

import {

    DiagnosticStatus

} from "../state/diagnostic-status";

/**
 * ============================================================================
 * Platform Diagnostics Manager
 * ============================================================================
 */
export class DiagnosticsManager
implements DiagnosticsContract {

    private readonly context: DiagnosticContext;

    constructor(

        id: string,

        source: string

    ) {

        this.context = {

            id,

            source,

            status: DiagnosticStatus.UNKNOWN,

            executedAt: new Date()

        };

    }

    /**
     * Executes diagnostics.
     */
    public execute(): void {

        this.context.status =
            DiagnosticStatus.PASS;

        this.context.executedAt =
            new Date();

    }

    /**
     * Returns the diagnostics execution context.
     */
    public getContext(): DiagnosticContext {

        return this.context;

    }

}
