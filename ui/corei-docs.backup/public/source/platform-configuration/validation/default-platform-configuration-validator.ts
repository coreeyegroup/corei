/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 15
 * Step        : 07
 *
 * File        : default-platform-configuration-validator.ts
 * Purpose     : Default Platform Configuration Validator
 * =============================================================================
 */

import type {
    PlatformConfigurationValidationContext
} from "./platform-configuration-validation-context";

import type {
    PlatformConfigurationValidationResult
} from "./platform-configuration-validation-result";

import type {
    PlatformConfigurationValidator
} from "./platform-configuration-validator";

export class DefaultPlatformConfigurationValidator
implements PlatformConfigurationValidator {

    async validate(
        _context: PlatformConfigurationValidationContext
    ): Promise<PlatformConfigurationValidationResult> {

        return {

            valid: true

        };

    }

}
