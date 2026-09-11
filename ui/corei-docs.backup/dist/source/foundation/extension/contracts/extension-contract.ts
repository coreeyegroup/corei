/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 04.02
 *
 * File        : extension-contract.ts
 * Purpose     : Authoritative Platform Extension Contract.
 * =============================================================================
 */

import type { ExtensionContext } from "../context/extension-context";

/**
 * ============================================================================
 * Institutional Platform Extension Contract
 * ============================================================================
 */
export interface ExtensionContract {

    /**
     * Loads the extension.
     */
    load(): void;

    /**
     * Initializes the extension.
     */
    initialize(): void;

    /**
     * Activates the extension.
     */
    activate(): void;

    /**
     * Deactivates the extension.
     */
    deactivate(): void;

    /**
     * Unloads the extension.
     */
    unload(): void;

    /**
     * Returns the extension execution context.
     */
    getContext(): ExtensionContext;

}
