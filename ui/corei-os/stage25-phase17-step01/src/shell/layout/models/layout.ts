/**
 * =============================================================================
 * COREI Operating System
 * Stage-25
 * Phase-02
 * Build Unit : BU-002
 * File       : layout.ts
 * =============================================================================
 */

import type {

    LayoutContract

} from "../contracts/layout-contract";

export interface LayoutModel extends LayoutContract {

    readonly initialized: boolean;

}
