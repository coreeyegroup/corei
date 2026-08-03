/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    command-runtime.ts

Purpose:
    Institutional Command Runtime.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-05 — Command Runtime Operationalization
===============================================================================
*/

import type { CommandRuntimeContract } from "./contracts";

export class CommandRuntime implements CommandRuntimeContract {

    private initialized = false;

    private running = false;

    async initialize(): Promise<void> {

        if (this.initialized) {
            return;
        }

        this.initialized = true;
    }

    async start(): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "CommandRuntime has not been initialized."
            );
        }

        if (this.running) {
            return;
        }

        this.running = true;
    }

    async stop(): Promise<void> {

        if (!this.running) {
            return;
        }

        this.running = false;
    }

    async reset(): Promise<void> {

        this.running = false;
    }

    async shutdown(): Promise<void> {

        this.running = false;

        this.initialized = false;
    }
}
