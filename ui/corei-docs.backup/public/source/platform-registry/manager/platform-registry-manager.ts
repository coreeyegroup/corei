/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 01
 *
 * File        : platform-registry-manager.ts
 * Purpose     : Platform Registry Manager
 * =============================================================================
 */

import {

    PlatformRegistryRegistry,

    registerPlatformRegistry

} from "../registry";

import type {

    PlatformRegistry

} from "../models";

export class PlatformRegistryManager {

    register(
        platformRegistry: PlatformRegistry
    ): void {

        registerPlatformRegistry(
            platformRegistry
        );

    }

    getAll():
    readonly PlatformRegistry[] {

        return PlatformRegistryRegistry;

    }

}
