/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-011
 * File       : command-group.ts
 * Purpose    : Command Group Model
 * =============================================================================
 */

import type {

    CommandGroupContract

} from "../contracts/command-group-contract";

export interface CommandGroupModel extends CommandGroupContract {

    readonly visible: boolean;

}
