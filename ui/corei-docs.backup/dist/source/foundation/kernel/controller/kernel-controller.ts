/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 06.02
 *
 * File        : kernel-controller.ts
 * Purpose     : Authoritative Application Kernel Controller.
 * =============================================================================
 */

import type { KernelContext } from "../context/kernel-context";
import { KernelState } from "../state/kernel-state";

export class KernelController {

    constructor(
        private readonly context: KernelContext
    ) {}

    /**
     * Starts the Application Kernel.
     */
    public start(): void {

        this.context.state = KernelState.STARTING;

        this.context.state = KernelState.RUNNING;

    }

    /**
     * Stops the Application Kernel.
     */
    public stop(): void {

        this.context.state = KernelState.STOPPING;

        this.context.state = KernelState.STOPPED;

    }

    /**
     * Marks the Kernel as failed.
     */
    public fail(): void {

        this.context.state = KernelState.FAILED;

    }

    /**
     * Returns the Kernel Context.
     */
    public getContext(): KernelContext {

        return this.context;

    }

}
