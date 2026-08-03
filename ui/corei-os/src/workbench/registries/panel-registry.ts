/**
 * ============================================================================
 * STAGE-25
 * STEP-02
 * BUILD UNIT-20.02
 *
 * FILE
 * panel-registry.ts
 *
 * PURPOSE
 * Authoritative Workbench Panel Registry
 * ============================================================================
 */

import type {

    PanelDescriptor

} from "../panels/metadata";

class PanelRegistry {

    private readonly panels =

        new Map<string, PanelDescriptor>();

    register(

        definition: PanelDescriptor

    ): void {

        this.panels.set(

            definition.id,

            definition

        );

    }

    get(

        id: string

    ): PanelDescriptor | undefined {

        return this.panels.get(

            id

        );

    }

    list(): PanelDescriptor[] {

        return [

            ...this.panels.values()

        ];

    }

    clear(): void {

        this.panels.clear();

    }

}

export const panelRegistry =

new PanelRegistry();
