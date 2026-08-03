/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 08.01
 *
 * File        : platform-foundation-validator.ts
 * Purpose     : Integrated Platform Foundation Validator.
 * =============================================================================
 */

import {

    validateRegistryFramework

} from "../registry";

import {

    validateStateFramework

} from "../state";

import {

    validateEventFramework

} from "../event";

import {

    validateExtensionFramework

} from "../extension";

import {

    validateLoggingFramework

} from "../logging";

import {

    validateDiagnosticsFramework

} from "../diagnostics";

import {

    validateHealthFramework

} from "../health";

/**
 * ============================================================================
 * Platform Foundation Validator
 * ============================================================================
 */
export function validatePlatformFoundation(): void {

    console.group(

        "[COREI] Platform Foundation Validation"

    );

    validateRegistryFramework();

    validateStateFramework();

    validateEventFramework();

    validateExtensionFramework();

    validateLoggingFramework();

    validateDiagnosticsFramework();

    validateHealthFramework();

    console.groupEnd();

}
