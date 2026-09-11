/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    workbench-composition.ts

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-15 — Workbench Composition Operationalization
===============================================================================
*/

import type {
    WorkbenchCompositionContract
} from "./workbench-composition-contract";

import { VisualizationIntegration } from "./visualization-integration";

export class WorkbenchComposition
implements WorkbenchCompositionContract {

    constructor(
        private readonly visualization = new VisualizationIntegration()
    ) {}

    async initialize(): Promise<void> {

        await this.visualization.initialize();
    }

    async compose(): Promise<void> {

        /*
         * Workbench composition coordination.
         * Rendering ownership remains outside this component.
         */
    }

    async decompose(): Promise<void> {

        /*
         * Reserved for controlled teardown.
         */
    }

    async shutdown(): Promise<void> {

        await this.decompose();

        await this.visualization.shutdown();
    }
}
