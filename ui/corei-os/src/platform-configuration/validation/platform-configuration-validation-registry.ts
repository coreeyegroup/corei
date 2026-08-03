/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 07
 *
 * File        : platform-configuration-validation-registry.ts
 * Purpose     : Platform Configuration Validation Registry
 * =============================================================================
 */

import type {
    PlatformConfigurationValidator
} from "./platform-configuration-validator";

const registry:
PlatformConfigurationValidator[] = [];

export const PlatformConfigurationValidationRegistry:
readonly PlatformConfigurationValidator[] = registry;

export function registerPlatformConfigurationValidator(
    validator: PlatformConfigurationValidator
): void {

    registry.push(
        validator
    );

}
