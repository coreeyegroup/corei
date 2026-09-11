/******************************************************************************
 *
 * COREI OPERATING SYSTEM
 *
 * STAGE-25
 * PHASE-17
 * STEP-01
 *
 * FILE:
 * shell-region-contract.ts
 *
 ******************************************************************************/

export type ShellRegionPosition =
    | "top"
    | "left"
    | "center"
    | "right"
    | "bottom"
    | "status";

export interface ShellRegionContract {

    readonly id: string;

    readonly position: ShellRegionPosition;

    readonly title: string;

    readonly name: string;

    readonly visible: boolean;

    readonly enabled: boolean;

    readonly resizable: boolean;

}

export type ShellRegionDescriptor = ShellRegionContract;
