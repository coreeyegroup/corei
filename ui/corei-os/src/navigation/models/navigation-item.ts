/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-010
 * File       : navigation-item.ts
 * Purpose    : Navigation Item Model
 * =============================================================================
 */

import type {

    NavigationItemContract

} from "../contracts/navigation-item-contract";

export interface NavigationItemModel extends NavigationItemContract {

    readonly visible: boolean;

    readonly enabled: boolean;

}
