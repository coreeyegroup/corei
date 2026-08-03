/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 04.03
 *
 * File        : capability-container.ts
 * Purpose     : Authoritative Platform Capability Container.
 * =============================================================================
 */

import type { CapabilityProvider } from "../contracts/capability-provider";

import { capabilityRegistry } from "../registry/capability-registry";

import { dockviewProvider } from "../providers/dockview/dockview-provider";

class CapabilityContainer {

    constructor() {

        this.register(dockviewProvider);

    }

    public register(
        provider: CapabilityProvider
    ): void {

        capabilityRegistry.register(provider);

    }

    public initialize(): void {

        console.group("[COREI] Capability Providers");

        for (const provider of capabilityRegistry.list()) {

            console.info(`Initializing : ${provider.id}`);

            provider.initialize();

        }

        console.groupEnd();

    }

    public dispose(): void {

        console.group("[COREI] Capability Providers");

        for (const provider of [...capabilityRegistry.list()].reverse()) {

            console.info(`Disposing : ${provider.id}`);

            provider.dispose();

        }

        console.groupEnd();

    }

}

export const capabilityContainer =
    new CapabilityContainer();
