/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-host.ts

Purpose:
    Institutional Panel Host.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-06 — Panel Host Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Window & Workspace Platform
    Panel Registry
    Panel Runtime
    Panel Lifecycle

Remarks:
    Host coordination only.
    Consumes existing runtime.
===============================================================================
*/

import type { PanelHostContract } from "./panel-host-contract";
import { PanelRegistry } from "./panel-registry";
import { PanelRuntime } from "./panel-runtime";
import { PanelLifecycle } from "./panel-lifecycle";

export class PanelHost
implements PanelHostContract {

    private readonly attachedPanels = new Set<string>();

    constructor(
        private readonly registry = new PanelRegistry(),
        private readonly runtime = new PanelRuntime(),
        private readonly lifecycle = new PanelLifecycle()
    ) {}

    async initialize(): Promise<void> {

        await this.runtime.initialize();
    }

    async attach(panelId: string): Promise<void> {

        if (!this.registry.exists(panelId)) {
            throw new Error(
                `PanelHost: Panel '${panelId}' is not registered.`
            );
        }

        if (this.attachedPanels.has(panelId)) {
            return;
        }

        await this.lifecycle.open(panelId);

        this.attachedPanels.add(panelId);
    }

    async detach(panelId: string): Promise<void> {

        if (!this.attachedPanels.has(panelId)) {
            return;
        }

        await this.lifecycle.close(panelId);

        this.attachedPanels.delete(panelId);
    }

    async activate(panelId: string): Promise<void> {

        if (!this.attachedPanels.has(panelId)) {
            throw new Error(
                `PanelHost: Panel '${panelId}' is not attached.`
            );
        }

        await this.lifecycle.activate(panelId);
    }

    async deactivate(panelId: string): Promise<void> {

        if (!this.attachedPanels.has(panelId)) {
            return;
        }

        await this.lifecycle.deactivate(panelId);
    }

    async shutdown(): Promise<void> {

        for (const panelId of [...this.attachedPanels]) {
            await this.detach(panelId);
        }

        await this.runtime.shutdown();
    }
}
