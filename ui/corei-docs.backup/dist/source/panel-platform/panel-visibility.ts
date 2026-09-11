/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-visibility.ts

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-09 — Panel Visibility Operationalization
===============================================================================
*/

import type {
    PanelVisibilityContract
} from "./panel-visibility-contract";

import { PanelLayout } from "./panel-layout";

export class PanelVisibility
implements PanelVisibilityContract {

    private readonly hiddenPanels = new Set<string>();

    constructor(
        private readonly layout = new PanelLayout()
    ) {}

    async initialize(): Promise<void> {
        await this.layout.initialize();
    }

    async show(panelId: string): Promise<void> {
        this.hiddenPanels.delete(panelId);
    }

    async hide(panelId: string): Promise<void> {
        this.hiddenPanels.add(panelId);
    }

    isVisible(panelId: string): boolean {
        return !this.hiddenPanels.has(panelId);
    }

    getHiddenPanels(): readonly string[] {
        return [...this.hiddenPanels];
    }

    async reset(): Promise<void> {
        this.hiddenPanels.clear();
    }

    async shutdown(): Promise<void> {
        await this.reset();
        await this.layout.shutdown();
    }
}
