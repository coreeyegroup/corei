/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-11
 *
 * FILE:
 * operational-status-contract.ts
 *
 * PURPOSE:
 * Shell Operational Status Contract
 *
 * DESCRIPTION:
 * Defines the deterministic presentation contract for the Institutional Shell
 * operational status surface.
 *
 * This contract represents Shell integration state only.
 *
 * It does not represent live infrastructure health, service health, broker
 * connectivity, market connectivity, execution readiness, observability
 * telemetry, or production operational certification.
 *
 ******************************************************************************/

export type OperationalStatusState =
    | "connected"
    | "available"
    | "inactive";

export interface OperationalStatusItem {

    readonly id: string;

    readonly label: string;

    readonly state: OperationalStatusState;

}
