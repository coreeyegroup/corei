/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-multiplicity.ts

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-18 — Panel Multiplicity Operationalization
===============================================================================
*/

import { PanelRegistry } from "./panel-registry";

export class PanelMultiplicity {

    private readonly instances = new Map<string, Set<string>>();

    constructor(
        private readonly registry = new PanelRegistry()
    ) {}

    async initialize(): Promise<void> {
        // Reserved for future runtime initialization.
    }

    register(
        panelType: string,
        panelId: string
    ): void {

        if (!this.registry.exists(panelId)) {
            throw new Error(
                `Panel '${panelId}' is not registered.`
            );
        }

        let collection = this.instances.get(panelType);

        if (!collection) {
            collection = new Set<string>();
            this.instances.set(panelType, collection);
        }

        collection.add(panelId);
    }

    unregister(
        panelType: string,
        panelId: string
    ): void {

        const collection = this.instances.get(panelType);

        if (!collection) {
            return;
        }

        collection.delete(panelId);

        if (collection.size === 0) {
            this.instances.delete(panelType);
        }
    }

    getInstances(
        panelType: string
    ): readonly string[] {

        return [...(this.instances.get(panelType) ?? [])];
    }

    getTypes(): readonly string[] {

        return [...this.instances.keys()];
    }

    reset(): void {

        this.instances.clear();
    }

    async shutdown(): Promise<void> {

        this.reset();
    }
}
