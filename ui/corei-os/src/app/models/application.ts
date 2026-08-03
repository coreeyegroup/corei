/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-01
 * Build Unit : BU-001
 * File       : application.ts
 * Purpose    : Application Model
 * =============================================================================
 */

import type {

    ApplicationContract

} from "../contracts/application-contract";

export interface ApplicationModel extends ApplicationContract {

    readonly initialized: boolean;

}
