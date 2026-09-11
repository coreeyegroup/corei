/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-011
 * File       : command.ts
 * Purpose    : Command Runtime Model
 * =============================================================================
 */

import type {

    CommandContract

} from "../contracts/command-contract";

export interface CommandModel extends CommandContract {

    readonly enabled: boolean;

    readonly visible: boolean;

}
