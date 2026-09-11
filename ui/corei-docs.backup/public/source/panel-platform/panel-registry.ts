/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-registry.ts

Purpose:
    Institutional Panel Registry.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-03 — Panel Registry Operationalization

Owner:
    COREI Platform Architecture

Remarks:
    Registry only.
    No rendering.
    No runtime ownership.
===============================================================================
*/

import type { PanelRegistryContract } from "./panel-registry-contract";

export class PanelRegistry
implements PanelRegistryContract {

    /**
     * Registry ownership.
     *
     * Step-03 owns only panel identity registration.
     * Runtime, lifecycle, visibility, focus and state are
     * operationalized in later steps.
     */
    private readonly registry = new Map<string, string>();

    async register(panelId: string): Promise<void> {

        const id = panelId.trim();

        if (!id) {
            throw new Error(
                "PanelRegistry: panelId cannot be empty."
            );
        }

        if (this.registry.has(id)) {
            return;
        }

        this.registry.set(id, id);
    }

    async unregister(panelId: string): Promise<void> {

        const id = panelId.trim();

        if (!id) {
            return;
        }

        this.registry.delete(id);
    }

    exists(panelId: string): boolean {
        return this.registry.has(panelId.trim());
    }

    get(panelId: string): string | null {

        const panel = this.registry.get(
            panelId.trim()
        );

        return panel ?? null;
    }

    getAll(): readonly string[] {

        return Object.freeze(
            [...this.registry.values()]
        );
    }
}
