/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-011
 * File       : command-context.ts
 * Purpose    : Command Context Runtime Model
 * =============================================================================
 */

import type {

    CommandContextContract

} from "../contracts/command-context-contract";

export interface CommandContextModel extends CommandContextContract {

    readonly active: boolean;

}
