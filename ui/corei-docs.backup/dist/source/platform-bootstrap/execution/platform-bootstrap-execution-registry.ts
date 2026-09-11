/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 06
 *
 * File        : platform-bootstrap-execution-registry.ts
 * Purpose     : Platform Bootstrap Execution Registry
 * =============================================================================
 */

import type {
    PlatformBootstrapRuntime
} from "./platform-bootstrap-runtime";

const registry:
PlatformBootstrapRuntime[] = [];

export const PlatformBootstrapExecutionRegistry:
readonly PlatformBootstrapRuntime[] = registry;

export function registerPlatformBootstrapExecution(
    runtime: PlatformBootstrapRuntime
): void {

    registry.push(runtime);

}
