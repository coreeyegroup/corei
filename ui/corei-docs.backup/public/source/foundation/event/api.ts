/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 03.06
 *
 * File        : api.ts
 * Purpose     : Public Platform Event Framework API.
 * =============================================================================
 */

export {

    EventManager

} from "./manager";

export type {

    EventHandler

} from "./manager";

export type {

    EventContract

} from "./contracts/event-contract";

export type {

    EventContext

} from "./context/event-context";

export type {

    EventDescriptor

} from "./model";

export {

    EventState

} from "./state/event-state";

export {

    logEventDiagnostics

} from "./diagnostics";
