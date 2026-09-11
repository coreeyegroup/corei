/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 04.01
 *
 * File        : capability-registry.ts
 * Purpose     : Authoritative registry for capability providers.
 * =============================================================================
 */

import type { CapabilityProvider } from "../contracts/capability-provider";

class CapabilityRegistry {

    private readonly providers =
        new Map<string, CapabilityProvider>();

    public register(
        provider: CapabilityProvider
    ): void {

        this.providers.set(
            provider.id,
            provider
        );

    }

    public get(
        id: string
    ): CapabilityProvider | undefined {

        return this.providers.get(id);

    }

    public list(): CapabilityProvider[] {

        return [...this.providers.values()];

    }

}

export const capabilityRegistry =
    new CapabilityRegistry();
