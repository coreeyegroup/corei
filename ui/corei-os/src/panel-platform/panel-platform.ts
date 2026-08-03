/*
===============================================================================
COREI OPERATING SYSTEM
-------------------------------------------------------------------------------
Component:
    Panel Platform

File:
    panel-platform.ts

Stage:
    Stage-25

Phase:
    Phase-20

Step:
    Step-20 — Panel Platform Integration & Certification
===============================================================================
*/

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
import { PanelProvider } from "./panel-provider";
import { VisualizationIntegration } from "./visualization-integration";
import { WorkbenchComposition } from "./workbench-composition";
import { PanelEventState } from "./panel-event-state";
import { PanelDiagnostics } from "./panel-diagnostics";
import { PanelMultiplicity } from "./panel-multiplicity";
import { PanelViewport } from "./panel-viewport";

export class PanelPlatform {

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

    readonly provider = new PanelProvider();

    readonly visualization = new VisualizationIntegration();

    readonly workbench = new WorkbenchComposition();

    readonly eventState = new PanelEventState();

    readonly diagnostics = new PanelDiagnostics();

    readonly multiplicity = new PanelMultiplicity();

    readonly viewport = new PanelViewport();

    async initialize(): Promise<void> {

        await this.provider.initialize();

        await this.visualization.initialize();

        await this.workbench.initialize();

        await this.eventState.initialize();

        await this.diagnostics.initialize();

        await this.multiplicity.initialize();

        await this.viewport.initialize();
    }

    async shutdown(): Promise<void> {

        await this.viewport.shutdown();

        await this.multiplicity.shutdown();

        await this.diagnostics.shutdown();

        await this.eventState.shutdown();

        await this.workbench.shutdown();

        await this.visualization.shutdown();

        await this.provider.shutdown();
    }
}
