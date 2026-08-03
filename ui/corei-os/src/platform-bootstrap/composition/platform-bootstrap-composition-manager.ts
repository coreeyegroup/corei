/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 04
 *
 * File        : platform-bootstrap-composition-manager.ts
 * Purpose     : Platform Bootstrap Composition Manager
 * =============================================================================
 */

import {
    PlatformBootstrapCompositionRegistry,
    registerPlatformBootstrapComposition
} from "./platform-bootstrap-composition-registry";

import type {
    PlatformBootstrapComposition
} from "./platform-bootstrap-composition";

export class PlatformBootstrapCompositionManager {

    register(
        composition: PlatformBootstrapComposition
    ): void {

        registerPlatformBootstrapComposition(
            composition
        );

    }

    getAll():
    readonly PlatformBootstrapComposition[] {

        return PlatformBootstrapCompositionRegistry;

    }

}
