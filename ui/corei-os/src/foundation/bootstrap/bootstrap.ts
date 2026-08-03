/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01 - Platform Bootstrap
 * Step        : 05.06 - Runtime Validation
 *
 * File        : bootstrap.ts
 * Purpose     : Authoritative Bootstrap Runtime.
 *
 * Responsibility
 * -----------------------------------------------------------------------------
 * - Initialize Platform Configuration
 * - Initialize Platform Services
 * - Initialize Capability Providers
 * - Transfer ownership to Runtime Engine
 * - Complete Bootstrap Lifecycle
 * =============================================================================
 */

import { BootstrapController } from "./controller/bootstrap-controller";
import { BootstrapLifecycle } from "./lifecycle/lifecycle";
import type { BootstrapContext } from "./context/bootstrap-context";

import {
    loadPlatformConfiguration,
    configurationRegistry,
    logConfigurationDiagnostics
} from "../configuration";

import {
    serviceContainer
} from "../services";

import {
    capabilityContainer
} from "../capabilities";

import {
    runtimeEngine,
    logRuntimeDiagnostics
} from "../runtime";

import {

    validatePlatformStartup

} from "./validation/startup-validator";

/**
 * ============================================================================
 * Authoritative Bootstrap Runtime
 * ============================================================================
 */
export class Bootstrap {

    private readonly context: BootstrapContext;

    private readonly controller: BootstrapController;

    constructor() {

        this.context = {

            id: `boot-${Date.now()}`,

            mode: "development",

            lifecycle: BootstrapLifecycle.CREATED,

            startedAt: new Date(),

            version: "0.0.0"

        };

        this.controller =
            new BootstrapController(
                this.context
            );

    }

    /**
     * =========================================================================
     * Starts the COREI Platform.
     * =========================================================================
     */
    public start(): void {

        console.info("[COREI] Starting Platform...");

        /*
         * ---------------------------------------------------------------------
         * Bootstrap Lifecycle
         * ---------------------------------------------------------------------
         */
        this.controller.start();

        /*
         * ---------------------------------------------------------------------
         * Configuration
         * ---------------------------------------------------------------------
         */
        console.info("[COREI] Loading Configuration...");

        loadPlatformConfiguration();

        logConfigurationDiagnostics();

        const configuration =
            configurationRegistry.get();

        this.context.mode =
            configuration.environment;

        this.context.version =
            configuration.applicationVersion;

        /*
         * ---------------------------------------------------------------------
         * Platform Services
         * ---------------------------------------------------------------------
         */
        console.info("[COREI] Initializing Platform Services...");

        serviceContainer.initialize();

        /*
         * ---------------------------------------------------------------------
         * Capability Providers
         * ---------------------------------------------------------------------
         */
        console.info("[COREI] Initializing Capability Providers...");

        capabilityContainer.initialize();

        /*
         * ---------------------------------------------------------------------
         * Runtime Engine
         * ---------------------------------------------------------------------
         */
        console.info("[COREI] Starting Runtime Engine...");

        runtimeEngine.start();

        logRuntimeDiagnostics();

        validatePlatformStartup();

        /*
         * ---------------------------------------------------------------------
         * Bootstrap Complete
         * ---------------------------------------------------------------------
         */
        this.controller.ready();

        this.controller.run();

        console.info("[COREI] Bootstrap Complete.");

    }

    /**
     * =========================================================================
     * Stops the COREI Platform.
     * =========================================================================
     */
    public stop(): void {

        console.info("[COREI] Stopping Runtime Engine...");

        runtimeEngine.stop();

        console.info("[COREI] Stopping Capability Providers...");

        capabilityContainer.dispose();

        console.info("[COREI] Stopping Platform Services...");

        serviceContainer.dispose();

        this.controller.stop();

        console.info("[COREI] Platform Stopped.");

    }

    /**
     * =========================================================================
     * Returns Bootstrap Context.
     * =========================================================================
     */
    public getContext(): BootstrapContext {

        return this.controller.getContext();

    }

}

/**
 * ============================================================================
 * Authoritative Bootstrap Instance
 * ============================================================================
 */
export const bootstrap =
    new Bootstrap();
