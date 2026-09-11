/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 01
 *
 * File        : platform-registry-registry.ts
 * Purpose     : Platform Registry Repository
 * =============================================================================
 */

import type {
    PlatformRegistry
} from "../models";

const registry:
PlatformRegistry[] = [];

export const PlatformRegistryRegistry:
readonly PlatformRegistry[] = registry;

export function registerPlatformRegistry(
    platformRegistry: PlatformRegistry
): void {

    registry.push(
        platformRegistry
    );

}
