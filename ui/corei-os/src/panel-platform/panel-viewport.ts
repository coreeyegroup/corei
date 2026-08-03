/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-viewport.ts

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-19 — Panel Viewport Operationalization
===============================================================================
*/

import { PanelMultiplicity } from "./panel-multiplicity";

export interface PanelViewportState {

    panelId: string;

    viewportId: string;
}

export class PanelViewport {

    private readonly assignments = new Map<string, string>();

    constructor(
        private readonly multiplicity = new PanelMultiplicity()
    ) {}

    async initialize(): Promise<void> {

        await this.multiplicity.initialize();
    }

    assign(
        panelId: string,
        viewportId: string
    ): void {

        this.assignments.set(panelId, viewportId);
    }

    unassign(
        panelId: string
    ): void {

        this.assignments.delete(panelId);
    }

    getViewport(
        panelId: string
    ): string | undefined {

        return this.assignments.get(panelId);
    }

    getAssignments(): readonly PanelViewportState[] {

        return [...this.assignments.entries()].map(
            ([panelId, viewportId]) => ({
                panelId,
                viewportId
            })
        );
    }

    reset(): void {

        this.assignments.clear();
    }

    async shutdown(): Promise<void> {

        this.reset();

        await this.multiplicity.shutdown();
    }
}
