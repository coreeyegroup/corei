/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 04
 *
 * File        : platform-configuration-composition-manager.ts
 * Purpose     : Platform Configuration Composition Manager
 * =============================================================================
 */

import {

    PlatformConfigurationCompositionRegistry,

    registerPlatformConfigurationComposition

} from "./platform-configuration-composition-registry";

import type {

    PlatformConfigurationComposition

} from "./platform-configuration-composition";

export class PlatformConfigurationCompositionManager {

    register(
        composition: PlatformConfigurationComposition
    ): void {

        registerPlatformConfigurationComposition(
            composition
        );

    }

    getAll():
    readonly PlatformConfigurationComposition[] {

        return PlatformConfigurationCompositionRegistry;

    }

}
