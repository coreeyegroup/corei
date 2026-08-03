/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 06
 *
 * File        : platform-configuration-execution-registry.ts
 * Purpose     : Platform Configuration Execution Registry
 * =============================================================================
 */

import type {
    PlatformConfigurationRuntime
} from "./platform-configuration-runtime";

const registry:
PlatformConfigurationRuntime[] = [];

export const PlatformConfigurationExecutionRegistry:
readonly PlatformConfigurationRuntime[] = registry;

export function registerPlatformConfigurationRuntime(
    runtime: PlatformConfigurationRuntime
): void {

    registry.push(
        runtime
    );

}
