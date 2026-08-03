/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-diagnostics.ts

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-17 — Panel Diagnostics Operationalization
===============================================================================
*/

import { PanelRegistry } from "./panel-registry";
import { PanelRuntime } from "./panel-runtime";
import { PanelState } from "./panel-state";

export interface PanelDiagnosticsSnapshot {

    registeredPanels: readonly string[];

    totalPanels: number;
}

export class PanelDiagnostics {

    constructor(
        private readonly registry = new PanelRegistry(),
        private readonly runtime = new PanelRuntime(),
        private readonly state = new PanelState()
    ) {}

    async initialize(): Promise<void> {

        await this.runtime.initialize();

        await this.state.initialize();
    }

    snapshot(): PanelDiagnosticsSnapshot {

        const registeredPanels = this.registry.getAll();

        return {

            registeredPanels,

            totalPanels: registeredPanels.length
        };
    }

    async shutdown(): Promise<void> {

        await this.state.shutdown();

        await this.runtime.shutdown();
    }
}
