/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 07.01
 *
 * File        : health-context.ts
 * Purpose     : Platform Health Context.
 * =============================================================================
 */

import type { HealthStatus } from "../state/health-status";

export interface HealthContext {

    id: string;

    source: string;

    status: HealthStatus;

    evaluatedAt: Date;

}
