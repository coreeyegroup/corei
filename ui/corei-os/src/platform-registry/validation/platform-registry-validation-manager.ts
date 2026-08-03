/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 07
 *
 * File        : platform-registry-validation-manager.ts
 * Purpose     : Platform Registry Validation Manager
 * =============================================================================
 */

import {

    PlatformRegistryValidationRegistry,

    registerPlatformRegistryValidator

} from "./platform-registry-validation-registry";

import type {

    PlatformRegistryValidator

} from "./platform-registry-validator";

export class PlatformRegistryValidationManager {

    register(
        validator: PlatformRegistryValidator
    ): void {

        registerPlatformRegistryValidator(
            validator
        );

    }

    getAll():
    readonly PlatformRegistryValidator[] {

        return PlatformRegistryValidationRegistry;

    }

}
