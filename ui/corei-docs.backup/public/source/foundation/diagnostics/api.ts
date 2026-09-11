/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 06.06
 *
 * File        : api.ts
 * Purpose     : Public Platform Diagnostics Framework API.
 * =============================================================================
 */

export {

    DiagnosticsManager

} from "./manager";

export {

    reportDiagnostics

} from "./diagnostics";

export type {

    DiagnosticsContract

} from "./contracts/diagnostics-contract";

export type {

    DiagnosticContext

} from "./context/diagnostic-context";

export type {

    DiagnosticsDescriptor

} from "./model";

export {

    DiagnosticStatus

} from "./state/diagnostic-status";
