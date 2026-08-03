/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 02.02
 *
 * File        : state-contract.ts
 * Purpose     : Authoritative Platform State Contract.
 * =============================================================================
 */

import type { StateContext } from "../context/state-context";

/**
 * ============================================================================
 * Institutional Platform State Contract
 * ============================================================================
 */
export interface StateContract<T> {

    /**
     * Initializes the state.
     */
    initialize(): void;

    /**
     * Returns the current value.
     */
    get(): T;

    /**
     * Replaces the current value.
     */
    set(

        value: T

    ): void;

    /**
     * Resets the state.
     */
    reset(): void;

    /**
     * Returns the execution context.
     */
    getContext(): StateContext;

}
