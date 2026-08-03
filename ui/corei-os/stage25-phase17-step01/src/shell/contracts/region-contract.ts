/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-005
 * File       : region-contract.ts
 * Purpose    : Institutional Shell Region Contract
 * =============================================================================
 */

export type ShellRegionId =
    | "top"
    | "left"
    | "center"
    | "right"
    | "bottom";

export interface ShellRegion {

    readonly id: ShellRegionId;

    readonly visible: boolean;

    readonly resizable: boolean;

    readonly collapsible: boolean;

    readonly size: number;

}
