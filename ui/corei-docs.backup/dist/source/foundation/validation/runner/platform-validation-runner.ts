/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 08.02
 *
 * File        : platform-validation-runner.ts
 * Purpose     : Platform Foundation Validation Runner.
 * =============================================================================
 */

import {

    validatePlatformFoundation

} from "../platform-foundation-validator";

/**
 * ============================================================================
 * Platform Validation Runner
 * ============================================================================
 */
export function runPlatformValidation(): void {

    console.group(

        "[COREI] Platform Validation Runner"

    );

    console.info(

        "Validation Started"

    );

    validatePlatformFoundation();

    console.info(

        "Validation Completed"

    );

    console.groupEnd();

}
