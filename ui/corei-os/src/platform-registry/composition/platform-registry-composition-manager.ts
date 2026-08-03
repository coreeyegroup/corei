/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 04
 *
 * File        : platform-registry-composition-manager.ts
 * Purpose     : Platform Registry Composition Manager
 * =============================================================================
 */

import {

    PlatformRegistryCompositionRegistry,

    registerPlatformRegistryComposition

} from "./platform-registry-composition-registry";

import type {

    PlatformRegistryComposition

} from "./platform-registry-composition";

export class PlatformRegistryCompositionManager {

    register(
        composition: PlatformRegistryComposition
    ): void {

        registerPlatformRegistryComposition(
            composition
        );

    }

    getAll():
    readonly PlatformRegistryComposition[] {

        return PlatformRegistryCompositionRegistry;

    }

}
