/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 07
 *
 * File        : platform-configuration-validation-manager.ts
 * Purpose     : Platform Configuration Validation Manager
 * =============================================================================
 */

import {

    PlatformConfigurationValidationRegistry,

    registerPlatformConfigurationValidator

} from "./platform-configuration-validation-registry";

import type {

    PlatformConfigurationValidator

} from "./platform-configuration-validator";

export class PlatformConfigurationValidationManager {

    register(
        validator: PlatformConfigurationValidator
    ): void {

        registerPlatformConfigurationValidator(
            validator
        );

    }

    getAll():
    readonly PlatformConfigurationValidator[] {

        return PlatformConfigurationValidationRegistry;

    }

}
