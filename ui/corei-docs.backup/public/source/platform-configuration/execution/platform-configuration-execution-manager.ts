/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 06
 *
 * File        : platform-configuration-execution-manager.ts
 * Purpose     : Platform Configuration Execution Manager
 * =============================================================================
 */

import {
    PlatformConfigurationExecutionRegistry,
    registerPlatformConfigurationRuntime
} from "./platform-configuration-execution-registry";

import type {
    PlatformConfigurationRuntime
} from "./platform-configuration-runtime";

export class PlatformConfigurationExecutionManager {

    register(
        runtime: PlatformConfigurationRuntime
    ): void {

        registerPlatformConfigurationRuntime(
            runtime
        );

    }

    getAll():
    readonly PlatformConfigurationRuntime[] {

        return PlatformConfigurationExecutionRegistry;

    }

}
