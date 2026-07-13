/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-21
 *
 * FILE:
 * shell-runtime.ts
 *
 * PURPOSE:
 * Institutional Shell Runtime
 *
 * DESCRIPTION:
 * Runtime orchestrator responsible for bootstrapping the
 * Institutional Shell, establishing the Platform Kernel
 * connection and owning Shell interaction runtime lifecycle.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

import {
    ShellKernel
} from "./shell-kernel";

import {
    shellKeyboardRuntime
} from "../keyboard/shell-keyboard-runtime";

import {
    shellPersistenceRuntime
} from "../persistence/runtime";

import type {
    ShellKernelContract
} from "../contracts/shell-kernel-contract";

import {
    shellInstrumentationRuntime
} from "../instrumentation";

export class ShellRuntime {

    private readonly kernel:
        ShellKernel;

    private initialized =
        false;

    constructor(
        kernel: ShellKernelContract
    ) {

        this.kernel =
            new ShellKernel(
                kernel
            );

    }

    public initialize(): void {

        shellInstrumentationRuntime.debug(
            "Shell runtime initialization requested"
        );

        if (
            this.initialized
        ) {

            shellInstrumentationRuntime.debug(
                "Shell runtime initialization ignored: already initialized"
            );

            return;

        }

        shellPersistenceRuntime
            .restore();

        shellKeyboardRuntime
            .initialize();

        this.initialized =
            true;

        shellInstrumentationRuntime.executeDiagnostics();

        shellInstrumentationRuntime.info(
            "Shell runtime initialization completed"
        );
}

    public dispose(): void {

        shellInstrumentationRuntime.debug(
            "Shell runtime disposal requested"
        );

        if (
            !this.initialized
        ) {

            shellInstrumentationRuntime.debug(
                "Shell runtime disposal ignored: runtime not initialized"
            );

            return;

        }

        shellPersistenceRuntime
            .save();

        shellKeyboardRuntime
            .dispose();

        this.initialized =
            false;

        shellInstrumentationRuntime.info(
            "Shell runtime disposal completed"
        );
}

    public getKernel(): ShellKernel {

        return this.kernel;

    }

    public isInitialized(): boolean {

        return this.initialized;

    }

}
