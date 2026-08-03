/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-010
 * File       : navigation-group.ts
 * Purpose    : Navigation Group Model
 * =============================================================================
 */

import type {

    NavigationGroupContract

} from "../contracts/navigation-group-contract";

export interface NavigationGroupModel extends NavigationGroupContract {

    readonly visible: boolean;

}
