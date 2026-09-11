/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 16
 * Step        : 07
 *
 * File        : platform-registry-validator.ts
 * Purpose     : Platform Registry Validator
 * =============================================================================
 */

import type {
    PlatformRegistryExecutionContext
} from "../execution";

import type {
    PlatformRegistryValidationResult
} from "./platform-registry-validation-result";

export interface PlatformRegistryValidator {

    validate(
        context: PlatformRegistryExecutionContext
    ): Promise<PlatformRegistryValidationResult>;

}
