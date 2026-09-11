/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-014
 * File       : extension-point.ts
 * Purpose    : Extension Point Model
 * =============================================================================
 */

import type {

    ExtensionPointContract

} from "../contracts/extension-point-contract";

export interface ExtensionPointModel extends ExtensionPointContract {

    readonly active: boolean;

}
