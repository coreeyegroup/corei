/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    xterm-integration.ts

Purpose:
    Institutional xterm.js Terminal Integration coordinator.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-12 — xterm.js Terminal Integration Boundary Operationalization
===============================================================================
*/

import type {
    XtermIntegrationContract
} from "./xterm-integration-contract";

import {
    MonacoIntegration
} from "./monaco-integration";

export class XtermIntegration
implements XtermIntegrationContract {

    private readonly monaco =
        new MonacoIntegration();

    private readonly terminals =
        new Set<string>();

    private initialized = false;

    async initialize(): Promise<void> {

        if (this.initialized) {
            return;
        }

        await this.monaco.initialize();

        this.initialized = true;
    }

    async attach(
        terminalId: string
    ): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "XtermIntegration has not been initialized."
            );
        }

        const id = terminalId.trim();

        if (!id) {
            throw new Error(
                "Terminal identifier cannot be empty."
            );
        }

        this.terminals.add(id);
    }

    async detach(
        terminalId: string
    ): Promise<void> {

        this.terminals.delete(terminalId);
    }

    isAttached(
        terminalId: string
    ): boolean {

        return this.terminals.has(terminalId);
    }

    async shutdown(): Promise<void> {

        this.terminals.clear();

        await this.monaco.shutdown();

        this.initialized = false;
    }
}
