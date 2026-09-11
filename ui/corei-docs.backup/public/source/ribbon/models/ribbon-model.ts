/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-02
 *
 * FILE:
 * ribbon-model.ts
 *
 * PURPOSE:
 * Institutional Top Ribbon Model
 *
 ******************************************************************************/

import type { RibbonContract } from "../contracts/ribbon-contract";

export interface RibbonModel {

    readonly ribbon: RibbonContract;

    readonly initialized: boolean;

}
