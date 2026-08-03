/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 04.03
 *
 * File        : dockview-provider.ts
 * Purpose     : Institutional Dockview Capability Provider.
 * =============================================================================
 */

import type { CapabilityProvider } from "../../contracts/capability-provider";

export class DockviewProvider implements CapabilityProvider {

    public readonly id = "dockview-provider";

    public initialize(): void {

        console.info("[COREI] Dockview Capability Initialized");

    }

    public dispose(): void {

        console.info("[COREI] Dockview Capability Disposed");

    }

}

export const dockviewProvider =
    new DockviewProvider();
