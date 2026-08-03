/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 07
 *
 * File        : default-platform-bootstrap-validation.ts
 * Purpose     : Default Platform Bootstrap Validation
 * =============================================================================
 */

import {
    PlatformBootstrapValidationResult
} from "./platform-bootstrap-validation-result";

import type {
    PlatformBootstrapExecutionContext
} from "../execution";

import type {
    PlatformBootstrapValidator
} from "./platform-bootstrap-validator";

export class DefaultPlatformBootstrapValidation
implements PlatformBootstrapValidator {

    async validate(
        _context: PlatformBootstrapExecutionContext
    ): Promise<PlatformBootstrapValidationResult> {

        return PlatformBootstrapValidationResult.PASS;

    }

}
