/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-23
 *
 * FILE:
 * shell-instrumentation-runtime.ts
 *
 * PURPOSE:
 * Institutional Shell instrumentation runtime.
 *
 * DESCRIPTION:
 * Provides the single Shell-owned instrumentation boundary over the
 * certified Platform Foundation logging and diagnostics frameworks.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 * BOUNDARY:
 * Shell owns instrumentation translation only.
 * Platform Foundation retains logging and diagnostics implementation
 * ownership.
 *
 ******************************************************************************/

import {
    LoggingManager
} from "../../../foundation/logging";

import {
    DiagnosticsManager,
    type DiagnosticContext
} from "../../../foundation/diagnostics";

import type {
    ShellInstrumentationContract
} from "../contracts";

class ShellInstrumentationRuntime
implements ShellInstrumentationContract {

    private readonly logger =
        new LoggingManager(
            "shell-instrumentation",
            "InstitutionalShell"
        );

    private readonly diagnostics =
        new DiagnosticsManager(
            "shell-instrumentation-diagnostics",
            "InstitutionalShell"
        );

    public trace(
        message: string
    ): void {

        this.logger.trace(
            message
        );

    }

    public debug(
        message: string
    ): void {

        this.logger.debug(
            message
        );

    }

    public info(
        message: string
    ): void {

        this.logger.info(
            message
        );

    }

    public warn(
        message: string
    ): void {

        this.logger.warn(
            message
        );

    }

    public error(
        message: string
    ): void {

        this.logger.error(
            message
        );

    }

    public fatal(
        message: string
    ): void {

        this.logger.fatal(
            message
        );

    }

    public executeDiagnostics(): void {

        this.diagnostics.execute();

    }

    public getDiagnosticContext(): DiagnosticContext {

        return this.diagnostics
            .getContext();

    }

}

export const shellInstrumentationRuntime =
    new ShellInstrumentationRuntime();
