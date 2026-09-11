/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-017
 * File       : module.ts
 * Purpose    : SDK Module Model
 * =============================================================================
 */

import type {

    ModuleContract

} from "../contracts/module-contract";

export interface ModuleModel extends ModuleContract {

    readonly enabled: boolean;

}
