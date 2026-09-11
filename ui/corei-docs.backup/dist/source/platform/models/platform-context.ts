/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-016
 * File       : platform-context.ts
 * Purpose    : Platform Context Runtime Model
 * =============================================================================
 */

import type {

    PlatformContextContract

} from "../contracts/platform-context-contract";

export interface PlatformContextModel extends PlatformContextContract {

    readonly active: boolean;

}
