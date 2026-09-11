/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 06.01
 *
 * File        : diagnostic-context.ts
 * Purpose     : Platform Diagnostic Context.
 * =============================================================================
 */

import type { DiagnosticStatus } from "../state/diagnostic-status";

export interface DiagnosticContext {

    id: string;

    source: string;

    status: DiagnosticStatus;

    executedAt: Date;

}
