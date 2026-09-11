/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-composition.ts

Purpose:
    Institutional Panel Composition.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-07 — Panel Composition Operationalization
===============================================================================
*/

import type {
    PanelCompositionContract
} from "./panel-composition-contract";

import { PanelHost } from "./panel-host";

export class PanelComposition
implements PanelCompositionContract {

    private readonly composedPanels = new Set<string>();

    constructor(
        private readonly host = new PanelHost()
    ) {}

    async initialize(): Promise<void> {

        await this.host.initialize();
    }

    async compose(): Promise<void> {

        this.composedPanels.clear();

        /*
         * Step-07 owns only composition coordination.
         * Layout, visibility and rendering are handled
         * in subsequent steps.
         */
    }

    async decompose(): Promise<void> {

        this.composedPanels.clear();
    }

    async shutdown(): Promise<void> {

        await this.decompose();

        await this.host.shutdown();
    }
}
