/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-provider.ts

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-13 — Panel Provider Operationalization
===============================================================================
*/

import type { PanelProviderContract } from "./panel-provider-contract";

import { PanelRegistry } from "./panel-registry";
import { PanelRuntime } from "./panel-runtime";
import { PanelLifecycle } from "./panel-lifecycle";
import { PanelHost } from "./panel-host";
import { PanelComposition } from "./panel-composition";
import { PanelLayout } from "./panel-layout";
import { PanelVisibility } from "./panel-visibility";
import { PanelFocus } from "./panel-focus";
import { PanelState } from "./panel-state";
import { PanelPersistence } from "./panel-persistence";

export class PanelProvider
implements PanelProviderContract {

    readonly registry = new PanelRegistry();
    readonly runtime = new PanelRuntime();
    readonly lifecycle = new PanelLifecycle();
    readonly host = new PanelHost();
    readonly composition = new PanelComposition();
    readonly layout = new PanelLayout();
    readonly visibility = new PanelVisibility();
    readonly focus = new PanelFocus();
    readonly state = new PanelState();
    readonly persistence = new PanelPersistence();

    private readonly connections = new Set<string>();

    async initialize(): Promise<void> {

        await this.runtime.initialize();
        await this.host.initialize();
        await this.composition.initialize();
        await this.layout.initialize();
        await this.visibility.initialize();
        await this.focus.initialize();
        await this.state.initialize();
        await this.persistence.initialize();
    }

    async connect(providerId: string): Promise<void> {

        this.connections.add(providerId);
    }

    async disconnect(providerId: string): Promise<void> {

        this.connections.delete(providerId);
    }

    isConnected(providerId: string): boolean {

        return this.connections.has(providerId);
    }

    async shutdown(): Promise<void> {

        this.connections.clear();

        await this.persistence.shutdown();
        await this.state.shutdown();
        await this.focus.shutdown();
        await this.visibility.shutdown();
        await this.layout.shutdown();
        await this.composition.shutdown();
        await this.host.shutdown();
        await this.runtime.shutdown();
    }
}
