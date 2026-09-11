/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 07
 *
 * File        : default-platform-registry-validator.ts
 * Purpose     : Default Platform Registry Validator
 * =============================================================================
 */

import type {
    PlatformRegistryExecutionContext
} from "../execution";

import type {
    PlatformRegistryValidationResult
} from "./platform-registry-validation-result";

import type {
    PlatformRegistryValidator
} from "./platform-registry-validator";

export class DefaultPlatformRegistryValidator
implements PlatformRegistryValidator {

    async validate(
        _context: PlatformRegistryExecutionContext
    ): Promise<PlatformRegistryValidationResult> {

        return {

            valid: true

        };

    }

}
