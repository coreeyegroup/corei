/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    productivity-diagnostics.ts

Purpose:
    Institutional Productivity Diagnostics coordinator.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-16 — Productivity Diagnostics & Observability Operationalization
===============================================================================
*/

import type {
    ProductivityDiagnosticsContract
} from "./productivity-diagnostics-contract";

import {
    ProductivityEventState
} from "./productivity-event-state";

export class ProductivityDiagnostics
implements ProductivityDiagnosticsContract {

    private readonly coordinator =
        new ProductivityEventState();

    private initialized = false;

    private diagnosticsCollected = false;

    private metricsCollected = false;

    async initialize(): Promise<void> {

        if (this.initialized) {
            return;
        }

        await this.coordinator.initialize();

        this.initialized = true;
    }

    async collect(): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "ProductivityDiagnostics has not been initialized."
            );
        }

        this.diagnosticsCollected = true;
    }

    async metrics(): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "ProductivityDiagnostics has not been initialized."
            );
        }

        this.metricsCollected = true;
    }

    async health(): Promise<boolean> {

        return (
            this.initialized &&
            this.diagnosticsCollected &&
            this.metricsCollected
        );
    }

    async shutdown(): Promise<void> {

        this.diagnosticsCollected = false;

        this.metricsCollected = false;

        await this.coordinator.shutdown();

        this.initialized = false;
    }
}
