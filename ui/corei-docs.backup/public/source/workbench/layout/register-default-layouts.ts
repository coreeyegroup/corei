/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-18
 *
 * FILE
 * register-default-layouts.ts
 *
 * PURPOSE
 * Register Default Layouts
 * ============================================================================
 */

import { layoutRegistry } from "../registries";

export function registerDefaultLayouts(): void {

    layoutRegistry.register({

        id: "default-trading",

        title: "Default Trading",

        workspace: "trading",

        nodes: [

            {

                panel: "trading"

            },

            {

                panel: "terminal",

                reference: "trading",

                direction: "below"

            },

            {

                panel: "strategy",

                reference: "trading",

                direction: "right"

            },

            {

                panel: "ai",

                reference: "strategy",

                direction: "below"

            }

        ]

    });

}
