/**
 * =============================================================================
 * COREI Operating System
 * Stage-24
 * Build Unit : BU-015
 * File       : event.ts
 * Purpose    : Runtime Event Model
 * =============================================================================
 */

import type {

    EventContract

} from "../contracts/event-contract";

export interface EventModel extends EventContract {

    readonly timestamp: Date;

}
