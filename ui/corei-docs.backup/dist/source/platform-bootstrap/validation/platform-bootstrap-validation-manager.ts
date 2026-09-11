/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 07
 *
 * File        : platform-bootstrap-validation-manager.ts
 * Purpose     : Platform Bootstrap Validation Manager
 * =============================================================================
 */

import {
    PlatformBootstrapValidationRegistry,
    registerPlatformBootstrapValidator
} from "./platform-bootstrap-validation-registry";

import type {
    PlatformBootstrapValidator
} from "./platform-bootstrap-validator";

export class PlatformBootstrapValidationManager {

    register(
        validator: PlatformBootstrapValidator
    ): void {

        registerPlatformBootstrapValidator(
            validator
        );

    }

    getAll():
    readonly PlatformBootstrapValidator[] {

        return PlatformBootstrapValidationRegistry;

    }

}
