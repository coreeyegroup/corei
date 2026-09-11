/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 06
 *
 * File        : platform-registry-execution-registry.ts
 * Purpose     : Platform Registry Execution Registry
 * =============================================================================
 */

import type {
    PlatformRegistryRuntime
} from "./platform-registry-runtime";

const registry:
PlatformRegistryRuntime[] = [];

export const PlatformRegistryExecutionRegistry:
readonly PlatformRegistryRuntime[] = registry;

export function registerPlatformRegistryRuntime(
    runtime: PlatformRegistryRuntime
): void {

    registry.push(
        runtime
    );

}
