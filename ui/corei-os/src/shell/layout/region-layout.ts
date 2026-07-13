/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * FILE:
 * region-layout.ts
 *
 * PURPOSE:
 * Institutional Shell Region Registry
 *
 ******************************************************************************/

import type { ShellRegionContract } from "../contracts/shell-region-contract";

function region(
    id: ShellRegionContract["id"],
    position: ShellRegionContract["position"],
    title: string
): ShellRegionContract {

    return {

        id,

        position,

        title,

        name: title,

        visible: true,

        enabled: true,

        resizable: true

    };

}

export const TOP_REGION = region("top","top","Top Ribbon");

export const LEFT_REGION = region("left","left","Navigation");

export const CENTER_REGION = region("center","center","Workspace");

export const RIGHT_REGION = region("right","right","Intelligence");

export const BOTTOM_REGION = region("bottom","bottom","Timeline");

export const STATUS_REGION = region("status","status","Platform Status");
