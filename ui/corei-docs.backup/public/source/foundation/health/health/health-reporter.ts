/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 07.05
 *
 * File        : health-reporter.ts
 * Purpose     : Platform Health Reporter.
 * =============================================================================
 */

import {

    HealthManager

} from "../manager";

/**
 * ============================================================================
 * Platform Health Reporter
 * ============================================================================
 */
export function reportHealth(
    health: HealthManager
): void {

    const context =
        health.getContext();

    console.group(
        `[COREI] Health : ${context.source}`
    );

    console.info(
        "Health ID    :",
        context.id
    );

    console.info(
        "Source       :",
        context.source
    );

    console.info(
        "Status       :",
        context.status
    );

    console.info(
        "Evaluated At :",
        context.evaluatedAt
    );

    console.groupEnd();

}
