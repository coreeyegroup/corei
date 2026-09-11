/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 05.07
 *
 * File        : logging-validation.ts
 * Purpose     : Platform Logging Framework Validation.
 * =============================================================================
 */

import {

    LoggingManager

} from "../manager";

import {

    LogLevel

} from "../state/log-level";

import {

    logLoggingDiagnostics

} from "../diagnostics";

/**
 * ============================================================================
 * Validates the Platform Logging Framework.
 * ============================================================================
 */
export function validateLoggingFramework(): void {

    const logger =
        new LoggingManager(

            "validation-logger",

            "Validation Logger"

        );

    console.group(

        "[COREI] Platform Logging Validation"

    );

    logger.trace(

        "Trace validation."

    );

    console.info(

        "TRACE      :",

        logger.getContext().level ===
        LogLevel.TRACE
            ? "PASS"
            : "FAIL"

    );

    logger.debug(

        "Debug validation."

    );

    console.info(

        "DEBUG      :",

        logger.getContext().level ===
        LogLevel.DEBUG
            ? "PASS"
            : "FAIL"

    );

    logger.info(

        "Info validation."

    );

    console.info(

        "INFO       :",

        logger.getContext().level ===
        LogLevel.INFO
            ? "PASS"
            : "FAIL"

    );

    logger.warn(

        "Warn validation."

    );

    console.info(

        "WARN       :",

        logger.getContext().level ===
        LogLevel.WARN
            ? "PASS"
            : "FAIL"

    );

    logger.error(

        "Error validation."

    );

    console.info(

        "ERROR      :",

        logger.getContext().level ===
        LogLevel.ERROR
            ? "PASS"
            : "FAIL"

    );

    logger.fatal(

        "Fatal validation."

    );

    console.info(

        "FATAL      :",

        logger.getContext().level ===
        LogLevel.FATAL
            ? "PASS"
            : "FAIL"

    );

    logLoggingDiagnostics(

        logger

    );

    console.groupEnd();

}
