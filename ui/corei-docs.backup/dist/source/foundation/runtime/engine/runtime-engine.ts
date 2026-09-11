/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 06.05
 *
 * File        : runtime-engine.ts
 * Purpose     : Authoritative Platform Runtime Engine.
 * =============================================================================
 */

import { RuntimeController } from "../controller/runtime-controller";
import type { RuntimeContext } from "../context/runtime-context";
import { RuntimeState } from "../state/runtime-state";
import { runtimeRegistry } from "../registry/runtime-registry";

import {

    kernelEngine,
    logKernelDiagnostics

} from "../../kernel";

class RuntimeEngine {

    private readonly context: RuntimeContext;

    private readonly controller: RuntimeController;

    constructor() {

        this.context = {

            id: `runtime-${Date.now()}`,

            state: RuntimeState.CREATED,

            startedAt: new Date()

        };

        this.controller =
            new RuntimeController(
                this.context
            );

    }

    /**
     * Starts the Runtime Engine.
     */
    public start(): void {

        runtimeRegistry.register(

            this.controller

        );

        this.controller.start();

        console.info(

            "[COREI] Starting Application Kernel..."

        );

        kernelEngine.start();

        logKernelDiagnostics();

    }

    /**
     * Stops the Runtime Engine.
     */
    public stop(): void {

        console.info(

            "[COREI] Stopping Application Kernel..."

        );

        kernelEngine.stop();

        this.controller.stop();

        runtimeRegistry.clear();

    }

    /**
     * Returns Runtime Controller.
     */
    public getController(): RuntimeController {

        return this.controller;

    }

    /**
     * Returns Runtime Context.
     */
    public getContext(): RuntimeContext {

        return this.context;

    }

}

export const runtimeEngine =

new RuntimeEngine();
