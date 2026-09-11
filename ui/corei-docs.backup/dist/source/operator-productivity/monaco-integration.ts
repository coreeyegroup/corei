/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Operator Productivity Platform

File:
    monaco-integration.ts

Purpose:
    Institutional Monaco Editor Integration coordinator.

Stage:
    Stage-25

Phase:
    Phase-21

Step:
    Step-11 — Monaco Editor Integration Boundary Operationalization
===============================================================================
*/

import type {
    MonacoIntegrationContract
} from "./monaco-integration-contract";

import {
    SearchPlatform
} from "./search-platform";

export class MonacoIntegration
implements MonacoIntegrationContract {

    private readonly search =
        new SearchPlatform();

    private readonly editors =
        new Set<string>();

    private initialized = false;

    async initialize(): Promise<void> {

        if (this.initialized) {
            return;
        }

        await this.search.initialize();

        this.initialized = true;
    }

    async attach(
        editorId: string
    ): Promise<void> {

        if (!this.initialized) {
            throw new Error(
                "MonacoIntegration has not been initialized."
            );
        }

        const id = editorId.trim();

        if (!id) {
            throw new Error(
                "Editor identifier cannot be empty."
            );
        }

        this.editors.add(id);
    }

    async detach(
        editorId: string
    ): Promise<void> {

        this.editors.delete(editorId);
    }

    isAttached(
        editorId: string
    ): boolean {

        return this.editors.has(editorId);
    }

    async shutdown(): Promise<void> {

        this.editors.clear();

        await this.search.shutdown();

        this.initialized = false;
    }
}
