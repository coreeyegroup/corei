/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-13
 *
 * FILE
 * panel-registry.ts
 *
 * PURPOSE
 * Central Workbench Panel Registry
 * ============================================================================
 */

import type { WorkbenchPanel } from "../panels/panel-contract";

class PanelRegistry {

    private readonly panels = new Map<string, WorkbenchPanel>();

    register(panel: WorkbenchPanel): void {

        this.panels.set(panel.id, panel);

    }

    get(id: string): WorkbenchPanel | undefined {

        return this.panels.get(id);

    }

    getAll(): WorkbenchPanel[] {

        return [...this.panels.values()];

    }

}

export const panelRegistry = new PanelRegistry();
