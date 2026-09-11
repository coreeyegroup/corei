/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-23
 *
 * FILE:
 * shell-instrumentation-contract.ts
 *
 * PURPOSE:
 * Institutional Shell instrumentation contract.
 *
 * DESCRIPTION:
 * Defines the Shell-owned boundary used to translate Shell operational
 * activity into the certified Platform Foundation logging and diagnostics
 * mechanisms.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 * AUTHORITY:
 * - May emit Shell operational log records through Platform Foundation.
 * - May execute and expose Shell instrumentation diagnostics.
 * - Does not own Platform logging infrastructure.
 * - Does not own Platform diagnostics infrastructure.
 * - Does not own telemetry, tracing, metrics, health or event infrastructure.
 *
 ******************************************************************************/

import type {
    DiagnosticContext
} from "../../../foundation/diagnostics";

export interface ShellInstrumentationContract {

    trace(
        message: string
    ): void;

    debug(
        message: string
    ): void;

    info(
        message: string
    ): void;

    warn(
        message: string
    ): void;

    error(
        message: string
    ): void;

    fatal(
        message: string
    ): void;

    executeDiagnostics(): void;

    getDiagnosticContext(): DiagnosticContext;

}
