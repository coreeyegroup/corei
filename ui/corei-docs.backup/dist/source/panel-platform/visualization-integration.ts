/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    visualization-integration.ts

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-14 — Visualization Integration Operationalization
===============================================================================
*/

import type {
    VisualizationIntegrationContract
} from "./visualization-integration-contract";

import { PanelProvider } from "./panel-provider";

export class VisualizationIntegration
implements VisualizationIntegrationContract {

    constructor(
        private readonly panelProvider = new PanelProvider()
    ) {}

    async initialize(): Promise<void> {
        await this.panelProvider.initialize();
    }

    async attach(
        providerId: string
    ): Promise<void> {

        if (!this.panelProvider.isConnected(providerId)) {
            await this.panelProvider.connect(providerId);
        }
    }

    async detach(
        providerId: string
    ): Promise<void> {

        if (this.panelProvider.isConnected(providerId)) {
            await this.panelProvider.disconnect(providerId);
        }
    }

    isAttached(
        providerId: string
    ): boolean {

        return this.panelProvider.isConnected(providerId);
    }

    async shutdown(): Promise<void> {
        await this.panelProvider.shutdown();
    }
}
