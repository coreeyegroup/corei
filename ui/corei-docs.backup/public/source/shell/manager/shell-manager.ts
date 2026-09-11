/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * FILE:
 * shell-manager.ts
 *
 * PURPOSE:
 * Institutional Shell Manager
 *
 * DESCRIPTION:
 * Coordinates the Institutional Shell by managing the
 * Shell Lifecycle.
 *
 * OWNERSHIP:
 * Institutional Shell
 *
 ******************************************************************************/

/*=============================================================================
    IMPORTS
=============================================================================*/

import type {

    ShellKernelContract

} from "../contracts/shell-kernel-contract";

import {

    ShellLifecycle

} from "../lifecycle/shell-lifecycle";

/*=============================================================================
    SHELL MANAGER
=============================================================================*/

export class ShellManager {

    private readonly lifecycle: ShellLifecycle;

    /*=========================================================================
        CONSTRUCTOR
    =========================================================================*/

    constructor(
        kernel: ShellKernelContract
    ) {

        this.lifecycle = new ShellLifecycle(kernel);

    }

    /*=========================================================================
        INITIALIZE
    =========================================================================*/

    public initialize(): void {

        this.lifecycle.initialize();

    }

    /*=========================================================================
        DISPOSE
    =========================================================================*/

    public dispose(): void {

        this.lifecycle.dispose();

    }

    /*=========================================================================
        LIFECYCLE ACCESS
    =========================================================================*/

    public getLifecycle(): ShellLifecycle {

        return this.lifecycle;

    }

}
