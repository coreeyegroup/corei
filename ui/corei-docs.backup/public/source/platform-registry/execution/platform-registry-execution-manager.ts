/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 06
 *
 * File        : platform-registry-execution-manager.ts
 * Purpose     : Platform Registry Execution Manager
 * =============================================================================
 */

import {

    PlatformRegistryExecutionRegistry,

    registerPlatformRegistryRuntime

} from "./platform-registry-execution-registry";

import type {

    PlatformRegistryRuntime

} from "./platform-registry-runtime";

export class PlatformRegistryExecutionManager {

    register(
        runtime: PlatformRegistryRuntime
    ): void {

        registerPlatformRegistryRuntime(
            runtime
        );

    }

    getAll():
    readonly PlatformRegistryRuntime[] {

        return PlatformRegistryExecutionRegistry;

    }

}
