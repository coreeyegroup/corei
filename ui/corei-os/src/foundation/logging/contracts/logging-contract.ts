/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 05.02
 *
 * File        : logging-contract.ts
 * Purpose     : Authoritative Platform Logging Contract.
 * =============================================================================
 */

import type { LogContext } from "../context/log-context";

/**
 * ============================================================================
 * Institutional Platform Logging Contract
 * ============================================================================
 */
export interface LoggingContract {

    /**
     * Trace message.
     */
    trace(

        message: string

    ): void;

    /**
     * Debug message.
     */
    debug(

        message: string

    ): void;

    /**
     * Information message.
     */
    info(

        message: string

    ): void;

    /**
     * Warning message.
     */
    warn(

        message: string

    ): void;

    /**
     * Error message.
     */
    error(

        message: string

    ): void;

    /**
     * Fatal message.
     */
    fatal(

        message: string

    ): void;

    /**
     * Returns logging context.
     */
    getContext(): LogContext;

}
