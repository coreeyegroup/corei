/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    productivity-event-state.ts

Purpose:
    Institutional Productivity Event & State Coordination.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-15 — Productivity Event & State Coordination Operationalization
===============================================================================
*/

import type {
    ProductivityEventStateContract
} from "./productivity-event-state-contract";

import {
    OperatorWorkflowComposition
} from "./operator-workflow-composition";

export class ProductivityEventState
implements ProductivityEventStateContract {

    private readonly workflow =
        new OperatorWorkflowComposition();

    private initialized = false;

    private readonly pendingEvents =
        new Set<string>();

    private readonly synchronizedContexts =
        new Set<string>();

    async initialize(): Promise<void> {

        if (this.initialized) {
            return;
        }

        await this.workflow.initialize();

        this.initialized = true;
    }

    async publish(
        eventId: string
    ): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "ProductivityEventState has not been initialized."
            );
        }

        const id = eventId.trim();

        if (!id) {
            throw new Error(
                "Event identifier cannot be empty."
            );
        }

        this.pendingEvents.add(id);
    }

    async synchronize(
        contextId: string
    ): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "ProductivityEventState has not been initialized."
            );
        }

        const id = contextId.trim();

        if (!id) {
            throw new Error(
                "Context identifier cannot be empty."
            );
        }

        this.synchronizedContexts.add(id);
    }

    async flush(): Promise<void> {

        this.pendingEvents.clear();

        this.synchronizedContexts.clear();
    }

    async shutdown(): Promise<void> {

        await this.flush();

        await this.workflow.shutdown();

        this.initialized = false;
    }
}
