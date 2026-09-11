/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-01
 * Build Unit : BU-002
 * File       : provider.ts
 * Purpose    : Provider Model
 * =============================================================================
 */

import type {

    ProviderContract

} from "../contracts/provider-contract";

export interface ProviderModel extends ProviderContract {

    readonly enabled: boolean;

}
