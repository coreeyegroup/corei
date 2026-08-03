/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 07
 *
 * File        : platform-registry-validation-registry.ts
 * Purpose     : Platform Registry Validation Registry
 * =============================================================================
 */

import type {
    PlatformRegistryValidator
} from "./platform-registry-validator";

const registry:
PlatformRegistryValidator[] = [];

export const PlatformRegistryValidationRegistry:
readonly PlatformRegistryValidator[] = registry;

export function registerPlatformRegistryValidator(
    validator: PlatformRegistryValidator
): void {

    registry.push(
        validator
    );

}
