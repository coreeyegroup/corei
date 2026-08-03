/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 06
 *
 * File        : platform-bootstrap-execution-manager.ts
 * Purpose     : Platform Bootstrap Execution Manager
 * =============================================================================
 */

import {
    PlatformBootstrapExecutionRegistry,
    registerPlatformBootstrapExecution
} from "./platform-bootstrap-execution-registry";

import type {
    PlatformBootstrapRuntime
} from "./platform-bootstrap-runtime";

export class PlatformBootstrapExecutionManager {

    register(
        runtime: PlatformBootstrapRuntime
    ): void {

        registerPlatformBootstrapExecution(runtime);

    }

    getAll():
    readonly PlatformBootstrapRuntime[] {

        return PlatformBootstrapExecutionRegistry;

    }

}
