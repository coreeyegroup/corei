/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-015
 * File       : runtime.ts
 * Purpose    : Runtime Model
 * =============================================================================
 */

import type {

    RuntimeContract

} from "../contracts/runtime-contract";

export interface RuntimeModel extends RuntimeContract {

    readonly initialized: boolean;

    readonly healthy: boolean;

}
