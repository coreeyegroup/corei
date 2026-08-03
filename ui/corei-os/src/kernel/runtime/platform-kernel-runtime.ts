/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * PART-12
 * BUILD-03
 *
 * FILE:
 * platform-kernel-runtime.ts
 *
 * PURPOSE:
 * Institutional Platform Kernel Runtime.
 *
 * DESCRIPTION:
 * Controls the lifecycle of the COREI Platform Kernel.
 *
 * IMPORTANT
 * ----------
 * This runtime never owns platform implementations.
 * It only orchestrates certified Platform services.
 *
 * OWNERSHIP:
 * Platform Kernel
 *
 ******************************************************************************/

/*=============================================================================
    IMPORTS
=============================================================================*/

import type {

    PlatformKernelContract

} from "../contracts/platform-kernel-contract";

import {

    PLATFORM_KERNEL

} from "../composition/platform-kernel";

/*=============================================================================
    PLATFORM KERNEL RUNTIME
=============================================================================*/

export class PlatformKernelRuntime {

    private readonly kernel: PlatformKernelContract;

    private initialized = false;

    /*=========================================================================
        CONSTRUCTOR
    =========================================================================*/

    constructor(
        kernel: PlatformKernelContract = PLATFORM_KERNEL
    ) {

        this.kernel = kernel;

    }

    /*=========================================================================
        INITIALIZE
    =========================================================================*/

    public initialize(): void {

        if (this.initialized) {

            return;

        }

        /*
         * Future Initialization Sequence
         *
         * Provider Platform
         * Capability Platform
         * Registry Platform
         * Runtime Platform
         * State Platform
         * Event Platform
         * Workspace Platform
         * Service Platform
         * Module Platform
         * Engine Platform
         * Domain Platform
         * Experience Platform
         */

        this.initialized = true;

    }

    /*=========================================================================
        STATUS
    =========================================================================*/

    public isInitialized(): boolean {

        return this.initialized;

    }

    /*=========================================================================
        KERNEL ACCESS
    =========================================================================*/

    public getKernel(): PlatformKernelContract {

        return this.kernel;

    }

}
