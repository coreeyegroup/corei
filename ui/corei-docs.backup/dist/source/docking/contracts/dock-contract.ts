/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-008
 * File       : dock-contract.ts
 * Purpose    : Institutional Dock Contract
 * =============================================================================
 */

export type DockId = string;

export interface DockContract {

    readonly id: DockId;

    readonly title: string;

    readonly active: boolean;

}
