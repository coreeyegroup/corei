/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-017
 * File       : terminal.ts
 * Purpose    : Terminal Runtime Model
 * =============================================================================
 */

import type {

    TerminalContract

} from "../contracts/terminal-contract";

export interface TerminalModel extends TerminalContract {

    readonly enabled: boolean;

    readonly loaded: boolean;

}
