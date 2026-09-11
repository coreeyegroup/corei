/**
 * =============================================================================
 * COREI OPERATING SYSTEM
 *
 * Stage       : 25
 * Phase       : 06
 * Step        : 06
 *
 * File        : layout-manager.ts
 * Purpose     : Layout Manager
 * =============================================================================
 */

import type {
    LayoutModel
} from "./layout";

import {
    LayoutRegistry
} from "./layout-registry";

export class LayoutManager {

    public register(
        layout: LayoutModel
    ): void {

        (
            LayoutRegistry as LayoutModel[]
        ).push(layout);

    }

    public getAll():
    readonly LayoutModel[] {

        return LayoutRegistry;

    }

}
