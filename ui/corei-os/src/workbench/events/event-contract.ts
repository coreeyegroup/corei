/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-20
 *
 * FILE
 * event-contract.ts
 *
 * PURPOSE
 * Workbench Event Contract
 * ============================================================================
 */

export interface WorkbenchEvent<T = unknown> {

    type: string;

    payload: T;

}