/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-18
 *
 * FILE
 * layout-service.ts
 *
 * PURPOSE
 * Layout Service
 *
 * DESCRIPTION
 * - Saves layouts.
 * - Loads layouts.
 * - Lists registered layouts.
 * * NOTE
 * - Uses the LayoutDefinition contract (nodes-based).
 * ============================================================================
 */

import type {

    LayoutNode

} from "./layout-contract";

import {

    layoutRegistry

} from "../registries";

export const layoutService = {

    save(

        id: string,

        title: string,

        workspace: string,

        nodes: LayoutNode[]

    ): void {

        layoutRegistry.register({

            id,

            title,

            workspace,

            nodes

        });

    },

    load(

        id: string

    ) {

        return layoutRegistry.get(

            id

        );

    },

    list() {

        return layoutRegistry.getAll();

    }

};
