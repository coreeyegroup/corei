/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-15
 *
 * FILE
 * layout-registry.ts
 *
 * PURPOSE
 * Layout Registry
 * ============================================================================
 */

import type { LayoutDefinition } from "../layout/layout-contract";

class LayoutRegistry {

    private readonly layouts = new Map<string, LayoutDefinition>();

    register(layout: LayoutDefinition): void {

        this.layouts.set(layout.id, layout);

    }

    get(id: string): LayoutDefinition | undefined {

        return this.layouts.get(id);

    }

    getAll(): LayoutDefinition[] {

        return [...this.layouts.values()];

    }

}

export const layoutRegistry = new LayoutRegistry();
