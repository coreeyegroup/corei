/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 02
 * Step        : 07.06
 *
 * File        : api.ts
 * Purpose     : Public Platform Health Framework API.
 * =============================================================================
 */

export {

    HealthManager

} from "./manager";

export {

    reportHealth

} from "./health";

export type {

    HealthContract

} from "./contracts/health-contract";

export type {

    HealthContext

} from "./context/health-context";

export type {

    HealthDescriptor

} from "./model";

export {

    HealthStatus

} from "./state/health-status";
