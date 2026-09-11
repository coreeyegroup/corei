/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-layout.ts

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-08 — Panel Layout Operationalization
===============================================================================
*/

import type {
    PanelLayoutContract
} from "./panel-layout-contract";

import { PanelComposition } from "./panel-composition";

export interface PanelLayoutState {
    panelId: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export class PanelLayout
implements PanelLayoutContract {

    private readonly layouts = new Map<string, PanelLayoutState>();

    constructor(
        private readonly composition = new PanelComposition()
    ) {}

    async initialize(): Promise<void> {
        await this.composition.initialize();
    }

    async arrange(): Promise<void> {
        /*
         * Layout algorithm will be operationalized
         * in subsequent layout strategy steps.
         */
    }

    async reset(): Promise<void> {
        this.layouts.clear();
    }

    setLayout(layout: PanelLayoutState): void {
        this.layouts.set(layout.panelId, { ...layout });
    }

    getLayout(panelId: string): PanelLayoutState | undefined {
        const layout = this.layouts.get(panelId);
        return layout ? { ...layout } : undefined;
    }

    removeLayout(panelId: string): void {
        this.layouts.delete(panelId);
    }

    getAllLayouts(): readonly PanelLayoutState[] {
        return [...this.layouts.values()].map(layout => ({ ...layout }));
    }

    async shutdown(): Promise<void> {
        await this.reset();
        await this.composition.shutdown();
    }
}
