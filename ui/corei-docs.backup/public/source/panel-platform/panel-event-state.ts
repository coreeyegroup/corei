/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-event-state.ts

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-16 — Event & State Coordination Operationalization
===============================================================================
*/

import { PanelState } from "./panel-state";

export class PanelEventState {

    constructor(
        private readonly panelState = new PanelState()
    ) {}

    async initialize(): Promise<void> {

        await this.panelState.initialize();
    }

    async publish(
        panelId: string,
        event: string,
        payload: Record<string, unknown> = {}
    ): Promise<void> {

        await this.panelState.setState(panelId, {
            event,
            payload,
            timestamp: Date.now()
        });
    }

    getState(
        panelId: string
    ) {

        return this.panelState.getState(panelId);
    }

    hasState(
        panelId: string
    ): boolean {

        return this.panelState.hasState(panelId);
    }

    async clear(
        panelId: string
    ): Promise<void> {

        await this.panelState.clearState(panelId);
    }

    async shutdown(): Promise<void> {

        await this.panelState.shutdown();
    }
}
