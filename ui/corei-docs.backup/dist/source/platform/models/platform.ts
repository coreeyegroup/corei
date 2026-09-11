/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-016
 * File       : platform.ts
 * Purpose    : Platform Runtime Model
 * =============================================================================
 */

import type {

    PlatformContract

} from "../contracts/platform-contract";

export interface PlatformModel extends PlatformContract {

    readonly initialized: boolean;

    readonly running: boolean;

}
