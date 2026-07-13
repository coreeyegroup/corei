/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * FILE:
 * layout.ts
 *
 * PURPOSE:
 * Institutional Shell Layout Model
 *
 * AUTHOR:
 * COREI Architecture
 *
 ******************************************************************************/

import type { ShellLayoutContract } from "../../contracts/shell-layout-contract";

export interface LayoutModel {

    readonly id: string;

    readonly name: string;

    readonly layout: ShellLayoutContract;

    readonly initialized: boolean;

}
