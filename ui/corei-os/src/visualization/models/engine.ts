/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-013
 * File       : engine.ts
 * Purpose    : Visualization Engine Model
 * =============================================================================
 */

import type {

    EngineContract

} from "../contracts/engine-contract";

export interface EngineModel extends EngineContract {

    readonly available: boolean;

}
