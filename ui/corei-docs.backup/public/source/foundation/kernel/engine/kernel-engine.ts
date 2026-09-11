/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 06.04
 *
 * File        : kernel-engine.ts
 * Purpose     : Authoritative Application Kernel Engine.
 * =============================================================================
 */

import { KernelController } from "../controller/kernel-controller";
import type { KernelContext } from "../context/kernel-context";
import { KernelState } from "../state/kernel-state";
import { kernelRegistry } from "../registry/kernel-registry";

class KernelEngine {

    private readonly context: KernelContext;

    private readonly controller: KernelController;

    constructor() {

        this.context = {

            id: `kernel-${Date.now()}`,

            state: KernelState.CREATED,

            startedAt: new Date()

        };

        this.controller =
            new KernelController(
                this.context
            );

    }

    /**
     * Starts the Application Kernel.
     */
    public start(): void {

        kernelRegistry.register(
            this.controller
        );

        this.controller.start();

    }

    /**
     * Stops the Application Kernel.
     */
    public stop(): void {

        this.controller.stop();

        kernelRegistry.clear();

    }

    /**
     * Returns the Kernel Controller.
     */
    public getController(): KernelController {

        return this.controller;

    }

    /**
     * Returns the Kernel Context.
     */
    public getContext(): KernelContext {

        return this.context;

    }

}

export const kernelEngine =
    new KernelEngine();
