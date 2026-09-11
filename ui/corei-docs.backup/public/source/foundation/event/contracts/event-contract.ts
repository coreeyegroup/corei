/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 03.02
 *
 * File        : event-contract.ts
 * Purpose     : Authoritative Platform Event Contract.
 * =============================================================================
 */

import type { EventContext } from "../context/event-context";

/**
 * ============================================================================
 * Institutional Platform Event Contract
 * ============================================================================
 */
export interface EventContract<T> {

    /**
     * Publishes an event payload.
     */
    publish(

        payload: T

    ): void;

    /**
     * Returns the latest event payload.
     */
    get(): T | undefined;

    /**
     * Clears the event payload.
     */
    clear(): void;

    /**
     * Returns the Event Context.
     */
    getContext(): EventContext;

}
