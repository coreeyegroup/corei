/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 05.05
 *
 * File        : logging-diagnostics.ts
 * Purpose     : Platform Logging Diagnostics.
 * =============================================================================
 */

import { LoggingManager } from "../manager";

/**
 * ============================================================================
 * Platform Logging Diagnostics
 * ============================================================================
 */
export function logLoggingDiagnostics(
    logger: LoggingManager
): void {

    const context =
        logger.getContext();

    console.group(
        `[COREI] Logger : ${context.source}`
    );

    console.info(
        "Logger ID  :",
        context.id
    );

    console.info(
        "Source     :",
        context.source
    );

    console.info(
        "Log Level  :",
        context.level
    );

    console.info(
        "Timestamp  :",
        context.timestamp
    );

    console.groupEnd();

}
