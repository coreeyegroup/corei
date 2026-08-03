/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 07.07
 *
 * File        : health-validation.ts
 * Purpose     : Platform Health Framework Validation.
 * =============================================================================
 */

import {

    HealthManager

} from "../manager";

import {

    HealthStatus

} from "../state/health-status";

import {

    reportHealth

} from "../health";

/**
 * ============================================================================
 * Validates the Platform Health Framework.
 * ============================================================================
 */
export function validateHealthFramework(): void {

    const health =
        new HealthManager(

            "validation-health",

            "Validation Health"

        );

    console.group(

        "[COREI] Platform Health Validation"

    );

    health.evaluate();

    console.info(

        "Evaluation   :",

        health.getContext().status ===
        HealthStatus.HEALTHY
            ? "PASS"
            : "FAIL"

    );

    console.info(

        "Context      :",

        health.getContext().id ===
        "validation-health"
            ? "PASS"
            : "FAIL"

    );

    reportHealth(

        health

    );

    console.groupEnd();

}
