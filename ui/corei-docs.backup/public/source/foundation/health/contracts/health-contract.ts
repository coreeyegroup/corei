/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 07.02
 *
 * File        : health-contract.ts
 * Purpose     : Authoritative Platform Health Contract.
 * =============================================================================
 */

import type { HealthContext } from "../context/health-context";

/**
 * ============================================================================
 * Institutional Platform Health Contract
 * ============================================================================
 */
export interface HealthContract {

    /**
     * Evaluates health.
     */
    evaluate(): void;

    /**
     * Returns health context.
     */
    getContext(): HealthContext;

}
