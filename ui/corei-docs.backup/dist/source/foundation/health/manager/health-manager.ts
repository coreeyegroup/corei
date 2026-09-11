/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 07.04
 *
 * File        : health-manager.ts
 * Purpose     : Generic Platform Health Manager.
 * =============================================================================
 */

import type {

    HealthContract

} from "../contracts/health-contract";

import type {

    HealthContext

} from "../context/health-context";

import {

    HealthStatus

} from "../state/health-status";

/**
 * ============================================================================
 * Platform Health Manager
 * ============================================================================
 */
export class HealthManager
implements HealthContract {

    private readonly context: HealthContext;

    constructor(

        id: string,

        source: string

    ) {

        this.context = {

            id,

            source,

            status: HealthStatus.UNKNOWN,

            evaluatedAt: new Date()

        };

    }

    /**
     * Evaluates health.
     */
    public evaluate(): void {

        this.context.status =
            HealthStatus.HEALTHY;

        this.context.evaluatedAt =
            new Date();

    }

    /**
     * Returns the Health Context.
     */
    public getContext(): HealthContext {

        return this.context;

    }

}
