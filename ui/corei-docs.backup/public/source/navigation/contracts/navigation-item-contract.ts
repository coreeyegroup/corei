/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-010
 * File       : navigation-item-contract.ts
 * Purpose    : Navigation Item Contract
 * =============================================================================
 */

export interface NavigationItemContract {

    readonly id: string;

    readonly title: string;

    readonly route: string;

}
