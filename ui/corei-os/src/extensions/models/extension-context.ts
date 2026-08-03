/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-014
 * File       : extension-context.ts
 * Purpose    : Extension Context Runtime Model
 * =============================================================================
 */

import type {

    ExtensionContextContract

} from "../contracts/extension-context-contract";

export interface ExtensionContextModel extends ExtensionContextContract {

    readonly active: boolean;

}
