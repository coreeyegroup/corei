/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 07
 *
 * File        : platform-bootstrap-validation-registry.ts
 * Purpose     : Platform Bootstrap Validation Registry
 * =============================================================================
 */

import type {
    PlatformBootstrapValidator
} from "./platform-bootstrap-validator";

const registry:
PlatformBootstrapValidator[] = [];

export const PlatformBootstrapValidationRegistry:
readonly PlatformBootstrapValidator[] = registry;

export function registerPlatformBootstrapValidator(
    validator: PlatformBootstrapValidator
): void {

    registry.push(validator);

}
