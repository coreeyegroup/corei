/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-persistence.ts

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-12 — Panel Persistence Operationalization
===============================================================================
*/

import type {
    PanelPersistenceContract
} from "./panel-persistence-contract";

import {
    PanelState
} from "./panel-state";

export class PanelPersistence
implements PanelPersistenceContract {

    constructor(
        private readonly panelState = new PanelState()
    ) {}

    async initialize(): Promise<void> {
        await this.panelState.initialize();
    }

    async save(
        panelId: string
    ): Promise<void> {

        if (!this.panelState.hasState(panelId)) {
            await this.panelState.setState(panelId, {});
        }
    }

    async restore(
        panelId: string
    ): Promise<void> {

        this.panelState.getState(panelId);
    }

    async remove(
        panelId: string
    ): Promise<void> {

        await this.panelState.clearState(panelId);
    }

    async clear(
        panelId: string
    ): Promise<void> {

        await this.remove(panelId);
    }

    async reset(): Promise<void> {

        await this.panelState.reset();
    }

    async shutdown(): Promise<void> {

        await this.reset();

        await this.panelState.shutdown();
    }
}
