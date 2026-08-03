/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 01.02
 *
 * File        : registry-contract.ts
 * Purpose     : Authoritative Registry Contract.
 * =============================================================================
 */

import type { RegistryContext } from "../context/registry-context";

/**
 * ============================================================================
 * Institutional Registry Contract
 * ----------------------------------------------------------------------------
 * Every COREI registry shall implement this interface.
 * ============================================================================
 */
export interface RegistryContract<T> {

    /**
     * Initializes the registry.
     */
    initialize(): void;

    /**
     * Registers an item.
     */
    register(

        id: string,

        value: T

    ): void;

    /**
     * Resolves an item.
     */
    get(

        id: string

    ): T | undefined;

    /**
     * Returns all registered items.
     */
    list(): T[];

    /**
     * Removes an item.
     */
    unregister(

        id: string

    ): void;

    /**
     * Clears the registry.
     */
    clear(): void;

    /**
     * Returns the Registry Context.
     */
    getContext(): RegistryContext;

}
