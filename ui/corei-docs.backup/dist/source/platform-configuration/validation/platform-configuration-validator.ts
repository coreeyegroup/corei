/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 07
 *
 * File        : platform-configuration-validator.ts
 * Purpose     : Platform Configuration Validator
 * =============================================================================
 */

import type {
    PlatformConfigurationValidationContext
} from "./platform-configuration-validation-context";

import type {
    PlatformConfigurationValidationResult
} from "./platform-configuration-validation-result";

export interface PlatformConfigurationValidator {

    validate(
        context: PlatformConfigurationValidationContext
    ): Promise<PlatformConfigurationValidationResult>;

}
