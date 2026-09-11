/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 06
 * Step        : 05
 *
 * File        : panel-manager.ts
 * Purpose     : Panel Manager
 * =============================================================================
 */

import type {
    PanelModel
} from "./panel";

import {
    PanelRegistry
} from "./panel-registry";

export class PanelManager {

    public register(
        panel: PanelModel
    ): void {

        (
            PanelRegistry as PanelModel[]
        ).push(panel);

    }

    public getAll():
    readonly PanelModel[] {

        return PanelRegistry;

    }

}
