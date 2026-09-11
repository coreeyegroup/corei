/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-18
 *
 * FILE
 * workbench-runtime.ts
 *
 * PURPOSE
 * Authoritative Workbench Bootstrap Runtime
 * ============================================================================
 */

import { activityRuntime } from "../activity-bar/runtime";
import { explorerRuntime, sidebarRuntime } from "../sidebar/runtime";
import { tabRuntime } from "../tabs/runtime";
import { panelRuntime, panelFocusRuntime } from "../panels/runtime";
import { dockRuntime } from "../docking/runtime";
import { workspaceRuntime } from "../workspace/runtime/workspace-runtime";
import "../workspace/runtime/register-default-workspace";
import "../panels/runtime/register-default-panels";
import { persistenceRuntime } from "../workspace/persistence/runtime/persistence-runtime";

class WorkbenchRuntime {
    private initialized = false;

    initialize(): void {
        console.log('[WorkbenchRuntime] initialize() called.');
        if (this.initialized) {
            console.log('[WorkbenchRuntime] Already initialized.');
            return;
        }

        console.log('[WorkbenchRuntime] Initialising activityRuntime.');
        activityRuntime.initialize();

        console.log('[WorkbenchRuntime] Initialising explorerRuntime.');
        explorerRuntime.initialize();

        console.log('[WorkbenchRuntime] Initialising sidebarRuntime.');
        sidebarRuntime.initialize();

        console.log('[WorkbenchRuntime] Initialising tabRuntime.');
        tabRuntime.initialize();

        console.log('[WorkbenchRuntime] Initialising panelRuntime.');
        panelRuntime.initialize();

        console.log('[WorkbenchRuntime] Initialising panelFocusRuntime.');
        panelFocusRuntime.initialize();

        console.log('[WorkbenchRuntime] Initialising dockRuntime.');
        dockRuntime.initialize();

        console.log('[WorkbenchRuntime] Initialising persistenceRuntime.');
        persistenceRuntime.initialize();

        this.initialized = true;
        console.log('[WorkbenchRuntime] initialize() completed.');
    }

    start(): void {
        console.log('[WorkbenchRuntime] start() called.');
        console.log('[WorkbenchRuntime] Opening workspace "trading".');
        workspaceRuntime.open("trading");
        console.log('[WorkbenchRuntime] start() completed.');
    }

    dispose(): void {
        if (!this.initialized) return;
        console.log('[WorkbenchRuntime] dispose() called.');
        workspaceRuntime.close();
        dockRuntime.dispose();
        panelFocusRuntime.dispose();
        tabRuntime.dispose();
        sidebarRuntime.dispose();
        explorerRuntime.dispose();
        activityRuntime.dispose();
        this.initialized = false;
    }

    isInitialized(): boolean {
        return this.initialized;
    }
}

export const workbenchRuntime = new WorkbenchRuntime();
