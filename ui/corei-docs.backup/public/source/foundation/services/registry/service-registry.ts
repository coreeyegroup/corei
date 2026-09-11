/**
 * =============================================================================
 * COREI - Institutional Operating Environment
 * -----------------------------------------------------------------------------
 * Stage       : 25
 * Phase       : 01
 * Step        : 03.01
 *
 * File        : service-registry.ts
 * Purpose     : Authoritative registry for platform services.
 * =============================================================================
 */

import type { PlatformService } from "../contracts/platform-service";

class ServiceRegistry {

    private readonly services =
        new Map<string, PlatformService>();

    register(
        service: PlatformService
    ): void {

        this.services.set(
            service.id,
            service
        );

    }

    get(
        id: string
    ): PlatformService | undefined {

        return this.services.get(id);

    }

    list(): PlatformService[] {

        return [...this.services.values()];

    }

}

export const serviceRegistry =
    new ServiceRegistry();
