/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 04.06
 *
 * File        : api.ts
 * Purpose     : Public Platform Extension Framework API.
 * =============================================================================
 */

export {

    ExtensionManager

} from "./manager";

export type {

    ExtensionContract

} from "./contracts/extension-contract";

export type {

    ExtensionContext

} from "./context/extension-context";

export type {

    ExtensionDescriptor

} from "./model";

export {

    ExtensionState

} from "./state/extension-state";

export {

    logExtensionDiagnostics

} from "./diagnostics";
