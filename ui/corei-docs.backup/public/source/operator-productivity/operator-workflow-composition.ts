/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    operator-workflow-composition.ts

Purpose:
    Institutional Operator Workflow Composition coordinator.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-14 — Operator Workflow Composition Operationalization
===============================================================================
*/

import type {
    OperatorWorkflowCompositionContract
} from "./operator-workflow-composition-contract";

import {
    ProductivityProvider
} from "./productivity-provider";

export class OperatorWorkflowComposition
implements OperatorWorkflowCompositionContract {

    private readonly provider =
        new ProductivityProvider();

    private initialized = false;

    private composed = false;

    async initialize(): Promise<void> {

        if (this.initialized) {
            return;
        }

        await this.provider.initialize();

        this.initialized = true;
    }

    async compose(): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "OperatorWorkflowComposition has not been initialized."
            );
        }

        if (this.composed) {
            return;
        }

        this.composed = true;
    }

    async decompose(): Promise<void> {

        if (!this.composed) {
            return;
        }

        this.composed = false;
    }

    async shutdown(): Promise<void> {

        if (this.composed) {
            await this.decompose();
        }

        await this.provider.shutdown();

        this.initialized = false;
    }
}
