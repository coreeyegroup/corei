/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-008
 * File       : dock-layout-contract.ts
 * Purpose    : Dock Layout Contract
 * =============================================================================
 */

export interface DockLayoutContract {

    readonly orientation: "horizontal" | "vertical";

    readonly size: number;

}
