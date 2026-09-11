/**
 * ============================================================================
 * STAGE-25
 * STEP-03
 * BUILD UNIT-28
 *
 * FILE
 * panel-runtime.ts
 * ============================================================================
 */

import { panelRegistry } from "../../registries/panel-registry";
import { panelFactory } from "../factory";
import { panelCatalog } from "../catalog";

import type { PanelDescriptor } from "../metadata";

class PanelRuntime {

    initialize(): void {

        panelRegistry.clear();

        for (const panel of panelCatalog) {

            this.register(panel);

        }

    }

    register(

        descriptor: PanelDescriptor

    ): void {

        panelRegistry.register(

            panelFactory.create(

                descriptor

            )

        );

    }

    resolve(

        id: string

    ): PanelDescriptor {

        const panel = panelRegistry.get(id);

        if (!panel) {

            throw new Error(`Unknown panel: ${id}`);

        }

        return panel;

    }

    get(

        id: string

    ): PanelDescriptor | undefined {

        return panelRegistry.get(id);

    }

    list(): PanelDescriptor[] {

        return panelRegistry.list();

    }

}

export const panelRuntime =

new PanelRuntime();
