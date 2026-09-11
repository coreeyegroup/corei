/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * FILE:
 * shell-layout.ts
 *
 * PURPOSE:
 * Institutional Shell Default Layout
 *
 ******************************************************************************/

import type {
    ShellLayoutContract
} from "../contracts/shell-layout-contract";

import {
    TOP_REGION,
    LEFT_REGION,
    CENTER_REGION,
    RIGHT_REGION,
    BOTTOM_REGION,
    STATUS_REGION
} from "./region-layout";

export const DEFAULT_SHELL_LAYOUT: ShellLayoutContract = {

    top: TOP_REGION,

    left: LEFT_REGION,

    center: CENTER_REGION,

    right: RIGHT_REGION,

    bottom: BOTTOM_REGION,

    status: STATUS_REGION

};
