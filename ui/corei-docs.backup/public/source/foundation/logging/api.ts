/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 05.06
 *
 * File        : api.ts
 * Purpose     : Public Platform Logging Framework API.
 * =============================================================================
 */

export {

    LoggingManager

} from "./manager";

export type {

    LoggingContract

} from "./contracts/logging-contract";

export type {

    LogContext

} from "./context/log-context";

export type {

    LoggingDescriptor

} from "./model";

export {

    LogLevel

} from "./state/log-level";

export {

    logLoggingDiagnostics

} from "./diagnostics";
