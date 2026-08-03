/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 05.02
 *
 * File        : runtime-controller.ts
 * Purpose     : Authoritative Platform Runtime Controller.
 * =============================================================================
 */

import type { RuntimeContext } from "../context/runtime-context";
import { RuntimeState } from "../state/runtime-state";

export class RuntimeController {

    constructor(
        private readonly context: RuntimeContext
    ) {}

    /**
     * Starts the platform runtime.
     */
    public start(): void {

        this.context.state = RuntimeState.STARTING;

        this.context.state = RuntimeState.RUNNING;

    }

    /**
     * Stops the platform runtime.
     */
    public stop(): void {

        this.context.state = RuntimeState.STOPPING;

        this.context.state = RuntimeState.STOPPED;

    }

    /**
     * Marks the runtime as failed.
     */
    public fail(): void {

        this.context.state = RuntimeState.FAILED;

    }

    /**
     * Returns the current runtime context.
     */
    public getContext(): RuntimeContext {

        return this.context;

    }

}
