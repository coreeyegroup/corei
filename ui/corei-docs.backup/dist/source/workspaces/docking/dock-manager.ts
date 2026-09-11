/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 06
 * Step        : 07
 *
 * File        : dock-manager.ts
 * Purpose     : Dock Manager
 * =============================================================================
 */

import type {
    DockNodeModel
} from "./dock-node";

import {
    DockRegistry
} from "./dock-registry";

export class DockManager {

    public register(
        node: DockNodeModel
    ): void {

        (
            DockRegistry as DockNodeModel[]
        ).push(node);

    }

    public getAll():
    readonly DockNodeModel[] {

        return DockRegistry;

    }

}
