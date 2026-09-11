/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-focus.ts

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-10 — Panel Focus Operationalization
===============================================================================
*/

import type { PanelFocusContract } from "./panel-focus-contract";
import { PanelVisibility } from "./panel-visibility";

export class PanelFocus
implements PanelFocusContract {

    private activePanelId: string | null = null;

    constructor(
        private readonly visibility = new PanelVisibility()
    ) {}

    async initialize(): Promise<void> {
        await this.visibility.initialize();
    }

    async activate(panelId: string): Promise<void> {

        if (!this.visibility.isVisible(panelId)) {
            throw new Error(
                `PanelFocus: Panel '${panelId}' is hidden.`
            );
        }

        this.activePanelId = panelId;
    }

    async deactivate(): Promise<void> {
        this.activePanelId = null;
    }

    getActivePanel(): string | null {
        return this.activePanelId;
    }

    hasFocus(panelId: string): boolean {
        return this.activePanelId === panelId;
    }

    async reset(): Promise<void> {
        this.activePanelId = null;
    }

    async shutdown(): Promise<void> {
        await this.reset();
        await this.visibility.shutdown();
    }
}
