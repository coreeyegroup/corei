/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-014
 * File       : extension.ts
 * Purpose    : Extension Runtime Model
 * =============================================================================
 */

import type {

    ExtensionContract

} from "../contracts/extension-contract";

export interface ExtensionModel extends ExtensionContract {

    readonly enabled: boolean;

    readonly loaded: boolean;

}
