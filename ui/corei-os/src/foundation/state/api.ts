/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 02.06
 *
 * File        : api.ts
 * Purpose     : Public Platform State Framework API.
 * =============================================================================
 */

export {

    StateManager

} from "./manager";

export type {

    StateContract

} from "./contracts/state-contract";

export type {

    StateContext

} from "./context/state-context";

export type {

    StateDescriptor

} from "./model";

export {

    PlatformState

} from "./state/platform-state";

export {

    logStateDiagnostics

} from "./diagnostics";
