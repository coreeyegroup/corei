/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-lifecycle.ts

Purpose:
    Institutional Panel Lifecycle coordinator.

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-05 — Panel Lifecycle Operationalization

Owner:
    COREI Platform Architecture

Dependencies:
    Platform Kernel
    Window & Workspace Platform
    Panel Registry
    Panel Runtime

Remarks:
    Lifecycle coordination only.
===============================================================================
*/

import { PanelRegistry } from "./panel-registry";
import { PanelRuntime } from "./panel-runtime";
import type { PanelLifecycleContract } from "./panel-lifecycle-contract";

export class PanelLifecycle
implements PanelLifecycleContract {

    private readonly activePanels = new Set<string>();

    private readonly visiblePanels = new Set<string>();

    constructor(
        private readonly registry = new PanelRegistry(),
        private readonly runtime = new PanelRuntime()
    ) {}

    async create(panelId: string): Promise<void> {

        await this.registry.register(panelId);
    }

    async open(panelId: string): Promise<void> {

        if (!this.registry.exists(panelId)) {
            throw new Error(
                `PanelLifecycle: Panel '${panelId}' is not registered.`
            );
        }

        await this.runtime.start();

        this.visiblePanels.add(panelId);
    }

    async activate(panelId: string): Promise<void> {

        if (!this.registry.exists(panelId)) {
            throw new Error(
                `PanelLifecycle: Panel '${panelId}' is not registered.`
            );
        }

        this.activePanels.add(panelId);
    }

    async deactivate(panelId: string): Promise<void> {

        this.activePanels.delete(panelId);
    }

    async hide(panelId: string): Promise<void> {

        this.visiblePanels.delete(panelId);
        this.activePanels.delete(panelId);
    }

    async show(panelId: string): Promise<void> {

        if (!this.registry.exists(panelId)) {
            throw new Error(
                `PanelLifecycle: Panel '${panelId}' is not registered.`
            );
        }

        this.visiblePanels.add(panelId);
    }

    async close(panelId: string): Promise<void> {

        this.activePanels.delete(panelId);
        this.visiblePanels.delete(panelId);

        if (this.visiblePanels.size === 0) {
            await this.runtime.stop();
        }
    }

    async dispose(panelId: string): Promise<void> {

        await this.close(panelId);

        await this.registry.unregister(panelId);
    }
}
