/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 06.03
 *
 * File        : kernel-registry.ts
 * Purpose     : Authoritative Application Kernel Registry.
 * =============================================================================
 */

import type { KernelController } from "../controller/kernel-controller";

class KernelRegistry {

    private kernel: KernelController | null = null;

    /**
     * Registers the Application Kernel.
     */
    public register(
        kernel: KernelController
    ): void {

        this.kernel = kernel;

    }

    /**
     * Returns the active Application Kernel.
     */
    public get(): KernelController {

        if (!this.kernel) {

            throw new Error(
                "Application Kernel has not been registered."
            );

        }

        return this.kernel;

    }

    /**
     * Returns whether the Kernel has been registered.
     */
    public isRegistered(): boolean {

        return this.kernel !== null;

    }

    /**
     * Clears the registry.
     */
    public clear(): void {

        this.kernel = null;

    }

}

export const kernelRegistry =
    new KernelRegistry();
