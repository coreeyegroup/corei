/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 14
 * Step        : 07
 *
 * File        : platform-bootstrap-validator.ts
 * Purpose     : Platform Bootstrap Validator
 * =============================================================================
 */

import type {
    PlatformBootstrapExecutionContext
} from "../execution";

import {
    PlatformBootstrapValidationResult
} from "./platform-bootstrap-validation-result";

export interface PlatformBootstrapValidator {

    validate(
        context: PlatformBootstrapExecutionContext
    ): Promise<PlatformBootstrapValidationResult>;

}
