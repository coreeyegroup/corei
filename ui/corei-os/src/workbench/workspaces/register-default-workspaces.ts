/**
 * ============================================================================
 * STAGE-25
 * STEP-01
 * BUILD UNIT-14
 *
 * FILE
 * register-default-workspaces.ts
 *
 * PURPOSE
 * Register COREI Default Workspaces
 * ============================================================================
 */

import { workspaceRegistry } from "../registries";

export function registerDefaultWorkspaces(): void {

    workspaceRegistry.register({

        id: "trading",

        title: "Trading",

        layout:"default-trading"

      });

    workspaceRegistry.register({

        id: "infrastructure",

        title: "Infrastructure",

        layout:"default-infrastructure"

    });

    workspaceRegistry.register({

        id: "research",

        title: "Research",

        layout:"default-research"

    });

    workspaceRegistry.register({

        id: "risk",

        title: "Risk",

        layout:"default-risk"

    });

    workspaceRegistry.register({

        id: "ai",

        title: "AI",

        layout:"default-ai"

    });

}