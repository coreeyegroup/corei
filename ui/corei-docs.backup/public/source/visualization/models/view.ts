/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-013
 * File       : view.ts
 * Purpose    : Visualization View Model
 * =============================================================================
 */

import type {

    ViewContract

} from "../contracts/view-contract";

export interface ViewModel extends ViewContract {

    readonly active: boolean;

}
