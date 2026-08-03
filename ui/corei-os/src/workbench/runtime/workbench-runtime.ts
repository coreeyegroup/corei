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

import {

    activityRuntime

} from "../activity-bar/runtime";

import {

    explorerRuntime,
    sidebarRuntime

} from "../sidebar/runtime";

import {

    tabRuntime

} from "../tabs/runtime";

import {

    panelRuntime,
    panelFocusRuntime

} from "../panels/runtime";

import {

    dockRuntime

} from "../docking/runtime";

import {

    workspaceRuntime

} from "../workspace/runtime/workspace-runtime";

import "../workspace/runtime/register-default-workspace";
import "../panels/runtime/register-default-panels";

import {

    persistenceRuntime

} from "../workspace/persistence/runtime/persistence-runtime";

class WorkbenchRuntime {

    private initialized = false;

    initialize(): void {

        if (this.initialized) {
            return;
        }

        activityRuntime.initialize();

        explorerRuntime.initialize();

        sidebarRuntime.initialize();

        tabRuntime.initialize();

        panelRuntime.initialize();

        panelFocusRuntime.initialize();

        dockRuntime.initialize();

        persistenceRuntime.initialize();

        this.initialized = true;

   }

    start(): void {

        workspaceRuntime.open("trading");

    }

    dispose(): void {

        if (!this.initialized) {
            return;
        }

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

export const workbenchRuntime =
    new WorkbenchRuntime();
