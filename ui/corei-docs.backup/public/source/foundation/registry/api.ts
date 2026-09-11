/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 01.06
 *
 * File        : api.ts
 * Purpose     : Public Registry Framework API.
 * =============================================================================
 */

export {

    RegistryManager

} from "./manager";

export type {

    RegistryContract

} from "./contracts/registry-contract";

export type {

    RegistryContext

} from "./context/registry-context";

export type {

    RegistryDescriptor

} from "./model";

export {

    RegistryState

} from "./state/registry-state";

export {

    logRegistryDiagnostics

} from "./diagnostics";
