/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    productivity-provider.ts

Purpose:
    Institutional Productivity Provider coordinator.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-13 — Productivity Provider Operationalization
===============================================================================
*/

import type {
    ProductivityProviderContract
} from "./productivity-provider-contract";

import {
    XtermIntegration
} from "./xterm-integration";

export class ProductivityProvider
implements ProductivityProviderContract {

    private readonly terminal =
        new XtermIntegration();

    private readonly providers =
        new Set<string>();

    private initialized = false;

    async initialize(): Promise<void> {

        if (this.initialized) {
            return;
        }

        await this.terminal.initialize();

        this.initialized = true;
    }

    async connect(
        providerId: string
    ): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "ProductivityProvider has not been initialized."
            );
        }

        const id = providerId.trim();

        if (!id) {
            throw new Error(
                "Provider identifier cannot be empty."
            );
        }

        this.providers.add(id);
    }

    async disconnect(
        providerId: string
    ): Promise<void> {

        this.providers.delete(providerId);
    }

    isConnected(
        providerId: string
    ): boolean {

        return this.providers.has(providerId);
    }

    async shutdown(): Promise<void> {

        this.providers.clear();

        await this.terminal.shutdown();

        this.initialized = false;
    }
}
