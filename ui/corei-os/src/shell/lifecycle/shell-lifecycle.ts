/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * FILE:
 * shell-lifecycle.ts
 *
 * PURPOSE:
 * Institutional Shell Lifecycle
 *
 * DESCRIPTION:
 * Manages the lifecycle of the Institutional Shell by
 * orchestrating the Shell Runtime.
 *
 * IMPORTANT
 * ----------
 * The lifecycle NEVER owns platform logic.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

/*=============================================================================
    IMPORTS
=============================================================================*/

import type { ShellKernelContract } from "../contracts/shell-kernel-contract";

import { ShellRuntime } from "../runtime/shell-runtime";

/*=============================================================================
    SHELL LIFECYCLE
=============================================================================*/

export class ShellLifecycle {

    private readonly runtime: ShellRuntime;

    /*=========================================================================
        CONSTRUCTOR
    =========================================================================*/

    constructor(
        kernel: ShellKernelContract
    ) {

        this.runtime = new ShellRuntime(kernel);

    }

    /*=========================================================================
        INITIALIZE
    =========================================================================*/

    public initialize(): void {

        this.runtime.initialize();

    }

    /*=========================================================================
        DISPOSE
    =========================================================================*/

    public dispose(): void {

        this.runtime.dispose();

    }

    /*=========================================================================
        RUNTIME ACCESS
    =========================================================================*/

    public getRuntime(): ShellRuntime {

        return this.runtime;

    }

}
