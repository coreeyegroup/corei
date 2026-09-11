/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-state.ts

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-11 — Panel State Operationalization
===============================================================================
*/

import type { PanelStateContract } from "./panel-state-contract";
import { PanelFocus } from "./panel-focus";

export type PanelStateValue = Record<string, unknown>;

export class PanelState
implements PanelStateContract {

    private readonly states = new Map<string, PanelStateValue>();

    constructor(
        private readonly focus = new PanelFocus()
    ) {}

    async initialize(): Promise<void> {
        await this.focus.initialize();
    }

    async setState(
        panelId: string,
        state: PanelStateValue
    ): Promise<void> {
        this.states.set(panelId, { ...state });
    }

    getState(
        panelId: string
    ): PanelStateValue | undefined {

        const state = this.states.get(panelId);

        return state
            ? { ...state }
            : undefined;
    }

    hasState(panelId: string): boolean {
        return this.states.has(panelId);
    }

    async clearState(panelId: string): Promise<void> {
        this.states.delete(panelId);
    }

    async removeState(panelId: string): Promise<void> {
        this.states.delete(panelId);
    }

    async reset(): Promise<void> {
        this.states.clear();
    }

    async shutdown(): Promise<void> {
        await this.reset();
        await this.focus.shutdown();
    }
}
