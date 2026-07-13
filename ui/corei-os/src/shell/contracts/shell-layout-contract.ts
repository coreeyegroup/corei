/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * FILE:
 * shell-layout-contract.ts
 *
 ******************************************************************************/

import type { ShellRegionContract } from "./shell-region-contract";

export interface ShellLayoutContract {

    readonly top: ShellRegionContract;

    readonly left: ShellRegionContract;

    readonly center: ShellRegionContract;

    readonly right: ShellRegionContract;

    readonly bottom: ShellRegionContract;

    readonly status: ShellRegionContract;

}
