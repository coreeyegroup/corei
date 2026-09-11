/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 01
 *
 * File        : platform-bootstrap-registry.ts
 * Purpose     : Platform Bootstrap Registry
 * =============================================================================
 */

import type {
    PlatformBootstrapModel
} from "../models/platform-bootstrap-model";

const registry:
PlatformBootstrapModel[] = [];

export const PlatformBootstrapRegistry:
readonly PlatformBootstrapModel[] = registry;

export function registerPlatformBootstrap(
    bootstrap: PlatformBootstrapModel
): void {

    registry.push(
        bootstrap
    );

}
