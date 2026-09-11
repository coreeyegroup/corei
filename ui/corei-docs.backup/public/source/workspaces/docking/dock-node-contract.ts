/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 06
 * Step        : 07
 *
 * File        : dock-node-contract.ts
 * Purpose     : Dock Node Contract
 * =============================================================================
 */

import type {
    DockPosition
} from "./dock-position";

export interface DockNodeContract {

    readonly id: string;

    readonly panelId: string;

    readonly position: DockPosition;

    readonly visible: boolean;

}
