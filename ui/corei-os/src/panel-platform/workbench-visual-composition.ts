/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    workbench-visual-composition.ts

Purpose:
    Institutional Workbench Visual Composition coordinator.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-15 — Workbench Visual Composition Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Institutional Shell
    Window & Workspace Platform
    Panel Platform
    Visualization Integration

Remarks:
    Composition coordination only.
    Consumes existing Workbench.
    Does not own rendering.
===============================================================================
*/

import type {
    WorkbenchVisualCompositionContract
} from "./workbench-visual-composition-contract";

import {
    VisualizationIntegration
} from "./visualization-integration";

export class WorkbenchVisualComposition
implements WorkbenchVisualCompositionContract {

    constructor(
        private readonly visualization =
            new VisualizationIntegration()
    ) {}

    async initialize(): Promise<void> {
        await this.visualization.initialize();
    }

    async compose(): Promise<void> {}

    async decompose(): Promise<void> {}

    async shutdown(): Promise<void> {
        await this.visualization.shutdown();
    }
}
