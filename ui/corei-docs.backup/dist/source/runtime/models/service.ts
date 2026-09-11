/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-015
 * File       : service.ts
 * Purpose    : Runtime Service Model
 * =============================================================================
 */

import type {

    ServiceContract

} from "../contracts/service-contract";

export interface ServiceModel extends ServiceContract {

    readonly running: boolean;

}
