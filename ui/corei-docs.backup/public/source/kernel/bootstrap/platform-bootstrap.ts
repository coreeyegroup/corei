/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * PART-12
 * BUILD-05
 *
 * FILE:
 * platform-bootstrap.ts
 *
 * PURPOSE:
 * Institutional Platform Bootstrap.
 *
 * DESCRIPTION:
 * Responsible for bootstrapping the COREI Platform Kernel.
 *
 * IMPORTANT
 * ----------
 * The bootstrap starts the Platform.
 * It does not contain Platform implementations.
 *
 * OWNERSHIP:
 * Platform Kernel
 *
 ******************************************************************************/

/*=============================================================================
    IMPORTS
=============================================================================*/

import {
    PLATFORM_KERNEL
} from "../composition/platform-kernel";

import {
    PlatformKernelRegistry
} from "../registry/platform-kernel-registry";

import {
    PlatformKernelRuntime
} from "../runtime/platform-kernel-runtime";

/*=============================================================================
    PLATFORM BOOTSTRAP
=============================================================================*/

export class PlatformBootstrap {

    private readonly registry: PlatformKernelRegistry;

    private readonly runtime: PlatformKernelRuntime;

    /*=========================================================================
        CONSTRUCTOR
    =========================================================================*/

    constructor() {

        this.registry = new PlatformKernelRegistry();

        this.runtime = new PlatformKernelRuntime(
            PLATFORM_KERNEL
        );

    }

    /*=========================================================================
        BOOTSTRAP
    =========================================================================*/

    public bootstrap(): void {

        const kernel = this.runtime.getKernel();

        this.registry.register(kernel.provider);
        this.registry.register(kernel.capability);
        this.registry.register(kernel.cognitive);
        this.registry.register(kernel.workspace);
        this.registry.register(kernel.experience);
        this.registry.register(kernel.application);
        this.registry.register(kernel.service);
        this.registry.register(kernel.module);
        this.registry.register(kernel.engine);
        this.registry.register(kernel.domain);
        this.registry.register(kernel.runtime);
        this.registry.register(kernel.registry);
        this.registry.register(kernel.state);
        this.registry.register(kernel.event);

        this.runtime.initialize();

    }

    /*=========================================================================
        RUNTIME
    =========================================================================*/

    public getRuntime(): PlatformKernelRuntime {

        return this.runtime;

    }

    /*=========================================================================
        REGISTRY
    =========================================================================*/

    public getRegistry(): PlatformKernelRegistry {

        return this.registry;

    }

}
