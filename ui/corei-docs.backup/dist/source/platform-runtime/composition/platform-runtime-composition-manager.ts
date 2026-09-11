/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 13
 * Step        : 04
 *
 * File        : platform-runtime-composition-manager.ts
 * Purpose     : Platform Runtime Composition Manager
 * =============================================================================
 */

import {
    PlatformRuntimeCompositionRegistry,
    registerPlatformRuntimeComposition
} from "./platform-runtime-composition-registry";

import type {
    PlatformRuntimeComposition
} from "./platform-runtime-composition";

export class PlatformRuntimeCompositionManager {

    register(
        composition: PlatformRuntimeComposition
    ): void {

        registerPlatformRuntimeComposition(
            composition
        );

    }

    getAll():
    readonly PlatformRuntimeComposition[] {

        return PlatformRuntimeCompositionRegistry;

    }

}
