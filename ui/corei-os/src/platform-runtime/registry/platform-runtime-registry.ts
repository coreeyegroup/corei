/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 01
 *
 * File        : platform-runtime-registry.ts
 * Purpose     : Platform Runtime Registry
 * =============================================================================
 */

import type {
    PlatformRuntimeModel
} from "../models/platform-runtime-model";

const registry:
PlatformRuntimeModel[] = [];

export const PlatformRuntimeRegistry:
readonly PlatformRuntimeModel[] = registry;

export function registerPlatformRuntime(
    runtime: PlatformRuntimeModel
): void {

    registry.push(runtime);

}
